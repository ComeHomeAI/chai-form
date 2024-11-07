/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { customElement } from 'lit/decorators.js';
import { LitElement, css, html } from 'lit';

/**
 * The standard form element for the resident's address.
 */
@customElement('chai-stepper')
export class ChaiStepper extends LitElement {
  static override styles = css`
  :host {
    /**
      * The form-level CSS properties provide the initial look and feel for the form.
      * Fine-grained adjustments are possible, but these form-level properties should
      * be sufficient for most use cases.
      */
    /**
      * The brand color is used to set the initial color for all text as well as the
      * background color for the button.
      */
    --chai-form-color-brand: inherit;
    /**
      * The text color is used as the initial setting for all text elements, and
      * defaults to the brand color.
      */
    --chai-form-color-text: inherit;
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
    --chai-form-font-size: inherit;
    /**
      * This font weight is applied to all of the form elements.
      */
    --chai-form-font-weight: inherit;
    /**
      * This spacing is applied to form padding as well as the vertical gap between
      * form fields. All other spacing is proportional to this value.
      */
    --chai-form-spacing: 16px;
    /**
      * The rest of this section defines the styles that are actually applied
      * to the custom element itself.
      */
    font-family: var(--chai-form-font-family);
    font-size: var(--chai-form-font-size);
    font-weight: var(--chai-form-font-weight);
    text-shadow: none;
    text-align: left;
    color: var(--chai-form-color-brand);
  }
  ol {
      display: flex;
      flex-direction: row;
      list-style: none;
      margin-top: calc(var(--chai-form-spacing) * 1.5);
      margin-bottom: calc(-1 * var(--chai-form-spacing));
      padding: 0;
      color: var(--chai-form-color-text);
  }

  ol li {
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

    &:first-child svg {
      filter: none;
      padding: var(--chai-form-spacing);
      position: relative;
      top: calc(-1 * var(--chai-form-spacing) / 2);
      margin-bottom: calc(-1.25 * var(--chai-form-spacing));
    }
  }

  ol li svg {
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
  `;

  override render() {
    return html`
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-stepper': ChaiStepper;
  }
}
