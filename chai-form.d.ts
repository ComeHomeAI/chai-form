/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LitElement } from 'lit';
/**
 * The quoting form element that initiates the flow for the user.
 */
export declare class ChaiForm extends LitElement {
    private visitorId;
    private name;
    private phone;
    private email;
    private date;
    private nameChanged;
    private phoneChanged;
    private emailChanged;
    constructor();
    static styles: import("lit").CSSResult;
    /**
     * The ComeHome.ai flow type is the ID that has been configured for the location/context of
     * this form (e.g., the mover's website).
     */
    accessor flowType: string;
    /**
     * The text to display on the button; defaults to "Get Quote".
     */
    accessor buttonText: string;
    /**
     * The text to display in the header; defaults to "Get your moving quote now!".
     */
    accessor headerText: string;
    private isNameInvalid;
    private isPhoneInvalid;
    private isEmailInvalid;
    render(): import("lit-html").TemplateResult<1>;
    updateField(fieldName: 'name' | 'phone' | 'email' | 'date'): (e: Event) => void;
    blurField(fieldName: 'name' | 'phone' | 'email'): () => void;
    submit(e: Event): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'chai-form': ChaiForm;
    }
}
//# sourceMappingURL=chai-form.d.ts.map