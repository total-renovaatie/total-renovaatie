// // src/collections/Globals/About.ts
// import { type GlobalConfig } from "payload";

// export const About: GlobalConfig = {
//   slug: "about",
//   label: "About Us",
//   admin: {
//     livePreview: {
//       url: ({ locale }) =>
//         `${process.env.SERVER_URL ?? "http://localhost:3000"}/${locale}`,
//     },
//   },
//   fields: [
//     {
//       name: "title",
//       type: "text",
//       required: true,
//       localized: true,
//     },
//     {
//       name: "description",
//       type: "textarea", // Preserves the line breaks for your whitespace-pre-line class
//       required: true,
//       localized: true,
//     },
//   ],
// };
