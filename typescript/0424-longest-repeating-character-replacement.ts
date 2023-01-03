function characterReplacement(s: string, k: number): number {
    const charCount = {};

    let max = 0;

    let domChar = 0;

    let l = 0;

    for (let r = 0; r < s.length; r++) {
        if (s[r] in charCount) charCount[s[r]]++;
        else charCount[s[r]] = 1;

        domChar = Math.max(domChar, charCount[s[r]]);

        //if the window size minus the count of the dominant character(number of replacements needed) is bigger than k, invalid
        while (r - l + 1 - domChar > k) {
            charCount[s[l]]--;
            if (charCount[s[l]] === 0) delete charCount[s[l]];
            l++;
        }

        max = Math.max(max, r - l + 1);
    }

    return max;
}
