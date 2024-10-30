import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';

@customElement('chai-inputs-style-panel')
export class ChaiInputsStylePanel extends LitElement {
  static override styles = css`
    .form-control-container {
      display: grid;
      grid-template-rows: auto 0fr;
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

    .form-control-container.expanded {
      grid-template-rows: auto 1fr;
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
      grid-template-columns: 1fr 1fr;
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

    input[type='color'] {
      position: relative;
      appearance: none;
      width: 100%;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      background-color: transparent;
    }

    input[type='color']::after {
      content: attr(value);
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      color: var(--input-text-color, #000);
      filter: drop-shadow(0 0 0 10px var(--input-text-color, #000));
    }
  `;

  @property({type: String}) targetId: string = '';
  @property({type: Boolean}) expanded: boolean = false;
  @property({type: String}) headerColor: string = '';
  @property({type: String}) labelColor: string = '';
  @property({type: String}) inputColor: string = '';
  @property({type: String}) inputCornerRadius: string = '';
  @property({type: Object}) targetElement: HTMLElement | null = null;
  @property({type: Function}) getTextColor: (colorCode: string) => string =
    () => 'black';

  override connectedCallback() {
    super.connectedCallback();
    this.initializeDefaultValues();
  }

  private initializeDefaultValues() {
    if (this.targetElement) {
      const styles = getComputedStyle(this.targetElement);
      this.headerColor =
        styles.getPropertyValue('--chai-header-color').trim() ||
        'var(--chai-form-color-text)';
      this.labelColor =
        styles.getPropertyValue('--chai-label-color').trim() ||
        'var(--chai-form-color-text)';
      this.inputColor =
        styles.getPropertyValue('--chai-input-color').trim() || '#000';
      this.inputCornerRadius =
        styles.getPropertyValue('--chai-input-corner-radius').trim() ||
        'calc(var(--chai-form-corner-radius) / 4)';
    }
  }

  override updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('targetId') && this.targetId) {
      this.requestTargetElement();
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
    } else {
      console.warn(`Element with id "${this.targetId}" not found`);
    }
  }

  override render() {
    return html`
      <div class="form-control-container ${this.expanded ? 'expanded' : ''}">
        <div class="form-control-header">
          <button @click=${this.toggleExpanded}>
            Inputs Style ${this.expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <div class="form-control-group">
          <div class="form-control">
            <label>Header Color:</label>
            <input
              type="color"
              value=${this.headerColor}
              @input=${this.handleHeaderColorChange}
              style="--input-text-color: ${this.getTextColor(this.headerColor)}"
            />
          </div>
          <div class="form-control">
            <label>Label Color:</label>
            <input
              type="color"
              value=${this.labelColor}
              @input=${this.handleLabelColorChange}
              style="--input-text-color: ${this.getTextColor(this.labelColor)}"
            />
          </div>
          <div class="form-control">
            <label>Input Color:</label>
            <input
              type="color"
              value=${this.inputColor}
              @input=${this.handleInputColorChange}
              style="--input-text-color: ${this.getTextColor(this.inputColor)}"
            />
          </div>
          <div class="form-control">
            <label
              >Corner Radius:
              ${this.getNumericValue(this.inputCornerRadius)}px</label
            >
            <input
              type="range"
              min="0"
              max="20"
              value=${this.getNumericValue(this.inputCornerRadius)}
              @input=${this.handleInputCornerRadiusChange}
            />
          </div>
        </div>
      </div>
    `;
  }

  private toggleExpanded() {
    this.expanded = !this.expanded;
  }

  private handleHeaderColorChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.headerColor = input.value;
    input.style.setProperty(
      '--input-text-color',
      this.getTextColor(this.headerColor)
    );
    this.updateStyles();
  }

  private handleLabelColorChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.labelColor = input.value;
    input.style.setProperty(
      '--input-text-color',
      this.getTextColor(this.labelColor)
    );
    this.updateStyles();
  }

  private handleInputColorChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.inputColor = input.value;
    input.style.setProperty(
      '--input-text-color',
      this.getTextColor(this.inputColor)
    );
    this.updateStyles();
  }

  private handleInputCornerRadiusChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.inputCornerRadius = `${value}px`;
    this.updateStyles();
  }

  private getNumericValue(value: string): number {
    const cleanValue = eval(value.replace(/px|calc|\(|\)|\"|\s/g, ''));
    return parseInt(cleanValue) || 0;
  }

  private updateStyles() {
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-header-color',
        this.headerColor
      );
      this.targetElement.style.setProperty(
        '--chai-label-color',
        this.labelColor
      );
      this.targetElement.style.setProperty(
        '--chai-input-color',
        this.inputColor
      );
      this.targetElement.style.setProperty(
        '--chai-input-corner-radius',
        this.inputCornerRadius
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-inputs-style-panel': ChaiInputsStylePanel;
  }
}
