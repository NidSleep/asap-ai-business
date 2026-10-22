import type { Copy } from "@/lib/i18n";

export const AGENT_URL = "https://t.me/presale_copyabc_bot";

// Only these keys are accepted by the bot's /start handler.
export type DiagnosticKey =
  | "slow_reply"
  | "follow_up"
  | "qualification"
  | "booking"
  | "visibility";

export const nav: { href: string; label: Copy }[] = [
  { href: "#how", label: { en: "How it works", zh: "运作方式" } },
  { href: "#difference", label: { en: "Why Wave AI", zh: "为什么选择 Wave AI" } },
  { href: "#diagnostic", label: { en: "Lead check", zh: "询问检查" } },
  { href: "#faq", label: { en: "FAQ", zh: "常见问题" } },
];

export const hero = {
  badge: { en: "AI chatbot platform for businesses", zh: "为中小企业打造的 AI 聊天机器人平台" },
  title: {
    en: "Customers message at 11pm. Your team wakes up to a ready lead.",
    zh: "顾客半夜发来询问，团队早上收到整理好的商机。",
  },
  lede: {
    en: "Train Wave AI on your own FAQs, price lists and documents. It answers customers on WhatsApp, Telegram or your website in English or Chinese, and hands over to your team when a person should step in.",
    zh: "用你自己的 FAQ、价目表和文件训练 Wave AI。它在 WhatsApp、Telegram 或网站上用中文或英文回答顾客，需要真人时就转给你的团队。",
  },
  cta: { en: "Talk to the Agent", zh: "咨询 Agent" },
  secondary: { en: "See how it works", zh: "看看怎么运作" },
  pick: { en: "Same platform, any business:", zh: "同一个平台，任何生意：" },
  note: {
    en: "Illustrative conversations, not real customers. Prices, times and names are placeholders.",
    zh: "对话为示意，并非真实顾客。价格、时间和名称仅为示例。",
  },
};

/** One chat line, in the language the customer used, plus a gloss in the other. */
export type Line = { text: string; lang: "en" | "zh"; gloss: string };

const zh = (text: string, gloss: string): Line => ({ text, lang: "zh", gloss });
const en = (text: string, gloss: string): Line => ({ text, lang: "en", gloss });

export type Story = {
  key: string;
  tab: Copy;
  business: Copy;
  channel: string;
  enquiry: Copy;
  source: Copy;
  ask: Line;
  answer: Line;
  follow: Line;
  reply: Line;
  offer: Line;
  slots: string[];
  /** Index of the slot the customer taps. */
  slotPick: number;
  confirmQ: Line;
  confirm: [string, string];
  booked: Copy;
  handoff: Copy;
  morning: { id: string; title: Copy; description: Copy; meta: string }[];
};

export const stories: Story[] = [
  {
    key: "salon",
    tab: { en: "Beauty salon", zh: "美容院" },
    business: { en: "Your beauty salon", zh: "你的美容院" },
    channel: "WhatsApp",
    enquiry: { en: "Hydrating facial · WhatsApp", zh: "补水护理 · WhatsApp" },
    source: { en: "From your price list", zh: "来自你的价目表" },
    ask: en("Hi! How much is the hydrating facial? Any slot this Saturday?", "你好！补水护理多少钱？这个星期六有空位吗？"),
    answer: en("The Hydrating Facial is RM 168 for 60 minutes. Saturday has 11:00 am or 3:30 pm open.", "补水护理 60 分钟 RM 168。星期六有 11:00 am 或 3:30 pm。"),
    follow: en("3:30 pls. Can I use my prepaid package?", "3:30 吧。可以用我的预付配套吗？"),
    reply: en("I’ll ask the team to check your package balance, so I won’t guess. Shall I book the slot first?", "配套余额我会请团队查看，不乱回答。要先帮你订时段吗？"),
    offer: en("Saturday slots:", "星期六的时段："),
    slots: ["Sat 11:00 am", "Sat 3:30 pm"],
    slotPick: 1,
    confirmQ: en("To confirm: Hydrating Facial, Sat 3:30 pm, under this number. Book it?", "确认：补水护理，周六 3:30 pm，用这个号码登记。要预约吗？"),
    confirm: ["Book it", "Change"],
    booked: { en: "Booked · Sat 3:30 pm", zh: "已预约 · 周六 3:30 pm" },
    handoff: { en: "Package question → your team", zh: "配套问题 → 已转给团队" },
    morning: [
      { id: "facial", title: { en: "Hydrating facial · booked", zh: "补水护理 · 已预约" }, description: { en: "Sat 3:30 pm · check package balance", zh: "周六 3:30 pm · 待查配套余额" }, meta: "11:07 pm" },
      { id: "bridal", title: { en: "Bridal makeup · wants a quote", zh: "新娘化妆 · 想要报价" }, description: { en: "Needs a quote from your team", zh: "需要团队报价" }, meta: "10:21 pm" },
      { id: "brow", title: { en: "Brow embroidery · comparing", zh: "绣眉 · 正在比较" }, description: { en: "Wave AI follows up at 10 am", zh: "Wave AI 早上 10 点跟进" }, meta: "9:40 pm" },
    ],
  },
  {
    key: "property",
    tab: { en: "Property agency", zh: "地产中介" },
    business: { en: "Your property agency", zh: "你的地产公司" },
    channel: "Telegram",
    enquiry: { en: "Viewing request · Mont Kiara", zh: "看房询问 · Mont Kiara" },
    source: { en: "From your listings", zh: "来自你的房源资料" },
    ask: zh("你好，Mont Kiara 那间三房还有吗？", "Hi, is the 3-bedroom in Mont Kiara still available?"),
    answer: zh("还有的。3 房 2 卫，1,450 sq ft，月租 RM 4,800，附两个车位。", "Yes. 3 bed, 2 bath, 1,450 sq ft, RM 4,800 a month, with two parking bays."),
    follow: zh("自住的。价钱可以再谈吗？", "It’s for us to live in. Is the price negotiable?"),
    reply: zh("价钱要由经纪人跟屋主确认，我不乱答应。先帮你安排看房，好吗？", "Your agent has to confirm price with the owner, so I won’t promise anything. Shall I arrange a viewing first?"),
    offer: zh("这个周末可以看房的时间：", "Viewing times this weekend:"),
    slots: ["周六 11:00 am", "周日 2:00 pm"],
    slotPick: 0,
    confirmQ: zh("帮你确认：Mont Kiara 三房，周六 11:00 am 看房，经纪人会用这个号码联系你。确认吗？", "To confirm: Mont Kiara 3-bedroom, viewing Sat 11:00 am; your agent will contact you on this number. Confirm?"),
    confirm: ["确认", "修改"],
    booked: { en: "Viewing booked · Sat 11:00 am", zh: "看房已预约 · 周六 11:00 am" },
    handoff: { en: "Price question → your agent", zh: "议价问题 → 已转给经纪人" },
    morning: [
      { id: "mk", title: { en: "Mont Kiara 3-bed · viewing", zh: "Mont Kiara 三房 · 已约看房" }, description: { en: "Sat 11 am · owner to confirm price", zh: "周六 11 am · 待屋主确认价格" }, meta: "11:07 pm" },
      { id: "bangsar", title: { en: "Bangsar studio · video tour", zh: "Bangsar 单间 · 想看视频" }, description: { en: "Needs your agent to send one", zh: "需要经纪人发送" }, meta: "10:02 pm" },
      { id: "cheras", title: { en: "Cheras terrace · to buy", zh: "Cheras 排屋 · 想买" }, description: { en: "Wave AI follows up at 10 am", zh: "Wave AI 早上 10 点跟进" }, meta: "8:15 pm" },
    ],
  },
  {
    key: "tuition",
    tab: { en: "Tuition centre", zh: "补习中心" },
    business: { en: "Your tuition centre", zh: "你的补习中心" },
    channel: "Website chat",
    enquiry: { en: "P5 Maths · Website", zh: "小五数学 · 网站" },
    source: { en: "From your class timetable", zh: "来自你的课程表" },
    ask: zh("你好，请问有小五数学班吗？", "Hi, do you have P5 maths classes?"),
    answer: zh("有的，小五数学在星期六上课。孩子现在数学大概什么程度？", "Yes, P5 maths runs on Saturdays. Roughly what level is your child at now?"),
    follow: zh("中等，应用题比较弱。学费多少？", "Average, weaker at word problems. How much are the fees?"),
    reply: zh("学费会由中心直接跟你确认，我不随便报价。先安排一堂试听，好吗？", "The centre will confirm fees with you directly, so I won’t guess. Shall I book a trial class first?"),
    offer: zh("这个星期六有两个时段：", "Two slots this Saturday:"),
    slots: ["周六 10:00 am", "周六 2:30 pm"],
    slotPick: 0,
    confirmQ: zh("帮你确认：小五数学试听，星期六上午 10:00，联系方式用这个号码。确认提交吗？", "To confirm: P5 maths trial, Saturday 10:00 am, contact on this number. Shall I submit it?"),
    confirm: ["确认提交", "修改"],
    booked: { en: "Trial booked · Sat 10:00 am", zh: "试听已预约 · 周六 10:00 am" },
    handoff: { en: "Fees question → the centre", zh: "学费问题 → 已转给中心" },
    morning: [
      { id: "p5", title: { en: "P5 Maths · trial booked", zh: "小五数学 · 已约试听" }, description: { en: "Sat 10:00 am · confirm fees", zh: "周六 10:00 am · 待确认学费" }, meta: "11:07 pm" },
      { id: "s2", title: { en: "Sec 2 Science · asked fees", zh: "中二科学 · 询问学费" }, description: { en: "Needs a price from your team", zh: "需要团队提供价格" }, meta: "9:52 pm" },
      { id: "p3", title: { en: "P3 English · choosing a slot", zh: "小三英文 · 正在选时段" }, description: { en: "Wave AI follows up at 10 am", zh: "Wave AI 早上 10 点跟进" }, meta: "8:15 pm" },
    ],
  },
];

export const phones: { label: Copy; time: string }[] = [
  { label: { en: "Answers from your data", zh: "用你的资料回答" }, time: "11:04" },
  { label: { en: "Qualifies the lead", zh: "了解需求" }, time: "11:05" },
  { label: { en: "Books, or hands over", zh: "预约，或转真人" }, time: "11:07" },
  { label: { en: "Your team’s morning", zh: "团队的早上" }, time: "8:00" },
];

export const chatUi = {
  answeredBy: { en: "Answered by Wave AI", zh: "由 Wave AI 回复" },
  newEnquiry: { en: "New enquiry", zh: "新询问" },
  overnight: { en: "Overnight", zh: "昨晚" },
  swipe: { en: "Swipe a row to act on it", zh: "滑动一行即可处理" },
  call: { en: "Call", zh: "致电" },
  done: { en: "Done", zh: "完成" },
  later: { en: "Later", zh: "稍后" },
};

/* ------------------------------------------------------------- how it works */

export const how = {
  title: { en: "Set up once. It works every night after.", zh: "设置一次，之后每晚都在工作。" },
  lede: {
    en: "No scripts or decision trees to maintain. Give Wave AI what your staff already know, connect the channels your customers use, and decide when a person takes over.",
    zh: "不需要写脚本或维护流程图。把员工已经知道的资料交给 Wave AI，接上顾客常用的渠道，再决定什么时候由真人接手。",
  },
  steps: [
    { key: "train", label: { en: "Train", zh: "训练" } },
    { key: "connect", label: { en: "Connect", zh: "接入" } },
    { key: "answer", label: { en: "Answer", zh: "回答" } },
    { key: "handoff", label: { en: "Hand over", zh: "转给团队" } },
  ],
  train: {
    title: { en: "Train it on your own material", zh: "用你自己的资料训练" },
    body: {
      en: "Upload the documents your staff already use. Wave AI answers from them, and says so when something isn’t covered instead of making it up.",
      zh: "上传员工平时用的文件。Wave AI 根据这些资料回答；资料里没有的，它会直接说明，不会编造。",
    },
    sources: [
      { en: "FAQ", zh: "常见问题" },
      { en: "Price list", zh: "价目表" },
      { en: "Product and service sheets", zh: "产品与服务介绍" },
      { en: "Policies: refunds, deposits, cancellations", zh: "条款：退款、订金、取消" },
    ],
    ready: { en: "Ready to answer", zh: "可以回答" },
    missing: { en: "Not in your material → asks your team", zh: "资料里没有 → 询问团队" },
  },
  connect: {
    title: { en: "Connect the channels customers already use", zh: "接上顾客已经在用的渠道" },
    body: {
      en: "One assistant, one knowledge base, one inbox, across every channel. Customers keep messaging the way they do today.",
      zh: "同一个助手、同一份资料、同一个收件箱，覆盖所有渠道。顾客照旧用习惯的方式发消息。",
    },
    channels: [
      { name: "WhatsApp", detail: { en: "Your business number", zh: "你的商业号码" } },
      { name: "Telegram", detail: { en: "Your business bot", zh: "你的商业 bot" } },
      { name: "Website chat", detail: { en: "One line of code on your site", zh: "在网站加一段代码" } },
    ],
    connected: { en: "Connected", zh: "已连接" },
    crm: {
      en: "Calendar and CRM are connected only after we verify a secure API, webhook or supported integration, and agree what Wave AI may read or change.",
      zh: "日历与 CRM 只在确认安全的 API、Webhook 或受支持的整合方式，并约定可读取或修改的范围后才会连接。",
    },
  },
  answer: {
    title: { en: "It answers, asks, and moves the lead forward", zh: "它会回答、追问，并推进商机" },
    body: {
      en: "Here is one full enquiry, with what Wave AI is doing at each turn.",
      zh: "以下是一个完整的询问，并标注 Wave AI 每一步在做什么。",
    },
    notes: {
      language: { en: "Replies in the language the customer writes in.", zh: "用顾客使用的语言回复。" },
      source: { en: "Answers from your listings, not from guesswork.", zh: "根据你的房源资料回答，不靠猜。" },
      noPromise: { en: "Won’t promise a price. Passes it to your agent and keeps going.", zh: "不乱答应价格，转给经纪人，然后继续推进。" },
      confirm: { en: "Confirms the details before anything is submitted.", zh: "提交前先让顾客确认资料。" },
      book: { en: "Books the viewing and writes the brief for your team.", zh: "完成预约，并为团队写好摘要。" },
    },
  },
  handoff: {
    title: { en: "Your team gets a brief, not a chat log", zh: "团队收到的是摘要，不是聊天记录" },
    body: {
      en: "Every conversation lands in your dashboard with what the customer wants, what is still open and what to do next. Anyone on your team can take over the chat.",
      zh: "每段对话都会进入后台，写清楚顾客要什么、还有什么待处理、下一步做什么。团队任何人都可以接手对话。",
    },
  },
  tryIt: { en: "Try a conversation in Telegram", zh: "在 Telegram 试一段对话" },
};

export const brief = {
  from: { en: "Wave AI · to your agent", zh: "Wave AI · 发给经纪人" },
  title: { en: "New viewing request", zh: "新看房预约" },
  rows: [
    { k: { en: "Listing", zh: "房源" }, v: { en: "Mont Kiara, 3-bedroom, for rent", zh: "Mont Kiara 三房，出租" } },
    { k: { en: "Customer", zh: "顾客" }, v: { en: "Own stay", zh: "自住" } },
    { k: { en: "Viewing", zh: "看房" }, v: { en: "Saturday, 11:00 am", zh: "星期六上午 11:00" } },
    { k: { en: "Language", zh: "语言" }, v: { en: "Chinese", zh: "中文" } },
    { k: { en: "Channel", zh: "渠道" }, v: { en: "Telegram", zh: "Telegram" } },
    { k: { en: "Open question", zh: "待处理问题" }, v: { en: "Price, for the owner to confirm", zh: "价格，待屋主确认" } },
  ],
  nextLabel: { en: "Next action", zh: "下一步" },
  next: { en: "Ask the owner about price before Saturday", zh: "星期六前向屋主确认价格" },
  status: { en: "Submitted only after the customer confirmed", zh: "顾客确认后才提交" },
};

export const difference = {
  title: { en: "Answering a question is not the same as moving a lead forward.", zh: "回答问题，不等于推进商机。" },
  lede: {
    en: "Wave AI keeps track of what the customer has already said, asks for what is still missing, and brings the conversation back to the next step after an interruption.",
    zh: "Wave AI 记得顾客已经说过什么，只追问还缺少的资料，并在插问之后把对话带回下一步。",
  },
  typical: { en: "A typical FAQ chatbot", zh: "一般 FAQ 聊天机器人" },
  rows: [
    { them: { en: "Answers isolated questions", zh: "只回答单个问题" }, us: { en: "Understands what the customer is trying to do", zh: "理解顾客想完成什么" } },
    { them: { en: "Follows a fixed menu you have to build", zh: "依赖你自己搭的固定菜单" }, us: { en: "Learns from your existing documents", zh: "从你现有的文件学习" } },
    { them: { en: "Forgets what was already said", zh: "忘记顾客说过的资料" }, us: { en: "Resumes after interruptions", zh: "回答插问后继续推进" } },
    { them: { en: "Leaves your team a raw chat log", zh: "只留下原始聊天记录" }, us: { en: "Hands your team a structured brief", zh: "给团队一份结构化摘要" } },
  ],
};

export const diagnostic = {
  eyebrow: { en: "60-second lead check", zh: "60 秒询问检查" },
  title: { en: "Where do good enquiries get stuck?", zh: "优质询问卡在哪一步？" },
  resultLabel: { en: "How this enquiry moves", zh: "这条询问如何继续推进" },
  today: { en: "Today", zh: "现在" },
  agent: { en: "Wave AI", zh: "Wave AI" },
  team: { en: "Your team", zh: "你的团队" },
  cta: { en: "Start with this problem", zh: "从这个问题开始" },
  privacy: {
    en: "Opens Telegram. No form, no login, no secret data.",
    zh: "将打开 Telegram；无需表格、登录或敏感资料。",
  },
  options: [
    {
      key: "slow_reply",
      label: { en: "Replies are too slow", zh: "回复速度太慢" },
      title: { en: "Respond while intent is still high.", zh: "在购买意愿最高时及时回应。" },
      before: { en: "A good lead waits. Interest cools.", zh: "优质询问等待回复，兴趣逐渐下降。" },
      action: { en: "Replies instantly and understands the request.", zh: "即时回复并理解顾客需求。" },
      outcome: { en: "Receives a clearer opportunity to follow up.", zh: "收到更清楚、更值得跟进的商机。" },
    },
    {
      key: "follow_up",
      label: { en: "Follow-up stops", zh: "跟进经常中断" },
      title: { en: "Keep the conversation moving.", zh: "让对话持续推进。" },
      before: { en: "The first reply happens, then follow-up disappears.", zh: "完成首次回复后，跟进就中断了。" },
      action: { en: "Remembers context and continues the right conversation.", zh: "保留上下文，并继续正确的对话。" },
      outcome: { en: "Knows who needs attention and why.", zh: "知道应该跟进谁，以及原因。" },
    },
    {
      key: "qualification",
      label: { en: "Too many weak enquiries", zh: "无效询问太多" },
      title: { en: "Spend human time on stronger opportunities.", zh: "把真人时间留给更好的商机。" },
      before: { en: "The team treats every enquiry the same.", zh: "团队用同样方式处理所有询问。" },
      action: { en: "Asks relevant questions and captures useful facts.", zh: "追问相关问题并整理有用资料。" },
      outcome: { en: "Focuses on qualified leads with context.", zh: "集中处理有上下文的合格询问。" },
    },
    {
      key: "booking",
      label: { en: "Bookings drop off", zh: "预约过程流失" },
      title: { en: "Remove friction before the booking.", zh: "减少顾客完成预约前的阻力。" },
      before: { en: "Customers ask, wait and leave before confirming.", zh: "顾客询问后等待，最终没有确认。" },
      action: { en: "Explains the next step and guides booking details.", zh: "说明下一步并引导完成预约资料。" },
      outcome: { en: "Receives a prepared booking request.", zh: "收到已经整理好的预约需求。" },
    },
    {
      key: "visibility",
      label: { en: "I can’t see what’s happening", zh: "看不到询问状况" },
      title: { en: "Turn conversations into context.", zh: "把对话转成清晰的信息。" },
      before: { en: "Important patterns stay buried inside chat history.", zh: "重要趋势埋在大量聊天记录里。" },
      action: { en: "Structures goals, objections and current status.", zh: "整理目标、疑虑和当前状态。" },
      outcome: { en: "Sees what is happening without reading every chat.", zh: "无需阅读每段对话，也能掌握情况。" },
    },
  ] satisfies {
    key: DiagnosticKey;
    label: Copy;
    title: Copy;
    before: Copy;
    action: Copy;
    outcome: Copy;
  }[],
};

export const safety = {
  title: { en: "Wave AI won’t make promises your business hasn’t made.", zh: "Wave AI 不会替你乱做承诺。" },
  items: [
    { en: "Answers only from the material you give it", zh: "只根据你提供的资料回答" },
    { en: "No invented prices, discounts or availability", zh: "不编造价格、优惠或空档" },
    { en: "No passwords, OTPs or payment details requested", zh: "不索取密码、OTP 或付款资料" },
    { en: "Customers confirm before anything is submitted", zh: "顾客确认后才提交" },
    { en: "Sensitive or uncertain cases go to your team", zh: "敏感或不确定的情况交给团队" },
  ],
};

export const faq = {
  title: { en: "Before you put AI in front of customers.", zh: "在让 AI 面对顾客之前。" },
  items: [
    {
      id: "train",
      q: { en: "What do I need to give it?", zh: "我需要提供什么资料？" },
      a: {
        en: "The material your staff already use to answer customers: FAQs, price lists, product or service sheets and policies. Our team helps you set it up.",
        zh: "员工平时回答顾客用的资料就可以：常见问题、价目表、产品或服务介绍、各种条款。我们的团队会协助你设置。",
      },
    },
    {
      id: "handoff",
      q: { en: "Can my team take over a conversation?", zh: "团队可以接手对话吗？" },
      a: {
        en: "Yes. Wave AI hands over when a customer needs a person or asks something outside your material, and anyone on your team can step into the chat from the dashboard.",
        zh: "可以。顾客需要真人、或问到资料以外的问题时，Wave AI 会转给团队；团队任何人都可以从后台接手对话。",
      },
    },
    {
      id: "admin",
      q: { en: "Does it replace my staff?", zh: "它会取代我的员工吗？" },
      a: {
        en: "No. It handles repetitive early-stage questions and prepares better context. Your team keeps control of sensitive decisions, final prices and important relationships.",
        zh: "不会。它处理前期重复的问题并准备更完整的上下文；敏感决定、最终价格和重要关系仍由团队掌控。",
      },
    },
    {
      id: "language",
      q: { en: "Can it work in Chinese and English?", zh: "可以使用中文和 English 吗？" },
      a: {
        en: "Yes. The conversation follows the language customers naturally use, including mixed-language messages.",
        zh: "可以。对话会跟随顾客自然使用的语言，也支持中英混合消息。",
      },
    },
    {
      id: "integrations",
      q: { en: "Can it connect to our calendar or CRM?", zh: "可以连接日历或 CRM 吗？" },
      a: {
        en: "Often, yes. We first verify whether the tool offers a secure API, webhook or supported integration, then define what Wave AI may read or change.",
        zh: "多数情况下可以。我们会先确认工具是否提供安全 API、Webhook 或受支持的整合方式，再定义 Wave AI 可以读取或修改的范围。",
      },
    },
    {
      id: "cost",
      q: { en: "How much does it cost?", zh: "费用是多少？" },
      a: {
        en: "It depends on channels, conversation volume and integrations. Tell the Agent about your business first; the Wave AI team confirms any final quotation.",
        zh: "费用取决于渠道、对话量和系统整合。先跟 Agent 说说你的生意，最终报价由 Wave AI 团队确认。",
      },
    },
  ],
};

export const finale = {
  title: { en: "Try it with the questions your customers actually ask.", zh: "用顾客真正会问的问题，试试看。" },
  footer: { en: "AI chatbots for businesses, from Malaysia", zh: "为中小企业打造的 AI 聊天机器人，来自马来西亚" },
};
