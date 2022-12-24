function wordPattern(pattern: string, s: string): boolean {
    const words = s.split(' ');
    const patternToWord = {};
    const wordToPattern = {};

    if (pattern.length != words.length) return false;

    for (let i = 0; i < pattern.length; i++) {
        if (!patternToWord[pattern[i]]) {
            patternToWord[pattern[i]] = words[i];
        }

        if (!wordToPattern[words[i]]) {
            wordToPattern[words[i]] = pattern[i];
        }

        if (
            patternToWord[pattern[i]] !== words[i] ||
            wordToPattern[words[i]] !== pattern[i]
        )
            return false;
    }

    return true;
}
