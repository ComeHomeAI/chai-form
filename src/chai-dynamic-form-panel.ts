import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('dynamic-control-panel')
export class DynamicControlPanel extends LitElement {
  @property({ type: String }) targetId: string = '';

  static override styles = css`
    .config-form {
      background-color: rgba(0, 0, 0, 0.7);
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      color: white;
      max-width: 300px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .config-form input,
    .config-form select {
      margin: 10px 0;
      padding: 10px;
      width: 100%;
      border-radius: 5px;
      border: none;
    }

    .config-form label {
      display: block;
      margin-bottom: 5px;
    }

    .config-form button {
      padding: 10px 20px;
      background-color: #790205;
      color: rgb(248, 230, 186);
      border: none;
      border-radius: 5px;
      font-size: 18px;
      cursor: pointer;
    }

    .config-form input[type="checkbox"] {
      margin-right: 10px;
    }
  `;

  constructor() {
    super();
    this.targetId = ''; 
  }

  applyStyles() {
    const target = document.getElementById(this.targetId) as HTMLElement; 
    if (!target) return;
     
    const bgColor = (this.shadowRoot?.getElementById('bgColor') as HTMLInputElement).value;
    const textColor = (this.shadowRoot?.getElementById('textColor') as HTMLInputElement).value;
    const fontSize = (this.shadowRoot?.getElementById('fontSize') as HTMLInputElement).value + 'px';
    const width = (this.shadowRoot?.getElementById('width') as HTMLInputElement).value + 'px';
    debugger;
    const height = (this.shadowRoot?.getElementById('height') as HTMLInputElement).value;

    const applyToComponent = (this.shadowRoot?.getElementById('applyToComponent') as HTMLInputElement).checked;
    const applyToElements = (this.shadowRoot?.getElementById('applyToElements') as HTMLInputElement).checked;

    if (applyToComponent) {
        debugger
       target.style.backgroundColor = bgColor;
       target.style.setProperty('--chai-form-max-width', width);
       target.style.setProperty('--chai-form-background', bgColor);
       target.style.height = height === "auto" ? "auto" : height + 'px';
      
    }

  
    if (applyToElements) {
        target.style.setProperty('--chai-form-font-size', fontSize);
        target.style.setProperty('--chai-form-color-brand', textColor);
    }
  }

  addElement() {
    const target = document.getElementById(this.targetId) as HTMLElement; 
    if (!target) return;

    const elementType = (this.shadowRoot?.getElementById('elementType') as HTMLSelectElement).value;
    const elementPlaceholder = (this.shadowRoot?.getElementById('elementPlaceholder') as HTMLInputElement).value;
    const elementId = (this.shadowRoot?.getElementById('elementId') as HTMLInputElement).value;
    const elementName = (this.shadowRoot?.getElementById('elementName') as HTMLInputElement).value;

    if (!elementPlaceholder || !elementId || !elementName) {
      alert('Placeholder, ID, and Name are mandatory fields.');
      return;
    }

    let newElement: HTMLElement | any | null = null;

    if (elementType === "input") {
      newElement = document.createElement("input") as HTMLInputElement; 
      newElement.placeholder = elementPlaceholder; 
      newElement.id = elementId; 
      newElement.name = elementName;
    } else if (elementType === "button") {
      newElement = document.createElement("button") as HTMLButtonElement; 
      newElement.textContent = elementPlaceholder; 
      newElement.id = elementId; 
      newElement.name = elementName; 
    } else if (elementType === "p") {
      newElement = document.createElement("p") as HTMLParagraphElement;
      newElement.textContent = elementPlaceholder; 
    }

    if (newElement) {
      target.appendChild(newElement);
    }
  }

  override render() {
    return html`
      <div class="config-form">
        <h2>Dynamic Control Panel</h2>

        <!-- Style Controls -->
        <label for="bgColor">Background Color:</label>
        <input type="color" id="bgColor" value="#ffffff">

        <label for="textColor">Text Color:</label>
        <input type="color" id="textColor" value="#000000">

        <label for="fontSize">Font Size (px):</label>
        <input type="number" id="fontSize" value="16">

        <label for="width">Width (px):</label>
        <input type="number" id="width" value="400">

        <label for="height">Height (px):</label>
        <input type="number" id="height" value="auto">

        <label>
          <input type="checkbox" id="applyToComponent" checked>
          Apply Styles to Component
        </label>
        <label>
          <input type="checkbox" id="applyToElements">
          Apply Styles to Elements Inside Component
        </label>

        <!-- Dynamic element type -->
        <label for="elementType">Add Element to Component:</label>
        <select id="elementType">
          <option value="input">Text Input</option>
          <option value="button">Button</option>
          <option value="p">Paragraph</option>
        </select>

        <label for="elementPlaceholder">Element Placeholder/Content:</label>
        <input type="text" id="elementPlaceholder" placeholder="Placeholder or text">

        <label for="elementId">Element ID:</label>
        <input type="text" id="elementId" placeholder="Element ID" required>

        <label for="elementName">Element Name:</label>
        <input type="text" id="elementName" placeholder="Element Name" required>

        <button @click="${this.applyStyles}">Apply Styles</button>
        <button @click="${this.addElement}">Add Element</button>
      </div>
    `;
  }
}
