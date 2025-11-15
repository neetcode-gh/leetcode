## 1. Brute Force

::tabs-start

```python
class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        count = 0
        for i in range(128):  # For all ASCII characters
            if count > 1:
                break
            ct = 0
            for j in range(len(s)):
                if s[j] == chr(i):  # Comparing with ASCII character
                    ct += 1
            count += ct % 2
        return count <= 1
```

```java
class Solution {
    public boolean canPermutePalindrome(String s) {
        int count = 0;
        for (char i = 0; i < 128 && count <= 1; i++) {
            int ct = 0;
            for (int j = 0; j < s.length(); j++) {
                if (s.charAt(j) == i) ct++;
            }
            count += ct % 2;
        }
        return count <= 1;
    }
}
```

```cpp
class Solution {
public:
    bool canPermutePalindrome(string s) {
        int count[128] = {0};
        for (int j = 0; j < s.length(); j++) {
            count[s[j]]++;
        }
        int odd = 0;
        for (int i = 0; i < 128 && odd <= 1; i++) {
            odd += count[i] % 2;
        }
        return odd <= 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    canPermutePalindrome(s) {
        let count = 0;
        for (let i = 0; i < 128 && count <= 1; i++) {
            let ct = 0;
            for (let j = 0; j < s.length; j++) {
                if (s.charCodeAt(j) === i) ct++;
            }
            count += ct % 2;
        }
        return count <= 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
    - If we generalize the solution to handle any Unicode character (no hardcoding): $O(k \cdot n)$. <br> $O(n^2)$ In the worst case, if all characters are unique $(k = n)$ 
- Space complexity: $O(1)$ If the we assume the input contains only ASCII characters.
    - $O(1)$ If the implementation is modiifed to handle Unicode characters.

>  Where $n$ is the size of the input string `s` and where $k$ is the number of unique characters in `s`

---

## 2. Using HashMap

::tabs-start

```python
class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        from collections import Counter

        count = Counter(s)
        odds = sum(val % 2 for val in count.values())
        return odds <= 1
```

```java
class Solution {
    public boolean canPermutePalindrome(String s) {
        HashMap<Character, Integer> map = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            map.put(s.charAt(i), map.getOrDefault(s.charAt(i), 0) + 1);
        }
        int count = 0;
        for (char key : map.keySet()) {
            count += map.get(key) % 2;
        }
        return count <= 1;
    }
}
```

```cpp
class Solution {
public:
    bool canPermutePalindrome(string s) {
        unordered_map<char, int> map;
        for (int i = 0; i < s.length(); i++) {
            +map[s[i]]++;
        }
        int count = 0;
        for (auto& pair : map) {
            count += pair.second % 2;
        }
        return count <= 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    canPermutePalindrome(s) {
        const map = new Map();
        for (let i = 0; i < s.length; i++) {
            map.set(s.charAt(i), (map.get(s.charAt(i)) || 0) + 1);
        }
        let count = 0;
        for (let key of map.keys()) {
            count += map.get(key) % 2;
        }
        return count <= 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
    - $O(n + k)$ If we generalize the solution to handle any Unicode character. In the worst case $(k = n)$, this becomes $O(n)$.
- Space complexity: $O(1)$ If the we assume the input contains only ASCII characters.
    - $O(k)$ If the implementation is modiifed to handle Unicode characters, the space complexity would depend on the number of unique characters in the string. $O(n)$ in the worst case (if all characters are unique).

>  Where $n$ is the size of the input string `s` and where $k$ is the number of unique characters in `s`

---

## 3. Using Array 

::tabs-start

```python
class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        map = [0] * 128
        for ch in s:
            map[ord(ch)] += 1
        count = 0
        for c in map:
            if c % 2:
                count += 1
        return count <= 1
```

```java
class Solution {
    public boolean canPermutePalindrome(String s) {
        int[] map = new int[128];
        for (int i = 0; i < s.length(); i++) {
            map[s.charAt(i)]++;
        }
        int count = 0;
        for (int key = 0; key < map.length && count <= 1; key++) {
            count += map[key] % 2;
        }
        return count <= 1;
    }
}
```

```cpp
class Solution {
public:
    bool canPermutePalindrome(string s) {
        int map[128] = {0};
        for (char c : s) {
            map[int(c)]++;
        }
        int count = 0;
        for (int i = 0; i < 128 && count <= 1; i++) {
            count += map[i] % 2;
        }
        return count <= 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    canPermutePalindrome(s) {
        const map = new Array(128).fill(0);
        for (let i = 0; i < s.length; i++) {
            map[s.charCodeAt(i)]++;
        }
        let count = 0;
        for (let key = 0; key < map.length && count <= 1; key++) {
            count += map[key] % 2;
        }
        return count <= 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ If the we assume the input contains only ASCII characters.
    - $O(k)$ If the implementation is modiifed to handle Unicode characters, the space complexity would depend on the number of unique characters in the string. $O(n)$ in the worst case (if all characters are unique).

>  Where $n$ is the size of the input string `s` and where $k$ is the number of unique characters in `s`

---

## 4. Single Pass

::tabs-start

```python
class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        map = [0] * 128
        count = 0
        for i in range(len(s)):
            map[ord(s[i])] += 1
            if map[ord(s[i])] % 2 == 0:
                count -= 1
            else:
                count += 1
        return count <= 1
```

```java
class Solution {
    public boolean canPermutePalindrome(String s) {
        int[] map = new int[128];
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            map[s.charAt(i)]++;
            if (map[s.charAt(i)] % 2 == 0) count--;
            else count++;
        }
        return count <= 1;
    }
}
```

```cpp
class Solution {
public:
    bool canPermutePalindrome(string s) {
        int map[128] = {0};
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            map[int(s[i])]++;
            if (map[int(s[i])] % 2 == 0)
                count--;
            else
                count++;
        }
        return count <= 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    canPermutePalindrome(s) {
        const map = new Array(128).fill(0);
        let count = 0;
        for (let i = 0; i < s.length; i++) {
            map[s.charCodeAt(i)]++;
            if (map[s.charCodeAt(i)] % 2 === 0) count--;
            else count++;
        }
        return count <= 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ If the we assume the input contains only ASCII characters.
    - $O(k)$ If the implementation is modiifed to handle Unicode characters, the space complexity would depend on the number of unique characters in the string. $O(n)$ in the worst case (if all characters are unique).

>  Where $n$ is the size of the input string `s` and where $k$ is the number of unique characters in `s`


---

## 5. Using Set

::tabs-start

```python
class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        chars = set()
        for c in s:
            if c in chars:
                chars.remove(c)
            else:
                chars.add(c)
        return len(chars) <= 1
```

```java
class Solution {
    public boolean canPermutePalindrome(String s) {
        Set<Character> set = new HashSet<>();
        for (int i = 0; i < s.length(); i++) {
            if (!set.add(s.charAt(i))) set.remove(s.charAt(i));
        }
        return set.size() <= 1;
    }
}
```

```cpp
class Solution {
public:
    bool canPermutePalindrome(string s) {
        unordered_set<char> char_set;
        for (char c : s) {
            if (char_set.find(c) != char_set.end())
                char_set.erase(c);
            else
                char_set.insert(c);
        }
        return char_set.size() <= 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    canPermutePalindrome(s) {
        const set = new Set();
        for (let i = 0; i < s.length; i++) {
            if (set.has(s.charAt(i))) {
                set.delete(s.charAt(i));
            } else {
                set.add(s.charAt(i));
            }
        }
        return set.size <= 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ If the we assume the input contains only ASCII characters.
    - $O(k)$ If the implementation is modiifed to handle Unicode characters, the space complexity would depend on the number of unique characters in the string. $O(n)$ in the worst case (if all characters are unique)

>  Where $n$ is the size of the input string `s` and where $k$ is the number of unique characters in `s`
