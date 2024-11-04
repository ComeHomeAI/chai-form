import {LitElement, css, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';

@customElement('chai-general-form-panel')
export class ChaiGeneralFormPanel extends LitElement {
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
  @property({type: String}) flexDirection: string = '';
  @property({type: String}) maxWidth: string = '';
  @property({type: String}) colorBrand: string = '';
  @property({type: String}) colorText: string = '';
  @property({type: String}) background: string = '';
  @property({type: String}) colorAlert: string = '';
  @property({type: String}) fontSize: string = '';
  @property({type: Number}) fontWeight: number = 0;
  @property({type: String}) border: string = '';
  @property({type: String}) cornerRadius: string = '';
  @property({type: String}) spacing: string = '';
  @property({type: Object}) targetElement: HTMLElement | null = null;
  @property({attribute: false}) getTextColor: (colorCode: string) => string =
    () => 'black';

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

  private initializeDefaultValues() {
    if (this.targetElement) {
      const styles = getComputedStyle(this.targetElement);

      this.border =
        styles.getPropertyValue('--chai-form-border').trim() ||
        '1px solid #ccc';
      this.flexDirection =
        this.flexDirection ||
        styles.getPropertyValue('--chai-form-flex-direction').trim() ||
        'column';
      this.maxWidth =
        this.maxWidth ||
        styles.getPropertyValue('--chai-form-max-width').trim();

      this.colorBrand =
        this.colorBrand ||
        styles.getPropertyValue('--chai-form-color-brand').trim() ||
        '#01919b';

      this.colorText =
        this.colorText ||
        styles.getPropertyValue('--chai-form-color-text').trim() ||
        '#01919b';
      this.background =
        this.background ||
        styles.getPropertyValue('--chai-form-background').trim() ||
        '#fff';

      this.colorAlert =
        this.colorAlert ||
        styles.getPropertyValue('--chai-form-color-alert').trim() ||
        '#fa2829';

      this.fontSize =
        this.fontSize ||
        styles.getPropertyValue('--chai-form-font-size').trim() ||
        '16px';

      this.fontWeight =
        this.fontWeight ||
        parseInt(styles.getPropertyValue('--chai-form-font-weight').trim()) ||
        400;
      this.cornerRadius =
        this.cornerRadius ||
        styles.getPropertyValue('--chai-form-corner-radius').trim() ||
        '8px';

      this.spacing =
        this.spacing ||
        styles.getPropertyValue('--chai-form-spacing').trim() ||
        '16px';
    }
  }

  override render() {
    return html`
      <div class="form-control-container ${this.expanded ? 'expanded' : ''}">
        <div class="form-control-header">
          <button @click=${this.toggleExpanded}>
            Form Style ${this.expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <div class="form-control-group">
          <div class="form-control">
            <label>Form header text:</label>
            <input
              type="text"
              @input=${(e: Event) =>
                this.handleHeaderTextChange(
                  (e.target as HTMLInputElement).value.trim()
                )}
            />
          </div>
          <div class="form-control">
            <label>Form button text:</label>
            <input
              type="text"
              @input=${(e: Event) =>
                this.handleButtonTextChange(
                  (e.target as HTMLInputElement).value.trim()
                )}
            />
          </div>
          <div class="form-control">
            <label>Form class name:</label>
            <input
              type="text"
              @input=${(e: Event) =>
                this.handleClassNameChange(
                  (e.target as HTMLInputElement).value
                    .toLocaleLowerCase()
                    .trim()
                )}
            />
          </div>
          <div class="form-control">
            <label>Brand Color:</label>
            <input
              type="color"
              value=${this.colorBrand}
              @input=${this.handleColorBrandChange}
              style="--input-text-color: ${this.getTextColor(this.colorBrand)}"
            />
          </div>

          <div class="form-control">
            <label>Text Color:</label>
            <input
              type="color"
              value=${this.colorText || this.colorBrand}
              @input=${this.handleColorTextChange}
              style="--input-text-color: ${this.getTextColor(
                this.colorText || this.colorBrand
              )}"
            />
          </div>
          <div class="form-control">
            <label>Background:</label>
            <input
              type="color"
              value=${this.background}
              @input=${this.handleBackgroundChange}
              style="--input-text-color: ${this.getTextColor(this.background)}"
            />
          </div>
          <div class="form-control">
            <label>Alert color:</label>
            <input
              type="color"
              value=${this.colorAlert}
              @input=${this.handleAlertColorChange}
              style="--input-text-color: ${this.getTextColor(this.colorAlert)}"
            />
          </div>

          <div class="form-control">
            <label>Flex Direction:</label>
            <select
              .value=${this.flexDirection}
              @change=${this.handleFlexDirectionChange}
            >
              <option value="column">Column</option>
              <option value="row">Row</option>
            </select>
          </div>
          <div class="form-control">
            <label>Max Width ${this.maxWidth}</label>
            <input
              type="range"
              min="100"
              max="1000"
              step="10"
              value=${this.maxWidth.slice(0, -2)}
              @input=${this.handleMaxWidthChange}
            />
          </div>
          <div class="form-control">
            <label>Font Size ${this.fontSize}</label>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value=${this.fontSize.slice(0, -2)}
              @input=${this.handleFontSizeChange}
            />
          </div>
          <div class="form-control">
            <label>Font Weight ${this.fontWeight}</label>
            <input
              type="range"
              min="100"
              max="900"
              step="100"
              value=${this.fontWeight}
              @input=${this.handleFontWeightChange}
            />
          </div>

          <div class="form-control">
            <label>Corner Radius ${this.cornerRadius}</label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value=${this.cornerRadius.slice(0, -2)}
              @input=${this.handleCornerRadiusChange}
            />
          </div>

          <div class="form-control">
            <label>Spacing ${this.spacing}</label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value=${this.spacing.slice(0, -2)}
              @input=${this.handleSpacingChange}
            />
          </div>

          <div class="form-control">
            <label>border width ${this.border.split(' ')[0]}</label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value=${this.border.split(' ')[0].slice(0, -2)}
              @input=${this.handleBorderWidthChange}
            />
          </div>

          <div class="form-control">
            <label>border color:</label>
            <input
              type="color"
              value=${this.border.split(' ')[2]}
              @input=${this.handleBorderColorChange}
            />
          </div>

          <div class="form-control">
            <label>Border Style:</label>
            <select
              .value=${this.border.split(' ')[1]}
              @change=${this.handleBorderStyleChange}
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

  private handleFlexDirectionChange(e: Event) {
    this.flexDirection = (e.target as HTMLSelectElement).value;
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-form-flex-direction',
        this.flexDirection
      );
    }
  }

  private handleMaxWidthChange(e: Event) {
    const maxWidth = (e.target as HTMLInputElement).value;
    this.maxWidth = maxWidth + 'px';
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-form-max-width',
        this.maxWidth
      );
    }
  }

  private handleColorBrandChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.colorBrand = input.value;
    input.style.setProperty(
      '--input-text-color',
      this.getTextColor(this.colorBrand)
    );
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-form-color-brand',
        this.colorBrand
      );
    }
  }

  private handleColorTextChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.colorText = input.value;
    input.style.setProperty(
      '--input-text-color',
      this.getTextColor(this.colorText)
    );
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-form-color-text',
        this.colorText
      );
    }
  }

  private handleAlertColorChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.colorAlert = input.value;
    input.style.setProperty(
      '--input-text-color',
      this.getTextColor(this.colorAlert)
    );
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-form-color-alert',
        this.colorAlert
      );
    }
  }

  private handleBackgroundChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.background = input.value;
    input.style.setProperty(
      '--input-text-color',
      this.getTextColor(this.background)
    );
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-form-background',
        this.background
      );
    }
  }

  private handleFontSizeChange(e: Event) {
    const fontSize = (e.target as HTMLInputElement).value;
    this.fontSize = fontSize + 'px';
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-form-font-size',
        this.fontSize
      );
    }
  }

  private handleFontWeightChange(e: Event) {
    const fontWeight = (e.target as HTMLInputElement).value;
    this.fontWeight = parseInt(fontWeight);
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-form-font-weight',
        this.fontWeight.toString()
      );
    }
  }

  private handleCornerRadiusChange(e: Event) {
    const cornerRadius = (e.target as HTMLInputElement).value;
    this.cornerRadius = cornerRadius + 'px';
    if (this.targetElement) {
      this.targetElement.style.setProperty(
        '--chai-form-corner-radius',
        this.cornerRadius
      );
    }
  }

  private handleSpacingChange(e: Event) {
    const spacing = (e.target as HTMLInputElement).value;
    this.spacing = spacing + 'px';
    if (this.targetElement) {
      this.targetElement.style.setProperty('--chai-form-spacing', this.spacing);
    }
  }
  private handleBorderWidthChange(e: Event) {
    const width = (e.target as HTMLInputElement).value;

    const value = this.border;
    const splitedValue = value.split(' ');
    this.border = `${width}px ${splitedValue[1]} ${splitedValue[2]}`;
    if (this.targetElement) {
      this.targetElement.style.setProperty('--chai-form-border', this.border);
    }
  }

  private handleBorderColorChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const color = input.value;
    const value = this.border.split(' ');
    this.border = `${value[0]} ${value[1]} ${color}`;

    input.style.setProperty(
      '--input-text-color',
      this.getTextColor(this.border.split(' ')[2])
    );
    if (this.targetElement) {
      this.targetElement.style.setProperty('--chai-form-border', this.border);
    }
  }

  private handleBorderStyleChange(e: Event) {
    const style = (e.target as HTMLSelectElement).value;
    const value = this.border.split(' ');
    this.border = `${value[0]} ${style} ${value[2]}`;
    if (this.targetElement) {
      this.targetElement.style.setProperty('--chai-form-border', this.border);
    }
  }

  private handleClassNameChange(value: string) {
    if (this.targetElement) {
      this.targetElement.className = value;
    }
  }
  private handleHeaderTextChange(value: string) {
    if (this.targetElement) {
      if (value === '') {
        this.targetElement.removeAttribute('headertext');
      } else {
        this.targetElement.setAttribute('headertext', value);
      }
    }
  }
  private handleButtonTextChange(value: string) {
    if (this.targetElement) {
      if (value === '') {
        this.targetElement.removeAttribute('buttontext');
      } else {
        this.targetElement.setAttribute('buttontext', value);
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-general-form-panel': ChaiGeneralFormPanel;
  }
}
