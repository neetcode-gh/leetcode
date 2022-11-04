function isIsomorphic(s: string, t: string): boolean {
    const mapST = {};
    const mapTS = {};

    for (let i = 0; i < s.length; i++) {
        let c1 = s[i];
        let c2 = t[i];

        if ((mapST[c1] && mapST[c1] !== c2) || (mapTS[c2] && mapTS[c2] !== c1))
            return false;

        mapST[c1] = c2;
        mapTS[c2] = c1;
    }

    return true;
}
