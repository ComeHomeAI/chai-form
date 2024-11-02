import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ChaiForm} from './chai-form';
import {ChaiFormSnippet} from '../chai-form-snippet';

@customElement('chai-form-configurator')
export class ChaiFormConfigurator extends LitElement {
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
  @property({type: Boolean}) isNameComponentChecked: Boolean = true;
  @property({type: Boolean}) isAddressComponentChecked: Boolean = true;
  @property({type: Boolean}) isPhoneComponentChecked: Boolean = true;
  @property({type: Boolean}) isEmailomponentChecked: Boolean = true;
  @property({type: Boolean}) isDateComponentChecked: Boolean = false;
  @property({type: String}) defaultClassStyle: string = '';

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

  intilizeRangesElementsSapnWidhRangeValue(shadwoRoot: ShadowRoot | null) {
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

    this.intilizeRangesElementsSapnWidhRangeValue(shadowRoot);
    this.initlizeFormDefaultStyleClass(shadowRoot);
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
        cssVaraible == '--chai-form-border-style' ||
        '--chai-form-border-width' ||
        '--chai-form-border-color'
      ) {
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
          var borderStyleElement = shadowRoot.getElementById(
            'form-border-Style'
          ) as HTMLElement;
          var borderColoeElement = shadowRoot.getElementById(
            'form-border-color'
          ) as HTMLElement;
          var borderWidthEelment = shadowRoot.getElementById(
            'form-border-width'
          ) as HTMLElement;

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
        this.cssTyles[cssVaraible] = input.value + px;
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
            styles: this.cssTyles,
            checkedComponents: {
              name: this.isNameComponentChecked,
              email: this.isEmailomponentChecked,
              address: this.isAddressComponentChecked,
              phone: this.isPhoneComponentChecked,
              date: this.isDateComponentChecked,
            },
            defaultClass: this.defaultClassStyle,
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

      <div class="configurator-container">
        <div class="row">
          <div class="col-sm-12">
            <chai-form-snippet
              id="form-snippet"
              targetForm="form1"
            ></chai-form-snippet>
          </div>
          <div class="col-sm-12">
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
                      this.applyChaiStyle(
                        event,
                        '--chai-form-flex-direction',
                        ''
                      );
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
                      this.applyChaiStyle(
                        event,
                        '--chai-form-border-style',
                        ''
                      );
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
                      this.applyChaiStyle(
                        event,
                        '--chai-form-border-width',
                        'px'
                      );
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
                      this.applyChaiStyle(
                        event,
                        '--chai-form-border-color',
                        ''
                      );
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
                      this.applyChaiStyle(
                        event,
                        '--chai-form-border-radius',
                        'px'
                      );
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
                      this.applyChaiStyle(
                        event,
                        '--chai-form-font-wight',
                        'px'
                      ); // from where form font weight.
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

            <details class="configurator-details">
              <summary class="configurator-details-summary ">
                Chai Header Styles Configuration
              </summary>
              <div class="row details-body">
                <div class="col-sm-4">
                  <label for="header-font-size"
                    >Form Header Font Size (px)</label
                  >
                  <input
                    type="range"
                    class="form-control"
                    id="header-font-size"
                    @input="${(event: CustomEvent) => {
                      this.applyChaiStyle(
                        event,
                        '--chai-header-font-size',
                        'px'
                      );
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
                        this.applyChaiStyle(
                          event,
                          '--chai-label-visibility',
                          ''
                        );
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
                        this.applyChaiStyle(
                          event,
                          '--chai-label-visibility',
                          ''
                        );
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
                        this.applyChaiStyle(
                          event,
                          '--chai-label-visibility',
                          ''
                        );
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
                        this.applyChaiStyle(
                          event,
                          '--chai-label-visibility',
                          ''
                        );
                      }}"
                      ?checked="${this.selectedVisibilityValue === 'collabse'}"
                    />
                    Collabse
                  </label>
                </div>
              </div>
            </details>

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
                  <label for="chai-input-corner-radius"
                    >Input Corner Radius:</label
                  >
                  <input
                    type="range"
                    class="form-control"
                    id="chai-input-corner-radius"
                    @input="${(event: CustomEvent) => {
                      this.applyChaiStyle(
                        event,
                        '--chai-input-corner-radius',
                        'px'
                      );
                    }}"
                  />
                </div>
                <div class="col-sm-4">
                  <label>Input Shadow Color : </label>
                  <br />
                  <input
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
                      this.applyChaiStyle(
                        event,
                        '--chai-input-border-style',
                        ''
                      );
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
                      this.applyChaiStyle(
                        event,
                        '--chai-input-border-color',
                        ''
                      );
                    }}"
                  />
                </div>
                <div class="col-sm-4">
                  <label for="input-border-width">
                    Input Border Width (px)</label
                  >
                  <input
                    type="range"
                    class="form-control"
                    id="input-border-width"
                    @input="${(event: CustomEvent) => {
                      this.applyChaiStyle(
                        event,
                        '--chai-input-border-width',
                        'px'
                      );
                    }}"
                  />
                  <span id="input-corner-radius-slider-value"></span>
                </div>
              </div>
            </details>

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
                      this.applyChaiStyle(
                        event,
                        '--chai-button-font-size',
                        'px'
                      );
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
                  <label for="button-text-transform"
                    >Button Text Transform:</label
                  >
                  <select
                    id="button-text-transform"
                    class="form-control"
                    @change="${(event: CustomEvent) => {
                      this.applyChaiStyle(
                        event,
                        '--chai-button-text-transform',
                        ''
                      );
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
                      this.applyChaiStyle(
                        event,
                        '--chai-button-background',
                        ''
                      );
                    }}"
                  />
                </div>
                <div class="col-sm-4">
                  <label for="button-background-hover"
                    >Button Background Hover</label
                  >
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
                    id="button-filter-hover"
                    @change="${(event: CustomEvent) => {
                      this.applyChaiStyle(
                        event,
                        '--chai-button-filter-hover',
                        ''
                      );
                    }}"
                  />
                </div>
                <div class="col-sm-4">
                  <label for="button-filter-active">Button Filter Active</label>
                  <input
                    class="form-control"
                    type="range"
                    id="button-filter-active"
                    @change="${(event: CustomEvent) => {
                      this.applyChaiStyle(
                        event,
                        '--chai-button-filter-active',
                        ''
                      );
                    }}"
                  />
                </div>
                <div class="col-sm-4">
                  <label for="button-filter-radius">Button Filter Radius</label>
                  <input
                    class="form-control"
                    type="range"
                    id="button-filter-radius"
                    @change="${(event: CustomEvent) => {
                      this.applyChaiStyle(
                        event,
                        '--chai-button-filter-radius',
                        ''
                      );
                    }}"
                  />
                </div>
              </div>
            </details>

            <details class="configurator-details">
              <summary class="configurator-details-summary">
                Input Components
              </summary>
              <div class="row details-body">
                <div class="col-sm-12">
                  <label for="name">
                    Name
                    <input
                      type="checkbox"
                      id="name"
                      name="name"
                      checked
                      @change="${(event: CustomEvent) => {
                        this.toggleChaiFormSlots(event, 'chai-name');
                      }}"
                    />
                  </label>

                  <label for="phone-number">
                    Phone Number

                    <input
                      type="checkbox"
                      id="phone-number"
                      name="phone-number"
                      checked
                      @change="${(event: CustomEvent) => {
                        this.toggleChaiFormSlots(event, 'chai-phone');
                      }}"
                    />
                  </label>
                  <label for="email">
                    Email

                    <input
                      type="checkbox"
                      id="email"
                      name="email"
                      checked
                      @change="${(event: CustomEvent) => {
                        this.toggleChaiFormSlots(event, 'chai-email');
                      }}"
                    />
                  </label>
                  <label for="address">
                    Address

                    <input
                      type="checkbox"
                      id="address"
                      name="address"
                      checked
                      @change="${(event: CustomEvent) => {
                        this.toggleChaiFormSlots(event, 'chai-address');
                      }}"
                    />
                  </label>

                  <!-- <label for="date">
                  Date

                  <input
                    type="checkbox"
                    id="date"
                    name="date"
                    checked
                    @change="${(event: CustomEvent) => {
                    this.toggleChaiFormSlots(event, 'chai-date');
                  }}"
                  />
                </label> -->
                </div>
              </div>
            </details>

            <div class="row">
              <div class="col-sm-12">
                <input
                  type="button"
                  class="form-control"
                  value="Reset"
                  @click="${() => {
                    this.resetFormStyle();
                  }}"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
