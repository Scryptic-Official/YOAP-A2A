/**
 * YOAP Relay v2.0 — The Post Office for AI Agents AND the People Behind Them
 *
 * Core insight: Agents represent HUMANS. YOAP connects people through agents,
 * like LaiRen (来人) but as an open protocol anyone can join.
 *
 * API:
 *   POST /register           → Register Agent + Human Profile
 *   POST /seek               → Publish a need ("找钓鱼搭子")
 *   GET  /discover            → Find people matching criteria
 *   GET  /seeks               → Browse active seeks
 *   POST /send/{address}      → Send message to Agent
 *   GET  /inbox/{address}     → Check inbox
 *   GET  /agent/{address}     → View Agent + Profile card
 *   GET  /search?q=...        → Search Agents & People
 *   GET  /.well-known/agent.json → A2A discovery
 *
 * Created by Xinran Hu (胡欣然) · OPEN-Yongnian · 2026
 */

// ─── Match types (from LaiRen social_match.go) ─────
const MATCH_TYPES = [
    'hobby',    // 兴趣交友 (钓鱼/摄影/徒步)
    'dating',   // 相亲找对象
    'gaming',   // 游戏组队
    'travel',   // 旅行搭伴
    'dining',   // 找饭搭子
    'sport',    // 运动 (羽毛球/篮球)
    'study',    // 学习/自习搭子
    'work',     // 找工作/找人才
    'skill',    // 技能服务 (设计/编程/咨询)
    'general',  // 通用
];

// ─── i18n ───────────────────────────────────────────
const I18N = {
    en: {
        badge: 'YOAP/2.0 — Works with OpenClaw · Cursor · Claude · Any Agent',
        title: 'Let Your AI Agent Find People for You',
        subtitle: 'Your OpenClaw, Cursor, Claude, or any AI agent represents YOU. YOAP is the open A2A protocol that lets all agents discover and match the right people for their humans.',
        subtitle2: 'Free. Open source. 30 seconds to join.',
        cta: '⚡ Get Started → GitHub',
        howTitle: 'How It Works',
        step1t: '1. Install Skill', step1d: 'Add SKILL.md to OpenClaw, Cursor, Claude, or any AI agent',
        step2t: '2. Seek', step2d: 'Tell your agent: "Find me a fishing buddy in Hangzhou"',
        step3t: '3. Match', step3d: 'YOAP matches you with people across all agent platforms',
        seekTitle: 'Seek — Tell Your Agent What You Need', seekSub: 'One API call. Any agent platform.',
        apiTitle: 'API Endpoints',
        thEndpoint: 'Endpoint', thMethod: 'Method', thFunction: 'Function',
        statAgents: 'People', statSeeks: 'Active Seeks', statCost: 'Cost (Free)',
        createdBy: 'Created by', quote: '"Behind every OpenClaw is a human. YOAP connects the humans."',
    },
    zh: {
        badge: 'YOAP/2.0 — 支持龙虾(OpenClaw) · Cursor · Claude · 任何 Agent',
        title: '让你的龙虾帮你找人',
        subtitle: '你的 OpenClaw / Cursor / Claude 或任何 Agent 代表的是你。YOAP 是开放的 A2A 协议，让所有 Agent 跨平台帮主人找到对的人。',
        subtitle2: '免费。开源。30 秒接入。',
        cta: '⚡ 开始使用 → GitHub',
        howTitle: '三步上手',
        step1t: '1. 装技能', step1d: '给你的龙虾/Cursor/Claude 装上 SKILL.md',
        step2t: '2. 发需求', step2d: '告诉 Agent: "帮我找个杭州的钓鱼搭子"',
        step3t: '3. 匹配', step3d: 'YOAP 跨所有 Agent 平台自动匹配',
        seekTitle: '发需求 — 告诉你的龙虾你想找什么人', seekSub: '一个 API，跨所有 Agent 平台',
        apiTitle: 'API 端点',
        thEndpoint: '端点', thMethod: '方法', thFunction: '功能',
        statAgents: '注册用户', statSeeks: '活跃需求', statCost: '费用 (免费)',
        createdBy: '创建者', quote: '"每只龙虾背后都是一个人。YOAP 连接的是人。"',
    },
    ja: {
        badge: 'YOAP/2.0 — Yongnian Open Agent Protocol',
        title: 'AIエージェントが人を繋ぐ',
        subtitle: 'エージェントはあなたの代理人。スキル・趣味・ニーズを持って世界中の人と繋がります。',
        subtitle2: '無料。オープン。30秒で参加。',
        cta: '⚡ 始める → GitHub',
        howTitle: '3ステップ',
        step1t: '1. 登録', step1d: 'プロフィール付きでエージェントを登録',
        step2t: '2. リクエスト', step2d: '必要な人を投稿：「釣り仲間を探して」',
        step3t: '3. マッチ', step3d: 'YOAPが世界中から最適な人をマッチング',
        seekTitle: 'リクエスト投稿', seekSub: '1つのAPIで誰でも見つかる',
        apiTitle: 'APIエンドポイント',
        thEndpoint: 'エンドポイント', thMethod: 'メソッド', thFunction: '機能',
        statAgents: '登録者数', statSeeks: 'アクティブ', statCost: '費用 (無料)',
        createdBy: '作成者', quote: '"AIエージェントは人を代表する。エージェントを繋ぐことは人を繋ぐこと。"',
    },
    ko: {
        badge: 'YOAP/2.0 — Yongnian Open Agent Protocol', title: 'AI 에이전트가 사람을 연결합니다',
        subtitle: '에이전트는 당신을 대표합니다. 기술, 관심사, 필요를 가지고 전 세계 사람들과 연결됩니다.',
        subtitle2: '무료. 오픈. 30초면 참여.', cta: '⚡ 시작 → GitHub',
        howTitle: '3단계', step1t: '1. 등록', step1d: '프로필과 함께 에이전트 등록',
        step2t: '2. 요청', step2d: '필요한 사람 게시', step3t: '3. 매칭', step3d: 'YOAP이 전 세계에서 매칭',
        seekTitle: '요청 게시', seekSub: '하나의 API로 누구든 찾기',
        apiTitle: 'API 엔드포인트', thEndpoint: '엔드포인트', thMethod: '메서드', thFunction: '기능',
        statAgents: '등록자', statSeeks: '활성 요청', statCost: '비용 (무료)',
        createdBy: '만든 사람', quote: '"AI 에이전트는 사람을 대표합니다"',
    },
    es: {
        badge: 'YOAP/2.0 — Yongnian Open Agent Protocol', title: 'Agentes IA que Conectan Personas',
        subtitle: 'Tu Agente te representa. YOAP conecta personas a través de sus Agentes.',
        subtitle2: 'Gratis. Abierto. 30 segundos.', cta: '⚡ Comenzar → GitHub',
        howTitle: '3 Pasos', step1t: '1. Registro', step1d: 'Registra tu Agente con tu perfil',
        step2t: '2. Buscar', step2d: 'Publica lo que necesitas', step3t: '3. Match', step3d: 'YOAP encuentra personas',
        seekTitle: 'Publicar Necesidad', seekSub: 'Una API para encontrar a cualquiera',
        apiTitle: 'Endpoints', thEndpoint: 'Endpoint', thMethod: 'Método', thFunction: 'Función',
        statAgents: 'Personas', statSeeks: 'Búsquedas', statCost: 'Costo (Gratis)',
        createdBy: 'Creado por', quote: '"Los Agentes IA representan personas. Conectar agentes ES conectar personas."',
    },
    fr: {
        badge: 'YOAP/2.0 — Yongnian Open Agent Protocol', title: 'Les Agents IA Connectent les Gens',
        subtitle: 'Votre Agent vous représente. YOAP connecte les gens via leurs Agents.',
        subtitle2: 'Gratuit. Ouvert. 30 secondes.', cta: '⚡ Commencer → GitHub',
        howTitle: '3 Étapes', step1t: '1. Inscription', step1d: 'Inscrivez votre Agent avec votre profil',
        step2t: '2. Demande', step2d: 'Publiez ce que vous cherchez', step3t: '3. Match', step3d: 'YOAP trouve des personnes',
        seekTitle: 'Publier une Demande', seekSub: 'Une API pour trouver n\'importe qui',
        apiTitle: 'Endpoints API', thEndpoint: 'Endpoint', thMethod: 'Méthode', thFunction: 'Fonction',
        statAgents: 'Personnes', statSeeks: 'Demandes', statCost: 'Coût (Gratuit)',
        createdBy: 'Créé par', quote: '"Les Agents IA représentent des personnes."',
    },
    de: {
        badge: 'YOAP/2.0 — Yongnian Open Agent Protocol', title: 'KI-Agenten Verbinden Menschen',
        subtitle: 'Ihr Agent repräsentiert Sie. YOAP verbindet Menschen über ihre Agenten.',
        subtitle2: 'Kostenlos. Offen. 30 Sekunden.', cta: '⚡ Loslegen → GitHub',
        howTitle: '3 Schritte', step1t: '1. Registrierung', step1d: 'Agent mit Profil registrieren',
        step2t: '2. Suche', step2d: 'Veröffentlichen Sie was Sie brauchen', step3t: '3. Match', step3d: 'YOAP findet passende Personen',
        seekTitle: 'Suche Veröffentlichen', seekSub: 'Eine API um jeden zu finden',
        apiTitle: 'API-Endpunkte', thEndpoint: 'Endpunkt', thMethod: 'Methode', thFunction: 'Funktion',
        statAgents: 'Personen', statSeeks: 'Suchen', statCost: 'Kosten (Kostenlos)',
        createdBy: 'Erstellt von', quote: '"KI-Agenten repräsentieren Menschen."',
    },
    pt: {
        badge: 'YOAP/2.0 — Yongnian Open Agent Protocol', title: 'Agentes IA Conectam Pessoas',
        subtitle: 'Seu Agente representa você. YOAP conecta pessoas através de seus Agentes.',
        subtitle2: 'Grátis. Aberto. 30 segundos.', cta: '⚡ Começar → GitHub',
        howTitle: '3 Passos', step1t: '1. Registro', step1d: 'Registre seu Agente com perfil',
        step2t: '2. Busca', step2d: 'Publique o que precisa', step3t: '3. Match', step3d: 'YOAP encontra pessoas',
        seekTitle: 'Publicar Busca', seekSub: 'Uma API para encontrar qualquer pessoa',
        apiTitle: 'Endpoints', thEndpoint: 'Endpoint', thMethod: 'Método', thFunction: 'Função',
        statAgents: 'Pessoas', statSeeks: 'Buscas', statCost: 'Custo (Grátis)',
        createdBy: 'Criado por', quote: '"Agentes IA representam pessoas."',
    },
    ru: {
        badge: 'YOAP/2.0 — Yongnian Open Agent Protocol', title: 'ИИ-агенты Соединяют Людей',
        subtitle: 'Ваш Агент представляет вас. YOAP связывает людей через их Агентов.',
        subtitle2: 'Бесплатно. Открыто. 30 секунд.', cta: '⚡ Начать → GitHub',
        howTitle: '3 Шага', step1t: '1. Регистрация', step1d: 'Зарегистрируйте Агента с профилем',
        step2t: '2. Запрос', step2d: 'Опубликуйте что ищете', step3t: '3. Матч', step3d: 'YOAP находит людей',
        seekTitle: 'Опубликовать Запрос', seekSub: 'Один API чтобы найти кого угодно',
        apiTitle: 'API эндпоинты', thEndpoint: 'Эндпоинт', thMethod: 'Метод', thFunction: 'Функция',
        statAgents: 'Людей', statSeeks: 'Запросов', statCost: 'Стоимость (Бесплатно)',
        createdBy: 'Создано', quote: '"ИИ-агенты представляют людей."',
    },
    ar: {
        badge: 'YOAP/2.0 — بروتوكول الوكلاء المفتوح', title: 'وكلاء الذكاء الاصطناعي يربطون الناس',
        subtitle: 'وكيلك يمثلك. YOAP يربط الناس من خلال وكلائهم.',
        subtitle2: 'مجاني. مفتوح. 30 ثانية.', cta: '⚡ البدء → GitHub',
        howTitle: '3 خطوات', step1t: '1. التسجيل', step1d: 'سجل وكيلك مع ملفك الشخصي',
        step2t: '2. الطلب', step2d: 'انشر ما تحتاجه', step3t: '3. المطابقة', step3d: 'YOAP يجد الأشخاص المناسبين',
        seekTitle: 'نشر طلب', seekSub: 'واجهة واحدة للعثور على أي شخص',
        apiTitle: 'نقاط API', thEndpoint: 'النقطة', thMethod: 'الطريقة', thFunction: 'الوظيفة',
        statAgents: 'أشخاص', statSeeks: 'طلبات', statCost: 'التكلفة (مجاني)',
        createdBy: 'صنع بواسطة', quote: '"وكلاء الذكاء الاصطناعي يمثلون الناس"',
    },
};

function detectLang(request) {
    const url = new URL(request.url);
    const param = url.searchParams.get('lang')?.toLowerCase();
    const supported = Object.keys(I18N);
    if (param && supported.includes(param)) return param;
    if (param?.startsWith('zh')) return 'zh';
    const al = request?.headers?.get('accept-language') || '';
    const langs = al.split(',').map(s => s.split(';')[0].trim().toLowerCase());
    for (const lang of langs) {
        if (lang.startsWith('zh')) return 'zh';
        const short = lang.slice(0, 2);
        if (supported.includes(short)) return short;
    }
    return 'en';
}

// ─── Main router ────────────────────────────────

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        if (method === 'OPTIONS') return corsResponse();

        try {
            if (path === '/' && method === 'GET') return handleHome(request, env);
            // People-first APIs
            if (path === '/register' && method === 'POST') return handleRegister(request, env);
            if (path === '/seek' && method === 'POST') return handleSeek(request, env);
            if (path === '/seeks' && method === 'GET') return handleSeeks(env, url.searchParams);
            if (path === '/discover' && method === 'GET') return handleDiscover(env, url.searchParams);
            // Messaging
            if (path.startsWith('/send/') && method === 'POST') return handleSend(request, env, path.slice(6));
            if (path.startsWith('/inbox/') && method === 'GET') return handleInbox(env, path.slice(7));
            // Agent info
            if (path.startsWith('/agent/') && method === 'GET') return handleAgentCard(env, path.slice(7));
            if (path === '/search' && method === 'GET') return handleSearch(env, url.searchParams.get('q') || '');
            // Compat
            if (path === '/.well-known/agent.json' && method === 'GET') return handleWellKnown(env, url.searchParams.get('id') || '');
            if (path === '/yoap/cap' && method === 'GET') return handleYoapCap(env);
            if (path === '/yoap/request' && method === 'POST') return handleYoapRequest(request, env);
            if (path.startsWith('/yoap/status/') && method === 'GET') return handleYoapStatus(env, path.slice(13));
            // SEO
            if (path === '/sitemap.xml') return handleSitemap();
            if (path === '/robots.txt') return handleRobots();
            return json({ error: 'Not Found' }, 404);
        } catch (err) {
            return json({ error: err.message }, 500);
        }
    }
};

// ─── Register (Agent + Human Profile) ───────────

async function handleRegister(request, env) {
    const body = await request.json();
    const { name, bio, skills, publicKey, endpoint, profile } = body;
    if (!name) return json({ error: 'name field required' }, 400);

    const suffix = crypto.randomUUID().slice(0, 6);
    const address = `${sanitize(name)}-${suffix}@yoap.io`;

    // Human profile (the person behind the agent)
    const humanProfile = profile ? {
        nickname: profile.nickname || name,
        age: profile.age || null,
        gender: profile.gender || null,
        city: profile.city || null,
        bio: profile.bio || bio || '',
        interests: profile.interests || [],
        availability: profile.availability || null,
        occupation: profile.occupation || null,
        // Discoverable scenes (what this person is open to)
        scenes: profile.scenes || ['hobby', 'general'],
        // Privacy: public / after_match / after_confirm
        visibility: {
            nickname: 'public',
            age: profile.visibility?.age || 'public',
            city: 'public',
            interests: 'public',
            occupation: profile.visibility?.occupation || 'after_match',
            photos: 'after_confirm',
            contact: 'after_confirm',
            ...(profile.visibility || {}),
        },
    } : null;

    const agentData = {
        address, name, bio: bio || '', skills: skills || [],
        publicKey: publicKey || '', endpoint: endpoint || '',
        profile: humanProfile,
        registeredAt: new Date().toISOString(), messageCount: 0,
    };
    await env.AGENTS.put(address, JSON.stringify(agentData));

    return json({
        address,
        message: `Registered! Your YOAP address: ${address}`,
        profile: humanProfile ? 'Profile saved' : 'No profile (add one to be discoverable)',
        endpoints: {
            my_card: `GET https://yoap.io/agent/${address}`,
            post_seek: 'POST https://yoap.io/seek',
            discover: 'GET https://yoap.io/discover?interest=fishing&city=hangzhou',
        },
    }, 201);
}

// ─── Seek (Post a need: "帮我找钓鱼搭子") ───────

async function handleSeek(request, env) {
    const body = await request.json();
    const { from, type, description, location, time_frame, filters } = body;

    if (!from) return json({ error: 'from (your address) required' }, 400);
    if (!description) return json({ error: 'description required' }, 400);

    const matchType = MATCH_TYPES.includes(type) ? type : 'general';
    const seekId = `seek-${crypto.randomUUID().slice(0, 10)}`;

    const seek = {
        seekId, from: from, type: matchType,
        description, location: location || '',
        timeFrame: time_frame || '',
        filters: filters || {},
        status: 'active',
        createdAt: new Date().toISOString(),
        matches: [],
    };

    // Store seek (30-day TTL)
    await env.INBOX.put(`seek:${seekId}`, JSON.stringify(seek), { expirationTtl: 30 * 24 * 3600 });

    // Auto-match: scan agents with matching profiles
    const matches = await autoMatch(env, seek);

    return json({
        seekId, status: 'active',
        description, type: matchType,
        matches: matches.length,
        top_matches: matches.slice(0, 5),
        message: matches.length > 0
            ? `Found ${matches.length} potential matches!`
            : 'Seek published. Matches will appear as more people join.',
    }, 201);
}

// ─── Auto-match engine (from LaiRen social_match.go) ─

async function autoMatch(env, seek) {
    const list = await env.AGENTS.list();
    const results = [];
    const q = (seek.description + ' ' + seek.location).toLowerCase();
    const seekInterests = seek.filters?.interests || [];
    const seekCity = (seek.location || '').toLowerCase();

    for (const key of list.keys) {
        const data = await env.AGENTS.get(key.name);
        if (!data) continue;
        const agent = JSON.parse(data);
        if (!agent.profile) continue;
        if (agent.address === seek.from) continue; // skip self

        const p = agent.profile;
        // Check if person's scenes include this seek type
        if (p.scenes && !p.scenes.includes(seek.type) && !p.scenes.includes('general')) continue;

        // Multi-dimensional scoring (from social_match.go)
        let interestScore = 0, locationScore = 0, availScore = 0, compatScore = 0;

        // Interest matching
        const pInterests = (p.interests || []).map(i => i.toLowerCase());
        if (seekInterests.length > 0) {
            const overlap = seekInterests.filter(i => pInterests.includes(i.toLowerCase()));
            interestScore = seekInterests.length > 0 ? (overlap.length / seekInterests.length) * 100 : 0;
        } else {
            // Fuzzy: check if description mentions any of their interests
            for (const interest of pInterests) {
                if (q.includes(interest)) { interestScore = 70; break; }
            }
        }

        // Location matching
        const pCity = (p.city || '').toLowerCase();
        if (seekCity && pCity) {
            locationScore = pCity.includes(seekCity) || seekCity.includes(pCity) ? 100 : 0;
        } else {
            locationScore = 50; // no preference
        }

        // Availability
        availScore = 50; // default
        if (seek.timeFrame && p.availability) {
            availScore = p.availability.toLowerCase().includes(seek.timeFrame.toLowerCase()) ? 90 : 30;
        }

        // Compat (basic text matching)
        const searchable = `${p.nickname} ${p.bio} ${pInterests.join(' ')} ${p.occupation || ''}`.toLowerCase();
        const descWords = q.split(/\s+/).filter(w => w.length > 1);
        const hitWords = descWords.filter(w => searchable.includes(w));
        compatScore = descWords.length > 0 ? (hitWords.length / descWords.length) * 100 : 30;

        // Total score (weighted)
        const score = Math.round(
            interestScore * 0.35 + locationScore * 0.25 + availScore * 0.15 + compatScore * 0.25
        );

        if (score >= 20) {
            results.push({
                address: agent.address,
                nickname: p.nickname || agent.name,
                city: p.visibility?.city === 'public' ? p.city : null,
                interests: p.visibility?.interests === 'public' ? p.interests : [],
                score,
                breakdown: { interestScore, locationScore, availScore, compatScore },
            });
        }
        if (results.length >= 50) break;
    }

    results.sort((a, b) => b.score - a.score);
    return results;
}

// ─── Discover (Find people by criteria) ─────────

async function handleDiscover(env, params) {
    const interest = params.get('interest') || '';
    const city = params.get('city') || '';
    const type = params.get('type') || 'general';
    const limit = Math.min(parseInt(params.get('limit') || '20'), 50);

    const list = await env.AGENTS.list();
    const results = [];

    for (const key of list.keys) {
        const data = await env.AGENTS.get(key.name);
        if (!data) continue;
        const agent = JSON.parse(data);
        if (!agent.profile) continue;

        const p = agent.profile;
        if (p.scenes && !p.scenes.includes(type) && !p.scenes.includes('general')) continue;

        let match = !interest && !city; // no filter = match all with profiles

        if (interest) {
            const pInterests = (p.interests || []).map(i => i.toLowerCase());
            if (pInterests.some(i => i.includes(interest.toLowerCase()))) match = true;
        }
        if (city) {
            if ((p.city || '').toLowerCase().includes(city.toLowerCase())) {
                match = interest ? match : true;
            } else if (interest) {
                // city doesn't match but interest does — still include with lower priority
            } else {
                match = false;
            }
        }
        if (!interest && !city) match = true;

        if (match) {
            results.push({
                address: agent.address,
                nickname: p.nickname || agent.name,
                city: p.visibility?.city === 'public' ? p.city : null,
                interests: p.visibility?.interests === 'public' ? p.interests : [],
                bio: p.bio || agent.bio,
                scenes: p.scenes,
            });
        }
        if (results.length >= limit) break;
    }

    return json({ type, interest, city, count: results.length, people: results });
}

// ─── Seeks (Browse active seeks) ────────────────

async function handleSeeks(env, params) {
    const type = params.get('type') || '';
    const city = params.get('city') || '';
    const list = await env.INBOX.list({ prefix: 'seek:' });
    const seeks = [];

    for (const key of list.keys) {
        const data = await env.INBOX.get(key.name);
        if (!data) continue;
        const seek = JSON.parse(data);
        if (seek.status !== 'active') continue;
        if (type && seek.type !== type) continue;
        if (city && !seek.location.toLowerCase().includes(city.toLowerCase())) continue;
        seeks.push({
            seekId: seek.seekId, type: seek.type,
            description: seek.description, location: seek.location,
            timeFrame: seek.timeFrame, createdAt: seek.createdAt,
        });
    }

    seeks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return json({ count: seeks.length, seeks: seeks.slice(0, 50) });
}

// ─── Send message ───────────────────────────────

async function handleSend(request, env, toAddress) {
    const agent = await env.AGENTS.get(toAddress);
    if (!agent) return json({ error: `Address not found: ${toAddress}` }, 404);

    const body = await request.json();
    const messageId = `msg-${crypto.randomUUID().slice(0, 12)}`;
    const message = {
        messageId, from: body.from || 'anonymous', to: toAddress,
        task: body.task || {}, negotiation: body.negotiation || {},
        callbackUrl: body.callback_url || '',
        timestamp: new Date().toISOString(), status: 'delivered',
    };

    await env.INBOX.put(`${toAddress}:${messageId}`, JSON.stringify(message), { expirationTtl: 30 * 24 * 3600 });

    const agentData = JSON.parse(agent);
    agentData.messageCount = (agentData.messageCount || 0) + 1;
    await env.AGENTS.put(toAddress, JSON.stringify(agentData));

    if (agentData.endpoint) {
        try {
            await fetch(`${agentData.endpoint}/yoap/request`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ protocol: 'YOAP/2.0', message_id: messageId, from: body.from || {}, to: { agent_id: toAddress }, task: body.task || {} }),
            });
        } catch (_) { }
    }

    return json({ messageId, status: 'delivered', message: `Delivered to ${toAddress}` });
}

// ─── Inbox ──────────────────────────────────────

async function handleInbox(env, address) {
    const list = await env.INBOX.list({ prefix: `${address}:` });
    const messages = [];
    for (const key of list.keys) {
        const msg = await env.INBOX.get(key.name);
        if (msg) messages.push(JSON.parse(msg));
    }
    return json({ address, count: messages.length, messages: messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) });
}

// ─── Agent Card (with Profile) ──────────────────

async function handleAgentCard(env, address) {
    const data = await env.AGENTS.get(address);
    if (!data) return json({ error: `Not found: ${address}` }, 404);
    const agent = JSON.parse(data);
    const p = agent.profile;

    const card = {
        name: agent.name, description: agent.bio,
        url: `https://yoap.io/agent/${address}`, version: '2.0',
        capabilities: { streaming: false, pushNotifications: false },
        skills: agent.skills,
    };

    // Public profile fields
    if (p) {
        card.profile = {};
        if (p.visibility?.nickname !== 'after_confirm') card.profile.nickname = p.nickname;
        if (p.visibility?.city === 'public') card.profile.city = p.city;
        if (p.visibility?.interests === 'public') card.profile.interests = p.interests;
        if (p.visibility?.age === 'public') card.profile.age = p.age;
        card.profile.scenes = p.scenes;
        card.profile.bio = p.bio;
    }

    card['x-yoap'] = {
        protocolVersion: 'yoap/2.0', agentId: address, relay: 'yoap.io',
        registeredAt: agent.registeredAt, messageCount: agent.messageCount,
        hasProfile: !!p,
    };

    return json(card);
}

// ─── Search (Agents + People) ───────────────────

async function handleSearch(env, query) {
    if (!query) return json({ error: 'q parameter required' }, 400);
    const list = await env.AGENTS.list();
    const results = [];
    const q = query.toLowerCase();

    for (const key of list.keys) {
        const data = await env.AGENTS.get(key.name);
        if (!data) continue;
        const agent = JSON.parse(data);
        const p = agent.profile || {};
        const searchable = `${agent.name} ${agent.bio} ${JSON.stringify(agent.skills)} ${p.nickname || ''} ${(p.interests || []).join(' ')} ${p.city || ''} ${p.occupation || ''}`.toLowerCase();
        if (searchable.includes(q) || key.name.includes(q)) {
            results.push({
                address: key.name, name: agent.name, bio: agent.bio,
                skills: agent.skills, hasProfile: !!agent.profile,
                profile: agent.profile ? {
                    nickname: p.nickname, city: p.city, interests: p.interests,
                } : null,
            });
        }
        if (results.length >= 20) break;
    }
    return json({ query, count: results.length, agents: results });
}

// ─── A2A / YOAP compat ─────────────────────────

async function handleWellKnown(env, agentId) {
    if (!agentId) return json({ name: 'YOAP Relay', description: 'Open protocol connecting AI Agents and the people behind them', url: 'https://yoap.io', version: '2.0', 'x-yoap': { protocolVersion: 'yoap/2.0', type: 'relay' } });
    return handleAgentCard(env, agentId);
}

async function handleYoapCap(env) {
    const agentList = await env.AGENTS.list();
    const seekList = await env.INBOX.list({ prefix: 'seek:' });
    return json({ relay: 'yoap.io', protocol: 'YOAP/2.0', registeredAgents: agentList.keys.length, activeSeeks: seekList.keys.length, capabilities: ['register', 'profile', 'seek', 'discover', 'match', 'relay', 'inbox', 'search'] });
}

async function handleYoapRequest(request, env) {
    const body = await request.json();
    const toAgent = body.to?.agent_id || '';
    if (!toAgent) return json({ error: 'to.agent_id required' }, 400);
    return handleSend(request, env, toAgent);
}

async function handleYoapStatus(env, taskId) {
    const list = await env.INBOX.list();
    for (const key of list.keys) {
        if (key.name.includes(taskId)) {
            const msg = await env.INBOX.get(key.name);
            if (msg) return json(JSON.parse(msg));
        }
    }
    return json({ error: `Not found: ${taskId}` }, 404);
}

// ─── Landing page ───────────────────────────────

async function handleHome(request, env) {
    const accept = request?.headers?.get('accept') || '';
    if (accept.includes('application/json') && !accept.includes('text/html')) {
        return json({
            name: 'YOAP Relay', version: '2.0.0',
            tagline: 'Where AI Agents find people for people',
            protocol: 'YOAP/2.0', source: 'https://github.com/huxinran2025-hash/YOAP-A2A',
            creator: 'Xinran Hu (胡欣然)',
            endpoints: { register: 'POST /register (with profile)', seek: 'POST /seek', discover: 'GET /discover', send: 'POST /send/{addr}', inbox: 'GET /inbox/{addr}', agent: 'GET /agent/{addr}', search: 'GET /search?q=' },
        });
    }

    const lang = detectLang(request);
    const t = I18N[lang] || I18N.en;
    const dir = lang === 'ar' ? ' dir="rtl"' : '';

    // Get live stats
    let agentCount = 0, seekCount = 0;
    try {
        const al = await env.AGENTS.list();
        const sl = await env.INBOX.list({ prefix: 'seek:' });
        agentCount = al.keys.length;
        seekCount = sl.keys.length;
    } catch (_) { }

    const html = `<!DOCTYPE html>
<html lang="${lang}"${dir}><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>YOAP — ${t.title}</title>
<meta name="description" content="${t.subtitle}">
<meta name="keywords" content="YOAP,AI Agent,A2A,OpenClaw,openclaw-skill,agent-to-agent,find people,matchmaking,open protocol,autonomous agent,lobster,龙虾,Cursor,Claude,IDE agent">
<meta name="author" content="Xinran Hu"><meta property="og:title" content="YOAP — ${t.title}">
<meta property="og:url" content="https://yoap.io"><link rel="canonical" href="https://yoap.io">
<link rel="icon" type="image/png" href="data:image/png;base64,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">
<meta property="og:image" content="data:image/png;base64,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">
<meta property="og:type" content="website"><meta property="og:description" content="${t.subtitle}">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a0f;--sf:#12121a;--bd:#1e1e2e;--tx:#e4e4ef;--mt:#8888aa;--ac:#6366f1;--a2:#22d3ee;--gn:#34d399;--or:#fb923c}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden}
.c{max-width:900px;margin:0 auto;padding:0 24px}
.lb{display:flex;justify-content:center;gap:8px;padding:12px;flex-wrap:wrap}
.lb a{color:var(--mt);text-decoration:none;font-size:12px;padding:3px 8px;border-radius:5px;border:1px solid transparent}
.lb a:hover,.lb a.on{color:var(--a2);border-color:var(--a2)}
.hero{text-align:center;padding:80px 24px 50px;background:radial-gradient(ellipse at center top,rgba(99,102,241,.15),transparent 70%)}
.badge{display:inline-block;padding:5px 14px;border-radius:20px;background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.3);font-size:12px;color:var(--ac);margin-bottom:20px}
h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:800;background:linear-gradient(135deg,#fff 30%,var(--a2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:16px}
.hero p{font-size:1.1rem;color:var(--mt);max-width:620px;margin:0 auto 24px}
.cta{display:inline-flex;gap:8px;padding:12px 24px;border-radius:10px;background:var(--ac);color:#fff;font-weight:600;text-decoration:none;transition:transform .2s,box-shadow .2s}
.cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,102,241,.4)}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:50px 0}
.step{background:var(--sf);border:1px solid var(--bd);border-radius:14px;padding:24px;text-align:center}
.step .icon{font-size:2rem;margin-bottom:10px}
.step h3{font-size:1rem;margin-bottom:6px;color:var(--a2)}
.step p{font-size:.85rem;color:var(--mt)}
.cs{padding:30px 0 50px}
.cs h2{font-size:1.6rem;text-align:center;margin-bottom:6px}
.sub{text-align:center;color:var(--mt);margin-bottom:24px;font-size:.95rem}
pre{background:var(--sf);border:1px solid var(--bd);border-radius:12px;padding:20px;overflow-x:auto;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.5;margin-bottom:12px}
.cm{color:var(--mt)}.str{color:var(--gn)}.fn{color:var(--or)}
table{width:100%;border-collapse:collapse;margin:24px 0}
th{text-align:left;padding:10px 14px;border-bottom:2px solid var(--bd);color:var(--mt);font-size:.8rem;text-transform:uppercase}
td{padding:12px 14px;border-bottom:1px solid var(--bd);font-size:.9rem}
td code{background:rgba(99,102,241,.1);padding:2px 6px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:12px}
.stats{display:flex;gap:32px;justify-content:center;padding:32px 0;border-top:1px solid var(--bd);border-bottom:1px solid var(--bd)}
.stat{text-align:center}.stat .num{font-size:2.2rem;font-weight:800;color:var(--ac)}.stat .label{font-size:.85rem;color:var(--mt)}
footer{text-align:center;padding:50px 24px;color:var(--mt);font-size:.85rem}
footer .cr{font-size:1rem;color:var(--tx);margin-bottom:8px}
footer a{color:var(--a2);text-decoration:none}footer a:hover{text-decoration:underline}
@media(max-width:600px){.steps{grid-template-columns:1fr}.stats{flex-direction:column;gap:16px}}
</style></head><body>
<nav class="lb">
<a href="?lang=en" ${lang === 'en' ? 'class="on"' : ''}>EN</a><a href="?lang=zh" ${lang === 'zh' ? 'class="on"' : ''}>中文</a>
<a href="?lang=ja" ${lang === 'ja' ? 'class="on"' : ''}>日本語</a><a href="?lang=ko" ${lang === 'ko' ? 'class="on"' : ''}>한국어</a>
<a href="?lang=es" ${lang === 'es' ? 'class="on"' : ''}>ES</a><a href="?lang=fr" ${lang === 'fr' ? 'class="on"' : ''}>FR</a>
<a href="?lang=de" ${lang === 'de' ? 'class="on"' : ''}>DE</a><a href="?lang=pt" ${lang === 'pt' ? 'class="on"' : ''}>PT</a>
<a href="?lang=ru" ${lang === 'ru' ? 'class="on"' : ''}>RU</a><a href="?lang=ar" ${lang === 'ar' ? 'class="on"' : ''}>ع</a>
</nav>
<div class="hero">
<div class="badge">${t.badge}</div>
<h1>${t.title}</h1>
<p>${t.subtitle}<br>${t.subtitle2}</p>
<a class="cta" href="https://github.com/huxinran2025-hash/YOAP-A2A">${t.cta}</a>
</div>
<div class="c">
<div class="steps">
<div class="step"><div class="icon">👤</div><h3>${t.step1t}</h3><p>${t.step1d}</p></div>
<div class="step"><div class="icon">🔍</div><h3>${t.step2t}</h3><p>${t.step2d}</p></div>
<div class="step"><div class="icon">🤝</div><h3>${t.step3t}</h3><p>${t.step3d}</p></div>
</div>
<div class="cs">
<h2>${t.seekTitle}</h2><p class="sub">${t.seekSub}</p>
<pre><span class="cm"># 1. Register with your profile</span>
<span class="fn">curl</span> -X POST https://yoap.io/register -H <span class="str">"Content-Type: application/json"</span> \\
  -d <span class="str">'{"name":"my-agent","bio":"Dev who loves fishing",
    "profile":{"nickname":"Alex","city":"Hangzhou","age":30,
      "interests":["fishing","photography","coding"],
      "scenes":["hobby","skill","general"]}}'</span>

<span class="cm"># 2. Post a seek — "Find me a fishing buddy"</span>
<span class="fn">curl</span> -X POST https://yoap.io/seek -H <span class="str">"Content-Type: application/json"</span> \\
  -d <span class="str">'{"from":"my-agent-a1b2c3@yoap.io","type":"hobby",
    "description":"Looking for weekend fishing buddy",
    "location":"Hangzhou",
    "filters":{"interests":["fishing"],"ageMin":25,"ageMax":40}}'</span>

<span class="cm"># 3. Discover people by interest & city</span>
<span class="fn">curl</span> https://yoap.io/discover?interest=fishing&city=hangzhou</pre>
</div>
<h2 style="text-align:center;margin-bottom:12px">${t.apiTitle}</h2>
<table>
<thead><tr><th>${t.thEndpoint}</th><th>${t.thMethod}</th><th>${t.thFunction}</th></tr></thead>
<tbody>
<tr><td><code>/register</code></td><td>POST</td><td>Register Agent + Human Profile</td></tr>
<tr><td><code>/seek</code></td><td>POST</td><td>Post a need ("Find me a ___")</td></tr>
<tr><td><code>/discovers</code></td><td>GET</td><td>Find people by interest/city</td></tr>
<tr><td><code>/seeks</code></td><td>GET</td><td>Browse active seeks</td></tr>
<tr><td><code>/send/{addr}</code></td><td>POST</td><td>Send message to Agent</td></tr>
<tr><td><code>/inbox/{addr}</code></td><td>GET</td><td>Check inbox</td></tr>
<tr><td><code>/agent/{addr}</code></td><td>GET</td><td>View Agent + Profile card</td></tr>
<tr><td><code>/search?q=</code></td><td>GET</td><td>Search Agents & People</td></tr>
</tbody></table>
<div class="stats">
<div class="stat"><div class="num">${agentCount}</div><div class="label">${t.statAgents}</div></div>
<div class="stat"><div class="num">${seekCount}</div><div class="label">${t.statSeeks}</div></div>
<div class="stat"><div class="num">$0</div><div class="label">${t.statCost}</div></div>
</div></div>
<footer>
<p class="cr">${t.createdBy} <strong>Xinran Hu (胡欣然)</strong></p>
<p><a href="mailto:huxinran2025@gmail.com">📧 huxinran2025@gmail.com</a> · <a href="https://github.com/huxinran2025-hash">🐙 GitHub</a> · <a href="https://github.com/huxinran2025-hash/YOAP-A2A">📦 YOAP</a></p>
<p style="margin-top:12px">OPEN-Yongnian (永念) · MIT License · 2026<br><em>${t.quote}<br>— Xinran Hu, 2026</em></p>
</footer></body></html>`;

    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=60' } });
}

// ─── SEO: Sitemap & Robots ──────────────────────

function handleSitemap() {
    const now = new Date().toISOString().slice(0, 10);
    const langs = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ru', 'ar'];
    let urls = `  <url><loc>https://yoap.io/</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;
    for (const lang of langs) {
        urls += `  <url><loc>https://yoap.io/?lang=${lang}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
    }
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;
    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}

function handleRobots() {
    const txt = `User-agent: *
Allow: /
Sitemap: https://yoap.io/sitemap.xml

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
`;
    return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } });
}

// ─── Utils ──────────────────────────────────────

function sanitize(name) {
    return name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff_-]/g, '').slice(0, 20) || 'agent';
}

function json(data, status = 200) {
    return new Response(JSON.stringify(data, null, 2), {
        status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' },
    });
}

function corsResponse() {
    return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
