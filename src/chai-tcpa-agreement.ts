import {css, html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

@customElement('chai-tcpa-agreement')
export class ChaiTcpaAgreement extends LitElement {
  static override styles = css`
      label {
          visibility: hidden;
          display: none;
      }

      p {
          color: var(--chai-form-color-text);
          font-size: calc(var(--chai-form-font-size) * 0.8);
      }
      p a {
          color: var(--chai-form-color-text);
          text-decoration: underline;
          cursor: pointer;
      }
  `;
  @property()
  accessor text = 'By submitting this form I consent to receive calls and texts at this number about my move, including marketing by autodialer and prerecorded and artificial voice and email, but not as a condition of any purchase. I also agree to the Terms of Use, and to the Privacy Policy regarding the information relating to me.';

  @property()
  accessor moreText = 'Msg/data rates may apply. This consent applies even if I am on a corporate, state or national Do Not Call list.\n';

  @state()
  private showMoreText = false;

  private toggleMoreText() {
    this.showMoreText = !this.showMoreText;
  }


  protected override render() {
    return html`
      <p>
        ${this.text}
        <a href="javascript:void(0)" @click="${this.toggleMoreText}">
          ${this.showMoreText ? '' : 'More'}
        </a>
        ${this.showMoreText ? html`<span>${this.moreText}</span>` : ''}
      </p>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'chai-tcpa-agreement': ChaiTcpaAgreement;
  }
}
