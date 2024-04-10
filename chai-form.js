/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * The quoting form element that initiates the flow for the user.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
let ChaiForm = class ChaiForm extends LitElement {
    constructor() {
        super();
        /**
         * The ComeHome.ai flow type is the ID that has been configured for the location/context of
         * this form (e.g., the mover's website).
         */
        this.flowType = 'comehome.ai';
        /**
         * The text to display on the button; defaults to "Get Quote".
         */
        this.buttonText = "Get Quote";
        this.visitorId = localStorage.getItem('chai-visitorId') || crypto.randomUUID();
        localStorage.setItem('chai-visitorId', this.visitorId);
        this.name = localStorage.getItem('chai-name') || '';
        this.phone = localStorage.getItem('chai-phone') || '';
        this.email = localStorage.getItem('chai-email') || '';
        this.date = localStorage.getItem('chai-date') || '';
    }
    render() {
        return html `
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
    updateField(fieldName) {
        return (e) => {
            const newValue = e.target.value;
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
    openFlowInstance(e) {
        e.preventDefault();
        //TODO: Google Tag Manager integration!
        window.open(`https://example.com/flows/${this.flowType}`, '_blank');
    }
};
ChaiForm.styles = css `
    :host {
      display: block;
      max-width: 400px;
      font-family: sans-serif;
      border: solid 1px gray;
      padding: 16px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    label {
      margin-bottom: -4px;
    }
    input {
      padding: 8px;
      font-size: 16px;
      margin-bottom: 8px;
    }
    a {
      cursor: pointer;
      background-color: blue;
      color: white;
      padding: 8px;
      text-align: center;
      text-decoration: none;
    }
  `;
__decorate([
    state()
], ChaiForm.prototype, "visitorId", void 0);
__decorate([
    state()
], ChaiForm.prototype, "name", void 0);
__decorate([
    state()
], ChaiForm.prototype, "phone", void 0);
__decorate([
    state()
], ChaiForm.prototype, "email", void 0);
__decorate([
    state()
], ChaiForm.prototype, "date", void 0);
__decorate([
    property()
], ChaiForm.prototype, "flowType", void 0);
__decorate([
    property()
], ChaiForm.prototype, "buttonText", void 0);
ChaiForm = __decorate([
    customElement('chai-form')
], ChaiForm);
export { ChaiForm };
//# sourceMappingURL=chai-form.js.map