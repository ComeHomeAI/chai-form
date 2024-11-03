import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ChaiForm} from './chai-form';

@customElement('chai-components-render-configurator')
export class ChaiComponentsRenderConfigurator extends LitElement {
  @property({type: String}) targetForm: string = '';
  @property({type: Object}) cssTyles: any = {};
  @property({type: Boolean}) isNameComponentChecked: Boolean = true;
  @property({type: Boolean}) isAddressComponentChecked: Boolean = true;
  @property({type: Boolean}) isPhoneComponentChecked: Boolean = true;
  @property({type: Boolean}) isEmailomponentChecked: Boolean = true;
  @property({type: Boolean}) isDateComponentChecked: Boolean = false;

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
      this.cssTyles[cssVaraible] = input.value + px;
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
  notifySnippetComponent() {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('style-updated', {
          detail: {
            chaiRenderStyles: this.cssTyles,
            checkedComponents: {
              name: this.isNameComponentChecked,
              email: this.isEmailomponentChecked,
              address: this.isAddressComponentChecked,
              phone: this.isPhoneComponentChecked,
              date: this.isDateComponentChecked,
            },
            defaultClass: this.defaultClassStyle,
            from: 'render',
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
        <summary class="configurator-details-summary">Input Components</summary>
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

            <label for="date">
              Date

              <input
                type="checkbox"
                id="date"
                name="date"
                @change="${(event: CustomEvent) => {
                  this.toggleChaiFormSlots(event, 'chai-date');
                }}"
              />
            </label>
          </div>
        </div>
      </details>
    `;
  }
}
