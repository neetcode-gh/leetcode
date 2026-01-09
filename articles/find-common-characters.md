## 1. Frequency Count

### Intuition

A character appears in all words only if it exists in every single word. Moreover, if a character appears twice in every word, we can include it twice in our result. The key insight is to track the minimum frequency of each character across all words. We start with the frequency counts from the first word, then for each subsequent word, we reduce each count to the minimum of the current count and that word's count.

### Algorithm

1. Initialize a frequency array `cnt` of size `26` (for lowercase letters) with large values (or use the first word's counts).
2. For each word, count character frequencies in `curCnt`.
3. For each character, update `cnt[c] = min(cnt[c], curCnt[c])`.
4. Build the result by adding each character `cnt[c]` times.
5. Return the result list.

::tabs-start

```python
class Solution:
    def commonChars(self, words: List[str]) -> List[str]:
        cnt = Counter(words[0])

        for w in words:
            cur_cnt = Counter(w)
            for c in cnt:
                cnt[c] = min(cnt[c], cur_cnt[c])

        res = []
        for c in cnt:
            for i in range(cnt[c]):
                res.append(c)

        return res
```

```java
public class Solution {
    public List<String> commonChars(String[] words) {
        int[] cnt = new int[26];
        Arrays.fill(cnt, Integer.MAX_VALUE);

        for (String word : words) {
            int[] curCnt = new int[26];
            for (char c : word.toCharArray()) {
                curCnt[c - 'a']++;
            }

            for (int i = 0; i < 26; i++) {
                cnt[i] = Math.min(cnt[i], curCnt[i]);
            }
        }

        List<String> res = new ArrayList<>();
        for (int i = 0; i < 26; i++) {
            for (int j = 0; j < cnt[i]; j++) {
                res.add(String.valueOf((char) (i + 'a')));
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> commonChars(vector<string>& words) {
        vector<int> cnt(26, INT_MAX);

        for (string& word : words) {
            vector<int> curCnt(26, 0);
            for (char c : word) {
                curCnt[c - 'a']++;
            }

            for (int i = 0; i < 26; i++) {
                cnt[i] = min(cnt[i], curCnt[i]);
            }
        }

        vector<string> res;
        for (int i = 0; i < 26; i++) {
            for (int j = 0; j < cnt[i]; j++) {
                res.push_back(string(1, i + 'a'));
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string[]}
     */
    commonChars(words) {
        const cnt = new Array(26).fill(Infinity);

        for (let word of words) {
            const curCnt = new Array(26).fill(0);
            for (let c of word) {
                curCnt[c.charCodeAt(0) - 97]++;
            }

            for (let i = 0; i < 26; i++) {
                cnt[i] = Math.min(cnt[i], curCnt[i]);
            }
        }

        const res = [];
        for (let i = 0; i < 26; i++) {
            for (let j = 0; j < cnt[i]; j++) {
                res.push(String.fromCharCode(i + 97));
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<string> CommonChars(string[] words) {
        int[] cnt = new int[26];
        Array.Fill(cnt, int.MaxValue);

        foreach (string word in words) {
            int[] curCnt = new int[26];
            foreach (char c in word) {
                curCnt[c - 'a']++;
            }

            for (int i = 0; i < 26; i++) {
                cnt[i] = Math.Min(cnt[i], curCnt[i]);
            }
        }

        List<string> res = new List<string>();
        for (int i = 0; i < 26; i++) {
            for (int j = 0; j < cnt[i]; j++) {
                res.Add(((char)(i + 'a')).ToString());
            }
        }

        return res;
    }
}
```

```go
func commonChars(words []string) []string {
    cnt := make([]int, 26)
    for i := range cnt {
        cnt[i] = math.MaxInt32
    }

    for _, word := range words {
        curCnt := make([]int, 26)
        for _, c := range word {
            curCnt[c-'a']++
        }

        for i := 0; i < 26; i++ {
            if curCnt[i] < cnt[i] {
                cnt[i] = curCnt[i]
            }
        }
    }

    res := []string{}
    for i := 0; i < 26; i++ {
        for j := 0; j < cnt[i]; j++ {
            res = append(res, string(rune(i+'a')))
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun commonChars(words: Array<String>): List<String> {
        val cnt = IntArray(26) { Int.MAX_VALUE }

        for (word in words) {
            val curCnt = IntArray(26)
            for (c in word) {
                curCnt[c - 'a']++
            }

            for (i in 0 until 26) {
                cnt[i] = minOf(cnt[i], curCnt[i])
            }
        }

        val res = mutableListOf<String>()
        for (i in 0 until 26) {
            repeat(cnt[i]) {
                res.add((i + 'a'.code).toChar().toString())
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func commonChars(_ words: [String]) -> [String] {
        var cnt = [Int](repeating: Int.max, count: 26)

        for word in words {
            var curCnt = [Int](repeating: 0, count: 26)
            for c in word {
                curCnt[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
            }

            for i in 0..<26 {
                cnt[i] = min(cnt[i], curCnt[i])
            }
        }

        var res = [String]()
        for i in 0..<26 {
            for _ in 0..<cnt[i] {
                res.append(String(Character(UnicodeScalar(i + Int(Character("a").asciiValue!))!)))
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity:
    - $O(1)$ extra space, since we have at most $26$ different characters.
    - $O(n * m)$ space for the output list.

> Where $n$ is the number of words and $m$ is the length of the longest word.
