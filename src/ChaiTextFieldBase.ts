/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ChaiFieldBase } from './ChaiFieldBase';

/**
 * Reusable form element base class that provides a configurable text input,
 * with additional logic to handle the general needs of text/input-type fields.
 */
export abstract class ChaiTextFieldBase extends ChaiFieldBase<string> {
  static override styles = [
    css`
    :host {
      /**
       * The form-level CSS properties provide the initial look and feel for the form.
       * Fine-grained adjustments are possible, but these form-level properties should
       * be sufficient for most use cases.
       */
      /**
       * The alert color is used to indicate errors or other important information.
       */
      --chai-form-color-alert: inherit;
      /**
       * This font size is applied to all of the form elements.
       */
      --chai-form-font-size: inherit;
      /**
       * This spacing is applied to form padding as well as the vertical gap between
       * form fields. All other spacing is proportional to this value.
       */
      --chai-form-spacing: inherit;
      /**
       * Element-specific CSS properties allow for fine-tuning the look-and-feel.
       * These should only be changed after ensuring that the form-level properties
       * are insufficient for the desired look-and-feel.
       */
      --chai-label-color: inherit;
      --chai-label-visibility: inherit;
      --chai-label-height: inherit;
      --chai-input-color: inherit;
      --chai-input-corner-radius: inherit;
      --chai-input-border: inherit;
      --chai-input-shadow: inherit;

      /**
       * The rest of this section defines the styles that are actually applied
       * to the custom element itself.
       */
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: calc(var(--chai-form-spacing) / 2);
    }
    label {
      font-size: calc(var(--chai-form-font-size) * 1.05);
      padding-left: 1px;
      color: var(--chai-label-color);
      margin-bottom: calc(-1 * var(--chai-form-spacing) / 4);
      visibility: var(--chai-label-visibility);
      height: var(--chai-label-height);

      span {
        color: var(--chai-form-color-alert);
        font-weight: bold;
      }
    }
    span.error {
      color: var(--chai-form-color-alert);
      font-size: calc(0.9 * var(--chai-form-font-size));
      margin-top: calc(-1 * var(--chai-form-spacing) / 4 * 3);
    }
    input {
      font-size: var(--chai-form-font-size);
      font-family: sans-serif;
      color: var(--chai-input-color);
      border: var(--chai-input-border);
      border-radius: var(--chai-input-corner-radius);
      box-shadow: var(--chai-input-shadow);
      padding: calc(var(--chai-form-spacing) / 2);
      margin-bottom: calc(var(--chai-form-spacing) / 2);

      &.invalid {
        border-color: var(--chai-form-color-alert);
        border-width: 2px;
      }
    }
  `];


  /**
   * A placeholder value to show for this field.
   */
  @property()
  accessor placeholder = this._defaultPlaceholder;

  @query('input')
  protected input!: HTMLInputElement;


  constructor(_fieldId: string, protected _inputType: "text" | "tel" | "email" | "date",
    _defaultLabel: string, protected _defaultPlaceholder?: string,
    _invalidMessage?: string,
    protected _autocomplete?: Exclude<AutoFillBase, ""> | "name" | "tel" | "email") {
    super(_fieldId, _defaultLabel, _invalidMessage);
  }


  protected override deserializeValue(storedValue: string | null) {
    return storedValue ?? "";
  }

  protected override serializeValue(value: string) {
    return value;
  }

  protected override isValueSet() {
    return this.value.length > 0;
  }

  getClassValues(){
    return {
    };
  }

  protected override renderInput() {
    const invalid = this.isFieldInvalid();
    const classInfo = { invalid: invalid, ...this.getClassValues() };
    return html`
      <input id=${this._fieldId} type="${this._inputType}" placeholder="${ifDefined(this.placeholder)}"
        class=${classMap(classInfo)} @blur="${this.blurField()}"
        autocomplete=${ifDefined(this._autocomplete)} required
        .value="${this.value}"
        @input="${async (e: Event) => this.updateField((e.target as HTMLInputElement).value)}">
    `;
  }
}
