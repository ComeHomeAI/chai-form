
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

  update: async (visitorId: string, flowId: string, field: string, value: unknown) => {
    await fetch(`${API_ORIGIN}/form/update/${flowId}/${field}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CHAI-VisitorID': visitorId,
      },
      body: JSON.stringify(value),
    });
  },

  getSubmitUrl: (visitorId: string, flowId: string, fieldValues: string[][]) => {
    const submitUrl = `${API_ORIGIN}/form/submit/${flowId}`;
    const queryParams = new URLSearchParams(fieldValues);
    queryParams.append('visitorId', visitorId);
    const submitUrlWithParams = `${submitUrl}&${queryParams.toString()}`;
    return submitUrlWithParams;
  }
};
