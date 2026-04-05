// pinyinDeck.js
window.PINYIN_DECK = {
  suits: {
    L: { name: "听力", label: "Listening", icon: "👂💧" },
    S: { name: "口说", label: "Speaking",  icon: "👄🔥" },
    R: { name: "阅读", label: "Reading",   icon: "👀🌱" },
    W: { name: "书写", label: "Writing",   icon: "✍️🌬" }
  },

  cards: [
    // L 组：听・水
    { suit:"L", hex:"0", main:"ˊ",   hanzi:"牙",   pinyin:"yá",       emoji:"🦷"    },
    { suit:"L", hex:"1", main:"b",   hanzi:"包",   pinyin:"bāo",      emoji:"👛"    },
    { suit:"L", hex:"2", main:"d",   hanzi:"灯",   pinyin:"dēng",     emoji:"💡"    },
    { suit:"L", hex:"3", main:"g",   hanzi:"狗",   pinyin:"gǒu",      emoji:"🐶"    },
    { suit:"L", hex:"4", main:"q",   hanzi:"球",   pinyin:"qiú",      emoji:"⚽"    },
    { suit:"L", hex:"5", main:"sh",  hanzi:"书",   pinyin:"shū",      emoji:"📖"    },
    { suit:"L", hex:"6", main:"s",   hanzi:"伞",   pinyin:"sǎn",      emoji:"☂️"    },
    { suit:"L", hex:"7", main:"i",   hanzi:"衣",   pinyin:"yī",       emoji:"👕"    },
    { suit:"L", hex:"8", main:"ei",  hanzi:"杯",   pinyin:"bēi",      emoji:"🥤"    },
    { suit:"L", hex:"9", main:"ia",  hanzi:"鸭",   pinyin:"yā",       emoji:"🦆"    },
    { suit:"L", hex:"A", main:"ua",  hanzi:"袜",   pinyin:"wà",       emoji:"🧦"    },
    { suit:"L", hex:"B", main:"ang", hanzi:"羊",   pinyin:"yáng",     emoji:"🐑"    },
    { suit:"L", hex:"C", main:"in",  hanzi:"音",   pinyin:"yīn",      emoji:"🎵"    },
    { suit:"L", hex:"D", main:"uan", hanzi:"碗",   pinyin:"wǎn",      emoji:"🍚"    },
    { suit:"L", hex:"E", main:"ün",  hanzi:"云",   pinyin:"yún",      emoji:"☁️"    },
    { suit:"L", hex:"F", main:"en",  hanzi:"恩",   pinyin:"ēn",       emoji:"🙏"    },

    // S 组：说・火
    { suit:"S", hex:"0", main:"ˇ",   hanzi:"哑",   pinyin:"yǎ",       emoji:"🤐"    },
    { suit:"S", hex:"1", main:"p",   hanzi:"跑",   pinyin:"pǎo",      emoji:"🏃"    },
    { suit:"S", hex:"2", main:"t",   hanzi:"兔",   pinyin:"tù",       emoji:"🐰"    },
    { suit:"S", hex:"3", main:"k",   hanzi:"卡",   pinyin:"kǎ",       emoji:"💳"    },
    { suit:"S", hex:"4", main:"x",   hanzi:"洗",   pinyin:"xǐ",       emoji:"🧼"    },
    { suit:"S", hex:"5", main:"r",   hanzi:"肉",   pinyin:"ròu",      emoji:"🍖"    },
    { suit:"S", hex:"6", main:"a",   hanzi:"哈",   pinyin:"hā",       emoji:"😆"    },
    { suit:"S", hex:"7", main:"u",   hanzi:"猪",   pinyin:"zhū",      emoji:"🐷"    },
    { suit:"S", hex:"8", main:"ao",  hanzi:"猫",   pinyin:"māo",      emoji:"🐱"    },
    { suit:"S", hex:"9", main:"ie",  hanzi:"写",   pinyin:"xiě",      emoji:"✍️"    },
    { suit:"S", hex:"A", main:"uo",  hanzi:"火",   pinyin:"huǒ",      emoji:"🔥"    },
    { suit:"S", hex:"B", main:"eng", hanzi:"冷",   pinyin:"lěng",     emoji:"🥶"    },
    { suit:"S", hex:"C", main:"iang",hanzi:"想",   pinyin:"xiǎng",    emoji:"🤔"    },
    { suit:"S", hex:"D", main:"uai", hanzi:"坏",   pinyin:"huài",     emoji:"😈"    },
    { suit:"S", hex:"E", main:"er",  hanzi:"耳",   pinyin:"ěr",       emoji:"👂"    },
    { suit:"S", hex:"F", main:"üe",  hanzi:"雪",   pinyin:"xuě",      emoji:"❄️"    },

    // R 组：读・土
    { suit:"R", hex:"0", main:"ˋ",   hanzi:"亚",   pinyin:"yà",       emoji:"👘"    },
    { suit:"R", hex:"1", main:"m",   hanzi:"马",   pinyin:"mǎ",       emoji:"🐴"    },
    { suit:"R", hex:"2", main:"n",   hanzi:"牛",   pinyin:"niú",      emoji:"🐮"    },
    { suit:"R", hex:"3", main:"h",   hanzi:"花",   pinyin:"huā",      emoji:"🌺"    },
    { suit:"R", hex:"4", main:"zh",  hanzi:"钟",   pinyin:"zhōng",    emoji:"⏰"    },
    { suit:"R", hex:"5", main:"z",   hanzi:"字",   pinyin:"zì",       emoji:"🔤"    },
    { suit:"R", hex:"6", main:"o",   hanzi:"锅",   pinyin:"guō",      emoji:"🍲"    },
    { suit:"R", hex:"7", main:"ü",   hanzi:"鱼",   pinyin:"yú",       emoji:"🐟"    },
    { suit:"R", hex:"8", main:"ou",  hanzi:"口",   pinyin:"kǒu",      emoji:"👄"    },
    { suit:"R", hex:"9", main:"iao", hanzi:"小",   pinyin:"xiǎo",     emoji:"🤏"    },
    { suit:"R", hex:"A", main:"un",  hanzi:"问",   pinyin:"wèn",      emoji:"❓"    },
    { suit:"R", hex:"B", main:"ong", hanzi:"龙",   pinyin:"lóng",     emoji:"🐲"    },
    { suit:"R", hex:"C", main:"ing", hanzi:"星",   pinyin:"xīng",     emoji:"⭐"    },
    { suit:"R", hex:"D", main:"uang",hanzi:"光",   pinyin:"guāng",    emoji:"🔦"    },
    { suit:"R", hex:"E", main:"ê",   hanzi:"耶",   pinyin:"yē",       emoji:"✌️"    },
    { suit:"R", hex:"F", main:"ueng",hanzi:"翁",   pinyin:"wēng",     emoji:"👴"    },

    // W 组：写・风
    { suit:"W", hex:"0", main:"·",   hanzi:"呀",   pinyin:"ya",       emoji:"❗"    },
    { suit:"W", hex:"1", main:"f",   hanzi:"风",   pinyin:"fēng",     emoji:"🌬️"   },
    { suit:"W", hex:"2", main:"l",   hanzi:"篮",   pinyin:"lán",      emoji:"🧺"    },
    { suit:"W", hex:"3", main:"j",   hanzi:"鸡",   pinyin:"jī",       emoji:"🐔"    },
    { suit:"W", hex:"4", main:"ch",  hanzi:"车",   pinyin:"chē",      emoji:"🚗"    },
    { suit:"W", hex:"5", main:"c",   hanzi:"菜",   pinyin:"cài",      emoji:"🥬"    },
    { suit:"W", hex:"6", main:"e",   hanzi:"鹅",   pinyin:"é",        emoji:"🦢"    },
    { suit:"W", hex:"7", main:"ai",  hanzi:"爱",   pinyin:"ài",       emoji:"❤️"    },
    { suit:"W", hex:"8", main:"an",  hanzi:"山",   pinyin:"shān",     emoji:"⛰️"    },
    { suit:"W", hex:"9", main:"iu",  hanzi:"油",   pinyin:"yóu",      emoji:"🛢️"    },
    { suit:"W", hex:"A", main:"ui",  hanzi:"对",   pinyin:"duì",      emoji:"✔️"    },
    { suit:"W", hex:"B", main:"ian", hanzi:"钱",   pinyin:"qián",     emoji:"💰"    },
    { suit:"W", hex:"C", main:"iong",hanzi:"熊",   pinyin:"xióng",    emoji:"🐻"    },
    { suit:"W", hex:"D", main:"üan", hanzi:"拳",   pinyin:"quán",     emoji:"👊"    },
    { suit:"W", hex:"E", main:"yo",  hanzi:"哟",   pinyin:"yō",       emoji:"😮"    },
    { suit:"W", hex:"F", main:"wei", hanzi:"围",   pinyin:"wéi",      emoji:"🧣"    }
  ]
};