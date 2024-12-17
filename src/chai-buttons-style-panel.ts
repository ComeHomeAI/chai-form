import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('chai-buttons-style-panel')
export class ChaiButtonsStylePanel extends LitElement {
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
  @property({ type: String }) buttonBackground: string = '';
  @property({ type: String }) buttonBackgroundActive: string = '';
  @property({ type: String }) buttonBackgroundHover: string = '';
  @property({ type: String }) buttonColor: string = '';
  @property({ type: String }) buttonCornerRadius: string = '';
  @property({ type: String }) buttonFilterActive: string = '';
  @property({ type: String }) buttonFilterHover: string = '';
  @property({ type: String }) buttonFontSize: string = '';
  @property({ type: String }) buttonTextTransform: string = '';
  @property({ type: Object }) targetElement: HTMLElement | null = null;
  @property({ type: String }) resetValues: string = '';

  @property({ attribute: false }) getTextColor: (colorCode: string) => string =
    () => 'black';

  override connectedCallback() {
    super.connectedCallback();
    this.initializeDefaultValues();
  }

  private initializeDefaultValues() {
    if (this.targetElement) {
      const styles = getComputedStyle(this.targetElement);
      this.buttonBackground =
        styles.getPropertyValue('--chai-button-background').trim() || '#fff';
      this.buttonBackgroundActive =
        styles.getPropertyValue('--chai-button-background-active').trim() ||
        '#ccc';
      this.buttonBackgroundHover =
        styles.getPropertyValue('--chai-button-background-hover').trim() ||
        '#ddd';
      this.buttonColor =
        styles.getPropertyValue('--chai-button-color').trim() || '#fff';
      this.buttonCornerRadius =
        styles.getPropertyValue('--chai-button-corner-radius').trim() || '5px';
      this.buttonFilterActive =
        styles.getPropertyValue('--chai-button-filter-active').trim() || 'none';
      this.buttonFilterHover =
        styles.getPropertyValue('--chai-button-filter-hover').trim() || 'none';
      this.buttonFontSize =
        styles.getPropertyValue('--chai-button-font-size').trim() || '16px';
      this.buttonTextTransform =
        styles.getPropertyValue('--chai-button-text-transform').trim() ||
        'none';
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
            Buttons Style ${this.expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <div class="form-control-group">
          <div class="form-control">
            <label>Background:</label>
            <input
              type="color"
              value=${this.buttonBackground}
              .value=${this.buttonBackground}
              @input=${this.handleButtonBackgroundChange}
              style="--input-text-color: ${this.getTextColor(
      this.buttonBackground

    )}"
            />
          </div>
          <div class="form-control">
            <label>Background Active:</label>
            <input
              type="color"
              value=${this.buttonBackgroundActive}
              .value=${this.buttonBackgroundActive}
              @input=${this.handleButtonBackgroundActiveChange}
              style="--input-text-color: ${this.getTextColor(
      this.buttonBackgroundActive
    )}"
            />
          </div>
          <div class="form-control">
            <label>Background Hover:</label>
            <input
              type="color"
              value=${this.buttonBackgroundHover}
              .value=${this.buttonBackgroundHover}
              @input=${this.handleButtonBackgroundHoverChange}
              style="--input-text-color: ${this.getTextColor(
      this.buttonBackgroundHover
    )}"
            />
          </div>
          <div class="form-control">
            <label>Color:</label>
            <input
              type="color"
              value=${this.buttonColor}
              .value=${this.buttonColor}
              @input=${this.handleButtonColorChange}
              style="--input-text-color: ${this.getTextColor(this.buttonColor)}"
            />
          </div>
          <div class="form-control">
            <label>Corner Radius: ${this.buttonCornerRadius}</label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              .value=${this.buttonCornerRadius}
              @input=${this.handleButtonCornerRadiusChange}
            />
            
          </div>
          <div class="form-control">
            <label>Filter Active: ${this.buttonFilterActive}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              .value=${this.buttonFilterActive}
              @input=${this.handleButtonFilterActiveChange}
            />
          </div>
          <div class="form-control">
            <label>Filter Hover: ${this.buttonFilterHover}</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              .value=${this.buttonFilterHover}
              @input=${this.handleButtonFilterHoverChange}
            />
          </div>
          <div class="form-control">
            <label>Font Size: ${this.buttonFontSize}</label>
            <input
              type="range"
              min="10"
              max="30"
              .value=${this.buttonFontSize}
              @input=${this.handleButtonFontSizeChange}
            />
          </div>
          <div class="form-control">
            <label>Text Transform: ${this.buttonTextTransform}</label>
            <select
              .value=${this.buttonTextTransform}
              @change=${this.handleButtonTextTransformChange}
            >
              <option value="none">None</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="capitalize">Capitalize</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }

  private toggleExpanded() {
    this.expanded = !this.expanded;
  }

  private handleButtonBackgroundChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.buttonBackground = input.value;

    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-button-background',
        this.buttonBackground
      );
    }
  }

  private handleButtonBackgroundActiveChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.buttonBackgroundActive = input.value;

    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-button-background-active',
        this.buttonBackgroundActive
      );
    }
  }

  private handleButtonBackgroundHoverChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.buttonBackgroundHover = input.value;

    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-button-background-hover',
        this.buttonBackgroundHover
      );
    }
  }

  private handleButtonColorChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.buttonColor = input.value;

    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-button-color',
        this.buttonColor
      );
    }
  }

  private handleButtonCornerRadiusChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.buttonCornerRadius = `${value}px`;
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-button-corner-radius',
        this.buttonCornerRadius
      );
    }
  }

  private handleButtonFilterActiveChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.buttonFilterActive = `brightness(${value})`;


    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-button-filter-active',
        this.buttonFilterActive
      );
    }
  }

  private handleButtonFilterHoverChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.buttonFilterHover = `brightness(${value})`;

    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-button-filter-hover',
        this.buttonFilterHover
      );
    }
  }

  private handleButtonFontSizeChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.buttonFontSize = `${value}px`;

    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-button-font-size',
        this.buttonFontSize
      );
    }
  }

  private handleButtonTextTransformChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.buttonTextTransform = `${value}`;

    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-button-text-transform',
        this.buttonTextTransform
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-buttons-style-panel': ChaiButtonsStylePanel;
  }
}
