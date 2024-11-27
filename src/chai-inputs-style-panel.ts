import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

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

  @property({ type: String }) targetId: string = '';
  @property({ type: Boolean }) expanded: boolean = false;
  @property({ type: String }) headerColor: string = '';
  @property({ type: String }) labelColor: string = '';
  @property({ type: String }) inputColor: string = '';
  @property({ type: String }) inputCornerRadius: string = '';
  @property({ type: String }) inputBorder: string =
    '0.8px solid rgb(233, 228, 224)';
  @property({ type: String }) inputShadow: string =
    'rgba(21, 21, 21, 0.08) 0px 1px 2px 0px';
  @property({ type: Object }) targetElement: HTMLElement | null = null;
  @property({ type: String }) resetValues: string = '';

  @property({ attribute: false }) getTextColor: (colorCode: string) => string =
    () => 'black';



  private initializeDefaultValues() {
    if (this.targetElement) {
      const styles = getComputedStyle(this.targetElement);
      this.headerColor =
        styles.getPropertyValue('--chai-header-color').trim() || '#000';
      this.labelColor =
        styles.getPropertyValue('--chai-label-color').trim() || '#000';
      this.inputColor =
        styles.getPropertyValue('--chai-input-color').trim() || '#000';
      this.inputCornerRadius =
        styles.getPropertyValue('--chai-input-corner-radius').trim() || '5px';
      this.inputBorder =
        styles.getPropertyValue('--chai-input-border').trim() ||
        '1px solid #ccc';
      this.inputShadow =
        styles.getPropertyValue('--chai-input-shadow').trim() ||
        'rgba(21, 21, 21, 0.08) 0px 1px 2px 0px';
    }
  }

  override updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('targetId') && this.targetId) {
      this.requestTargetElement();
    }

    if (changedProperties.has('resetValues') && this.resetValues) {
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
              .value=${this.headerColor}
              @input=${this.handleHeaderColorChange}
              style="--input-text-color: ${this.getTextColor(this.headerColor)}"
            />
          </div>
          <div class="form-control">
            <label>Label Color:</label>
            <input
              type="color"
              value=${this.labelColor}
              .value=${this.labelColor}
              @input=${this.handleLabelColorChange}
              style="--input-text-color: ${this.getTextColor(this.labelColor)}"
            />
          </div>
          <div class="form-control">
            <label>Input Color:</label>
            <input
              type="color"
              value=${this.inputColor}
              .value=${this.inputColor}
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
              .value=${this.getNumericValue(this.inputCornerRadius).toString()}
              @input=${this.handleInputCornerRadiusChange}
            />
          </div>
          <div class="form-control">
            <label>Input Border Width: ${this.inputBorder.split(' ')[0]}</label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              .value=${this.inputBorder.split(' ')[0].slice(0, -2)}
              @input=${this.handleInputBorderWidthChange}
            />
          </div>
          <div class="form-control">
            <label>Input Border Color:</label>
            <input
              type="color"
              value=${this.inputBorder.split(' ')[2]}
              .value=${this.inputBorder.split(' ')[2]}
              @input=${this.handleInputBorderColorChange}
            />
          </div>
          <div class="form-control">
            <label>Input Border Style:</label>
            <select
              .value=${this.inputBorder.split(' ')[1]}
              @change=${this.handleInputBorderStyleChange}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="groove">Groove</option>
              <option value="ridge">Ridge</option>
              <option value="inset">Inset</option>
              <option value="outset">Outset</option>
              <option value="none">None</option>
              <option value="hidden">Hidden</option>
            </select>
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
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-header-color',
        this.headerColor
      );
    }
  }

  private handleLabelColorChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.labelColor = input.value;
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-label-color',
        this.labelColor
      );
    }
  }

  private handleInputColorChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.inputColor = input.value;
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-input-color',
        this.inputColor
      );
    }
  }

  private handleInputCornerRadiusChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.inputCornerRadius = `${value}px`;
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-input-corner-radius',
        this.inputCornerRadius
      );
    }
  }

  private handleInputBorderWidthChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    const parts = this.inputBorder.split(' ');
    parts[0] = `${value}px`;
    this.inputBorder = parts.join(' ');
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-input-border',
        this.inputBorder
      );
    }
  }

  private handleInputBorderColorChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    const parts = this.inputBorder.split(' ');
    parts[2] = value;
    this.inputBorder = `${parts[0]} ${parts[1]} ${parts[2]}`;
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-input-border',
        this.inputBorder
      );
    }
  }

  private handleInputBorderStyleChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    const parts = this.inputBorder.split(' ');
    parts[1] = value;
    this.inputBorder = parts.join(' ');
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-input-border',
        this.inputBorder
      );
    }
  }

  private getNumericValue(value: string): number {
    const cleanValue = eval(value.replace(/px|calc|\(|\)|\"|\s/g, ''));
    return parseInt(cleanValue) || 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-inputs-style-panel': ChaiInputsStylePanel;
  }
}
