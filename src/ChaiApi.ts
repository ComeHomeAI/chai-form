
export interface FormInitResponse {
  flowInstanceId: string;
}

const API_ORIGIN = "https://192.168.2.169:7034/form";

export const api = {
  init: async (visitorId: string, flowType: string) => {
    const response = await fetch(
      `${API_ORIGIN}/formBff/init/${flowType}`, {
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
    await fetch(`${API_ORIGIN}/formBff/update/${flowInstanceId}/${field}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CHAI-VisitorID': visitorId,
      },
      body: JSON.stringify(value),
    });
  },

  buildSubmitUrl: (visitorId: string, flowInstanceId: string, fieldValues: string[][]) => {
    const submitUrl = `${API_ORIGIN}/formBff/submit/${flowInstanceId}`;
    const queryParams = new URLSearchParams(fieldValues);
    queryParams.append('visitorId', visitorId);
    const submitUrlWithParams = `${submitUrl}?${queryParams.toString()}`;
    return submitUrlWithParams;
  }
};
