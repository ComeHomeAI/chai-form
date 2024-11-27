import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ChaiForm} from './chai-form';

@customElement('chai-form-label-configurator')
export class ChaiFormLabelConfigurator extends LitElement {
  @property({type: String}) targetForm: string = '';
  @property({type: Object}) cssTyles: any = {};

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

  @property({type: String}) selectedVisibilityValue: string = '';
  @property({type: String}) defaultClassStyle: string = this.targetForm;

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
    target.style.setProperty(cssVariable, input.value + px);

    // if input is range reflect it's value to element span.
    if (input.type == 'range') {
      const shadowRoot = this.shadowRoot;
      if (shadowRoot) {
        const sliderValueId = input.id + '-slider-value';
        var sliderValueElement = shadowRoot.getElementById(
          sliderValueId
        ) as HTMLInputElement;

        if (sliderValueElement) {
          sliderValueElement.innerText = input.value;
        }
      }
    }

    if (cssVariable != 'FormStyleClass') {
      // exclude this input [FormStyleClass] from addign to css style , becuase i will assign it to defaultClassStyle varaibles
      // defaultClassStyle variables which idenitify form style class
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
            chaiLabelStyles: this.cssTyles,
            defaultClass: this.defaultClassStyle,
            from: 'chai-label',
          },
          bubbles: true,
          composed: true,
        })
      );
    }, 0);
  }

  override connectedCallback() {
    super.connectedCallback();

    window.addEventListener('style-reset', this.resetFormStyle.bind(this));
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
          Chai Labels Styles Configurations
        </summary>
        <div class="row details-body">
          <div class="col-sm-4">
            <label for="label-color">Form Label Color:</label>
            <input
              type="color"
              id="label-color"
              class="form-control"
              @change="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-label-color', '');
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="label-height">Form Label Height (px)</label>
            <input
              type="range"
              class="form-control"
              id="label-height"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-label-height', 'px');
              }}"
            />
            <span id="label-height-slider-value"></span>
          </div>
          <div class="col-sm-4">
            <label> Label Visibility</label>
            <br />
            <label>
              <input
                type="radio"
                id="none-label-visibility"
                name="label-visibility"
                value="none"
                @change="${(event: CustomEvent) => {
                  this.applyChaiStyle(event, '--chai-label-visibility', '');
                }}"
                ?checked="${this.selectedVisibilityValue === 'none'}"
              />
              None
            </label>
            <label>
              <input
                type="radio"
                id="visible-label-visibility"
                name="label-visibility"
                value="visible"
                @change="${(event: CustomEvent) => {
                  this.applyChaiStyle(event, '--chai-label-visibility', '');
                }}"
                ?checked="${this.selectedVisibilityValue === 'visible'}"
              />
              Visible
            </label>
            <label>
              <input
                type="radio"
                id="hidden-label-visibility"
                name="label-visibility"
                value="hidden"
                @change="${(event: CustomEvent) => {
                  this.applyChaiStyle(event, '--chai-label-visibility', '');
                }}"
                ?checked="${this.selectedVisibilityValue === 'hidden'}"
              />
              Hidden
            </label>
            <label>
              <input
                type="radio"
                id="collabse-label-visibility"
                name="label-visibility"
                value="collabse"
                @change="${(event: CustomEvent) => {
                  this.applyChaiStyle(event, '--chai-label-visibility', '');
                }}"
                ?checked="${this.selectedVisibilityValue === 'collabse'}"
              />
              Collabse
            </label>
          </div>
        </div>
      </details>
    `;
  }
}
