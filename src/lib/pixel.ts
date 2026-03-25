export async function trackServerEvent(eventName: string, eventId: string) {
  await fetch(
    `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            action_source: "website",
          },
        ],
        access_token: process.env.META_ACCESS_TOKEN,
      }),
    },
  );
}

export const trackEvent = (eventName: string, eventId: string) => {
  if (typeof window !== "undefined") {
    window.fbq("track", eventName, {}, { eventID: eventId });
  }
};
