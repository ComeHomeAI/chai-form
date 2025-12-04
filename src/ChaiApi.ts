export interface FormInitResponse {
  flowInstanceId: string;
  flowType: string;
  residentId: string;
  gaMeasurementId: string;
}

export const utmParamNames = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export enum ApiEnvironment {
  Development = 'https://chai.local:7035/formv1',
  Staging = 'https://formv1.stg.comehome.ai',
  Production = 'https://formv1.api.comehome.ai',
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

function processUtmParamFromUrlOrLocalStorage(urlParams: URLSearchParams, localStorageUtmParams: URLSearchParams, param: string, setValue: (value: string) => void) {
  let utmParamValue: string | null = null;
  if (urlParams.has(param)) {
    utmParamValue = urlParams.get(param);
  } else if (localStorageUtmParams.has(param)) {
    utmParamValue = localStorageUtmParams.get(param);
  }
  if (utmParamValue) {
    setValue(utmParamValue);
  }
}

// Extract UTM parameters from the current URL or local storage
function getUtmQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const localStorageUtm:string|null = localStorage.getItem('chai_utm_params');
  let localStorageUtmParams: URLSearchParams;
  if (localStorageUtm) {
    localStorageUtmParams = new URLSearchParams(localStorageUtm);
  } else {
    localStorageUtmParams = new URLSearchParams();
  }

  const utmParams = new URLSearchParams();
  utmParamNames.forEach((utmParamName, _) => {
    processUtmParamFromUrlOrLocalStorage(urlParams, localStorageUtmParams, utmParamName, (value) => utmParams.append(utmParamName, value));
  });
  return utmParams;
}

type SessionData = {
  ga_session_id: string | undefined,
  ga_cid: string | undefined
};

export function getSessionData(measurementId: string, callback: (data: SessionData) => void) {
  const sessionIdPattern = new RegExp(String.raw`_ga_${measurementId}=GS\d\.\d\.s?(.+?)\$o(.+?)(?:;|$)`);
  const sessionIdMatch = document.cookie.match(sessionIdPattern);
  const parts = sessionIdMatch?.[1].split('.');

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
    ga_cid: cidContent,
  });
}

export const ffapi = () => {
  return {
    isV2Enabled: async (currentEnvironment: ApiEnvironment, flowType: string | null) => {
      const response = await fetch(
        `${currentEnvironment}/formBff/use-v2/${flowType}`, {
        method: 'GET',
      });
      if (!response.ok) {
        console.log('Checking feature flag  failed');
      }
      const result = await response.json();
      return result as boolean;
    },
  }
}

export const api = (environment: ApiEnvironment) => {
  return {
    formLoad: async (visitorId: string, flowType: string | null, flowInstance: string | null) => {
      const response = await fetch(
          `${environment}/formBff/formLoad`, {
            body: JSON.stringify({
              visitorId: visitorId,
              flowType: flowType,
              flowInstanceId: flowInstance,
              currentUrl: window.location.href,
            }),
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-CHAI-VisitorID': visitorId,
            },
        });
      if (!response.ok) {
        console.log('FormLoad failed');
      }
      return await response.json() as unknown as boolean;

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

      const headers: Headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('X-CHAI-VisitorID', visitorId);
      if (gaMeasurementId) {
        getSessionData(gaMeasurementId, (sessionHeaders: any) => {
          if (sessionHeaders.ga_session_id && sessionHeaders.ga_cid) {
            headers.set('X-CHAI-gaSessionId', sessionHeaders.ga_session_id);
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
      // Move the visitorId before the utmParams as the params might be too long for the URL in extreme cases, and we never want to lose our visitorId
      const queryParams = new URLSearchParams(
        fieldValues
          .concat([['visitorId', visitorId]])
          .concat(utmParams)
      );
      const submitUrlWithParams = `${submitUrl}?${queryParams}`;
      return submitUrlWithParams;
    },
  };
};
