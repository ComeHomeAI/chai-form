/**
 * @license
 * Copyright 2024 Come Home AI, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { ChaiForm } from '../chai-form.js';

import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('chai-form', () => {
  test('is defined', () => {
    const el = document.createElement('chai-form');
    assert.instanceOf(el, ChaiForm);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<chai-form></chai-form>`);
    assert.shadowDom.equal(
      el,
      `
      <h2>
        Get your moving quote now!
      </h2>
      <slot name="before">
      </slot>
      <form id="chai-quote-form">
        <slot>
          <chai-name>
          </chai-name>
          <chai-phone>
          </chai-phone>
          <chai-email>
          </chai-email>
          <chai-address>
          </chai-address>
        </slot>
        <a href="https://www.comehome.ai"
          style="background:;"
        >
          Get a Quote!
        </a>
      </form>
      <slot name="after">
        <chai-stepper>
        </chai-stepper>
      </slot>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<chai-form name="Test"></chai-form>`);
    assert.shadowDom.equal(
      el,
      `
      <h2>
        Get your moving quote now!
      </h2>
      <slot name="before">
      </slot>
      <form id="chai-quote-form">
        <slot>
          <chai-name>
          </chai-name>
          <chai-phone>
          </chai-phone>
          <chai-email>
          </chai-email>
          <chai-address>
          </chai-address>
        </slot>
        <a href="https://www.comehome.ai"
          style="background:;"
        >
          Get a Quote!
        </a>
      </form>
      <slot name="after">
        <chai-stepper>
        </chai-stepper>
      </slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = (await fixture(html`<chai-form></chai-form>`)) as ChaiForm;
    const button = el.shadowRoot!.querySelector('a')!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h2>
        Get your moving quote now!
      </h2>
      <slot name="before">
      </slot>
      <form id="chai-quote-form">
        <slot>
          <chai-name>
          </chai-name>
          <chai-phone>
          </chai-phone>
          <chai-email>
          </chai-email>
          <chai-address>
          </chai-address>
        </slot>
        <a href="https://www.comehome.ai"
          style="background:;"
        >
          Get a Quote!
        </a>
      </form>
      <slot name="after">
        <chai-stepper>
        </chai-stepper>
      </slot>
    `
    );
  });


  test('styling applied', async () => {
    const el = (await fixture(html`<chai-form></chai-form>`)) as ChaiForm;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '16px');
  });
});
