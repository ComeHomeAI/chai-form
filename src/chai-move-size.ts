import {customElement, property} from 'lit/decorators.js';
import {ChaiFieldBase} from './ChaiFieldBase';
import {css, html, TemplateResult} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

enum MoveSize {
  Studio = 0,
  OneBedroom = 1,
  TwoBedrooms = 2,
  ThreeBedrooms = 3,
  FourBedrooms = 4,
  FiveBedrooms = 5,
  SixBedrooms = 6,
  MoreThanSix = 7,
  Other = 8,
  MissingValue = 9,
}

@customElement('chai-move-size')
export class ChaiMoveSize extends ChaiFieldBase<string> {
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
      select {
        font-size: var(--chai-form-font-size);
        font-family: sans-serif;
        color: var(--chai-input-color);
        border: var(--chai-input-border);
        border-radius: var(--chai-input-corner-radius);
        box-shadow: var(--chai-input-shadow);
        padding: calc(var(--chai-form-spacing) / 2);
        margin-bottom: calc(var(--chai-form-spacing) / 2);
        background-color: white;

        &:focus-visible {
          outline-color: var(--chai-input-color);
        }

        &.invalid {
          outline-color: var(--chai-form-color-alert);
        }
      }
    `,
  ];
  constructor() {
    super('move-size', 'Move Size', 'Please enter a valid move size.');
  }
  /**
   * A placeholder value to show for this field.
   */
  @property()
  accessor placeHolder = '';

  protected override isValueValid() {
    return this.isValueSet();
  }

  private updateFieldEnum(value: MoveSize) {
    const moveSizeElement: string = MoveSize[value];
    console.log('MoveSize: ' + moveSizeElement);
    this.updateField(moveSizeElement);
  }

  protected override renderInput(): TemplateResult {
    const classInfo = {invalid: this.isFieldInvalid()};
    return html` <select
      id=${this._fieldId}
      class=${classMap(classInfo)}
      @input=${async (e: Event) =>
        this.updateFieldEnum(
          MoveSize[
            (e.target as HTMLSelectElement).value as keyof typeof MoveSize
          ]
        )}
    >
      <option
        label="${ifDefined(this.placeHolder)}"
        hidden
        value=${MoveSize.MissingValue}
      ></option>
      <option
        label="Studio"
        value=${MoveSize.Studio}
        ?selected=${'0' == this.value}
      ></option>
      <option
        label="1 Bedroom"
        value=${MoveSize.OneBedroom}
        ?selected=${'1' == this.value}
      ></option>
      <option
        label="2 Bedrooms"
        value=${MoveSize.TwoBedrooms}
        ?selected=${'2' == this.value}
      ></option>
      <option
        label="3 Bedrooms"
        value=${MoveSize.ThreeBedrooms}
        ?selected=${'3' == this.value}
      ></option>
      <option
        label="4 Bedrooms"
        value=${MoveSize.FourBedrooms}
        ?selected=${'4' == this.value}
      ></option>
      <option
        label="5 Bedrooms"
        value=${MoveSize.FiveBedrooms}
        ?selected=${'5' == this.value}
      ></option>
      <option
        label="6 Bedrooms"
        value=${MoveSize.SixBedrooms}
        ?selected=${'6' == this.value}
      ></option>
      <option
        label="More than 6"
        value=${MoveSize.MoreThanSix}
        ?selected=${'7' == this.value}
      ></option>
      <option
        label="Other"
        value=${MoveSize.Other}
        ?selected=${'8' == this.value}
      ></option>
    </select>`;
  }

  protected override deserializeValue(storedValue: string | null): string {
    return storedValue ?? '';
  }

  protected override serializeValue(value: string): string {
    return value;
  }

  protected isValueSet(): boolean {
    // this.value can actually be undefined if nothing has been selected yet
    // noinspection JSIncompatibleTypesComparison
    return this.value != undefined && this.value != '9';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-move-size': ChaiMoveSize;
  }
}
