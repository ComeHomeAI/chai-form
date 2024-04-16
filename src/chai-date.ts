/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { customElement } from 'lit/decorators.js';
import { ChaiField } from './ChaiField';

/**
 * The standard form element for the requested service date.
 */
@customElement('chai-date')
export class ChaiDate extends ChaiField {
  constructor() {
    super("date", "date", "Date", undefined, "Please enter a valid future date.", "off");
    //TODO: Ability to set the min date! (via a protected 'query' on the input?)
  }

  protected override isValueValid() {
    return /\d\d+/.test(this.value); //TODO: This is a placeholder - add real validation!
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-date': ChaiDate;
  }
}
