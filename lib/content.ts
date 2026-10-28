import type { Copy } from "@/lib/i18n";

/** "Book a demo" goes to the Telegram Agent until a booking page exists. */
export const DEMO_URL = "https://t.me/presale_copyabc_bot";

export const nav: { href: string; label: Copy }[] = [
  { href: "#pain", label: { en: "Why", zh: "痛点" } },
  { href: "#how", label: { en: "How it works", zh: "工作原理" } },
  { href: "#features", label: { en: "Features", zh: "功能" } },
  { href: "#pricing", label: { en: "Pricing", zh: "价格" } },
];

export const demo: Copy = { en: "Book a demo", zh: "预约演示" };

/* ------------------------------------------------------------------ hero */

export const hero = {
  eyebrow: { en: "AI sales team for WhatsApp, Telegram and your website", zh: "WhatsApp · Telegram · 网站的 AI 销售团队" },
  title: { en: "Stop losing customers to slow replies.", zh: "别再因为回复慢​而流失客户。" },
  titleAccent: { en: "Your 24/7 AI sales team is ready.", zh: "你的全天候 AI 销售团队​已就绪。" },
  lede: {
    en: "Wave AI replies to every customer within 30 seconds, follows up on the enquiries that went quiet, and keeps every customer record in your company, not in a salesperson’s phone.",
    zh: "Wave AI 在 30 秒内回复每一位顾客，自动跟进没有下文的询问，并把每一条客户资料留在公司，而不是在销售的手机里。",
  },
  secondary: { en: "See how it works", zh: "看看怎么运作" },
  trust: [
    { en: "English and 中文", zh: "中文与 English" },
    { en: "Trained on your own material", zh: "用你自己的资料训练" },
    { en: "Hands over to a person when needed", zh: "需要时转给真人" },
  ],
};

/** One chat line, in the language the customer used, plus a gloss in the other. */
export type Line = { text: string; lang: "en" | "zh"; gloss: string };
const zh = (text: string, gloss: string): Line => ({ text, lang: "zh", gloss });

export const heroChat = {
  business: { en: "Your property agency", zh: "你的地产公司" },
  channel: "WhatsApp",
  ask: zh("你好，Mont Kiara 那间三房还有吗？", "Hi, is the 3-bedroom in Mont Kiara still available?"),
  answer: zh("还有的。3 房 2 卫，1,450 sq ft，月租 RM 4,800。请问是自住还是投资？", "Yes. 3 bed, 2 bath, 1,450 sq ft, RM 4,800 a month. Is it for your own stay or an investment?"),
  later: zh("我考虑一下。", "Let me think about it."),
  followUp: zh("你好，昨天聊到的 Mont Kiara 三房，这个周末还可以看房。要帮你预留时间吗？", "Hi, about the Mont Kiara 3-bedroom from yesterday: there are viewing slots this weekend. Shall I hold one for you?"),
  yes: zh("好，周六早上可以。", "OK, Saturday morning works."),
  source: { en: "From your listings", zh: "来自你的房源资料" },
  replied: { en: "Replied in 28 s", zh: "28 秒内回复" },
  nextDay: { en: "Next day, 10:00 am · automatic follow-up", zh: "第二天 10:00 am · 自动跟进" },
  booked: { en: "Viewing booked · Sat 11:00 am", zh: "看房已预约 · 周六 11:00 am" },
};

export const chatUi = {
  answeredBy: { en: "Answered by Wave AI", zh: "由 Wave AI 回复" },
};

/* ----------------------------------------------------------------- pain */

export const pain = {
  title: { en: "Where most businesses quietly lose sales", zh: "这些问题，正在悄悄让你流失生意" },
  items: [
    {
      title: { en: "Replies are too slow", zh: "回复太慢" },
      body: {
        en: "Customers ask three businesses at once, and the first to reply usually wins. Enquiries after hours and on weekends wait until the next day.",
        zh: "顾客通常同时问好几家，先回复的那家往往拿下生意。下班后和周末的询问，常常要等到隔天才有人回。",
      },
    },
    {
      title: { en: "Nobody follows up", zh: "忘记跟进" },
      body: {
        en: "A customer says “let me think about it”, and nobody asks again. Many enquiries that didn’t close were never asked a second time.",
        zh: "顾客说“我考虑一下”，之后就再也没人问。很多没成交的询问，不是没兴趣，而是没人再问一次。",
      },
    },
    {
      title: { en: "Customers leave with your salespeople", zh: "销售离职，带走客户资料" },
      body: {
        en: "Customer details and chat history live in each salesperson’s own phone. When they leave, the customers go with them.",
        zh: "客户资料和聊天记录都在销售自己的手机里。人一走，客户也跟着走。",
      },
    },
  ],
};

/* -------------------------------------------------------------- levels */

export const how = {
  title: { en: "From AI customer service to AI sales manager", zh: "从 AI 客服，到 AI 销售经理" },
  lede: {
    en: "Most chatbots stop at level 1: answering questions. Wave AI works all the way to level 4, moving every lead forward and showing you the whole sales picture.",
    zh: "大部分聊天机器人停在第一层：回答问题。Wave AI 一路做到第四层：主动推进每一个商机，并让你看清整个销售过程。",
  },
  service: { en: "AI customer service", zh: "AI 客服" },
  serviceSub: { en: "answers questions", zh: "回答问题" },
  manager: { en: "AI sales manager", zh: "AI 销售经理" },
  managerSub: { en: "moves deals to close", zh: "推进成交" },
  difference: {
    en: "AI customer service answers when someone asks. An AI sales manager keeps pushing until the deal closes.",
    zh: "AI 客服是“有人问才回答”，AI 销售经理是“主动推进，直到成交”。",
  },
  includedIn: { en: "Included in", zh: "包含在" },
  levels: [
    {
      key: "l1",
      name: { en: "Instant answers", zh: "即时回答" },
      body: {
        en: "Answers customers within 30 seconds, around the clock, from your price list, FAQs and product material.",
        zh: "根据你的价目表、FAQ 和产品资料，30 秒内回答顾客，24 小时不休息。",
      },
    },
    {
      key: "l2",
      name: { en: "Understands the need", zh: "了解需求" },
      body: {
        en: "Asks about budget, timing and needs, and separates serious buyers from people just browsing.",
        zh: "主动追问预算、时间和需求，把认真想买的顾客和随便问问的分开。",
      },
    },
    {
      key: "l3",
      name: { en: "Follows up and books", zh: "跟进与预约" },
      body: {
        en: "When a customer goes quiet, it follows up on schedule. When they are ready, it books the appointment for you.",
        zh: "顾客没回复，它会按时跟进；顾客准备好了，它直接帮你约好时间。",
      },
    },
    {
      key: "l4",
      name: { en: "Manages the pipeline", zh: "管理销售进度" },
      body: {
        en: "Tracks where every lead stands, tells your team who to call first today, and keeps all customer data in the company.",
        zh: "追踪每一个商机的进度，告诉团队今天先跟进谁，所有客户资料都留在公司。",
      },
    },
  ],
  l1: {
    q: { en: "How much is the 3-bedroom?", zh: "三房的租金多少？" },
    a: { en: "RM 4,800 a month, with two parking bays.", zh: "月租 RM 4,800，附两个车位。" },
  },
  l2: {
    fields: [
      { k: { en: "Looking for", zh: "需求" }, v: { en: "3-bedroom, own stay", zh: "三房，自住" } },
      { k: { en: "Budget", zh: "预算" }, v: { en: "Up to RM 5,000 / month", zh: "每月 RM 5,000 以内" } },
      { k: { en: "Move-in", zh: "入住时间" }, v: { en: "Next month", zh: "下个月" } },
    ],
    intent: { en: "High intent", zh: "高意向" },
  },
  l3: {
    steps: [
      { day: { en: "Day 0", zh: "第 0 天" }, text: { en: "Enquiry answered", zh: "回答询问" } },
      { day: { en: "Day 1", zh: "第 1 天" }, text: { en: "Follow-up sent", zh: "自动跟进" } },
      { day: { en: "Day 3", zh: "第 3 天" }, text: { en: "Viewing booked", zh: "已约看房" } },
    ],
  },
  l4: {
    columns: [
      { label: { en: "New", zh: "新询问" }, count: 12 },
      { label: { en: "Following up", zh: "跟进中" }, count: 7 },
      { label: { en: "Booked", zh: "已预约" }, count: 4 },
    ],
    today: { en: "Call first today", zh: "今天先跟进" },
    leads: [
      { en: "Mont Kiara 3-bed · viewing Sat", zh: "Mont Kiara 三房 · 周六看房" },
      { en: "Cheras terrace · ready to buy", zh: "Cheras 排屋 · 准备购买" },
    ],
    owned: { en: "Customer data stays with the company", zh: "客户资料留在公司" },
  },
  mock: { en: "Illustrative screen", zh: "界面示意" },
};

/* ------------------------------------------------------------- features */

export const features = {
  title: { en: "Four features, aimed at where sales leak", zh: "四个功能，对准生意流失的地方" },
  items: [
    {
      key: "reply",
      title: { en: "30-second replies", zh: "30 秒回复" },
      body: {
        en: "Every enquiry gets an answer within 30 seconds, including at midnight and on weekends.",
        zh: "每一条询问都在 30 秒内得到回复，包括半夜和周末。",
      },
    },
    {
      key: "follow",
      title: { en: "Automatic follow-up", zh: "自动跟进" },
      body: {
        en: "Reminds customers on the schedule you set, so “let me think about it” no longer means a lost lead.",
        zh: "按你设定的节奏提醒顾客，“我考虑一下”不再等于失去这个商机。",
      },
    },
    {
      key: "channels",
      title: { en: "All channels connected", zh: "多渠道打通" },
      body: {
        en: "WhatsApp, Telegram and website chat land in one inbox, with one record per customer.",
        zh: "WhatsApp、Telegram、网站聊天，全部进同一个收件箱，每位顾客一份资料。",
      },
    },
    {
      key: "reports",
      title: { en: "Reports and analytics", zh: "数据报表分析" },
      body: {
        en: "See enquiry volume, reply speed and conversion every day, and where deals are slipping.",
        zh: "每天看到询问量、回复速度和转化率，知道生意在哪一步流失。",
      },
    },
  ],
};

/* ---------------------------------------------------------------- proof */

export const proof = {
  title: { en: "Results from our customers", zh: "客户的真实成果" },
  placeholder: { en: "Sample · replace with real data", zh: "示例 · 待替换为真实数据" },
  stats: [
    { value: 80, suffix: { en: "%", zh: "%" }, label: { en: "less manual reply work", zh: "节省人工回复工作量" } },
    { value: 2, suffix: { en: "×", zh: "×" }, label: { en: "sales growth", zh: "销量提升" } },
    { value: 30, suffix: { en: " s", zh: " 秒" }, label: { en: "average first reply", zh: "平均首次回复" } },
  ],
  caseSlot: {
    title: { en: "Customer story goes here", zh: "客户案例位置" },
    body: {
      en: "1–3 real customers: name, industry, and one sentence in their own words. Logos if they agree.",
      zh: "放 1–3 个真实客户：名称、行业和一句他们自己说的话。客户同意的话可以放 logo。",
    },
  },
};

/* -------------------------------------------------------------- pricing */

export const pricing = {
  title: { en: "Choose how you want to start", zh: "选择适合你的​开始方式" },
  draft: {
    en: "Draft: prices to be confirmed; channel counts are suggestions.",
    zh: "草稿：价格待确认，渠道数量为建议。",
  },
  perMonth: { en: "/ month", zh: "/ 月" },
  recommended: { en: "Most chosen", zh: "最多人选" },
  levelsLabel: { en: "Levels included", zh: "开通层级" },
  // Each plan unlocks more of the Level 1–4 ladder from the "How it works" section.
  tiers: [
    {
      key: "diy",
      name: { en: "DIY", zh: "DIY 版" },
      pitch: { en: "Set it up yourself", zh: "自己动手设置" },
      levels: 2,
      price: "RM ___",
      fit: { en: "For small teams who want to upload their material and configure it themselves.", zh: "适合想自己上传资料、自己设置的小团队。" },
      items: [
        { en: "AI customer service: instant answers and qualifying questions", zh: "AI 客服：即时回答、了解需求" },
        { en: "You set it up, with our guides and templates", zh: "自己设置，提供教程与模板" },
        { en: "1 channel", zh: "1 个渠道" },
        { en: "Basic reports: enquiries and reply speed", zh: "基础报表：询问量、回复速度" },
        { en: "Chat support", zh: "在线支持" },
      ],
    },
    {
      key: "guided",
      name: { en: "Guided launch", zh: "指导启动版" },
      pitch: { en: "We launch it with you", zh: "我们陪你一起上线" },
      levels: 3,
      price: "RM ___",
      fit: { en: "For businesses that want to go live fast, without figuring it out alone.", zh: "适合想快速上线、不想自己摸索的生意。" },
      items: [
        { en: "Everything in DIY, plus automatic follow-up and booking", zh: "包含 DIY 版，加上自动跟进与预约" },
        { en: "We organise your material, train the AI and test it before launch", zh: "专人整理资料、训练 AI，上线前测试" },
        { en: "Up to 3 channels", zh: "最多 3 个渠道" },
        { en: "Basic reports", zh: "基础报表" },
        { en: "Tuning through the first month", zh: "上线后第一个月持续优化" },
      ],
    },
    {
      key: "custom",
      name: { en: "Custom", zh: "定制版" },
      pitch: { en: "Built around your process", zh: "按你的流程定制" },
      levels: 4,
      price: null,
      fit: { en: "For companies with their own systems, sales process or reporting needs.", zh: "适合有自己系统、销售流程或报表需求的企业。" },
      items: [
        { en: "Everything in Guided launch, plus the AI sales manager", zh: "包含指导启动版，加上 AI 销售经理" },
        { en: "Fully set up around your sales process", zh: "按你的销售流程全程定制" },
        { en: "Unlimited channels", zh: "渠道不限" },
        { en: "Full pipeline and conversion reports", zh: "完整销售进度与转化报表" },
        { en: "CRM and calendar integration (after we verify the API)", zh: "对接 CRM、日历（确认接口后）" },
        { en: "A dedicated contact person", zh: "专属对接人" },
      ],
    },
  ],
  quote: { en: "Contact us for a quote", zh: "联系我们报价" },
};

/* --------------------------------------------------------------- finale */

export const finale = {
  title: { en: "Start your AI lead-capture system today", zh: "今天就开启​你的智能获客系统" },
  sub: {
    en: "We’ll show it live, using the questions your customers actually ask.",
    zh: "用你的顾客真正会问的问题，现场试给你看。",
  },
  footer: { en: "AI sales teams for businesses, from Malaysia", zh: "为中小企业打造的 AI 销售团队，来自马来西亚" },
};
