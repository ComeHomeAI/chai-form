/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {customElement} from 'lit/decorators.js';
import {ChaiTextFieldBase} from './ChaiTextFieldBase';
import posthog from 'posthog-js';

/**
 * The standard form element for the resident's mobile phone number.
 */
@customElement('chai-phone')
export class ChaiPhone extends ChaiTextFieldBase {
  constructor() {
    super("phone", "tel", "Phone Number", "(###) ###-####", "Please enter a valid phone number.", "tel");
  }

  protected override firstUpdated() {
    super.firstUpdated();
    const phoneNumberInput = this.renderRoot.querySelector(
      '.phone-number-input'
    );
    phoneNumberInput?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const selectionStart = target.selectionStart;
      const wasAtEndOfInput = selectionStart === target.value.length;
      this.value = this.formatPhone(target.value);
      if (!wasAtEndOfInput) {
        // If the user was not at the end of the input, we want to keep the cursor in the same position
        // Otherwise the cursor position might jump unexpectedly when something like a whitespace or a parenthesis is added
        setTimeout(function () {
          target.selectionStart = target.selectionEnd = selectionStart;
        }, 0);
      }
    });
  }

  formatPhone(phoneNumberIn: string) {
    let onlyDigits;
    if (phoneNumberIn.startsWith('+1')) {
      onlyDigits = phoneNumberIn.replace('+1','').replace(/\D/g, '');
    } else {
      onlyDigits = phoneNumberIn.replace(/^1/,'').replace(/\D/g, '');
    }
    const length = onlyDigits.length;
    let resultingNumber;
    if (length < 3) {
      resultingNumber = onlyDigits;
    } else if (length == 3) {
      resultingNumber = `(${onlyDigits})`;
    } else if (length < 7) {
      resultingNumber = `(${onlyDigits.slice(0, 3)}) ${onlyDigits.slice(3)}`;
    } else {
      resultingNumber = `(${onlyDigits.slice(0, 3)}) ${onlyDigits.slice(
        3,
        6
      )}-${onlyDigits.slice(6)}`;
    }
    if (phoneNumberIn.startsWith('+1')) {
      // remove all parenthesis and hyphens from the string
      const sanitizedNumber = resultingNumber.replace(/[()]/g, '').replace(/-/,' ');
      return `+1 ${sanitizedNumber}`;
    }
    return resultingNumber;
  }

  protected override sanitizeField(newValue: string) {
    // format the input for backend and storage
    return this.formatPhone(newValue);
  }

  protected override isValueValid() {
    return /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?(?!555)\d{3}[-.\s]?\d{4}$/.test(
      this.value
    );
  }

  protected override onChangedFieldValid() {
    super.onChangedFieldValid();
    posthog.setPersonProperties({phone: this.value});
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
