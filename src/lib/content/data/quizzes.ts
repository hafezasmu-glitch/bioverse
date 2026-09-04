import type { Quiz } from "../types";

export const quizzes: Quiz[] = [
  {
    slug: "heart-quiz",
    title: { en: "Heart Quiz", bn: "হৃদপিণ্ড কুইজ" },
    description: {
      en: "Test what you've learned about the heart's structure and function.",
      bn: "হৃদপিণ্ডের গঠন ও কাজ সম্পর্কে আপনি যা শিখেছেন তা যাচাই করুন।",
    },
    educationLevel: ["school", "ssc"],
    relatedOrganSlug: "heart",
    sourceIds: ["openstax-ap2e-heart-anatomy"],
    questions: [
      {
        id: "q1",
        type: "mcq",
        prompt: { en: "How many chambers does the human heart have?", bn: "মানুষের হৃৎপিণ্ডে কয়টি প্রকোষ্ঠ থাকে?" },
        options: [
          { id: "a", text: { en: "2", bn: "২" }, correct: false, explanation: { en: "That's the number of atria, not the total number of chambers.", bn: "এটি অলিন্দের সংখ্যা, প্রকোষ্ঠের মোট সংখ্যা নয়।" } },
          { id: "b", text: { en: "3", bn: "৩" }, correct: false, explanation: { en: "The human heart is not three-chambered — that's typical of most amphibians and reptiles.", bn: "মানুষের হৃৎপিণ্ড তিন-প্রকোষ্ঠবিশিষ্ট নয় — এটি অধিকাংশ উভচর ও সরীসৃপের বৈশিষ্ট্য।" } },
          { id: "c", text: { en: "4", bn: "৪" }, correct: true, explanation: { en: "Correct — two atria and two ventricles.", bn: "সঠিক — দুটি অলিন্দ ও দুটি নিলয়।" } },
          { id: "d", text: { en: "6", bn: "৬" }, correct: false, explanation: { en: "No vertebrate heart has six chambers.", bn: "কোনো মেরুদণ্ডী প্রাণীর হৃৎপিণ্ডে ছয়টি প্রকোষ্ঠ থাকে না।" } },
        ],
      },
      {
        id: "q2",
        type: "mcq",
        prompt: { en: "Which chamber pumps oxygen-rich blood out to the whole body?", bn: "কোন প্রকোষ্ঠ অক্সিজেন-সমৃদ্ধ রক্ত সারা শরীরে পাম্প করে?" },
        options: [
          { id: "a", text: { en: "Right atrium", bn: "ডান অলিন্দ" }, correct: false, explanation: { en: "The right atrium receives oxygen-poor blood returning from the body.", bn: "ডান অলিন্দ শরীর থেকে ফিরে আসা অক্সিজেন-স্বল্প রক্ত গ্রহণ করে।" } },
          { id: "b", text: { en: "Right ventricle", bn: "ডান নিলয়" }, correct: false, explanation: { en: "The right ventricle pumps blood to the lungs, not the body.", bn: "ডান নিলয় ফুসফুসে রক্ত পাম্প করে, শরীরে নয়।" } },
          { id: "c", text: { en: "Left atrium", bn: "বাম অলিন্দ" }, correct: false, explanation: { en: "The left atrium receives blood from the lungs but doesn't pump it to the body directly.", bn: "বাম অলিন্দ ফুসফুস থেকে রক্ত গ্রহণ করে কিন্তু সরাসরি শরীরে পাম্প করে না।" } },
          { id: "d", text: { en: "Left ventricle", bn: "বাম নিলয়" }, correct: true, explanation: { en: "Correct — the left ventricle's thick muscular wall pumps oxygenated blood through the aorta to the whole body.", bn: "সঠিক — বাম নিলয়ের পুরু পেশিবহুল প্রাচীর অ্যাওর্টার মধ্য দিয়ে অক্সিজেনযুক্ত রক্ত সারা শরীরে পাম্প করে।" } },
        ],
      },
      {
        id: "q3",
        type: "true-false",
        prompt: { en: "Heart valves keep blood flowing in one direction only.", bn: "হৃদপিণ্ডের কপাটিকা রক্তকে শুধু একদিকে প্রবাহিত রাখে।" },
        options: [
          { id: "true", text: { en: "True", bn: "সত্য" }, correct: true, explanation: { en: "Correct — valves like the tricuspid, mitral, pulmonary and aortic valves prevent backflow.", bn: "সঠিক — ট্রাইকাসপিড, মাইট্রাল, পালমোনারি ও অ্যাওর্টিক কপাটিকা রক্তকে পেছনে প্রবাহিত হতে বাধা দেয়।" } },
          { id: "false", text: { en: "False", bn: "মিথ্যা" }, correct: false, explanation: { en: "Valves specifically exist to stop backflow, so this statement is true, not false.", bn: "কপাটিকা নির্দিষ্টভাবে বিপরীতমুখী প্রবাহ রোধ করার জন্য থাকে, তাই এই বিবৃতিটি সত্য, মিথ্যা নয়।" } },
        ],
      },
    ],
  },
  {
    slug: "cell-quiz",
    title: { en: "Cell Biology Quiz", bn: "কোষ জীববিজ্ঞান কুইজ" },
    description: {
      en: "Check your understanding of animal and plant cell structures.",
      bn: "প্রাণী ও উদ্ভিদ কোষের গঠন সম্পর্কে আপনার জ্ঞান যাচাই করুন।",
    },
    educationLevel: ["school", "ssc"],
    sourceIds: ["openstax-bio2e-cell-intro"],
    questions: [
      {
        id: "q1",
        type: "mcq",
        prompt: { en: "Which organelle is described as the 'powerhouse of the cell'?", bn: "কোন অঙ্গাণুকে 'কোষের শক্তিঘর' বলা হয়?" },
        options: [
          { id: "a", text: { en: "Nucleus", bn: "নিউক্লিয়াস" }, correct: false, explanation: { en: "The nucleus stores DNA; it doesn't primarily generate energy.", bn: "নিউক্লিয়াস DNA সংরক্ষণ করে; এটি মূলত শক্তি উৎপন্ন করে না।" } },
          { id: "b", text: { en: "Mitochondria", bn: "মাইটোকন্ড্রিয়া" }, correct: true, explanation: { en: "Correct — mitochondria produce ATP through cellular respiration.", bn: "সঠিক — মাইটোকন্ড্রিয়া কোষীয় শ্বসনের মাধ্যমে ATP উৎপাদন করে।" } },
          { id: "c", text: { en: "Golgi apparatus", bn: "গলগি বস্তু" }, correct: false, explanation: { en: "The Golgi apparatus packages and ships proteins, it doesn't generate the cell's energy.", bn: "গলগি বস্তু প্রোটিন প্যাকেজ ও প্রেরণ করে, এটি কোষের শক্তি উৎপন্ন করে না।" } },
          { id: "d", text: { en: "Ribosome", bn: "রাইবোজোম" }, correct: false, explanation: { en: "Ribosomes build proteins, not energy.", bn: "রাইবোজোম প্রোটিন তৈরি করে, শক্তি নয়।" } },
        ],
      },
      {
        id: "q2",
        type: "mcq",
        prompt: { en: "Which structure is found in plant cells but NOT typical animal cells?", bn: "কোন কাঠামো উদ্ভিদকোষে থাকে কিন্তু সাধারণ প্রাণীকোষে থাকে না?" },
        options: [
          { id: "a", text: { en: "Cell membrane", bn: "কোষ পর্দা" }, correct: false, explanation: { en: "Both plant and animal cells have a cell membrane.", bn: "উদ্ভিদ ও প্রাণী উভয় কোষেই কোষ পর্দা থাকে।" } },
          { id: "b", text: { en: "Mitochondria", bn: "মাইটোকন্ড্রিয়া" }, correct: false, explanation: { en: "Both plant and animal cells have mitochondria.", bn: "উদ্ভিদ ও প্রাণী উভয় কোষেই মাইটোকন্ড্রিয়া থাকে।" } },
          { id: "c", text: { en: "Cell wall", bn: "কোষ প্রাচীর" }, correct: true, explanation: { en: "Correct — the rigid cellulose cell wall is a defining plant cell structure that typical animal cells lack.", bn: "সঠিক — দৃঢ় সেলুলোজ কোষ প্রাচীর উদ্ভিদকোষের একটি সংজ্ঞায়িত কাঠামো, যা সাধারণ প্রাণীকোষে থাকে না।" } },
          { id: "d", text: { en: "Nucleus", bn: "নিউক্লিয়াস" }, correct: false, explanation: { en: "Both plant and animal cells have a nucleus.", bn: "উদ্ভিদ ও প্রাণী উভয় কোষেই নিউক্লিয়াস থাকে।" } },
        ],
      },
      {
        id: "q3",
        type: "true-false",
        prompt: { en: "Chloroplasts are found in both plant and animal cells.", bn: "ক্লোরোপ্লাস্ট উদ্ভিদ ও প্রাণী উভয় কোষেই পাওয়া যায়।" },
        options: [
          { id: "true", text: { en: "True", bn: "সত্য" }, correct: false, explanation: { en: "Chloroplasts are specific to plant cells (and algae) — animal cells don't have them.", bn: "ক্লোরোপ্লাস্ট শুধু উদ্ভিদকোষে (ও শৈবালে) থাকে — প্রাণীকোষে থাকে না।" } },
          { id: "false", text: { en: "False", bn: "মিথ্যা" }, correct: true, explanation: { en: "Correct — chloroplasts are unique to plant cells and algae, where they carry out photosynthesis.", bn: "সঠিক — ক্লোরোপ্লাস্ট শুধু উদ্ভিদকোষ ও শৈবালে থাকে, যেখানে তারা সালোকসংশ্লেষণ সম্পন্ন করে।" } },
        ],
      },
    ],
  },
];
