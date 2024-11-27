import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import './chai-form-label-configurator';
import './chai-form-header-configurator';
import './chai-form-input-configurator';
import './chai-form-button-configurator';
import './chai-form-configurator';
import './chai-form-snippet';
import './chai-components-render-configurator';
import './chai-form-reseter';
import './chai-style-snippet';

@customElement('chai-configurator')
export class ChaiConfigurator extends LitElement {
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
            <chai-style-snippet
              id="form-snippet"
              targetForm="form1"
            ></chai-style-snippet>
          </div>

          <div class="col-sm-12">
            <chai-form-snippet
              id="form-snippet"
              targetForm="form1"
            ></chai-form-snippet>
          </div>
          <div class="col-sm-12">
            <chai-components-render-configurator
              targetForm="${this.targetForm}"
            ></chai-components-render-configurator>

            <chai-form-configurator targetForm="${this.targetForm}">
            </chai-form-configurator>

            <chai-form-header-configurator targetForm="${this.targetForm}">
            </chai-form-header-configurator>

            <chai-form-label-configurator
              targetForm="${this.targetForm}"
            ></chai-form-label-configurator>

            <chai-form-input-configurator
              targetForm="${this.targetForm}"
            ></chai-form-input-configurator>

            <chai-form-button-configurator
              targetForm="${this.targetForm}"
            ></chai-form-button-configurator>

            <div class="row">
              <div class="col-sm-12">
                <chai-form-reseter
                  targetForm="${this.targetForm}"
                ></chai-form-reseter>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
