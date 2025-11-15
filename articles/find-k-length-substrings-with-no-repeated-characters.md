## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \min(m, k))$
- Space complexity: $O(m)$

>  Where $n$ is the length of `s`, $k$ is the given substring length, and $m$ is the number of unique characters allowed in the string. In this case, $m=26$.

---

## 2. Sliding Window

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

>  Where $n$ is the length of `s` and $m$ is the number of unique characters allowed in the string. In this case, $m=26$.
