export interface FormInitResponse {
  flowInstanceId: string;
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

export const api = (environment: ApiEnvironment) => {
  return {
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

    update: async (visitorId: string, flowInstanceId: string, field: string, value: unknown) => {
      await fetch(`${environment}/formBff/update/${flowInstanceId}/${field}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CHAI-VisitorID': visitorId,
        },
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
    }
  };
};
