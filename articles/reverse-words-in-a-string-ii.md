## 1. Reverse the Whole String and Then Reverse Each Word

### Intuition

Reversing the word order might seem complex, but there is a clever trick: reverse the entire string first, then reverse each individual word. When we reverse the whole string, the words end up in the correct order but each word itself is spelled backward. By reversing each word individually, we fix the spelling while preserving the new word order. This two-pass approach elegantly solves the problem in place.

### Algorithm

1. Reverse the entire character array using two pointers that swap characters from both ends moving inward.
2. Iterate through the array to find each word (delimited by spaces).
3. For each word found, reverse just that segment using the same two-pointer swap technique.
4. Continue until all words have been reversed.

::tabs-start

```python
class Solution:
    def reverse(self, l: List[str], left: int, right: int) -> None:
        while left < right:
            l[left], l[right] = l[right], l[left]
            left, right = left + 1, right - 1

    def reverse_each_word(self, l: List[str]) -> None:
        n = len(l)
        start = end = 0

        while start < n:
            # go to the end of the word
            while end < n and l[end] != ' ':
                end += 1
            # reverse the word
            self.reverse(l, start, end - 1)
            # move to the next word
            start = end + 1
            end += 1
            
    def reverseWords(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        # reverse the whole string
        self.reverse(s, 0, len(s) - 1)
        
        # reverse each word
        self.reverse_each_word(s)
```

```java
class Solution {
    public void reverse(char[] s, int left, int right) {
        while (left < right) {
            char tmp = s[left];
            s[left++] = s[right];
            s[right--] = tmp;
        }
    }

    public void reverseEachWord(char[] s) {
        int n = s.length;
        int start = 0, end = 0;

        while (start < n) {
            // go to the end of the word
            while (end < n && s[end] != ' ') ++end;
            // reverse the word
            reverse(s, start, end - 1);
            // move to the next word
            start = end + 1;
            ++end;
        }
    }

    public void reverseWords(char[] s) {
        // reverse the whole string
        reverse(s, 0, s.length - 1);

        // reverse each word
        reverseEachWord(s);
    }
}
```

```cpp
class Solution {
public:
    void reverseWords(vector<char>& s) {
        reverse(s.begin(), s.end());

        // 'start' points to the beginning of the current word
        // 'end' points to the position just after the current word
        int start = 0, end = 0;
        int n = s.size();

        while (start < n) {

            // Move 'right' to the position just after the current word
            while (end < n && s[end] != ' ')
                end++;

            // Note: in C++, reverse() operates on [start, end)
            // In other words, the leftmost element is included, while the rightmost element is not
            reverse(s.begin() + start, s.begin() + end);

            // Move 'start' and 'end' to the beginning of the next word
            end++;
            start = end;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} s
     * @return {void} Do not return anything, modify s in-place instead.
     */
    reverseWords(s) {
        // reverse the whole string
        this.reverse(s, 0, s.length - 1);
        // reverse each word
        this.reverseEachWord(s);
    }

    reverse(s, left, right) {
        while (left < right) {
            let tmp = s[left];
            s[left++] = s[right];
            s[right--] = tmp;
        }
    }

    reverseEachWord(s) {
        const n = s.length;
        let start = 0, end = 0;

        while (start < n) {
            // go to the end of the word
            while (end < n && s[end] !== ' ') ++end;
            // reverse the word
            this.reverse(s, start, end - 1);
            // move to the next word
            start = end + 1;
            ++end;
        }
    }
}
```

```csharp
public class Solution {
    public void ReverseWords(char[] s) {
        // reverse the whole string
        Reverse(s, 0, s.Length - 1);
        // reverse each word
        ReverseEachWord(s);
    }

    private void Reverse(char[] s, int left, int right) {
        while (left < right) {
            char tmp = s[left];
            s[left++] = s[right];
            s[right--] = tmp;
        }
    }

    private void ReverseEachWord(char[] s) {
        int n = s.Length;
        int start = 0, end = 0;

        while (start < n) {
            // go to the end of the word
            while (end < n && s[end] != ' ') end++;
            // reverse the word
            Reverse(s, start, end - 1);
            // move to the next word
            start = end + 1;
            end++;
        }
    }
}
```

```go
func reverseWords(s []byte) {
    // reverse the whole string
    reverse(s, 0, len(s)-1)
    // reverse each word
    reverseEachWord(s)
}

func reverse(s []byte, left, right int) {
    for left < right {
        s[left], s[right] = s[right], s[left]
        left++
        right--
    }
}

func reverseEachWord(s []byte) {
    n := len(s)
    start, end := 0, 0

    for start < n {
        // go to the end of the word
        for end < n && s[end] != ' ' {
            end++
        }
        // reverse the word
        reverse(s, start, end-1)
        // move to the next word
        start = end + 1
        end++
    }
}
```

```kotlin
class Solution {
    fun reverseWords(s: CharArray): Unit {
        // reverse the whole string
        reverse(s, 0, s.size - 1)
        // reverse each word
        reverseEachWord(s)
    }

    private fun reverse(s: CharArray, left: Int, right: Int) {
        var l = left
        var r = right
        while (l < r) {
            val tmp = s[l]
            s[l++] = s[r]
            s[r--] = tmp
        }
    }

    private fun reverseEachWord(s: CharArray) {
        val n = s.size
        var start = 0
        var end = 0

        while (start < n) {
            // go to the end of the word
            while (end < n && s[end] != ' ') end++
            // reverse the word
            reverse(s, start, end - 1)
            // move to the next word
            start = end + 1
            end++
        }
    }
}
```

```swift
class Solution {
    func reverseWords(_ s: inout [Character]) {
        // reverse the whole string
        reverse(&s, 0, s.count - 1)
        // reverse each word
        reverseEachWord(&s)
    }

    private func reverse(_ s: inout [Character], _ left: Int, _ right: Int) {
        var l = left
        var r = right
        while l < r {
            let tmp = s[l]
            s[l] = s[r]
            s[r] = tmp
            l += 1
            r -= 1
        }
    }

    private func reverseEachWord(_ s: inout [Character]) {
        let n = s.count
        var start = 0
        var end = 0

        while start < n {
            // go to the end of the word
            while end < n && s[end] != " " {
                end += 1
            }
            // reverse the word
            reverse(&s, start, end - 1)
            // move to the next word
            start = end + 1
            end += 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$, it's two passes along the string.
- Space complexity: $O(1)$ constant space used

>  where $N$ is the length of the input `s`

---

## Common Pitfalls

### Reversing in the Wrong Order

The two-step process must be done in the correct order: first reverse the entire string, then reverse each individual word. Doing it in reverse order (reversing each word first, then the whole string) produces the same result, but the logic is less intuitive when thinking about word order reversal.

### Incorrect Word Boundary Detection

When finding word boundaries, ensure you correctly handle the transition between words and spaces. Off-by-one errors when determining where a word ends can cause characters to be included in the wrong word or skipped entirely.

### Not Handling Edge Cases

Edge cases like a single word with no spaces, or strings that start or end with a space, need careful handling. The algorithm should work correctly regardless of word count or spacing patterns in the input.
