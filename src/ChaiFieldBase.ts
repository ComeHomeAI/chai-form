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

  @property()
  accessor debounceWaitTime: number = 500;

  @state() protected value: T;

  @state() protected isChanged = false;

  @state() protected timeout: number | undefined;


  constructor(protected _fieldId: string,
    protected _defaultLabel: string, protected _invalidMessage?: string) {
    super();

    const storedValue = localStorage.getItem(`chai-${this._fieldId}`);
    this.value = this.deserializeValue(storedValue);
    console.info("Field initialized", this._fieldId, this.value);
  }

  protected override firstUpdated(): void {
    console.log("Field first updated");
    // When first changed, bubble up an event to notify the parent form of the field's existence
    // Ignore the initial state. Once the user interacts with the field we will send the data to the server
    this.notifyParentForm(true);
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

  private debounce(callback: Function, wait: number) {
      if (this.timeout !== undefined) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        callback();
      }, wait);
  }

  protected sanitizeField(newValue: T): T{
    return newValue;
  }

  protected onChangedFieldValid(){

  }

  protected updateField(newValue: T) {
    console.info("Field updated", this._fieldId, newValue);
    newValue = this.sanitizeField(newValue);

    this.value = newValue;

    const serializedValue = this.serializeValue(newValue);
    localStorage.setItem(`chai-${this._fieldId}`, serializedValue);

    // After rendering, bubble up an event to notify the parent form of the update.
    // Debounce this to avoid minor changes racing each other on the backend
    this.debounce(() => this.notifyParentForm(false), this.debounceWaitTime);
  }

  protected blurField() {
    return () => {
      console.info("Field blurred", this._fieldId, this.value);
      this.isChanged = true;
    };
  }

  protected notifyParentForm(fieldInitialLoad: boolean) {
    let valid;
    try {
      valid = this.isValueValid();
    } catch (e) {
      console.warn("Error validating field", this._fieldId, e);
      valid = false;
    }

    if (valid && !fieldInitialLoad) {
      this.onChangedFieldValid();
    }

    let eventTarget: string;
    if (fieldInitialLoad) {
      eventTarget = 'chai-fieldinit';
    } else {
      eventTarget = 'chai-fieldchanged';
    }
    const event = new CustomEvent<ChaiFieldChangedDetails<T>>(eventTarget, {
      detail: {
        field: this._fieldId,
        value: this.value,
        valid: valid
      },
      bubbles: true,
      cancelable: false,
      composed: true
    });

    this.dispatchEvent(event);
  }


  protected abstract deserializeValue(storedValue: string | null): T;

  protected abstract serializeValue(value: T): string;

  protected abstract isValueSet(): boolean;

  protected abstract isValueValid(): boolean;

  protected abstract renderInput(): TemplateResult;
}
