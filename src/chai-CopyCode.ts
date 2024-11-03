import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import './chai-name';
import './chai-email';
import './chai-phone';
import './chai-address';

@customElement('chai-copy-code')
export class ChaiCopyCode extends LitElement {
  static override styles = css`
    .form-control-container {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: var(--form-control-container-gap, 10px);
      padding: var(--form-control-container-padding, 10px);
      border: var(--form-control-container-border, 1px solid #e0e0e0);
      border-radius: var(--form-control-container-border-radius, 5px);
      background-color: var(
        --form-control-container-background,
        rgba(255, 255, 255, 0.1)
      );
      backdrop-filter: blur(10px);
      box-shadow: var(
        --form-control-container-box-shadow,
        0 4px 6px rgba(0, 0, 0, 0.1)
      );
      transition: var(
        --form-control-container-transition,
        grid-template-rows 0.3s ease-in-out
      );
    }

    .form-control-header {
      text-align: center;
      font-weight: var(--form-control-header-font-weight, bold);
      font-size: var(--form-control-header-font-size, 1.2em);
    }

    .form-control-header button {
      color: var(--form-control-button-color, #000);
      border: none;
      padding: var(--form-control-button-padding, 10px 20px);
      border-radius: var(--form-control-button-border-radius, 5px);
      cursor: pointer;
    }

    .form-control-group {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--form-control-group-gap, 10px);
      overflow: hidden;
    }

    .form-control {
      margin-bottom: var(--form-control-margin-bottom, 10px);
      display: flex;
      flex-direction: column;
      gap: var(--form-control-gap, 5px);
      justify-content: center;
      align-items: center;
    }

    textarea {
      width: 100%;
      height: 200px;
      resize: none;
    }
  `;

  @property({type: String}) targetId: string = '';
  @property({type: Object}) targetElement: HTMLElement | null = null;
  @property({type: String}) cssValues: string = '';

  @property({type: Boolean}) showName = false;
  @property({type: Boolean}) showPhone = false;
  @property({type: Boolean}) showEmail = false;
  @property({type: Boolean}) showAddress = false;

  private observer: MutationObserver | null = null;

  override updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('targetId') && this.targetId) {
      this.requestTargetElement();
    }

    if (
      changedProperties.has('showName') ||
      changedProperties.has('showPhone') ||
      changedProperties.has('showEmail') ||
      changedProperties.has('showAddress')
    ) {
      this.initializeDefaultValues();
    }
  }

  private requestTargetElement() {
    this.dispatchEvent(
      new CustomEvent('request-target-element', {
        bubbles: true,
        composed: true,
        detail: {
          targetId: this.targetId,
          callback: this.setTargetElement.bind(this),
        },
      })
    );
  }

  private setTargetElement(element: HTMLElement | null) {
    this.targetElement = element;
    if (this.targetElement) {
      this.initializeDefaultValues();
      this.observeTargetElement();
    } else {
      console.warn(`Element with id "${this.targetId}" not found`);
    }
  }

  private initializeDefaultValues() {
    if (this.targetElement) {
      const styles = this.targetElement.getAttribute('style');
      this.cssValues = `
${
  styles
    ? `
<style>
  chai-form${
    this.targetElement.className ? `.${this.targetElement.className}` : ''
  }{
    ${styles.replaceAll(';', '; \n')}
  }
</style>`
    : ''
}
<chai-form${
        this.targetElement.className
          ? ` class="${this.targetElement.className}"`
          : ''
      }>
    ${this.showName ? `<chai-name></chai-name>` : ''}
    ${this.showEmail ? `<chai-email></chai-email>` : ''}
    ${this.showPhone ? `<chai-phone></chai-phone>` : ''}
    ${this.showAddress ? `<chai-address></chai-address>` : ''}
</chai-form>`.trim();
    }
  }

  private observeTargetElement() {
    if (this.targetElement) {
      this.observer = new MutationObserver(() => {
        this.initializeDefaultValues();
      });

      this.observer.observe(this.targetElement, {
        attributes: true,
        attributeFilter: ['style', 'class'],
      });
    }
  }

  override disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
    super.disconnectedCallback();
  }

  override render() {
    return html`
      <div class="form-control-container">
        <div class="form-control-header">
          <button @click=${this.copyToClipboard}>Copy CSS Variables</button>
          <button @click=${this.resetValues}>Reset Values</button>
        </div>
        <div class="form-control-group">
          <div class="form-control">
            <textarea readonly>${this.cssValues}</textarea>
          </div>
        </div>
      </div>
    `;
  }

  private resetValues() {
    this.dispatchEvent(
      new CustomEvent('reset-values', {bubbles: true, composed: true})
    );
    if (this.targetElement) {
      this.targetElement.removeAttribute('style');
      this.initializeDefaultValues();
    }
  }

  private copyToClipboard() {
    navigator.clipboard.writeText(this.cssValues).then(
      () => {
        alert('CSS variables copied to clipboard');
      },
      (err) => {
        console.error('Failed to copy CSS variables: ', err);
      }
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-copy-code': ChaiCopyCode;
  }
}
