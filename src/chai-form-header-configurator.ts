import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ChaiForm} from './chai-form';

@customElement('chai-form-header-configurator')
export class ChaiFormHeaderConfigurator extends LitElement {
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
    this.defaultClassStyle = this.targetForm;

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
            chaiHeaderstyles: this.cssTyles,
            defaultClass: this.defaultClassStyle,
            from: 'chai-header',
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
        <summary class="configurator-details-summary ">
          Chai Header Styles Configuration
        </summary>
        <div class="row details-body">
          <div class="col-sm-4">
            <label for="header-font-size">Form Header Font Size (px)</label>
            <input
              type="range"
              class="form-control"
              id="header-font-size"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-header-font-size', 'px');
              }}"
            />
            <span id="header-font-size-slider-value"></span>
          </div>
          <div class="col-sm-4">
            <label for="header-color">Form Header Color</label>
            <input
              type="color"
              class="form-control"
              id="header-color"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-header-color', '');
              }}"
            />
          </div>
        </div>
      </details>
    `;
  }
}
