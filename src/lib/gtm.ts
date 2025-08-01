function sendGtmSuccessEvent() {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "form_submission_success",
    });
  }
}

export { sendGtmSuccessEvent };
