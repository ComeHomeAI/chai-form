/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ChaiFieldChangedEvent } from './ChaiFieldChangedEvent';

/**
 * The standard form element for the resident's full name.
 */
@customElement('chai-name')
export class ChaiName extends LitElement { //TODO: Make a reusable ChaiField (mixin or subclass)
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
  accessor label = "Name";

  /**
   * A placeholder value to show for this field.
   */
  @property()
  accessor placeholder = "First & Last Name";

  @state() private value: string;

  @state() private isChanged = false;

  constructor() {
    super();

    this.value = localStorage.getItem('chai-name') || '';
  }

  private isFieldInvalid() {
    return this.isChanged && !this.isValueValid();
  }

  private isValueValid() {
    return this.value.length > 2;
  }

  override render() {
    const invalid = this.isFieldInvalid();

    return html`
      <label for="name">${this.label} <span title="Required">*</span></label>
      <input id="name" type="text" placeholder="${this.placeholder}"
        class=${classMap({ invalid: invalid })} @blur="${this.blurField()}"
        autocomplete="name" required
        .value="${this.value}" @input="${this.updateField()}">
      ${invalid ? html`<span class="error">Please enter your name.</span>` : ''}
    `;
  }

  updateField() {
    return (e: Event) => {
      const newValue = (e.target as HTMLInputElement).value;

      this.value = newValue;

      localStorage.setItem(`chai-name`, newValue);

      const fieldChangedEvent = new ChaiFieldChangedEvent('name', newValue);
      this.dispatchEvent(fieldChangedEvent);
    };
  }

  blurField() {
    return () => {
      this.isChanged = true;
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-name': ChaiName;
  }
}
