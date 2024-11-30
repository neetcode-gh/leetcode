## 1. Hash Map - I

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 2. Hash Map - II

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
            if ("balon".includes(c)) {
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$ since $balloon$ has $5$ different characters.