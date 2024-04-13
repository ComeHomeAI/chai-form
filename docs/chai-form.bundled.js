/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:a,defineProperty:n,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:l,getPrototypeOf:d}=Object,f=globalThis,u=f.trustedTypes,p=u?u.emptyScript:"",m=f.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>!a(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:g};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&n(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return s?.call(this)},set(e){const r=s?.call(this);o.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...c(t),...l(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s,this[s]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??g)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[v("elementProperties")]=new Map,y[v("finalized")]=new Map,m?.({ReactiveElement:y}),(f.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,$=x.trustedTypes,S=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",k=`lit$${(Math.random()+"").slice(9)}$`,C="?"+k,z=`<${C}>`,E=document,A=()=>E.createComment(""),_=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,P="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,U=/>/g,O=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,H=/"/g,R=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),V=new WeakMap,B=E.createTreeWalker(E,129);function W(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",a=N;for(let e=0;e<i;e++){const i=t[e];let n,h,c=-1,l=0;for(;l<i.length&&(a.lastIndex=l,h=a.exec(i),null!==h);)l=a.lastIndex,a===N?"!--"===h[1]?a=j:void 0!==h[1]?a=U:void 0!==h[2]?(R.test(h[2])&&(o=RegExp("</"+h[2],"g")),a=O):void 0!==h[3]&&(a=O):a===O?">"===h[0]?(a=o??N,c=-1):void 0===h[1]?c=-2:(c=a.lastIndex-h[2].length,n=h[1],a=void 0===h[3]?O:'"'===h[3]?H:I):a===H||a===I?a=O:a===j||a===U?a=N:(a=O,o=void 0);const d=a===O&&t[e+1].startsWith("/>")?" ":"";r+=a===N?i+z:c>=0?(s.push(n),i.slice(0,c)+T+i.slice(c)+k+d):i+k+(-2===c?e:d)}return[W(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,n=this.parts,[h,c]=F(t,e);if(this.el=G.createElement(h,i),B.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=B.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(T)){const e=c[r++],i=s.getAttribute(t).split(k),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?X:"?"===a[1]?Y:"@"===a[1]?tt:Q}),s.removeAttribute(t)}else t.startsWith(k)&&(n.push({type:6,index:o}),s.removeAttribute(t));if(R.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],A()),B.nextNode(),n.push({type:2,index:++o});s.append(t[e],A())}}}else if(8===s.nodeType)if(s.data===C)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)n.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===D)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=_(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=J(t,o._$AS(t,e.values),o,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??E).importNode(e,!0);B.currentNode=s;let o=B.nextNode(),r=0,a=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new K(o,o.nextSibling,this,t):1===n.type?e=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(e=new et(o,this,t)),this._$AV.push(e),n=i[++a]}r!==n?.index&&(o=B.nextNode(),r++)}return B.currentNode=E,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),_(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==L&&_(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new G(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new K(this.S(A()),this.S(A()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=J(this,t,e,0),r=!_(t)||t!==this._$AH&&t!==D,r&&(this._$AH=t);else{const s=t;let a,n;for(t=o[0],a=0;a<o.length-1;a++)n=J(this,s[i+a],e,a),n===D&&(n=this._$AH[a]),r||=!_(n)||n!==this._$AH[a],n===L?t=L:t!==L&&(t+=(n??"")+o[a+1]),this._$AH[a]=n}r&&!s&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}class Y extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==L)}}class tt extends Q{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??L)===D)return;const i=this._$AH,s=t===L&&i!==L||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==L&&(i===L||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const it=x.litHtmlPolyfillSupport;it?.(G,K),(x.litHtmlVersions??=[]).push("3.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class st extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new K(e.insertBefore(A(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}st._$litElement$=!0,st.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:st});const ot=globalThis.litElementPolyfillSupport;ot?.({LitElement:st}),(globalThis.litElementVersions??=[]).push("4.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=1;class at{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends at{constructor(t){if(super(t),t.type!==rt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return D}}),ht={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:g},ct=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t)},init(e){return void 0!==e&&this.P(s,void 0,t),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,s?{...t,wrapped:!0}:t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function dt(t){return lt({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */var ft,ut,pt,mt=function(t,e,i,s){for(var o,r=arguments.length,a=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,n=t.length-1;n>=0;n--)(o=t[n])&&(a=(r<3?o(a):r>3?o(e,i,a):o(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a},vt=function(t,e,i,s){if("a"===i&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!s:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?s:"a"===i?s.call(t):s?s.value:e.get(t)},bt=function(t,e,i,s,o){if("m"===s)throw new TypeError("Private method is not writable");if("a"===s&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===s?o.call(t,i):o?o.value=i:e.set(t,i),i};let gt=class extends st{constructor(){super(),this.nameChanged=!1,this.phoneChanged=!1,this.emailChanged=!1,ft.set(this,"comehome.ai"),ut.set(this,"Get a Quote!"),pt.set(this,"Get your moving quote now!"),this.visitorId=localStorage.getItem("chai-visitorId")||crypto.randomUUID(),localStorage.setItem("chai-visitorId",this.visitorId),this.name=localStorage.getItem("chai-name")||"",this.phone=localStorage.getItem("chai-phone")||"",this.email=localStorage.getItem("chai-email")||"",this.date=localStorage.getItem("chai-date")||""}get flowType(){return vt(this,ft,"f")}set flowType(t){bt(this,ft,t,"f")}get buttonText(){return vt(this,ut,"f")}set buttonText(t){bt(this,ut,t,"f")}get headerText(){return vt(this,pt,"f")}set headerText(t){bt(this,pt,t,"f")}isNameInvalid(){return this.nameChanged&&this.name.length<2}isPhoneInvalid(){return this.phoneChanged&&!/^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?(?!555)\d{3}[-.\s]?\d{4}$/.test(this.phone)}isEmailInvalid(){return this.emailChanged&&!/^[^\s@]+@(?!.*(\w+\.)?example\.com)[^\s@]+\.[^\s@]+$/.test(this.email)}render(){const t=this.isNameInvalid(),e=this.isPhoneInvalid(),i=this.isEmailInvalid();return q`
      <h2>${this.headerText}</h2>
      <form id="chai-quote-form">

        <label for="name">Name <span>*</span></label>
        <input id="name" type="text" placeholder="First & Last Name"
          class=${nt({invalid:t})} @blur="${this.blurField("name")}"
          autocomplete="name" required
          .value="${this.name}" @input="${this.updateField("name")}">
        ${t?q`<span class="error">Please enter your name.</span>`:""}
        
        <label for="phoneNumber">Phone Number <span>*</span></label>
        <input id="phoneNumber" type="tel" placeholder="###-###-####"
          class=${nt({invalid:e})} @blur="${this.blurField("phone")}"
          autocomplete="tel" required
          .value="${this.phone}" @input="${this.updateField("phone")}">
        ${e?q`<span class="error">Please enter a valid phone number.</span>`:""}
        
        <label for="email">Email <span>*</span></label>
        <input id="email" type="email" placeholder="Email"
          class=${nt({invalid:i})} @blur="${this.blurField("email")}"
          autocomplete="email" required
          .value="${this.email}" @input="${this.updateField("email")}">
        ${i?q`<span class="error">Please enter a valid email address.</span>`:""}
        
        <label for="date">Estimated Move Date</label>
        <input id="date" type="date" placeholder="Estimated Move Date"
          autocomplete="off" min="${(new Date).toISOString().split("T")[0]}"
          .value="${this.date}" @input="${this.updateField("date")}">
        
        <a href="https://www.comehome.ai" @click="${this.submit}">${this.buttonText}</a>
      </form>
      <ol>
        <li>
          <svg focusable="false" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.89-2-2-2m0 16H5V7h14zm-2-7H7v-2h10zm-4 4H7v-2h6z"></path></svg>
          <p>Fill out this form <b>(required)</b></p>
        </li>
        <li>
          <div class="connector"></div>
          <svg focusable="false" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5"></path></svg>
          <p>Take pictures of your items <i>(optional)</i></p>
        </li>
        <li>
          <div class="connector"></div>
          <svg focusable="false" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm1 10h-4v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1h-2v-1H9v-2h4v-1h-3c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1V9h2v1h2zm-2-4V3.5L17.5 8z"></path></svg>
          <p>Get your quote!</p>
        </li>
      </ol>
      <slot id="offer"></slot>
    `}updateField(t){return e=>{const i=e.target.value;this[t]=i,localStorage.setItem(`chai-${t}`,i),fetch("https://example.local:3000/",{method:"POST",headers:{"Content-Type":"application/json","X-CHAI-VisitorID":this.visitorId},body:JSON.stringify({fieldName:i})})}}blurField(t){return()=>{this[`${t}Changed`]=!0}}submit(t){t.preventDefault(),this.nameChanged=!0,this.phoneChanged=!0,this.emailChanged=!0,this.isNameInvalid()||this.isPhoneInvalid()||this.isEmailInvalid()||window.open(`https://example.local:3000/flows/${this.flowType}`,"_blank")}};ft=new WeakMap,ut=new WeakMap,pt=new WeakMap,gt.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(s,t,i)})`
    :host {
      /**
       * The form-level CSS properties provide the initial look and feel for the form.
       * Fine-grained adjustments are possible, but these form-level properties should
       * be sufficient for most use cases.
       */
      /**
       * The max width limits the width of the form component.
       * The layout is responsive and will adjust to the available space.
       */
      --chai-form-max-width: 400px;
      /**
       * The brand color is used to set the initial color for all text as well as the
       * background color for the button.
       */
      --chai-form-color-brand: #01919b;
      /**
       * The alert color is used to indicate errors or other important information.
       */
      --chai-form-color-alert: #fa2829;
      /**
       * The text color is used as the initial setting for all text elements, and
       * defaults to the brand color.
       */
      --chai-form-color-text: var(--chai-form-color-brand);
      /**
       * The background is used for the overall form background. Note this does not
       * have to be only a color.
       */
      --chai-form-background: #fffaf6;
      /**
       * The font family is applied to all of the form elements, except for inputs
       * which keep their system-assigned default sans-serif font.
       * By default, the font family is set to inherit from the parent element to
       * allow the form elements to blend into the surrounding website's brand.
       */
      --chai-form-font-family: inherit;
      /**
       * This font size is applied to all of the form elements.
       */
      --chai-form-font-size: 16px;
      /**
       * This font weight is applied to all of the form elements.
       */
      --chai-form-font-weight: 400;
      /**
       * This border is applied to the form element only.
       * Inputs and the button have their own border styles.
       */
      --chai-form-border: 1px solid #ccc;
      /**
       * This corner radius is applied to the form border, input field borders, and
       * the button by default.
       */
      --chai-form-corner-radius: 8px;
      /**
       * This spacing is applied to form padding as well as the vertical gap between
       * form fields. All other spacing is proportional to this value.
       */
      --chai-form-spacing: 16px;
      /**
       * Element-specific CSS properties allow for fine-tuning the look-and-feel.
       * These should only be changed after ensuring that the form-level properties
       * are insufficient for the desired look-and-feel.
       */
      --chai-header-font-size: calc(var(--chai-form-font-size) * 1.5);
      --chai-header-color: var(--chai-form-color-text);
      --chai-label-color: var(--chai-form-color-text);
      --chai-input-color: #000;
      --chai-input-corner-radius: calc(var(--chai-form-corner-radius) / 4);
      --chai-input-border: 0.8px solid rgb(233,228,224);
      --chai-input-shadow: rgba(21, 21, 21, 0.08) 0px 1px 2px 0px;
      --chai-button-color: #fff;
      --chai-button-font-size: var(--chai-form-font-size);
      --chai-button-text-transform: uppercase;
      --chai-button-background: var(--chai-form-color-brand);
      --chai-button-background-hover: var(--chai-form-color-brand);
      --chai-button-background-active: var(--chai-form-color-brand);
      /**
       * By default, the CHAI Form uses a CSS brightness filter to generate the
       * hover and active states for the button.
       * When specifying a background color for the hover and/or active states, it's
       * recommended to set the filter for the corresponding state to none.
       */
      --chai-button-filter-hover: brightness(1.2);
      --chai-button-filter-active: brightness(0.8);
      --chai-button-corner-radius: var(--chai-form-corner-radius);

      /**
       * The rest of this section defines the styles that are actually applied
       * to the custom element itself.
       */
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: var(--chai-form-max-width);
      font-family: var(--chai-form-font-family);
      font-size: var(--chai-form-font-size);
      font-weight: var(--chai-form-font-weight);
      text-shadow: none;
      text-align: left;
      border: var(--chai-form-border);
      border-radius: var(--chai-form-corner-radius);
      padding: var(--chai-form-spacing);
      background: var(--chai-form-background);
      color: var(--chai-form-color-brand);
    }
    h2 {
      color: var(--chai-header-color);
      font-size: var(--chai-header-font-size);
      margin-top: calc(var(--chai-form-spacing) / 4);
      margin-bottom: var(--chai-form-spacing);
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: calc(var(--chai-form-spacing) / 2);
    }
    label {
      font-size: calc(var(--chai-form-font-size) * 1.05);
      padding-left: 1px;
      color: var(--chai-label-color);
      margin-bottom: calc(-1 * var(--chai-form-spacing) / 4);

      span {
        color: var(--chai-form-color-alert);
        font-weight: bold;
      }
    }
    span.error {
      color: var(--chai-form-color-alert);
      font-size: calc(0.9 * var(--chai-form-font-size));
      margin-top: calc(-1 * var(--chai-form-spacing) / 4 * 3);
    }
    input {
      font-size: var(--chai-form-font-size);
      color: var(--chai-input-color);
      border: var(--chai-input-border);
      border-radius: var(--chai-input-corner-radius);
      box-shadow: var(--chai-input-shadow);
      padding: calc(var(--chai-form-spacing) / 2);
      margin-bottom: calc(var(--chai-form-spacing) / 2);

      &.invalid {
        border-color: var(--chai-form-color-alert);
        border-width: 2px;
      }
    }
    a {
      cursor: pointer;
      background: var(--chai-button-background);
      color: var(--chai-button-color);
      font-size: var(--chai-button-font-size);
      text-transform: var(--chai-button-text-transform);
      text-align: center;
      text-decoration: none;
      border-radius: var(--chai-button-corner-radius);
      margin-top: calc(var(--chai-form-spacing) / 2);
      padding: calc(var(--chai-form-spacing) / 1.5);

      &:hover {
        background: var(--chai-button-background-hover);
        filter: var(--chai-button-filter-hover);
        &:active {
          background: var(--chai-button-background-hover);
          filter: var(--chai-button-filter-active);
        }
      }
      &:active {
        background: var(--chai-button-background-hover);
        filter: var(--chai-button-filter-active);
      }
    }
    ol {
      display: flex;
      flex-direction: row;
      list-style: none;
      margin-top: calc(var(--chai-form-spacing) * 1.5);
      padding: 0;
      color: var(--chai-form-color-text);

      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        position: relative;

        &:not(:first-child)::before {
          content: '';
          position: absolute;
          display: block;
          width: 100%;
          height: 4px;
          left: calc(-50%);
          right: calc(-50%);
          top: calc((var(--chai-form-spacing) + 24px) / 2 - 2px);
          background-color: var(--chai-form-color-brand);
          filter: saturate(0.1) brightness(1.9);
          z-index: 1;
        }

        svg {
          background-color: var(--chai-form-color-brand);
          filter: saturate(0.5) brightness(1.5);
          fill: #fff;
          padding: calc(var(--chai-form-spacing) / 2);
          border-radius: 50%; // Make the background circular
          height: 24px;
          width: 24px;
          margin-bottom: calc(-1 * var(--chai-form-spacing) / 4);
          z-index: 2;
        }

        &:first-child svg {
          filter: none;
          padding: var(--chai-form-spacing);
          position: relative;
          top: calc(-1 * var(--chai-form-spacing) / 2);
          margin-bottom: calc(-1.25 * var(--chai-form-spacing));
        }
      }
    }
    #offer {
      display: block;
      margin-top: calc(-2 * var(--chai-form-spacing));
      color: var(--chai-form-color-text);
    }
  `,mt([dt()],gt.prototype,"visitorId",void 0),mt([dt()],gt.prototype,"name",void 0),mt([dt()],gt.prototype,"phone",void 0),mt([dt()],gt.prototype,"email",void 0),mt([dt()],gt.prototype,"date",void 0),mt([dt()],gt.prototype,"nameChanged",void 0),mt([dt()],gt.prototype,"phoneChanged",void 0),mt([dt()],gt.prototype,"emailChanged",void 0),mt([lt()],gt.prototype,"flowType",null),mt([lt()],gt.prototype,"buttonText",null),mt([lt()],gt.prototype,"headerText",null),gt=mt([(t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)})
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */("chai-form")],gt);export{gt as ChaiForm};
