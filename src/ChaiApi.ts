export interface FormInitResponse {
  flowInstanceId: string;
  gaMeasurementId: string;
}

export enum ApiEnvironment {
  Development = 'https://192.168.2.169:7034/form',
  Staging = 'https://form.dev.comehome.ai',
  Production = 'https://form.app.comehome.ai'
}

export function extractFlowTypeFromHostname(hostname: string) {
  const hostName = hostname.split('.');
  const tldOrLocalHost = hostName.pop();
  const domainOrUndefined = hostName.pop();
  if (domainOrUndefined == null) {
    return tldOrLocalHost ?? 'localhost';
  } else {
    return domainOrUndefined + '.' + tldOrLocalHost;
  }
}
// Extract UTM parameters from the current URL
function getUtmQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);

  const utmParams = new URLSearchParams();
  if (urlParams.has('utm_source')) {
    utmParams.append('utm_source', urlParams.get('utm_source')!);
  }
  if (urlParams.has('utm_medium')) {
    utmParams.append('utm_medium', urlParams.get('utm_medium')!);
  }
  if (urlParams.has('utm_campaign')) {
    utmParams.append('utm_campaign', urlParams.get('utm_campaign')!);
  }
  if (urlParams.has('utm_term')) {
    utmParams.append('utm_term', urlParams.get('utm_term')!);
  }
  if (urlParams.has('utm_content')) {
    utmParams.append('utm_content', urlParams.get('utm_content')!);
  }
  return utmParams;
}

type SessionData = {
  ga_session_id: string | undefined,
  ga_session_number: string | undefined,
  ga_cid: string | undefined
};

function getSessionData(measurementId: string, callback: (data: SessionData) => void) {
  const sessionNumberPattern = new RegExp(String.raw`_ga_${measurementId}=GS\d\.\d\.(.+?)(?:;|$)`);
  const sessionNumberMatch = document.cookie.match(sessionNumberPattern);
  const parts = sessionNumberMatch?.[1].split('.');

  if (!parts) {
    // Cookie not yet available; wait a bit and try again.
    window.setTimeout(() => getSessionData(measurementId, callback), 500);
    return;
  }

  const sessionCidPattern = new RegExp(String.raw`_ga=GA\d\.\d\.(\d+\.\d+)(?:;|$)`);
  const sessionCidMatch = document.cookie.match(sessionCidPattern);
  const cidContent = sessionCidMatch?.[1];

  callback({
    ga_session_id: parts.shift(),
    ga_session_number: parts.shift(),
    ga_cid: cidContent,
  });
}


export const api = (environment: ApiEnvironment) => {
  return {
    formLoad: (visitorId: string | null, flowType: string | null, flowInstance: string | null) => {
      if (visitorId && flowType && flowInstance) {
        fetch(
          `${environment}/formBff/formLoad`, {
            body: JSON.stringify({
              visitorId: visitorId,
              flowType: flowType,
              flowInstanceId: flowInstance,
              currentUrl: window.location.host + window.location.pathname,
            }),
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-CHAI-VisitorID': visitorId,
            },
          }).then(r => {
            if (!r.ok){
              console.log("FormLoad failed");
            }
        });
      }
    },
    init: async (visitorId: string, flowType: string) => {
      const response = await fetch(
        `${environment}/formBff/init/${flowType}?${getUtmQueryParams()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CHAI-VisitorID': visitorId,
        }
      });
      const formInit = await response.json() as unknown as FormInitResponse;
      return formInit;
    },

    update: async (visitorId: string, flowInstanceId: string, gaMeasurementId: string|null, field: string, value: unknown) => {

      let headers: Headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('X-CHAI-VisitorID', visitorId);
      if (gaMeasurementId) {
        getSessionData(gaMeasurementId, (sessionHeaders: any) => {
          if (sessionHeaders.ga_session_number && sessionHeaders.ga_session_id && sessionHeaders.ga_cid) {
            headers.set('X-CHAI-gaSessionId', sessionHeaders.ga_session_id);
            headers.set('X-CHAI-gaSessionNumber', sessionHeaders.ga_session_number);
            headers.set('X-CHAI-gaClientId', sessionHeaders.ga_cid);
          }
        });

      }
      await fetch(`${environment}/formBff/update/${flowInstanceId}/${field}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(value),
      });
    },

    buildSubmitUrl: (visitorId: string, flowType: string, flowInstanceId: string, fieldValues: string[][]) => {
      const submitUrl = `${environment}/formBff/submit/${flowType}/${flowInstanceId}`;
      const utmParams = Array.from(getUtmQueryParams().entries());
      const queryParams = new URLSearchParams(fieldValues.concat(utmParams));
      queryParams.append('visitorId', visitorId);
      const submitUrlWithParams = `${submitUrl}?${queryParams}`;
      return submitUrlWithParams;
    },
  };
};
