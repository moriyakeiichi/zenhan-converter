export type ConvertMode = 'そのまま' | '全角' | '半角';

export interface ConvertSettings {
    '01Alphabet': ConvertMode;
    '02Number': ConvertMode;
    '03Brackets': ConvertMode;
    '04Exclamation': ConvertMode;
    '05Question': ConvertMode;
    '06Operators': ConvertMode;
    '07At': ConvertMode;
    '08Colon': ConvertMode;
    '09Semicolon': ConvertMode;
    '10Percent': ConvertMode;
    '11Kuten': ConvertMode;
    '12Space': ConvertMode;
    '13Yen': ConvertMode;
    '14Tilde': ConvertMode;
    '15Hyphen': ConvertMode;
    '16Underscore': ConvertMode;
    '17Backslash': ConvertMode;
    '18Slash': ConvertMode;
    '19Ampersand': ConvertMode;
    '20Asterisk': ConvertMode;
    '21Dollar': ConvertMode;
    '22Hash': ConvertMode;
    '23SingleQuote': ConvertMode;
    '24DoubleQuote': ConvertMode;
    '25PeriodComma': ConvertMode;
    '26Pipe': ConvertMode;
    '27Backquote': ConvertMode;
    '28Caret': ConvertMode;
}

export const SETTING_KEYS: (keyof ConvertSettings)[] = [
    '01Alphabet', '02Number', '03Brackets', '04Exclamation', '05Question',
    '06Operators', '07At', '08Colon', '09Semicolon', '10Percent',
    '11Kuten', '12Space', '13Yen', '14Tilde', '15Hyphen',
    '16Underscore', '17Backslash', '18Slash', '19Ampersand', '20Asterisk',
    '21Dollar', '22Hash', '23SingleQuote', '24DoubleQuote', '25PeriodComma',
    '26Pipe', '27Backquote', '28Caret'
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
        settingKey: '01Alphabet',
        pairs: [
            ...range(0xFF21, 0x0041, 26), // Ａ-Ｚ ⇔ A-Z
            ...range(0xFF41, 0x0061, 26), // ａ-ｚ ⇔ a-z
        ],
    },
    {
        settingKey: '02Number',
        pairs: range(0xFF10, 0x0030, 10), // ０-９ ⇔ 0-9
    },
    {
        settingKey: '03Brackets',
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
        settingKey: '04Exclamation',
        pairs: [pair(0xFF01, 0x0021)], // ！ ⇔ !
    },
    {
        settingKey: '05Question',
        pairs: [pair(0xFF1F, 0x003F)], // ？ ⇔ ?
    },
    {
        settingKey: '06Operators',
        pairs: [
            pair(0xFF0B, 0x002B), // ＋ ⇔ +
            pair(0xFF1D, 0x003D), // ＝ ⇔ =
            pair(0xFF1C, 0x003C), // ＜ ⇔ <
            pair(0xFF1E, 0x003E), // ＞ ⇔ >
        ],
    },
    {
        settingKey: '07At',
        pairs: [pair(0xFF20, 0x0040)], // ＠ ⇔ @
    },
    {
        settingKey: '08Colon',
        pairs: [pair(0xFF1A, 0x003A)], // ： ⇔ :
    },
    {
        settingKey: '09Semicolon',
        pairs: [pair(0xFF1B, 0x003B)], // ； ⇔ ;
    },
    {
        settingKey: '10Percent',
        pairs: [pair(0xFF05, 0x0025)], // ％ ⇔ %
    },
    {
        settingKey: '11Kuten',
        pairs: [
            pair(0x3002, 0xFF61), // 。 ⇔ ｡ (JIS X 0201)
            pair(0x3001, 0xFF64), // 、 ⇔ ､ (JIS X 0201)
        ],
    },
    {
        settingKey: '12Space',
        pairs: [pair(0x3000, 0x0020)], // 　 ⇔ (space)
    },
    {
        settingKey: '13Yen',
        pairs: [pair(0xFFE5, 0x00A5)], // ￥ ⇔ ¥
    },
    {
        settingKey: '14Tilde',
        pairs: [pair(0xFF5E, 0x007E)], // ～ ⇔ ~
    },
    {
        settingKey: '15Hyphen',
        pairs: [pair(0xFF0D, 0x002D)], // － ⇔ -
    },
    {
        settingKey: '16Underscore',
        pairs: [pair(0xFF3F, 0x005F)], // ＿ ⇔ _
    },
    {
        settingKey: '17Backslash',
        pairs: [pair(0xFF3C, 0x005C)], // ＼ ⇔ \
    },
    {
        settingKey: '18Slash',
        pairs: [pair(0xFF0F, 0x002F)], // ／ ⇔ /
    },
    {
        settingKey: '19Ampersand',
        pairs: [pair(0xFF06, 0x0026)], // ＆ ⇔ &
    },
    {
        settingKey: '20Asterisk',
        pairs: [pair(0xFF0A, 0x002A)], // ＊ ⇔ *
    },
    {
        settingKey: '21Dollar',
        pairs: [pair(0xFF04, 0x0024)], // ＄ ⇔ $
    },
    {
        settingKey: '22Hash',
        pairs: [pair(0xFF03, 0x0023)], // ＃ ⇔ #
    },
    {
        settingKey: '23SingleQuote',
        pairs: [pair(0xFF07, 0x0027)], // ＇ ⇔ '
    },
    {
        settingKey: '24DoubleQuote',
        pairs: [pair(0xFF02, 0x0022)], // ＂ ⇔ "
    },
    {
        settingKey: '25PeriodComma',
        pairs: [
            pair(0xFF0E, 0x002E), // ．⇔ .
            pair(0xFF0C, 0x002C), // ，⇔ ,
        ],
    },
    {
        settingKey: '26Pipe',
        pairs: [pair(0xFF5C, 0x007C)], // ｜ ⇔ |
    },
    {
        settingKey: '27Backquote',
        pairs: [pair(0xFF40, 0x0060)], // ｀ ⇔ `
    },
    {
        settingKey: '28Caret',
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
