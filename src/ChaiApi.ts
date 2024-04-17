
export interface FormInitResponse {
  flowId: string;
}

const API_ORIGIN = "https://example.local:3000";

export const api = {
  init: async (visitorId: string, flowType: string) => {
    const response = await fetch(
      `${API_ORIGIN}/form/init/${flowType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CHAI-VisitorID': visitorId,
      }
    });
    const formInit = await response.json() as unknown as FormInitResponse;
    return formInit;
  },

  update: async (visitorId: string, field: string, value: unknown) => {
    await fetch(`${API_ORIGIN}/form/update/${field}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CHAI-VisitorID': visitorId,
      },
      body: JSON.stringify(value),
    });
  },

  buildSubmitUrl: (visitorId: string, fieldValues: string[][]) => {
    const submitUrl = `${API_ORIGIN}/form/submit/${visitorId}`;
    const queryParams = new URLSearchParams(fieldValues);
    const submitUrlWithParams = `${submitUrl}&${queryParams.toString()}`;
    return submitUrlWithParams;
  }
};
