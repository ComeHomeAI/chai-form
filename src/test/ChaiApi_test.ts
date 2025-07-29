import {assert} from '@open-wc/testing';
import {extractFlowTypeFromHostname, getSessionData} from '../ChaiApi';

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
  test('extract flowType from hostname with chai.local domain name', () => {
    const hostname = 'chai.local';
    assert.strictEqual(extractFlowTypeFromHostname(hostname), 'chai.local');
  });
  test('correctly extract flowType from hostname with localhost', () => {
    const hostname = 'localhost';
    assert.strictEqual(extractFlowTypeFromHostname(hostname), 'localhost');
  });
  test('correctly extract flowType from hostname with subdomain localhost', () => {
    const hostname = 'test.localhost';
    assert.strictEqual(extractFlowTypeFromHostname(hostname), 'test.localhost');
  });

  test('googleAnalytics-extract-ids',()=> {
    const cookie1 = '_ga=GA1.1.1334514849.1753745755';
    const cookie2 = '_ga_ABC123=GS2.1.s1753555297$o1$g0$t1753555297$j60$l0$h0';
    document.cookie = cookie1;
    document.cookie = cookie2;
    let session_id;
    let cid;
    getSessionData('ABC123',res => {
      session_id = res.ga_session_id;
      cid = res.ga_cid;
    });
    assert.equal(session_id, '1753555297');
    assert.equal(cid, '1334514849.1753745755');

  });

});
