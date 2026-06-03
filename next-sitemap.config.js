/** @type {import('next-sitemap').IConfig} */

// Routes are enumerated explicitly because every page renders dynamically
// (the root layout reads the locale/messages per request), so next-sitemap's
// automatic prerender detection only picks up static assets like /icon.png.
const routes = [
  { loc: "/", priority: 1.0 },
  { loc: "/studio-graficzne-stalowa-wola", priority: 0.9 },
  { loc: "/logo-stalowa-wola", priority: 0.9 },
  { loc: "/strony-internetowe-stalowa-wola", priority: 0.9 },
  { loc: "/uslugi", priority: 0.8 },
  { loc: "/uslugi/branding", priority: 0.7 },
  { loc: "/uslugi/identyfikacja-wizualna", priority: 0.7 },
  { loc: "/portfolio", priority: 0.7 },
  { loc: "/contact", priority: 0.7 },
  { loc: "/case-study/italiana", priority: 0.6 },
  { loc: "/case-study/ceramido", priority: 0.6 },
  { loc: "/case-study/rem-met", priority: 0.6 },
  { loc: "/case-study/suseu", priority: 0.6 },
  { loc: "/polityka-prywatnosci", priority: 0.3 },
];

module.exports = {
  siteUrl: "https://www.entei.design",
  generateRobotsTxt: true,
  exclude: ["/icon.png"],
  additionalPaths: async (config) =>
    Promise.all(
      routes.map((route) =>
        config.transform(config, route.loc).then((entry) => ({
          ...entry,
          priority: route.priority,
        })),
      ),
    ),
};
