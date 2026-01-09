## 1. Hash Map - I

### Intuition

To form the word "balloon", we need specific counts of each letter: one each of 'b', 'a', 'n', and two each of 'l' and 'o'. The number of times we can spell "balloon" is limited by whichever required letter runs out first. By counting all letters in the text and then dividing by the required amounts, we find how many complete words we can form.

### Algorithm

1. Count the frequency of each character in the input text using a hash map.
2. Create a hash map for the word "balloon" with the required count of each character.
3. For each character in "balloon", calculate how many times it can satisfy the requirement by dividing the available count by the required count.
4. Return the minimum across all characters, as this determines the bottleneck.

::tabs-start

```python
class Solution:
    def maxNumberOfBalloons(self, text: str) -> int:
        countText = Counter(text)
        balloon = Counter("balloon")

        res = len(text)
        for c in balloon:
            res = min(res, countText[c] // balloon[c])
        return res
```

```java
public class Solution {
    public int maxNumberOfBalloons(String text) {
        Map<Character, Integer> countText = new HashMap<>();
        for (char c : text.toCharArray()) {
            countText.put(c, countText.getOrDefault(c, 0) + 1);
        }

        Map<Character, Integer> balloon = new HashMap<>();
        for (char c : "balloon".toCharArray()) {
            balloon.put(c, balloon.getOrDefault(c, 0) + 1);
        }

        int res = text.length();
        for (char c : balloon.keySet()) {
            res = Math.min(res, countText.getOrDefault(c, 0) / balloon.get(c));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxNumberOfBalloons(string text) {
        unordered_map<char, int> countText;
        for (char c : text) {
            countText[c]++;
        }

        unordered_map<char, int> balloon = {{'b', 1}, {'a', 1},
                                            {'l', 2}, {'o', 2}, {'n', 1}};

        int res = text.length();
        for (auto& entry : balloon) {
            res = min(res, countText[entry.first] / entry.second);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} text
     * @return {number}
     */
    maxNumberOfBalloons(text) {
        const countText = {};
        for (const c of text) {
            countText[c] = (countText[c] || 0) + 1;
        }

        const balloon = { b: 1, a: 1, l: 2, o: 2, n: 1 };

        let res = text.length;
        for (const c in balloon) {
            res = Math.min(res, Math.floor((countText[c] || 0) / balloon[c]));
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxNumberOfBalloons(string text) {
        Dictionary<char, int> countText = new Dictionary<char, int>();
        foreach (char c in text) {
            if (!countText.ContainsKey(c)) countText[c] = 0;
            countText[c]++;
        }

        Dictionary<char, int> balloon = new Dictionary<char, int> {
            {'b', 1}, {'a', 1}, {'l', 2}, {'o', 2}, {'n', 1}
        };

        int res = text.Length;
        foreach (var entry in balloon) {
            int count = countText.ContainsKey(entry.Key) ? countText[entry.Key] : 0;
            res = Math.Min(res, count / entry.Value);
        }
        return res;
    }
}
```

```go
func maxNumberOfBalloons(text string) int {
    countText := make(map[rune]int)
    for _, c := range text {
        countText[c]++
    }

    balloon := map[rune]int{'b': 1, 'a': 1, 'l': 2, 'o': 2, 'n': 1}

    res := len(text)
    for c, need := range balloon {
        if countText[c]/need < res {
            res = countText[c] / need
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxNumberOfBalloons(text: String): Int {
        val countText = mutableMapOf<Char, Int>()
        for (c in text) {
            countText[c] = countText.getOrDefault(c, 0) + 1
        }

        val balloon = mapOf('b' to 1, 'a' to 1, 'l' to 2, 'o' to 2, 'n' to 1)

        var res = text.length
        for ((c, need) in balloon) {
            res = minOf(res, (countText[c] ?: 0) / need)
        }
        return res
    }
}
```

```swift
class Solution {
    func maxNumberOfBalloons(_ text: String) -> Int {
        var countText = [Character: Int]()
        for c in text {
            countText[c, default: 0] += 1
        }

        let balloon: [Character: Int] = ["b": 1, "a": 1, "l": 2, "o": 2, "n": 1]

        var res = text.count
        for (c, need) in balloon {
            res = min(res, (countText[c] ?? 0) / need)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 2. Hash Map - II

### Intuition

We can optimize by only counting the five relevant characters ('b', 'a', 'l', 'o', 'n') instead of all 26 letters. After counting, we adjust for 'l' and 'o' by dividing their counts by 2 since each "balloon" requires two of each. The minimum count then gives our answer directly.

### Algorithm

1. Iterate through the text and only count characters that appear in "balon" (the unique letters of "balloon").
2. If fewer than 5 distinct characters are counted, return `0` (cannot form even one "balloon").
3. Divide the counts of `'l'` and `'o'` by `2` to account for needing two of each.
4. Return the minimum value among all five character counts.

::tabs-start

```python
class Solution:
    def maxNumberOfBalloons(self, text: str) -> int:
        mp = defaultdict(int)
        for c in text:
            if c in "balon":
                mp[c] += 1

        if len(mp) < 5:
            return 0

        mp['l'] //= 2
        mp['o'] //= 2
        return min(mp.values())
```

```java
public class Solution {
    public int maxNumberOfBalloons(String text) {
        Map<Character, Integer> mp = new HashMap<>();
        for (char c : text.toCharArray()) {
            if ("balon".indexOf(c) != -1) {
                mp.put(c, mp.getOrDefault(c, 0) + 1);
            }
        }

        if (mp.size() < 5) {
            return 0;
        }

        mp.put('l', mp.get('l') / 2);
        mp.put('o', mp.get('o') / 2);
        return Collections.min(mp.values());
    }
}
```

```cpp
class Solution {
public:
    int maxNumberOfBalloons(string text) {
        unordered_map<char, int> mp;
        for (char c : text) {
            if (string("balon").find(c) != string::npos) {
                mp[c]++;
            }
        }

        if (mp.size() < 5) {
            return 0;
        }

        mp['l'] /= 2;
        mp['o'] /= 2;
        return min({mp['b'], mp['a'], mp['l'], mp['o'], mp['n']});
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} text
     * @return {number}
     */
    maxNumberOfBalloons(text) {
        const mp = new Map();
        for (let c of text) {
            if ('balon'.includes(c)) {
                mp.set(c, (mp.get(c) || 0) + 1);
            }
        }

        if (mp.size < 5) {
            return 0;
        }

        mp.set('l', Math.floor(mp.get('l') / 2));
        mp.set('o', Math.floor(mp.get('o') / 2));
        return Math.min(...Array.from(mp.values()));
    }
}
```

```csharp
public class Solution {
    public int MaxNumberOfBalloons(string text) {
        Dictionary<char, int> mp = new Dictionary<char, int>();
        foreach (char c in text) {
            if ("balon".Contains(c)) {
                if (!mp.ContainsKey(c)) mp[c] = 0;
                mp[c]++;
            }
        }

        if (mp.Count < 5) {
            return 0;
        }

        mp['l'] /= 2;
        mp['o'] /= 2;
        return mp.Values.Min();
    }
}
```

```go
func maxNumberOfBalloons(text string) int {
    mp := make(map[rune]int)
    for _, c := range text {
        if c == 'b' || c == 'a' || c == 'l' || c == 'o' || c == 'n' {
            mp[c]++
        }
    }

    if len(mp) < 5 {
        return 0
    }

    mp['l'] /= 2
    mp['o'] /= 2

    res := mp['b']
    for _, v := range mp {
        if v < res {
            res = v
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxNumberOfBalloons(text: String): Int {
        val mp = mutableMapOf<Char, Int>()
        for (c in text) {
            if (c in "balon") {
                mp[c] = mp.getOrDefault(c, 0) + 1
            }
        }

        if (mp.size < 5) {
            return 0
        }

        mp['l'] = mp['l']!! / 2
        mp['o'] = mp['o']!! / 2
        return mp.values.min()
    }
}
```

```swift
class Solution {
    func maxNumberOfBalloons(_ text: String) -> Int {
        var mp = [Character: Int]()
        for c in text {
            if "balon".contains(c) {
                mp[c, default: 0] += 1
            }
        }

        if mp.count < 5 {
            return 0
        }

        mp["l"]! /= 2
        mp["o"]! /= 2
        return mp.values.min()!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since $balloon$ has $5$ different characters.
