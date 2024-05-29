import {assert} from '@open-wc/testing';
import {extractFlowTypeFromHostname} from '../ChaiApi';

suite('ChaiApi', () => {

  test('correctly extract flowType from hostname with subdomain', () => {
    const hostname = 'www.example.com';
    assert.strictEqual(extractFlowTypeFromHostname(hostname), 'example.com');
  });

  test('correctly extract flowType from hostname with nested subdomain', () => {
    const hostname = 'app1.www.example.com';
    assert.strictEqual(extractFlowTypeFromHostname(hostname), 'example.com');
  });

  test('extract flowType from hostname with local IP address', () => {
    const hostname = '192.168.2.169';
    assert.strictEqual(extractFlowTypeFromHostname(hostname), '2.169');
  });
  test('correctly extract flowType from hostname with localhost', () => {
    const hostname = 'localhost';
    assert.strictEqual(extractFlowTypeFromHostname(hostname), 'localhost');
  });
  test('correctly extract flowType from hostname with subdomain localhost', () => {
    const hostname = 'test.localhost';
    assert.strictEqual(extractFlowTypeFromHostname(hostname), 'test.localhost');
  });

});
