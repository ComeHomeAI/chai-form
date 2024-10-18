import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ChaiForm } from './chai-form';

@customElement('chai-form-snippet')
export class ChaiFormSnippet extends LitElement {
  @property({ type: String }) targetForm: string = '';
  @property({ type: Boolean }) isCodeSnippedVisible: Boolean = false;

  static override styles = css`
  
  .snippet{
    position: relative;
    top:  650px;;
    right: 404px;
  }

  .snippet-input{
    width: 400px;
    height: 201px;
  }

  .snippet-header{
       font-size: 19px;
    background-color: black;
    padding: 14px;
    border-radius: 11px;
    color: yelo;
    color: yellow;
    text-shadow: none;
    font-family: sans-serif;
  }

  .snippet-header-message
  {
    font-size:16px;
  }

  .snippet-copy-btn{
        background-color: black;
    border-radius: 6px;
    padding:10px;
    margin-top: 9px;
    color: yellow;
    font-family: sans-serif;
  }
  `;

  constructor() {
    super();
    this.targetForm = ''; 
  }

  @property({ type: String }) selectedVisibilityValue: string = '';
  @property({ type: String }) htmlSnippet: string = '';





  getSnippet()
  {
    
      const target = document.getElementById(this.targetForm) as ChaiForm; 
        if (!target) return;
  
    const snippet= target.shadowRoot?.innerHTML  || '' as string; // Get the inner HTML
    console.log(snippet);


     try {
      // Set focus on the document
      document.body.focus(); // Ensure the document is focused

      // Use setTimeout to allow the browser to focus before copying
      setTimeout(async () => {
        this.htmlSnippet = snippet;
        await navigator.clipboard.writeText(snippet); // Copy to clipboard
        alert('snipet copied successfully!');
        this.isCodeSnippedVisible = true;
        
      }, 100); // Delay for 100 ms
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  
  }


  override render() {


    return html`

        <div class="snippet">
            <!-- <h2 class="snippet-header-message">please copy and past this code into your website</h2> -->
            ${!this.isCodeSnippedVisible ? '' : html `
            <textarea  class="form-control snippet-input"
        .value="${this.htmlSnippet}" 
        @input="${this.getSnippet}"></textarea>
            `
            } 
            <br>
           
        <input type="button" value="please copy and past this code into your website" class="form-control snippet-copy-btn" @click="${this.getSnippet}">
</div>
    `;
  }
}
