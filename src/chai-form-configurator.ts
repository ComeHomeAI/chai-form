import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ChaiForm} from './chai-form';

@customElement('chai-form-configurator')
export class ChaiFormConfigurator extends LitElement {
  @property({type: String}) targetForm: string = '';
  @property({type: Object}) cssTyles: any = {};

  @property({type: String}) selectedVisibilityValue: string = '';
  @property({type: Boolean}) isNameComponentChecked: Boolean = true;
  @property({type: Boolean}) isAddressComponentChecked: Boolean = true;
  @property({type: Boolean}) isPhoneComponentChecked: Boolean = true;
  @property({type: Boolean}) isEmailomponentChecked: Boolean = true;
  @property({type: Boolean}) isDateComponentChecked: Boolean = false;
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

  toggleChaiFormSlots(event: Event, componentName: string) {
    const target = document.getElementById(this.targetForm) as ChaiForm;
    if (!target) return;
    const checkbox = event.target as HTMLInputElement;
    if (!checkbox) return;
    var chiaNameShadowRoot = target.shadowRoot;

    if (componentName == 'chai-name') {
      this.isNameComponentChecked = checkbox.checked;
      if (chiaNameShadowRoot) {
        var chiaNameomponent = chiaNameShadowRoot.querySelector('chai-name');
        if (chiaNameomponent)
          checkbox.checked
            ? (chiaNameomponent.style.display = '')
            : (chiaNameomponent.style.display = 'none');
      }
    } else if (componentName == 'chai-email') {
      this.isEmailomponentChecked = checkbox.checked;
      if (chiaNameShadowRoot) {
        var chaiEmailomponent = chiaNameShadowRoot.querySelector('chai-email');
        if (chaiEmailomponent)
          checkbox.checked
            ? (chaiEmailomponent.style.display = '')
            : (chaiEmailomponent.style.display = 'none');
      }
    } else if (componentName == 'chai-address') {
      this.isAddressComponentChecked = checkbox.checked;
      if (chiaNameShadowRoot) {
        var chiaAddressComponent =
          chiaNameShadowRoot.querySelector('chai-address');
        if (chiaAddressComponent)
          checkbox.checked
            ? (chiaAddressComponent.style.display = '')
            : (chiaAddressComponent.style.display = 'none');
      }
    } else if (componentName == 'chai-phone') {
      this.isPhoneComponentChecked = checkbox.checked;
      if (chiaNameShadowRoot) {
        var chiaPhoneComponent = chiaNameShadowRoot.querySelector('chai-phone');
        if (chiaPhoneComponent)
          checkbox.checked
            ? (chiaPhoneComponent.style.display = '')
            : (chiaPhoneComponent.style.display = 'none');
      }
    } else if (componentName == 'chai-date') {
      this.isDateComponentChecked = checkbox.checked;
      if (chiaNameShadowRoot) {
        var chiaDateComponent = chiaNameShadowRoot.querySelector('chai-date');
        if (chiaDateComponent)
          checkbox.checked
            ? (chiaDateComponent.style.display = '')
            : (chiaDateComponent.style.display = 'none');
      }
    }

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

  initlizeFormDefaultStyleClass(shadwoRoot: ShadowRoot | null) {
    if (shadwoRoot != null) {
      const defaultClass = this.shadowRoot?.getElementById(
        'defaultClassStyle'
      ) as HTMLInputElement; // Assert as HTMLInputElement
      if (defaultClass) {
        this.defaultClassStyle = defaultClass.value; // Now this works because defaultClass is an HTMLInputElement
      }
    }
  }

  initlizeComponentWithDefaults() {
    // Access the Shadow DOM
    const shadowRoot = this.shadowRoot;

    this.intilizeRangesElementsSapnWidhRangeValue();
    this.initlizeFormDefaultStyleClass(shadowRoot);
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
      if (
        cssVariable == '--chai-form-border-style' ||
        cssVariable == '--chai-form-border-width' ||
        cssVariable == '--chai-form-border-color'
      ) {
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
          var borderStyleElement = shadowRoot.getElementById(
            'form-border-Style'
          ) as HTMLElement | any;
          var borderColoeElement = shadowRoot.getElementById(
            'form-border-color'
          ) as HTMLElement | any;
          var borderWidthEelment = shadowRoot.getElementById(
            'form-border-width'
          ) as HTMLElement | any;

          var styleValue =
            borderStyleElement != null ? borderStyleElement.value : '';
          var colorValue =
            borderColoeElement != null ? borderColoeElement.value : '';
          var widthValue =
            borderWidthEelment != null ? borderWidthEelment.value : 0;

          this.cssTyles['--chai-form-border'] =
            styleValue + ' ' + colorValue + ' ' + widthValue + 'px';
        }
      } else {
        this.cssTyles[cssVariable] = input.value + px;
      }
    } else {
      this.defaultClassStyle = input.value;
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
            chaiFormStyles: this.cssTyles,
            checkedComponents: {
              name: this.isNameComponentChecked,
              email: this.isEmailomponentChecked,
              address: this.isAddressComponentChecked,
              phone: this.isPhoneComponentChecked,
              date: this.isDateComponentChecked,
            },
            defaultClass: this.defaultClassStyle,
            from: 'chai-form',
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
          Chai Form Styles Configuration
        </summary>
        <div class="row details-body">
          <div class="col-sm-4">
            <label for="form-color-brand">Form Style Class</label>
            <input
              type="text"
              value="${this.targetForm}"
              class="form-control"
              id="defaultClassStyle"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, 'FormStyleClass', '');
              }}"
            />
          </div>
          <div class="col-sm-4 configurator-details-rows">
            <label for="form-flex-direction">Form Flex Direction</label>
            <select
              id="form-flex-direction"
              class="form-control"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-flex-direction', '');
              }}"
            >
              <option value="">Choose Flex Direction</option>
              <option value="column">Column</option>
              <option value="row">row</option>
            </select>
          </div>
          <div class="col-sm-4">
            <label for="form-color-brand">Form Color Brand</label>
            <input
              type="color"
              class="form-control"
              id="form-color-brand"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-color-brand', '');
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="form-color-text">Form Color Text</label>
            <input
              type="color"
              id="form-color-text"
              class="form-control"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-color-text', '');
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="form-font-size">Form Font Size</label>
            <input
              type="range"
              class="form-control"
              id="form-font-size"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-font-size', 'px');
              }}"
            />
            <span id="form-font-size-slider-value"></span>
          </div>
          <div class="col-sm-4">
            <label for="form-border-style">Form Border Style</label>
            <select
              id="form-border-Style"
              @change="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-border-style', '');
              }}"
              class="form-control"
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
            <label for="form-border-width">Border Width (px)</label>
            <input
              type="range"
              class="form-control"
              id="form-border-width"
              value="1"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-border-width', 'px');
              }}"
            />
            <span id="form-border-width-slider-value"></span>
          </div>
          <div class="col-sm-4">
            <label for="form-border-color">Border Color </label>
            <input
              type="color"
              class="form-control"
              id="form-border-color"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-border-color', '');
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="form-border-Radius">Border Radius (px)</label>
            <input
              type="range"
              class="form-control"
              id="form-border-radius"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-corner-radius', 'px');
              }}"
            />
            <span id="form-border-radius-slider-value"></span>
          </div>
          <div class="col-sm-4">
            <label for="from-max-width">Form Max Width (px)</label>
            <input
              type="range"
              class="form-control"
              id="form-max-width"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-max-width', 'px');
              }}"
            />
            <span id="form-max-width-slider-value"></span>
          </div>
          <div class="col-sm-4">
            <label for="form-color-alert">Form Color Alert</label>
            <input
              type="color"
              class="form-control"
              id="form-color-alert"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-color-alert', '');
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="form-background">Form Background</label>
            <input
              type="color"
              class="form-control"
              id="form-background"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-background', '');
              }}"
            />
          </div>
          <div class="col-sm-4">
            <label for="orm-font-wight">Form Font Weight (px)</label>
            <input
              type="range"
              class="form-control"
              id="form-font-wight"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-font-wight', 'px'); // from where form font weight.
              }}"
            />
            <span id="form-font-wight-slider-value"></span>
          </div>
          <div class="col-sm-4">
            <label for="form-spacing">Form Spacing (px)</label>
            <input
              class="form-control"
              type="range"
              id="form-spacing"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-spacing', 'px');
              }}"
            />
            <span id="form-spacing-slider-value"></span>
          </div>
        </div>
      </details>
    `;
  }
}
