import {ChaiPhone} from '../chai-phone';
import {assert} from '@open-wc/testing';

suite('chai-phone', () => {
  test('phone with country code',()=>{
    const phone = new ChaiPhone();
    const res = phone.formatPhone("+1 3214567890");
    assert.equal(res, "+1 321 456 7890");
  });

  test('phone without country code', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("3214567890");
    assert.equal(res, "(321) 456-7890");
  });

  test('phone with dashes', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("321-456-7890");
    assert.equal(res, "(321) 456-7890");
  });

  test('phone with spaces', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("321 456 7890");
    assert.equal(res, "(321) 456-7890");
  });

  test('phone with parentheses and spaces', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("(321) 456 7890");
    assert.equal(res, "(321) 456-7890");
  });

  test('phone with leading 1', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("1 321 456 7890");
    assert.equal(res, "(321) 456-7890");
  });

  test('phone with country code and parentheses', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("+1 (321) 456-7890");
    assert.equal(res, "+1 321 456 7890");
  });

  test('phone with mixed characters', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("+1-(321) 456-7890");
    assert.equal(res, "+1 321 456 7890");
  });
  test('phone with 0 digits', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("");
    assert.equal(res, "");
  });

  test('phone with 1 digit', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("3");
    assert.equal(res, "3");
  });

  test('phone with 2 digits', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("32");
    assert.equal(res, "32");
  });

  test('phone with 3 digits', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("321");
    assert.equal(res, "(321)");
  });

  test('phone with 4 digits', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("3214");
    assert.equal(res, "(321) 4");
  });

  test('phone with 5 digits', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("32145");
    assert.equal(res, "(321) 45");
  });

  test('phone with 6 digits', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("321456");
    assert.equal(res, "(321) 456");
  });

  test('phone with 7 digits', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("3214567");
    assert.equal(res, "(321) 456-7");
  });

  test('phone with 8 digits', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("32145678");
    assert.equal(res, "(321) 456-78");
  });

  test('phone with 9 digits', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("321456789");
    assert.equal(res, "(321) 456-789");
  });

  test('phone with 10 digits', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("3214567890");
    assert.equal(res, "(321) 456-7890");
  });

  test('phone with more than 10 digits', () => {
    const phone = new ChaiPhone();
    const res = phone.formatPhone("3214567890123");
    assert.equal(res, "(321) 456-7890123");
  });

});
