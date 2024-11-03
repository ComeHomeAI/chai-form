import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ChaiForm} from './chai-form';

@customElement('chai-form-button-configurator')
export class ChaiFormButtonConfigurator extends LitElement {
  @property({type: String}) targetForm: string = '';
  @property({type: Object}) cssTyles: any = {};
  @property({type: String}) selectedVisibilityValue: string = '';
  @property({type: String}) defaultClassStyle: string = this.targetForm;

  static override styles = css`
    .configurator-container {
      background-color: #fffaf6;
      padding: 10px;
      border-radius: 8px;
      color: black;
      text-shadow: none;
      font-weight: bolder;
      padding: 25px;
      font-size: 16px;
      font-family: sans-serif;
    }
    .configurator-details-summary {
      background-color: #ddd;
      padding: 15px;
      border-radius: 12px;
    }
    .configurator-details {
      margin-bottom: 20px;
    }

    .configurator-details-rows {
    }

    .details-body {
      margin-top: 20px;
      background-color: white;
      padding: 10px;
    }

    .col-sm-4 {
      margin-bottom: 20px;
    }
  `;

  constructor() {
    super();
    this.targetForm = '';
  }

  override firstUpdated(): void {
    this.initlizeComponentWithDefaults();
    this.notifySnippetComponent();
  }

  intilizeRangesElementsSapnWidhRangeValue() {
    const shadowRoot = this.shadowRoot;

    if (shadowRoot) {
      const inputRanges = shadowRoot.querySelectorAll('input[type="range"]');

      // Loop through each input range
      inputRanges.forEach((input: Element) => {
        // Cast the input to HTMLInputElement
        const htmlInput = input as HTMLInputElement;

        // Get the current value of the input
        const currentValue = htmlInput.value;

        // Construct the span ID based on the input ID
        const spanId = `${htmlInput.id}-slider-value`;

        // Get the corresponding span using the constructed ID
        const fontSizeDisplay = shadowRoot.getElementById(
          spanId
        ) as HTMLSpanElement;

        if (fontSizeDisplay) {
          // Update the span's text content with the current value
          fontSizeDisplay.textContent = currentValue;
        } else {
          console.warn(
            `Span with ID ${spanId} not found for input ${htmlInput.id}`
          );
        }
      });
    }
  }

  initlizeComponentWithDefaults() {
    // Access the Shadow DOM
    this.intilizeRangesElementsSapnWidhRangeValue();
  }

  applyChaiStyle(event: Event, cssVariable: string, px: string) {
    const target = document.getElementById(this.targetForm) as ChaiForm;
    if (!target) return;

    const input = event.target as HTMLInputElement;

    // if input is range reflect it's value to element span.
    if (input.type == 'range') {
      const shadowRoot = this.shadowRoot;
      if (shadowRoot) {
        const sliderValueId = input.id + '-slider-value';
        var sliderValueElement = shadowRoot.getElementById(
          sliderValueId
        ) as HTMLInputElement;

        if (sliderValueElement) {
          if (cssVariable == '--chai-button-filter-hover') {
            const shadowRoot = this.shadowRoot;
            if (shadowRoot) {
              const target = shadowRoot.getElementById(
                'button-filter-hover'
              ) as HTMLElement;

              target.style.setProperty(
                cssVariable,
                'brightness(' + input.value + ')'
              );
              this.cssTyles['--chai-button-filter-hover'] =
                'brightness(' + input.value + ')';
            }
          } else if (cssVariable == '--chai-button-filter-active') {
            const shadowRoot = this.shadowRoot;
            if (shadowRoot) {
              const target = shadowRoot.getElementById(
                'button-filter-active'
              ) as HTMLElement;

              if (target) {
                target.style.setProperty(
                  cssVariable,
                  'brightness(' + input.value + ')'
                );
                this.cssTyles['--chai-button-filter-active'] =
                  'brightness(' + input.value + ')';
              }
            }
          } else {
            target.style.setProperty(cssVariable, input.value + px);
            this.cssTyles[cssVariable] = input.value + px;
          }
        }
      }
    } else {
      target.style.setProperty(cssVariable, input.value + px);
      this.cssTyles[cssVariable] = input.value + px;
    }

    // fire event which indicate style has been changed so i need to notify snippet component with new style changes.
    this.notifySnippetComponent();
  }

  resetFormStyle() {
    const target = document.getElementById(this.targetForm) as ChaiForm;
    if (!target) return;

    target.removeAttribute('style');
    this.cssTyles = {};
    this.notifySnippetComponent();
  }

  notifySnippetComponent() {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('style-updated', {
          detail: {
            chiaButtontyles: this.cssTyles,
            defaultClass: this.defaultClassStyle,
            from: 'chai-button',
          },
          bubbles: true,
          composed: true,
        })
      );
    }, 0);
  }

  override render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
        crossorigin="anonymous"
      />

      <details class="configurator-details">
        <summary class="configurator-details-summary">
          Chai Buttons styles Configurations
        </summary>
        <div class="row details-body">
          <div class="col-sm-4">
            <label for="button-font-size">Button Font Size (px)</label>
            <input
              type="range"
              class="form-control"
              id="button-font-size"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-button-font-size', 'px');
              }}"
            />
            <span id="button-font-size-slider-value"></span>
          </div>
          <div class="col-sm-4">
            <label for="button-color">Button Color</label>
            <input
              type="color"
              class="form-control"
              id="button-color"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-button-color', '');
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="button-text-transform">Button Text Transform:</label>
            <select
              id="button-text-transform"
              class="form-control"
              @change="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-button-text-transform', '');
              }}"
            >
              <option value="">Choose Transform</option>
              <option value="none">None</option>
              <option value="capitalize">Capitalize</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
            </select>
          </div>
          <div class="col-sm-4">
            <label for="button-background">Button Background</label>
            <input
              type="color"
              class="form-control"
              id="button-background"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-button-background', '');
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="button-background-hover">Button Background Hover</label>
            <input
              type="color"
              class="form-control"
              id="button-background-hover"
              @change="${(event: CustomEvent) => {
                this.applyChaiStyle(
                  event,
                  '--chai-button-background-hover',
                  ''
                );
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="button-background-active"
              >Button Background Active</label
            >
            <input
              class="form-control"
              type="color"
              id="button-background-active"
              @change="${(event: CustomEvent) => {
                this.applyChaiStyle(
                  event,
                  '--chai-button-background-active',
                  ''
                );
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="button-filter-hover">Button Filter Hover</label>
            <input
              class="form-control"
              type="range"
              value="1"
              id="button-filter-hover"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-button-filter-hover', '');
              }}"
            />
            <span id="button-filter-hover-slider-value"></span>
          </div>
          <div class="col-sm-4">
            <label for="button-filter-active">Button Filter Active</label>
            <input
              class="form-control"
              type="range"
              value="1"
              id="button-filter-active"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-button-filter-active', '');
              }}"
            />
            <span id="button-filter-active-slider-value"></span>
          </div>
          <div class="col-sm-4">
            <label for="button-filter-radius">Button Filter Radius</label>
            <input
              class="form-control"
              type="range"
              id="button-filter-radius"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-corner-radius', 'px');
              }}"
            />
            <span id="button-filter-radius-slider-value"></span>
          </div>
        </div>
      </details>
    `;
  }
}
