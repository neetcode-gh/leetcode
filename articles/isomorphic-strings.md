## 1. Hash Map (Two Pass)

### Intuition

Two strings are isomorphic if there's a one-to-one mapping between their characters. We need to ensure that each character in `s` maps to exactly one character in `t`, and vice versa. A single pass checking only `s -> t` mapping isn't enough because two different characters in `s` could map to the same character in `t`. By running the check twice (once for `(s, t)` and once for `(t, s)`), we guarantee the mapping is bijective.

### Algorithm

1. Create a helper function that checks if characters from one string map consistently to another:
   - Use a hash map to store the character mappings.
   - For each character, check if an existing mapping conflicts with the current pair.
2. Call the helper twice: once with `(s, t)` and once with `(t, s)`.
3. Return `true` only if both checks pass.

::tabs-start

```python
class Solution:
    def helper(self, s: str, t: str) -> bool:
        mp = {}
        for i in range(len(s)):
            if (s[i] in mp) and (mp[s[i]] != t[i]):
                return False
            mp[s[i]] = t[i]
        return True

    def isIsomorphic(self, s: str, t: str) -> bool:
        return self.helper(s, t) and self.helper(t, s)
```

```java
public class Solution {
    private boolean helper(String s, String t) {
        HashMap<Character, Character> map = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char sc = s.charAt(i);
            char tc = t.charAt(i);
            if (map.containsKey(sc) && map.get(sc) != tc) {
                return false;
            }
            map.put(sc, tc);
        }
        return true;
    }

    public boolean isIsomorphic(String s, String t) {
        return helper(s, t) && helper(t, s);
    }
}
```

```cpp
class Solution {
private:
    bool helper(const string& s, const string& t) {
        unordered_map<char, char> map;
        for (int i = 0; i < s.length(); i++) {
            if (map.count(s[i]) && map[s[i]] != t[i]) {
                return false;
            }
            map[s[i]] = t[i];
        }
        return true;
    }

public:
    bool isIsomorphic(string s, string t) {
        return helper(s, t) && helper(t, s);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    helper(s, t) {
        const map = new Map();
        for (let i = 0; i < s.length; i++) {
            if (map.has(s[i]) && map.get(s[i]) !== t[i]) {
                return false;
            }
            map.set(s[i], t[i]);
        }
        return true;
    }

    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isIsomorphic(s, t) {
        return this.helper(s, t) && this.helper(t, s);
    }
}
```

```csharp
public class Solution {
    private bool Helper(string s, string t) {
        Dictionary<char, char> mp = new Dictionary<char, char>();
        for (int i = 0; i < s.Length; i++) {
            if (mp.ContainsKey(s[i]) && mp[s[i]] != t[i]) {
                return false;
            }
            mp[s[i]] = t[i];
        }
        return true;
    }

    public bool IsIsomorphic(string s, string t) {
        return Helper(s, t) && Helper(t, s);
    }
}
```

```go
func isIsomorphic(s string, t string) bool {
    helper := func(s, t string) bool {
        mp := make(map[byte]byte)
        for i := 0; i < len(s); i++ {
            if val, ok := mp[s[i]]; ok && val != t[i] {
                return false
            }
            mp[s[i]] = t[i]
        }
        return true
    }
    return helper(s, t) && helper(t, s)
}
```

```kotlin
class Solution {
    private fun helper(s: String, t: String): Boolean {
        val mp = mutableMapOf<Char, Char>()
        for (i in s.indices) {
            if (mp.containsKey(s[i]) && mp[s[i]] != t[i]) {
                return false
            }
            mp[s[i]] = t[i]
        }
        return true
    }

    fun isIsomorphic(s: String, t: String): Boolean {
        return helper(s, t) && helper(t, s)
    }
}
```

```swift
class Solution {
    private func helper(_ s: String, _ t: String) -> Bool {
        let sArr = Array(s)
        let tArr = Array(t)
        var mp = [Character: Character]()
        for i in 0..<sArr.count {
            if let val = mp[sArr[i]], val != tArr[i] {
                return false
            }
            mp[sArr[i]] = tArr[i]
        }
        return true
    }

    func isIsomorphic(_ s: String, _ t: String) -> Bool {
        return helper(s, t) && helper(t, s)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

> Where $n$ is the length of the input string and $m$ is the number of unique characters in the strings.

---

## 2. Hash Map (One Pass)

### Intuition

We can verify both mapping directions simultaneously in a single pass. By maintaining two hash maps, one for `s -> t` and one for `t -> s`, we check at each position that neither mapping is violated. If a character in `s` was previously mapped to a different character in `t`, or if a character in `t` was previously mapped to a different character in `s`, the strings aren't isomorphic.

### Algorithm

1. Create two hash maps: `mapST` for `s -> t` and `mapTS` for `t -> s`.
2. Iterate through both strings simultaneously:
   - If `s[i]` already maps to something other than `t[i]`, return `false`.
   - If `t[i]` already maps to something other than `s[i]`, return `false`.
   - Otherwise, record both mappings.
3. If the loop completes without conflicts, return `true`.

::tabs-start

```python
class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        mapST, mapTS = {}, {}

        for i in range(len(s)):
            c1, c2 = s[i], t[i]
            if ((c1 in mapST and mapST[c1] != c2) or
                (c2 in mapTS and mapTS[c2] != c1)):
                return False
            mapST[c1] = c2
            mapTS[c2] = c1

        return True
```

```java
public class Solution {
    public boolean isIsomorphic(String s, String t) {
        HashMap<Character, Character> mapST = new HashMap<>();
        HashMap<Character, Character> mapTS = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i), c2 = t.charAt(i);

            if ((mapST.containsKey(c1) && mapST.get(c1) != c2) ||
                (mapTS.containsKey(c2) && mapTS.get(c2) != c1)) {
                return false;
            }

            mapST.put(c1, c2);
            mapTS.put(c2, c1);
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        unordered_map<char, char> mapST, mapTS;

        for (int i = 0; i < s.size(); i++) {
            char c1 = s[i], c2 = t[i];

            if ((mapST.count(c1) && mapST[c1] != c2) ||
                (mapTS.count(c2) && mapTS[c2] != c1)) {
                return false;
            }

            mapST[c1] = c2;
            mapTS[c2] = c1;
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isIsomorphic(s, t) {
        const mapTS = new Map();
        const mapST = new Map();

        for (let i = 0; i < s.length; i++) {
            const c1 = s[i],
                c2 = t[i];

            if (
                (mapST.has(c1) && mapST.get(c1) !== c2) ||
                (mapTS.has(c2) && mapTS.get(c2) !== c1)
            ) {
                return false;
            }

            mapST.set(c1, c2);
            mapTS.set(c2, c1);
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsIsomorphic(string s, string t) {
        Dictionary<char, char> mapST = new Dictionary<char, char>();
        Dictionary<char, char> mapTS = new Dictionary<char, char>();

        for (int i = 0; i < s.Length; i++) {
            char c1 = s[i], c2 = t[i];

            if ((mapST.ContainsKey(c1) && mapST[c1] != c2) ||
                (mapTS.ContainsKey(c2) && mapTS[c2] != c1)) {
                return false;
            }

            mapST[c1] = c2;
            mapTS[c2] = c1;
        }

        return true;
    }
}
```

```go
func isIsomorphic(s string, t string) bool {
    mapST := make(map[byte]byte)
    mapTS := make(map[byte]byte)

    for i := 0; i < len(s); i++ {
        c1, c2 := s[i], t[i]

        if val, ok := mapST[c1]; ok && val != c2 {
            return false
        }
        if val, ok := mapTS[c2]; ok && val != c1 {
            return false
        }

        mapST[c1] = c2
        mapTS[c2] = c1
    }

    return true
}
```

```kotlin
class Solution {
    fun isIsomorphic(s: String, t: String): Boolean {
        val mapST = mutableMapOf<Char, Char>()
        val mapTS = mutableMapOf<Char, Char>()

        for (i in s.indices) {
            val c1 = s[i]
            val c2 = t[i]

            if (mapST.containsKey(c1) && mapST[c1] != c2) {
                return false
            }
            if (mapTS.containsKey(c2) && mapTS[c2] != c1) {
                return false
            }

            mapST[c1] = c2
            mapTS[c2] = c1
        }

        return true
    }
}
```

```swift
class Solution {
    func isIsomorphic(_ s: String, _ t: String) -> Bool {
        let sArr = Array(s)
        let tArr = Array(t)
        var mapST = [Character: Character]()
        var mapTS = [Character: Character]()

        for i in 0..<sArr.count {
            let c1 = sArr[i]
            let c2 = tArr[i]

            if let val = mapST[c1], val != c2 {
                return false
            }
            if let val = mapTS[c2], val != c1 {
                return false
            }

            mapST[c1] = c2
            mapTS[c2] = c1
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

> Where $n$ is the length of the input string and $m$ is the number of unique characters in the strings.

---

## Common Pitfalls

### Only Checking One Direction of Mapping

Checking only that each character in `s` maps to a unique character in `t` is insufficient. You must also verify the reverse: that each character in `t` maps to a unique character in `s`. For example, `s = "ab"` and `t = "aa"` would pass a one-way check but fails the bidirectional requirement since both `'a'` and `'b'` map to `'a'`.

### Assuming Same Character Sets

The two strings may contain completely different character sets. Do not assume that a character appearing in `s` must also appear in `t`, or vice versa. The mapping must be established dynamically as you iterate through both strings.
