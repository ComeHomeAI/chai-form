import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {ChaiFormState} from './ChaiFormState';
import './chai-inputs-state-handler';
import './chai-form';
import './chai-general-form-panel';
import './chai-inputs-style-panel';
import './chai-buttons-style-panel';
import './chai-CopyCode';

@customElement('chai-form-container')
export class ChaiFormContainer extends LitElement {
  static override styles = css`
    :host {
      --form-control-container-gap: 10px;
      --form-control-container-padding: 10px;
      --form-control-container-border: 1px solid #e0e0e0;
      --form-control-container-border-radius: 5px;
      --form-control-container-background: rgba(255, 255, 255, 0.1);
      --form-control-container-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      --form-control-container-transition: grid-template-rows 0.3s ease-in-out;

      --form-control-header-font-weight: bold;
      --form-control-header-font-size: 1.2em;

      --form-control-button-color: #000;
      --form-control-button-padding: 10px 20px;
      --form-control-button-border-radius: 5px;

      --form-control-group-gap: 10px;

      --form-control-margin-bottom: 10px;
      --form-control-gap: 5px;
    }
    .container {
      display: flex;
      align-items: flex-start;
      gap: 1rem;

      .panel-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1000;
        max-height: 100dvh;
        overflow: auto;
      }
    }
  `;

  @state() private formState: ChaiFormState = {
    showName: true,
    showPhone: true,
    showEmail: true,
    showAddress: true,
  };

  override render() {
    return html`
      <div class="container">
        <chai-form id="form1">
          ${this.formState.showName ? html`<chai-name></chai-name>` : ''}
          ${this.formState.showEmail ? html`<chai-email></chai-email>` : ''}
          ${this.formState.showPhone ? html`<chai-phone></chai-phone>` : ''}
          ${this.formState.showAddress
            ? html`<chai-address></chai-address>`
            : ''}
        </chai-form>

        <div class="panel-container">
          <chai-inputs-state-handler
            .formState=${this.formState}
            @form-state-changed=${this.handleFormStateChange}
          ></chai-inputs-state-handler>
          <chai-general-form-panel
            targetId="form1"
            .getTextColor=${this.getTextColor}
          ></chai-general-form-panel>
          <chai-inputs-style-panel
            targetId="form1"
            .getTextColor=${this.getTextColor}
          ></chai-inputs-style-panel>
          <chai-buttons-style-panel
            targetId="form1"
            .getTextColor=${this.getTextColor}
          ></chai-buttons-style-panel>
          <chai-copy-code
            ?showAddress=${this.formState.showAddress}
            ?showEmail=${this.formState.showEmail}
            ?showName=${this.formState.showName}
            ?showPhone=${this.formState.showPhone}
            targetId="form1"
          ></chai-copy-code>
        </div>
      </div>
    `;
  }

  updateFormState(formState: ChaiFormState) {
    this.formState = formState;
  }

  private handleFormStateChange(e: CustomEvent<ChaiFormState>) {
    this.updateFormState(e.detail);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      'request-target-element',
      this.handleRequestTargetElement as EventListener
    );
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      'request-target-element',
      this.handleRequestTargetElement as EventListener
    );
  }

  private handleRequestTargetElement(e: CustomEvent) {
    const {targetId, callback} = e.detail;
    const targetElement = this.shadowRoot?.getElementById(targetId);
    callback(targetElement);
  }

  getTextColor(colorCode: string) {
    // Convert the color code to RGB format
    const hex = colorCode.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate the relative luminance of the color
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    return luminance > 0.5 ? 'black' : 'white';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-form-container': ChaiFormContainer;
  }
}
