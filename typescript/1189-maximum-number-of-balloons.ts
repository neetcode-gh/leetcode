function maxNumberOfBalloons(text: string): number {
    let countText = {};
    let balloon = {};
    let result = text.length;

    for (let ch of text) {
        countText[ch] = (countText[ch] || 0) + 1;
    }

    for (let ch of 'balloon') {
        balloon[ch] = (balloon[ch] || 0) + 1;
    }

    for (let c in balloon) {
        result = Math.min(result, Math.floor((countText[c] || 0) / balloon[c]));
    }

    return result;
}
