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
      const selectionStart= target.selectionStart;
      const wasAtEndOfInput = selectionStart === target.value.length;
      this.value = this.formatPhone(target.value);
      if (!wasAtEndOfInput) {
        // If the user was not at the end of the input, we want to keep the cursor in the same position
        // Otherwise the cursor position might jump unexpectedly when something like a whitespace or a parenthesis is added
        setTimeout(function() {
          target.selectionStart = target.selectionEnd = selectionStart;
        }, 0);
      }
      console.log(target.value, selectionStart, target.selectionStart);
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
