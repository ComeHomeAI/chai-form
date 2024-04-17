/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { customElement } from 'lit/decorators.js';
import { ChaiField } from './ChaiField';

/**
 * The standard form element for the resident's mobile phone number.
 */
@customElement('chai-phone')
export class ChaiPhone extends ChaiField {
  constructor() {
    super("phone", "tel", "Phone Number", "###-###-####", "Please enter a valid phone number.", "tel");
  }

  protected override isValueValid() {
    return /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?(?!555)\d{3}[-.\s]?\d{4}$/.test(this.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-phone': ChaiPhone;
  }
}
