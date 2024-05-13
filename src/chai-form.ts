/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import "./chai-name";
import "./chai-phone";
import "./chai-email";
import "./chai-address";
import "./chai-date";
import { ChaiFieldBase, ChaiFieldChangedDetails } from './ChaiFieldBase';
import { ApiEnvironment, api } from './ChaiApi';
import { publishGtmEvent } from './ChaiAnalytics';
import posthog from 'posthog-js';

type FieldState = {
  value: unknown,
  valid: boolean
}

/**
 * The quoting form element that initiates the flow for the user.
 */
@customElement('chai-form')
export class ChaiForm extends LitElement {
  @state() private visitorId: string;

  @state() private flowInstanceId: string | null = null;

  @state() private fieldStates: Map<string, FieldState>;

  constructor() {
    super();

    this.visitorId = localStorage.getItem('chai-visitorId') || crypto.randomUUID();
    localStorage.setItem('chai-visitorId', this.visitorId);
    console.info("Visitor ID set", this.visitorId);
    posthog.identify(this.visitorId);

    // Load the saved flow instance ID, if any. The flow instance will be
    // initialized when the element is connected, if needed.
    this.flowInstanceId = localStorage.getItem('chai-flowInstanceId');

    this.fieldStates = new Map<string, FieldState>();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.addEventListener('chai-fieldchanged', this.handleFieldChange);
  }

  static override styles = css`
    :host {
      /**
       * The form-level CSS properties provide the initial look and feel for the form.
       * Fine-grained adjustments are possible, but these form-level properties should
       * be sufficient for most use cases.
       */
      /**
       * The max width limits the width of the form component.
       * The layout is responsive and will adjust to the available space.
       */
      --chai-form-max-width: 400px;
      /**
       * The brand color is used to set the initial color for all text as well as the
       * background color for the button.
       */
      --chai-form-color-brand: #01919b;
      /**
       * The alert color is used to indicate errors or other important information.
       */
      --chai-form-color-alert: #fa2829;
      /**
       * The text color is used as the initial setting for all text elements, and
       * defaults to the brand color.
       */
      --chai-form-color-text: var(--chai-form-color-brand);
      /**
       * The background is used for the overall form background. Note this does not
       * have to be only a color.
       */
      --chai-form-background: #fffaf6;
      /**
       * The font family is applied to all of the form elements, except for inputs
       * which keep their system-assigned default sans-serif font.
       * By default, the font family is set to inherit from the parent element to
       * allow the form elements to blend into the surrounding website's brand.
       */
      --chai-form-font-family: inherit;
      /**
       * This font size is applied to all of the form elements.
       */
      --chai-form-font-size: 16px;
      /**
       * This font weight is applied to all of the form elements.
       */
      --chai-form-font-weight: 400;
      /**
       * This border is applied to the form element only.
       * Inputs and the button have their own border styles.
       */
      --chai-form-border: 1px solid #ccc;
      /**
       * This corner radius is applied to the form border, input field borders, and
       * the button by default.
       */
      --chai-form-corner-radius: 8px;
      /**
       * This spacing is applied to form padding as well as the vertical gap between
       * form fields. All other spacing is proportional to this value.
       */
      --chai-form-spacing: 16px;
      /**
       * Element-specific CSS properties allow for fine-tuning the look-and-feel.
       * These should only be changed after ensuring that the form-level properties
       * are insufficient for the desired look-and-feel.
       */
      --chai-header-font-size: calc(var(--chai-form-font-size) * 1.5);
      --chai-header-color: var(--chai-form-color-text);
      --chai-label-color: var(--chai-form-color-text);
      --chai-label-visibility: visible;
      --chai-label-height: auto;
      --chai-input-color: #000;
      --chai-input-corner-radius: calc(var(--chai-form-corner-radius) / 4);
      --chai-input-border: 0.8px solid rgb(233,228,224);
      --chai-input-shadow: rgba(21, 21, 21, 0.08) 0px 1px 2px 0px;
      --chai-button-color: #fff;
      --chai-button-font-size: var(--chai-form-font-size);
      --chai-button-text-transform: uppercase;
      --chai-button-background: var(--chai-form-color-brand);
      --chai-button-background-hover: var(--chai-form-color-brand);
      --chai-button-background-active: var(--chai-form-color-brand);
      /**
       * By default, the CHAI Form uses a CSS brightness filter to generate the
       * hover and active states for the button.
       * When specifying a background color for the hover and/or active states, it's
       * recommended to set the filter for the corresponding state to none.
       */
      --chai-button-filter-hover: brightness(1.2);
      --chai-button-filter-active: brightness(0.8);
      --chai-button-corner-radius: var(--chai-form-corner-radius);

      /**
       * The rest of this section defines the styles that are actually applied
       * to the custom element itself.
       */
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: var(--chai-form-max-width);
      font-family: var(--chai-form-font-family);
      font-size: var(--chai-form-font-size);
      font-weight: var(--chai-form-font-weight);
      text-shadow: none;
      text-align: left;
      border: var(--chai-form-border);
      border-radius: var(--chai-form-corner-radius);
      padding: var(--chai-form-spacing);
      background: var(--chai-form-background);
      color: var(--chai-form-color-brand);
    }
    h2 {
      color: var(--chai-header-color);
      font-size: var(--chai-header-font-size);
      margin-top: calc(var(--chai-form-spacing) / 4);
      margin-bottom: var(--chai-form-spacing);
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: calc(var(--chai-form-spacing) / 2);
    }
    label {
      font-size: calc(var(--chai-form-font-size) * 1.05);
      padding-left: 1px;
      color: var(--chai-label-color);
      margin-bottom: calc(-1 * var(--chai-form-spacing) / 4);
      visibility: var(--chai-label-visibility);
      height: var(--chai-label-height);

      span {
        color: var(--chai-form-color-alert);
        font-weight: bold;
      }
    }
    span.error {
      color: var(--chai-form-color-alert);
      font-size: calc(0.9 * var(--chai-form-font-size));
      margin-top: calc(-1 * var(--chai-form-spacing) / 4 * 3);
    }
    input {
      font-size: var(--chai-form-font-size);
      color: var(--chai-input-color);
      border: var(--chai-input-border);
      border-radius: var(--chai-input-corner-radius);
      box-shadow: var(--chai-input-shadow);
      padding: calc(var(--chai-form-spacing) / 2);
      margin-bottom: calc(var(--chai-form-spacing) / 2);

      &.invalid {
        border-color: var(--chai-form-color-alert);
        border-width: 2px;
      }
    }
    a {
      cursor: pointer;
      background: var(--chai-button-background);
      color: var(--chai-button-color);
      font-size: var(--chai-button-font-size);
      text-transform: var(--chai-button-text-transform);
      text-align: center;
      text-decoration: none;
      border-radius: var(--chai-button-corner-radius);
      margin-top: calc(var(--chai-form-spacing) * 1.5);
      margin-bottom: var(--chai-form-spacing);
      padding: calc(var(--chai-form-spacing) / 1.5);

      &:hover {
        background: var(--chai-button-background-hover);
        filter: var(--chai-button-filter-hover);
        &:active {
          background: var(--chai-button-background-hover);
          filter: var(--chai-button-filter-active);
        }
      }
      &:active {
        background: var(--chai-button-background-hover);
        filter: var(--chai-button-filter-active);
      }
    }
    ol {
      display: flex;
      flex-direction: row;
      list-style: none;
      margin-top: calc(var(--chai-form-spacing) * 1.5);
      margin-bottom: calc(-1 * var(--chai-form-spacing));
      padding: 0;
      color: var(--chai-form-color-text);

      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        position: relative;

        &:not(:first-child)::before {
          content: '';
          position: absolute;
          display: block;
          width: 100%;
          height: 4px;
          left: calc(-50%);
          right: calc(-50%);
          top: calc((var(--chai-form-spacing) + 24px) / 2 - 2px);
          background-color: var(--chai-form-color-brand);
          filter: saturate(0.1) brightness(1.9);
          z-index: 1;
        }

        svg {
          background-color: var(--chai-form-color-brand);
          filter: saturate(0.5) brightness(1.5);
          fill: #fff;
          padding: calc(var(--chai-form-spacing) / 2);
          border-radius: 50%; // Make the background circular
          height: 24px;
          width: 24px;
          margin-bottom: calc(-1 * var(--chai-form-spacing) / 4);
          z-index: 2;
        }

        &:first-child svg {
          filter: none;
          padding: var(--chai-form-spacing);
          position: relative;
          top: calc(-1 * var(--chai-form-spacing) / 2);
          margin-bottom: calc(-1.25 * var(--chai-form-spacing));
        }
      }
    }
    slot[name="before"], slot[name="after"] {
      display: block;
      color: var(--chai-form-color-text);
    }
  `;

  /**
   * The environment to use for the API (defaults to production; only change this for
   * development purposes).
   */
  @property()
  accessor environment = ApiEnvironment.Production;

  /**
   * The ComeHome.ai flow type is the ID that has been configured for the location/context of
   * this form (e.g., the mover's website).
   */
  @property()
  accessor flowType = "comehome.ai";

  /**
   * The text to display on the button; defaults to "Get Quote".
   */
  @property()
  accessor buttonText = "Get a Quote!";

  /**
   * The text to display in the header; defaults to "Get your moving quote now!".
   */
  @property()
  accessor headerText = "Get your moving quote now!";


  override connectedCallback() {
    super.connectedCallback();

    // Initialize the flow instance if it hasn't been done yet.
    // We need to wait until this point in order to read the environment property.
    if (this.flowInstanceId == null) {
      api(this.environment).init(this.visitorId, this.flowType).then(formInit => {
        console.info("Flow initialized", formInit);
        this.flowInstanceId = formInit.flowInstanceId;
        localStorage.setItem('chai-flowInstanceId', this.flowInstanceId);
      });
    }

  }

  override render() {
    return html`
      <h2>${this.headerText}</h2>
      <slot name="before"></slot>
      <form id="chai-quote-form">
        <slot>
          <chai-name></chai-name>
          <chai-phone></chai-phone>
          <chai-email></chai-email>
          <chai-address></chai-address>
        </slot>
        
        <a href="https://www.comehome.ai" @click="${this.submit}">${this.buttonText}</a>
      </form>
      <ol>
        <li>
          <svg focusable="false" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.89-2-2-2m0 16H5V7h14zm-2-7H7v-2h10zm-4 4H7v-2h6z"></path></svg>
          <p>Fill out this form <b>(required)</b></p>
        </li>
        <li>
          <div class="connector"></div>
          <svg focusable="false" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5"></path></svg>
          <p>Take pictures of your items <i>(optional)</i></p>
        </li>
        <li>
          <div class="connector"></div>
          <svg focusable="false" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm1 10h-4v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1h-2v-1H9v-2h4v-1h-3c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1V9h2v1h2zm-2-4V3.5L17.5 8z"></path></svg>
          <p>Get your quote!</p>
        </li>
      </ol>
      <slot name="after"></slot>
    `;
  }

  handleFieldChange(event: CustomEvent<ChaiFieldChangedDetails<unknown>>) {
    console.info("Field changed", event.detail);

    const { field, value, valid } = event.detail;

    this.fieldStates.set(field, { value, valid });

    //HACK: This works for an MSP, but returning visitors may end up with
    //      some data not directly associated with the current flow instance.
    //      That will primarily be an issue for the address, which is flow-specific.
    //      Our solution for this is to include all field values in the submit request.
    if (valid && this.flowInstanceId != null) {
      console.info("Sending field update to API", field, value);
      api(this.environment).update(this.visitorId, this.flowInstanceId, field, value);
    }
  }

  submit(e: Event) {
    e.preventDefault();
    console.info("Submit requested");

    // At this point, we know the user has interacted with the form
    // so we can enforce display of any validation errors.
    const defaultSlot = this.renderRoot.querySelector<HTMLSlotElement>('slot:not([name])')!;
    const fieldElements = defaultSlot!.assignedElements({ flatten: true }).filter(element => element.tagName.startsWith("CHAI-"));
    fieldElements.forEach(element => {
      (element as ChaiFieldBase<unknown>).forceValidation = true;
    });

    // Every field must have a valid value.
    for (const { valid } of this.fieldStates.values())
      if (!valid) { return; }

    console.info("Preparing submit");

    const fieldValues = Array.from(this.fieldStates.entries()).map(([key, value]) =>
      [key, value.value as string]);
    const submitUrl = api(this.environment).buildSubmitUrl(this.visitorId, this.flowType, this.flowInstanceId || "", fieldValues);

    publishGtmEvent("chai_form_submit", { flowType: this.flowType });
    posthog.capture("form_submitted", { flow_type: this.flowType });

    console.info("Initiating submit via navigation", submitUrl);

    window.open(submitUrl, '_blank');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-form': ChaiForm;
  }
}
