/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { customElement } from 'lit/decorators.js';
import { ChaiTextFieldBase } from './ChaiTextFieldBase';

/**
 * The standard form element for the resident's address.
 */
@customElement('chai-address')
export class ChaiAddress extends ChaiTextFieldBase {
  constructor() {
    super("address", "text", "Address", "Your Current Address", "Please enter a valid address.", "off");
  }

  protected override isValueValid() {
    return /\w+/.test(this.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-address': ChaiAddress;
  }
}
