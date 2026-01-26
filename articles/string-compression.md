## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Two Pointers Technique** - Used to traverse and write to the array simultaneously while tracking consecutive characters
- **In-Place Array Modification** - Understanding how to modify an array without using additional space proportional to input size
- **String to Integer Conversion** - Converting count values to individual digit characters for multi-digit numbers

---

## 1. Using Extra Space

### Intuition

The idea is to traverse the array and group consecutive identical characters together. For each group, we write the character followed by its count (only if count > 1). We first build the compressed string in a separate buffer, then copy it back to the original array. This approach is straightforward but uses extra space proportional to the output size.

### Algorithm

1. Initialize an empty string `s` to build the compressed result.
2. Use a pointer `i` to traverse the array. For each position, find the extent of consecutive identical characters using a second pointer `j`.
3. Append the character `chars[i]` to `s`.
4. If the count `j - i` is greater than `1`, append the count as a string to `s`.
5. Move `i` to `j` and repeat until the array is fully processed.
6. Copy the compressed string `s` back to the `chars` array and return its length.

::tabs-start

```python
class Solution:
    def compress(self, chars: List[str]) -> int:
        n = len(chars)
        s = ""

        i = 0
        while i < n:
            s += chars[i]
            j = i + 1
            while j < n and chars[i] == chars[j]:
                j += 1

            if j - i > 1:
                s += str(j - i)
            i = j

        i = 0
        while i < len(s):
            chars[i] = s[i]
            i += 1
        return i
```

```java
public class Solution {
    public int compress(char[] chars) {
        int n = chars.length;
        StringBuilder s = new StringBuilder();

        int i = 0;
        while (i < n) {
            s.append(chars[i]);
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                s.append(String.valueOf(j - i));
            }
            i = j;
        }

        for (i = 0; i < s.length(); i++) {
            chars[i] = s.charAt(i);
        }
        return s.length();
    }
}
```

```cpp
class Solution {
public:
    int compress(vector<char>& chars) {
        int n = chars.size();
        string s = "";

        int i = 0;
        while (i < n) {
            s += chars[i];
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                s += to_string(j - i);
            }
            i = j;
        }

        for (i = 0; i < s.size(); i++) {
            chars[i] = s[i];
        }
        return s.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} chars
     * @return {number}
     */
    compress(chars) {
        const n = chars.length;
        let s = "";

        let i = 0;
        while (i < n) {
            s += chars[i];
            let j = i + 1;
            while (j < n && chars[i] === chars[j]) {
                j++;
            }

            if (j - i > 1) {
                s += String(j - i);
            }
            i = j;
        }

        for (i = 0; i < s.length; i++) {
            chars[i] = s[i];
        }
        return s.length;
    }
}
```

```csharp
public class Solution {
    public int Compress(char[] chars) {
        int n = chars.Length;
        string s = "";

        int i = 0;
        while (i < n) {
            s += chars[i];
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                s += (j - i).ToString();
            }
            i = j;
        }

        for (i = 0; i < s.Length; i++) {
            chars[i] = s[i];
        }
        return s.Length;
    }
}
```

```go
func compress(chars []byte) int {
    n := len(chars)
    s := ""

    i := 0
    for i < n {
        s += string(chars[i])
        j := i + 1
        for j < n && chars[i] == chars[j] {
            j++
        }

        if j-i > 1 {
            s += strconv.Itoa(j - i)
        }
        i = j
    }

    for i := 0; i < len(s); i++ {
        chars[i] = s[i]
    }
    return len(s)
}
```

```kotlin
class Solution {
    fun compress(chars: CharArray): Int {
        val n = chars.size
        val sb = StringBuilder()

        var i = 0
        while (i < n) {
            sb.append(chars[i])
            var j = i + 1
            while (j < n && chars[i] == chars[j]) {
                j++
            }

            if (j - i > 1) {
                sb.append(j - i)
            }
            i = j
        }

        for (idx in sb.indices) {
            chars[idx] = sb[idx]
        }
        return sb.length
    }
}
```

```swift
class Solution {
    func compress(_ chars: inout [Character]) -> Int {
        let n = chars.count
        var s = ""

        var i = 0
        while i < n {
            s += String(chars[i])
            var j = i + 1
            while j < n && chars[i] == chars[j] {
                j += 1
            }

            if j - i > 1 {
                s += String(j - i)
            }
            i = j
        }

        for (idx, char) in s.enumerated() {
            chars[idx] = char
        }
        return s.count
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ or $O(n ^ 2)$ depending on the language.
* Space complexity: $O(n)$

---

## 2. Two Pointers

### Intuition

We can compress the array in-place using two pointers: one for reading (`i`) and one for writing (`k`). Since the compressed form is never longer than the original (a character followed by its count takes at most as much space as the repeated characters), we can safely overwrite the array as we go. This eliminates the need for extra space.

### Algorithm

1. Initialize `k = 0` as the write pointer and `i = 0` as the read pointer.
2. While `i < n`, write `chars[i]` at position `k` and increment `k`.
3. Use pointer `j` starting at `i + 1` to find all consecutive characters equal to `chars[i]`.
4. If the count `j - i` exceeds `1`, convert it to a string and write each digit to `chars[k++]`.
5. Move `i` to `j` and repeat.
6. Return `k` as the new length of the compressed array.

::tabs-start

```python
class Solution:
    def compress(self, chars: List[str]) -> int:
        n = len(chars)
        k = i = 0

        while i < n:
            chars[k] = chars[i]
            k += 1
            j = i + 1
            while j < n and chars[i] == chars[j]:
                j += 1

            if j - i > 1:
                for c in str(j - i):
                    chars[k] = c
                    k += 1
            i = j
        return k
```

```java
public class Solution {
    public int compress(char[] chars) {
        int n = chars.length, k = 0, i = 0;

        while (i < n) {
            chars[k++] = chars[i];
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                String cnt = String.valueOf(j - i);
                for (char c : cnt.toCharArray()) {
                    chars[k++] = c;
                }
            }
            i = j;
        }

        return k;
    }
}
```

```cpp
class Solution {
public:
    int compress(vector<char>& chars) {
        int n = chars.size(), k = 0, i = 0;

        while (i < n) {
            chars[k++] = chars[i];
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                string cnt = to_string(j - i);
                for (char c : cnt) {
                    chars[k++] = c;
                }
            }
            i = j;
        }

        return k;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} chars
     * @return {number}
     */
    compress(chars) {
        let n = chars.length, k = 0, i = 0;

        while (i < n) {
            chars[k++] = chars[i];
            let j = i + 1;
            while (j < n && chars[i] === chars[j]) {
                j++;
            }

            if (j - i > 1) {
                const cnt = String(j - i);
                for (const c of cnt) {
                    chars[k++] = c;
                }
            }
            i = j;
        }

        return k;
    }
}
```

```csharp
public class Solution {
    public int Compress(char[] chars) {
        int n = chars.Length, k = 0, i = 0;

        while (i < n) {
            chars[k++] = chars[i];
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                string cnt = (j - i).ToString();
                foreach (char c in cnt) {
                    chars[k++] = c;
                }
            }
            i = j;
        }

        return k;
    }
}
```

```go
func compress(chars []byte) int {
    n := len(chars)
    k, i := 0, 0

    for i < n {
        chars[k] = chars[i]
        k++
        j := i + 1
        for j < n && chars[i] == chars[j] {
            j++
        }

        if j-i > 1 {
            cnt := strconv.Itoa(j - i)
            for _, c := range cnt {
                chars[k] = byte(c)
                k++
            }
        }
        i = j
    }

    return k
}
```

```kotlin
class Solution {
    fun compress(chars: CharArray): Int {
        val n = chars.size
        var k = 0
        var i = 0

        while (i < n) {
            chars[k++] = chars[i]
            var j = i + 1
            while (j < n && chars[i] == chars[j]) {
                j++
            }

            if (j - i > 1) {
                val cnt = (j - i).toString()
                for (c in cnt) {
                    chars[k++] = c
                }
            }
            i = j
        }

        return k
    }
}
```

```swift
class Solution {
    func compress(_ chars: inout [Character]) -> Int {
        let n = chars.count
        var k = 0
        var i = 0

        while i < n {
            chars[k] = chars[i]
            k += 1
            var j = i + 1
            while j < n && chars[i] == chars[j] {
                j += 1
            }

            if j - i > 1 {
                let cnt = String(j - i)
                for c in cnt {
                    chars[k] = c
                    k += 1
                }
            }
            i = j
        }

        return k
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## Common Pitfalls

### Forgetting to Write Multi-Digit Counts Character by Character

When the count of consecutive characters exceeds 9 (e.g., 12), you must write each digit separately ('1' then '2') rather than treating it as a single value. Failing to split the count into individual digit characters will produce incorrect output.

### Writing Count for Single Characters

The problem specifies that you should only write the count if it is greater than 1. A common mistake is writing "a1" instead of just "a" for a single occurrence. Always check `if (count > 1)` before appending the count to the result.

### Overwriting Unprocessed Characters in In-Place Solutions

When compressing in place, the write pointer can overwrite characters that haven't been read yet if not handled carefully. Since the compressed form is never longer than the original, this won't happen as long as you process groups completely before moving the write pointer forward.