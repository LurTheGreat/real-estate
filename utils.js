function normalizeDigits(text) {
    return text
        .replace(/[۰-۹]/g, digit => digit.charCodeAt(0) - 0x06F0)
        .replace(/[٠-٩]/g, digit => digit.charCodeAt(0) - 0x0660)
        .replace(/٫/g, '.');
}

// Typed text to number: accepts Persian, Arabic and English digits,
// and ignores thousand separators and spaces. Empty or invalid becomes 0.
function toNumber(text) {
    const cleaned = normalizeDigits(text).replace(/[,٬\s]/g, '');
    const number = Number(cleaned);
    return Number.isNaN(number) ? 0 : number;
}

// For searching: makes two texts comparable
function normalizeText(text) {
    return normalizeDigits(text)
        .replace(/ي/g, 'ی')
        .replace(/ك/g, 'ک')
        .replace(/[\u064B-\u065F\u0640]/g, '') // diacritics and tatweel
        .replace(/\u200c/g, ' ') // half-space becomes a normal space
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}