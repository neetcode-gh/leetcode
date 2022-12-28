function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const store = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        store[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        store[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
    }

    for (let i = 0; i < store.length; i++) {
        if (store[i] !== 0) return false;
    }

    return true;
}
