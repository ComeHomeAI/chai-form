/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { customElement, property } from 'lit/decorators.js';
import { ChaiFieldBase } from './ChaiFieldBase';
import { css, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import '@googlemaps/extended-component-library/api_loader.js';
import '@googlemaps/extended-component-library/place_picker.js';
import { PlacePicker } from '@googlemaps/extended-component-library/lib/place_picker/place_picker';
import { waitForElement } from './chai-utils';

/**
 * The standard form element for the resident's address.
 */
@customElement('chai-destination')
export class ChaiDestination extends ChaiFieldBase<string> { // The stored value is the Google Place ID
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
      margin-bottom: calc(-1 * var(--chai-form-spacing) / 1.5);
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
    gmpx-place-picker {
      --gmpx-color-surface: #fff;
      --gmpx-color-on-surface: var(--chai-input-color);
      /* --gmpx-color-on-surface-variant: #757575; */
      --gmpx-color-primary: var(--chai-form-color-brand);
      /* --gmpx-color-on-primary: #fff; */
      --gmpx-font-family-base: sans-serif;//var(--chai-form-font-family); //TODO: ???
      /* --gmpx-font-family-headings: var(--chai-form-font-family); //TODO: ??? */
      --gmpx-font-size-base: var(--chai-form-font-size);//0.875rem;
      box-shadow: var(--chai-input-shadow);
      margin-bottom: calc(var(--chai-form-spacing) / 2);

      &.invalid {
        /* --gmpx-color-primary: var(--chai-form-color-alert); */
        border: 2px solid var(--chai-form-color-alert);
        border-radius: 6px;//(--chai-input-corner-radius);
        //border-width: 2px;
      }
    }
  `;


  /**
   * A placeholder value to show for this field.
   */
  @property()
  accessor placeholder = "Destination Address";


  constructor() {
    super("destination", "Destination Address", "Please enter a valid address.");
  }



  protected override firstUpdated() {
    super.firstUpdated();
    //TODO: Assign this handler via @gmpx-placechange in the template (but that requires @query to work correctly!)
    const picker = this.renderRoot.querySelector<PlacePicker>('gmpx-place-picker')!;
    waitForElement(() => picker.shadowRoot?.querySelector<HTMLInputElement>('input')).then((input) => {
      input.addEventListener('input', (_) => {
        const eventManualAddress = input.value;
        localStorage.removeItem("chai-destination-formatted-address");
        // Set the manual value from the user input. If the user picks a place from the gmaps autocomplete dropdown the value will be set by the place-picker
        this.updateField(eventManualAddress);
      });
      if (this.value.startsWith("places/")) {
        // not setting value to the place id, but to the formatted address
        input.value = localStorage.getItem("chai-destination-formatted-address") ?? "";
      } else {
        input.value = this.value;
      }
    });
    picker.addEventListener('gmpx-placechange', () => {
      localStorage.setItem("chai-destination-formatted-address", picker.value?.formattedAddress ?? "");
      this.updateField(picker.value?.id ? `places/${picker.value.id}` : "");
      console.log(picker.value?.id);
      console.log(picker.value?.formattedAddress);
    });
  }


  protected override deserializeValue(storedValue: string | null) {
    return storedValue ?? "";
  }

  protected override serializeValue(value: string) {
    return value;
  }

  protected override isValueSet() {
    return this.value !== "";
  }

  protected override isValueValid() {
    return /\w+/.test(this.value);
  }

  protected override renderInput() {
    const invalid = this.isFieldInvalid();

    return html`
      <gmpx-place-picker id="${this._fieldId}" class=${classMap({ invalid: invalid })}
        type="address" placeholder="${ifDefined(this.placeholder)}"
        .country=${["US", "CA"]}
        @blur="${this.blurField()}"></gmpx-place-picker>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-destination': ChaiDestination;
  }
}
