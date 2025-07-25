## 1. Hash Set

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Hash Map

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Rabin-Karp Algorithm (Double Hashing)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Bit Mask

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
