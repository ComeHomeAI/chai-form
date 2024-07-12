/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { customElement } from 'lit/decorators.js';
import { ChaiTextFieldBase } from './ChaiTextFieldBase';

/**
 * The standard form element for the requested service date.
 */
@customElement('chai-date')
export class ChaiDate extends ChaiTextFieldBase {
  constructor() {
    super("date", "date", "Date", undefined, "Please enter a valid future date.", "off");
  }

  protected override firstUpdated() {
    super.firstUpdated();
    // Set the minimum date to today's date (or tomorrow's date, depending on timezone offset).
    this.input.min = new Date().toISOString().substring(0, 10);
  }

  protected override isValueValid() {
    return /\d\d\d\d-\d\d-\d\d/.test(this.value) && new Date(this.value) > new Date();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-date': ChaiDate;
  }
}
