import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ChaiFormState} from './ChaiFormState';

@customElement('chai-inputs-state-handler')
export class ChaiInputsStateHandler extends LitElement {
  @property({type: Object})
  formState: ChaiFormState = {
    showName: true,
    showPhone: true,
    showEmail: true,
    showAddress: true,
  };

  @property({type: Boolean}) expanded: boolean = false;

  static override styles = css`
    .form-control-container {
      display: grid;
      grid-template-rows: auto 0fr;
      gap: var(--form-control-container-gap, 10px);
      padding: var(--form-control-container-padding, 10px);
      border: var(--form-control-container-border, 1px solid #e0e0e0);
      border-radius: var(--form-control-container-border-radius, 5px);
      background-color: var(
        --form-control-container-background,
        rgba(255, 255, 255, 0.1)
      );
      backdrop-filter: blur(10px);
      box-shadow: var(
        --form-control-container-box-shadow,
        0 4px 6px rgba(0, 0, 0, 0.1)
      );
      transition: var(
        --form-control-container-transition,
        grid-template-rows 0.3s ease-in-out
      );
    }

    .form-control-container.expanded {
      grid-template-rows: auto 1fr;
    }

    .form-control-header {
      text-align: center;
      font-weight: var(--form-control-header-font-weight, bold);
      font-size: var(--form-control-header-font-size, 1.2em);
    }

    .form-control-header button {
      color: var(--form-control-button-color, #000);
      border: none;
      padding: var(--form-control-button-padding, 10px 20px);
      border-radius: var(--form-control-button-border-radius, 5px);
      cursor: pointer;
    }

    .form-control-group {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--form-control-group-gap, 10px);
      overflow: hidden;
    }

    .form-control {
      margin-bottom: var(--form-control-margin-bottom, 10px);
      display: flex;
      flex-direction: row;
      gap: var(--form-control-gap, 5px);
      align-items: center;

      & label {
        cursor: pointer;
        user-select: none;
      }
    }
  `;

  override render() {
    return html`
      <div class="form-control-container ${this.expanded ? 'expanded' : ''}">
        <div class="form-control-header">
          <button @click=${this.toggleExpanded}>
            Form Input Visibility ${this.expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <div class="form-control-group">
          <div class="form-control">
            <input
              id="showName"
              type="checkbox"
              .checked=${this.formState.showName}
              @change=${(e: Event) =>
                this.updateState(
                  'showName',
                  (e.target as HTMLInputElement).checked
                )}
            />
            <label for="showName">Show Name</label>
          </div>
          <div class="form-control">
            <input
              id="showPhone"
              type="checkbox"
              .checked=${this.formState.showPhone}
              @change=${(e: Event) =>
                this.updateState(
                  'showPhone',
                  (e.target as HTMLInputElement).checked
                )}
            />
            <label for="showPhone">Show Phone</label>
          </div>
          <div class="form-control">
            <input
              id="showEmail"
              type="checkbox"
              .checked=${this.formState.showEmail}
              @change=${(e: Event) =>
                this.updateState(
                  'showEmail',
                  (e.target as HTMLInputElement).checked
                )}
            />
            <label for="showEmail">Show Email</label>
          </div>
          <div class="form-control">
            <input
              id="showAddress"
              type="checkbox"
              .checked=${this.formState.showAddress}
              @change=${(e: Event) =>
                this.updateState(
                  'showAddress',
                  (e.target as HTMLInputElement).checked
                )}
            />
            <label for="showAddress">Show Address</label>
          </div>
        </div>
      </div>
    `;
  }

  private toggleExpanded() {
    this.expanded = !this.expanded;
  }

  private updateState(key: keyof ChaiFormState, value: boolean) {
    this.formState = {...this.formState, [key]: value};
    this.dispatchEvent(
      new CustomEvent('form-state-changed', {
        detail: this.formState,
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chai-inputs-state-handler': ChaiInputsStateHandler;
  }
}
