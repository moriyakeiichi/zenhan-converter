export type ConvertMode = 'そのまま' | '全角' | '半角';

export interface ConvertSettings {
    alphabet: ConvertMode;
    number: ConvertMode;
    space: ConvertMode;
    exclamation: ConvertMode;
    question: ConvertMode;
    kuten: ConvertMode;
    yen: ConvertMode;
    tilde: ConvertMode;
    periodComma: ConvertMode;
    hyphen: ConvertMode;
    underscore: ConvertMode;
    backslash: ConvertMode;
    slash: ConvertMode;
    colon: ConvertMode;
    semicolon: ConvertMode;
    brackets: ConvertMode;
    operators: ConvertMode;
    at: ConvertMode;
    percent: ConvertMode;
    ampersand: ConvertMode;
    asterisk: ConvertMode;
    dollar: ConvertMode;
    hash: ConvertMode;
    singleQuote: ConvertMode;
    doubleQuote: ConvertMode;
    pipe: ConvertMode;
    backquote: ConvertMode;
    caret: ConvertMode;
}

export const SETTING_KEYS: (keyof ConvertSettings)[] = [
    'alphabet', 'number', 'space', 'exclamation', 'question', 'kuten',
    'yen', 'tilde', 'periodComma', 'hyphen', 'underscore', 'backslash',
    'slash', 'colon', 'semicolon', 'brackets', 'operators', 'at',
    'percent', 'ampersand', 'asterisk', 'dollar', 'hash', 'singleQuote',
    'doubleQuote', 'pipe', 'backquote', 'caret'
];

interface CharPair {
    full: string;
    half: string;
}

interface CharMapping {
    settingKey: keyof ConvertSettings;
    pairs: CharPair[];
}

function range(fullStart: number, halfStart: number, count: number): CharPair[] {
    const pairs: CharPair[] = [];
    for (let i = 0; i < count; i++) {
        pairs.push({
            full: String.fromCodePoint(fullStart + i),
            half: String.fromCodePoint(halfStart + i),
        });
    }
    return pairs;
}

function pair(fullCode: number, halfCode: number): CharPair {
    return {
        full: String.fromCodePoint(fullCode),
        half: String.fromCodePoint(halfCode),
    };
}

const CHAR_MAPPINGS: CharMapping[] = [
    {
        settingKey: 'alphabet',
        pairs: [
            ...range(0xFF21, 0x0041, 26), // Ａ-Ｚ ⇔ A-Z
            ...range(0xFF41, 0x0061, 26), // ａ-ｚ ⇔ a-z
        ],
    },
    {
        settingKey: 'number',
        pairs: range(0xFF10, 0x0030, 10), // ０-９ ⇔ 0-9
    },
    {
        settingKey: 'space',
        pairs: [pair(0x3000, 0x0020)], // 　 ⇔ (space)
    },
    {
        settingKey: 'exclamation',
        pairs: [pair(0xFF01, 0x0021)], // ！ ⇔ !
    },
    {
        settingKey: 'question',
        pairs: [pair(0xFF1F, 0x003F)], // ？ ⇔ ?
    },
    {
        settingKey: 'kuten',
        pairs: [
            pair(0x3002, 0xFF61), // 。 ⇔ ｡ (JIS X 0201)
            pair(0x3001, 0xFF64), // 、 ⇔ ､ (JIS X 0201)
        ],
    },
    {
        settingKey: 'yen',
        pairs: [pair(0xFFE5, 0x00A5)], // ￥ ⇔ ¥
    },
    {
        settingKey: 'tilde',
        pairs: [pair(0xFF5E, 0x007E)], // ～ ⇔ ~
    },
    {
        settingKey: 'periodComma',
        pairs: [
            pair(0xFF0E, 0x002E), // ．⇔ .
            pair(0xFF0C, 0x002C), // ，⇔ ,
        ],
    },
    {
        settingKey: 'hyphen',
        pairs: [pair(0xFF0D, 0x002D)], // － ⇔ -
    },
    {
        settingKey: 'underscore',
        pairs: [pair(0xFF3F, 0x005F)], // ＿ ⇔ _
    },
    {
        settingKey: 'backslash',
        pairs: [pair(0xFF3C, 0x005C)], // ＼ ⇔ \
    },
    {
        settingKey: 'slash',
        pairs: [pair(0xFF0F, 0x002F)], // ／ ⇔ /
    },
    {
        settingKey: 'colon',
        pairs: [pair(0xFF1A, 0x003A)], // ： ⇔ :
    },
    {
        settingKey: 'semicolon',
        pairs: [pair(0xFF1B, 0x003B)], // ； ⇔ ;
    },
    {
        settingKey: 'brackets',
        pairs: [
            pair(0xFF08, 0x0028), // （ ⇔ (
            pair(0xFF09, 0x0029), // ） ⇔ )
            pair(0xFF3B, 0x005B), // ［ ⇔ [
            pair(0xFF3D, 0x005D), // ］ ⇔ ]
            pair(0xFF5B, 0x007B), // ｛ ⇔ {
            pair(0xFF5D, 0x007D), // ｝ ⇔ }
            pair(0x300C, 0xFF62), // 「 ⇔ ｢
            pair(0x300D, 0xFF63), // 」 ⇔ ｣
        ],
    },
    {
        settingKey: 'operators',
        pairs: [
            pair(0xFF0B, 0x002B), // ＋ ⇔ +
            pair(0xFF1D, 0x003D), // ＝ ⇔ =
            pair(0xFF1C, 0x003C), // ＜ ⇔ <
            pair(0xFF1E, 0x003E), // ＞ ⇔ >
        ],
    },
    {
        settingKey: 'at',
        pairs: [pair(0xFF20, 0x0040)], // ＠ ⇔ @
    },
    {
        settingKey: 'percent',
        pairs: [pair(0xFF05, 0x0025)], // ％ ⇔ %
    },
    {
        settingKey: 'ampersand',
        pairs: [pair(0xFF06, 0x0026)], // ＆ ⇔ &
    },
    {
        settingKey: 'asterisk',
        pairs: [pair(0xFF0A, 0x002A)], // ＊ ⇔ *
    },
    {
        settingKey: 'dollar',
        pairs: [pair(0xFF04, 0x0024)], // ＄ ⇔ $
    },
    {
        settingKey: 'hash',
        pairs: [pair(0xFF03, 0x0023)], // ＃ ⇔ #
    },
    {
        settingKey: 'singleQuote',
        pairs: [pair(0xFF07, 0x0027)], // ＇ ⇔ '
    },
    {
        settingKey: 'doubleQuote',
        pairs: [pair(0xFF02, 0x0022)], // ＂ ⇔ "
    },
    {
        settingKey: 'pipe',
        pairs: [pair(0xFF5C, 0x007C)], // ｜ ⇔ |
    },
    {
        settingKey: 'backquote',
        pairs: [pair(0xFF40, 0x0060)], // ｀ ⇔ `
    },
    {
        settingKey: 'caret',
        pairs: [pair(0xFF3E, 0x005E)], // ＾ ⇔ ^
    },
];

export function convertText(text: string, settings: ConvertSettings): { result: string; count: number } {
    const toFullMap = new Map<string, string>();
    const toHalfMap = new Map<string, string>();

    for (const mapping of CHAR_MAPPINGS) {
        const mode = settings[mapping.settingKey];
        if (mode === 'そのまま') {
            continue;
        }
        for (const p of mapping.pairs) {
            if (mode === '全角') {
                toFullMap.set(p.half, p.full);
            } else {
                toHalfMap.set(p.full, p.half);
            }
        }
    }

    let count = 0;
    let result = '';
    for (const ch of text) {
        const fullReplacement = toFullMap.get(ch);
        if (fullReplacement !== undefined) {
            result += fullReplacement;
            count++;
            continue;
        }
        const halfReplacement = toHalfMap.get(ch);
        if (halfReplacement !== undefined) {
            result += halfReplacement;
            count++;
            continue;
        }
        result += ch;
    }

    return { result, count };
}
