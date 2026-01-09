## 1. Convert to String

::tabs-start

```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        s = str(x)
        return s == s[::-1]
```

```java
public class Solution {
    public boolean isPalindrome(int x) {
        String s = String.valueOf(x);
        return s.equals(new StringBuilder(s).reverse().toString());
    }
}
```

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        string s = to_string(x);
        string rev = s;
        reverse(rev.begin(), rev.end());
        return s == rev;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {boolean}
     */
    isPalindrome(x) {
        const s = String(x);
        return s === s.split('').reverse().join('');
    }
}
```

```csharp
public class Solution {
    public bool IsPalindrome(int x) {
        string s = x.ToString();
        char[] arr = s.ToCharArray();
        Array.Reverse(arr);
        string rev = new string(arr);
        return s == rev;
    }
}
```

```go
func isPalindrome(x int) bool {
    s := strconv.Itoa(x)
    n := len(s)
    for i := 0; i < n/2; i++ {
        if s[i] != s[n-i-1] {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isPalindrome(x: Int): Boolean {
        val s = x.toString()
        return s == s.reversed()
    }
}
```

```swift
class Solution {
    func isPalindrome(_ x: Int) -> Bool {
        let s = String(x)
        return s == String(s.reversed())
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the number of digits in the given integer.

---

## 2. Convert to String (Optimal)

::tabs-start

```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        s = str(x)
        n = len(s)
        for i in range(n // 2):
            if s[i] != s[n - i - 1]:
                return False
        return True
```

```java
public class Solution {
    public boolean isPalindrome(int x) {
        String s = String.valueOf(x);
        int n = s.length();
        for (int i = 0; i < n / 2; i++) {
            if (s.charAt(i) != s.charAt(n - i - 1)) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        string s = to_string(x);
        int n = s.length();
        for (int i = 0; i < n / 2; i++) {
            if (s[i] != s[n - i - 1]) {
                return false;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {boolean}
     */
    isPalindrome(x) {
        const s = String(x);
        let n = s.length;
        for (let i = 0; i < n >> 1; i++) {
            if (s.charAt(i) != s.charAt(n - i - 1)) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsPalindrome(int x) {
        string s = x.ToString();
        int n = s.Length;
        for (int i = 0; i < n / 2; i++) {
            if (s[i] != s[n - i - 1]) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func isPalindrome(x int) bool {
    s := strconv.Itoa(x)
    n := len(s)
    for i := 0; i < n/2; i++ {
        if s[i] != s[n-i-1] {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isPalindrome(x: Int): Boolean {
        val s = x.toString()
        val n = s.length
        for (i in 0 until n / 2) {
            if (s[i] != s[n - i - 1]) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isPalindrome(_ x: Int) -> Bool {
        let s = Array(String(x))
        let n = s.count
        for i in 0..<(n / 2) {
            if s[i] != s[n - i - 1] {
                return false
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the number of digits in the given integer.

---

## 3. Reverse the Integer

::tabs-start

```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False

        rev = 0
        num = x
        while num:
            rev = (rev * 10) + (num % 10)
            num //= 10

        return rev == x
```

```java
public class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) {
            return false;
        }

        long rev = 0, num = x;
        while (num != 0) {
            rev = (rev * 10) + (num % 10);
            num /= 10;
        }

        return rev == x;
    }
}
```

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0) {
            return false;
        }

        long long rev = 0, num = x;
        while (num != 0) {
            rev = (rev * 10) + (num % 10);
            num /= 10;
        }

        return rev == x;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {boolean}
     */
    isPalindrome(x) {
        if (x < 0) {
            return false;
        }

        let rev = 0,
            num = x;
        while (num !== 0) {
            rev = rev * 10 + (num % 10);
            num = Math.floor(num / 10);
        }

        return rev === x;
    }
}
```

```csharp
public class Solution {
    public bool IsPalindrome(int x) {
        if (x < 0) return false;
        int rev = 0, num = x;
        while (num != 0) {
            rev = rev * 10 + num % 10;
            num /= 10;
        }
        return rev == x;
    }
}
```

```go
func isPalindrome(x int) bool {
    if x < 0 {
        return false
    }

    rev, num := 0, x
    for num != 0 {
        rev = rev*10 + num%10
        num /= 10
    }

    return rev == x
}
```

```kotlin
class Solution {
    fun isPalindrome(x: Int): Boolean {
        if (x < 0) return false

        var rev = 0L
        var num = x
        while (num != 0) {
            rev = rev * 10 + num % 10
            num /= 10
        }

        return rev == x.toLong()
    }
}
```

```swift
class Solution {
    func isPalindrome(_ x: Int) -> Bool {
        if x < 0 {
            return false
        }

        var rev = 0
        var num = x
        while num != 0 {
            rev = rev * 10 + num % 10
            num /= 10
        }

        return rev == x
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

> Where $n$ is the number of digits in the given integer.

---

## 4. Two Pointers

::tabs-start

```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False

        div = 1
        while x >= 10 * div:
            div *= 10

        while x:
            if x // div != x % 10:
                return False
            x = (x % div) // 10
            div //= 100

        return True
```

```java
public class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) {
            return false;
        }

        long div = 1;
        while (x >= 10 * div) {
            div *= 10;
        }

        while (x != 0) {
            if (x / div != x % 10) {
                return false;
            }
            x = (int) (x % div) / 10;
            div /= 100;
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0) {
            return false;
        }

        long long div = 1;
        while (x >= 10 * div) {
            div *= 10;
        }

        while (x != 0) {
            if (x / div != x % 10) {
                return false;
            }
            x = (x % div) / 10;
            div /= 100;
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {boolean}
     */
    isPalindrome(x) {
        if (x < 0) {
            return false;
        }

        let div = 1;
        while (x >= 10 * div) {
            div *= 10;
        }

        while (x !== 0) {
            if (Math.floor(x / div) !== x % 10) {
                return false;
            }
            x = Math.floor((x % div) / 10);
            div = Math.floor(div / 100);
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsPalindrome(int x) {
        if (x < 0) return false;

        int div = 1;
        while (x / div >= 10) {
            div *= 10;
        }

        while (x != 0) {
            if (x / div != x % 10) {
                return false;
            }
            x = (x % div) / 10;
            div /= 100;
        }

        return true;
    }
}
```

```go
func isPalindrome(x int) bool {
    if x < 0 {
        return false
    }

    div := 1
    for x >= 10*div {
        div *= 10
    }

    for x != 0 {
        if x/div != x%10 {
            return false
        }
        x = (x % div) / 10
        div /= 100
    }

    return true
}
```

```kotlin
class Solution {
    fun isPalindrome(x: Int): Boolean {
        if (x < 0) return false

        var num = x
        var div = 1L
        while (num >= 10 * div) {
            div *= 10
        }

        while (num != 0) {
            if (num / div != (num % 10).toLong()) {
                return false
            }
            num = ((num % div) / 10).toInt()
            div /= 100
        }

        return true
    }
}
```

```swift
class Solution {
    func isPalindrome(_ x: Int) -> Bool {
        if x < 0 {
            return false
        }

        var num = x
        var div = 1
        while num >= 10 * div {
            div *= 10
        }

        while num != 0 {
            if num / div != num % 10 {
                return false
            }
            num = (num % div) / 10
            div /= 100
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

> Where $n$ is the number of digits in the given integer.

---

## 5. Reverse Half of the Number

::tabs-start

```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0 or (x != 0 and x % 10 == 0):
            return False

        rev = 0
        while x > rev:
            rev = (rev * 10) + (x % 10)
            x //= 10

        return x == rev or x == rev // 10
```

```java
public class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x != 0 && x % 10 == 0)) {
            return false;
        }

        int rev = 0;
        while (x > rev) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }

        return x == rev || x == rev / 10;
    }
}
```

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x != 0 && x % 10 == 0)) {
            return false;
        }

        int rev = 0;
        while (x > rev) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }

        return x == rev || x == rev / 10;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {boolean}
     */
    isPalindrome(x) {
        if (x < 0 || (x !== 0 && x % 10 === 0)) {
            return false;
        }

        let rev = 0;
        while (x > rev) {
            rev = rev * 10 + (x % 10);
            x = Math.floor(x / 10);
        }

        return x === rev || x === Math.floor(rev / 10);
    }
}
```

```csharp
public class Solution {
    public bool IsPalindrome(int x) {
        if (x < 0 || (x != 0 && x % 10 == 0)) {
            return false;
        }

        int rev = 0;
        while (x > rev) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }

        return x == rev || x == rev / 10;
    }
}
```

```go
func isPalindrome(x int) bool {
    if x < 0 || (x != 0 && x%10 == 0) {
        return false
    }

    rev := 0
    for x > rev {
        rev = rev*10 + x%10
        x /= 10
    }

    return x == rev || x == rev/10
}
```

```kotlin
class Solution {
    fun isPalindrome(x: Int): Boolean {
        if (x < 0 || (x != 0 && x % 10 == 0)) {
            return false
        }

        var num = x
        var rev = 0
        while (num > rev) {
            rev = rev * 10 + num % 10
            num /= 10
        }

        return num == rev || num == rev / 10
    }
}
```

```swift
class Solution {
    func isPalindrome(_ x: Int) -> Bool {
        if x < 0 || (x != 0 && x % 10 == 0) {
            return false
        }

        var num = x
        var rev = 0
        while num > rev {
            rev = rev * 10 + num % 10
            num /= 10
        }

        return num == rev || num == rev / 10
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

> Where $n$ is the number of digits in the given integer.
