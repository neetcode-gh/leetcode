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
        let left = 0,
            right = s.length - 1;
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

```csharp
public class Solution {
    public bool ValidPalindrome(string s) {
        if (IsPalindrome(s)) return true;

        for (int i = 0; i < s.Length; i++) {
            string newS = s.Substring(0, i) + s.Substring(i + 1);
            if (IsPalindrome(newS)) return true;
        }

        return false;
    }

    private bool IsPalindrome(string str) {
        int left = 0, right = str.Length - 1;
        while (left < right) {
            if (str[left] != str[right]) return false;
            left++;
            right--;
        }
        return true;
    }
}
```

```go
func validPalindrome(s string) bool {
    isPalindrome := func(str string) bool {
        left, right := 0, len(str)-1
        for left < right {
            if str[left] != str[right] {
                return false
            }
            left++
            right--
        }
        return true
    }

    if isPalindrome(s) {
        return true
    }

    for i := 0; i < len(s); i++ {
        newS := s[:i] + s[i+1:]
        if isPalindrome(newS) {
            return true
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun validPalindrome(s: String): Boolean {
        fun isPalindrome(str: String): Boolean {
            var left = 0
            var right = str.length - 1
            while (left < right) {
                if (str[left] != str[right]) return false
                left++
                right--
            }
            return true
        }

        if (isPalindrome(s)) return true

        for (i in s.indices) {
            val newS = s.substring(0, i) + s.substring(i + 1)
            if (isPalindrome(newS)) return true
        }

        return false
    }
}
```

```swift
class Solution {
    func validPalindrome(_ s: String) -> Bool {
        func isPalindrome(_ str: String) -> Bool {
            let arr = Array(str)
            var left = 0
            var right = arr.count - 1
            while left < right {
                if arr[left] != arr[right] { return false }
                left += 1
                right -= 1
            }
            return true
        }

        if isPalindrome(s) { return true }

        let arr = Array(s)
        for i in 0..<arr.count {
            let newS = String(arr[0..<i]) + String(arr[(i+1)...])
            if isPalindrome(newS) { return true }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

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
        let l = 0,
            r = s.length - 1;

        while (l < r) {
            if (s[l] !== s[r]) {
                return (
                    this.isPalindrome(s.slice(0, l) + s.slice(l + 1)) ||
                    this.isPalindrome(s.slice(0, r) + s.slice(r + 1))
                );
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
        let left = 0,
            right = s.length - 1;
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

```csharp
public class Solution {
    public bool ValidPalindrome(string s) {
        int l = 0, r = s.Length - 1;

        while (l < r) {
            if (s[l] != s[r]) {
                string skipL = s.Substring(l + 1, r - l);
                string skipR = s.Substring(l, r - l);
                return IsPalindrome(skipL) || IsPalindrome(skipR);
            }
            l++;
            r--;
        }

        return true;
    }

    private bool IsPalindrome(string str) {
        int left = 0, right = str.Length - 1;
        while (left < right) {
            if (str[left] != str[right]) return false;
            left++;
            right--;
        }
        return true;
    }
}
```

```go
func validPalindrome(s string) bool {
    isPalindrome := func(str string) bool {
        left, right := 0, len(str)-1
        for left < right {
            if str[left] != str[right] {
                return false
            }
            left++
            right--
        }
        return true
    }

    l, r := 0, len(s)-1
    for l < r {
        if s[l] != s[r] {
            skipL := s[l+1 : r+1]
            skipR := s[l:r]
            return isPalindrome(skipL) || isPalindrome(skipR)
        }
        l++
        r--
    }

    return true
}
```

```kotlin
class Solution {
    fun validPalindrome(s: String): Boolean {
        fun isPalindrome(str: String): Boolean {
            var left = 0
            var right = str.length - 1
            while (left < right) {
                if (str[left] != str[right]) return false
                left++
                right--
            }
            return true
        }

        var l = 0
        var r = s.length - 1

        while (l < r) {
            if (s[l] != s[r]) {
                val skipL = s.substring(l + 1, r + 1)
                val skipR = s.substring(l, r)
                return isPalindrome(skipL) || isPalindrome(skipR)
            }
            l++
            r--
        }

        return true
    }
}
```

```swift
class Solution {
    func validPalindrome(_ s: String) -> Bool {
        func isPalindrome(_ str: String) -> Bool {
            let arr = Array(str)
            var left = 0
            var right = arr.count - 1
            while left < right {
                if arr[left] != arr[right] { return false }
                left += 1
                right -= 1
            }
            return true
        }

        let arr = Array(s)
        var l = 0
        var r = arr.count - 1

        while l < r {
            if arr[l] != arr[r] {
                let skipL = String(arr[(l+1)...(r)])
                let skipR = String(arr[l..<r])
                return isPalindrome(skipL) || isPalindrome(skipR)
            }
            l += 1
            r -= 1
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

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
        let l = 0,
            r = s.length - 1;

        while (l < r) {
            if (s[l] !== s[r]) {
                return (
                    this.isPalindrome(s, l + 1, r) ||
                    this.isPalindrome(s, l, r - 1)
                );
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

```csharp
public class Solution {
    public bool ValidPalindrome(string s) {
        bool IsPalindrome(int l, int r) {
            while (l < r) {
                if (s[l] != s[r]) return false;
                l++;
                r--;
            }
            return true;
        }

        int left = 0, right = s.Length - 1;
        while (left < right) {
            if (s[left] != s[right]) {
                return IsPalindrome(left + 1, right) || IsPalindrome(left, right - 1);
            }
            left++;
            right--;
        }

        return true;
    }
}
```

```go
func validPalindrome(s string) bool {
    isPalindrome := func(l, r int) bool {
        for l < r {
            if s[l] != s[r] {
                return false
            }
            l++
            r--
        }
        return true
    }

    l, r := 0, len(s)-1
    for l < r {
        if s[l] != s[r] {
            return isPalindrome(l+1, r) || isPalindrome(l, r-1)
        }
        l++
        r--
    }

    return true
}
```

```kotlin
class Solution {
    fun validPalindrome(s: String): Boolean {
        fun isPalindrome(l: Int, r: Int): Boolean {
            var left = l
            var right = r
            while (left < right) {
                if (s[left] != s[right]) return false
                left++
                right--
            }
            return true
        }

        var l = 0
        var r = s.length - 1
        while (l < r) {
            if (s[l] != s[r]) {
                return isPalindrome(l + 1, r) || isPalindrome(l, r - 1)
            }
            l++
            r--
        }

        return true
    }
}
```

```swift
class Solution {
    func validPalindrome(_ s: String) -> Bool {
        let arr = Array(s)

        func isPalindrome(_ l: Int, _ r: Int) -> Bool {
            var left = l
            var right = r
            while left < right {
                if arr[left] != arr[right] { return false }
                left += 1
                right -= 1
            }
            return true
        }

        var l = 0
        var r = arr.count - 1
        while l < r {
            if arr[l] != arr[r] {
                return isPalindrome(l + 1, r) || isPalindrome(l, r - 1)
            }
            l += 1
            r -= 1
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
