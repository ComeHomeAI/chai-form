/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { customElement } from 'lit/decorators.js';
import { ChaiTextFieldBase } from './ChaiTextFieldBase';
import posthog from 'posthog-js';

/**
 * The standard form element for the resident's email address.
 */
@customElement('chai-email')
export class ChaiEmail extends ChaiTextFieldBase {
  constructor() {
    super("email", "email", "Email", "Email", "Please enter a valid email address.", "email");
  }

  protected override sanitizeField(newValue: string) {
    // strip some special characters that break urls
    return newValue.replace(/[\\/&#;]/g, '');
  }


  protected override isValueValid() {
    return /^[^\s@]+@(?!.*(\w+\.)?example\.com)[^\s@]+\.[^\s@]+$/.test(this.value);
  }

  protected override onChangedFieldValid() {
    super.onChangedFieldValid();
    posthog.setPersonProperties({email: this.value});
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-email': ChaiEmail;
  }
}
