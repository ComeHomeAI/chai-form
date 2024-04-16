/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface ChaiFieldChangedDetails<T> {
  field: string;
  value: T;
  valid: boolean;
}

/**
 * Reusable form element base class.
 */
export abstract class ChaiField extends LitElement {
  static override styles = css`
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
  `;


  /**
   * The label for this field.
   */
  @property()
  accessor label = this._defaultLabel;

  /**
   * A placeholder value to show for this field.
   */
  @property()
  accessor placeholder = this._defaultPlaceholder;

  @property()
  accessor invalidMessage = this._invalidMessage;

  @property({ type: Boolean })
  accessor forceValidation = false;

  @state() protected value: string;

  @state() protected isChanged = false;

  @query('input')
  protected input!: HTMLInputElement;


  constructor(protected _fieldId: string, protected _inputType: "text" | "tel" | "email" | "date", //TODO: Clean up the input type signature!
    protected _defaultLabel: string, protected _defaultPlaceholder?: string,
    protected _invalidMessage?: string,
    protected _autocomplete?: Exclude<AutoFillBase, ""> | "name" | "tel" | "email") { //TODO: Clean up the autofill type signature!
    super();

    this.value = localStorage.getItem(`chai-${this._fieldId}`) || '';
  }


  protected isFieldInvalid() {
    return (this.isChanged || this.forceValidation || this.value.length > 0) && !this.isValueValid();
  }

  protected abstract isValueValid(): boolean;


  override connectedCallback(): void {
    super.connectedCallback();

    // When connected, bubble up an event to notify the parent form of the field's existence
    // and its initial state.
    this.notifyParentForm();
  }

  override render() {
    const invalid = this.isFieldInvalid();

    return html`
      <label for=${this._fieldId}>${this.label} <span title="Required">*</span></label>
      <input id=${this._fieldId} type="${this._inputType}" placeholder="${ifDefined(this.placeholder)}"
        class=${classMap({ invalid: invalid })} @blur="${this.blurField()}"
        autocomplete=${ifDefined(this._autocomplete)} required
        .value="${this.value}" @input="${this.updateField()}">
      ${invalid && this.invalidMessage ? html`<span class="error">${this.invalidMessage}</span>` : ''}
    `;
  }

  updateField() {
    return async (e: Event) => {
      const newValue = (e.target as HTMLInputElement).value;

      this.value = newValue;

      localStorage.setItem(`chai-${this._fieldId}`, newValue);

      // After rendering, bubble up an event to notify the parent form of the update.
      this.notifyParentForm();
    };
  }

  blurField() {
    return () => {
      this.isChanged = true;
    };
  }

  notifyParentForm() {
    const fieldChangedEvent = new CustomEvent<ChaiFieldChangedDetails<string>>('chai-fieldchanged', {
      detail: {
        field: this._fieldId,
        value: this.value,
        valid: this.isValueValid()
      },
      bubbles: false,
      cancelable: false,
      composed: true
    });

    this.dispatchEvent(fieldChangedEvent);
  }
}
