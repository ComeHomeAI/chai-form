import posthog from "posthog-js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataLayer: any;
}

posthog.init('phc_eFoyuRNAw13ZVLY70RxbNJReozcxlX3SRY3Z1vRcSuM', {
  api_host: "https://us.posthog.com"
});

/**
 * Publish an event to the Google Tag Manager dataLayer, if present.
 * @param event The event name to publish
 * @param params Any additional parameters to include in the event
 */
export function publishGtmEvent(event: string, params: object) {
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      event: event,
      ...params
    });
  }
}
