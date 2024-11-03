import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ChaiForm} from './chai-form';

@customElement('chai-field-configurator')
export class ChaiFieldConfigurator extends LitElement {
  @property({type: String}) targetForm: string = '';

  // Define styles specific to this component
  static override styles = css`
    .chai-field-container {
      background-color: #fef8ef;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 19px;
    }
    label {
      text-shadow: none;
      font-weight: bolder;
      color: black;
      font-family: sans-serif;
    }

    .configurator-header-message {
      font-weight: bolder;
      color: black;
      text-shadow: none;
      font-family: sans-serif;
      margin-bottom: 25px;
      font-size: 19px;
    }
    .row {
      margin-bottom: 25px;
    }
  `;

  constructor() {
    super();
    this.targetForm = '';
  }

  @property({type: String}) selectedVisibilityValue: string = '';

  applyChaiStyle(event: Event, cssStyle: string, px: string) {
    const target = document.getElementById(this.targetForm) as ChaiForm;
    const input = event.target as HTMLInputElement;
    const value = input.value + px;
    var shadowRoot = target.shadowRoot;
    if (shadowRoot) {
      shadowRoot
        .querySelector('chai-address')
        ?.style.setProperty(cssStyle, value);
      shadowRoot
        .querySelector('chai-email')
        ?.style.setProperty(cssStyle, value);
      shadowRoot
        .querySelector('chai-phone')
        ?.style.setProperty(cssStyle, value);
      shadowRoot.querySelector('chai-name')?.style.setProperty(cssStyle, value);
      shadowRoot.querySelector('chai-date')?.style.setProperty(cssStyle, value);
    }

    this.notifySnippetComponent;
  }

  notifySnippetComponent() {
    this.dispatchEvent(
      new CustomEvent('style-updated', {
        detail: {},
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
        crossorigin="anonymous"
      />

      <div class="chai-field-container">
        <h2 class="configurator-header-message">Field Configurator</h2>
        <div class="row">
          <div class="col-sm-12">
            <details>
              <summary>This is the title of the details tag</summary>
              <p>Here's a paragraph inside a details element</p>
              Here's some text after the paragraph
            </details>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <label for="chai-form-color-alert">Form Color Alert:</label>
            <input
              type="color"
              class="form-control"
              id="chai-form-color-alert"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-color-alert', '');
              }}"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <label for="chai-form-font-size">Form Font Size</label>
            <input
              type="range"
              class="form-control"
              id="chai-form-font-size"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-font-size', 'px');
              }}"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <label for="chai-form-spacing">Form Spacing</label>
            <input
              type="range"
              class="form-control"
              id="chai-form-spacing"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-form-spacing', 'px');
              }}"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <label for="chai-label-color">Label Color</label>
            <input
              type="color"
              class="form-control"
              id="chai-label-color"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-label-color', '');
              }}"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
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
        <div class="row">
          <div class="col-sm-12">
            <label for="chai-label-height">Label Height:</label>
            <input
              type="range"
              class="form-control"
              id="chai-label-height"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-label-height', 'px');
              }}"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <label for="chai-input-color">Input Color:</label>
            <input
              type="color"
              class="form-control"
              id="chai-input-color"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-input-color', '');
              }}"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <label for="chai-input-corner-radius">Input Corner Radius:</label>
            <input
              type="range"
              class="form-control"
              id="chai-input-corner-radius"
              @input="${(event: CustomEvent) => {
                this.applyChaiStyle(event, '--chai-input-corner-radius', 'px');
              }}"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <label>Shadow Color : </label>
            <br />
            <div class="col-sm-12">
              <input
                type="text"
                class="form-control"
                id="chai-input-shadow"
                @input="${(event: CustomEvent) => {
                  this.applyChaiStyle(event, '--chai-input-shadow', '');
                }}"
              />
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
