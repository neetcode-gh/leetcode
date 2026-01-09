## 1. Arithmetic Sequence

### Intuition

The string can be split into consecutive groups of identical characters. For each group of length L, the number of substrings containing only that character follows the arithmetic sequence formula: 1 + 2 + 3 + ... + L = L*(L+1)/2. We scan through the string, identify each group, and sum up the contributions.

### Algorithm

1. Use two pointers, left and right, both starting at 0.
2. Move right through the string until a different character is found or the end is reached.
3. When a group ends (character changes or string ends):
   - Calculate the length of the group as (right - left).
   - Add the arithmetic sum: (length * (length + 1)) / 2 to the total.
   - Move left to right to start the next group.
4. Return the total count.

::tabs-start

```python
class Solution:
    def countLetters(self, S: str) -> int:
        total = left = 0

        for right in range(len(S) + 1):
            if right == len(S) or S[left] != S[right]:
                len_substring = right - left
                # more details about the sum of the arithmetic sequence:
                # https://en.wikipedia.org/wiki/Arithmetic_progression#Sum
                total += (1 + len_substring) * len_substring // 2
                left = right

        return total
```

```java
class Solution {
    public int countLetters(String S) {
        int total = 0;
        for (int left = 0, right = 0; right <= S.length(); right++) {
            if (right == S.length() || S.charAt(left) != S.charAt(right)) {
                int lenSubstring = right - left;
                // more details about the sum of the arithmetic sequence:
                // https://en.wikipedia.org/wiki/Arithmetic_progression#Sum
                total += (1 + lenSubstring) * lenSubstring / 2;
                left = right;
            }
        }

        return total;
    }
}
```

```cpp
class Solution {
public:
    int countLetters(string s) {
        int total = 0;
        for (int left = 0, right = 0; right <= s.length(); right++) {
            if (right == s.length() || s[left] != s[right]) {
                int lenSubstring = right - left;
                // more details about the sum of the arithmetic sequence:
                // https://en.wikipedia.org/wiki/Arithmetic_progression#Sum
                total += (1 + lenSubstring) * lenSubstring / 2;
                left = right;
            }
        }

        return total;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countLetters(s) {
        let total = 0;
        for (let left = 0, right = 0; right <= s.length; right++) {
            if (right === s.length || s[left] !== s[right]) {
                let lenSubstring = right - left;
                // more details about the sum of the arithmetic sequence:
                // https://en.wikipedia.org/wiki/Arithmetic_progression#Sum
                total += (1 + lenSubstring) * lenSubstring / 2;
                left = right;
            }
        }

        return total;
    }
}
```

```csharp
public class Solution {
    public int CountLetters(string s) {
        int total = 0;
        for (int left = 0, right = 0; right <= s.Length; right++) {
            if (right == s.Length || s[left] != s[right]) {
                int lenSubstring = right - left;
                total += (1 + lenSubstring) * lenSubstring / 2;
                left = right;
            }
        }

        return total;
    }
}
```

```go
func countLetters(s string) int {
    total := 0
    left := 0

    for right := 0; right <= len(s); right++ {
        if right == len(s) || s[left] != s[right] {
            lenSubstring := right - left
            total += (1 + lenSubstring) * lenSubstring / 2
            left = right
        }
    }

    return total
}
```

```kotlin
class Solution {
    fun countLetters(s: String): Int {
        var total = 0
        var left = 0

        for (right in 0..s.length) {
            if (right == s.length || s[left] != s[right]) {
                val lenSubstring = right - left
                total += (1 + lenSubstring) * lenSubstring / 2
                left = right
            }
        }

        return total
    }
}
```

```swift
class Solution {
    func countLetters(_ s: String) -> Int {
        var total = 0
        let chars = Array(s)
        var left = 0

        for right in 0...chars.count {
            if right == chars.count || chars[left] != chars[right] {
                let lenSubstring = right - left
                total += (1 + lenSubstring) * lenSubstring / 2
                left = right
            }
        }

        return total
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$

- Space complexity: $O(1)$ constant space

>  Where $N$ is the length of the input string `s`.

---

## 2. Dynamic Programming

### Intuition

For each position i, we can compute how many valid substrings end at that position. If the character at position i matches the previous character, the count equals the previous count plus 1 (we extend all previous substrings and add one new single-character substring). Otherwise, only the single character itself forms a valid substring. The total is the sum across all positions.

### Algorithm

1. Create an array `substrings` where substrings[i] represents valid substrings ending at index i.
2. Initialize substrings[0] = 1 and total = 1.
3. For each position i from 1 to n-1:
   - If s[i] equals s[i-1], set substrings[i] = substrings[i-1] + 1.
   - Otherwise, set substrings[i] = 1.
   - Add substrings[i] to the total.
4. Return the total count.

::tabs-start

```python
class Solution:
    def countLetters(self, S: str) -> int:
        total = 1
        substrings = [0] * len(S)
        substrings[0] = 1

        for i in range(1, len(S)):
            if S[i - 1] == S[i]:
                substrings[i] = substrings[i-1] + 1
            else:
                substrings[i] = 1

            total += substrings[i]

        return total
```

```java
class Solution {
    public int countLetters(String S) {
        int substrings[] = new int[S.length()];
        int total = 1;
        substrings[0] = 1;

        for (int i = 1; i < S.length(); i++) {
            if (S.charAt(i) == S.charAt(i - 1)) {
                substrings[i] = substrings[i - 1] + 1;
            } else {
                substrings[i] = 1;
            }

            total += substrings[i];
        }

        return total;
    }
}
```

```cpp
class Solution {
public:
    int countLetters(string s) {
        vector<int> substrings(s.length());
        int total = 1;
        substrings[0] = 1;

        for (int i = 1; i < s.length(); i++) {
            if (s[i] == s[i - 1]) {
                substrings[i] = substrings[i - 1] + 1;
            } else {
                substrings[i] = 1;
            }

            total += substrings[i];
        }

        return total;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countLetters(s) {
        let substrings = new Array(s.length);
        let total = 1;
        substrings[0] = 1;

        for (let i = 1; i < s.length; i++) {
            if (s[i] === s[i - 1]) {
                substrings[i] = substrings[i - 1] + 1;
            } else {
                substrings[i] = 1;
            }

            total += substrings[i];
        }

        return total;
    }
}
```

```csharp
public class Solution {
    public int CountLetters(string s) {
        int[] substrings = new int[s.Length];
        int total = 1;
        substrings[0] = 1;

        for (int i = 1; i < s.Length; i++) {
            if (s[i] == s[i - 1]) {
                substrings[i] = substrings[i - 1] + 1;
            } else {
                substrings[i] = 1;
            }

            total += substrings[i];
        }

        return total;
    }
}
```

```go
func countLetters(s string) int {
    substrings := make([]int, len(s))
    total := 1
    substrings[0] = 1

    for i := 1; i < len(s); i++ {
        if s[i] == s[i-1] {
            substrings[i] = substrings[i-1] + 1
        } else {
            substrings[i] = 1
        }

        total += substrings[i]
    }

    return total
}
```

```kotlin
class Solution {
    fun countLetters(s: String): Int {
        val substrings = IntArray(s.length)
        var total = 1
        substrings[0] = 1

        for (i in 1 until s.length) {
            substrings[i] = if (s[i] == s[i - 1]) {
                substrings[i - 1] + 1
            } else {
                1
            }

            total += substrings[i]
        }

        return total
    }
}
```

```swift
class Solution {
    func countLetters(_ s: String) -> Int {
        let chars = Array(s)
        var substrings = [Int](repeating: 0, count: chars.count)
        var total = 1
        substrings[0] = 1

        for i in 1..<chars.count {
            if chars[i] == chars[i - 1] {
                substrings[i] = substrings[i - 1] + 1
            } else {
                substrings[i] = 1
            }

            total += substrings[i]
        }

        return total
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$

- Space complexity: $O(N)$

>  Where $N$ is the length of the input string `s`.

---

## 3. Dynamic Programming (Optimized)

### Intuition

Since we only need the previous value to compute the current one, we can optimize space by using a single variable instead of an array. This variable tracks the count of valid substrings ending at the current position.

### Algorithm

1. Initialize total = 1 and count = 1 (for the first character).
2. For each position i from 1 to n-1:
   - If s[i] equals s[i-1], increment count by 1.
   - Otherwise, reset count to 1.
   - Add count to the total.
3. Return the total count.

::tabs-start

```python
class Solution:
    def countLetters(self, S: str) -> int:
        total = 1
        count = 1
        
        for i in range(1, len(S)):
            if S[i] == S[i-1]:
                count += 1
            else:
                count = 1

            total += count

        return total
```

```java
class Solution {
    public int countLetters(String S) {
        int total = 1, count = 1;
        
        for (int i = 1; i < S.length(); i++) {
            if (S.charAt(i) == S.charAt(i-1)) {
                count++;
            } else {
                count = 1;
            }

            total += count;
        }

        return total;
    }
}
```

```cpp
class Solution {
public:
    int countLetters(string s) {
        int total = 1, count = 1;

        for (int i = 1; i < s.length(); i++) {
            if (s[i] == s[i-1]) {
                count++;
            } else {
                count = 1;
            }
            total += count;
        }

        return total;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countLetters(s) {
        let total = 1, count = 1;

        for (let i = 1; i < s.length; i++) {
            if (s[i] === s[i-1]) {
                count++;
            } else {
                count = 1;
            }

            total += count;
        }

        return total;
    }
}
```

```csharp
public class Solution {
    public int CountLetters(string s) {
        int total = 1, count = 1;

        for (int i = 1; i < s.Length; i++) {
            if (s[i] == s[i - 1]) {
                count++;
            } else {
                count = 1;
            }

            total += count;
        }

        return total;
    }
}
```

```go
func countLetters(s string) int {
    total, count := 1, 1

    for i := 1; i < len(s); i++ {
        if s[i] == s[i-1] {
            count++
        } else {
            count = 1
        }
        total += count
    }

    return total
}
```

```kotlin
class Solution {
    fun countLetters(s: String): Int {
        var total = 1
        var count = 1

        for (i in 1 until s.length) {
            if (s[i] == s[i - 1]) {
                count++
            } else {
                count = 1
            }

            total += count
        }

        return total
    }
}
```

```swift
class Solution {
    func countLetters(_ s: String) -> Int {
        let chars = Array(s)
        var total = 1, count = 1

        for i in 1..<chars.count {
            if chars[i] == chars[i - 1] {
                count += 1
            } else {
                count = 1
            }

            total += count
        }

        return total
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$

- Space complexity: $O(1)$ constant space

>  Where $N$ is the length of the input string `s`.
