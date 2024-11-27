/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { customElement } from 'lit/decorators.js';
import { ChaiTextFieldBase } from './ChaiTextFieldBase';

/**
 * The standard form element for the resident's full name.
 */
@customElement('chai-name')
export class ChaiName extends ChaiTextFieldBase {
  constructor() {
    super("name", "text", "Name", "First & Last Name", "Please enter your name.", "name");
  }


  protected override sanitizeField(newValue: string) {
    // strip some special characters that break urls
    return newValue.replace(/[\\/&#;]/g, '');
  }

  protected override isValueValid() {
    return this.value.length >= 2;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-name': ChaiName;
  }
}
