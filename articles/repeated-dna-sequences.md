## 1. Hash Set

### Intuition

We need to find all 10-letter sequences that appear more than once. A hash set naturally tracks what we have seen before. As we slide a window of length 10 across the string with index `l`, we check if the current substring `cur` was already encountered. If so, it is a repeated sequence. Using two sets (one for `seen` sequences and one for `res` results) avoids adding duplicates to our answer.

### Algorithm

1. Initialize two sets: `seen` to track encountered sequences and `res` to store repeated ones.
2. Iterate through the string with a sliding window of size 10 using index `l`.
3. For each position, extract the 10-character substring `cur`.
4. If it exists in `seen`, add it to `res`.
5. Add the current substring to `seen`.
6. Return `res` as a list.

::tabs-start

```python
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        seen, res = set(), set()

        for l in range(len(s) - 9):
            cur = s[l: l + 10]
            if cur in seen:
                res.add(cur)
            seen.add(cur)
        return list(res)
```

```java
public class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        Set<String> seen = new HashSet<>();
        Set<String> res = new HashSet<>();

        for (int l = 0; l < s.length() - 9; l++) {
            String cur = s.substring(l, l + 10);
            if (seen.contains(cur)) {
                res.add(cur);
            }
            seen.add(cur);
        }
        return new ArrayList<>(res);
    }
}
```

```cpp
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        if (s.size() < 10) return {};
        unordered_set<string> seen, res;

        for (int l = 0; l < s.size() - 9; l++) {
            string cur = s.substr(l, 10);
            if (seen.count(cur)) {
                res.insert(cur);
            }
            seen.insert(cur);
        }
        return vector<string>(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[]}
     */
    findRepeatedDnaSequences(s) {
        const seen = new Set();
        const res = new Set();

        for (let l = 0; l < s.length - 9; l++) {
            const cur = s.substring(l, l + 10);
            if (seen.has(cur)) {
                res.add(cur);
            }
            seen.add(cur);
        }
        return Array.from(res);
    }
}
```

```csharp
public class Solution {
    public IList<string> FindRepeatedDnaSequences(string s) {
        var seen = new HashSet<string>();
        var res = new HashSet<string>();

        for (int l = 0; l < s.Length - 9; l++) {
            string cur = s.Substring(l, 10);
            if (seen.Contains(cur)) {
                res.Add(cur);
            }
            seen.Add(cur);
        }
        return res.ToList();
    }
}
```

```go
func findRepeatedDnaSequences(s string) []string {
    seen := make(map[string]bool)
    res := make(map[string]bool)

    for l := 0; l < len(s)-9; l++ {
        cur := s[l : l+10]
        if seen[cur] {
            res[cur] = true
        }
        seen[cur] = true
    }

    result := []string{}
    for k := range res {
        result = append(result, k)
    }
    return result
}
```

```kotlin
class Solution {
    fun findRepeatedDnaSequences(s: String): List<String> {
        val seen = HashSet<String>()
        val res = HashSet<String>()

        for (l in 0 until s.length - 9) {
            val cur = s.substring(l, l + 10)
            if (cur in seen) {
                res.add(cur)
            }
            seen.add(cur)
        }
        return res.toList()
    }
}
```

```swift
class Solution {
    func findRepeatedDnaSequences(_ s: String) -> [String] {
        var seen = Set<String>()
        var res = Set<String>()
        let chars = Array(s)

        for l in 0..<(chars.count - 9) {
            let cur = String(chars[l..<(l + 10)])
            if seen.contains(cur) {
                res.insert(cur)
            }
            seen.insert(cur)
        }
        return Array(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Hash Map

### Intuition

Instead of using two sets, we can use a hash map `mp` to count occurrences of each sequence. This lets us add a sequence to the `res` exactly when its count reaches 2, ensuring we only report it once regardless of how many additional times it appears.

### Algorithm

1. If the string length is less than 10, return an empty list.
2. Initialize a hash map `mp` to count occurrences and a result list `res`.
3. Slide a window of size 10 across the string using index `l`.
4. For each substring `cur`, increment its count in `mp`.
5. When the count becomes exactly 2, add the substring to `res`.
6. Return the `res` list.

::tabs-start

```python
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        if len(s) < 10:
            return []

        mp = defaultdict(int)
        res = []
        for l in range(len(s) - 9):
            cur = s[l: l + 10]
            mp[cur] += 1
            if mp[cur] == 2:
                res.append(cur)

        return res
```

```java
public class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        if (s.length() < 10) {
            return new ArrayList<>();
        }

        Map<String, Integer> mp = new HashMap<>();
        List<String> res = new ArrayList<>();

        for (int l = 0; l < s.length() - 9; l++) {
            String cur = s.substring(l, l + 10);
            mp.put(cur, mp.getOrDefault(cur, 0) + 1);
            if (mp.get(cur) == 2) {
                res.add(cur);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        if (s.size() < 10) {
            return {};
        }

        unordered_map<string, int> mp;
        vector<string> res;

        for (int l = 0; l < s.size() - 9; l++) {
            string cur = s.substr(l, 10);
            mp[cur]++;
            if (mp[cur] == 2) {
                res.push_back(cur);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[]}
     */
    findRepeatedDnaSequences(s) {
        if (s.length < 10) {
            return [];
        }

        const mp = new Map();
        const res = [];

        for (let l = 0; l <= s.length - 10; l++) {
            const cur = s.substring(l, l + 10);
            mp.set(cur, (mp.get(cur) || 0) + 1);
            if (mp.get(cur) === 2) {
                res.push(cur);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<string> FindRepeatedDnaSequences(string s) {
        if (s.Length < 10) {
            return new List<string>();
        }

        var mp = new Dictionary<string, int>();
        var res = new List<string>();

        for (int l = 0; l <= s.Length - 10; l++) {
            string cur = s.Substring(l, 10);
            if (!mp.ContainsKey(cur)) mp[cur] = 0;
            mp[cur]++;
            if (mp[cur] == 2) {
                res.Add(cur);
            }
        }

        return res;
    }
}
```

```go
func findRepeatedDnaSequences(s string) []string {
    if len(s) < 10 {
        return []string{}
    }

    mp := make(map[string]int)
    res := []string{}

    for l := 0; l <= len(s)-10; l++ {
        cur := s[l : l+10]
        mp[cur]++
        if mp[cur] == 2 {
            res = append(res, cur)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findRepeatedDnaSequences(s: String): List<String> {
        if (s.length < 10) {
            return emptyList()
        }

        val mp = HashMap<String, Int>()
        val res = mutableListOf<String>()

        for (l in 0..s.length - 10) {
            val cur = s.substring(l, l + 10)
            mp[cur] = mp.getOrDefault(cur, 0) + 1
            if (mp[cur] == 2) {
                res.add(cur)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findRepeatedDnaSequences(_ s: String) -> [String] {
        if s.count < 10 {
            return []
        }

        var mp = [String: Int]()
        var res = [String]()
        let chars = Array(s)

        for l in 0...(chars.count - 10) {
            let cur = String(chars[l..<(l + 10)])
            mp[cur, default: 0] += 1
            if mp[cur] == 2 {
                res.append(cur)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Rabin-Karp Algorithm (Double Hashing)

### Intuition

Storing full 10-character strings as keys can be memory intensive. The Rabin-Karp algorithm computes a rolling hash for each window, allowing us to represent each sequence as a number instead. Double hashing (using two different hash bases) minimizes collision probability, making numeric comparisons reliable. As the window slides with index `i`, we efficiently update the hashes `hash1` and `hash2` by removing the contribution of the outgoing character and adding the incoming one.

### Algorithm

1. If the string length is less than 10, return an empty list.
2. Precompute the power values `power1` and `power2` for both hash bases (raised to the 9th power for the leading digit).
3. Initialize two rolling hashes `hash1` and `hash2` to zero.
4. Iterate through the string with index `i`, updating both hashes for each character.
5. Once the window reaches size 10, combine both hashes into a single `key`.
6. Use a hash map `cnt` to count occurrences of each `key`.
7. When a `key` appears the second time, add the corresponding substring to `res`.
8. Slide the window by subtracting the outgoing character's hash contribution.
9. Return the `res` list.

::tabs-start

```python
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        n = len(s)
        if n < 10:
            return []

        cnt = defaultdict(int)
        res = []
        base1, base2 = 31, 37
        hash1 = hash2 = 0
        power1, power2 = 1, 1
        MOD1, MOD2 = 685683731, 768258391

        for i in range(9):
            power1 *= base1
            power2 *= base2
            power1 %= MOD1
            power2 %= MOD2

        for i in range(n):
            hash1 = (hash1 * base1 + ord(s[i])) % MOD1
            hash2 = (hash2 * base2 + ord(s[i])) % MOD2

            if i >= 9:
                key = (hash1 << 31) | hash2
                cnt[key] += 1
                if cnt[key] == 2:
                    res.append(s[i - 9 : i + 1])

                hash1 = (hash1 - power1 * ord(s[i - 9]) % MOD1 + MOD1) % MOD1
                hash2 = (hash2 - power2 * ord(s[i - 9]) % MOD2 + MOD2)

        return res
```

```java
public class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        int n = s.length();
        if (n < 10) return new ArrayList<>();

        Map<Long, Integer> cnt = new HashMap<>();
        List<String> res = new ArrayList<>();
        int base1 = 31, base2 = 37;
        long hash1 = 0, hash2 = 0, power1 = 1, power2 = 1;
        int MOD1 = 685683731, MOD2 = 768258391;

        for (int i = 0; i < 9; i++) {
            power1 = (power1 * base1) % MOD1;
            power2 = (power2 * base2) % MOD2;
        }

        for (int i = 0; i < n; i++) {
            hash1 = (hash1 * base1 + s.charAt(i)) % MOD1;
            hash2 = (hash2 * base2 + s.charAt(i)) % MOD2;

            if (i >= 9) {
                long key = (hash1 << 31) | hash2;
                cnt.put(key, cnt.getOrDefault(key, 0) + 1);
                if (cnt.get(key) == 2) {
                    res.add(s.substring(i - 9, i + 1));
                }

                hash1 = (hash1 - power1 * s.charAt(i - 9) % MOD1 + MOD1) % MOD1;
                hash2 = (hash2 - power2 * s.charAt(i - 9) % MOD2 + MOD2) % MOD2;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        int n = s.length();
        if (n < 10) return {};

        unordered_map<long long, int> cnt;
        vector<string> res;
        int base1 = 31, base2 = 37;
        long long hash1 = 0, hash2 = 0, power1 = 1, power2 = 1;
        int MOD1 = 685683731, MOD2 = 768258391;

        for (int i = 0; i < 9; i++) {
            power1 = (power1 * base1) % MOD1;
            power2 = (power2 * base2) % MOD2;
        }

        for (int i = 0; i < n; i++) {
            hash1 = (hash1 * base1 + s[i]) % MOD1;
            hash2 = (hash2 * base2 + s[i]) % MOD2;

            if (i >= 9) {
                long long key = (hash1 << 31) | hash2;
                cnt[key]++;
                if (cnt[key] == 2) {
                    res.push_back(s.substr(i - 9, 10));
                }

                hash1 = (hash1 - power1 * s[i - 9] % MOD1 + MOD1) % MOD1;
                hash2 = (hash2 - power2 * s[i - 9] % MOD2 + MOD2) % MOD2;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[]}
     */
    findRepeatedDnaSequences(s) {
        const n = s.length;
        if (n < 10) return [];

        const cnt = new Map();
        const res = [];
        const base1 = 31,
            base2 = 37;
        let hash1 = 0,
            hash2 = 0,
            power1 = 1,
            power2 = 1;
        const MOD1 = 685683731,
            MOD2 = 768258391;

        for (let i = 0; i < 9; i++) {
            power1 = (power1 * base1) % MOD1;
            power2 = (power2 * base2) % MOD2;
        }

        for (let i = 0; i < n; i++) {
            hash1 = (hash1 * base1 + s.charCodeAt(i)) % MOD1;
            hash2 = (hash2 * base2 + s.charCodeAt(i)) % MOD2;

            if (i >= 9) {
                const key = `${hash1},${hash2}`;
                cnt.set(key, (cnt.get(key) || 0) + 1);
                if (cnt.get(key) === 2) {
                    res.push(s.substring(i - 9, i + 1));
                }

                hash1 =
                    (hash1 - ((power1 * s.charCodeAt(i - 9)) % MOD1) + MOD1) %
                    MOD1;
                hash2 =
                    (hash2 - ((power2 * s.charCodeAt(i - 9)) % MOD2) + MOD2) %
                    MOD2;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<string> FindRepeatedDnaSequences(string s) {
        int n = s.Length;
        if (n < 10) return new List<string>();

        var cnt = new Dictionary<long, int>();
        var res = new List<string>();
        int base1 = 31, base2 = 37;
        long hash1 = 0, hash2 = 0, power1 = 1, power2 = 1;
        int MOD1 = 685683731, MOD2 = 768258391;

        for (int i = 0; i < 9; i++) {
            power1 = (power1 * base1) % MOD1;
            power2 = (power2 * base2) % MOD2;
        }

        for (int i = 0; i < n; i++) {
            hash1 = (hash1 * base1 + s[i]) % MOD1;
            hash2 = (hash2 * base2 + s[i]) % MOD2;

            if (i >= 9) {
                long key = (hash1 << 31) | hash2;
                if (!cnt.ContainsKey(key)) cnt[key] = 0;
                cnt[key]++;
                if (cnt[key] == 2) {
                    res.Add(s.Substring(i - 9, 10));
                }

                hash1 = (hash1 - power1 * s[i - 9] % MOD1 + MOD1) % MOD1;
                hash2 = (hash2 - power2 * s[i - 9] % MOD2 + MOD2) % MOD2;
            }
        }

        return res;
    }
}
```

```go
func findRepeatedDnaSequences(s string) []string {
    n := len(s)
    if n < 10 {
        return []string{}
    }

    cnt := make(map[int64]int)
    res := []string{}
    base1, base2 := int64(31), int64(37)
    var hash1, hash2, power1, power2 int64 = 0, 0, 1, 1
    MOD1, MOD2 := int64(685683731), int64(768258391)

    for i := 0; i < 9; i++ {
        power1 = (power1 * base1) % MOD1
        power2 = (power2 * base2) % MOD2
    }

    for i := 0; i < n; i++ {
        hash1 = (hash1*base1 + int64(s[i])) % MOD1
        hash2 = (hash2*base2 + int64(s[i])) % MOD2

        if i >= 9 {
            key := (hash1 << 31) | hash2
            cnt[key]++
            if cnt[key] == 2 {
                res = append(res, s[i-9:i+1])
            }

            hash1 = (hash1 - power1*int64(s[i-9])%MOD1 + MOD1) % MOD1
            hash2 = (hash2 - power2*int64(s[i-9])%MOD2 + MOD2) % MOD2
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findRepeatedDnaSequences(s: String): List<String> {
        val n = s.length
        if (n < 10) return emptyList()

        val cnt = HashMap<Long, Int>()
        val res = mutableListOf<String>()
        val base1 = 31L
        val base2 = 37L
        var hash1 = 0L
        var hash2 = 0L
        var power1 = 1L
        var power2 = 1L
        val MOD1 = 685683731L
        val MOD2 = 768258391L

        for (i in 0 until 9) {
            power1 = (power1 * base1) % MOD1
            power2 = (power2 * base2) % MOD2
        }

        for (i in 0 until n) {
            hash1 = (hash1 * base1 + s[i].code) % MOD1
            hash2 = (hash2 * base2 + s[i].code) % MOD2

            if (i >= 9) {
                val key = (hash1 shl 31) or hash2
                cnt[key] = cnt.getOrDefault(key, 0) + 1
                if (cnt[key] == 2) {
                    res.add(s.substring(i - 9, i + 1))
                }

                hash1 = (hash1 - power1 * s[i - 9].code % MOD1 + MOD1) % MOD1
                hash2 = (hash2 - power2 * s[i - 9].code % MOD2 + MOD2) % MOD2
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findRepeatedDnaSequences(_ s: String) -> [String] {
        let chars = Array(s)
        let n = chars.count
        if n < 10 { return [] }

        var cnt = [Int64: Int]()
        var res = [String]()
        let base1: Int64 = 31
        let base2: Int64 = 37
        var hash1: Int64 = 0
        var hash2: Int64 = 0
        var power1: Int64 = 1
        var power2: Int64 = 1
        let MOD1: Int64 = 685683731
        let MOD2: Int64 = 768258391

        for _ in 0..<9 {
            power1 = (power1 * base1) % MOD1
            power2 = (power2 * base2) % MOD2
        }

        for i in 0..<n {
            hash1 = (hash1 * base1 + Int64(chars[i].asciiValue!)) % MOD1
            hash2 = (hash2 * base2 + Int64(chars[i].asciiValue!)) % MOD2

            if i >= 9 {
                let key = (hash1 << 31) | hash2
                cnt[key, default: 0] += 1
                if cnt[key] == 2 {
                    res.append(String(chars[(i - 9)...(i)]))
                }

                hash1 = (hash1 - power1 * Int64(chars[i - 9].asciiValue!) % MOD1 + MOD1) % MOD1
                hash2 = (hash2 - power2 * Int64(chars[i - 9].asciiValue!) % MOD2 + MOD2) % MOD2
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Bit Mask

### Intuition

DNA sequences use only four characters (A, C, G, T), each of which can be encoded with just 2 bits. A 10-character sequence therefore fits in 20 bits, well within a single integer. By treating each sequence as a `mask`, we avoid storing strings entirely and get fast integer operations for comparisons and hashing.

### Algorithm

1. If the string length is less than 10, return an empty list.
2. Map each nucleotide to a 2-bit value: A=0, C=1, G=2, T=3 in map `mp`.
3. Initialize a `mask` to zero and a hash map `cnt` for counting.
4. For each character at index `i`, shift the `mask` left by 2 bits and OR with the character's value.
5. Mask the result with `0xFFFFF` to keep only the rightmost 20 bits (10 characters).
6. Once the window reaches size 10, increment the count for this `mask`.
7. When a `mask` appears the second time, add the corresponding substring to `res`.
8. Return the `res` list.

::tabs-start

```python
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> list[str]:
        if len(s) < 10:
            return []

        mp = {'A': 0, 'C': 1, 'G': 2, 'T': 3}
        seen, res = set(), set()
        mask = 0
        for i in range(len(s)):
            mask = ((mask << 2) | mp[s[i]]) & 0xFFFFF
            if i >= 9:
                if mask in seen:
                    res.add(s[i - 9: i + 1])
                else:
                    seen.add(mask)

        return list(res)
```

```java
public class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        if (s.length() < 10) return new ArrayList<>();

        Map<Character, Integer> mp = Map.of('A', 0, 'C', 1, 'G', 2, 'T', 3);
        Map<Integer, Integer> cnt = new HashMap<>();
        List<String> res = new ArrayList<>();
        int mask = 0;

        for (int i = 0; i < s.length(); i++) {
            mask = ((mask << 2) | mp.get(s.charAt(i))) & 0xFFFFF;
            if (i >= 9) {
                cnt.put(mask, cnt.getOrDefault(mask, 0) + 1);
                if (cnt.get(mask) == 2) {
                    res.add(s.substring(i - 9, i + 1));
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        if (s.length() < 10) return {};

        unordered_map<char, int> mp = {{'A', 0}, {'C', 1},
                                       {'G', 2}, {'T', 3}};
        unordered_map<int, int> cnt;
        vector<string> res;
        int mask = 0;

        for (int i = 0; i < s.size(); i++) {
            mask = ((mask << 2) | mp[s[i]]) & 0xFFFFF;

            if (i >= 9) {
                cnt[mask]++;
                if (cnt[mask] == 2) {
                    res.push_back(s.substr(i - 9, 10));
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string[]}
     */
    findRepeatedDnaSequences(s) {
        if (s.length < 10) return [];

        const mp = { A: 0, C: 1, G: 2, T: 3 };
        const cnt = new Map();
        const res = [];
        let mask = 0;

        for (let i = 0; i < s.length; i++) {
            mask = ((mask << 2) | mp[s[i]]) & 0xfffff;

            if (i >= 9) {
                cnt.set(mask, (cnt.get(mask) || 0) + 1);
                if (cnt.get(mask) === 2) {
                    res.push(s.substring(i - 9, i + 1));
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<string> FindRepeatedDnaSequences(string s) {
        if (s.Length < 10) return new List<string>();

        var mp = new Dictionary<char, int> {
            {'A', 0}, {'C', 1}, {'G', 2}, {'T', 3}
        };
        var cnt = new Dictionary<int, int>();
        var res = new List<string>();
        int mask = 0;

        for (int i = 0; i < s.Length; i++) {
            mask = ((mask << 2) | mp[s[i]]) & 0xFFFFF;

            if (i >= 9) {
                if (!cnt.ContainsKey(mask)) cnt[mask] = 0;
                cnt[mask]++;
                if (cnt[mask] == 2) {
                    res.Add(s.Substring(i - 9, 10));
                }
            }
        }

        return res;
    }
}
```

```go
func findRepeatedDnaSequences(s string) []string {
    if len(s) < 10 {
        return []string{}
    }

    mp := map[byte]int{'A': 0, 'C': 1, 'G': 2, 'T': 3}
    cnt := make(map[int]int)
    res := []string{}
    mask := 0

    for i := 0; i < len(s); i++ {
        mask = ((mask << 2) | mp[s[i]]) & 0xFFFFF

        if i >= 9 {
            cnt[mask]++
            if cnt[mask] == 2 {
                res = append(res, s[i-9:i+1])
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findRepeatedDnaSequences(s: String): List<String> {
        if (s.length < 10) return emptyList()

        val mp = mapOf('A' to 0, 'C' to 1, 'G' to 2, 'T' to 3)
        val cnt = HashMap<Int, Int>()
        val res = mutableListOf<String>()
        var mask = 0

        for (i in s.indices) {
            mask = ((mask shl 2) or mp[s[i]]!!) and 0xFFFFF

            if (i >= 9) {
                cnt[mask] = cnt.getOrDefault(mask, 0) + 1
                if (cnt[mask] == 2) {
                    res.add(s.substring(i - 9, i + 1))
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findRepeatedDnaSequences(_ s: String) -> [String] {
        let chars = Array(s)
        if chars.count < 10 { return [] }

        let mp: [Character: Int] = ["A": 0, "C": 1, "G": 2, "T": 3]
        var cnt = [Int: Int]()
        var res = [String]()
        var mask = 0

        for i in 0..<chars.count {
            mask = ((mask << 2) | mp[chars[i]]!) & 0xFFFFF

            if i >= 9 {
                cnt[mask, default: 0] += 1
                if cnt[mask] == 2 {
                    res.append(String(chars[(i - 9)...(i)]))
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
