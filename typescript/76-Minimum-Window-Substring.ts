function minWindow(s: string, t: string): string {
    let minL = 0;
    let minR = s.length;

    //create string t hashmap and needed
    const tCount = {};
    let needed = 0;
    for (let i = 0; i < t.length; i++) {
        if (t[i] in tCount) tCount[t[i]]++;
        else {
            tCount[t[i]] = 1;
            needed++;
        }
    }

    //initialize winCount(empty)
    const winCount = {};
    let matched = 0;

    let l = 0;

    for (let r = 0; r < s.length; r++) {
        //update winCount with adding s[r]
        if (s[r] in winCount) winCount[s[r]]++;
        else winCount[s[r]] = 1;
        //update matched
        if (s[r] in tCount && winCount[s[r]] === tCount[s[r]]) matched++;

        //the window is valid
        while (matched === needed) {
            //update min
            if (r - l + 1 < minR - minL + 1) {
                minL = l;
                minR = r;
            }

            //remove l
            //update matched
            if (s[l] in tCount && winCount[s[l]] === tCount[s[l]]) matched--;
            //update winCount with the removal of s[l]
            winCount[s[l]]--;
            if (winCount[s[l]] === 0) delete winCount[s[l]];
            l++;
        }
    }

    return minR - minL + 1 > s.length ? '' : s.slice(minL, minR + 1);
}
