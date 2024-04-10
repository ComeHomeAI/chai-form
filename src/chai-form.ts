/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * The quoting form element that initiates the flow for the user.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('chai-form')
export class ChaiForm extends LitElement {
  @state() visitorId: string;
  @state() name: string;
  @state() phone: string;
  @state() email: string;
  @state() date: string;

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
       */
      --chai-color-primary: red;
      --chai-color-secondary: blue;
      /**
       * This font family is applied to all of the form elements.
       * TODO: Automatically set this to inherit from the parent element!
       */
      --chai-form-font-family: inherit;
      /**
       * This font size is applied to all of the form elements.
       */
      --chai-form-font-size: 16px;
      /**
       * This border is applied to the form element only.
       * Inputs and the button have their own border styles.
       */
      --chai-form-border: 1px solid gray;
      /**
       * This corner radius is applied to the form border, input field borders, and the button.
       */
      --chai-form-corner-radius: 8px;
      /**
       * This padding is applied to form edges as well as the vertical gap between separate form elements.
       * The gap between labels and their paired inputs is one-fourth of this value.
       */
      --chai-form-padding: 16px;

      /****/
      /* --chai-button-color: #fff;
      --chai-button-background-color-primary: #2abd27;
      --chai-button-background-color-secondary: #11a40e;
      --chai-button-hover-background-color-primary: var(--chai-button-background-color-secondary);
      --chai-button-hover-background-color-secondary: var(--chai-button-background-color-primary);
      --chai-button-font-family: 'Oswald', sans-serif;
      --chai-button-font-size: 17px;
      --chai-button-border-radius: 10px;
      --chai-button-text-transform: uppercase;
      --chai-button-font-weight: 400;
      --chai-button-line-height: 1.5em;
      --chai-offer-font-family: var(--chai-button-font-family);
      --chai-offer-font-size: 16px;
      --chai-offer-color: #4A2684; */
      /* For now, we don't need to style the host element, just the form. */
      /* display: block;
      max-width: 400px;
      font-family: sans-serif;
      border: solid 1px gray;
      padding: var(--chai-form-padding); */
    }
    form {
      display: flex;
      flex-direction: column;
      max-width: 400px;
      gap: calc(var(--chai-form-padding) / 2);
      font-family: var(--chai-form-font-family);
      font-size: var(--chai-form-font-size);
      border: var(--chai-form-border);
      border-radius: var(--chai-form-corner-radius);
      padding: var(--chai-form-padding);
    }
    label {
      margin-bottom: calc(-1 * var(--chai-form-padding) / 4);
    }
    input {
      /* font-family: var(--chai-form-font-family); */
      font-size: var(--chai-form-font-size);
      border-radius: var(--chai-form-corner-radius);
      padding: calc(var(--chai-form-padding) / 2);
      margin-bottom: calc(var(--chai-form-padding) / 2);
    }
    a {
      cursor: pointer;
      background-color: blue;
      color: white;
      text-align: center;
      text-decoration: none;
      border-radius: var(--chai-form-corner-radius);
      margin-top: calc(var(--chai-form-padding) / 2);
      padding: calc(var(--chai-form-padding) / 1.5);
    }
  `;

  /**
   * The ComeHome.ai flow type is the ID that has been configured for the location/context of
   * this form (e.g., the mover's website).
   */
  @property()
  flowType = 'comehome.ai';

  /**
   * The text to display on the button; defaults to "Get Quote".
   */
  @property()
  buttonText = "Get Quote";

  override render() {
    return html`
      <form id="chai-quote-form">
        <label for="name">Name</label>
        <input id="name" type="text" placeholder="First & Last Name" autocomplete="name"
          .value="${this.name}" @input="${this.updateField('name')}">
        <label for="phoneNumber">Phone Number</label>
        <input id="phoneNumber" type="tel" placeholder="Phone Number" autocomplete="tel"
          .value="${this.phone}" @input="${this.updateField('phone')}">
        <label for="email">Email Address</label>
        <input id="email" type="email" placeholder="Email Address" autocomplete="email"
          .value="${this.email}" @input="${this.updateField('email')}">
        <label for="date">Estimated Move Date</label>
        <input id="date" type="date" placeholder="Estimated Move Date" autocomplete="off"
          .value="${this.date}" @input="${this.updateField('date')}">
        <a href="https://www.comehome.ai" @click="${this.openFlowInstance}">${this.buttonText}</a>
      </form>
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

      //TODO: Google Tag Manager integration!

      //TODO: Decide what to do about errors (e.g., open the
      //      flow URL immediately to try to capture those leads?)
    };
  }

  openFlowInstance(e: Event) {
    e.preventDefault();

    //TODO: Google Tag Manager integration!

    window.open(`https://example.com/flows/${this.flowType}`, '_blank');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-form': ChaiForm;
  }
}
