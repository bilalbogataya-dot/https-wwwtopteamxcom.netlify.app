/**
 * TOPTEAM Global Configuration & Visual Customization Engine
 * ==========================================================
 * يدعم الثيمات، الخطوط، بطاقة التليجرام الرسمية، ومربعات المحتوى المخصصة.
 */

const TOPTEAM_CONFIG = {
  // اسم وهوية العلامة
  brand: {
    name: "TOPTEAM",
    tagline: "Crypto & Blockchain Ecosystem",
    establishedYear: 2011,
    yearsOfExperience: 13,
    customLogoUrl: "", // ضع رابط الشعار المخصص أو اتركه فارغاً للافتراضي
    customFaviconUrl: "",
  },

  // الثيم والمظهر العام للموقع (Themes & Fonts)
  appearance: {
    theme: "gold",     // 'gold' (ذهبي فاخر) | 'cyber' (سايبر نيون) | 'emerald' (زمرد أخضر) | 'purple' (بنفسجي ملكي) | 'crimson' (أحمر ناري)
    font: "cairo",     // 'cairo' | 'tajawal' | 'ibm' (IBM Plex) | 'almarai' | 'readex' (Readex Pro)
  },

  // مفاتيح التحكم في إظهار وإخفاء الأقسام والعناصر (Toggles)
  visibility: {
    showTelegramCard: true,        // بطاقة قناة التليجرام الرسمية (مكان الإيميل)
    showWhatsAppCard: true,        // بطاقة الواتساب في قسم تواصل معنا
    showWhatsAppFloating: true,    // زر الواتساب العائم
    showSocialCard: true,          // بطاقة مجتمعاتنا الرقمية
    showLanguageSwitcher: true,    // مبدل اللغات (AR, EN, FR, ES)
    showLiveBtcSection: true,      // قسم مؤشرات البيتكوين الحية
    showProjectsSection: true,     // قسم المشاريع التي نتابعها
    showPackagesSection: true,     // قسم باقات التعدين الـ 5
    showHashNetSection: true,      // قسم مشروع HashNet المتكامل
    showEduSection: true,          // قسم الدليل والمفاهيم التعليمية
    showCoinsSection: true,        // قسم العملات الـ 6 المدعومة
  },

  // روابط الإحالة والتسجيل الرسمية لـ TOPTEAM
  referral: {
    // زر ابدأ تعدين البيتكوين الرئيسي (Hero & Navbar)
    startMiningUrl: "https://app.hashnet.ai/Topteam2",
    // زر سجل الآن في قسم HashNet
    hashnetRegisterUrl: "https://app.hashnet.ai/Topteam2",
    // روابط باقات التعدين الـ 5
    packages: {
      plan150: "https://app.hashnet.ai/Topteam2",
      plan500: "https://app.hashnet.ai/Topteam2",
      plan1000: "https://app.hashnet.ai/Topteam2",
      plan2500: "https://app.hashnet.ai/Topteam2",
      plan5000: "https://app.hashnet.ai/Topteam2",
    }
  },

  // تفاصيل باقات HashNet
  miningPackagesList: [
    {
      id: "plan150",
      price: 150,
      currency: "$",
      titleKey: "packages.plan150Title",
      hashpower: "5 TH/s",
      badge: "packages.starterBadge",
      popular: false,
      features: [
        "packages.feature1",
        "packages.feature2",
        "packages.feature3",
        "packages.featureSupport"
      ]
    },
    {
      id: "plan500",
      price: 500,
      currency: "$",
      titleKey: "packages.plan500Title",
      hashpower: "18 TH/s",
      badge: "packages.standardBadge",
      popular: false,
      features: [
        "packages.feature1",
        "packages.feature2",
        "packages.feature3",
        "packages.featureSupport"
      ]
    },
    {
      id: "plan1000",
      price: 1000,
      currency: "$",
      titleKey: "packages.plan1000Title",
      hashpower: "40 TH/s",
      badge: "packages.popularBadge",
      popular: true,
      features: [
        "packages.feature1",
        "packages.feature2",
        "packages.feature3",
        "packages.featurePrioritySupport"
      ]
    },
    {
      id: "plan2500",
      price: 2500,
      currency: "$",
      titleKey: "packages.plan2500Title",
      hashpower: "110 TH/s",
      badge: "packages.proBadge",
      popular: false,
      features: [
        "packages.feature1",
        "packages.feature2",
        "packages.feature3",
        "packages.featureVipSupport"
      ]
    },
    {
      id: "plan5000",
      price: 5000,
      currency: "$",
      titleKey: "packages.plan5000Title",
      hashpower: "250 TH/s",
      badge: "packages.eliteBadge",
      popular: false,
      features: [
        "packages.feature1",
        "packages.feature2",
        "packages.feature3",
        "packages.featureDedicatedManager"
      ]
    }
  ],

  // المشاريع والمربعات التي نتابعها
  followedProjects: [
    {
      id: "hashnet",
      name: "HashNet Ecosystem",
      tag: "Cloud Mining & Hashpower Infrastructure",
      descAr: "منظومة بنية تحتية رائدة لتعدين العملات الرقمية وتوفير قوة الهاش بكفاءة طاقية عالية وتقنيات تبريد حديثة.",
      descEn: "Leading mining infrastructure ecosystem providing high hashpower and energy-efficient data center operations.",
      status: "Active / Recommended",
      link: "https://app.hashnet.ai/Topteam2",
      icon: "hashnet"
    },
    {
      id: "kaspa-network",
      name: "Kaspa BlockDAG",
      tag: "Next-Gen Proof of Work",
      descAr: "بروتوكول البلوك-داغ الأسرع في معالجة المعاملات والتعدين اللامركزي الفائق السرعة.",
      descEn: "Ultra-fast BlockDAG protocol revolutionizing proof-of-work transaction speeds and decentralization.",
      status: "Tracking / Mining Active",
      link: "https://kaspa.org",
      icon: "kaspa"
    },
    {
      id: "bitcoin-layer2",
      name: "Bitcoin Lightning & Mining Farms",
      tag: "Global Infrastructure",
      descAr: "تطوير حلول الطبقة الثانية لشبكة البيتكوين وتوسيع مزارع التعدين بالطاقة النظيفة.",
      descEn: "Scaling Bitcoin Layer 2 solutions and clean energy mining farm deployments.",
      status: "Research & Development",
      link: "https://bitcoin.org",
      icon: "bitcoin"
    }
  ],

  // بطاقات ومربعات إضافية مخصصة ينشئها المستخدم
  customCards: [],

  // إعدادات رابط واتساب والتواصل المباشر
  whatsapp: {
    directUrl: "https://wa.me/message/GE2RCRNCROKWL1",
    phoneNumber: "GE2RCRNCROKWL1",
    defaultMessage: "مرحباً TOPTEAM، أود الاستفسار عن تفاصيل تعدين العملات الرقمية ومشروع HashNet.",
    getLink: function() {
      return this.directUrl || `https://wa.me/${this.phoneNumber}`;
    }
  },

  // شبكات التواصل الاجتماعي الموسعة
  social: {
    telegram: "https://t.me/Hash1Net",
    twitter: "https://x.com/TOPTEAM_Crypto",
    youtube: "https://youtube.com/@TOPTEAM_Crypto",
    tiktok: "",
    discord: "",
    facebook: "",
    instagram: "https://instagram.com/TOPTEAM_Crypto",
    linkedin: ""
  },

  // إعدادات واجهة البيانات الحية للبيتكوين
  cryptoApi: {
    provider: "coingecko",
    endpoint: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,litecoin,dogecoin,kaspa,zcash,bitcoin-cash&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_market_cap=true",
    refreshIntervalMs: 30000
  }
};

window.TOPTEAM_CONFIG = TOPTEAM_CONFIG;
