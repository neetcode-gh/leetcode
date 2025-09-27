## 1. Two Hash Maps

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        count_s, count_t = Counter(s), Counter(t)
        for c in count_t:
            if c not in count_s or count_s[c] < count_t[c]:
                return c
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        int[] countS = new int[26];
        int[] countT = new int[26];

        for (char c : s.toCharArray()) countS[c - 'a']++;
        for (char c : t.toCharArray()) countT[c - 'a']++;

        for (int i = 0; i < 26; i++) {
            if (countT[i] > countS[i]) {
                return (char) (i + 'a');
            }
        }
        return ' ';
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        vector<int> countS(26, 0), countT(26, 0);

        for (char c : s) countS[c - 'a']++;
        for (char c : t) countT[c - 'a']++;

        for (int i = 0; i < 26; i++) {
            if (countT[i] > countS[i]) {
                return i + 'a';
            }
        }
        return ' ';
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        let countS = Array(26).fill(0);
        let countT = Array(26).fill(0);

        for (let char of s) countS[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        for (let char of t) countT[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;

        for (let i = 0; i < 26; i++) {
            if (countT[i] > countS[i]) {
                return String.fromCharCode(i + 'a'.charCodeAt(0));
            }
        }
        return '';
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        int[] countS = new int[26];
        int[] countT = new int[26];

        foreach (char c in s) countS[c - 'a']++;
        foreach (char c in t) countT[c - 'a']++;

        for (int i = 0; i < 26; i++) {
            if (countT[i] > countS[i]) {
                return (char)(i + 'a');
            }
        }
        return ' ';
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 2. One Hash Map

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        count = Counter(t)
        for c in s:
            count[c] -= 1
        for c in count:
            if count[c] == 1:
                return c
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        int[] count = new int[26];

        for (char c : t.toCharArray()) count[c - 'a']++;
        for (char c : s.toCharArray()) count[c - 'a']--;

        for (int i = 0; i < 26; i++) {
            if (count[i] == 1) {
                return (char) (i + 'a');
            }
        }
        return ' ';
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        vector<int> count(26);

        for (char c : t) count[c - 'a']++;
        for (char c : s) count[c - 'a']--;

        for (int i = 0; i < 26; i++) {
            if (count[i] == 1) {
                return i + 'a';
            }
        }
        return ' ';
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        let count = Array(26).fill(0);

        for (let char of t) count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        for (let char of s) count[char.charCodeAt(0) - 'a'.charCodeAt(0)]--;

        for (let i = 0; i < 26; i++) {
            if (count[i] === 1) {
                return String.fromCharCode(i + 'a'.charCodeAt(0));
            }
        }
        return '';
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        int[] count = new int[26];

        foreach (char c in t) count[c - 'a']++;
        foreach (char c in s) count[c - 'a']--;

        for (int i = 0; i < 26; i++) {
            if (count[i] == 1) {
                return (char)(i + 'a');
            }
        }
        return ' ';
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 3. Sorting

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        s, t = sorted(s), sorted(t)
        for c1, c2 in zip(s, t):
            if c1 != c2:
                return c2
        return t[-1]
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        char[] sArr = s.toCharArray();
        char[] tArr = t.toCharArray();
        Arrays.sort(sArr);
        Arrays.sort(tArr);
        for (int i = 0; i < sArr.length; i++) {
            if (sArr[i] != tArr[i]) {
                return tArr[i];
            }
        }
        return tArr[tArr.length - 1];
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        sort(s.begin(), s.end());
        sort(t.begin(), t.end());
        for (int i = 0; i < s.size(); i++) {
            if (s[i] != t[i]) {
                return t[i];
            }
        }
        return t[t.size() - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        s = s.split('').sort();
        t = t.split('').sort();
        for (let i = 0; i < s.length; i++) {
            if (s[i] !== t[i]) {
                return t[i];
            }
        }
        return t[t.length - 1];
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        char[] sArr = s.ToCharArray();
        char[] tArr = t.ToCharArray();
        Array.Sort(sArr);
        Array.Sort(tArr);

        for (int i = 0; i < sArr.Length; i++) {
            if (sArr[i] != tArr[i]) {
                return tArr[i];
            }
        }
        return tArr[tArr.Length - 1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Difference Between ASCII Values

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        sum_s, sum_t = 0, 0
        for c in s:
            sum_s += ord(c)
        for c in t:
            sum_t += ord(c)
        return chr(sum_t - sum_s)
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        int sumS = 0, sumT = 0;
        for (int i = 0; i < s.length(); i++) {
            sumS += s.charAt(i);
        }
        for (int i = 0; i < t.length(); i++) {
            sumT += t.charAt(i);
        }
        return (char) (sumT - sumS);
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        int sumS = 0, sumT = 0;
        for (char c : s) {
            sumS += c;
        }
        for (char c : t) {
            sumT += c;
        }
        return (char) (sumT - sumS);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        let sumS = 0,
            sumT = 0;
        for (let char of s) {
            sumS += char.charCodeAt(0);
        }
        for (let char of t) {
            sumT += char.charCodeAt(0);
        }
        return String.fromCharCode(sumT - sumS);
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        int sumS = 0, sumT = 0;
        for (int i = 0; i < s.Length; i++) {
            sumS += s[i];
        }
        for (int i = 0; i < t.Length; i++) {
            sumT += t[i];
        }
        return (char)(sumT - sumS);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 5. Difference Between ASCII Values (Optimal)

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        res = 0
        for c in s:
            res -= ord(c)
        for c in t:
            res += ord(c)
        return chr(res)
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            res -= s.charAt(i);
        }
        for (int i = 0; i < t.length(); i++) {
            res += t.charAt(i);
        }
        return (char) (res);
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        int res = 0;
        for (char c : s) {
            res -= c;
        }
        for (char c : t) {
            res += c;
        }
        return (char) (res);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        let res = 0;
        for (let char of s) {
            res -= char.charCodeAt(0);
        }
        for (let char of t) {
            res += char.charCodeAt(0);
        }
        return String.fromCharCode(res);
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        int res = 0;
        for (int i = 0; i < s.Length; i++) {
            res -= s[i];
        }
        for (int i = 0; i < t.Length; i++) {
            res += t[i];
        }
        return (char)res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 6. Bitwise XOR

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        res = 0
        for c in s:
            res ^= ord(c)
        for c in t:
            res ^= ord(c)
        return chr(res)
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            res ^= s.charAt(i);
        }
        for (int i = 0; i < t.length(); i++) {
            res ^= t.charAt(i);
        }
        return (char) (res);
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        int res = 0;
        for (char c : s) {
            res ^= c;
        }
        for (char c : t) {
            res ^= c;
        }
        return (char) (res);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        let res = 0;
        for (let char of s) {
            res ^= char.charCodeAt(0);
        }
        for (let char of t) {
            res ^= char.charCodeAt(0);
        }
        return String.fromCharCode(res);
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        int res = 0;
        for (int i = 0; i < s.Length; i++) {
            res ^= s[i];
        }
        for (int i = 0; i < t.Length; i++) {
            res ^= t[i];
        }
        return (char)res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
