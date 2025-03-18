/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { customElement } from 'lit/decorators.js';
import { ChaiTextFieldBase } from './ChaiTextFieldBase';
import { css, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * The standard form element for the requested service date.
 */
@customElement('chai-date')
export class ChaiDate extends ChaiTextFieldBase {

  constructor() {
    super("date", "date", "Date", undefined, "Please enter a valid future date.", "off");
  }

  static override styles = [
    ...ChaiTextFieldBase.styles,
    css`
      .date-picker {
          display: inline-block;
          font-size: var(--chai-form-font-size);
          color: var(--chai-input-color);
          border: var(--chai-input-border);
          border-radius: var(--chai-input-corner-radius);
          box-shadow: var(--chai-input-shadow);
          padding: 0;
          margin-bottom: calc(var(--chai-form-spacing) / 2);
          min-width: 10rem;
          min-height: 2rem;
          background: #fff;
          position: relative;
          isolation: isolate;
      }

      .date-picker,
      .date-picker > * {
          cursor: text;
          font-size: var(--chai-form-font-size);
      }

      .date-picker:focus > input[type="date"],
      .date-picker:focus-within > input[type="date"] {
          color: var(--chai-input-color);
      }

      .date-picker:focus,
      .date-picker:focus-within {
          box-shadow: 0 0 0 .1rem #000;
      }

      .date-picker:has(> input[type="date"].invalid) {
          border-color: var(--chai-form-color-alert);
          border-width: 2px;
      }

      .date-picker > .placeholder > .placeholder-label {
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 100%;
          text-align: left;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: sans-serif;
          font-size: var(--chai-form-font-size);
          color: var(--chai-input-color);
          opacity: .6;
          line-height: 2rem;
          padding-left: var(--chai-form-spacing);
      }

      /* Hide the placeholder when the input:
         1. has focus (or nested focus), or
         2. has a non-empty value. */
      .date-picker:focus > .placeholder,
      .date-picker:focus-within > .placeholder,
      .date-picker > input[type="date"]:not(.empty) + .placeholder {
          display: none;
      }

      /* Hide the system input field while keeping it interactive -
         make it invisible but covering the same space as before */
      .date-picker > input[type="date"] {
          background: none;
          border: none;
          outline: none;
          color: transparent;
      }

      .date-picker > input[type="date"] {
          font-family: system-ui;
          position: absolute;
          width: 100%;
          height: 100%;
          text-align: left;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 0;
          padding-left: calc(var(--chai-form-spacing) / 2);
          box-sizing: border-box;
      }

      /* Make the input's value visible when the input has
         a non-empty value. */
      .date-picker > input[type="date"]:not(.empty) {
          color: var(--chai-input-color) !important;
      }
  `];

  override connectedCallback() {
    super.connectedCallback();
  }

  protected override firstUpdated() {
    super.firstUpdated();
    // Set the minimum date to yesterday according to browsers current date
    let date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    this.input.min = `${year}-${month}-${day}`;
  }

  protected override isValueValid() {
    let formatMatches = /\d\d\d\d-\d\d-\d\d/.test(this.value);
    if (formatMatches) {
      const enteredDate = new Date(`${this.value}T00:00`);
      const minDate = new Date();
      minDate.setDate(minDate.getDate() - 1);
      return enteredDate > minDate;
    }
    return false;
  }

  override renderInput() {
    const invalid = this.isFieldInvalid();
    const empty = this.value === "";
    return html`
      <div class="date-picker">
        <input id=${this._fieldId} type="${this._inputType}" placeholder="${ifDefined(this.placeholder)}"
                class=${classMap({ invalid: invalid, empty: empty })} @blur="${this.blurField()}"
                autocomplete=${ifDefined(this._autocomplete)} required
                .value="${this.value}"
                @input="${async (e: Event) => this.updateField((e.target as HTMLInputElement).value)}">
        <div class="placeholder"><div class="placeholder-label">${this.placeholder}</div></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-date': ChaiDate;
  }
}
