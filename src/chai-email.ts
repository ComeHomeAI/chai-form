/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { customElement } from 'lit/decorators.js';
import { ChaiField } from './ChaiField';

/**
 * The standard form element for the resident's email address.
 */
@customElement('chai-email')
export class ChaiEmail extends ChaiField {
  constructor() {
    super("email", "email", "Email", "Email", "Please enter a valid email address.", "email");
  }

  protected override isValueValid() {
    return /^[^\s@]+@(?!.*(\w+\.)?example\.com)[^\s@]+\.[^\s@]+$/.test(this.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-email': ChaiEmail;
  }
}
