import {ChaiFieldBase} from './ChaiFieldBase';
import {css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

@customElement('chai-tcpa-agreement')
export class ChaiTcpaAgreement extends ChaiFieldBase<boolean> {
  static override styles = css`
      label {
          visibility: hidden;
          display: none;
      }

      p {
          font-size: calc(var(--chai-form-font-size) * 0.8);
      }

  `;

  constructor() {
    super('tcpa-agreement', '', '');
  }

  @property()
  accessor text = 'I consent to receive calls and texts at this number about my move, including marketing by autodialer and prerecorded and artificial voice and email, but not as a condition of any purchase. I also agree to the Terms of Use, and to the Privacy Policy regarding the information relating to you.';

  @property()
  accessor moreText = 'Msg/data rates may apply. This consent applies even if I am on a corporate, state or national Do Not Call list.\n';

  @state()
  private showMoreText = false;

  protected deserializeValue(storedValue: string | null): boolean {
    return storedValue === 'true';
  }

  protected isValueSet(): boolean {
    return true;
  }

  protected isValueValid(): boolean {
    return true;
  }

  private checked() {
    this.value = !this.value;
    this.updateField(this.value);
  }

  private toggleMoreText() {
    this.showMoreText = !this.showMoreText;
  }


  protected override renderInput() {
    return html`
      <p>
        <input id="${this._fieldId}" name="tcpa-agreement" type="checkbox" .checked="${this.value}" @click="${this.checked}" />
        ${this.text}
        <a href="javascript:void(0)" @click="${this.toggleMoreText}">
          ${this.showMoreText ? '' : 'More'}
        </a>
        ${this.showMoreText ? html`<span>${this.moreText}</span>` : ''}
      </p>
    `;
  }

  protected serializeValue(value: boolean): string {
    return value.toString();
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'chai-tcpa-agreement': ChaiTcpaAgreement;
  }
}
