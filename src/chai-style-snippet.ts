import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ChaiForm} from './chai-form';

@customElement('chai-style-snippet')
export class ChaiStyleSnippet extends LitElement {
  @property({type: String}) targetForm: string = '';
  @property({type: Boolean}) isCodeSnippedVisible: Boolean = false;
  @property({type: String}) cssStyles: string = '';
  @property({type: String}) chaiFormStyles: any = '';
  @property({type: String}) chaiFormLabelStyles: any = '';
  @property({type: String}) chaiFormInputStyles: any = '';
  @property({type: String}) chaiFormButtonStyles: any = '';
  @property({type: String}) chaiFormHeaderStyles: any = '';
  @property({type: String}) chaiFormRenderStyles: any = '';
  @property({type: String}) snippet: string = '';
  @property({type: String}) defaultClass: string = this.targetForm;

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
      min-height: 210px;
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

    .btn-copy {
      margin-bottom: 20px;
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
    if (event) {
      if (event && event.detail && event.detail.from) {
        if (event.detail.from == 'render') {
          this.checkedComponentsDetails = event.detail.checkedComponents;

          this.chaiFormRenderStyles = event.detail.chaiRenderStyles;

          let result = '';
          for (const key in this.chaiFormRenderStyles) {
            if (this.chaiFormRenderStyles.hasOwnProperty(key)) {
              result += `${key}: ${this.chaiFormRenderStyles[key]}; \n  \t `;
            }
          }

          this.chaiFormRenderStyles = result;
        } else if (event.detail.from == 'chai-form') {
          this.defaultClass = event.detail.defaultClass;
          this.chaiFormStyles = event.detail.chaiFormStyles;

          let result = '';
          for (const key in this.chaiFormStyles) {
            if (this.chaiFormStyles.hasOwnProperty(key)) {
              result += `${key}: ${this.chaiFormStyles[key]}; \n   \t `;
            }
          }

          this.chaiFormStyles = result;
        } else if (event.detail.from == 'chai-label') {
          this.chaiFormLabelStyles = event.detail.chaiLabelStyles;

          let result = '';
          for (const key in this.chaiFormLabelStyles) {
            if (this.chaiFormLabelStyles.hasOwnProperty(key)) {
              result += `${key}: ${this.chaiFormLabelStyles[key]}; \n  \t  `;
            }
          }

          this.chaiFormLabelStyles = result;
        } else if (event.detail.from == 'chai-input') {
          this.chaiFormInputStyles = event.detail.chaiInputstyles;

          let result = '';
          for (const key in this.chaiFormInputStyles) {
            if (this.chaiFormInputStyles.hasOwnProperty(key)) {
              result += `${key}: ${this.chaiFormInputStyles[key]}; \n  \t `;
            }
          }

          this.chaiFormInputStyles = result;
        } else if (event.detail.from == 'chai-button') {
          this.chaiFormButtonStyles = event.detail.chiaButtontyles;

          let result = '';
          for (const key in this.chaiFormButtonStyles) {
            if (this.chaiFormButtonStyles.hasOwnProperty(key)) {
              result += `${key}: ${this.chaiFormButtonStyles[key]};    \n  \t  `;
            }
          }

          this.chaiFormButtonStyles = result;
        } else if (event.detail.from == 'chai-header') {
          this.chaiFormHeaderStyles = event.detail.chaiHeaderstyles;

          let result = '';
          for (const key in this.chaiFormHeaderStyles) {
            if (this.chaiFormHeaderStyles.hasOwnProperty(key)) {
              result += `${key}: ${this.chaiFormHeaderStyles[key]};       \n  \t `;
            }
          }

          this.chaiFormHeaderStyles = result;
        } else if (event.detail.from == 'chai-reseter') {
          this.cssStyles = '';
          this.chaiFormRenderStyles = '';
          this.chaiFormStyles = '';
          this.chaiFormHeaderStyles = '';
          this.chaiFormLabelStyles = '';
          this.chaiFormInputStyles = '';
          this.chaiFormButtonStyles = '';
        }
      }
    }

    this.cssStyles =
      this.chaiFormRenderStyles +
      this.chaiFormStyles +
      this.chaiFormHeaderStyles +
      this.chaiFormLabelStyles +
      this.chaiFormInputStyles +
      this.chaiFormButtonStyles;

    target.removeAttribute('class');
    // target.removeAttribute('id');
    target.setAttribute('class', this.defaultClass);

    let snippet =
      this.cssStyles.trim() == ''
        ? ''
        : `
    <style>
       chia-form.${this.defaultClass} {
         ${this.cssStyles}
       }
    </style>
`;
    snippet = snippet.replace(/ style="[^"]*"/g, '');
    snippet = snippet.replace(/\s*id="[^"]*"/g, '');

    // snippet = snippet.replace(/\s+/g, ' ').trim();
    snippet.trim();
    this.snippet = snippet;
    this.htmlSnippet = this.snippet; // Set the snippet
  }

  async copyToClipboard(snippet: string) {
    try {
      document.body.focus(); // Ensu
      this.htmlSnippet = snippet; // Set the snippet

      // Copy to clipboard immediately without delay
      await navigator.clipboard.writeText(snippet); // Copy to clipboard

      // Optionally show a message or change the state
      this.isCodeSnippedVisible = true;
      this.showCopyMessageAfterSeconds();
      this.hideCopyMessageAfterSeconds(3000);
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

  showCopyMessageAfterSeconds() {
    var shadowRoot = this.shadowRoot;
    if (shadowRoot) {
      var lblCoppiedMessageElement = shadowRoot.getElementById(
        'coppied'
      ) as HTMLElement;
      if (lblCoppiedMessageElement) {
        lblCoppiedMessageElement.style.display = 'block';
      }
    }
  }

  hideCopyMessageAfterSeconds(n: number) {
    setTimeout(() => {
      var shadowRoot = this.shadowRoot;
      if (shadowRoot) {
        var lblCoppiedMessageElement = shadowRoot.getElementById(
          'coppied'
        ) as HTMLElement;
        if (lblCoppiedMessageElement) {
          lblCoppiedMessageElement.style.display = 'none';
        }
      }
    }, n);
  }

  override render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
        crossorigin="anonymous"
      />

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
          value="please copy style and paste it code into your header"
          class="form-control btn-primary btn-copy"
          @click="${() => this.copyToClipboard(this.snippet)}"
        />
        <label style="display:none;color:green;" id="coppied"
          >code snippet coppied successfully.</label
        >
      </div>
    `;
  }
}
