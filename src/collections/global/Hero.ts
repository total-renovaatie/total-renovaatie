// // src/collections/Globals/Hero.ts
// import { type GlobalConfig } from "payload";

// export const Hero: GlobalConfig = {
//   slug: "hero",
//   label: "Hero Section",
//   localization: true, // Enables EN/FR/NL tabs for the whole global
//   admin: {
//     livePreview: {
//       url: ({ locale }) => `http://localhost:3000/${locale}`,
//     },
//   },
//   fields: [
//     {
//       name: "title",
//       type: "text",
//       required: true,
//       localized: true, // Individual field localization
//     },
//     {
//       name: "rotatingServices",
//       type: "array",
//       required: true,
//       minRows: 1,
//       fields: [
//         {
//           name: "text",
//           type: "text",
//           localized: true,
//         },
//       ],
//     },
//   ],
// };
