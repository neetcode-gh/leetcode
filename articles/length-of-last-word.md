## 1. Iteration - I

::tabs-start

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        length = i = 0
        while i < len(s):
            if s[i] == ' ':
                while i < len(s) and s[i] == ' ':
                    i += 1
                if i == len(s):
                    return length
                length = 0
            else:
                length += 1
                i += 1
        return length
```

```java
public class Solution {
    public int lengthOfLastWord(String s) {
        int length = 0, i = 0;
        while (i < s.length()) {
            if (s.charAt(i) == ' ') {
                while (i < s.length() && s.charAt(i) == ' ') {
                    i++;
                }
                if (i == s.length()) {
                    return length;
                }
                length = 0;
            } else {
                length++;
                i++;
            }
        }
        return length;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLastWord(string s) {
        int length = 0, i = 0;
        while (i < s.length()) {
            if (s[i] == ' ') {
                while (i < s.length() && s[i] == ' ') {
                    i++;
                }
                if (i == s.length()) {
                    return length;
                }
                length = 0;
            } else {
                length++;
                i++;
            }
        }
        return length;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLastWord(s) {
        let length = 0, i = 0;
        while (i < s.length) {
            if (s[i] === ' ') {
                while (i < s.length && s[i] === ' ') {
                    i++;
                }
                if (i === s.length) {
                    return length;
                }
                length = 0;
            } else {
                length++;
                i++;
            }
        }
        return length;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 2. Iteration - II

::tabs-start

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        i, length = len(s) - 1, 0
        while s[i] == ' ':
            i -= 1
        while i >= 0 and s[i] != ' ':
            i -= 1
            length += 1
        return length
```

```java
public class Solution {
    public int lengthOfLastWord(String s) {
        int n = s.length();
        int i = n - 1, length = 0;
        while (s.charAt(i) == ' ') {
            i--;
        }
        while (i >= 0 && s.charAt(i) != ' ') {
            i--;
            length++;
        }
        return length;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLastWord(string s) {
        int n = s.length();
        int i = n - 1, length = 0;
        while (s[i] == ' ') i--;
        while (i >= 0 && s[i] != ' ') {
            i--;
            length++;
        }
        return length;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLastWord(s) {
        let n = s.length;
        let i = n - 1, length = 0;
        while (s.charAt(i) === ' ') {
            i--;
        }
        while (i >= 0 && s.charAt(i) !== ' ') {
            i--;
            length++;
        }
        return length;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 3. Built-In Function

::tabs-start

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        return len(s.split().pop())
```

```java
public class Solution {
    public int lengthOfLastWord(String s) {
        s = s.trim(); 
        return s.length() - s.lastIndexOf(" ") - 1;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLastWord(string s) {
        s.erase(s.find_last_not_of(' ') + 1); 
        return s.substr(s.find_last_of(' ') + 1).length();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLastWord(s) {
        return s.trim().split(' ').pop().length
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$