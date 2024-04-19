/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

export interface ChaiFieldChangedDetails<T> {
  field: string;
  value: T;
  valid: boolean;
}

/**
 * Reusable form element base class.
 */
export abstract class ChaiFieldBase<T> extends LitElement {

  /**
   * The label for this field.
   */
  @property()
  accessor label = this._defaultLabel;

  @property()
  accessor invalidMessage = this._invalidMessage;

  @property({ type: Boolean })
  accessor forceValidation = false;

  @state() protected value: T;

  @state() protected isChanged = false;


  constructor(protected _fieldId: string,
    protected _defaultLabel: string, protected _invalidMessage?: string) {
    super();

    const storedValue = localStorage.getItem(`chai-${this._fieldId}`);
    this.value = this.deserializeValue(storedValue);
    console.info("Field initialized", this._fieldId, this.value);
  }


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
      ${this.renderInput()}
      ${invalid && this.invalidMessage ? html`<span class="error">${this.invalidMessage}</span>` : ''}
    `;
  }


  protected isFieldInvalid() {
    return (this.isChanged || this.forceValidation || this.isValueSet()) && !this.isValueValid();
  }

  protected updateField(newValue: T) {
    console.info("Field updated", this._fieldId, newValue);

    this.value = newValue;

    const serializedValue = this.serializeValue(newValue);
    localStorage.setItem(`chai-${this._fieldId}`, serializedValue);

    // After rendering, bubble up an event to notify the parent form of the update.
    this.notifyParentForm();
  }

  protected blurField() {
    return () => {
      console.info("Field blurred", this._fieldId, this.value);
      this.isChanged = true;
    };
  }

  protected notifyParentForm() {
    let valid;
    try {
      valid = this.isValueValid();
    } catch (e) {
      console.warn("Error validating field", this._fieldId, e);
      valid = false;
    }

    const fieldChangedEvent = new CustomEvent<ChaiFieldChangedDetails<T>>('chai-fieldchanged', {
      detail: {
        field: this._fieldId,
        value: this.value,
        valid: valid
      },
      bubbles: true,
      cancelable: false,
      composed: true
    });

    this.dispatchEvent(fieldChangedEvent);
  }


  protected abstract deserializeValue(storedValue: string | null): T;

  protected abstract serializeValue(value: T): string;

  protected abstract isValueSet(): boolean;

  protected abstract isValueValid(): boolean;

  protected abstract renderInput(): TemplateResult;
}
