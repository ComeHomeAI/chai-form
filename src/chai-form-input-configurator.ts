import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ChaiForm} from './chai-form';

@customElement('chai-form-input-configurator')
export class ChaiFormInputConfigurator extends LitElement {
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

  applyChaiStyle(event: Event, cssVaraible: string, px: string) {
    const target = document.getElementById(this.targetForm) as ChaiForm;
    if (!target) return;

    const input = event.target as HTMLInputElement;
    target.style.setProperty(cssVaraible, input.value + px);

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

    if (cssVaraible != 'FormStyleClass') {
      // exclude this input [FormStyleClass] from addign to css style , becuase i will assign it to defaultClassStyle varaibles
      // defaultClassStyle variables which idenitify form style class

      if (
        cssVaraible == '--chai-input-border-style' ||
        cssVaraible == '--chai-input-border-width' ||
        cssVaraible == '--chai-input-border-color'
      ) {
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
          var borderStyleElement = shadowRoot.getElementById(
            'input-border-style'
          ) as HTMLElement | any;
          var borderColoeElement = shadowRoot.getElementById(
            'input-border-color'
          ) as HTMLElement | any;
          var borderWidthEelment = shadowRoot.getElementById(
            'input-border-width'
          ) as HTMLElement | any;

          var styleValue =
            borderStyleElement != null ? borderStyleElement.value : '';
          var colorValue =
            borderColoeElement != null ? borderColoeElement.value : '';
          var widthValue =
            borderWidthEelment != null ? borderWidthEelment.value : 0;

          this.cssTyles['--chai-input-border'] =
            styleValue + ' ' + colorValue + ' ' + widthValue + 'px';
          target.style.setProperty(
            '--chai-input-border',
            styleValue + ' ' + colorValue + ' ' + widthValue + 'px'
          );
        }
      } else {
        this.cssTyles[cssVaraible] = input.value + px;
      }
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
            chaiInputstyles: this.cssTyles,
            defaultClass: this.defaultClassStyle,
            from: 'chai-input',
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
          Chai Input Styles Configurations
        </summary>
        <div class="row details-body">
          <div class="col-sm-4">
            <label for="nput-color">Input Color:</label>
            <input
              type="color"
              class="form-control"
              id="input-color"
              @change="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-input-color', '');
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="chai-input-corner-radius">Input Corner Radius:</label>
            <input
              type="range"
              class="form-control"
              id="chai-input-corner-radius"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-input-corner-radius', 'px');
              }}"
            />
            <span id="chai-input-corner-radius-slider-value"></span>
          </div>
          <div class="col-sm-4">
            <label>Input Shadow Color : </label>
            <br />
            <input
              placeholder="1px  1px 1px 1px red"
              type="text"
              class="form-control"
              id="chai-input-shadow"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-input-shadow', '');
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="borderStyle">Form Input Border Style</label>
            <select
              id="input-border-style"
              class="form-control"
              @change="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-input-border-style', '');
              }}"
            >
              <option value="">Choose Style</option>
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="groove">Groove</option>
              <option value="ridge">Ridge</option>
            </select>
          </div>
          <div class="col-sm-4">
            <label for="input-border-color"> Input Border Color</label>
            <input
              class="form-control"
              type="color"
              id="input-border-color"
              @change="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-input-border-color', '');
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="input-border-width"> Input Border Width (px)</label>
            <input
              type="range"
              value="1"
              class="form-control"
              id="input-border-width"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-input-border-width', 'px');
              }}"
            />
            <span id="input-border-width-slider-value"></span>
          </div>
        </div>
      </details>
    `;
  }
}
