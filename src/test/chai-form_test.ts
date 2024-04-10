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
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<chai-form name="Test"></chai-form>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = (await fixture(html`<chai-form></chai-form>`)) as ChaiForm;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });

  test('styling applied', async () => {
    const el = (await fixture(html`<chai-form></chai-form>`)) as ChaiForm;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '16px');
  });
});
