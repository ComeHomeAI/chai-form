import {customElement} from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';

@customElement('chai-unicorn-agreement')
export class ChaiUnicornAgreement extends LitElement {
  static override styles = css`
    p {
      color: var(--chai-form-color-text);
      font-size: calc(var(--chai-form-font-size) * 0.8);
      margin-block-start: 0;
      margin-block-end: 0;
    }
  `;
  protected override render() {
    return html`<p>
      <input type="checkbox" id="consent" /><label for="consent"
    >I agree to receive appointment confirmations, schedule and arrival
      updates</label
    >
    </p>
    <p>
      <input type="checkbox" id="consent" /><label for="consent"
    >I consent to receiving quotation from Unicorn Moving</label
    >
    </p>
    <p>
      By providing your phone number you agree to receive informational text
      messages and calls from Unicorn Moving and Storage. Consent is not a
      condition of purchase. Messages Frequency will vary. Msg & data rates
      may apply. Reply HELP for help or STOP to cancel. Unicorn Moving and
      Storage will not share your contact phone number with any other parties.
    </p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-unicorn-agreement': ChaiUnicornAgreement;
  }
}
