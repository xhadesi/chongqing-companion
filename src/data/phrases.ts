export interface Phrase {
    id: string;
    fr: string;
    cn: string;
    pinyin: string;
}

export type PhraseCategory = keyof typeof PHRASES;

export const PHRASES: Record<string, Phrase[]> = {
    "Bases": [
        { id: "hello", fr: "Bonjour", cn: "你好", pinyin: "Nǐ hǎo" },
        { id: "thankyou", fr: "Merci", cn: "谢谢", pinyin: "Xièxie" },
        { id: "yes", fr: "Oui", cn: "是", pinyin: "Shì" },
        { id: "no", fr: "Non", cn: "不是", pinyin: "Bú shì" },
        { id: "sorry", fr: "Pardon / Désolé", cn: "对不起", pinyin: "Duìbuqǐ" },
    ],
    "Transport": [
        { id: "taxi", fr: "Taxi", cn: "出租车", pinyin: "Chūzūchē" },
        { id: "metro", fr: "Métro", cn: "地铁", pinyin: "Dìtiě" },
        { id: "airport", fr: "Aéroport", cn: "机场", pinyin: "Jīchǎng" },
        { id: "here", fr: "Je veux aller ici", cn: "我要去这里", pinyin: "Wǒ yào qù zhèlǐ" },
    ],
    "Cuisine": [
        { id: "nospicy", fr: "Pas pimenté", cn: "不要辣", pinyin: "Bùyào là" },
        { id: "water", fr: "Eau", cn: "水", pinyin: "Shuǐ" },
        { id: "bill", fr: "L'addition", cn: "买单", pinyin: "Mǎidān" },
        { id: "toilet", fr: "Toilettes", cn: "洗手间", pinyin: "Xǐshǒujiān" },
    ],
    "Urgence": [
        { id: "help", fr: "Au secours", cn: "救命", pinyin: "Jiùmìng" },
        { id: "hospital", fr: "Hôpital", cn: "医院", pinyin: "Yīyuàn" },
        { id: "police", fr: "Police", cn: "警察", pinyin: "Jǐngchá" },
    ],
};
