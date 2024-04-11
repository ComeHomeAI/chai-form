/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * The quoting form element that initiates the flow for the user.
 */
@customElement('chai-form')
export class ChaiForm extends LitElement {
  @state() private visitorId: string;

  @state() private name: string;
  @state() private phone: string;
  @state() private email: string;
  @state() private date: string;

  @state() private nameChanged = false;
  @state() private phoneChanged = false;
  @state() private emailChanged = false;

  constructor() {
    super();

    this.visitorId = localStorage.getItem('chai-visitorId') || crypto.randomUUID();
    localStorage.setItem('chai-visitorId', this.visitorId);

    this.name = localStorage.getItem('chai-name') || '';
    this.phone = localStorage.getItem('chai-phone') || '';
    this.email = localStorage.getItem('chai-email') || '';
    this.date = localStorage.getItem('chai-date') || '';
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
      --chai-input-color: #000; //var(--chai-form-color-text);
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
      //TODO: Use CSS relative colors when fully supported
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

      span {
        color: var(--chai-form-color-alert);
        font-weight: bold;
      }
      //TODO: Use CSS pseudo-elements when :has is better supported
      /* &:has(+ input[required])::after {
        content: '*';
        margin-left: 0.25em;
        color: var(--chai-form-color-alert);
        font-weight: bold;
      } */
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
      margin-top: calc(var(--chai-form-spacing) / 2);
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
    #offer {
      display: block;
      margin-top: calc(-2 * var(--chai-form-spacing));
      color: var(--chai-form-color-text);
    }
  `;

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

  private isNameInvalid() {
    return this.nameChanged && this.name.length < 2;
  }
  private isPhoneInvalid() {
    return this.phoneChanged &&
      !/^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?(?!555)\d{3}[-.\s]?\d{4}$/.test(this.phone);
  }
  private isEmailInvalid() {
    return this.emailChanged &&
      !/^[^\s@]+@(?!.*(\w+\.)?example\.com)[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  override render() {
    const nameInvalid = this.isNameInvalid();
    const phoneInvalid = this.isPhoneInvalid();
    const emailInvalid = this.isEmailInvalid();

    //TODO: Replace '*' spans with CSS pseudo-elements once fully supported
    return html`
      <h2>${this.headerText}</h2>
      <form id="chai-quote-form">

        <label for="name">Name <span>*</span></label>
        <input id="name" type="text" placeholder="First & Last Name"
          class=${classMap({ invalid: nameInvalid })} @blur="${this.blurField('name')}"
          autocomplete="name" required
          .value="${this.name}" @input="${this.updateField('name')}">
        ${nameInvalid ? html`<span class="error">Please enter your name.</span>` : ''}
        
        <label for="phoneNumber">Phone Number <span>*</span></label>
        <input id="phoneNumber" type="tel" placeholder="###-###-####"
          class=${classMap({ invalid: phoneInvalid })} @blur="${this.blurField('phone')}"
          autocomplete="tel" required
          .value="${this.phone}" @input="${this.updateField('phone')}">
        ${phoneInvalid ? html`<span class="error">Please enter a valid phone number.</span>` : ''}
        
        <label for="email">Email <span>*</span></label>
        <input id="email" type="email" placeholder="Email"
          class=${classMap({ invalid: emailInvalid })} @blur="${this.blurField('email')}"
          autocomplete="email" required
          .value="${this.email}" @input="${this.updateField('email')}">
        ${emailInvalid ? html`<span class="error">Please enter a valid email address.</span>` : ''}
        
        <label for="date">Estimated Move Date</label>
        <input id="date" type="date" placeholder="Estimated Move Date"
          autocomplete="off" min="${new Date().toISOString().split('T')[0]}"
          .value="${this.date}" @input="${this.updateField('date')}">
        
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
      <slot id="offer"></slot>
    `;
  }

  updateField(fieldName: 'name' | 'phone' | 'email' | 'date') {
    return (e: Event) => {
      const newValue = (e.target as HTMLInputElement).value;

      this[fieldName] = newValue;

      localStorage.setItem(`chai-${fieldName}`, newValue);

      fetch(`https://example.local:3000/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CHAI-VisitorID': this.visitorId,
        },
        body: JSON.stringify({ fieldName: newValue }),
      });
      //TODO: Decide what to do about server errors. E.g.:
      //      - open the flow URL immediately to try to capture the lead?
      //      - show a 'please call us' fallback message to the user?

      //TODO: Google Tag Manager integration!
    };
  }

  blurField(fieldName: 'name' | 'phone' | 'email') {
    return () => {
      this[`${fieldName}Changed`] = true;
    };
  }

  submit(e: Event) {
    e.preventDefault();

    // At this point, we know the user has interacted with the form
    // and we can enforce display of any validation errors.
    //TODO: Use :user-invalid when it is better supported.
    this.nameChanged = true;
    this.phoneChanged = true;
    this.emailChanged = true;

    if (this.isNameInvalid() || this.isPhoneInvalid() || this.isEmailInvalid()) {
      return;
    }

    //TODO: Google Tag Manager integration!

    window.open(`https://example.com/flows/${this.flowType}`, '_blank');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-form': ChaiForm;
  }
}
