import { LitElement, html , css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ChaiForm } from './chai-form';

@customElement('chai-field-configurator')
export class ChaiFieldConfigurator extends LitElement {
  @property({ type: String }) targetForm: string = '';

 // Define styles specific to this component
  static override styles = css`
    .chai-field-container {
        background-color: #fef8ef;
          padding: 20px;
    background-color: #FFFFFF;
    border-radius: 19px;
    }
    label
    {
          text-shadow: none;
    font-weight: bolder;
    color: black;
    font-family: sans-serif;
      
    }

    .configurator-header-message
    {
        font-weight: bolder;
    color: black;
    text-shadow: none;
    font-family: sans-serif;
    margin-bottom: 25px;
    font-size: 19px;
    }
    .row
    {
        margin-bottom:25px;
    }
  `;

  constructor() {
    super();
    this.targetForm = ''; 
  }

  @property({ type: String }) selectedVisibilityValue: string = '';
  @property({ type: String }) targetFieldToApplyStyles: string = 'all';



    handleTargetFieldSelected()
    {
        var selectedField =   (this.shadowRoot?.getElementById('target-field') as HTMLInputElement).value;
        this.targetFieldToApplyStyles = selectedField;
    }

     applyChaiStyle(event: Event , cssStyle : string , px: string) {
    
    const target = document.getElementById(this.targetForm) as ChaiForm; 
    const input = event.target as HTMLInputElement;
     const value = input.value + px;


    
      if(this.targetFieldToApplyStyles == 'all')
      {
        target.childAddress.style.setProperty(cssStyle, value);
        target.chielEmail.style.setProperty(cssStyle, value);
        target.childPhone.style.setProperty(cssStyle, value);
        target.childName.style.setProperty(cssStyle, value);
        

      }else if(this.targetFieldToApplyStyles == 'chai-address')
      {
              target.childAddress.style.setProperty(cssStyle, value);

      }else if(this.targetFieldToApplyStyles == 'chai-email')
      {
              target.chielEmail.style.setProperty(cssStyle, value);

      }else if(this.targetFieldToApplyStyles == 'chai-phone')
      {
              target.childPhone.style.setProperty(cssStyle, value);

      }else if(this.targetFieldToApplyStyles == 'chai-name')
      {
              target.childName.style.setProperty(cssStyle, value);
      }
  
  }


     


  

  override render() {
    return html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
<div class="chai-field-container">
    <h2 class="configurator-header-message">Field Configurator</h2>

    <!-- Style Controls -->

    <div class="row">
        <div class="col-sm-12">
            <label for="target-field">Target Field To Apply Style </label>
            <select id='target-field' class="form-control" @input="${this.handleTargetFieldSelected}">
                <option value=''>Choose Field</option>
                <option value='all'>All Fields</option>
                <option value='chai-name'>Name</option>
                <option value='chai-phone'>Phone Number</option>
                <option value='chai-email'>Email</option>
                <option value='chai-address'>Address</option>
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <label for="chai-form-color-alert">Form Color Alert:</label>
            <input type="color" class="form-control" id="chai-form-color-alert" @input="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-form-color-alert','')}}">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <label for="chai-form-font-size">Form Font Size</label>
            <input type="number" class="form-control" id="chai-form-font-size" @input="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-form-font-size','px')}}">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <label for="chai-form-spacing">Form Spacing</label>
            <input type="number" class="form-control" id="chai-form-spacing" @input="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-form-spacing','px')}}">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <label for="chai-label-color">Label Color</label>
            <input type="color" class="form-control" id="chai-label-color" @input="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-label-color','')}}">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <label> Label Visibility</label>
            <br/>
            <label>
                <input type="radio" id="none-label-visibility" name="label-visibility" value="none"
                @change="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-label-visibility','')}}"
                       ?checked="${this.selectedVisibilityValue === 'none'}">
                None
            </label>
            <label>
                <input type="radio" id="visible-label-visibility" name="label-visibility" value="visible" @change="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-label-visibility','')}}"
                       ?checked="${this.selectedVisibilityValue === 'visible'}">
                Visible
            </label>
            <label>
                <input type="radio" id="hidden-label-visibility" name="label-visibility" value="hidden" @change="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-label-visibility','')}}"
                       ?checked="${this.selectedVisibilityValue === 'hidden'}">
                Hidden
            </label>
            <label>
                <input type="radio" id="collabse-label-visibility" name="label-visibility" value="collabse"
               @change="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-label-visibility' ,'')}}"
                       ?checked="${this.selectedVisibilityValue === 'collabse'}">
                Collabse
            </label>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <label for="chai-label-height">Label Height:</label>
            <input type="number" class="form-control" id="chai-label-height" @input="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-label-height','px')}}">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <label for="chai-input-color">Input Color:</label>
            <input type="color" class="form-control" id="chai-input-color" @input="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-input-color','')}}">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <label for="chai-input-corner-radius">Input Corner Radius:</label>
            <input type="number" class="form-control" id="chai-input-corner-radius" @input="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-input-corner-radius','px')}}">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
 <label>Shadow Color : </label>
        <br>
        <div class="col-sm-12">
            <input type="text" class="form-control" id="chai-input-shadow" @input="${(event: CustomEvent)=>{this.applyChaiStyle(event,'--chai-input-shadow','')}}">

        </div>
      
        </div>
       

    </div>
</div>

    `;
  }
}
