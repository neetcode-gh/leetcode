## 1. Reverse the Whole String and Then Reverse Each Word

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$, it's two passes along teh string.
- Space complexity: $O(1)$ constant space used

>  where $N$ is the length of the input `s`
