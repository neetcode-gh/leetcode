function groupAnagrams(strs: string[]): string[][] {
    const hash: {
        [key: string]: string[];
    } = {};

    strs.forEach((item, index) => {
        let doesExist = false;
        Object.keys(hash).forEach((key) => {
            if (isAnagram(item, key)) {
                hash[key].push(item);
                doesExist = true;
            }
        });

        if (!doesExist) {
            hash[item] = [item];
        }
    });

    console.log(hash);

    return [...Object.keys(hash).map((k) => hash[k])];
}

console.log(groupAnagrams(['eat', 'ate', 'dog', 'pog']));

function isAnagram(s: string, t: string) {
    if (s.length !== t.length) return false;

    var first: Array<string | null> = s.split('');
    const second = t.split('');

    for (let i = 0; i < second.length; i++) {
        const element = second[i];

        let found = first.indexOf(element);

        if (found !== -1) {
            first[found] = null;
        } else {
            return false;
        }
    }

    return true;
}
