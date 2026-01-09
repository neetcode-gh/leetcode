## 1. Reverse String

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
