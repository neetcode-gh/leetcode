## 1. Convert to String

### Intuition

The most straightforward approach is to convert the integer to a string and check if the string is a palindrome by reversing it.

If the original string equals its reversed version, the number is a palindrome.

### Algorithm

1. Convert the integer to its string representation.
2. Reverse the string.
3. Compare the original string with the reversed string.
4. Return true if they are equal, false otherwise.

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

### Intuition

Instead of creating a reversed copy of the entire string, we can compare characters from both ends moving toward the center. This avoids the extra space needed for the reversed string.

We only need to check half the string since we compare characters in pairs.

### Algorithm

1. Convert the integer to its string representation.
2. Initialize two pointers: `i` at the start and `j` at the end.
3. While `i < n/2`, compare `s[i]` with `s[n - i - 1]`. If they differ, return false.
4. Return true if all comparisons pass.

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

### Intuition

Without using string conversion, we can reverse the entire integer mathematically and compare it to the original. If they are equal, the number is a palindrome.

Negative numbers cannot be palindromes because of the negative sign. We build the reversed number digit by digit using modulo and division operations.

### Algorithm

1. If the number is negative, return false immediately.
2. Initialize `rev = 0` and `num = x`.
3. While `num > 0`:
   - Extract the last digit using `num % 10`.
   - Append it to `rev` by computing `rev = rev * 10 + digit`.
   - Remove the last digit from `num` using integer division.
4. Compare `rev` with the original `x` and return true if equal.

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

### Intuition

We can compare digits from both ends without converting to a string or reversing the entire number. The idea is to extract the leftmost and rightmost digits and compare them.

We use a divisor to extract the leftmost digit and modulo to extract the rightmost digit, then shrink the number from both ends.

### Algorithm

1. If the number is negative, return false.
2. Find the divisor `div` such that `x / div` gives the first digit. This is the largest power of 10 less than or equal to `x`.
3. While `x > 0`:
   - Compare the first digit (`x / div`) with the last digit (`x % 10`). If they differ, return false.
   - Remove both the first and last digits: `x = (x % div) / 10`.
   - Update the divisor: `div /= 100` (since we removed two digits).
4. Return true if all comparisons pass.

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

### Intuition

Reversing the entire number risks integer overflow. A clever optimization is to reverse only the second half of the number and compare it to the first half.

We keep extracting digits from the end and building the reversed half until the reversed half is greater than or equal to the remaining number. At that point, we have processed half (or just past half) of the digits.

### Algorithm

1. Handle edge cases: negative numbers and numbers ending in 0 (except 0 itself) are not palindromes.
2. Initialize `rev = 0`.
3. While `x > rev`:
   - Extract the last digit of `x` and append it to `rev`.
   - Remove the last digit from `x`.
4. After the loop, compare `x == rev` (even length) or `x == rev / 10` (odd length, where the middle digit is in `rev`).
5. Return true if either condition holds.

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
