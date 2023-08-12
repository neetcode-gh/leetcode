// Time complexity: O(N)
// Space complexity: O(1)

function maxVowels(s: string, k: number): number {
    const vowels: Set<string> = new Set(['a', 'e', 'i', 'o', 'u']);
    let [left, right]: [number, number] = [0, 0];
    let count: number = 0;
    let result: number = 0;

    while (right < s.length) {
        count += vowels.has(s[right]) ? 1 : 0;

        if (right - left + 1 > k) {
            count -= vowels.has(s[left]) ? 1 : 0;
            left++;
        }
        right += 1;

        result = Math.max(result, count);
    }

    return result;
}
