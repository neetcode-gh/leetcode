## 1. Reverse String

### Intuition

A palindrome reads the same forwards and backwards. The simplest way to check this is to reverse the string and compare it to the original. If they match, it's a palindrome. We iterate through the array and return the first string that passes this check.

### Algorithm

1. Iterate through each word in the array.
2. For each word, create a reversed copy.
3. Compare the original word with its reversed version.
4. If they are equal, return that word immediately.
5. If no palindrome is found after checking all words, return an empty string.

::tabs-start

```python
class Solution:
    def firstPalindrome(self, words: List[str]) -> str:
        for w in words:
            if w == w[::-1]:
                return w
        return ""
```

```java
public class Solution {
    public String firstPalindrome(String[] words) {
        for (String w : words) {
            if (w.equals(new StringBuilder(w).reverse().toString())) {
                return w;
            }
        }
        return "";
    }
}
```

```cpp
class Solution {
public:
    string firstPalindrome(vector<string>& words) {
        for (const string& w : words) {
            string rev = w;
            reverse(rev.begin(), rev.end());
            if (w == rev) {
                return w;
            }
        }
        return "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string}
     */
    firstPalindrome(words) {
        for (let w of words) {
            if (w === w.split('').reverse().join('')) {
                return w;
            }
        }
        return '';
    }
}
```

```csharp
public class Solution {
    public string FirstPalindrome(string[] words) {
        foreach (string w in words) {
            char[] arr = w.ToCharArray();
            Array.Reverse(arr);
            if (w == new string(arr)) {
                return w;
            }
        }
        return "";
    }
}
```

```go
func firstPalindrome(words []string) string {
    for _, w := range words {
        if isPalindrome(w) {
            return w
        }
    }
    return ""
}

func isPalindrome(s string) bool {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return s == string(runes)
}
```

```kotlin
class Solution {
    fun firstPalindrome(words: Array<String>): String {
        for (w in words) {
            if (w == w.reversed()) {
                return w
            }
        }
        return ""
    }
}
```

```swift
class Solution {
    func firstPalindrome(_ words: [String]) -> String {
        for w in words {
            if w == String(w.reversed()) {
                return w
            }
        }
        return ""
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(m)$

> Where $n$ is the size of the string array $words$ and $m$ is the average length of a word in the array.

---

## 2. Two Pointers

### Intuition

Instead of creating a reversed copy (which uses extra space), we can check if a string is a palindrome in place using two pointers. One pointer starts at the beginning, the other at the end. If all corresponding characters match as the pointers move toward each other, the string is a palindrome. This avoids the extra memory needed to store the reversed string.

### Algorithm

1. Iterate through each word in the array.
2. For each word, use two pointers: `l` at the start and `r` at the end.
3. While the characters at `l` and `r` are equal:
   - If `l >= r`, the word is a palindrome; return it.
   - Move `l` forward and `r` backward.
4. If the characters differ, move to the next word.
5. If no palindrome is found, return an empty string.

::tabs-start

```python
class Solution:
    def firstPalindrome(self, words: List[str]) -> str:
        for w in words:
            l, r = 0, len(w) - 1
            while w[l] == w[r]:
                if l >= r:
                    return w
                l, r = l + 1, r - 1
        return ""
```

```java
public class Solution {
    public String firstPalindrome(String[] words) {
        for (String w : words) {
            int l = 0, r = w.length() - 1;
            while (w.charAt(l) == w.charAt(r)) {
                if (l >= r) return w;
                l++;
                r--;
            }
        }
        return "";
    }
}
```

```cpp
class Solution {
public:
    string firstPalindrome(vector<string>& words) {
        for (const string& w : words) {
            int l = 0, r = w.length() - 1;
            while (w[l] == w[r]) {
                if (l >= r) return w;
                l++;
                r--;
            }
        }
        return "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {string}
     */
    firstPalindrome(words) {
        for (let w of words) {
            let l = 0,
                r = w.length - 1;
            while (w.charAt(l) === w.charAt(r)) {
                if (l >= r) return w;
                l++;
                r--;
            }
        }
        return '';
    }
}
```

```csharp
public class Solution {
    public string FirstPalindrome(string[] words) {
        foreach (string w in words) {
            int l = 0, r = w.Length - 1;
            while (w[l] == w[r]) {
                if (l >= r) return w;
                l++;
                r--;
            }
        }
        return "";
    }
}
```

```go
func firstPalindrome(words []string) string {
    for _, w := range words {
        l, r := 0, len(w)-1
        for w[l] == w[r] {
            if l >= r {
                return w
            }
            l++
            r--
        }
    }
    return ""
}
```

```kotlin
class Solution {
    fun firstPalindrome(words: Array<String>): String {
        for (w in words) {
            var l = 0
            var r = w.length - 1
            while (w[l] == w[r]) {
                if (l >= r) return w
                l++
                r--
            }
        }
        return ""
    }
}
```

```swift
class Solution {
    func firstPalindrome(_ words: [String]) -> String {
        for w in words {
            let chars = Array(w)
            var l = 0
            var r = chars.count - 1
            while chars[l] == chars[r] {
                if l >= r {
                    return w
                }
                l += 1
                r -= 1
            }
        }
        return ""
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the size of the string array $words$ and $m$ is the average length of a word in the array.
