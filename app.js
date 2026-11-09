/* =========================================================
   五好企康 · data + interactions
   ========================================================= */

(function () {
  "use strict";

  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));

  const CATS = {
    early: {
      key: "early",
      name: "好好早筛",
      short: "早筛",
      char: "筛",
      icon: "scan",
      tagline: "把风险挡在门外",
      quote: "最好的治疗，是预防。",
      note: "年度深度体检、肿瘤早筛、心脑血管专项与无痛胃肠镜。",
      intro: "从健康风险问卷到年度深度体检，由北大医疗专业团队为你建立健康画像，发现潜在风险，并给出后续管理建议。",
      services: [
        "健康风险问卷与健康档案评估",
        "年度深度体检（含肿瘤早筛、心脑血管等）",
        "无痛胃肠镜等专项深度筛查",
        "体检报告专业解读与检后管理",
        "异常指标复查与就医绿色通道"
      ],
      fit: "适合长期熬夜、久坐、有慢病家族史，或希望系统了解自身健康风险的员工。"
    },
    food: {
      key: "food",
      name: "好好吃饭",
      short: "吃饭",
      char: "食",
      icon: "bowl",
      tagline: "吃对每一餐",
      quote: "你吃进去的，是食物，还是“燃料”？",
      note: "人体成分检测、专业营养师陪伴与健康厨房计划。",
      intro: "营养师会结合你的健康档案、体检指标、身体成分与饮食偏好，评估现有饮食结构，给出可执行的每日餐盘建议和一周菜谱。",
      services: [
        "健康档案、人体成分与代谢指标评估",
        "营养师 1v1 饮食咨询",
        "个性化饮食结构与每日餐盘建议",
        "一周定制菜谱与外食选择指导",
        "商城健康食材、功能营养品直接选购"
      ],
      fit: "适合希望改善体重、血糖血脂、精力状态，或不知道怎么吃得更健康的员工。",
      relatedNote: "商城已上架营养师定制菜谱、功能营养组合与健康厨房食材，可直接购买或使用额度兑换。"
    },
    move: {
      key: "move",
      name: "好好运动",
      short: "运动",
      char: "动",
      icon: "activity",
      tagline: "动对，比动多更重要",
      quote: "用医学数据，指导每一次呼吸与迈步。",
      note: "心肺运动评估、减重训练营、颈肩调理与办公室微运动。",
      intro: "先评估心肺功能与肌骨状态，再由运动医学团队给出适合你的运动处方，并联动商城健身用品，让运动真正融入日常。",
      services: [
        "心肺运动试验（CPET）与运动风险评估",
        "骨密度、肌力与体态评估",
        "FITT 个性化运动处方",
        "减重训练营与办公室微运动",
        "术后 / 伤后康复指导",
        "商城智能手环、家庭运动套装等装备"
      ],
      fit: "适合久坐、颈肩腰背不适、想科学减重，或准备开始规律运动的员工。",
      relatedNote: "商城提供智能运动手环、家庭运动套装与办公室拉伸带等健身用品，可与运动处方搭配使用。"
    },
    sleep: {
      key: "sleep",
      name: "好好睡觉",
      short: "睡觉",
      char: "眠",
      icon: "moon",
      tagline: "睡对周期，深度修复",
      quote: "睡得好，才是最高级的自愈。",
      note: "多导睡眠监测、CBT-I 失眠干预与助眠营养方案。",
      intro: "从睡眠评估到医疗级监测，识别失眠、睡眠呼吸暂停等问题，匹配认知行为治疗、营养与器械干预。",
      services: [
        "睡眠质量评估与睡眠日记",
        "医疗级多导睡眠监测（PSG）",
        "CBT-I 失眠认知行为治疗",
        "助眠营养与家用呼吸机方案",
        "睡眠数据随访与复评"
      ],
      fit: "适合入睡困难、夜醒、打鼾、白天嗜睡，或长期倒班、熬夜的员工。"
    },
    relax: {
      key: "relax",
      name: "好好放松",
      short: "放松",
      char: "松",
      icon: "leaf",
      tagline: "让大脑科学地重置",
      quote: "真正的休息，是让大脑“关机”。",
      note: "EAP 心理咨询、正念冥想、团体心理沙龙与颂钵疗愈。",
      intro: "通过 EAP 心理咨询、团体沙龙与正念练习，帮助员工识别压力信号，建立可持续的放松方式。",
      services: [
        "EAP 一对一心理咨询",
        "职场沟通与情绪管理团体沙龙",
        "12 周正念冥想训练",
        "颂钵音疗与身心放松体验",
        "压力评估与后续关怀"
      ],
      fit: "适合压力大、情绪紧绷、职场关系困扰，或希望提升睡眠与专注力的员工。"
    }
  };

  const CAT_ORDER = ["early", "food", "move", "sleep", "relax"];

  const EMPLOYEE = {
    name: "林小满",
    company: "星河科技",
    dept: "产品设计部",
    employeeNo: "PKU-02317",
    level: "五好体验官 Lv.3"
  };

  const state = {
    view: "home",
    subpage: null,
    recipeIndex: 0,
    mallCat: "all",
    mallFilter: "all",
    articleCat: "all",
    quota: {
      total: 3000,
      used: 1286,
      available: 1714,
      company: "星河科技",
      validUntil: "2026.12.31"
    },
    likedIds: new Set(),
    readHistory: ["a1", "a4"],
    hasUnread: true,
    highlightRedemptionId: null,
    selectedProductId: null,
    selectedArticleId: null
  };

  const PRODUCTS = [
    {
      id: "p1",
      cat: "early",
      type: "服务",
      title: "北大医疗定制体检卡",
      subtitle: "深度防癌筛查 · 心脑血管风险评估",
      price: 1699,
      char: "检",
      icon: "scan",
      recommended: true,
      includes: ["深度防癌筛查套餐", "心脑血管风险评估", "住院体检 / 无痛胃肠镜可选", "专属报告解读"],
      desc: "年度深度体检不只是“有没有病”，更要看清健康风险。覆盖肿瘤早筛、心脑血管、代谢与睡眠等维度，由北大医疗专业团队提供报告解读与后续建议。"
    },
    {
      id: "p2",
      cat: "early",
      type: "服务",
      title: "无痛胃肠镜专项",
      subtitle: "睡一觉完成检查，消化道早筛",
      price: 1299,
      char: "镜",
      icon: "shield",
      recommended: false,
      includes: ["无痛胃肠镜检查", "麻醉评估与监护", "消化道肿瘤风险筛查", "检查后报告解读"],
      desc: "覆盖消化道肿瘤风险，全程无痛，当天离院。适合长期外食、作息不规律或有消化道家族史的员工。"
    },
    {
      id: "p3",
      cat: "food",
      type: "商品",
      title: "功能营养组合包",
      subtitle: "维生素 D3 · 益生菌 · 鱼油",
      price: 399,
      char: "养",
      icon: "bowl",
      recommended: false,
      includes: ["高纯度维生素 D3", "专利菌株益生菌", "深海鱼油", "30 天营养补充方案"],
      desc: "针对检测发现的营养缺口，提供高纯度、易吸收的功能营养组合，由营养师根据身体指标给出搭配建议。"
    },
    {
      id: "p4",
      cat: "food",
      type: "商品",
      title: "健康厨房基础膳食包",
      subtitle: "无抗鸡蛋 · 低温和冷压油 · 高纤食材",
      price: 299,
      char: "膳",
      icon: "leaf",
      recommended: true,
      includes: ["无抗鸡蛋", "优质主食组合", "低温和冷压油", "高纤食材与零添加调味"],
      desc: "从食材采购开始，让健康餐真正落地。北大医疗优品链路直供，适合员工日常家庭餐桌。"
    },
    {
      id: "p5",
      cat: "move",
      type: "商品",
      title: "智能运动手环",
      subtitle: "心率 · 血氧 · 睡眠 HRV 监测",
      price: 699,
      char: "动",
      icon: "activity",
      recommended: false,
      includes: ["心率与血氧监测", "睡眠 HRV 分析", "运动数据记录", "数据同步健康管理平台"],
      desc: "把日常活动与睡眠数据变成可解读的健康信号，帮助员工更了解自己的身体状态与运动节奏。"
    },
    {
      id: "p6",
      cat: "move",
      type: "商品",
      title: "家庭运动套装",
      subtitle: "弹力带 · 小哑铃 · 普拉提圈",
      price: 399,
      char: "练",
      icon: "activity",
      recommended: false,
      includes: ["专业弹力带", "小哑铃组合", "普拉提圈", "北大医疗线上运动课程包"],
      desc: "包含办公室微运动、肩颈康复与瑜伽系列课程，让运动不受场地限制，全家都能一起练。"
    },
    {
      id: "p7",
      cat: "sleep",
      type: "服务",
      title: "多导睡眠监测",
      subtitle: "医疗级 PSG · 识别睡眠呼吸暂停",
      price: 899,
      char: "眠",
      icon: "moon",
      recommended: true,
      includes: ["整夜多导睡眠监测", "脑电 / 眼动 / 肌电 / 血氧分析", "睡眠呼吸事件评估", "专业睡眠报告与干预建议"],
      desc: "区分失眠类型与睡眠呼吸暂停风险，匹配不同干预路径。适合打鼾、夜醒、入睡困难或白天嗜睡的员工。"
    },
    {
      id: "p8",
      cat: "sleep",
      type: "商品",
      title: "家用自动调压呼吸机",
      subtitle: "CPAP / APAP · 改善夜间缺氧",
      price: 3999,
      char: "呼",
      icon: "wind",
      recommended: false,
      includes: ["自动调压呼吸机主机", "舒适面罩与管路", "压力滴定与参数解读", "睡眠数据随访"],
      desc: "针对打鼾与睡眠呼吸暂停，改善夜间缺氧。设备参数需在专业评估后设置，可进行数据解读与随访。"
    },
    {
      id: "p9",
      cat: "sleep",
      type: "商品",
      title: "助眠营养组合包",
      subtitle: "褪黑素 · 甘氨酸镁 · GABA · 茶氨酸",
      price: 299,
      char: "睡",
      icon: "moon",
      recommended: false,
      includes: ["低剂量褪黑素", "甘氨酸镁", "GABA", "茶氨酸助眠组合"],
      desc: "围绕睡眠节律与神经放松设计，适合短期入睡困难与睡前紧张。建议结合睡眠评估使用。"
    },
    {
      id: "p10",
      cat: "relax",
      type: "商品",
      title: "颂钵疗愈 · 音疗套装",
      subtitle: "低频颂钵疗愈仪 + 引导音频库",
      price: 1099,
      char: "音",
      icon: "spark",
      recommended: true,
      includes: ["低频颂钵疗愈仪", "引导音频库", "40Hz 放松频段", "居家正念练习指南"],
      desc: "通过特定声波频率诱导放松反应，适合下班后或睡前进行 10 分钟身心复位。"
    },
    {
      id: "p11",
      cat: "relax",
      type: "服务",
      title: "企业心理沙龙（团体）",
      subtitle: "EAP 团体 · 12–20 人小组 · 讲师上门",
      price: 1999,
      char: "心",
      icon: "heart",
      recommended: false,
      includes: ["团体心理沙龙 1 场", "职场沟通 / 情绪主题可选", "专业心理讲师带领", "企业场地或线上开展"],
      desc: "围绕职场沟通、家庭冲突、自我价值等主题，通过 12–20 人小组深度互动，让员工在安全的空间里获得支持。"
    },
    {
      id: "p12",
      cat: "move",
      type: "服务",
      title: "中医颈肩调理",
      subtitle: "工位劳损 · 中医适宜技术",
      price: 288,
      char: "颈",
      icon: "leaf",
      recommended: false,
      includes: ["中医体质评估", "颈肩推拿调理", "工位人体工学建议", "居家拉伸指导"],
      desc: "针对长期伏案带来的颈肩紧张与腰背劳损，由专业中医师提供调理与日常养护建议。"
    },
    {
      id: "p13",
      cat: "food",
      type: "服务",
      title: "营养师定制菜谱",
      subtitle: "健康档案评估 · 一周饮食结构与菜谱",
      price: 199,
      char: "谱",
      icon: "bowl",
      recommended: false,
      includes: ["健康档案与饮食结构评估", "营养师 1v1 咨询", "一周定制菜谱", "外食与采购清单建议"],
      desc: "营养师根据你的健康档案、体检指标与饮食偏好，评估现有饮食结构，制定一周可执行的菜谱和采购清单，让“吃得对”真正落地。"
    },
    {
      id: "p14",
      cat: "move",
      type: "商品",
      title: "办公室肩颈拉伸带",
      subtitle: "居家 / 工位拉伸 · 康复师动作指导",
      price: 129,
      char: "伸",
      icon: "activity",
      recommended: false,
      includes: ["弹力拉伸带", "肩颈放松动作卡", "康复师视频指导", "工位拉伸计划"],
      desc: "为久坐人群设计的轻量拉伸装备，搭配康复师动作指导，在工位或家里完成 10 分钟肩颈放松。"
    }
  ];

  const ARTICLES = [
    {
      id: "a1",
      cat: "sleep",
      title: "从凌晨两点到十一点入睡，我只做了三件事",
      excerpt: "不是自律，也不是硬扛。把睡眠当成一件需要被认真对待的事，身体会慢慢给出回应。",
      author: "周予安",
      role: "研发中心",
      date: "11 月 02 日",
      read: "6 分钟",
      likes: 128,
      comments: 18,
      featured: true,
      coverQuote: "睡对周期，才是深度修复",
      content: [
        "我曾经是那种“夜里舍不得睡”的人。白天被会议和消息切得很碎，只有凌晨的时间像是自己的。直到连续一个月在凌晨两点后入睡，我开始在下午三点感到心慌。",
        "第一件事，是把睡觉当成一个正式的日程。我在日历里给自己留了一个 22:45 的提醒，像对待一场重要会议一样对待入睡。",
        "第二件事，是把手机留在客厅。不是为了戒断，而是为了让大脑停止接收新的信息。最初几天很难，但一周后，我发现躺下后不再需要靠刷屏来“关机”。",
        "第三件事，是去做了一次睡眠评估。医生告诉我，我的问题不是“睡不够 8 小时”，而是入睡节律被打乱。知道原因之后，焦虑反而少了一半。",
        "现在，我依然会有晚睡的时候。但我不再把睡眠当成可以随意挪用的时间。睡得好，才是最高级的自愈。"
      ]
    },
    {
      id: "a2",
      cat: "food",
      title: "食堂新窗口，治好了我的午餐选择困难",
      excerpt: "好好吃饭不是顿顿轻食，而是知道今天的身体需要什么。",
      author: "陈一禾",
      role: "品牌部",
      date: "10 月 29 日",
      read: "4 分钟",
      likes: 86,
      comments: 9,
      coverQuote: "吃对，比吃少更重要",
      content: [
        "公司食堂新开了一个“五好能量碗”窗口。第一次去的时候，我以为又是那种看起来很健康、吃完却很饿的轻食。",
        "结果搭配意外地实在：优质蛋白、粗粮、足量蔬菜，还有一小份低温和冷压油调成的酱汁。吃完没有犯困，下午开会也不需要靠咖啡续命。",
        "后来听了营养师的分享才知道，午餐的关键不是“少”，而是结构。蛋白质、膳食纤维和适量脂肪的组合，能让血糖更平稳。",
        "现在我不再纠结每天吃什么，而是先问自己：今天下午要做什么？如果有一场长会，我会多选一点蛋白质和蔬菜。好好吃饭，原来是可以被设计的。"
      ]
    },
    {
      id: "a3",
      cat: "move",
      title: "我把午休变成了十分钟的肩颈仪式",
      excerpt: "不需要换衣服，也不需要去健身房，一张椅子就够。",
      author: "许知夏",
      role: "产品设计部",
      date: "10 月 24 日",
      read: "3 分钟",
      likes: 64,
      comments: 7,
      coverQuote: "动对，比动多更重要",
      content: [
        "长期画图加开会，我的肩颈在下午会准时发出提醒。以前我会忍到下班，再去按摩店“急救”一次。",
        "后来参加了办公室微运动课，老师教了三个动作：下巴微收、肩胛骨后缩、胸椎旋转。每个动作一分钟，不需要出汗。",
        "我把它们设成了午休后的固定流程。十分钟里，先做两次深呼吸，再依次完成肩颈和胸椎的放松。做完之后，下午的专注度明显不一样。",
        "运动不一定要大汗淋漓。对久坐的人来说，先让身体从“冻结”里出来，可能比多跑三公里更重要。"
      ]
    },
    {
      id: "a4",
      cat: "early",
      title: "体检报告上的箭头，让我开始认真吃早餐",
      excerpt: "一次深度体检，不只是拿一份报告，而是重新认识自己的身体。",
      author: "沈知远",
      role: "财务部",
      date: "10 月 18 日",
      read: "5 分钟",
      likes: 72,
      comments: 11,
      coverQuote: "在疾病敲门之前，先为它画像",
      content: [
        "今年的体检报告上，出现了几个向上的箭头。医生没有吓唬我，只是问了一句：你平时吃早餐吗？",
        "那一刻我有点心虚。过去两年，我的早餐基本是一杯咖啡，偶尔加一个面包。午餐和晚餐则因为加班变得很不规律。",
        "在检后管理服务里，营养师和我一起把一周的早餐重新排了一遍：鸡蛋、无糖酸奶、燕麦和水果，尽量在出门前解决。",
        "三个月后复查，指标没有立刻全部恢复，但我知道自己已经在正确的方向上。体检的意义，不是制造焦虑，而是给身体一次被看见的机会。"
      ]
    },
    {
      id: "a5",
      cat: "relax",
      title: "心理沙龙那天，我第一次承认自己需要休息",
      excerpt: "真正的休息，不是逃避，而是给大脑一次科学的重置。",
      author: "匿名员工",
      role: "客户成功部",
      date: "10 月 12 日",
      read: "4 分钟",
      likes: 103,
      comments: 14,
      coverQuote: "真正的休息，是让大脑“关机”",
      content: [
        "报名心理沙龙的时候，我以为会是一场“如何更高效”的讲座。没想到老师让我们做的第一件事，是安静地坐三分钟，什么都不做。",
        "那三分钟里，我的大脑一直在列待办清单。老师说，这很正常，休息不是让思绪立刻停止，而是练习不跟着它跑。",
        "后来我们聊到“情绪劳动”：面对客户时的微笑、对同事的耐心、对家人的照顾，都需要消耗能量。承认累，并不会让你变得不专业。",
        "那天回家，我没有打开电脑。给自己泡了杯茶，坐在阳台上发了会儿呆。第二天的工作效率反而更高了。"
      ]
    },
    {
      id: "a6",
      cat: "sleep",
      title: "睡前把手机留在客厅，我睡了这半年最好的一觉",
      excerpt: "改变不需要很大，有时候只是把充电器挪一个房间。",
      author: "苏晚",
      role: "人力资源部",
      date: "10 月 08 日",
      read: "3 分钟",
      likes: 57,
      comments: 6,
      coverQuote: "给夜晚留一点空白",
      content: [
        "我试过很多助眠方法：香薰、白噪音、褪黑素。最后真正有用的，是一个很笨的办法——把手机充电器放到客厅。",
        "第一晚我辗转反侧，总觉得少了什么。第二晚开始，我给自己准备了一本纸质书，睡前只看十页。",
        "一周后，我发现自己不再需要在床上刷到眼睛酸涩才肯睡。睡眠时间没有突然变长，但醒来的感觉清爽了很多。",
        "如果你也想试试，不用从“戒手机”开始。先把手机放远一点，给夜晚留一点空白。"
      ]
    }
  ];

  const BENEFITS = [
    { cat: "early", title: "年度深度体检", desc: "肿瘤早筛、心脑血管评估与报告解读", remaining: 1, total: 1, valid: "2026.12.31" },
    { cat: "food", title: "营养师 1v1 咨询", desc: "饮食结构评估与个性化餐单建议", remaining: 2, total: 2, valid: "2026.12.31" },
    { cat: "move", title: "心肺运动评估", desc: "CPET 运动风险评估与运动处方", remaining: 1, total: 1, valid: "2026.12.31" },
    { cat: "sleep", title: "睡眠评估与干预", desc: "睡眠质量评估，匹配非药物干预方案", remaining: 1, total: 1, valid: "2026.12.31" },
    { cat: "relax", title: "EAP 心理沙龙", desc: "12–20 人小组，职场压力与情绪支持", remaining: 2, total: 2, valid: "2026.12.31" }
  ];

  const REDEMPTIONS = [
    { id: "r1", productId: "p9", title: "助眠营养组合包", cat: "sleep", type: "商品", date: "2026.10.28", status: "已发货", quotaUsed: 299, selfPay: 0, orderNo: "WH20261028001" },
    { id: "r2", productId: "p5", title: "智能运动手环", cat: "move", type: "商品", date: "2026.09.16", status: "已签收", quotaUsed: 699, selfPay: 0, orderNo: "WH20260916002" },
    { id: "r3", productId: "p12", title: "中医颈肩调理", cat: "move", type: "服务", date: "2026.06.08", status: "已完成", quotaUsed: 288, selfPay: 0, orderNo: "WH20260608003" }
  ];

  const LEDGER = [
    { id: "l1", date: "10.28", title: "兑换「助眠营养组合包」", sub: "额度支出 · 已发货", amount: -299, balance: 1714, selfPay: 0 },
    { id: "l2", date: "09.16", title: "兑换「智能运动手环」", sub: "额度支出 · 已签收", amount: -699, balance: 2013, selfPay: 0 },
    { id: "l3", date: "06.08", title: "兑换「中医颈肩调理」", sub: "额度支出 · 已完成", amount: -288, balance: 2712, selfPay: 0 },
    { id: "l4", date: "01.01", title: "2026 年度企业健康额度", sub: "星河科技发放", amount: 3000, balance: 3000, selfPay: 0 }
  ];

  const HEALTH_PROFILE = {
    name: "林小满",
    gender: "女",
    age: 31,
    height: 165,
    weight: 56.8,
    bmi: 20.9,
    bloodPressure: "118/76",
    fastingGlucose: "5.2",
    restingHeartRate: "68",
    sleepHours: "7.2",
    exercise: "每周 3 次，每次 40 分钟",
    diet: "工作日外食较多，偏好清淡",
    smoker: "不吸烟",
    alcohol: "偶尔饮酒",
    allergies: "无已知过敏",
    history: "无重大疾病史",
    familyHistory: "父亲高血压",
    goals: ["改善睡眠", "维持体重", "提升心肺耐力"],
    updatedAt: "2026.11.02",
    completeness: 86
  };

  const RECIPE = {
    title: "一周轻盈营养食谱",
    updated: "2026.11.02",
    nutritionist: "北大医疗营养师 · 李然",
    principles: "早餐保证优质蛋白与复合碳水，午餐遵循“一拳主食、一掌蛋白、两拳蔬菜”，晚餐减少精制碳水并提前至 19:00 前完成。工作日外食时优先选择清蒸、炖煮和少油酱汁。",
    days: [
      { day: "周一", theme: "轻盈启动", meals: [["早餐", "燕麦酸奶杯、水煮蛋、蓝莓"], ["午餐", "杂粮饭、清蒸鲈鱼、西兰花"], ["晚餐", "南瓜小米粥、鸡胸肉沙拉"], ["加餐", "无糖酸奶 / 一小把坚果"]], recommend: ["p4", "p3"] },
      { day: "周二", theme: "高蛋白日", meals: [["早餐", "全麦吐司、煎蛋、无糖豆浆"], ["午餐", "荞麦面、牛肉片、时蔬"], ["晚餐", "豆腐菌菇汤、清炒菠菜、半根玉米"], ["加餐", "苹果 / 无糖茶"]], recommend: ["p13", "p4"] },
      { day: "周三", theme: "低 GI 日", meals: [["早餐", "藜麦粥、水煮蛋、小番茄"], ["午餐", "糙米饭、照烧鸡腿（去皮）、西芹"], ["晚餐", "清蒸鳕鱼、芦笋、紫薯"], ["加餐", "无糖酸奶 / 奇异果"]], recommend: ["p3", "p4"] },
      { day: "周四", theme: "外食平衡", meals: [["早餐", "无糖豆浆、玉米、茶叶蛋"], ["午餐", "杂粮饭、番茄牛腩、生菜"], ["晚餐", "菌菇豆腐煲、清炒油麦菜"], ["加餐", "香蕉 / 原味坚果"]], recommend: ["p13", "p4"] },
      { day: "周五", theme: "轻晚餐", meals: [["早餐", "希腊酸奶、燕麦、草莓"], ["午餐", "荞麦面、虾仁、时蔬"], ["晚餐", "冬瓜虾皮汤、香煎鸡胸、芦笋"], ["加餐", "小番茄 / 无糖茶"]], recommend: ["p3", "p4"] },
      { day: "周末", theme: "家庭餐桌", meals: [["早餐", "蔬菜蛋饼、无糖豆浆"], ["午餐", "杂粮饭、清蒸鱼、菌菇时蔬"], ["晚餐", "番茄豆腐汤、凉拌鸡丝、少量糙米"], ["加餐", "时令水果 / 原味酸奶"]], recommend: ["p13", "p3"] }
    ],
    shopping: ["无抗鸡蛋", "低脂奶 / 无糖酸奶", "燕麦 / 藜麦 / 糙米", "深海鱼 / 鸡胸肉", "深色蔬菜", "低 GI 水果", "原味坚果"],
    products: ["p3", "p4", "p13"]
  };

  const REPORTS = [
    {
      id: "rep1",
      cat: "early",
      type: "体检报告",
      title: "年度深度体检报告",
      date: "2026.10.18",
      org: "北京大学国际医院",
      status: "已解读",
      summary: "整体健康风险较低。BMI 与血压处于正常范围，低密度脂蛋白略高于理想值，建议通过饮食与运动进一步优化。",
      metrics: [
        { label: "BMI", value: "20.9" },
        { label: "血压", value: "118/76" },
        { label: "空腹血糖", value: "5.2" },
        { label: "LDL-C", value: "3.1" },
        { label: "尿酸", value: "328" },
        { label: "睡眠", value: "7.2h" }
      ],
      interpretation: "体检未见明确器质性异常。LDL-C 接近临界值，结合工作日外食较多的生活方式，建议减少油炸与加工食品，增加可溶性膳食纤维。",
      recommendations: ["保持每周 3 次有氧运动，每次 40 分钟", "每周至少 2 次深海鱼或豆制品替代红肉", "6 个月后复查血脂"],
      products: ["p1", "p3"]
    },
    {
      id: "rep2",
      cat: "sleep",
      type: "睡眠评估",
      title: "睡眠质量评估报告",
      date: "2026.09.06",
      org: "北大医疗睡眠中心",
      status: "已完成",
      summary: "入睡潜伏期偏长，深睡比例略低，未见明显睡眠呼吸暂停风险。建议进行 CBT-I 行为干预并保持固定起床时间。",
      metrics: [
        { label: "睡眠时长", value: "7.2h" },
        { label: "入睡潜伏", value: "32min" },
        { label: "深睡比例", value: "14%" },
        { label: "觉醒次数", value: "2.1" },
        { label: "AHI", value: "2.3" },
        { label: "睡眠效率", value: "86%" }
      ],
      interpretation: "以入睡困难为主的轻度失眠表现，尚未达到睡眠呼吸暂停诊断标准。认知行为治疗与睡前放松训练是首选干预方式。",
      recommendations: ["固定 23:00 前上床、7:00 起床", "睡前 1 小时停止处理工作消息", "4 周后复评睡眠日记"],
      products: ["p7", "p9"]
    },
    {
      id: "rep3",
      cat: "food",
      type: "营养评估",
      title: "营养评估与饮食建议",
      date: "2026.11.02",
      org: "北大医疗营养科",
      status: "已更新",
      summary: "蛋白质摄入基本充足，膳食纤维与 omega-3 摄入不足，工作日午餐外食频率较高。已据此生成本周定制食谱。",
      metrics: [
        { label: "BMI", value: "20.9" },
        { label: "体脂率", value: "24.8%" },
        { label: "骨骼肌", value: "22.1kg" },
        { label: "膳食纤维", value: "16g" },
        { label: "蛋白质", value: "62g" },
        { label: "饮水", value: "1.4L" }
      ],
      interpretation: "当前体重处于健康范围，但膳食结构中外食油脂与精制碳水比例偏高，膳食纤维与深海鱼摄入不足，可能影响血脂与睡眠质量。",
      recommendations: ["每日蔬菜 500g，深色蔬菜占一半", "每周 2–3 次深海鱼或亚麻籽", "晚餐提前至 19:00 前，减少精制主食"],
      products: ["p3", "p4", "p13"]
    },
    {
      id: "rep4",
      cat: "move",
      type: "运动评估",
      title: "心肺运动评估报告",
      date: "2026.08.20",
      org: "北大医疗运动医学中心",
      status: "已完成",
      summary: "心肺耐力处于同龄人中等偏上水平，运动风险低。建议以中等强度有氧结合每周 2 次抗阻训练为主。",
      metrics: [
        { label: "最大摄氧量", value: "38.6" },
        { label: "静息心率", value: "68" },
        { label: "最大心率", value: "178" },
        { label: "骨密度", value: "正常" },
        { label: "握力", value: "26kg" },
        { label: "运动风险", value: "低" }
      ],
      interpretation: "心肺功能良好，适合进行规律的中等强度运动。核心力量与下肢力量仍有提升空间，建议加入抗阻与拉伸训练。",
      recommendations: ["每周 150 分钟中等强度有氧", "每周 2 次全身抗阻训练", "每坐 60 分钟起身活动 3 分钟"],
      products: ["p5", "p6", "p14"]
    },
    {
      id: "rep5",
      cat: "relax",
      type: "心理评估",
      title: "压力与情绪评估",
      date: "2026.07.12",
      org: "企业 EAP 服务中心",
      status: "已完成",
      summary: "近一个月压力水平中等偏高，主要表现为入睡前思绪活跃与肩颈紧张。建议参加正念训练与团体心理沙龙。",
      metrics: [
        { label: "压力指数", value: "62" },
        { label: "情绪稳定", value: "良好" },
        { label: "睡眠影响", value: "中度" },
        { label: "HRV", value: "42ms" },
        { label: "焦虑评分", value: "7" },
        { label: "建议复评", value: "3个月" }
      ],
      interpretation: "压力反应处于可控范围，但已对入睡与肌肉紧张产生一定影响。规律的正念练习、边界管理与同伴支持有助于恢复。",
      recommendations: ["每日 10 分钟正念呼吸", "参加 1 次团体心理沙龙", "睡前一小时减少信息刺激"],
      products: ["p10", "p11"]
    }
  ];

  const SERVICE_OUTPUTS = {
    early: [{ label: "年度深度体检报告", meta: "2026.10.18 · 已解读", reportId: "rep1" }],
    food: [
      { label: "定制食谱", meta: "2026.11.02 · 已更新", subpage: "recipe" },
      { label: "营养评估报告", meta: "2026.11.02 · 已更新", reportId: "rep3" }
    ],
    move: [{ label: "心肺运动评估报告", meta: "2026.08.20 · 已完成", reportId: "rep4" }],
    sleep: [{ label: "睡眠质量评估报告", meta: "2026.09.06 · 已完成", reportId: "rep2" }],
    relax: [{ label: "压力与情绪评估", meta: "2026.07.12 · 已完成", reportId: "rep5" }]
  };

  state.articles = ARTICLES.map(article => ({ ...article }));
  state.redemptions = REDEMPTIONS.map(item => ({ ...item }));
  state.ledger = LEDGER.map(item => ({ ...item }));

  /* ---------------------------------------------------------
     Utilities
     --------------------------------------------------------- */

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function icon(name, cls) {
    return `<svg class="ic ${cls || "ic-16"}"><use href="#i-${name}"></use></svg>`;
  }

  function moneyInt(value) {
    return Number(value).toLocaleString("zh-CN", { maximumFractionDigits: 0 });
  }

  function money(value) {
    return Number(value).toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function getProduct(id) {
    return PRODUCTS.find(item => item.id === id);
  }

  function getArticle(id) {
    return state.articles.find(item => item.id === id);
  }

  function getRedemption(id) {
    return state.redemptions.find(item => item.id === id);
  }

  function quotaForProduct(product) {
    const available = state.quota.available;
    const quotaUse = Math.min(product.price, available);
    const selfPay = Math.max(0, product.price - quotaUse);
    return {
      full: selfPay === 0,
      quotaUse,
      selfPay,
      label: selfPay === 0 ? "可全额兑换" : `补差 ¥${moneyInt(selfPay)}`
    };
  }

  function coverClass(cat) {
    return `cover-${cat}`;
  }

  function avatarColor(name) {
    const colors = ["#1e5b52", "#9d7652", "#5b6f4c", "#596c88", "#845c68"];
    const code = String(name).charCodeAt(0) || 0;
    return colors[code % colors.length];
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2300);
  }

  function setGreeting() {
    const el = $("#greetTime");
    if (!el) return;
    const hour = new Date().getHours();
    let text = "晚上好";
    if (hour < 6) text = "夜深了";
    else if (hour < 9) text = "早上好";
    else if (hour < 12) text = "上午好";
    else if (hour < 14) text = "中午好";
    else if (hour < 18) text = "下午好";
    el.textContent = text;
  }

  /* ---------------------------------------------------------
     Global render
     --------------------------------------------------------- */

  function updateQuotaDisplays() {
    const q = state.quota;
    $$("[data-quota-available]").forEach(el => { el.textContent = moneyInt(q.available); });
    $$("[data-quota-used]").forEach(el => { el.textContent = `¥${moneyInt(q.used)}`; });
    $$("[data-quota-total]").forEach(el => { el.textContent = `¥${moneyInt(q.total)}`; });
    $$("[data-quota-available-full]").forEach(el => { el.textContent = `¥${money(q.available)}`; });
    $$("[data-quota-used-full]").forEach(el => { el.textContent = `¥${money(q.used)}`; });
    $$("[data-quota-progress]").forEach(el => { el.style.width = `${(q.used / q.total) * 100}%`; });
    $$("[data-stat-redeems]").forEach(el => { el.textContent = state.redemptions.length; });
    $$("[data-stat-benefits]").forEach(el => { el.textContent = BENEFITS.length; });
  }

  function renderFiveRail() {
    const rail = $("#fiveRail");
    if (!rail) return;
    rail.innerHTML = CAT_ORDER.map(key => {
      const cat = CATS[key];
      return `
        <button class="five-card cat-${key}" type="button" data-category="${key}" aria-label="${cat.name}：${cat.tagline}">
          <span class="fc-icon">${icon(cat.icon, "ic-20")}</span>
          <span class="fc-title">${cat.name}</span>
          <span class="fc-desc">${cat.tagline}</span>
          <span class="fc-arrow">查看服务 ${icon("arrow", "ic-11")}</span>
          <span class="fc-char">${cat.char}</span>
        </button>
      `;
    }).join("");
  }

  function productCard(product) {
    const status = quotaForProduct(product);
    return `
      <button class="product-card" type="button" data-product="${product.id}" aria-label="${escapeHtml(product.title)}，${status.full ? "可全额兑换" : `需补差 ${status.selfPay} 元`}">
        <span class="product-visual pv-${product.cat}">
          <span class="pv-icon">${icon(product.icon, "ic-20")}</span>
          <span class="pv-char">${product.char}</span>
          <span class="product-type">${product.type}</span>
        </span>
        <span class="product-body">
          <span class="product-cat">${CATS[product.cat].name}</span>
          <span class="product-title">${escapeHtml(product.title)}</span>
          <span class="product-sub">${escapeHtml(product.subtitle)}</span>
          <span class="product-price-row">
            <span class="product-price">¥${moneyInt(product.price)}</span>
            <span class="quota-tag ${status.full ? "full" : "partial"}">${status.label}</span>
            <span class="product-go">${icon("arrow", "ic-11")}</span>
          </span>
        </span>
      </button>
    `;
  }

  function renderHomeProducts() {
    const wrap = $("#homeProducts");
    if (!wrap) return;
    const products = PRODUCTS.filter(item => item.recommended).slice(0, 4);
    wrap.innerHTML = products.map(productCard).join("");
  }

  function articleCover(article, mode) {
    const cat = CATS[article.cat];
    const cls = mode === "row" ? "article-row-cover" : "article-feature-cover";
    return `
      <span class="${cls} ${coverClass(article.cat)}">
        <span class="cover-cat">${cat.name}</span>
        <span class="cover-char">${cat.char}</span>
        <span class="cover-quote">${escapeHtml(article.coverQuote || cat.quote)}</span>
      </span>
    `;
  }

  function articleMeta(article) {
    return `
      <span class="article-meta">
        <span class="mini-avatar" style="background:${avatarColor(article.author)}">${escapeHtml(article.author.slice(0, 1))}</span>
        <span>${escapeHtml(article.author)}</span>
        <span class="dot"></span>
        <span>${escapeHtml(article.role || "星河科技")}</span>
        <span class="like">${icon("heart", "ic-11")}<span data-like-count="${article.id}">${article.likes}</span></span>
      </span>
    `;
  }

  function articleFeature(article, large) {
    const cat = CATS[article.cat];
    return `
      <button class="article-feature${large ? " large" : ""}" type="button" data-article="${article.id}">
        <span class="article-feature-cover ${coverClass(article.cat)}">
          <span class="cover-cat">${cat.name}</span>
          <span class="cover-char">${cat.char}</span>
          <span class="cover-quote">${escapeHtml(article.coverQuote || cat.quote)}</span>
        </span>
        <span class="article-feature-body">
          <span class="article-feature-title">${escapeHtml(article.title)}</span>
          <span class="article-excerpt">${escapeHtml(article.excerpt)}</span>
          ${articleMeta(article)}
        </span>
      </button>
    `;
  }

  function articleRow(article) {
    const cat = CATS[article.cat];
    return `
      <button class="article-row" type="button" data-article="${article.id}">
        <span class="article-row-cover ${coverClass(article.cat)}">
          <span class="cover-char">${cat.char}</span>
        </span>
        <span class="article-row-body">
          <span class="article-row-cat">${cat.name}</span>
          <span class="article-row-title">${escapeHtml(article.title)}</span>
          <span class="article-row-meta">
            ${escapeHtml(article.author)} · ${escapeHtml(article.date)}
            <span class="like">${icon("heart", "ic-11")}<span data-like-count="${article.id}">${article.likes}</span></span>
          </span>
        </span>
      </button>
    `;
  }

  function renderHomeJournal() {
    const wrap = $("#homeJournal");
    if (!wrap) return;
    const featured = state.articles.find(item => item.featured) || state.articles[0];
    const others = state.articles.filter(item => item.id !== featured.id).slice(0, 2);
    wrap.innerHTML = `${articleFeature(featured, false)}${others.map(articleRow).join("")}`;
  }

  function renderMallCats() {
    const wrap = $("#mallCats");
    if (!wrap) return;
    const cats = [{ key: "all", name: "全部" }, ...CAT_ORDER.map(key => ({ key, name: CATS[key].short }))];
    wrap.innerHTML = cats.map(cat => `
      <button class="filter-chip${state.mallCat === cat.key ? " is-active" : ""}" type="button" role="tab" aria-selected="${state.mallCat === cat.key}" data-mall-cat="${cat.key}">
        ${cat.name}
      </button>
    `).join("");
  }

  function renderMallFilters() {
    $$("#mallFilters [data-mall-filter]").forEach(button => {
      button.classList.toggle("is-active", button.dataset.mallFilter === state.mallFilter);
    });
  }

  function renderMall() {
    renderMallCats();
    renderMallFilters();
    const count = $("#mallCount");
    const grid = $("#productGrid");
    if (!grid) return;

    const products = PRODUCTS.filter(product => {
      if (state.mallCat !== "all" && product.cat !== state.mallCat) return false;
      const status = quotaForProduct(product);
      if (state.mallFilter === "full" && !status.full) return false;
      if (state.mallFilter === "partial" && status.full) return false;
      return true;
    });

    if (count) count.textContent = `共 ${products.length} 件好物与服务`;
    grid.innerHTML = products.length
      ? products.map(productCard).join("")
      : `<div class="empty-box" style="grid-column:1/-1">${icon("search", "ic-26")}没有找到符合条件的兑换品，试试其他分类。</div>`;
  }

  function renderArticleCats() {
    const wrap = $("#articleCats");
    if (!wrap) return;
    const cats = [{ key: "all", name: "全部" }, ...CAT_ORDER.map(key => ({ key, name: CATS[key].short }))];
    wrap.innerHTML = cats.map(cat => `
      <button class="filter-chip${state.articleCat === cat.key ? " is-active" : ""}" type="button" role="tab" aria-selected="${state.articleCat === cat.key}" data-article-cat="${cat.key}">
        ${cat.name}
      </button>
    `).join("");
  }

  function renderDiscover() {
    renderArticleCats();
    const featureWrap = $("#discoverFeature");
    const list = $("#articleList");
    if (!featureWrap || !list) return;

    const filtered = state.articles.filter(article => state.articleCat === "all" || article.cat === state.articleCat);
    const featured = filtered.find(article => article.featured) || filtered[0] || state.articles[0];
    const rest = filtered.filter(article => article.id !== featured.id);

    featureWrap.innerHTML = articleFeature(featured, true);
    list.innerHTML = rest.length
      ? rest.map(articleRow).join("")
      : `<div class="empty-box">这个分类的更多故事正在路上，也欢迎你写下自己的五好日常。</div>`;
  }

  function benefitCard(benefit) {
    const cat = CATS[benefit.cat];
    return `
      <div class="benefit-card">
        <span class="benefit-icon">${icon(cat.icon, "ic-20")}</span>
        <div class="benefit-main">
          <p class="benefit-cat">${cat.name}</p>
          <p class="benefit-title">${escapeHtml(benefit.title)}</p>
          <p class="benefit-meta">${escapeHtml(benefit.desc)}</p>
        </div>
        <div class="benefit-side">
          <b>${benefit.remaining} 次</b>
          <small>剩余可用</small>
          <button class="benefit-go" type="button" data-benefit-cat="${benefit.cat}">去使用 ${icon("chev-right", "ic-11")}</button>
        </div>
      </div>
    `;
  }

  function redemptionCard(redemption) {
    const cat = CATS[redemption.cat];
    const isNew = state.highlightRedemptionId === redemption.id;
    return `
      <button class="redeem-card${isNew ? " is-new" : ""}" type="button" data-redemption="${redemption.id}">
        <span class="redeem-cover pv-${redemption.cat}">
          <span class="redeem-cover-icon">${icon(cat.icon, "ic-17")}</span>
          <span class="pv-char">${cat.char}</span>
        </span>
        <span class="redeem-body">
          <span class="redeem-body-top">
            <span class="redeem-title">${escapeHtml(redemption.title)}</span>
            <span class="redeem-status ${redemption.status === "已完成" ? "done" : ""}">${redemption.status}</span>
          </span>
          <span class="redeem-date">${redemption.date} · ${redemption.type}</span>
          <span class="redeem-amount">额度 ¥${moneyInt(redemption.quotaUsed)}${redemption.selfPay ? ` <i>+ 自付 ¥${money(redemption.selfPay)}</i>` : " · 自付 ¥0"}</span>
        </span>
      </button>
    `;
  }

  function ledgerItem(item) {
    return `
      <div class="ledger-item">
        <span class="ledger-date">${escapeHtml(item.date)}</span>
        <div class="ledger-main">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.sub)}${item.selfPay ? ` · 自付 ¥${money(item.selfPay)}` : ""}</p>
        </div>
        <div>
          <span class="ledger-amount${item.amount > 0 ? " positive" : ""}">${item.amount > 0 ? "+" : "-"}¥${moneyInt(Math.abs(item.amount))}</span>
          <span class="ledger-balance">余额 ¥${moneyInt(item.balance)}</span>
        </div>
      </div>
    `;
  }

  function healthCardHtml() {
    const profile = HEALTH_PROFILE;
    return `
      <div class="health-card">
        <div class="health-card-head">
          <b>我的健康档案</b>
          <span class="health-completeness">完整度 ${profile.completeness}%</span>
        </div>
        <div class="health-metrics">
          <div class="health-metric"><b>${profile.bmi}</b><span>BMI</span></div>
          <div class="health-metric"><b>${escapeHtml(profile.bloodPressure)}</b><span>血压 mmHg</span></div>
          <div class="health-metric"><b>${escapeHtml(profile.sleepHours)}h</b><span>睡眠</span></div>
        </div>
        <div class="health-outputs">
          <button class="health-output" type="button" data-subpage="recipe">
            <b>定制食谱</b><small>${RECIPE.updated.slice(5)} 更新</small>
          </button>
          <button class="health-output" type="button" data-subpage="reports">
            <b>体检报告</b><small>10.18 已解读</small>
          </button>
          <button class="health-output" type="button" data-subpage="reports">
            <b>睡眠报告</b><small>09.06 已完成</small>
          </button>
        </div>
        <button class="health-card-link" type="button" data-subpage="health">
          查看 / 编辑健康档案 ${icon("chev-right", "ic-12")}
        </button>
      </div>
    `;
  }

  function renderMyMenu() {
    const wrap = $("#myMenu");
    if (!wrap) return;
    const readCount = state.readHistory.filter(id => getArticle(id)).length;
    const groups = [
      {
        label: "我的健康",
        items: [
          { key: "recipe", icon: "bowl", title: "定制食谱", desc: "基于健康档案的一周菜谱", count: "本周" },
          { key: "reports", icon: "receipt", title: "评估报告", desc: "体检、睡眠、营养等评估", count: REPORTS.length }
        ]
      },
      {
        label: "我的服务",
        items: [
          { key: "benefits", icon: "shield", title: "权益", desc: "专属健康权益与使用次数", count: BENEFITS.length },
          { key: "redemptions", icon: "gift", title: "兑换", desc: "已兑换的商品与服务", count: state.redemptions.length },
          { key: "articles", icon: "book", title: "文章", desc: "最近阅读的五好故事", count: readCount }
        ]
      }
    ];
    wrap.innerHTML = groups.map(group => `
      <p class="my-menu-label">${group.label}</p>
      <div class="my-menu">
        ${group.items.map(item => `
          <button class="my-menu-item" type="button" data-subpage="${item.key}">
            <span class="my-menu-icon">${icon(item.icon, "ic-19")}</span>
            <span class="my-menu-copy">
              <b>${item.title}</b>
              <small>${item.desc}</small>
            </span>
            ${item.count === null ? "" : `<span class="my-menu-count">${item.count}</span>`}
            <span class="my-menu-arrow">${icon("chev-right", "ic-14")}</span>
          </button>
        `).join("")}
      </div>
    `).join("");
  }

  function renderMy() {
    updateQuotaDisplays();
    const healthCard = $("#myHealthCard");
    if (healthCard) healthCard.innerHTML = healthCardHtml();
    renderMyMenu();
  }

  function renderAll() {
    renderFiveRail();
    renderHomeProducts();
    renderHomeJournal();
    renderMall();
    renderDiscover();
    renderMy();
    updateQuotaDisplays();
    updateNav();
  }

  /* ---------------------------------------------------------
     Navigation
     --------------------------------------------------------- */

  const VIEWS = ["home", "mall", "discover", "me"];

  function updateNav() {
    $$(".tab").forEach(tab => {
      const active = tab.dataset.nav === state.view;
      tab.classList.toggle("is-active", active);
      if (active) tab.setAttribute("aria-current", "page");
      else tab.removeAttribute("aria-current");
    });
  }

  function navigate(view, options) {
    const opts = options || {};
    const next = VIEWS.includes(view) ? view : "home";
    state.subpage = null;
    state.view = next;
    $(".app")?.classList.remove("subpage-open");
    $$(".view").forEach(section => {
      const active = section.dataset.view === next;
      section.hidden = !active;
      section.classList.toggle("is-active", active);
    });
    updateNav();
    if (!opts.keepScroll) window.scrollTo(0, 0);
    if (history.replaceState) history.replaceState(null, "", `#${next}`);
    if (next === "mall") renderMall();
    if (next === "discover") renderDiscover();
    if (next === "me") renderMy();
    updateQuotaDisplays();
  }

  const SUBPAGE_META = {
    benefits: { title: "权益", eyebrow: "MY BENEFITS" },
    redemptions: { title: "兑换", eyebrow: "MY REDEMPTIONS" },
    articles: { title: "我的阅读", eyebrow: "MY READING" },
    ledger: { title: "使用明细", eyebrow: "QUOTA LEDGER" },
    health: { title: "健康档案", eyebrow: "MY HEALTH PROFILE" },
    recipe: { title: "定制食谱", eyebrow: "MY RECIPE" },
    reports: { title: "评估报告", eyebrow: "MY REPORTS" }
  };

  function computeBmi(height, weight) {
    const h = Number(height) / 100;
    if (!h || !weight) return HEALTH_PROFILE.bmi;
    return (Number(weight) / (h * h)).toFixed(1);
  }

  function healthProfilePageHtml() {
    const p = HEALTH_PROFILE;
    return `
      <div class="health-profile-hero">
        <div class="health-profile-top">
          <div>
            <p>更新于 ${escapeHtml(p.updatedAt)}</p>
            <h2>${escapeHtml(p.name)}的健康档案</h2>
          </div>
          <span class="health-profile-score"><b>${p.completeness}</b><span>完整度</span></span>
        </div>
        <button class="edit-health-btn" type="button" data-action="edit-health">编辑健康档案</button>

        <div class="hp-grid">
          <div class="hp-item"><span>性别</span><b>${escapeHtml(p.gender)}</b></div>
          <div class="hp-item"><span>年龄</span><b>${escapeHtml(p.age)} 岁</b></div>
          <div class="hp-item"><span>身高</span><b>${escapeHtml(p.height)} cm</b></div>
          <div class="hp-item"><span>体重</span><b>${escapeHtml(p.weight)} kg</b></div>
          <div class="hp-item"><span>BMI</span><b>${escapeHtml(p.bmi)}</b></div>
          <div class="hp-item"><span>静息心率</span><b>${escapeHtml(p.restingHeartRate)} bpm</b></div>
        </div>
      </div>

      <div class="hp-section">
        <div class="hp-section-title">健康指标</div>
        <div class="hp-grid">
          <div class="hp-item"><span>血压</span><b>${escapeHtml(p.bloodPressure)} mmHg</b></div>
          <div class="hp-item"><span>空腹血糖</span><b>${escapeHtml(p.fastingGlucose)} mmol/L</b></div>
          <div class="hp-item"><span>平均睡眠</span><b>${escapeHtml(p.sleepHours)} 小时</b></div>
          <div class="hp-item"><span>运动频率</span><b>${escapeHtml(p.exercise)}</b></div>
        </div>
      </div>

      <div class="hp-section">
        <div class="hp-section-title">生活方式</div>
        <div class="hp-grid">
          <div class="hp-item"><span>饮食偏好</span><b>${escapeHtml(p.diet)}</b></div>
          <div class="hp-item"><span>吸烟 / 饮酒</span><b>${escapeHtml(p.smoker)} · ${escapeHtml(p.alcohol)}</b></div>
        </div>
      </div>

      <div class="hp-section">
        <div class="hp-section-title">病史与过敏</div>
        <div class="hp-grid">
          <div class="hp-item"><span>过敏史</span><b>${escapeHtml(p.allergies)}</b></div>
          <div class="hp-item"><span>既往病史</span><b>${escapeHtml(p.history)}</b></div>
          <div class="hp-item" style="grid-column:1/-1"><span>家族史</span><b>${escapeHtml(p.familyHistory)}</b></div>
        </div>
      </div>

      <div class="hp-section">
        <div class="hp-section-title">健康目标</div>
        <div class="hp-goals">
          ${p.goals.map(goal => `<span class="hp-goal">${escapeHtml(goal)}</span>`).join("")}
        </div>
      </div>

      <button class="subpage-link" type="button" data-subpage="recipe">查看基于档案生成的定制食谱 ${icon("arrow", "ic-13")}</button>
      <p class="hp-note">健康档案仅用于五好企康服务中的评估、食谱与推荐，你可以随时编辑或联系健康管家更新。医疗数据以专业机构报告为准。</p>
    `;
  }

  function recipeBasisText() {
    const p = HEALTH_PROFILE;
    return `基于健康档案：BMI ${p.bmi} · 空腹血糖 ${p.fastingGlucose} mmol/L · ${p.diet}；当前目标为${p.goals.join("、")}。`;
  }

  function relatedCard(product) {
    const status = quotaForProduct(product);
    return `
      <button class="related-card" type="button" data-product="${product.id}">
        <span class="related-visual pv-${product.cat}">
          <span class="related-icon">${icon(product.icon, "ic-17")}</span>
          <span class="related-type">${product.type}</span>
          <span class="pv-char">${product.char}</span>
        </span>
        <span class="related-copy">
          <b>${escapeHtml(product.title)}</b>
          <small>¥${moneyInt(product.price)} · ${escapeHtml(product.subtitle)}</small>
          <span class="quota-tag ${status.full ? "full" : "partial"}">${status.label}</span>
        </span>
      </button>
    `;
  }

  function relatedGridHtml(ids) {
    const products = ids.map(id => getProduct(id)).filter(Boolean);
    return `<div class="related-grid">${products.map(relatedCard).join("")}</div>`;
  }

  function recipeDetailHtml(index) {
    const day = RECIPE.days[index] || RECIPE.days[0];
    return `
      <div class="recipe-detail-head">
        <div>
          <span>${escapeHtml(day.day)}</span>
          <b>${escapeHtml(day.theme)}</b>
        </div>
        <span class="recipe-detail-note">营养师搭配 · 少油少盐</span>
      </div>
      <div class="recipe-meals">
        ${day.meals.map(meal => `<div class="recipe-meal"><span>${escapeHtml(meal[0])}</span><div>${escapeHtml(meal[1])}</div></div>`).join("")}
      </div>
      <div class="recipe-detail-recommend">
        <div class="hp-section-title">推荐</div>
        ${relatedGridHtml(day.recommend)}
      </div>
    `;
  }

  function recipePageHtml() {
    const activeIndex = Math.min(Math.max(state.recipeIndex, 0), RECIPE.days.length - 1);
    state.recipeIndex = activeIndex;
    return `
      <div class="recipe-hero">
        <p class="eyebrow">PERSONALIZED NUTRITION</p>
        <h2>${escapeHtml(RECIPE.title)}</h2>
        <p>${escapeHtml(recipeBasisText())}</p>
        <div class="recipe-byline">
          <span>${escapeHtml(RECIPE.nutritionist)}</span>
          <span>更新于 ${escapeHtml(RECIPE.updated)}</span>
          <span>依据健康档案生成</span>
        </div>
      </div>

      <div class="recipe-principles">
        <b>营养师原则：</b>
        <p>${escapeHtml(RECIPE.principles)}</p>
      </div>

      <div class="hp-section">
        <div class="hp-section-title">选择食谱</div>
        <div class="recipe-rail" role="tablist" aria-label="一周食谱">
          ${RECIPE.days.map((day, index) => `
            <button class="recipe-tab${index === activeIndex ? " is-active" : ""}" type="button" role="tab" aria-selected="${index === activeIndex}" data-recipe-day="${index}">
              <span class="recipe-tab-day">${escapeHtml(day.day)}</span>
              <b>${escapeHtml(day.theme)}</b>
              <small>${escapeHtml(day.meals[0][1])}</small>
            </button>
          `).join("")}
        </div>
        <div class="recipe-detail" id="recipeDetail">
          ${recipeDetailHtml(activeIndex)}
        </div>
      </div>

      <div class="hp-section">
        <div class="hp-section-title">本周采购清单</div>
        <div class="recipe-shopping">
          ${RECIPE.shopping.map(item => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </div>

      <button class="subpage-link" type="button" data-report="rep3">查看营养评估报告 ${icon("arrow", "ic-13")}</button>
      <p class="hp-note">食谱由营养师根据你的健康档案生成，建议结合体检指标与身体感受调整；如有特殊疾病或饮食禁忌，请先咨询医生或营养师。</p>
    `;
  }

  function reportCard(report) {
    const cat = CATS[report.cat];
    return `
      <button class="report-card" type="button" data-report="${report.id}">
        <span class="report-icon">${icon(cat.icon, "ic-18")}</span>
        <span class="report-copy">
          <span class="report-cat">${cat.name} · ${report.type}</span>
          <span class="report-title">${escapeHtml(report.title)}</span>
          <span class="report-meta">${report.date} · ${escapeHtml(report.org)}</span>
        </span>
        <span class="report-status">${escapeHtml(report.status)}</span>
      </button>
    `;
  }

  function reportsPageHtml() {
    return `
      <div class="subpage-lead">
        <b>${REPORTS.length} 份评估报告</b>
        <p>体检、睡眠、营养、运动与心理评估结果，都会沉淀在这里。</p>
      </div>
      <div class="report-list">${REPORTS.map(reportCard).join("")}</div>
      <p class="hp-note">报告由北大医疗各专业中心出具，具体诊断与治疗建议请以医生面诊为准。</p>
    `;
  }

  function openReportDetail(reportId) {
    const report = REPORTS.find(item => item.id === reportId);
    if (!report) return;
    const cat = CATS[report.cat];
    const html = `
      <div class="report-detail-cover ${coverClass(report.cat)}">
        <span class="cover-cat">${cat.name} · ${report.type}</span>
        <span class="cover-char">${cat.char}</span>
        <span class="cover-quote">${escapeHtml(cat.quote)}</span>
      </div>
      <div class="report-detail-body">
        <h2>${escapeHtml(report.title)}</h2>
        <p class="report-detail-org">${report.date} · ${escapeHtml(report.org)} · ${escapeHtml(report.status)}</p>
        <p class="report-summary">${escapeHtml(report.summary)}</p>
        <div class="report-metrics">
          ${report.metrics.map(metric => `<div class="report-metric"><span>${escapeHtml(metric.label)}</span><b>${escapeHtml(metric.value)}</b></div>`).join("")}
        </div>
        <div class="hp-section">
          <div class="hp-section-title">报告解读</div>
          <p class="sheet-desc">${escapeHtml(report.interpretation)}</p>
        </div>
        <div class="hp-section">
          <div class="hp-section-title">下一步建议</div>
          <div class="report-recommend-list">
            ${report.recommendations.map(item => `<p>${icon("check", "ic-13")}${escapeHtml(item)}</p>`).join("")}
          </div>
        </div>
        <div class="hp-section">
          <div class="hp-section-title">推荐</div>
          ${relatedGridHtml(report.products)}
        </div>
        <button class="subpage-link" type="button" data-action="service">预约健康管家解读报告 ${icon("arrow", "ic-13")}</button>
      </div>
    `;
    openSheet(html);
  }

  function openHealthEdit() {
    const p = HEALTH_PROFILE;
    const html = `
      <div class="health-form">
        <p class="eyebrow">EDIT HEALTH PROFILE</p>
        <h2>编辑健康档案</h2>
        <p>档案越完整，食谱与健康建议越贴近你的真实需要。</p>
        <form id="healthForm">
          <div class="health-form-grid">
            <div class="form-field">
              <label>性别</label>
              <select class="form-input" name="gender">
                <option${p.gender === "女" ? " selected" : ""}>女</option>
                <option${p.gender === "男" ? " selected" : ""}>男</option>
              </select>
            </div>
            <div class="form-field">
              <label>年龄</label>
              <input class="form-input" name="age" type="number" min="18" max="70" value="${escapeHtml(p.age)}" />
            </div>
            <div class="form-field">
              <label>身高（cm）</label>
              <input class="form-input" name="height" type="number" min="120" max="220" value="${escapeHtml(p.height)}" />
            </div>
            <div class="form-field">
              <label>体重（kg）</label>
              <input class="form-input" name="weight" type="number" min="30" max="200" step="0.1" value="${escapeHtml(p.weight)}" />
            </div>
            <div class="form-field">
              <label>血压（mmHg）</label>
              <input class="form-input" name="bloodPressure" value="${escapeHtml(p.bloodPressure)}" />
            </div>
            <div class="form-field">
              <label>空腹血糖（mmol/L）</label>
              <input class="form-input" name="fastingGlucose" value="${escapeHtml(p.fastingGlucose)}" />
            </div>
            <div class="form-field">
              <label>静息心率（bpm）</label>
              <input class="form-input" name="restingHeartRate" value="${escapeHtml(p.restingHeartRate)}" />
            </div>
            <div class="form-field">
              <label>平均睡眠（小时）</label>
              <input class="form-input" name="sleepHours" type="number" min="0" max="16" step="0.1" value="${escapeHtml(p.sleepHours)}" />
            </div>
            <div class="form-field full">
              <label>运动频率</label>
              <input class="form-input" name="exercise" value="${escapeHtml(p.exercise)}" />
            </div>
            <div class="form-field full">
              <label>饮食偏好</label>
              <input class="form-input" name="diet" value="${escapeHtml(p.diet)}" />
            </div>
            <div class="form-field">
              <label>吸烟情况</label>
              <select class="form-input" name="smoker">
                <option${p.smoker === "不吸烟" ? " selected" : ""}>不吸烟</option>
                <option${p.smoker === "偶尔吸烟" ? " selected" : ""}>偶尔吸烟</option>
                <option${p.smoker === "每天吸烟" ? " selected" : ""}>每天吸烟</option>
              </select>
            </div>
            <div class="form-field">
              <label>饮酒情况</label>
              <select class="form-input" name="alcohol">
                <option${p.alcohol === "不饮酒" ? " selected" : ""}>不饮酒</option>
                <option${p.alcohol === "偶尔饮酒" ? " selected" : ""}>偶尔饮酒</option>
                <option${p.alcohol === "经常饮酒" ? " selected" : ""}>经常饮酒</option>
              </select>
            </div>
            <div class="form-field full">
              <label>过敏史</label>
              <input class="form-input" name="allergies" value="${escapeHtml(p.allergies)}" />
            </div>
            <div class="form-field full">
              <label>既往病史</label>
              <input class="form-input" name="history" value="${escapeHtml(p.history)}" />
            </div>
            <div class="form-field full">
              <label>家族史</label>
              <input class="form-input" name="familyHistory" value="${escapeHtml(p.familyHistory)}" />
            </div>
            <div class="form-field full">
              <label>健康目标 <small>用逗号分隔</small></label>
              <input class="form-input" name="goals" value="${escapeHtml(p.goals.join("、"))}" />
            </div>
          </div>
          <button class="health-save" type="submit">保存健康档案</button>
        </form>
      </div>
    `;
    openSheet(html);
  }

  function saveHealthProfile(form) {
    const data = new FormData(form);
    HEALTH_PROFILE.gender = data.get("gender") || HEALTH_PROFILE.gender;
    HEALTH_PROFILE.age = Number(data.get("age")) || HEALTH_PROFILE.age;
    HEALTH_PROFILE.height = Number(data.get("height")) || HEALTH_PROFILE.height;
    HEALTH_PROFILE.weight = Number(data.get("weight")) || HEALTH_PROFILE.weight;
    HEALTH_PROFILE.bmi = computeBmi(HEALTH_PROFILE.height, HEALTH_PROFILE.weight);
    HEALTH_PROFILE.bloodPressure = data.get("bloodPressure") || HEALTH_PROFILE.bloodPressure;
    HEALTH_PROFILE.fastingGlucose = data.get("fastingGlucose") || HEALTH_PROFILE.fastingGlucose;
    HEALTH_PROFILE.restingHeartRate = data.get("restingHeartRate") || HEALTH_PROFILE.restingHeartRate;
    HEALTH_PROFILE.sleepHours = data.get("sleepHours") || HEALTH_PROFILE.sleepHours;
    HEALTH_PROFILE.exercise = data.get("exercise") || HEALTH_PROFILE.exercise;
    HEALTH_PROFILE.diet = data.get("diet") || HEALTH_PROFILE.diet;
    HEALTH_PROFILE.smoker = data.get("smoker") || HEALTH_PROFILE.smoker;
    HEALTH_PROFILE.alcohol = data.get("alcohol") || HEALTH_PROFILE.alcohol;
    HEALTH_PROFILE.allergies = data.get("allergies") || HEALTH_PROFILE.allergies;
    HEALTH_PROFILE.history = data.get("history") || HEALTH_PROFILE.history;
    HEALTH_PROFILE.familyHistory = data.get("familyHistory") || HEALTH_PROFILE.familyHistory;
    const goals = String(data.get("goals") || "")
      .split(/[,，、]/)
      .map(item => item.trim())
      .filter(Boolean);
    if (goals.length) HEALTH_PROFILE.goals = goals;
    HEALTH_PROFILE.completeness = 100;
    const now = new Date();
    HEALTH_PROFILE.updatedAt = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
    closeSheet();
    if (state.subpage === "health") renderSubpage();
    renderMy();
    showToast("健康档案已更新，食谱与推荐已同步");
  }

  function openSubpage(type) {
    if (!SUBPAGE_META[type]) return;
    if (sheet?.classList.contains("is-open")) closeSheet();
    if (state.view !== "me") navigate("me");
    state.subpage = type;
    $(".app")?.classList.add("subpage-open");
    $$(".view").forEach(section => {
      const active = section.dataset.view === "subpage";
      section.hidden = !active;
      section.classList.toggle("is-active", active);
    });
    updateNav();
    window.scrollTo(0, 0);
    renderSubpage();
  }

  function renderSubpage() {
    const type = state.subpage;
    if (!type) return;
    const meta = SUBPAGE_META[type];
    const title = $("#subpageTitle");
    const eyebrow = $("#subpageEyebrow");
    const content = $("#subpageContent");
    if (title) title.textContent = meta.title;
    if (eyebrow) eyebrow.textContent = meta.eyebrow;
    if (!content) return;

    if (type === "health") {
      content.innerHTML = healthProfilePageHtml();
      return;
    }

    if (type === "recipe") {
      content.innerHTML = recipePageHtml();
      return;
    }

    if (type === "reports") {
      content.innerHTML = reportsPageHtml();
      return;
    }

    if (type === "benefits") {
      content.innerHTML = `
        <div class="subpage-lead">
          <b>${BENEFITS.length} 项专属权益</b>
          <p>由企业年度健康方案配置，可在对应五好服务中使用。</p>
        </div>
        ${BENEFITS.map(benefitCard).join("")}
        <p class="mall-tip">${icon("info", "ic-14")}权益次数与使用规则以企业最终配置为准。</p>
      `;
      return;
    }

    if (type === "redemptions") {
      content.innerHTML = `
        <div class="subpage-lead">
          <b>${state.redemptions.length} 次兑换</b>
          <p>这里记录你用健康额度兑换的商品与服务。</p>
        </div>
        ${state.redemptions.length
          ? state.redemptions.map(redemptionCard).join("")
          : `<div class="empty-box">${icon("gift", "ic-30")}还没有兑换记录，去五好商城挑一件喜欢的吧。</div>`}
      `;
      return;
    }

    if (type === "ledger") {
      content.innerHTML = `
        <div class="subpage-quota-summary">
          <div><span>总额度</span><b>¥${money(state.quota.total)}</b></div>
          <div><span>已使用</span><b data-quota-used-full>¥${money(state.quota.used)}</b></div>
          <div><span>可用额度</span><b data-quota-available-full>¥${money(state.quota.available)}</b></div>
        </div>
        <div class="subpage-lead">
          <b>额度流水</b>
          <p>企业发放、额度兑换与余额变化，每一笔都可查询。</p>
        </div>
        ${state.ledger.map(ledgerItem).join("")}
      `;
      updateQuotaDisplays();
      return;
    }

    if (type === "articles") {
      const readArticles = state.readHistory.map(id => getArticle(id)).filter(Boolean);
      content.innerHTML = `
        <div class="subpage-lead">
          <b>最近阅读</b>
          <p>你读过的五好故事会留在这里。</p>
        </div>
        ${readArticles.length
          ? readArticles.map(articleRow).join("")
          : `<div class="empty-box">${icon("book", "ic-30")}还没有阅读记录，去五好刊物看看吧。</div>`}
        <button class="subpage-link" type="button" data-go="discover">去五好刊物看看 ${icon("arrow", "ic-13")}</button>
      `;
    }
  }

  function closeSubpage() {
    if (!state.subpage) return;
    state.subpage = null;
    $(".app")?.classList.remove("subpage-open");
    navigate("me");
  }

  /* ---------------------------------------------------------
     Sheets
     --------------------------------------------------------- */

  const sheet = $("#sheet");
  const sheetContent = $("#sheetContent");
  const sheetBackdrop = $("#sheetBackdrop");

  function openSheet(html, onReady) {
    if (!sheet || !sheetContent) return;
    sheetContent.innerHTML = html;
    sheetContent.scrollTop = 0;
    sheet.classList.add("is-open");
    sheet.removeAttribute("aria-hidden");
    sheet.inert = false;
    sheetBackdrop.classList.add("is-open");
    document.body.classList.add("no-scroll");
    if (typeof onReady === "function") setTimeout(onReady, 60);
  }

  function closeSheet() {
    if (!sheet) return;
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    sheet.inert = true;
    sheetBackdrop.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    state.selectedProductId = null;
    state.selectedArticleId = null;
  }

  if (sheetBackdrop) sheetBackdrop.addEventListener("click", closeSheet);
  $("#sheetClose")?.addEventListener("click", closeSheet);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && sheet && sheet.classList.contains("is-open")) closeSheet();
  });

  /* ---------------------------------------------------------
     Product + redemption
     --------------------------------------------------------- */

  function openProduct(productId) {
    const product = getProduct(productId);
    if (!product) return;
    state.selectedProductId = productId;
    const status = quotaForProduct(product);
    const cat = CATS[product.cat];

    const html = `
      <div class="sheet-cover pv-${product.cat}">
        <span class="sheet-cover-icon">${icon(product.icon, "ic-22")}</span>
        <span class="sheet-cover-type">${product.type} · ${cat.short}</span>
        <span class="pv-char">${product.char}</span>
        <span class="sheet-cover-copy">${escapeHtml(cat.quote)}</span>
      </div>
      <div class="sheet-block">
        <p class="sheet-cat">${cat.name}</p>
        <h2 class="sheet-title">${escapeHtml(product.title)}</h2>
        <p class="sheet-sub">${escapeHtml(product.subtitle)}</p>
        <div class="price-line">
          <b>¥${moneyInt(product.price)}<small> / 份</small></b>
          <span class="${status.full ? "full" : "partial"}">${status.full ? "可全额额度兑换" : "额度不足，需补差"}</span>
        </div>

        <div class="sheet-section">
          <h3>兑换说明</h3>
          <div class="include-list">
            ${product.includes.map(item => `<span class="include-item">${icon("check", "ic-13")}${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>

        <div class="sheet-section">
          <h3>服务详情</h3>
          <p class="sheet-desc">${escapeHtml(product.desc)}</p>
        </div>

        <div class="quota-panel">
          <div class="quota-panel-head">
            <span>本单额度使用</span>
            <b>可用 ¥${money(state.quota.available)}</b>
          </div>
          <div class="quota-breakdown-row"><span>健康额度抵扣</span><b>¥${money(status.quotaUse)}</b></div>
          <div class="quota-breakdown-row"><span>个人支付</span><b>¥${money(status.selfPay)}</b></div>
          <div class="quota-breakdown-row total"><span>兑换后额度余额</span><b>¥${money(state.quota.available - status.quotaUse)}</b></div>
        </div>

        <div class="sheet-footer">
          <div class="sheet-footer-copy">
            <span>${status.full ? "全额额度兑换" : "额度抵扣 + 个人补差"}</span>
            <b>${status.full ? `¥${moneyInt(product.price)} 额度` : `额度 ¥${moneyInt(status.quotaUse)} + 自付 ¥${moneyInt(status.selfPay)}`}</b>
            <small>${status.full ? "无需额外支付" : "个人补差部分为演示支付"}</small>
          </div>
          <button class="btn btn-primary" type="button" data-action="open-redeem" data-product-id="${product.id}">立即兑换</button>
        </div>
      </div>
    `;
    openSheet(html);
  }

  function openCategoryDetail(catKey) {
    const cat = CATS[catKey];
    if (!cat) return;
    const related = PRODUCTS.filter(item => item.cat === catKey).slice(0, 4);
    const outputs = SERVICE_OUTPUTS[catKey] || [];

    const html = `
      <div class="sheet-cover pv-${catKey}">
        <span class="sheet-cover-icon">${icon(cat.icon, "ic-22")}</span>
        <span class="sheet-cover-type">五好服务</span>
        <span class="pv-char">${cat.char}</span>
        <span class="sheet-cover-copy">${escapeHtml(cat.quote)}</span>
      </div>
      <div class="sheet-block">
        <p class="sheet-cat">${cat.name} · 服务详情</p>
        <h2 class="sheet-title">${escapeHtml(cat.tagline)}</h2>
        <p class="sheet-sub">${escapeHtml(cat.intro)}</p>

        <div class="sheet-section">
          <h3>服务内容</h3>
          <div class="include-list">
            ${cat.services.map(service => `<span class="include-item">${icon("check", "ic-13")}${escapeHtml(service)}</span>`).join("")}
          </div>
        </div>

        <div class="sheet-section">
          <h3>适合谁</h3>
          <p class="sheet-desc">${escapeHtml(cat.fit)}</p>
        </div>

        ${cat.relatedNote ? `
          <div class="category-related-note">
            ${icon("bag", "ic-17")}
            <p>${escapeHtml(cat.relatedNote)}</p>
          </div>
        ` : ""}

        ${outputs.length ? `
          <div class="sheet-section">
            <h3>我的服务成果</h3>
            <div class="outcome-list">
              ${outputs.map(output => `
                <button class="outcome-item" type="button" ${output.reportId ? `data-report="${output.reportId}"` : `data-subpage="${output.subpage}"`}>
                  <span class="outcome-icon">${icon(output.reportId ? "receipt" : "bowl", "ic-16")}</span>
                  <span class="outcome-copy">
                    <b>${escapeHtml(output.label)}</b>
                    <small>${escapeHtml(output.meta)}</small>
                  </span>
                  ${icon("chev-right", "ic-14")}
                </button>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <div class="sheet-section">
          <h3>推荐</h3>
          ${relatedGridHtml(related.map(product => product.id))}
        </div>

        <div class="sheet-footer">
          <div class="sheet-footer-copy">
            <span>${cat.name} · 额度可抵扣</span>
            <b>去商城看看</b>
          </div>
          <button class="btn btn-primary" type="button" data-go="mall" data-mall-cat="${catKey}">查看全部商品与服务</button>
        </div>
      </div>
    `;
    openSheet(html);
  }

  function openRedeem(productId) {
    const product = getProduct(productId);
    if (!product) return;
    const status = quotaForProduct(product);
    const cat = CATS[product.cat];
    const after = state.quota.available - status.quotaUse;

    const html = `
      <div class="sheet-title-bar">
        <button class="sheet-back" type="button" data-action="back-product" data-product-id="${product.id}" aria-label="返回">
          ${icon("arrow-left", "ic-16")}
        </button>
        <h2>确认兑换</h2>
      </div>
      <div class="confirm-product">
        <span class="confirm-cover pv-${product.cat}">
          <span class="pv-char">${product.char}</span>
        </span>
        <div class="confirm-info">
          <p>${cat.name} · ${product.type}</p>
          <h3>${escapeHtml(product.title)}</h3>
          <b>¥${moneyInt(product.price)}</b>
        </div>
      </div>
      <div class="confirm-box">
        <div class="quota-breakdown-row"><span>商品金额</span><b>¥${money(product.price)}</b></div>
        <div class="quota-breakdown-row"><span>健康额度抵扣</span><b>- ¥${money(status.quotaUse)}</b></div>
        <div class="quota-breakdown-row"><span>个人支付</span><b>${status.selfPay ? `¥${money(status.selfPay)}` : "¥0.00"}</b></div>
        <div class="quota-breakdown-row total"><span>兑换后额度余额</span><b>¥${money(after)}</b></div>
      </div>
      <div class="confirm-note">
        ${icon("info", "ic-14")}
        <span>${status.selfPay ? "本次兑换将使用全部可用额度，超出部分需个人支付；支付为演示流程。" : "本次兑换将全额使用健康额度，无需额外支付。"}兑换成功后可在「我的 - 兑换」查看记录。</span>
      </div>
      <div class="confirm-actions">
        <button class="btn btn-primary" type="button" data-action="confirm-redeem" data-product-id="${product.id}">
          ${status.selfPay ? `确认兑换并支付 ¥${moneyInt(status.selfPay)}` : "确认兑换"}
        </button>
        <p class="pay-note">点击确认即表示同意《五好企康兑换规则》</p>
      </div>
    `;
    openSheet(html);
  }

  function completeRedemption(productId) {
    const product = getProduct(productId);
    if (!product) return;
    const status = quotaForProduct(product);
    const now = new Date();
    const date = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
    const shortDate = `${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
    const orderNo = `WH${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(Math.floor(Math.random() * 900 + 100))}`;
    const newRedemption = {
      id: `r${Date.now()}`,
      productId: product.id,
      title: product.title,
      cat: product.cat,
      type: product.type,
      date,
      status: product.type === "服务" ? "待预约" : "待发货",
      quotaUsed: status.quotaUse,
      selfPay: status.selfPay,
      orderNo
    };

    state.quota.used += status.quotaUse;
    state.quota.available -= status.quotaUse;
    state.redemptions.unshift(newRedemption);
    state.ledger.unshift({
      id: `l${Date.now()}`,
      date: shortDate,
      title: `兑换「${product.title}」`,
      sub: `额度支出 · ${newRedemption.status}`,
      amount: -status.quotaUse,
      balance: state.quota.available,
      selfPay: status.selfPay
    });
    state.highlightRedemptionId = newRedemption.id;

    renderHomeProducts();
    renderMall();
    renderMy();
    updateQuotaDisplays();
    openSuccess(newRedemption);
  }

  function openSuccess(redemption) {
    const html = `
      <div class="success-wrap">
        <span class="success-mark">${icon("check", "ic-30")}</span>
        <h2>兑换成功</h2>
        <p>${redemption.selfPay ? `已使用健康额度 ¥${money(redemption.quotaUsed)}，个人支付 ¥${money(redemption.selfPay)}。` : `已使用健康额度 ¥${money(redemption.quotaUsed)}，无需额外支付。`}<br />${redemption.type === "服务" ? "服务顾问将与你联系预约时间。" : "商品将在 3 个工作日内安排发出。"}</p>
        <div class="success-balance">
          <span>兑换后可用额度</span>
          <b>¥${money(state.quota.available)}</b>
        </div>
        <div class="success-actions">
          <button class="btn btn-ghost" type="button" data-action="continue-shopping">继续逛逛</button>
          <button class="btn btn-primary" type="button" data-action="go-redemptions">查看我的兑换</button>
        </div>
      </div>
    `;
    openSheet(html);
  }

  function openRedemptionDetail(id) {
    const redemption = getRedemption(id);
    if (!redemption) return;
    const product = getProduct(redemption.productId);
    const cat = CATS[redemption.cat];
    const completed = redemption.status === "已签收" || redemption.status === "已完成";
    const secondDone = true;

    const html = `
      <div class="redeem-detail-head">
        <p class="eyebrow">REDEMPTION DETAIL</p>
        <h2>${escapeHtml(redemption.title)}</h2>
        <p>${redemption.date} · 订单号 ${redemption.orderNo}</p>
      </div>
      <div class="redeem-detail-body">
        <div class="status-timeline">
          <span class="status-step is-done">兑换成功</span>
          <span class="status-step${secondDone ? " is-done" : ""}">${redemption.type === "服务" ? "待预约" : "待发货"}</span>
          <span class="status-step${completed ? " is-done" : ""}">已完成</span>
        </div>
        <div class="redeem-detail-product">
          <span class="redeem-cover pv-${redemption.cat}">
            <span class="redeem-cover-icon">${icon(cat.icon, "ic-17")}</span>
            <span class="pv-char">${cat.char}</span>
          </span>
          <div>
            <h3>${escapeHtml(redemption.title)}</h3>
            <p>${cat.name} · ${redemption.type}</p>
            <p>状态：${redemption.status}</p>
          </div>
        </div>
        <div class="confirm-box" style="margin:0">
          <div class="quota-breakdown-row"><span>商品金额</span><b>¥${money((product ? product.price : redemption.quotaUsed + redemption.selfPay))}</b></div>
          <div class="quota-breakdown-row"><span>健康额度抵扣</span><b>- ¥${money(redemption.quotaUsed)}</b></div>
          <div class="quota-breakdown-row"><span>个人支付</span><b>${redemption.selfPay ? `¥${money(redemption.selfPay)}` : "¥0.00"}</b></div>
        </div>
        <div class="confirm-note">
          ${icon("info", "ic-14")}
          <span>${redemption.type === "服务" ? "服务地点：企业健康小屋 / 指定医疗机构；具体以健康管家预约为准。" : "配送至：星河科技 · 林小满；如有疑问请联系企业健康管家。"}</span>
        </div>
        <button class="btn btn-primary" style="width:100%;height:42px;font-size:9.5px" type="button" data-product="${redemption.productId}">
          ${redemption.type === "服务" ? "再次预约" : "再次兑换"}
        </button>
      </div>
    `;
    openSheet(html);
  }

  /* ---------------------------------------------------------
     Articles
     --------------------------------------------------------- */

  function articleContentHtml(article) {
    return article.content.map(part => {
      if (String(part).startsWith("> ")) return `<blockquote>${escapeHtml(String(part).slice(2))}</blockquote>`;
      return `<p>${escapeHtml(part)}</p>`;
    }).join("");
  }

  function openArticle(articleId) {
    const article = getArticle(articleId);
    if (!article) return;
    state.selectedArticleId = articleId;
    state.readHistory = [articleId, ...state.readHistory.filter(id => id !== articleId)];
    renderMyMenu();
    const cat = CATS[article.cat];
    const liked = state.likedIds.has(articleId);
    const related = state.articles.filter(item => item.id !== articleId).slice(0, 2);

    const html = `
      <div class="article-detail-cover ${coverClass(article.cat)}">
        <span class="cover-cat">${cat.name}</span>
        <span class="cover-char">${cat.char}</span>
        <span class="cover-quote">${escapeHtml(article.coverQuote || cat.quote)}</span>
      </div>
      <div class="article-detail-body">
        <h1>${escapeHtml(article.title)}</h1>
        <p class="article-detail-lead">${escapeHtml(article.excerpt)}</p>
        <div class="article-detail-meta">
          <span class="mini-avatar" style="background:${avatarColor(article.author)}">${escapeHtml(article.author.slice(0, 1))}</span>
          <b>${escapeHtml(article.author)}</b>
          <span>${escapeHtml(article.role || "星河科技")}</span>
          <span class="dot"></span>
          <span>${escapeHtml(article.date)}</span>
          <span class="dot"></span>
          <span>${escapeHtml(article.read)}阅读</span>
        </div>
        <div class="article-content">${articleContentHtml(article)}</div>
        <div class="article-actions">
          <button class="like-button${liked ? " is-liked" : ""}" type="button" data-like="${article.id}">
            ${icon("heart", "ic-14")} <span data-like-count="${article.id}">${article.likes}</span>
          </button>
          <span class="comment-count">${icon("comment", "ic-13")}${article.comments} 条留言</span>
        </div>
        <div class="author-card">
          <span class="mini-avatar" style="background:${avatarColor(article.author)}">${escapeHtml(article.author.slice(0, 1))}</span>
          <div><b>${escapeHtml(article.author)}</b><span>${escapeHtml(article.role || "星河科技")} · 五好刊物作者</span></div>
          <span class="author-follow">关注</span>
        </div>
        <div class="sheet-section">
          <h3>相关阅读</h3>
          ${related.map(articleRow).join("")}
        </div>
      </div>
    `;
    openSheet(html);
  }

  function toggleLike(articleId) {
    const article = getArticle(articleId);
    if (!article) return;
    const liked = state.likedIds.has(articleId);
    if (liked) {
      state.likedIds.delete(articleId);
      article.likes = Math.max(0, article.likes - 1);
    } else {
      state.likedIds.add(articleId);
      article.likes += 1;
    }
    const button = $(`.like-button[data-like="${articleId}"]`);
    if (button) {
      button.classList.toggle("is-liked", !liked);
      const count = $("[data-like-count]", button);
      if (count) count.textContent = article.likes;
    }
    $$(`[data-like-count="${articleId}"]`).forEach(el => { el.textContent = article.likes; });
    showToast(liked ? "已取消喜欢" : "已收藏这份五好灵感");
  }

  /* ---------------------------------------------------------
     Search / notifications / quota info / service
     --------------------------------------------------------- */

  const HOT_SEARCHES = ["好好睡觉", "体检卡", "营养", "EAP", "肩颈", "多导睡眠"];

  function openSearch() {
    const html = `
      <div class="search-wrap">
        <div class="search-box">
          ${icon("search", "ic-18")}
          <input id="globalSearch" type="search" placeholder="搜索商品、服务或文章" autocomplete="off" />
        </div>
        <div id="searchBody">
          <p class="search-label">热门搜索</p>
          <div class="hot-chips">
            ${HOT_SEARCHES.map(term => `<button class="hot-chip" type="button" data-search-term="${term}">${term}</button>`).join("")}
          </div>
        </div>
      </div>
    `;
    openSheet(html, () => {
      const input = $("#globalSearch");
      if (input) input.focus({ preventScroll: true });
    });
  }

  function renderSearchBody(query) {
    const body = $("#searchBody");
    if (!body) return;
    const q = query.trim().toLowerCase();

    if (!q) {
      body.innerHTML = `
        <p class="search-label">热门搜索</p>
        <div class="hot-chips">${HOT_SEARCHES.map(term => `<button class="hot-chip" type="button" data-search-term="${term}">${term}</button>`).join("")}</div>
        <p class="search-label">按五好分类找</p>
        <div class="hot-chips">${CAT_ORDER.map(key => `<button class="hot-chip" type="button" data-search-cat="${key}">${CATS[key].name}</button>`).join("")}</div>
      `;
      return;
    }

    const products = PRODUCTS.filter(product => {
      const haystack = `${product.title} ${product.subtitle} ${CATS[product.cat].name} ${product.desc}`.toLowerCase();
      return haystack.includes(q);
    }).slice(0, 5);

    const articles = state.articles.filter(article => {
      const haystack = `${article.title} ${article.excerpt} ${article.author} ${article.role} ${CATS[article.cat].name}`.toLowerCase();
      return haystack.includes(q);
    }).slice(0, 5);

    if (!products.length && !articles.length) {
      body.innerHTML = `<div class="search-empty">没有找到“${escapeHtml(query)}”，换个关键词试试。</div>`;
      return;
    }

    body.innerHTML = `
      ${products.length ? `
        <div class="search-group">
          <p class="search-label">好物与服务</p>
          ${products.map(product => `
            <button class="search-result" type="button" data-product="${product.id}">
              <span class="mini-cover pv-${product.cat}"><span class="pv-char">${product.char}</span></span>
              <span class="search-result-copy"><b>${escapeHtml(product.title)}</b><small>${CATS[product.cat].name} · ¥${moneyInt(product.price)}</small></span>
              ${icon("chev-right", "ic-14")}
            </button>
          `).join("")}
        </div>
      ` : ""}
      ${articles.length ? `
        <div class="search-group">
          <p class="search-label">五好文章</p>
          ${articles.map(article => `
            <button class="search-result" type="button" data-article="${article.id}">
              <span class="mini-cover ${coverClass(article.cat)}"><span class="cover-char">${CATS[article.cat].char}</span></span>
              <span class="search-result-copy"><b>${escapeHtml(article.title)}</b><small>${escapeHtml(article.author)} · ${CATS[article.cat].name}</small></span>
              ${icon("chev-right", "ic-14")}
            </button>
          `).join("")}
        </div>
      ` : ""}
    `;
  }

  function openNotifications() {
    const items = [
      { title: "企业健康额度已到账", desc: "星河科技为你发放 2026 年度健康额度 ¥3,000，可在五好商城自由兑换。", time: "今天 09:30", action: "mall" },
      { title: "助眠营养组合包已发货", desc: "你的兑换商品已安排发出，预计 11 月 2 日送达。", time: "昨天 18:20", action: "me-redemptions" },
      { title: "五好刊物上新", desc: "《从凌晨两点到十一点入睡，我只做了三件事》已被 128 位同事喜欢。", time: "11 月 2 日", action: "discover" }
    ];
    const html = `
      <div class="notif-wrap">
        <div class="notif-head">
          <h2>消息</h2>
          <button type="button" data-action="read-all">全部已读</button>
        </div>
        <div id="notifList">
          ${items.map((item, index) => `
            <button class="notif-item${index > 0 && !state.hasUnread ? " is-read" : ""}" type="button" data-notif-go="${item.action}" style="width:100%;text-align:left">
              <span class="notif-dot"></span>
              <div><b>${item.title}</b><p>${item.desc}</p><small>${item.time}</small></div>
            </button>
          `).join("")}
        </div>
      </div>
    `;
    openSheet(html);
  }

  function openQuotaInfo() {
    const html = `
      <div class="quota-info-wrap">
        <p class="eyebrow">HEALTH QUOTA</p>
        <h2>企业健康额度</h2>
        <p>由企业为员工配置的年度健康福利账户，可在五好商城自由兑换商品与服务。</p>
        <div class="quota-info-row">
          <span class="quota-info-icon">${icon("wallet", "ic-18")}</span>
          <div><b>企业发放，员工自主支配</b><p>额度由企业按年度配置，员工可根据自己的需要选择体检、营养、运动、睡眠或放松服务。</p></div>
        </div>
        <div class="quota-info-row">
          <span class="quota-info-icon">${icon("gift", "ic-18")}</span>
          <div><b>优先抵扣，支持个人补差</b><p>兑换时优先使用可用额度；商品价格高于额度时，可使用“额度抵扣 + 个人支付”的方式完成兑换。</p></div>
        </div>
        <div class="quota-info-row">
          <span class="quota-info-icon">${icon("lock", "ic-18")}</span>
          <div><b>专属使用，不可提现</b><p>额度仅限本人使用，不可提现或转赠。具体有效期与使用范围以企业配置为准。</p></div>
        </div>
        <div class="quota-info-row">
          <span class="quota-info-icon">${icon("receipt", "ic-18")}</span>
          <div><b>每笔记录都可查询</b><p>额度发放、兑换与个人补差记录，均可在「我的 - 明细」中查看。</p></div>
        </div>
        <div class="quota-info-current">
          <span>当前可用额度</span>
          <b>¥${money(state.quota.available)}</b>
        </div>
      </div>
    `;
    openSheet(html);
  }

  function openService() {
    const html = `
      <div class="quota-info-wrap">
        <p class="eyebrow">YOUR HEALTH CONCIERGE</p>
        <h2>企业专属健康管家</h2>
        <p>关于额度、权益与兑换，我们随时为你解答。</p>
        <div class="quota-info-row">
          <span class="quota-info-icon">${icon("headset", "ic-18")}</span>
          <div><b>在线时间</b><p>工作日 9:00–18:00，企业健康管家将优先响应你的需求。</p></div>
        </div>
        <div class="quota-info-row">
          <span class="quota-info-icon">${icon("hospital", "ic-18")}</span>
          <div><b>服务范围</b><p>五好权益使用、体检预约、商品兑换、企业健康活动与医疗资源咨询。</p></div>
        </div>
        <button class="btn btn-primary" style="width:100%;height:43px;margin-top:18px;font-size:9.5px" type="button" data-action="contact-service">发起咨询</button>
      </div>
    `;
    openSheet(html);
  }

  /* ---------------------------------------------------------
     Events
     --------------------------------------------------------- */

  document.addEventListener("click", event => {
    const target = event.target;

    const nav = target.closest("[data-nav]");
    if (nav) {
      event.preventDefault();
      navigate(nav.dataset.nav);
      return;
    }

    const go = target.closest("[data-go]");
    if (go) {
      if (sheet && sheet.classList.contains("is-open")) closeSheet();
      if (go.dataset.mallCat) state.mallCat = go.dataset.mallCat;
      navigate(go.dataset.go);
      return;
    }

    const actionEl = target.closest("[data-action]");
    if (actionEl) {
      const action = actionEl.dataset.action;
      if (action === "search") { openSearch(); return; }
      if (action === "notifications") { openNotifications(); return; }
      if (action === "quota-info") { openQuotaInfo(); return; }
      if (action === "service") { openService(); return; }
      if (action === "edit-health") { openHealthEdit(); return; }
      if (action === "subpage-back") { closeSubpage(); return; }
      if (action === "read-all") {
        state.hasUnread = false;
        $$("#notifList .notif-item").forEach(item => item.classList.add("is-read"));
        $$(".notice-dot").forEach(dot => { dot.style.display = "none"; });
        showToast("消息已全部标为已读");
        return;
      }
      if (action === "open-redeem") { openRedeem(actionEl.dataset.productId); return; }
      if (action === "back-product") { openProduct(actionEl.dataset.productId); return; }
      if (action === "confirm-redeem") { completeRedemption(actionEl.dataset.productId); return; }
      if (action === "go-redemptions") { closeSheet(); navigate("me"); openSubpage("redemptions"); return; }
      if (action === "continue-shopping") { closeSheet(); navigate("mall"); return; }
      if (action === "contact-service") { showToast("已为你转接企业健康管家（演示）"); return; }
    }

    const subpageTrigger = target.closest("[data-subpage]");
    if (subpageTrigger) { openSubpage(subpageTrigger.dataset.subpage); return; }

    const recipeDay = target.closest("[data-recipe-day]");
    if (recipeDay) {
      state.recipeIndex = Number(recipeDay.dataset.recipeDay) || 0;
      $$(".recipe-tab").forEach(tab => {
        const active = tab === recipeDay;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      const rail = recipeDay.closest(".recipe-rail");
      if (rail) rail.scrollTo({ left: Math.max(0, recipeDay.offsetLeft - 16), behavior: "smooth" });
      const detail = $("#recipeDetail");
      if (detail) detail.innerHTML = recipeDetailHtml(state.recipeIndex);
      return;
    }

    const category = target.closest("[data-category]");
    if (category) { openCategoryDetail(category.dataset.category); return; }

    const mallCat = target.closest("[data-mall-cat]");
    if (mallCat) { state.mallCat = mallCat.dataset.mallCat; renderMall(); return; }

    const mallFilter = target.closest("[data-mall-filter]");
    if (mallFilter) { state.mallFilter = mallFilter.dataset.mallFilter; renderMall(); return; }

    const articleCat = target.closest("[data-article-cat]");
    if (articleCat) { state.articleCat = articleCat.dataset.articleCat; renderDiscover(); return; }

    const benefit = target.closest("[data-benefit-cat]");
    if (benefit) {
      state.mallCat = benefit.dataset.benefitCat;
      state.mallFilter = "all";
      navigate("mall");
      return;
    }

    const product = target.closest("[data-product]");
    if (product) { openProduct(product.dataset.product); return; }

    const article = target.closest("[data-article]");
    if (article) { openArticle(article.dataset.article); return; }

    const redemption = target.closest("[data-redemption]");
    if (redemption) { openRedemptionDetail(redemption.dataset.redemption); return; }

    const report = target.closest("[data-report]");
    if (report) { openReportDetail(report.dataset.report); return; }

    const like = target.closest("[data-like]");
    if (like) { toggleLike(like.dataset.like); return; }

    const searchTerm = target.closest("[data-search-term]");
    if (searchTerm) {
      const input = $("#globalSearch");
      if (input) {
        input.value = searchTerm.dataset.searchTerm;
        renderSearchBody(input.value);
      }
      return;
    }

    const searchCat = target.closest("[data-search-cat]");
    if (searchCat) {
      const value = CATS[searchCat.dataset.searchCat].name;
      const input = $("#globalSearch");
      if (input) {
        input.value = value;
        renderSearchBody(value);
      }
      return;
    }

    const notifGo = target.closest("[data-notif-go]");
    if (notifGo) {
      closeSheet();
      if (notifGo.dataset.notifGo === "me-redemptions") {
        navigate("me");
        openSubpage("redemptions");
      } else {
        navigate(notifGo.dataset.notifGo);
      }
      return;
    }
  });

  document.addEventListener("input", event => {
    if (event.target.id === "globalSearch") {
      renderSearchBody(event.target.value);
    }
  });

  document.addEventListener("submit", event => {
    if (event.target.id === "healthForm") {
      event.preventDefault();
      saveHealthProfile(event.target);
    }
  });

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */

  function init() {
    setGreeting();
    renderAll();
    $$(".sheet").forEach(item => {
      item.inert = true;
      item.setAttribute("aria-hidden", "true");
    });
    const initial = (location.hash || "#home").replace("#", "");
    navigate(VIEWS.includes(initial) ? initial : "home", { keepScroll: true });

    window.addEventListener("hashchange", () => {
      const view = (location.hash || "#home").replace("#", "");
      if (VIEWS.includes(view) && view !== state.view) navigate(view, { keepScroll: true });
    });
  }

  init();
})();
