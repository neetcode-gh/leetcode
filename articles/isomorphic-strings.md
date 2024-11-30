## 1. Hash Map (Two Pass)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(m)$

> Where $n$ is the length of the input string and $m$ is the number of unique characters in the strings.

---

## 2. Hash Map (One Pass)

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

        for (let i = 0; i < s.length; i++) {
            const c1 = s[i], c2 = t[i];

            if ((mapST.has(c1) && mapST.get(c1) !== c2) ||
                (mapTS.has(c2) && mapTS.get(c2) !== c1)) {
                return false;
            }

            mapST.set(c1, c2);
            mapTS.set(c2, c1);
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(m)$

> Where $n$ is the length of the input string and $m$ is the number of unique characters in the strings.