## 1. Brute Force

### Intuition

The most direct approach is to examine every substring of length `k` and check if it contains all unique characters. For each starting position, we scan `k` characters and track their frequencies. If any character appears more than once, we stop early and move to the next substring.

### Algorithm

1. If `k > 26`, return `0` immediately since there are only 26 lowercase letters.
2. For each starting index `i` from `0` to `n - k`:
   - Initialize a frequency array of size 26.
   - Iterate through the next `k` characters.
   - Increment the frequency of each character.
   - If any frequency exceeds `1`, break out of the inner loop (duplicate found).
   - If we complete the inner loop without duplicates, increment the answer.
3. Return the count of valid substrings.

::tabs-start

```python
class Solution:
    def numKLenSubstrNoRepeats(self, s: str, k: int) -> int:
        if k > 26:
            return 0
        answer = 0
        n = len(s)

        for i in range(n - k + 1):
            # Initializing an empty frequency array
            freq = [0] * 26

            for j in range(i, i + k):
                curr_char = ord(s[j]) - ord("a")

                # Incrementing the frequency of current character
                freq[curr_char] += 1

                # If a repeated character is found, we stop the loop
                if freq[curr_char] > 1:
                    break
            else:
                # If the substring does not have any repeated characters,
                # we increment the answer
                answer += 1

        return answer
```

```java
class Solution {
    public int numKLenSubstrNoRepeats(String s, int k) {
        if (k > 26) return 0;
        int n = s.length();
        int answer = 0;

        for (int i = 0; i <= n - k; i++) {
            // Initializing an empty frequency array
            int freq[] = new int[26];
            boolean isUnique = true;

            for (int j = i; j < i + k; j++) {
                char ch = s.charAt(j);

                // Incrementing the frequency of current character
                freq[ch - 'a']++;

                // If a repeated character is found, we stop the loop
                if (freq[ch - 'a'] > 1) {
                    isUnique = false;
                    break;
                }
            }

            // If the substring does not have any repeated characters,
            // we increment the answer
            if (isUnique) {
                answer++;
            }
        }

        return answer;
    }
}
```

```cpp
class Solution {
public:
    int numKLenSubstrNoRepeats(string s, int k) {
        if (k > 26) return 0;

        int answer = 0;
        int n = s.size();

        for (int i = 0; i <= n - k; i++) {
            // Initializing an empty frequency array
            int freq[26] = {0};
            bool isUnique = true;

            for (int j = i; j < i + k; j++) {
                // Incrementing the frequency of current character
                freq[s[j] - 'a']++;

                // If a repeated character is found, we stop the loop
                if (freq[s[j] - 'a'] > 1) {
                    isUnique = false;
                    break;
                }
            }

            // If the substring does not have any repeated characters,
            // we increment the answer
            if (isUnique) {
                answer++;
            }
        }

        return answer;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    numKLenSubstrNoRepeats(s, k) {
        if (k > 26) {
            return 0;
        }

        let answer = 0;
        const n = s.length;

        for (let i = 0; i < n - k + 1; i++) {
            // Initializing an empty frequency array
            const freq = new Array(26).fill(0);
            let hasRepeats = false;

            for (let j = i; j < i + k; j++) {
                const currChar = s[j].charCodeAt(0) - 'a'.charCodeAt(0);
                // Incrementing the frequency of current character
                freq[currChar]++;
                // If a repeated character is found, we stop the loop
                if (freq[currChar] > 1) {
                    hasRepeats = true;
                    break;
                }
            }

            // If the substring does not have any repeated characters,
            // we increment the answer
            if (!hasRepeats) {
                answer++;
            }
        }

        return answer;
    }
}
```

```csharp
public class Solution {
    public int NumKLenSubstrNoRepeats(string s, int k) {
        if (k > 26) return 0;
        int answer = 0;
        int n = s.Length;

        for (int i = 0; i <= n - k; i++) {
            // Initializing an empty frequency array
            int[] freq = new int[26];
            bool isUnique = true;

            for (int j = i; j < i + k; j++) {
                char ch = s[j];
                // Incrementing the frequency of current character
                freq[ch - 'a']++;
                // If a repeated character is found, we stop the loop
                if (freq[ch - 'a'] > 1) {
                    isUnique = false;
                    break;
                }
            }

            // If the substring does not have any repeated characters,
            // we increment the answer
            if (isUnique) {
                answer++;
            }
        }

        return answer;
    }
}
```

```go
func numKLenSubstrNoRepeats(s string, k int) int {
    if k > 26 {
        return 0
    }
    answer := 0
    n := len(s)

    for i := 0; i <= n-k; i++ {
        // Initializing an empty frequency array
        freq := make([]int, 26)
        isUnique := true

        for j := i; j < i+k; j++ {
            currChar := s[j] - 'a'
            // Incrementing the frequency of current character
            freq[currChar]++
            // If a repeated character is found, we stop the loop
            if freq[currChar] > 1 {
                isUnique = false
                break
            }
        }

        // If the substring does not have any repeated characters,
        // we increment the answer
        if isUnique {
            answer++
        }
    }

    return answer
}
```

```kotlin
class Solution {
    fun numKLenSubstrNoRepeats(s: String, k: Int): Int {
        if (k > 26) return 0
        var answer = 0
        val n = s.length

        for (i in 0..n - k) {
            // Initializing an empty frequency array
            val freq = IntArray(26)
            var isUnique = true

            for (j in i until i + k) {
                val currChar = s[j] - 'a'
                // Incrementing the frequency of current character
                freq[currChar]++
                // If a repeated character is found, we stop the loop
                if (freq[currChar] > 1) {
                    isUnique = false
                    break
                }
            }

            // If the substring does not have any repeated characters,
            // we increment the answer
            if (isUnique) {
                answer++
            }
        }

        return answer
    }
}
```

```swift
class Solution {
    func numKLenSubstrNoRepeats(_ s: String, _ k: Int) -> Int {
        if k > 26 { return 0 }
        var answer = 0
        let n = s.count
        let chars = Array(s)
        let aAscii = Character("a").asciiValue!

        for i in 0...(n - k) {
            // Initializing an empty frequency array
            var freq = [Int](repeating: 0, count: 26)
            var isUnique = true

            for j in i..<(i + k) {
                let currChar = Int(chars[j].asciiValue! - aAscii)
                // Incrementing the frequency of current character
                freq[currChar] += 1
                // If a repeated character is found, we stop the loop
                if freq[currChar] > 1 {
                    isUnique = false
                    break
                }
            }

            // If the substring does not have any repeated characters,
            // we increment the answer
            if isUnique {
                answer += 1
            }
        }

        return answer
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \min(m, k))$
- Space complexity: $O(m)$

>  Where $n$ is the length of `s`, $k$ is the given substring length, and $m$ is the number of unique characters allowed in the string. In this case, $m=26$.

---

## 2. Sliding Window

### Intuition

Instead of recomputing character frequencies for each substring from scratch, we can maintain a sliding window. As we move the window, we add the new character on the right and remove the character that falls off on the left. When a duplicate is detected, we shrink the window from the left until all characters are unique again.

### Algorithm

1. If `k > 26`, return `0` (impossible to have `k` unique characters).
2. Initialize two pointers `left = 0` and `right = 0`, and a frequency array.
3. While `right < n`:
   - Add `s[right]` to the frequency array.
   - While the frequency of `s[right]` exceeds `1`, remove `s[left]` from the window and increment `left`.
   - If the window size equals `k`, increment the answer, then shrink the window from the left by one to prepare for the next position.
   - Move `right` forward.
4. Return the answer.

::tabs-start

```python
class Solution:
    def numKLenSubstrNoRepeats(self, s: str, k: int) -> int:
        # We can reuse the condition from the first approach
        # as for k > 26, there can be no substrings with only unique characters
        if k > 26:
            return 0
        answer = 0
        n = len(s)

        # Initializing the left and right pointers
        left = right = 0

        # Initializing an empty frequency array
        freq = [0] * 26

        # Function to obtain the index of a character according to the alphabet
        def get_val(ch: str) -> int:
            return ord(ch) - ord("a")

        while right < n:

            # Add the current character in the frequency array
            freq[get_val(s[right])] += 1

            # If the current character appears more than once in the frequency array
            # keep contracting the window and removing characters from the
            # frequency array till the frequency of the current character becomes 1.
            while freq[get_val(s[right])] > 1:
                freq[get_val(s[left])] -= 1
                left += 1

            # Check if the length of the current unique substring is equal to k
            if right - left + 1 == k:
                answer += 1

                # Contract the window and remove the leftmost character from the
                # frequency array
                freq[get_val(s[left])] -= 1
                left += 1

            # Expand the window
            right += 1

        return answer
```

```java
class Solution {
    public int numKLenSubstrNoRepeats(String s, int k) {
        // We can reuse the condition from the first approach
        // as for k > 26, there can be no substrings with only unique characters
        if (k > 26) return 0;

        int answer = 0;
        int n = s.length();

        // Initializing the left and right pointers
        int left = 0, right = 0;
        // Initializing an empty frequency array
        int freq[] = new int[26];

        while (right < n) {
            // Add the current character in the frequency array
            freq[s.charAt(right) - 'a']++;

            // If the current character appears more than once in the frequency array
            // keep contracting the window and removing characters from the
            // frequency array till the frequency of the current character becomes 1.
            while (freq[s.charAt(right) - 'a'] > 1) {
                freq[s.charAt(left) - 'a']--;
                left++;
            }

            // Check if the length of the current unique substring is equal to k
            if (right - left + 1 == k) {
                answer++;

                // Contract the window and remove the leftmost character from the
                // frequency array
                freq[s.charAt(left) - 'a']--;
                left++;
            }

            // Expand the window
            right++;
        }

        return answer;
    }
}
```

```cpp
class Solution {
public:
    int numKLenSubstrNoRepeats(string s, int k) {
        // We can reuse the condition from the first approach
        // as for k > 26, there can be no substrings with only unique characters
        if (k > 26) return 0;

        int answer = 0;
        int n = s.size();

        // Initializing the left and right pointers
        int left = 0, right = 0;
        // Initializing an empty frequency array
        int freq[26] = {0};

        while (right < n) {
            // Add the current character in the frequency array
            freq[s[right] - 'a']++;

            // If the current character appears more than once in the frequency
            // array keep contracting the window and removing characters from
            // the frequency array till the frequency of the current character
            // becomes 1.
            while (freq[s[right] - 'a'] > 1) {
                freq[s[left] - 'a']--;
                left++;
            }

            // Check if the length of the current unique substring is equal to k
            if (right - left + 1 == k) {
                answer++;

                // Contract the window and remove the leftmost character from
                // the frequency array
                freq[s[left] - 'a']--;
                left++;
            }

            // Expand the window
            right++;
        }

        return answer;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    numKLenSubstrNoRepeats(s, k) {
        // We can reuse the condition from the first approach
        // as for k > 26, there can be no substrings with only unique characters
        if (k > 26) {
            return 0;
        }

        let answer = 0;
        const n = s.length;
        // Initializing the left and right pointers
        let left = 0, right = 0;
        // Initializing an empty frequency array
        const freq = new Array(26).fill(0);

        // Function to obtain the index of a character according to the alphabet
        const getVal = (ch) => {
            return ch.charCodeAt(0) - 'a'.charCodeAt(0);
        };

        while (right < n) {
            // Add the current character in the frequency array
            freq[getVal(s[right])]++;

            // If the current character appears more than once in the frequency array
            // keep contracting the window and removing characters from the
            // frequency array till the frequency of the current character becomes 1.
            while (freq[getVal(s[right])] > 1) {
                freq[getVal(s[left])]--;
                left++;
            }

            // Check if the length of the current unique substring is equal to k
            if (right - left + 1 === k) {
                answer++;
                // Contract the window and remove the leftmost character from the
                // frequency array
                freq[getVal(s[left])]--;
                left++;
            }

            // Expand the window
            right++;
        }

        return answer;
    }
}
```

```csharp
public class Solution {
    public int NumKLenSubstrNoRepeats(string s, int k) {
        // We can reuse the condition from the first approach
        // as for k > 26, there can be no substrings with only unique characters
        if (k > 26) return 0;

        int answer = 0;
        int n = s.Length;
        // Initializing the left and right pointers
        int left = 0, right = 0;
        // Initializing an empty frequency array
        int[] freq = new int[26];

        while (right < n) {
            // Add the current character in the frequency array
            freq[s[right] - 'a']++;

            // If the current character appears more than once in the frequency array
            // keep contracting the window and removing characters from the
            // frequency array till the frequency of the current character becomes 1.
            while (freq[s[right] - 'a'] > 1) {
                freq[s[left] - 'a']--;
                left++;
            }

            // Check if the length of the current unique substring is equal to k
            if (right - left + 1 == k) {
                answer++;
                // Contract the window and remove the leftmost character from the
                // frequency array
                freq[s[left] - 'a']--;
                left++;
            }

            // Expand the window
            right++;
        }

        return answer;
    }
}
```

```go
func numKLenSubstrNoRepeats(s string, k int) int {
    // We can reuse the condition from the first approach
    // as for k > 26, there can be no substrings with only unique characters
    if k > 26 {
        return 0
    }

    answer := 0
    n := len(s)
    // Initializing the left and right pointers
    left, right := 0, 0
    // Initializing an empty frequency array
    freq := make([]int, 26)

    for right < n {
        // Add the current character in the frequency array
        freq[s[right]-'a']++

        // If the current character appears more than once in the frequency array
        // keep contracting the window and removing characters from the
        // frequency array till the frequency of the current character becomes 1.
        for freq[s[right]-'a'] > 1 {
            freq[s[left]-'a']--
            left++
        }

        // Check if the length of the current unique substring is equal to k
        if right-left+1 == k {
            answer++
            // Contract the window and remove the leftmost character from the
            // frequency array
            freq[s[left]-'a']--
            left++
        }

        // Expand the window
        right++
    }

    return answer
}
```

```kotlin
class Solution {
    fun numKLenSubstrNoRepeats(s: String, k: Int): Int {
        // We can reuse the condition from the first approach
        // as for k > 26, there can be no substrings with only unique characters
        if (k > 26) return 0

        var answer = 0
        val n = s.length
        // Initializing the left and right pointers
        var left = 0
        var right = 0
        // Initializing an empty frequency array
        val freq = IntArray(26)

        while (right < n) {
            // Add the current character in the frequency array
            freq[s[right] - 'a']++

            // If the current character appears more than once in the frequency array
            // keep contracting the window and removing characters from the
            // frequency array till the frequency of the current character becomes 1.
            while (freq[s[right] - 'a'] > 1) {
                freq[s[left] - 'a']--
                left++
            }

            // Check if the length of the current unique substring is equal to k
            if (right - left + 1 == k) {
                answer++
                // Contract the window and remove the leftmost character from the
                // frequency array
                freq[s[left] - 'a']--
                left++
            }

            // Expand the window
            right++
        }

        return answer
    }
}
```

```swift
class Solution {
    func numKLenSubstrNoRepeats(_ s: String, _ k: Int) -> Int {
        // We can reuse the condition from the first approach
        // as for k > 26, there can be no substrings with only unique characters
        if k > 26 { return 0 }

        var answer = 0
        let chars = Array(s)
        let n = chars.count
        // Initializing the left and right pointers
        var left = 0
        var right = 0
        // Initializing an empty frequency array
        var freq = [Int](repeating: 0, count: 26)
        let aAscii = Character("a").asciiValue!

        while right < n {
            // Add the current character in the frequency array
            let rightIdx = Int(chars[right].asciiValue! - aAscii)
            freq[rightIdx] += 1

            // If the current character appears more than once in the frequency array
            // keep contracting the window and removing characters from the
            // frequency array till the frequency of the current character becomes 1.
            while freq[rightIdx] > 1 {
                let leftIdx = Int(chars[left].asciiValue! - aAscii)
                freq[leftIdx] -= 1
                left += 1
            }

            // Check if the length of the current unique substring is equal to k
            if right - left + 1 == k {
                answer += 1
                // Contract the window and remove the leftmost character from the
                // frequency array
                let leftIdx = Int(chars[left].asciiValue! - aAscii)
                freq[leftIdx] -= 1
                left += 1
            }

            // Expand the window
            right += 1
        }

        return answer
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

>  Where $n$ is the length of `s` and $m$ is the number of unique characters allowed in the string. In this case, $m=26$.
