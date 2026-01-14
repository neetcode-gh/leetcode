## 1. Frequency Count (Hash Map)

### Intuition

To make all strings equal, each character must be evenly distributed across all `n` strings. This means the total count of each character across all words must be divisible by `n`.

Think of it this way: if we have 6 occurrences of the letter 'a' and 3 words, each word can have exactly 2 'a's. But if we have 7 occurrences of 'a' and 3 words, there is no way to distribute them evenly.

The order of characters within each string does not matter since we can move characters freely. We only need to verify that redistribution is mathematically possible.

### Algorithm

1. Create a hash map to count the total frequency of each character across all words.
2. Iterate through every character in every word, incrementing the count in the hash map.
3. For each character in the hash map, check if its count is divisible by the number of words.
4. If any character's count is not divisible by the number of words, return `false`.
5. If all characters pass the divisibility check, return `true`.

::tabs-start

```python
class Solution:
    def makeEqual(self, words: List[str]) -> bool:
        char_cnt = defaultdict(int)

        for w in words:
            for c in w:
                char_cnt[c] += 1

        for c in char_cnt:
            if char_cnt[c] % len(words):
                return False
        return True
```

```java
public class Solution {
    public boolean makeEqual(String[] words) {
        Map<Character, Integer> charCnt = new HashMap<>();

        for (String w : words) {
            for (char c : w.toCharArray()) {
                charCnt.put(c, charCnt.getOrDefault(c, 0) + 1);
            }
        }

        for (int count : charCnt.values()) {
            if (count % words.length != 0) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool makeEqual(vector<string>& words) {
        unordered_map<char, int> charCnt;

        for (const string& w : words) {
            for (char c : w) {
                charCnt[c]++;
            }
        }

        for (const auto& entry : charCnt) {
            if (entry.second % words.size() != 0) {
                return false;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {boolean}
     */
    makeEqual(words) {
        const charCnt = {};

        for (let w of words) {
            for (let c of w) {
                charCnt[c] = (charCnt[c] || 0) + 1;
            }
        }

        for (let count of Object.values(charCnt)) {
            if (count % words.length !== 0) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool MakeEqual(string[] words) {
        var charCnt = new Dictionary<char, int>();

        foreach (string w in words) {
            foreach (char c in w) {
                charCnt[c] = charCnt.GetValueOrDefault(c, 0) + 1;
            }
        }

        foreach (int count in charCnt.Values) {
            if (count % words.Length != 0) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func makeEqual(words []string) bool {
    charCnt := make(map[rune]int)

    for _, w := range words {
        for _, c := range w {
            charCnt[c]++
        }
    }

    for _, count := range charCnt {
        if count%len(words) != 0 {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun makeEqual(words: Array<String>): Boolean {
        val charCnt = mutableMapOf<Char, Int>()

        for (w in words) {
            for (c in w) {
                charCnt[c] = charCnt.getOrDefault(c, 0) + 1
            }
        }

        for (count in charCnt.values) {
            if (count % words.size != 0) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func makeEqual(_ words: [String]) -> Bool {
        var charCnt = [Character: Int]()

        for w in words {
            for c in w {
                charCnt[c, default: 0] += 1
            }
        }

        for count in charCnt.values {
            if count % words.count != 0 {
                return false
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the number of words and $m$ is the average length of each word.

---

## 2. Frequency Count (Array)

### Intuition

This approach uses the same divisibility principle but with a clever optimization. Instead of storing full counts and checking divisibility at the end, we track counts modulo `n` and use a flag counter to know whether all characters are evenly distributable.

When a character's frequency becomes divisible by `n`, it means that character can be perfectly distributed. We increment a flag when this happens and decrement it when a new character appears (since it starts at count 1, which is not divisible by `n` unless `n = 1`). At the end, if the flag is 0, all characters are evenly distributable.

### Algorithm

1. Create a frequency array of size 26 (for lowercase letters) and initialize a flag counter to 0.
2. For each character encountered:
   - If its current frequency is non-zero, increment it. If the new count is divisible by `n`, increment the flag.
   - If its current frequency is zero, increment it to 1. If 1 is not divisible by `n`, decrement the flag.
   - Take the frequency modulo `n` to keep values small.
3. Return `true` if the flag equals 0, meaning all characters have counts divisible by `n`.

::tabs-start

```python
class Solution:
    def makeEqual(self, words: List[str]) -> bool:
        freq = [0] * 26
        flag = 0
        n = len(words)

        for w in words:
            for c in w:
                i = ord(c) - ord('a')
                if freq[i] != 0:
                    freq[i] += 1
                    if freq[i] % n == 0:
                        flag += 1
                else:
                    freq[i] += 1
                    if freq[i] % n != 0:
                        flag -= 1
                freq[i] %= n

        return flag == 0
```

```java
public class Solution {
    public boolean makeEqual(String[] words) {
        int[] freq = new int[26];
        int flag = 0;
        int n = words.length;

        for (String w : words) {
            for (char c : w.toCharArray()) {
                int i = c - 'a';
                if (freq[i] != 0) {
                    freq[i]++;
                    if (freq[i] % n == 0) {
                        flag++;
                    }
                } else {
                    freq[i]++;
                    if (freq[i] % n != 0) {
                        flag--;
                    }
                }
                freq[i] %= n;
            }
        }

        return flag == 0;
    }
}
```

```cpp
class Solution {
public:
    bool makeEqual(vector<string>& words) {
        vector<int> freq(26, 0);
        int flag = 0;
        int n = words.size();

        for (const string& w : words) {
            for (char c : w) {
                int i = c - 'a';
                if (freq[i] != 0) {
                    freq[i]++;
                    if (freq[i] % n == 0) {
                        flag++;
                    }
                } else {
                    freq[i]++;
                    if (freq[i] % n != 0) {
                        flag--;
                    }
                }
                freq[i] %= n;
            }
        }

        return flag == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {boolean}
     */
    makeEqual(words) {
        const freq = Array(26).fill(0);
        let flag = 0;
        const n = words.length;

        for (let w of words) {
            for (let c of w) {
                const i = c.charCodeAt(0) - 'a'.charCodeAt(0);
                if (freq[i] !== 0) {
                    freq[i]++;
                    if (freq[i] % n === 0) {
                        flag++;
                    }
                } else {
                    freq[i]++;
                    if (freq[i] % n !== 0) {
                        flag--;
                    }
                }
                freq[i] %= n;
            }
        }

        return flag === 0;
    }
}
```

```csharp
public class Solution {
    public bool MakeEqual(string[] words) {
        int[] freq = new int[26];
        int flag = 0;
        int n = words.Length;

        foreach (string w in words) {
            foreach (char c in w) {
                int i = c - 'a';
                if (freq[i] != 0) {
                    freq[i]++;
                    if (freq[i] % n == 0) {
                        flag++;
                    }
                } else {
                    freq[i]++;
                    if (freq[i] % n != 0) {
                        flag--;
                    }
                }
                freq[i] %= n;
            }
        }

        return flag == 0;
    }
}
```

```go
func makeEqual(words []string) bool {
    freq := make([]int, 26)
    flag := 0
    n := len(words)

    for _, w := range words {
        for _, c := range w {
            i := int(c - 'a')
            if freq[i] != 0 {
                freq[i]++
                if freq[i]%n == 0 {
                    flag++
                }
            } else {
                freq[i]++
                if freq[i]%n != 0 {
                    flag--
                }
            }
            freq[i] %= n
        }
    }

    return flag == 0
}
```

```kotlin
class Solution {
    fun makeEqual(words: Array<String>): Boolean {
        val freq = IntArray(26)
        var flag = 0
        val n = words.size

        for (w in words) {
            for (c in w) {
                val i = c - 'a'
                if (freq[i] != 0) {
                    freq[i]++
                    if (freq[i] % n == 0) {
                        flag++
                    }
                } else {
                    freq[i]++
                    if (freq[i] % n != 0) {
                        flag--
                    }
                }
                freq[i] %= n
            }
        }

        return flag == 0
    }
}
```

```swift
class Solution {
    func makeEqual(_ words: [String]) -> Bool {
        var freq = [Int](repeating: 0, count: 26)
        var flag = 0
        let n = words.count
        let aValue = Int(Character("a").asciiValue!)

        for w in words {
            for c in w.unicodeScalars {
                let i = Int(c.value) - aValue
                if freq[i] != 0 {
                    freq[i] += 1
                    if freq[i] % n == 0 {
                        flag += 1
                    }
                } else {
                    freq[i] += 1
                    if freq[i] % n != 0 {
                        flag -= 1
                    }
                }
                freq[i] %= n
            }
        }

        return flag == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the number of words and $m$ is the average length of each word.

---

## Common Pitfalls

### Forgetting to Check Divisibility by n

A common mistake is to only check if the total character count is even or to compare character counts between words directly. The key insight is that each character's total count must be divisible by `n` (the number of words), not just divisible by 2. For example, with 3 words and 4 occurrences of 'a', redistribution is impossible because 4 is not divisible by 3.

### Assuming Words Must Already Be Similar

Some solutions incorrectly assume that redistribution is only possible if the words already share some characters or have similar lengths. In reality, the order and current arrangement of characters within each word is irrelevant. The only thing that matters is whether the global character counts allow for even distribution across all `n` words.
