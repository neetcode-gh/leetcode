## 1. Brute Force

::tabs-start

```python
class Solution:
    def validPalindrome(self, s: str) -> bool:
        if s == s[::-1]:
            return True
        
        for i in range(len(s)):
            newS = s[:i] + s[i + 1:]
            if newS == newS[::-1]:
                return True
        
        return False
```

```java
public class Solution {
    public boolean validPalindrome(String s) {
        if (isPalindrome(s)) {
            return true;
        }

        for (int i = 0; i < s.length(); i++) {
            String newS = s.substring(0, i) + s.substring(i + 1);
            if (isPalindrome(newS)) {
                return true;
            }
        }

        return false;
    }

    private boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool validPalindrome(string s) {
        if (isPalindrome(s)) {
            return true;
        }

        for (int i = 0; i < s.size(); i++) {
            string newS = s.substr(0, i) + s.substr(i + 1);
            if (isPalindrome(newS)) {
                return true;
            }
        }

        return false;
    }

private:
    bool isPalindrome(const string& s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            if (s[left] != s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    validPalindrome(s) {
        if (this.isPalindrome(s)) {
            return true;
        }

        for (let i = 0; i < s.length; i++) {
            const newS = s.slice(0, i) + s.slice(i + 1);
            if (this.isPalindrome(newS)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param {string} s
     * @return {boolean}
     */
    isPalindrome(s) {
        let left = 0, right = s.length - 1;
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 2. Two Pointers

::tabs-start

```python
class Solution:
    def validPalindrome(self, s: str) -> bool:
        l, r = 0, len(s) - 1

        while l < r:
            if s[l] != s[r]:
                skipL = s[l + 1 : r + 1]
                skipR = s[l : r]
                return skipL == skipL[::-1] or skipR == skipR[::-1]
            l, r = l + 1, r - 1

        return True
```

```java
public class Solution {
    public boolean validPalindrome(String s) {
        int l = 0, r = s.length() - 1;

        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return isPalindrome(s.substring(0, l) + s.substring(l + 1)) || 
                       isPalindrome(s.substring(0, r) + s.substring(r + 1));
            }
            l++;
            r--;
        }

        return true;
    }

    private boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool validPalindrome(string s) {
        int l = 0, r = s.size() - 1;

        while (l < r) {
            if (s[l] != s[r]) {
                return isPalindrome(s.substr(0, l) + s.substr(l + 1)) || 
                       isPalindrome(s.substr(0, r) + s.substr(r + 1));
            }
            l++;
            r--;
        }

        return true;
    }

private:
    bool isPalindrome(string s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    validPalindrome(s) {
        let l = 0, r = s.length - 1;

        while (l < r) {
            if (s[l] !== s[r]) {
                return this.isPalindrome(s.slice(0, l) + s.slice(l + 1)) || 
                       this.isPalindrome(s.slice(0, r) + s.slice(r + 1));
            }
            l++;
            r--;
        }

        return true;
    }

    /**
     * @param {string} s
     * @return {boolean}
     */
    isPalindrome(s) {
        let left = 0, right = s.length - 1;
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Two Pointers (Optimal)

::tabs-start

```python
class Solution:
    def validPalindrome(self, s: str) -> bool:
        def is_palindrome(l, r):
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        l, r = 0, len(s) - 1
        while l < r:
            if s[l] != s[r]:
                return (is_palindrome(l + 1, r) or 
                        is_palindrome(l, r - 1))
            l += 1
            r -= 1

        return True
```

```java
public class Solution {
    public boolean validPalindrome(String s) {
        int l = 0, r = s.length() - 1;

        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return isPalindrome(s, l + 1, r) || 
                       isPalindrome(s, l, r - 1);
            }
            l++;
            r--;
        }

        return true;
    }

    private boolean isPalindrome(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool validPalindrome(string s) {
        int l = 0, r = s.size() - 1;

        while (l < r) {
            if (s[l] != s[r]) {
                return isPalindrome(s, l + 1, r) || 
                       isPalindrome(s, l, r - 1);
            }
            l++;
            r--;
        }

        return true;
    }

private:
    bool isPalindrome(const string& s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    validPalindrome(s) {
        let l = 0, r = s.length - 1;

        while (l < r) {
            if (s[l] !== s[r]) {
                return this.isPalindrome(s, l + 1, r) || 
                       this.isPalindrome(s, l, r - 1);
            }
            l++;
            r--;
        }

        return true;
    }

    /**
     * @param {string} s
     * @param {number} l
     * @param {number} r
     * @return {boolean}
     */
    isPalindrome(s, l, r) {
        while (l < r) {
            if (s[l] !== s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$