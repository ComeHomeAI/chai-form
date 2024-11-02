import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ChaiForm} from './chai-form';

@customElement('chai-form-snippet')
export class ChaiFormSnippet extends LitElement {
  @property({type: String}) targetForm: string = '';
  @property({type: Boolean}) isCodeSnippedVisible: Boolean = false;
  @property({type: String}) cssStyles: string = '';
  @property({type: String}) snippet: string = '';
  @property({type: String}) defaultClass: string = '';

  @property({type: Object}) checkedComponentsDetails: any = {
    name: true,
    email: true,
    address: true,
    phone: true,
    date: false,
  };

  static override styles = css`
    .snippet {
      position: relative;
    }

    .snippet-input {
      width: 400px;
      height: 201px;
    }

    .snippet-header {
      font-size: 19px;
      background-color: black;
      padding: 14px;
      border-radius: 11px;
      color: yelo;
      color: yellow;
      text-shadow: none;
      font-family: sans-serif;
    }

    .snippet-header-message {
      font-size: 16px;
    }

    .snippet-copy-btn {
      background-color: black;
      border-radius: 6px;
      padding: 10px;
      margin-top: 9px;
      color: yellow;
      font-family: sans-serif;
    }
  `;

  constructor() {
    super();
    this.targetForm = '';
  }

  @property({type: String}) selectedVisibilityValue: string = '';
  @property({type: String}) htmlSnippet: string = '';

  getSnippet(event: CustomEvent | any) {
    this.isCodeSnippedVisible = true;
    const target = document.getElementById(this.targetForm) as ChaiForm;
    if (!target) return;
    let configuratorStyles: any = {};
    if (event) {
      configuratorStyles = event.detail.styles;
      this.checkedComponentsDetails = event.detail.checkedComponents;

      let result = '';
      for (const key in configuratorStyles) {
        if (configuratorStyles.hasOwnProperty(key)) {
          result += `${key}: ${configuratorStyles[key]}; \n `;
        }
      }
      this.defaultClass = event.detail.defaultClass;

      this.cssStyles = result;
    }

    let snippet = `
    <style>
     
      ${this.cssStyles}
     
    </style>
      ${target.outerHTML.replace('</chia-form>', '')}

          ${
            this.checkedComponentsDetails && this.checkedComponentsDetails.name
              ? `<chai-name id="chai-name"></chai-name>`
              : ''
          }
          ${
            this.checkedComponentsDetails && this.checkedComponentsDetails.phone
              ? `<chai-phone id="chai-phone"></chai-phone>`
              : ''
          }
          ${
            this.checkedComponentsDetails && this.checkedComponentsDetails.email
              ? `<chai-email id="chai-email"></chai-email>`
              : ''
          }
          ${
            this.checkedComponentsDetails &&
            this.checkedComponentsDetails.address
              ? `<chai-address id="chai-address"></chai-address>`
              : ''
          }
          ${
            this.checkedComponentsDetails && this.checkedComponentsDetails.date
              ? `<chai-date id="chai-date"></chai-date>`
              : ''
          }

      </chia-form>
`;
    snippet = snippet.replace(/ style="[^"]*"/g, '');
    this.snippet = snippet;
    this.htmlSnippet = snippet; // Set the snippet
  }

  async copyToClipboard(snippet: string) {
    try {
      document.body.focus(); // Ensu
      this.htmlSnippet = snippet; // Set the snippet

      // Copy to clipboard immediately without delay
      await navigator.clipboard.writeText(snippet); // Copy to clipboard

      // Optionally show a message or change the state
      this.isCodeSnippedVisible = true;
    } catch (error) {
      console.error('Failed to copy: ', error);
      // Handle errors here, e.g., show an alert or message to the user
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    this.getSnippet(null);
    window.addEventListener('style-updated', this.getSnippet.bind(this));
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('style-updated', this.getSnippet.bind(this));
  }

  override render() {
    return html`
      <div class="snippet">
        <!-- <h2 class="snippet-header-message">please copy and past this code into your website</h2> -->
        ${!this.isCodeSnippedVisible
          ? ''
          : html`
              <textarea
                class="form-control snippet-input"
                .value="${this.htmlSnippet}"
                @input="${this.getSnippet}"
              ></textarea>
            `}
        <br />

        <input
          type="button"
          value="please copy and past this code into your website"
          class="form-control snippet-copy-btn"
          @click="${() => this.copyToClipboard(this.snippet)}"
        />
      </div>
    `;
  }
}
