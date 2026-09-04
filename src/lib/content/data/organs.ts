import type { Organ } from "../types";

/**
 * Sample organ set for the Human Body Explorer.
 *
 * This is intentionally a small, carefully verified set (six organs across
 * five systems) rather than a full atlas — see the project README for why,
 * and for how to extend this array without touching any UI code.
 */
export const organs: Organ[] = [
  {
    slug: "heart",
    name: { en: "Heart", bn: "হৃদপিণ্ড" },
    scientificName: "Cor",
    pronunciation: "hahrt",
    systemId: "circulatory",
    layer: "organs",
    summary: {
      en: "A fist-sized muscular pump with four chambers that drives blood through the entire body.",
      bn: "চার প্রকোষ্ঠবিশিষ্ট একটি মুষ্টি-আকৃতির পেশিবহুল পাম্প, যা সারা শরীরে রক্ত সঞ্চালন করে।",
    },
    facts: {
      location: {
        en: "In the chest (thoracic cavity), between the lungs, slightly left of the body's midline, protected by the rib cage.",
        bn: "বক্ষগহ্বরে, ফুসফুসদ্বয়ের মাঝে, শরীরের মধ্যরেখার সামান্য বামে, পাঁজরের খাঁচা দ্বারা সুরক্ষিত।",
      },
      structure: {
        en: "Four chambers — right atrium, right ventricle, left atrium, left ventricle — separated by walls (septa) and four one-way valves (tricuspid, pulmonary, mitral/bicuspid, aortic) that keep blood flowing in one direction.",
        bn: "চারটি প্রকোষ্ঠ — ডান অলিন্দ, ডান নিলয়, বাম অলিন্দ, বাম নিলয় — এবং চারটি একমুখী কপাটিকা (ট্রাইকাসপিড, পালমোনারি, মাইট্রাল/বাইকাসপিড, অ্যাওর্টিক) নিয়ে গঠিত, যা রক্তকে এক দিকে প্রবাহিত রাখে।",
      },
      function: {
        en: "Pumps oxygen-poor blood to the lungs (pulmonary circulation) and oxygen-rich blood to the rest of the body (systemic circulation) through rhythmic contraction (systole) and relaxation (diastole).",
        bn: "ছন্দবদ্ধ সংকোচন (সিস্টোল) ও প্রসারণের (ডায়াস্টোল) মাধ্যমে অক্সিজেন-স্বল্প রক্ত ফুসফুসে (পালমোনারি সঞ্চালন) এবং অক্সিজেন-সমৃদ্ধ রক্ত শরীরের বাকি অংশে (সিস্টেমিক সঞ্চালন) পাম্প করে।",
      },
      importance: {
        en: "Continuous circulation delivers oxygen and nutrients to every living cell and carries away metabolic waste; without it, tissues begin to fail within minutes.",
        bn: "অবিরাম রক্তসঞ্চালন প্রতিটি জীবন্ত কোষে অক্সিজেন ও পুষ্টি পৌঁছে দেয় এবং বিপাকীয় বর্জ্য অপসারণ করে; এটি বন্ধ হলে কয়েক মিনিটের মধ্যেই কোষ ও টিস্যু বিকল হতে শুরু করে।",
      },
      interestingFact: {
        en: "A resting adult heart beats roughly 60–100 times a minute and pumps around 5 liters of blood every minute.",
        bn: "বিশ্রামরত একজন প্রাপ্তবয়স্কের হৃৎপিণ্ড প্রতি মিনিটে প্রায় ৬০–১০০ বার স্পন্দিত হয় এবং প্রতি মিনিটে প্রায় ৫ লিটার রক্ত পাম্প করে।",
      },
      commonMisconception: {
        en: "The heart is not shaped like the symmetrical ♥ symbol, and it is located roughly in the center of the chest, not entirely on the left side.",
        bn: "হৃৎপিণ্ড প্রতীকী ♥ আকৃতির নয়, এবং এটি বক্ষের প্রায় মাঝ বরাবর অবস্থিত, সম্পূর্ণভাবে বাম পাশে নয়।",
      },
    },
    levelContent: {
      beginner:
        "The heart is a pump made of muscle. It pushes blood all around your body so every part gets oxygen.",
      ssc:
        "The heart has four chambers (2 atria, 2 ventricles) and four valves. Deoxygenated blood enters the right atrium, is pumped to the lungs; oxygenated blood returns to the left atrium and is pumped out to the body through the aorta.",
      advanced:
        "Cardiac output (≈5 L/min at rest) is the product of heart rate and stroke volume, regulated by the autonomic nervous system and the heart's own pacemaker tissue (the sinoatrial node).",
    },
    relatedTermSlugs: ["red-blood-cell", "artery", "vein"],
    relatedOrganSlugs: ["lungs"],
    quizSlug: "heart-quiz",
    educationLevel: ["beginner", "school", "ssc", "advanced"],
    sourceIds: ["openstax-ap2e-heart-anatomy", "medlineplus-heart-diseases"],
    hasAnimation: true,
  },
  {
    slug: "lungs",
    name: { en: "Lungs", bn: "ফুসফুস" },
    scientificName: "Pulmones",
    pronunciation: "luhngz",
    systemId: "respiratory",
    layer: "organs",
    summary: {
      en: "A pair of spongy, air-filled organs where oxygen enters the blood and carbon dioxide leaves it.",
      bn: "স্পঞ্জের মতো বায়ুপূর্ণ একজোড়া অঙ্গ, যেখানে রক্তে অক্সিজেন প্রবেশ করে এবং কার্বন ডাই-অক্সাইড বের হয়ে যায়।",
    },
    facts: {
      location: {
        en: "In the chest cavity, one on each side of the heart; the right lung has three lobes, the left lung has two (to make room for the heart).",
        bn: "বক্ষগহ্বরে, হৃৎপিণ্ডের দুই পাশে একটি করে; ডান ফুসফুসে তিনটি এবং বাম ফুসফুসে (হৃৎপিণ্ডের জন্য জায়গা রাখতে) দুটি খণ্ড থাকে।",
      },
      structure: {
        en: "Air travels through the trachea into branching bronchi, then bronchioles, ending in roughly 300–480 million tiny air sacs called alveoli, each wrapped in capillaries.",
        bn: "বায়ু শ্বাসনালী (ট্রাকিয়া) হয়ে শাখাযুক্ত ব্রঙ্কাসে, তারপর ব্রঙ্কিওলে প্রবাহিত হয়ে প্রায় ৩০০–৪৮০ মিলিয়ন ক্ষুদ্র বায়ুথলি অ্যালভিওলাসে পৌঁছায়, যার প্রতিটি কৈশিকনালী দ্বারা ঘেরা।",
      },
      function: {
        en: "Gas exchange happens across the thin alveolar walls: oxygen diffuses into the blood while carbon dioxide diffuses out, to be exhaled.",
        bn: "পাতলা অ্যালভিওলার প্রাচীরের মধ্য দিয়ে গ্যাস বিনিময় ঘটে: অক্সিজেন রক্তে প্রবেশ করে এবং কার্বন ডাই-অক্সাইড রক্ত থেকে বের হয়ে শ্বাসত্যাগের মাধ্যমে নির্গত হয়।",
      },
      importance: {
        en: "Every cell in the body needs a continuous oxygen supply for aerobic respiration; the lungs are the interface between the air outside and the blood inside.",
        bn: "শরীরের প্রতিটি কোষের সবাত শ্বসনের জন্য নিরবচ্ছিন্ন অক্সিজেন প্রয়োজন; ফুসফুস বাইরের বাতাস ও শরীরের রক্তের মধ্যে সংযোগ স্থাপন করে।",
      },
      interestingFact: {
        en: "The total surface area of the alveoli in both lungs is roughly the size of a tennis court.",
        bn: "উভয় ফুসফুসের অ্যালভিওলাসের মোট পৃষ্ঠক্ষেত্রফল প্রায় একটি টেনিস কোর্টের সমান।",
      },
    },
    levelContent: {
      beginner: "The lungs are like two balloons in your chest that pull in air so your blood can pick up oxygen.",
      ssc: "The respiratory system moves air through the nose, trachea, bronchi and bronchioles to the alveoli, where oxygen and carbon dioxide are exchanged with the blood by diffusion.",
      advanced:
        "Ventilation is driven by pressure changes from diaphragm and intercostal muscle contraction; gas exchange follows partial-pressure gradients across the alveolar-capillary membrane.",
    },
    relatedTermSlugs: ["red-blood-cell"],
    relatedOrganSlugs: ["heart"],
    quizSlug: undefined,
    educationLevel: ["beginner", "school", "ssc", "advanced"],
    sourceIds: ["openstax-ap2e-respiratory-organs"],
    hasAnimation: true,
  },
  {
    slug: "brain",
    name: { en: "Brain", bn: "মস্তিষ্ক" },
    scientificName: "Encephalon",
    pronunciation: "brayn",
    systemId: "nervous",
    layer: "organs",
    summary: {
      en: "The body's control center, coordinating thought, movement, sensation and involuntary functions like breathing and heart rate.",
      bn: "শরীরের নিয়ন্ত্রণ কেন্দ্র, যা চিন্তা, চলাচল, অনুভূতি এবং শ্বাস-প্রশ্বাস ও হৃদস্পন্দনের মতো অনৈচ্ছিক কাজ সমন্বয় করে।",
    },
    facts: {
      location: {
        en: "Inside the skull (cranial cavity), protected by bone, three membrane layers (meninges) and cerebrospinal fluid.",
        bn: "করোটির (ক্র্যানিয়াল ক্যাভিটি) ভেতরে অবস্থিত, হাড়, তিন স্তরবিশিষ্ট আবরণী (মেনিনজেস) ও সেরিব্রোস্পাইনাল তরল দ্বারা সুরক্ষিত।",
      },
      structure: {
        en: "Broadly divided into the cerebrum (with frontal, parietal, temporal and occipital lobes), the cerebellum, and the brainstem (midbrain, pons, medulla oblongata).",
        bn: "স্থূলভাবে সেরিব্রাম (ফ্রন্টাল, প্যারাইটাল, টেম্পোরাল ও অক্সিপিটাল লোব সহ), সেরিবেলাম এবং ব্রেনস্টেম (মিডব্রেইন, পনস, মেডুলা অবলংগাটা) — এই তিন ভাগে বিভক্ত।",
      },
      function: {
        en: "The cerebrum handles conscious thought, sensory processing, language and voluntary movement; the cerebellum coordinates balance and fine motor control; the brainstem regulates vital involuntary functions such as breathing and heart rate.",
        bn: "সেরিব্রাম সচেতন চিন্তা, সংবেদন প্রক্রিয়াকরণ, ভাষা ও ঐচ্ছিক চলাচল নিয়ন্ত্রণ করে; সেরিবেলাম ভারসাম্য ও সূক্ষ্ম পেশি সমন্বয় নিয়ন্ত্রণ করে; ব্রেনস্টেম শ্বাস-প্রশ্বাস ও হৃদস্পন্দনের মতো গুরুত্বপূর্ণ অনৈচ্ছিক কাজ নিয়ন্ত্রণ করে।",
      },
      importance: {
        en: "As the central hub of the nervous system, the brain integrates sensory information and generates every voluntary and most involuntary responses of the body.",
        bn: "স্নায়ুতন্ত্রের কেন্দ্রীয় কেন্দ্র হিসেবে মস্তিষ্ক সংবেদনশীল তথ্য একত্রিত করে এবং শরীরের প্রতিটি ঐচ্ছিক ও অধিকাংশ অনৈচ্ছিক প্রতিক্রিয়া তৈরি করে।",
      },
      commonMisconception: {
        en: "The popular claim that people only use 10% of their brain is false — brain imaging shows virtually all regions have identifiable functions and are active over the course of a day.",
        bn: "মানুষ মস্তিষ্কের মাত্র ১০% ব্যবহার করে — এই প্রচলিত ধারণাটি সঠিক নয়; মস্তিষ্ক ইমেজিং দেখায় যে প্রায় সব অংশেরই নির্দিষ্ট কাজ আছে এবং তা দিনের মধ্যে সক্রিয় থাকে।",
      },
    },
    levelContent: {
      beginner: "The brain is the boss of your body. It helps you think, move, feel and remember things.",
      ssc: "The brain is the main organ of the nervous system, divided into the cerebrum, cerebellum and brainstem, each with distinct functions in thought, coordination and vital control.",
      advanced:
        "Functional regions of the cerebral cortex (e.g. primary motor cortex, primary visual cortex, Broca's and Wernicke's areas) are consistently localized, though most complex behaviors involve distributed networks rather than one isolated area.",
    },
    relatedTermSlugs: ["neuron"],
    relatedOrganSlugs: [],
    quizSlug: undefined,
    educationLevel: ["beginner", "school", "ssc", "advanced"],
    sourceIds: ["openstax-ap2e-nervous-tissue", "openstax-ap2e-ch14-intro", "medlineplus-neurosciences"],
    hasAnimation: false,
  },
  {
    slug: "stomach",
    name: { en: "Stomach", bn: "পাকস্থলী" },
    scientificName: "Gaster / Ventriculus",
    pronunciation: "STUHM-uhk",
    systemId: "digestive",
    layer: "organs",
    summary: {
      en: "A muscular, J-shaped sac that stores food and begins chemical digestion using acid and enzymes.",
      bn: "একটি পেশিবহুল, জে-আকৃতির থলি, যা খাদ্য সংরক্ষণ করে এবং অ্যাসিড ও উৎসেচকের সাহায্যে রাসায়নিক পরিপাক শুরু করে।",
    },
    facts: {
      location: {
        en: "In the upper-left part of the abdomen, just below the diaphragm, between the esophagus and small intestine.",
        bn: "উদরের উপরের-বাম অংশে, মধ্যচ্ছদার (ডায়াফ্রাম) ঠিক নিচে, খাদ্যনালী ও ক্ষুদ্রান্ত্রের মাঝখানে অবস্থিত।",
      },
      structure: {
        en: "A muscular wall of overlapping layers churns food, while the lining contains glands that secrete hydrochloric acid and the enzyme pepsin.",
        bn: "স্তরে স্তরে বিন্যস্ত পেশিবহুল প্রাচীর খাদ্যকে মন্থন করে, এবং এর আবরণে থাকা গ্রন্থি হাইড্রোক্লোরিক অ্যাসিড ও পেপসিন উৎসেচক ক্ষরণ করে।",
      },
      function: {
        en: "Mechanically churns food and chemically breaks down proteins, turning food into a semi-liquid mixture called chyme before it moves to the small intestine.",
        bn: "খাদ্যকে যান্ত্রিকভাবে মন্থন করে এবং প্রোটিন রাসায়নিকভাবে ভেঙে খাদ্যকে অর্ধতরল কাইম-এ পরিণত করে, যা পরে ক্ষুদ্রান্ত্রে প্রবেশ করে।",
      },
      importance: {
        en: "It is a key checkpoint in digestion — its strong acid also kills many ingested pathogens before food continues through the gut.",
        bn: "এটি পরিপাকের একটি গুরুত্বপূর্ণ ধাপ — এর শক্তিশালী অ্যাসিড খাদ্যের সাথে আসা অনেক জীবাণুও ধ্বংস করে।",
      },
    },
    levelContent: {
      beginner: "The stomach is a stretchy bag that mixes and starts breaking down the food you eat.",
      ssc: "The stomach secretes gastric juice (hydrochloric acid and pepsin) to digest proteins and churns food into chyme before releasing it into the small intestine.",
      advanced:
        "Gastric parietal cells secrete HCl and intrinsic factor, chief cells secrete pepsinogen (activated to pepsin by acid), and the process is regulated by neural and hormonal signals including gastrin.",
    },
    relatedTermSlugs: [],
    relatedOrganSlugs: ["liver"],
    quizSlug: undefined,
    educationLevel: ["beginner", "school", "ssc"],
    sourceIds: [],
    hasAnimation: true,
  },
  {
    slug: "liver",
    name: { en: "Liver", bn: "যকৃৎ" },
    scientificName: "Hepar",
    pronunciation: "LIV-er",
    systemId: "digestive",
    layer: "organs",
    summary: {
      en: "The body's largest internal organ, central to metabolism, detoxification and bile production.",
      bn: "শরীরের বৃহত্তম অভ্যন্তরীণ অঙ্গ, যা বিপাক, দেহ থেকে বিষাক্ত পদার্থ অপসারণ এবং পিত্তরস উৎপাদনে কেন্দ্রীয় ভূমিকা পালন করে।",
    },
    facts: {
      location: {
        en: "In the upper-right part of the abdomen, mostly under the protection of the right lower ribs.",
        bn: "উদরের উপরের-ডান অংশে, প্রধানত ডান দিকের নিচের পাঁজরের সুরক্ষায় অবস্থিত।",
      },
      structure: {
        en: "Divided into a larger right lobe and smaller left lobe, made of repeating functional units called lobules, and receiving blood from both the hepatic artery and the portal vein.",
        bn: "একটি বৃহৎ ডান লোব ও ছোট বাম লোবে বিভক্ত, যা লোবিউল নামক পুনরাবৃত্ত কার্যকরী একক দিয়ে গঠিত এবং হেপাটিক ধমনী ও পোর্টাল শিরা উভয় থেকে রক্ত গ্রহণ করে।",
      },
      function: {
        en: "Filters and detoxifies blood, produces bile to help digest fats, stores glucose as glycogen, and synthesizes many blood proteins.",
        bn: "রক্ত পরিশোধন ও বিষমুক্ত করে, চর্বি পরিপাকে সহায়ক পিত্তরস উৎপাদন করে, গ্লুকোজ গ্লাইকোজেন হিসেবে সঞ্চয় করে এবং রক্তের অনেক প্রোটিন তৈরি করে।",
      },
      importance: {
        en: "The liver performs hundreds of metabolic functions and has a notable capacity to regenerate damaged tissue, but sustained damage (e.g. from disease) can be life-threatening.",
        bn: "যকৃৎ শত শত বিপাকীয় কাজ সম্পন্ন করে এবং ক্ষতিগ্রস্ত টিস্যু পুনরুৎপাদনের উল্লেখযোগ্য ক্ষমতা রাখে, তবে দীর্ঘস্থায়ী ক্ষতি (যেমন রোগের কারণে) জীবনের জন্য ঝুঁকিপূর্ণ হতে পারে।",
      },
    },
    levelContent: {
      beginner: "The liver cleans your blood and helps your body use the food you eat.",
      ssc: "The liver produces bile for fat digestion, stores glucose as glycogen, and detoxifies harmful substances absorbed from the digestive tract.",
      advanced:
        "Hepatocytes carry out first-pass metabolism of substances absorbed via the hepatic portal system, and perform biotransformation reactions that convert lipophilic compounds into excretable forms.",
    },
    relatedTermSlugs: [],
    relatedOrganSlugs: ["stomach"],
    quizSlug: undefined,
    educationLevel: ["beginner", "school", "ssc"],
    sourceIds: [],
    hasAnimation: false,
  },
  {
    slug: "kidneys",
    name: { en: "Kidneys", bn: "বৃক্ক" },
    scientificName: "Renes",
    pronunciation: "KID-nees",
    systemId: "urinary",
    layer: "organs",
    summary: {
      en: "A pair of bean-shaped organs that filter blood, remove waste and excess fluid, and produce urine.",
      bn: "শিমের আকৃতির একজোড়া অঙ্গ, যা রক্ত পরিশোধন করে, বর্জ্য ও অতিরিক্ত তরল অপসারণ করে এবং মূত্র উৎপাদন করে।",
    },
    facts: {
      location: {
        en: "Toward the back of the abdominal cavity, one on each side of the spine, roughly at the level of the lowest ribs.",
        bn: "উদরগহ্বরের পেছনের দিকে, মেরুদণ্ডের দুই পাশে একটি করে, প্রায় সর্বনিম্ন পাঁজরের স্তরে অবস্থিত।",
      },
      structure: {
        en: "Each kidney contains roughly one million filtering units called nephrons, each with a filter (glomerulus) and a long tubule that fine-tunes what stays in the blood.",
        bn: "প্রতিটি বৃক্কে প্রায় দশ লক্ষ পরিশোধক একক নেফ্রন থাকে, যার প্রতিটিতে একটি ফিল্টার (গ্লোমেরুলাস) ও একটি দীর্ঘ নালিকা থাকে, যা রক্তে কী থাকবে তা সূক্ষ্মভাবে নিয়ন্ত্রণ করে।",
      },
      function: {
        en: "Filters waste products (like urea) and excess water and salts out of the blood as urine, while helping regulate blood pressure and electrolyte balance.",
        bn: "রক্ত থেকে ইউরিয়ার মতো বর্জ্য পদার্থ ও অতিরিক্ত পানি-লবণ মূত্র আকারে ছেঁকে বের করে, এবং রক্তচাপ ও তড়িৎ-বিশ্লেষ্য (ইলেক্ট্রোলাইট) ভারসাম্য নিয়ন্ত্রণে সহায়তা করে।",
      },
      importance: {
        en: "By continuously filtering the entire blood volume many times a day, the kidneys keep the internal chemical environment of the body stable — a condition called homeostasis.",
        bn: "প্রতিদিন বহুবার সমগ্র রক্তের আয়তন পরিশোধনের মাধ্যমে বৃক্ক শরীরের অভ্যন্তরীণ রাসায়নিক পরিবেশ স্থিতিশীল রাখে, যাকে হোমিওস্ট্যাসিস বলা হয়।",
      },
    },
    levelContent: {
      beginner: "Your kidneys act like filters that clean your blood and make urine.",
      ssc: "Kidneys filter blood through nephrons to remove metabolic waste and regulate water and salt balance, producing urine that travels to the bladder via the ureters.",
      advanced:
        "Filtration at the glomerulus, followed by selective reabsorption and secretion along the nephron tubule, is hormonally regulated (e.g. by ADH and aldosterone) to maintain fluid, electrolyte and acid-base homeostasis.",
    },
    relatedTermSlugs: [],
    relatedOrganSlugs: [],
    quizSlug: undefined,
    educationLevel: ["beginner", "school", "ssc", "advanced"],
    sourceIds: [],
    hasAnimation: true,
  },
];
