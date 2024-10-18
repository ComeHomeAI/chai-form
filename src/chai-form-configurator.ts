import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ChaiForm } from './chai-form';

@customElement('chai-form-configurator')
export class ChaiFormConfigurator extends LitElement {
  @property({ type: String }) targetForm: string = '';

  static override styles = css`
   
    .form-configurator-container
    {
      color: black;
    padding: 20px;
    background-color: #fbf7f1;
    border-radius: 20px;
    text-shadow: none;
    font-weight: bolder;
    font-size: 14px;
    }

    .row
    {
      margin-bottom:15px;
      font-family:sans-serif;
    }
    .form-configurator-header-message
    {
      margin-bottom: 34px;
    font-weight: bold;
    }
  `;

  constructor() {
    super();
    this.targetForm = ''; 
  }

  @property({ type: String }) selectedVisibilityValue: string = '';


  toggleChaiFormSlots(event : Event ,  componentName : string)
  {

    
     const target = document.getElementById(this.targetForm) as ChaiForm; 
        if (!target) return;

            

          const checkbox = event.target as HTMLInputElement; 
        if(!checkbox) return;

        if(componentName == 'chai-name')
        {
          target.isCreateName = checkbox.checked;
        }else if(componentName == 'chai-email')
        {
          target.isCreateEmail = checkbox.checked;
        }else if(componentName == 'chai-address')
        {
          target.isCreateAddress = checkbox.checked;
        }else if(componentName == 'chai-phone')
        {
          target.isCreatePhone = checkbox.checked;
        }
  }


  applyChaiStyle(event: Event , cssVaraible:string , px:string)
  {
    console.log(event,cssVaraible);
      const target = document.getElementById(this.targetForm) as ChaiForm; 
        if (!target) return;
        const input = event.target as HTMLInputElement;
        target.style.setProperty(cssVaraible , input.value + px);
        
  }


  override render() {
    return html`
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

<div>
 
 <div class="row form-configurator-container">
  <div class="col-sm-12">
     <h2 class="form-configurator-header-message">Form Configurator</h2>
  </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12">
                    <label for="form-flex-direction">Form Flex Direction</label>
                    <select id='form-flex-direction' class="form-control" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-flex-direction','')}}">
                        <option value=''>Choose Flex Direction</option>
                        <option value='column'>Column</option>
                        <option value='row'>row</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <label for="form-color-brand">Form Color Brand</label>
                    <input type="color" class="form-control" id="form-color-brand" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-color-brand','')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <label for="form-color-text">Form Color Text</label>
                    <input type="color" id="form-color-text" class="form-control"  @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-color-text','')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">

                    <label for="form-font-size">Form Font Size</label>
                    <input type="range" class="form-control" id="form-font-size" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-font-size','px')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <!-- Border Controls -->
                    <label for="form-border-style">Form Border Style</label>
                    <select id="form-border-Style" @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-border-style','')}}" class="form-control">
                        <option value="">Choose Style</option>
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                        <option value="double">Double</option>
                        <option value="groove">Groove</option>
                        <option value="ridge">Ridge</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <label for="form-border-width">Border Width (px)</label>
                    <input type="range" class="form-control" id="form-border-width" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-border-width','px')}}">
                </div>
            </div>
             <div class="row">
                <div class="col-sm-12">
                    <label for="form-border-width">Border Color </label>
                    <input type="color" class="form-control" id="form-border-color" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-border-color','')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <label for="form-border-Radius">Border Radius (px)</label>
                    <input type="range" class="form-control" id="form-border-radius" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-border-radius','px')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <label for="header-font-size">Form Header Font Size (px)</label>
                    <input type="range" class="form-control" id="header-font-size" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-header-font-size','px')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <label for="label-color">Form Label Color:</label>
                    <input type="color" id="label-color" class="form-control" @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-label-color','')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">

                    <label for="nput-color">Form Input Color:</label>
                    <input type="color" class="form-control" id="input-color" @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-input-color','')}}">
                </div>
            </div>

             <div class="row">
                <div class="col-sm-12">
                    <!-- Border Controls -->
                    <label for="borderStyle">Form Input Border Style</label>
                    <select id="input-border-style" class="form-control" @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-input-border-style','')}}">
                        <option value="">Choose Style</option>
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                        <option value="double">Double</option>
                        <option value="groove">Groove</option>
                        <option value="ridge">Ridge</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <label for="input-border-color">Form Input Border Color</label>
                    <input class="form-control" type="color" id="input-border-color" @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-input-border-color','')}}">
                </div>
            </div>

             <div class="row">
                <div class="col-sm-12">
                    <label for="button-font-size">Form Button Font Size (px)</label>
                    <input type="range" class="form-control" id="button-font-size" @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-button-font-size','px')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <!-- Border Controls -->
                    <label for="button-text-transform">Button Text Transform:</label>
                    <select id="button-text-transform" class="form-control" @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-button-text-transform','')}}">
                        <option value="">Choose Transform</option>
                        <option value="none">None</option>
                        <option value="capitalize">Capitalize</option>
                        <option value="uppercase">Uppercase</option>
                        <option value="lowercase">Lowercase</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">

                    <label for="button-background-hover">Button Background Hover</label>
                    <input type="color" class="form-control" id="button-background-hover"  @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-button-background-hover','')}}">
                </div>
            </div>

            
            
            
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12">
                    <label for="from-max-width">Form Max Width (px)</label>
                    <input type="range" class="form-control" id="form-max-width"  @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-max-width','px')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">

                    <label for="form-color-alert">Form Color Alert</label>
                    <input type="color" class="form-control" id="form-color-alert" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-color-alert','')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">

                    <label for="form-background">Form Background</label>
                    <input type="color" class="form-control" id="form-background"  @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-background','')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <label for="orm-font-wight">Form Font Weight (px)</label>
                    <input type="range"  class="form-control" id="form-font-wight" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-font-wight','px')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <label for="from-border-color">Form Border Color</label>
                    <input class="form-control" type="color" id="form-border-color" value="#000000" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-border-color','')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <label for="form-spacing">Form Spacing (px)</label>
                    <input class="form-control" type="range" id="form-spacing" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-form-spacing','px')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">

                    <label for="header-color">Form Header Color</label>
                    <input type="color" class="form-control" id="header-color" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-header-color','')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div>
                        <label>First Label Visibility</label>
                        <br />
                        <label>
                            <input type="radio" id="none-label-visibility" name="label-visibility" value="none"
                            @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'none' , '')}}"
                                   ?checked="${this.selectedVisibilityValue === 'none'}">
                            None
                        </label>
                        <label>
                            <input type="radio" id="visible-label-visibility" name="label-visibility" value="visible" @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'visible','')}}"
                                   ?checked="${this.selectedVisibilityValue === 'visible'}">
                            Visible
                        </label>
                        <label>
                            <input type="radio" id="hidden-label-visibility" name="label-visibility" value="hidden" @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'hidden','')}}"
                                   ?checked="${this.selectedVisibilityValue === 'hidden'}">
                            Hidden
                        </label>
                        <label>
                            <input type="radio" id="collabse-label-visibility" name="label-visibility" value="collabse"
                            @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'collabse','')}}"
                                   ?checked="${this.selectedVisibilityValue === 'collabse'}">
                            Collabse
                        </label>
                    </div>


                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <label for="label-height">Form Label Height (px)</label>
                    <input type="range" class="form-control" id="label-height" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-label-height','px')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">

                    <label for="input-corner-radius">Form Input Corner Radius (px)</label>
                    <input class="form-control" type="range" id="input-corner-radius" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-input-corner-radius','px')}}">
                </div>
            </div>


            <div class="row">
                <div class="col-sm-12">
                    <label for="input-border-width">Form Input Border Width (px)</label>
                    <input type="range" class="form-control" id="input-border-width" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-input-border-width' , 'px')}}">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">

                    <label for="button-color">Button Color</label>
                    <input type="color" class="form-control" id="button-color"  @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-button-color' , '')}}">
                </div>
            </div>

              <div class="row">
                <div class="col-sm-12">
                    <label for="button-background">Button Background</label>
                    <input type="color" class="form-control" id="button-background" @input="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-button-background','')}}">
                </div>
            </div>

              <div class="row">
                <div class="col-sm-12">
                    <label for="button-background-active">Button Background Active</label>
                    <input class="form-control" type="color" id="button-background-active" @change="${(event:CustomEvent) => {this.applyChaiStyle(event,'--chai-button-background-active','')}}">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                 <label for="name"> Name
                    <input type="checkbox"  id="name" name="name" checked @change="${(event:CustomEvent) => {this.toggleChaiFormSlots(event,'chai-name')}}">
                     </label>
                    
                   <label for="phone-number"> Phone Number

                     <input type="checkbox"  id="phone-number" name="phone-number" checked @change="${(event:CustomEvent) => {this.toggleChaiFormSlots(event,'chai-phone')}}">

                   </label>
                    <label for="email"> Email

                                        <input type="checkbox" id="email" name="email" checked  @change="${(event:CustomEvent) => {this.toggleChaiFormSlots(event,'chai-email')}}">

                    </label>
                    <label for="address"> Address

                     <input type="checkbox" id="address" name="address" checked  @change="${(event:CustomEvent) => {this.toggleChaiFormSlots(event,'chai-address')}}">

                    </label>
              </div>
            </div>
           

        </div>
         <div class="row">
        
    </div>
    </div>
   

    <!-- Style Controls -->



    <!--#todo-->
    <!-- <label for="form-background">Form Font Family:</label>
    <input type="color" id="form-background"> -->
</div>
   


    `;
  }
}
