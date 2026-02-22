// Old Turkic (Göktürk) Script Dictionary
// Based on Unicode block U+10C00–U+10C48
// Orkhon = classic Orkhon Valley inscriptions (8th c.)
// Yenisei = Yenisei River basin variant
//
// Consonants marked ¹ = back/heavy vowel context (a, ı, o, u)
// Consonants marked ² = front/light vowel context (e, i, ö, ü)
// Transliteration: Türkçe klavyeye uygun — ab/ba, eb/be, ç, ş, ng

export const tamgaDictionary = {
  'orkhon': {
    // Ünlüler
    'o_group1': { characters: {
      '𐰀': ['a'],
      '𐰃': ['i'],
      '𐰆': ['o', 'u'],
      '𐰇': ['ö', 'ü'],
    }},

    // Kalın ünsüzler (back vowel: a, ı, o, u)
    'o_group2': { characters: {
      '𐰉': ['ab', 'ba'],
      '𐰑': ['ad', 'da'],
      '𐰍': ['ag', 'ga'],
      '𐰴': ['ak', 'ka'],
    }},
    'o_group3': { characters: {
      '𐰞': ['al', 'la'],
      '𐰣': ['an', 'na'],
      '𐰺': ['ar', 'ra'],
      '𐰽': ['as', 'sa'],
    }},
    'o_group4': { characters: {
      '𐱃': ['at', 'ta'],
      '𐰖': ['ay', 'ya'],
      '𐰸': ['ok'],
      '𐰶': ['ik'],
    }},

    // İnce ünsüzler (front vowel: e, i, ö, ü)
    'o_group5': { characters: {
      '𐰋': ['eb', 'be'],
      '𐰓': ['ed', 'de'],
      '𐰏': ['eg', 'ge'],
      '𐰚': ['ek', 'ke'],
    }},
    'o_group6': { characters: {
      '𐰠': ['el', 'le'],
      '𐰤': ['en', 'ne'],
      '𐰼': ['er', 're'],
      '𐰾': ['es', 'se'],
    }},
    'o_group7': { characters: {
      '𐱅': ['et', 'te'],
      '𐰘': ['ey', 'ye'],
      '𐰜': ['ök'],
      '𐰲': ['ç'],
    }},

    // Nötr (ses uyumundan bağımsız)
    'o_group8': { characters: {
      '𐰢': ['m'],
      '𐰯': ['p'],
      '𐰔': ['z'],
      '𐱁': ['ş'],
    }},
    'o_group9': { characters: {
      '𐰭': ['ng'],
      '𐰱': ['iç'],
    }},

    // Küme sesler
    'o_group10_a': { characters: {
      '𐰡': ['lt'],
      '𐰦': ['nt'],
      '𐰨': ['nç'],
      '𐰪': ['ny'],
    }},
    'o_group11_a': { characters: {
      '𐰿': ['aş'],
      '𐱇': ['ot', 'ut'],
      '𐱈': ['baş'],
    }},
  },

  'yenisei': {
    // Ünlüler
    'y_group1': { characters: {
      '𐰁': ['a'],
      '𐰂': ['ae'],
      '𐰄': ['i'],
      '𐰅': ['e'],
      '𐰈': ['ö', 'ü'],
    }},

    // Kalın ünsüzler
    'y_group2': { characters: {
      '𐰊': ['ab', 'ba'],
      '𐰒': ['ad', 'da'],
      '𐰎': ['ag', 'ga'],
      '𐰵': ['ak', 'ka'],
    }},
    'y_group3': { characters: {
      '𐰟': ['al', 'la'],
      '𐰻': ['ar', 'ra'],
      '𐰹': ['ok'],
      '𐰷': ['ik'],
    }},

    // İnce ünsüzler
    'y_group4': { characters: {
      '𐰌': ['eb', 'be'],
      '𐰐': ['eg', 'ge'],
      '𐰛': ['ek', 'ke'],
      '𐰥': ['en', 'ne'],
    }},
    'y_group5': { characters: {
      '𐰗': ['ay', 'ya'],
      '𐰙': ['ey', 'ye'],
      '𐰝': ['ök'],
      '𐰳': ['ç'],
    }},

    // Nötr
    'y_group6': { characters: {
      '𐰕': ['z'],
      '𐰮': ['ng'],
      '𐰬': ['ng'],
      '𐱂': ['ş'],
    }},

    // Küme sesler
    'y_group7_a': { characters: {
      '𐰧': ['nt'],
      '𐰩': ['nç'],
      '𐰫': ['ny'],
    }},
    'y_group8_a': { characters: {
      '𐱀': ['aş'],
      '𐱄': ['t'],
      '𐱆': ['t'],
    }},
  },
};
