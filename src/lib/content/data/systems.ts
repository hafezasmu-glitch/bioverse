import type { BodySystem } from "../types";

export const bodySystems: BodySystem[] = [
  {
    slug: "circulatory",
    name: { en: "Circulatory System", bn: "সংবহনতন্ত্র" },
    summary: {
      en: "The heart, blood vessels and blood that transport oxygen, nutrients, hormones and waste throughout the body.",
      bn: "হৃৎপিণ্ড, রক্তনালী ও রক্ত নিয়ে গঠিত তন্ত্র, যা সারা শরীরে অক্সিজেন, পুষ্টি, হরমোন ও বর্জ্য পদার্থ পরিবহন করে।",
    },
    organSlugs: ["heart"],
    sourceIds: ["openstax-ap2e-heart-anatomy", "medlineplus-heart-diseases"],
  },
  {
    slug: "respiratory",
    name: { en: "Respiratory System", bn: "শ্বসনতন্ত্র" },
    summary: {
      en: "The airways and lungs that bring oxygen into the body and remove carbon dioxide.",
      bn: "শ্বাসনালী ও ফুসফুস নিয়ে গঠিত তন্ত্র, যা শরীরে অক্সিজেন সরবরাহ করে এবং কার্বন ডাই-অক্সাইড অপসারণ করে।",
    },
    organSlugs: ["lungs"],
    sourceIds: ["openstax-ap2e-respiratory-organs"],
  },
  {
    slug: "nervous",
    name: { en: "Nervous System", bn: "স্নায়ুতন্ত্র" },
    summary: {
      en: "The brain, spinal cord and nerves that control movement, sensation, thought and involuntary body functions.",
      bn: "মস্তিষ্ক, সুষুম্নাকাণ্ড ও স্নায়ু নিয়ে গঠিত তন্ত্র, যা চলাচল, অনুভূতি, চিন্তা ও শরীরের অনৈচ্ছিক কাজ নিয়ন্ত্রণ করে।",
    },
    organSlugs: ["brain"],
    sourceIds: ["openstax-ap2e-nervous-tissue", "openstax-ap2e-ch14-intro", "medlineplus-neurosciences"],
  },
  {
    slug: "digestive",
    name: { en: "Digestive System", bn: "পরিপাকতন্ত্র" },
    summary: {
      en: "The organs that break down food into nutrients the body can absorb and use.",
      bn: "যেসব অঙ্গ খাদ্যকে শরীরে শোষণযোগ্য পুষ্টি উপাদানে ভেঙে দেয়, তাদের নিয়ে গঠিত তন্ত্র।",
    },
    organSlugs: ["stomach", "liver"],
    sourceIds: [],
  },
  {
    slug: "urinary",
    name: { en: "Urinary System", bn: "রেচনতন্ত্র" },
    summary: {
      en: "The kidneys and associated organs that filter blood and remove waste as urine.",
      bn: "বৃক্ক ও সংশ্লিষ্ট অঙ্গসমূহ নিয়ে গঠিত তন্ত্র, যা রক্ত পরিশোধন করে এবং মূত্র আকারে বর্জ্য পদার্থ অপসারণ করে।",
    },
    organSlugs: ["kidneys"],
    sourceIds: [],
  },
];
