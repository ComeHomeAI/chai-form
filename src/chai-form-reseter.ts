import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ChaiForm} from './chai-form';

@customElement('chai-form-reseter')
export class ChaiFormReseter extends LitElement {
  @property({type: String}) targetForm: string = '';
  @property({type: Object}) cssTyles: any = {};

  static override styles = css``;

  constructor() {
    super();
    this.targetForm = '';
  }

  @property({type: String}) defaultClassStyle: string = this.targetForm;

  resetFormStyle() {
    const target = document.getElementById(this.targetForm) as ChaiForm;
    if (!target) return;

    target.removeAttribute('style');
    this.cssTyles = {};
    this.notifySnippetComponent();
    this.resetAllComponent();
  }

  notifySnippetComponent() {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('style-updated', {
          detail: {
            defaultClass: this.defaultClassStyle,
            from: 'chai-reseter',
          },
          bubbles: true,
          composed: true,
        })
      );
    }, 0);
  }

  resetAllComponent() {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('style-reset', {
          detail: {
            defaultClass: this.defaultClassStyle,
            from: 'chai-reseter',
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
      <input
        type="button"
        class="form-control"
        value="Reset"
        @click="${() => {
          this.resetFormStyle();
        }}"
      />
    `;
  }
}
