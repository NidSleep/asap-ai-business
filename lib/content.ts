import type { Copy } from "@/lib/i18n";

/**
 * "Book a demo" should open the client's Calendly page, which books a Zoom
 * demo. Until that link exists it falls back to the Telegram Agent.
 */
export const DEMO_URL = "https://t.me/presale_copyabc_bot";

export const nav: { href: string; label: Copy }[] = [
  { href: "#pain", label: { en: "Why", zh: "痛点" } },
  { href: "#how", label: { en: "How it works", zh: "工作原理" } },
  { href: "#features", label: { en: "Features", zh: "功能" } },
  { href: "#pricing", label: { en: "Pricing", zh: "价格" } },
  { href: "#faq", label: { en: "FAQ", zh: "常见问题" } },
];

export const demo: Copy = { en: "Book a demo", zh: "预约演示" };

/* ------------------------------------------------------------------ hero */

export const hero = {
  eyebrow: { en: "AI sales system for WhatsApp, Messenger and Instagram", zh: "WhatsApp · Messenger · Instagram 的 AI 销售系统" },
  title: { en: "Stop losing customers to slow replies.", zh: "别再因为回复慢​而流失客户。" },
  titleAccent: { en: "Your 24/7 AI sales team is ready.", zh: "你的全天候 AI 销售团队​已就绪。" },
  lede: {
    en: "An AI front-line salesperson replies within 30 seconds, works out what the customer needs, handles objections and follows up on days 1, 3, 5 and 7. An AI back-office manager reviews every chat, finds why leads were lost and reports back.",
    zh: "AI 前线员工 30 秒内回复，识别客户需求、处理异议，并在第 1、3、5、7 天自动跟进；AI 后台经理分析每一段聊天记录，找出流失原因并生成报表。",
  },
  secondary: { en: "See how it works", zh: "看看怎么运作" },
  trust: [
    { en: "Replies in 30 seconds, 24/7", zh: "24/7 · 30 秒内回复" },
    { en: "Not just a chatbot: an AI that sells", zh: "不只是客服，是会主动销售的 AI" },
    { en: "Books the Zoom demo for you", zh: "自动预约 Zoom 演示" },
  ],
};

/** One chat line, in the language the customer used, plus a gloss in the other. */
export type Line = { text: string; lang: "en" | "zh"; gloss: string };
const zh = (text: string, gloss: string): Line => ({ text, lang: "zh", gloss });

/** The client's own sales script: short, split messages with a little emoji. */
export const heroChat = {
  business: { en: "Wave AI", zh: "Wave AI" },
  channel: "WhatsApp",
  hello: zh("你好，我想了解你们的 AI 系统。", "Hi, I’d like to know about your AI system."),
  greet: zh("您好！👋 欢迎了解我们的 AI 销售系统。", "Hi! 👋 Welcome to our AI sales system."),
  diagnose: zh("请问您主要在哪个平台获客？主要是回复慢，还是转化低？", "Which platform do you mainly get customers from? Is the problem slow replies or low conversion?"),
  pain: zh("WhatsApp，总是来不及回复。", "WhatsApp. We can never reply in time."),
  solve: zh("非常理解！我们的系统能在 30 秒内自动回复客户，并且自动跟进。🚀", "Totally understand! Our system replies to customers within 30 seconds and follows up automatically. 🚀"),
  objection: zh("设置会很难吗？", "Is it hard to set up?"),
  reassure: zh("完全不会哦！专家会帮您配置好知识库和流程，您只需要把资料发给我们。", "Not at all! Our experts set up the knowledge base and flows for you. Just send us your material."),
  book: zh("建议安排一个简短的 Zoom 演示，请选择方便的时间 👇", "Let’s set up a short Zoom demo. Pick a time that suits you 👇"),
  pick: { en: "Choose a time", zh: "选择时间" },
  replied: { en: "Replied in 30 s", zh: "30 秒内回复" },
  diagnosed: { en: "Need identified", zh: "识别需求" },
  booked: { en: "Zoom demo booked", zh: "Zoom 演示已预约" },
};

export const chatUi = {
  answeredBy: { en: "Answered by Wave AI", zh: "由 Wave AI 回复" },
};

/* ----------------------------------------------------------------- pain */

export const pain = {
  title: { en: "Where most businesses quietly lose sales", zh: "这些问题，​正在悄悄​让你流失生意" },
  items: [
    {
      title: { en: "Replies are too slow", zh: "回复太慢" },
      body: {
        en: "Customers ask several businesses at once, and the first to reply usually wins. Enquiries after hours and on weekends wait until the next day.",
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
    en: "Most chatbots stop at level 1 or 2: they answer when asked. Wave AI works at levels 3 and 4, selling on its own and reviewing the results.",
    zh: "大部分聊天机器人停在第 1、2 层：有人问才回答。Wave AI 做到第 3、4 层：主动销售，并复盘结果。",
  },
  service: { en: "Typical chatbots", zh: "一般聊天机器人" },
  serviceSub: { en: "answer when asked", zh: "被动回答" },
  manager: { en: "Wave AI", zh: "Wave AI" },
  managerSub: { en: "sells on its own", zh: "主动销售" },
  difference: {
    en: "AI customer service answers when someone asks. An AI sales team keeps pushing until the deal closes.",
    zh: "AI 客服是“有人问才回答”，AI 销售团队是“主动推进，直到成交”。",
  },
  levels: [
    {
      key: "l1",
      name: { en: "Traditional bot", zh: "传统机器人" },
      body: {
        en: "Fixed menus and keywords. Anything outside the script gets “Sorry, I don’t understand”.",
        zh: "固定菜单和关键词。客户问的超出脚本，就只能回答“抱歉，我不明白”。",
      },
    },
    {
      key: "l2",
      name: { en: "Basic AI Q&A", zh: "基础 AI 问答" },
      body: {
        en: "Understands questions and answers them, but stops there. It never follows up or moves the customer toward buying.",
        zh: "听得懂问题、也能回答，但就到此为止，不会跟进，也不会推动客户购买。",
      },
    },
    {
      key: "l3",
      name: { en: "AI salesperson", zh: "AI 销售员工" },
      body: {
        en: "Identifies what the customer needs, handles objections, follows up on days 1, 3, 5 and 7, and pushes for the sale or a booking.",
        zh: "识别客户需求、处理异议，在第 1、3、5、7 天主动跟进，并促单或预约。",
      },
    },
    {
      key: "l4",
      name: { en: "AI sales manager", zh: "AI 销售经理" },
      body: {
        en: "Reviews every conversation, finds where and why leads were lost, and turns it into reports so the whole system keeps improving.",
        zh: "分析每一段聊天记录，找出客户在哪里、为什么流失，生成报表，让整个系统持续优化。",
      },
    },
  ],
  l1: {
    menu: { en: "Reply 1 for prices · 2 for location · 3 for a human", zh: "回复 1 查看价格 · 2 查看地址 · 3 转人工" },
    q: { en: "Can I book for Saturday?", zh: "星期六可以预约吗？" },
    a: { en: "Sorry, I don’t understand. Please reply 1, 2 or 3.", zh: "抱歉，我不明白。请回复 1、2 或 3。" },
  },
  l2: {
    q: { en: "How much is the package?", zh: "配套多少钱？" },
    a: { en: "The package is RM 500 a month. Anything else?", zh: "配套是每月 RM 500。还有其他问题吗？" },
    end: { en: "…and the conversation ends there.", zh: "……然后对话就停在这里。" },
  },
  l3: {
    steps: [
      { day: { en: "Day 1", zh: "第 1 天" }, text: { en: "Follow-up with a relevant case", zh: "跟进，附上相关案例" } },
      { day: { en: "Day 3", zh: "第 3 天" }, text: { en: "Answers the price objection", zh: "处理价格异议" } },
      { day: { en: "Day 5", zh: "第 5 天" }, text: { en: "Offers a demo slot", zh: "提供演示时段" } },
      { day: { en: "Day 7", zh: "第 7 天" }, text: { en: "Booked", zh: "已预约" } },
    ],
  },
  l4: {
    reportTitle: { en: "Why leads were lost this week", zh: "本周客户流失原因" },
    reasons: [
      { label: { en: "Price concerns", zh: "价格疑虑" }, share: 0.42 },
      { label: { en: "No reply after hours", zh: "下班后没回复" }, share: 0.31 },
      { label: { en: "Chose a competitor", zh: "选择了竞争对手" }, share: 0.18 },
    ],
    action: { en: "Suggested fix: send the case study on day 1", zh: "建议：第 1 天就发送客户案例" },
  },
  mock: { en: "Illustrative screen", zh: "界面示意" },
};

/* ------------------------------------------------------------- features */

export const features = {
  title: { en: "Four features, aimed at where sales leak", zh: "四个功能，​对准生意​流失的地方" },
  items: [
    {
      key: "reply",
      title: { en: "30-second replies", zh: "30 秒回复" },
      body: {
        en: "Every enquiry is answered within 30 seconds, 24/7, so no customer waits for a human to come online.",
        zh: "每一条询问都在 30 秒内回复，24/7 全天候，消除人工回复的延迟。",
      },
    },
    {
      key: "follow",
      title: { en: "Automatic follow-up", zh: "自动跟进" },
      body: {
        en: "Follows up on days 1, 3, 5 and 7 and handles scheduling, so “let me think about it” no longer means a lost lead.",
        zh: "第 1、3、5、7 天自动跟进，自动处理排期，“我考虑一下”不再等于失去这个客户。",
      },
    },
    {
      key: "channels",
      title: { en: "Every channel connected", zh: "多渠道打通" },
      body: {
        en: "WhatsApp, Messenger and Instagram, including the WhatsApp Business API, all answered by the same AI.",
        zh: "WhatsApp、Messenger、Instagram，包括 WhatsApp Business API，全部由同一个 AI 回复。",
      },
    },
    {
      key: "reports",
      title: { en: "Reports and analytics", zh: "数据报表分析" },
      body: {
        en: "The AI manager analyses chat history, shows why customers dropped off and reports what to fix.",
        zh: "AI 经理分析聊天记录，找出客户流失的原因，并生成报表告诉你该改什么。",
      },
    },
  ],
};

/* ---------------------------------------------------------------- proof */

export const proof = {
  title: { en: "Results from our customers", zh: "客户的真实成果" },
  stats: [
    { value: 85, suffix: { en: "%", zh: "%" }, label: { en: "lead diagnosis accuracy", zh: "线索精准诊断" } },
    { value: 80, suffix: { en: "%", zh: "%" }, label: { en: "less manual work", zh: "节省工作量" } },
    { value: 2, suffix: { en: "×", zh: "×" }, label: { en: "more bookings for an aesthetics clinic", zh: "某医美诊所预约量提升" } },
  ],
  caseSlot: {
    title: { en: "Customer story and dashboard screenshot", zh: "客户案例与后台截图" },
    body: {
      en: "Space for the aesthetics clinic case and a screenshot of the AI manager’s dashboard.",
      zh: "这里放医美诊所的案例，以及 AI 经理后台报表的截图。",
    },
  },
};

/* -------------------------------------------------------------- pricing */

export const pricing = {
  title: { en: "Choose how you want to start", zh: "选择适合你的​开始方式" },
  note: { en: "Reference prices. Final quote confirmed by our team.", zh: "参考价格，以最终报价为准。" },
  recommended: { en: "Recommended", zh: "推荐" },
  tiers: [
    {
      key: "diy",
      name: { en: "DIY", zh: "自助版" },
      pitch: { en: "Set it up yourself", zh: "自己动手设置" },
      price: "RM 500",
      period: { en: "/ month", zh: "/ 月" },
      fit: { en: "For teams who want to start quickly on their own.", zh: "适合想自己快速开始的团队。" },
      items: [
        { en: "Basic AI salesperson", zh: "基础 AI 员工" },
        { en: "A monthly allowance of credits", zh: "包含一定额度的积分" },
        { en: "Self-service setup", zh: "自助设置" },
      ],
    },
    {
      key: "guided",
      name: { en: "Guided Launch", zh: "指导启动版" },
      pitch: { en: "Our experts launch it with you", zh: "专家陪你一起上线" },
      price: "RM 6,000",
      period: { en: "/ year", zh: "/ 年" },
      fit: { en: "For businesses that want it set up properly from day one.", zh: "适合希望一开始就设置到位的生意。" },
      items: [
        { en: "One-to-one expert setup", zh: "专家一对一辅助搭建" },
        { en: "Testing and fine-tuning", zh: "调试与优化" },
        { en: "Team training", zh: "团队培训" },
      ],
    },
    {
      key: "enterprise",
      name: { en: "Enterprise", zh: "企业定制版" },
      pitch: { en: "Built around your organisation", zh: "按你的企业定制" },
      price: null,
      period: null,
      fit: { en: "For companies with several departments and their own systems.", zh: "适合多部门、有自己系统的企业。" },
      items: [
        { en: "Multi-department collaboration", zh: "多部门协同" },
        { en: "Complex workflows", zh: "复杂工作流" },
        { en: "Deep CRM integration", zh: "深度 CRM 整合" },
      ],
    },
  ],
  quote: { en: "Custom quote", zh: "按需报价" },
};

/* ------------------------------------------------------------------ faq */

export const faq = {
  title: { en: "Questions businesses ask us", zh: "客户常问的问题" },
  items: [
    {
      id: "replace",
      q: { en: "Will AI replace my sales team?", zh: "AI 会取代我的销售团队吗？" },
      a: {
        en: "No. The AI handles the tedious first screening, follow-up and questions, so your sales team can focus on high-intent customers and complex negotiations.",
        zh: "不会。AI 负责处理繁琐的初筛、跟进和答疑，让您的销售团队专注于转化高意向客户和复杂谈判。",
      },
    },
    {
      id: "robotic",
      q: { en: "Will customers feel they’re talking to a cold machine?", zh: "客户会不会觉得在跟冷冰冰的机器聊天？" },
      a: {
        en: "Our AI is trained on sales conversations, so its tone is natural and warm. It sends short messages one at a time like a real person and responds to context.",
        zh: "我们的 AI 经过专门的话术训练，语气自然亲切，能像真人一样分段发消息，并结合上下文互动。",
      },
    },
    {
      id: "whatsapp",
      q: { en: "Can it connect to our existing WhatsApp?", zh: "可以对接我们现有的 WhatsApp 吗？" },
      a: {
        en: "Yes. It connects to the WhatsApp Business API and other major social platforms.",
        zh: "完全可以，无缝对接 WhatsApp Business API 以及其他主流社交平台。",
      },
    },
    {
      id: "material",
      q: { en: "What do you need from us to set it up?", zh: "设置需要我们提供什么资料？" },
      a: {
        en: "Real past sales chats (to learn your best salespeople’s wording), product PDFs, your website, and your refund and after-sales SOP.",
        zh: "历史真实销售聊天记录（用来提取销冠话术）、产品 PDF 介绍手册、公司官方网站链接，以及退款与售后 SOP。",
      },
    },
  ],
};

/* --------------------------------------------------------------- finale */

export const finale = {
  title: { en: "Start your AI lead-capture system today", zh: "今天就开启​你的智能获客系统" },
  sub: {
    en: "Book a short Zoom demo and see how the AI would handle your customers.",
    zh: "预约一个简短的 Zoom 演示，看看 AI 怎么帮到你的生意。",
  },
  footer: { en: "AI sales systems for businesses, from Malaysia", zh: "为企业打造的 AI 销售系统，来自马来西亚" },
};
