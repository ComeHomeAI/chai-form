/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {customElement} from 'lit/decorators.js';
import {ChaiTextFieldBase} from './ChaiTextFieldBase';
import {AsYouType} from 'libphonenumber-js';

/**
 * The standard form element for the resident's mobile phone number.
 */
@customElement('chai-phone')
export class ChaiPhone extends ChaiTextFieldBase {
  constructor() {
    super("phone", "tel", "Phone Number", "###-###-####", "Please enter a valid phone number.", "tel");
  }


  protected override firstUpdated() {
    super.firstUpdated();
    const phoneNumberInput = this.renderRoot.querySelector('.phone-number-input');
    phoneNumberInput?.addEventListener('input', (e)=> {
      const target = e.target as HTMLInputElement;
      target.value = this.formatPhone(target.value);
    })
  }

  formatPhone(phoneNumberIn: string) {
    return new AsYouType('US').input(phoneNumberIn);
  }

  protected override sanitizeField(newValue: string) {
    // strip everything but +, digits, whitespace, parenthesis and hyphen
    return newValue.replace(/[^+\d\s()-]/g, '');
  }

  protected override isValueValid() {
    return /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?(?!555)\d{3}[-.\s]?\d{4}$/.test(this.value);
  }

  override getClassValues(): {} {
    return {'phone-number-input': true};
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-phone': ChaiPhone;
  }
}
