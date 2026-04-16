/* ============================================================
   FrançAce — Alphabet Data
   French alphabet with phonetics, IPA, examples
   ============================================================ */

export const ALPHABET_DATA = {
    standard: [
        { letter: 'A', upper: 'A', lower: 'a', phonetic: 'ah', ipa: '/a/', example: 'ami', exampleEn: 'friend', audio: 'a' },
        { letter: 'B', upper: 'B', lower: 'b', phonetic: 'bay', ipa: '/be/', example: 'bonjour', exampleEn: 'hello', audio: 'b' },
        { letter: 'C', upper: 'C', lower: 'c', phonetic: 'say', ipa: '/se/', example: 'café', exampleEn: 'coffee', audio: 'c' },
        { letter: 'D', upper: 'D', lower: 'd', phonetic: 'day', ipa: '/de/', example: 'dans', exampleEn: 'in', audio: 'd' },
        { letter: 'E', upper: 'E', lower: 'e', phonetic: 'euh', ipa: '/ə/', example: 'école', exampleEn: 'school', audio: 'e' },
        { letter: 'F', upper: 'F', lower: 'f', phonetic: 'ef', ipa: '/ɛf/', example: 'famille', exampleEn: 'family', audio: 'f' },
        { letter: 'G', upper: 'G', lower: 'g', phonetic: 'zhay', ipa: '/ʒe/', example: 'grand', exampleEn: 'big', audio: 'g' },
        { letter: 'H', upper: 'H', lower: 'h', phonetic: 'ash', ipa: '/aʃ/', example: 'homme', exampleEn: 'man', audio: 'h' },
        { letter: 'I', upper: 'I', lower: 'i', phonetic: 'ee', ipa: '/i/', example: 'île', exampleEn: 'island', audio: 'i' },
        { letter: 'J', upper: 'J', lower: 'j', phonetic: 'zhee', ipa: '/ʒi/', example: 'jour', exampleEn: 'day', audio: 'j' },
        { letter: 'K', upper: 'K', lower: 'k', phonetic: 'kah', ipa: '/ka/', example: 'kilo', exampleEn: 'kilo', audio: 'k' },
        { letter: 'L', upper: 'L', lower: 'l', phonetic: 'el', ipa: '/ɛl/', example: 'livre', exampleEn: 'book', audio: 'l' },
        { letter: 'M', upper: 'M', lower: 'm', phonetic: 'em', ipa: '/ɛm/', example: 'maison', exampleEn: 'house', audio: 'm' },
        { letter: 'N', upper: 'N', lower: 'n', phonetic: 'en', ipa: '/ɛn/', example: 'neuf', exampleEn: 'nine/new', audio: 'n' },
        { letter: 'O', upper: 'O', lower: 'o', phonetic: 'oh', ipa: '/o/', example: 'orange', exampleEn: 'orange', audio: 'o' },
        { letter: 'P', upper: 'P', lower: 'p', phonetic: 'pay', ipa: '/pe/', example: 'petit', exampleEn: 'small', audio: 'p' },
        { letter: 'Q', upper: 'Q', lower: 'q', phonetic: 'kew', ipa: '/ky/', example: 'quatre', exampleEn: 'four', audio: 'q' },
        { letter: 'R', upper: 'R', lower: 'r', phonetic: 'air', ipa: '/ɛʁ/', example: 'rouge', exampleEn: 'red', audio: 'r' },
        { letter: 'S', upper: 'S', lower: 's', phonetic: 'es', ipa: '/ɛs/', example: 'soleil', exampleEn: 'sun', audio: 's' },
        { letter: 'T', upper: 'T', lower: 't', phonetic: 'tay', ipa: '/te/', example: 'table', exampleEn: 'table', audio: 't' },
        { letter: 'U', upper: 'U', lower: 'u', phonetic: 'ew', ipa: '/y/', example: 'une', exampleEn: 'one (f)', audio: 'u' },
        { letter: 'V', upper: 'V', lower: 'v', phonetic: 'vay', ipa: '/ve/', example: 'ville', exampleEn: 'city', audio: 'v' },
        { letter: 'W', upper: 'W', lower: 'w', phonetic: 'doob-luh-vay', ipa: '/dubləve/', example: 'wagon', exampleEn: 'wagon', audio: 'w' },
        { letter: 'X', upper: 'X', lower: 'x', phonetic: 'eeks', ipa: '/iks/', example: 'exercice', exampleEn: 'exercise', audio: 'x' },
        { letter: 'Y', upper: 'Y', lower: 'y', phonetic: 'ee-grek', ipa: '/igʁɛk/', example: 'yeux', exampleEn: 'eyes', audio: 'y' },
        { letter: 'Z', upper: 'Z', lower: 'z', phonetic: 'zed', ipa: '/zɛd/', example: 'zéro', exampleEn: 'zero', audio: 'z' }
    ],
    accented: [
        { letter: 'É', name: 'e accent aigu', phonetic: 'ay', ipa: '/e/', example: 'été', exampleEn: 'summer', description: 'Closed "e" sound, like "ay" in "say"' },
        { letter: 'È', name: 'e accent grave', phonetic: 'eh', ipa: '/ɛ/', example: 'mère', exampleEn: 'mother', description: 'Open "e" sound, like "e" in "bed"' },
        { letter: 'Ê', name: 'e accent circonflexe', phonetic: 'eh', ipa: '/ɛ/', example: 'fête', exampleEn: 'party', description: 'Open "e", often replaces historical "s"' },
        { letter: 'Ë', name: 'e tréma', phonetic: 'eh', ipa: '/ɛ/', example: 'Noël', exampleEn: 'Christmas', description: 'Indicates separate vowel pronunciation' },
        { letter: 'À', name: 'a accent grave', phonetic: 'ah', ipa: '/a/', example: 'là', exampleEn: 'there', description: 'Distinguishes words (a/à, la/là)' },
        { letter: 'Â', name: 'a accent circonflexe', phonetic: 'ah', ipa: '/ɑ/', example: 'château', exampleEn: 'castle', description: 'Slightly longer "a" sound' },
        { letter: 'Ç', name: 'c cédille', phonetic: 'ss', ipa: '/s/', example: 'français', exampleEn: 'French', description: 'Soft "c" before a, o, u' },
        { letter: 'Ù', name: 'u accent grave', phonetic: 'ew', ipa: '/y/', example: 'où', exampleEn: 'where', description: 'Only in "où" (where)' },
        { letter: 'Û', name: 'u accent circonflexe', phonetic: 'ew', ipa: '/y/', example: 'sûr', exampleEn: 'sure', description: 'Lengthened "u" sound' },
        { letter: 'Ü', name: 'u tréma', phonetic: 'ew', ipa: '/y/', example: 'aigüe', exampleEn: 'acute', description: 'Rare, indicates separate pronunciation' },
        { letter: 'Ô', name: 'o accent circonflexe', phonetic: 'oh', ipa: '/o/', example: 'hôtel', exampleEn: 'hotel', description: 'Closed "o" sound' },
        { letter: 'Î', name: 'i accent circonflexe', phonetic: 'ee', ipa: '/i/', example: 'île', exampleEn: 'island', description: 'Historical marker, same "i" sound' },
        { letter: 'Ï', name: 'i tréma', phonetic: 'ee', ipa: '/i/', example: 'naïf', exampleEn: 'naive', description: 'Separate vowel pronunciation' },
        { letter: 'Œ', name: 'o-e ligature', phonetic: 'uh/er', ipa: '/œ/', example: 'œuf', exampleEn: 'egg', description: 'Unique French sound (rounded)' },
        { letter: 'Æ', name: 'a-e ligature', phonetic: 'ay', ipa: '/e/', example: 'et cætera', exampleEn: 'etc.', description: 'Rare, mainly in Latin loanwords' },
        { letter: 'Ÿ', name: 'y tréma', phonetic: 'ee', ipa: '/i/', example: "L'Haÿ-les-Roses", exampleEn: 'place name', description: 'Very rare, only in proper nouns' }
    ],
    quizzes: [
        { type: 'sound-to-letter', question: 'Which letter makes the "zhay" sound?', options: ['G', 'J', 'C', 'S'], answer: 'G' },
        { type: 'sound-to-letter', question: 'Which letter makes the "ew" sound?', options: ['O', 'U', 'E', 'I'], answer: 'U' },
        { type: 'sound-to-letter', question: 'Which letter makes the "air" sound?', options: ['E', 'H', 'R', 'A'], answer: 'R' },
        { type: 'letter-to-sound', question: 'How is "Q" pronounced in French?', options: ['kew', 'kwah', 'koo', 'kay'], answer: 'kew' },
        { type: 'letter-to-sound', question: 'How is "W" pronounced in French?', options: ['wee', 'way', 'doob-luh-vay', 'vay'], answer: 'doob-luh-vay' },
        { type: 'accent', question: 'What does the cédille (ç) do?', options: ['Makes C soft before A/O/U', 'Makes C silent', 'Makes C hard', 'Lengthens vowel'], answer: 'Makes C soft before A/O/U' },
        { type: 'accent', question: 'What is the difference between é and è?', options: ['é is closed (ay), è is open (eh)', 'No difference', 'é is silent', 'è is nasal'], answer: 'é is closed (ay), è is open (eh)' },
        { type: 'example', question: 'Which word contains the letter "Ç"?', options: ['français', 'café', 'famille', 'école'], answer: 'français' },
        { type: 'sound-to-letter', question: 'Which letter is called "ee-grek"?', options: ['I', 'Y', 'E', 'G'], answer: 'Y' },
        { type: 'accent', question: 'What is "Œ" called?', options: ['O tréma', 'O-E ligature', 'O grave', 'Double O'], answer: 'O-E ligature' }
    ]
};

