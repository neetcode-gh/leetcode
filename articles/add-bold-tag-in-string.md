## Prerequisites
Before attempting this problem, you should be comfortable with:
- **String Matching** - Finding all occurrences of substrings within a larger string
- **Boolean Arrays for Marking** - Using a boolean array to mark positions that satisfy certain conditions
- **Interval Merging Concepts** - Understanding how overlapping or adjacent marked regions should be merged together

---

## 1. Mark Bold Characters

### Intuition

The key insight is that we need to track which characters should be bold, not which substrings. If we find all occurrences of each word in the string and mark every character position that falls within any match, we can then merge overlapping or adjacent bold regions naturally.

We use a boolean array where each index corresponds to a character in the string. For every word, we find all its occurrences and mark the corresponding positions as bold. When building the result, we only insert `<b>` at the start of a bold region and `</b>` at the end, which handles merging automatically.

### Algorithm

1. Create a boolean array `bold` of size `n` (length of string `s`), initialized to `false`.
2. For each word in the dictionary:
   - Find all occurrences of the word in `s`.
   - For each occurrence starting at index `start`, mark `bold[i] = true` for all `i` from `start` to `start + len(word) - 1`.
3. Build the result string by iterating through `s`:
   - If `bold[i]` is `true` and either `i == 0` or `bold[i-1]` is `false`, insert `<b>`.
   - Append the character `s[i]`.
   - If `bold[i]` is `true` and either `i == n-1` or `bold[i+1]` is `false`, insert `</b>`.
4. Return the result string.

::tabs-start

```python
class Solution:
    def addBoldTag(self, s: str, words: List[str]) -> str:
        n = len(s)
        bold = [False] * n
        
        for word in words:
            start = s.find(word)
            while start != -1:
                for i in range(start, start + len(word)):
                    bold[i] = True
                    
                start = s.find(word, start + 1)

        open_tag = "<b>"
        close_tag = "</b>"
        ans = []
        
        for i in range(n):
            if bold[i] and (i == 0 or not bold[i - 1]):
                ans.append(open_tag)
                
            ans.append(s[i])
            
            if bold[i] and (i == n - 1 or not bold[i + 1]):
                ans.append(close_tag)
        
        return "".join(ans)
```

```java
class Solution {
    public String addBoldTag(String s, String[] words) {
        int n = s.length();
        boolean[] bold = new boolean[n];
        
        for (String word: words) {
            int start = s.indexOf(word);
            while (start != -1) {
                for (int i = start; i < start + word.length(); i++) {
                    bold[i] = true;
                }
                
                start = s.indexOf(word, start + 1);
            }
        }
        
        String openTag = "<b>";
        String closeTag = "</b>";
        StringBuilder ans = new StringBuilder();
        
        for (int i = 0; i < n; i++) {
            if (bold[i] && (i == 0 || !bold[i - 1])) {
                ans.append(openTag);
            }
            
            ans.append(s.charAt(i));
            
            if (bold[i] && (i == n - 1 || !bold[i + 1])) {
                ans.append(closeTag);
            }
        }
        
        return ans.toString();
    }
}
```

```cpp
class Solution {
public:
    string addBoldTag(string s, vector<string>& words) {
        int n = s.size();
        vector<bool> bold(n);
        
        for (string word: words) {
            int start = s.find(word);
            while (start != -1) {
                for (int i = start; i < start + word.size(); i++) {
                    bold[i] = true;
                }
                
                start = s.find(word, start + 1);
            }
        }
        
        string openTag = "<b>";
        string closeTag = "</b>";
        string ans = "";
        
        for (int i = 0; i < n; i++) {
            if (bold[i] && (i == 0 || !bold[i - 1])) {
                ans += openTag;
            }
            
            ans += s[i];
            
            if (bold[i] && (i == n - 1 || !bold[i + 1])) {
                ans += closeTag;
            }
        }
        
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} words
     * @return {string}
     */
    addBoldTag(s, words) {
        const n = s.length;
        const bold = new Array(n).fill(false);

        for (const word of words) {
            let start = s.indexOf(word);
            while (start !== -1) {
                for (let i = start; i < start + word.length; i++) {
                    bold[i] = true;
                }
                start = s.indexOf(word, start + 1);
            }
        }

        const openTag = "<b>";
        const closeTag = "</b>";
        const ans = [];

        for (let i = 0; i < n; i++) {
            if (bold[i] && (i === 0 || !bold[i - 1])) {
                ans.push(openTag);
            }
            ans.push(s[i]);
            if (bold[i] && (i === n - 1 || !bold[i + 1])) {
                ans.push(closeTag);
            }
        }

        return ans.join("");
    }
}
```

```csharp
public class Solution {
    public string AddBoldTag(string s, string[] words) {
        int n = s.Length;
        bool[] bold = new bool[n];

        foreach (string word in words) {
            int start = s.IndexOf(word);
            while (start != -1) {
                for (int i = start; i < start + word.Length; i++) {
                    bold[i] = true;
                }
                start = s.IndexOf(word, start + 1);
            }
        }

        string openTag = "<b>";
        string closeTag = "</b>";
        StringBuilder ans = new StringBuilder();

        for (int i = 0; i < n; i++) {
            if (bold[i] && (i == 0 || !bold[i - 1])) {
                ans.Append(openTag);
            }
            ans.Append(s[i]);
            if (bold[i] && (i == n - 1 || !bold[i + 1])) {
                ans.Append(closeTag);
            }
        }

        return ans.ToString();
    }
}
```

```go
func addBoldTag(s string, words []string) string {
    n := len(s)
    bold := make([]bool, n)

    for _, word := range words {
        start := 0
        for {
            idx := strings.Index(s[start:], word)
            if idx == -1 {
                break
            }
            idx += start
            for i := idx; i < idx+len(word); i++ {
                bold[i] = true
            }
            start = idx + 1
        }
    }

    openTag := "<b>"
    closeTag := "</b>"
    var ans strings.Builder

    for i := 0; i < n; i++ {
        if bold[i] && (i == 0 || !bold[i-1]) {
            ans.WriteString(openTag)
        }
        ans.WriteByte(s[i])
        if bold[i] && (i == n-1 || !bold[i+1]) {
            ans.WriteString(closeTag)
        }
    }

    return ans.String()
}
```

```kotlin
class Solution {
    fun addBoldTag(s: String, words: Array<String>): String {
        val n = s.length
        val bold = BooleanArray(n)

        for (word in words) {
            var start = s.indexOf(word)
            while (start != -1) {
                for (i in start until start + word.length) {
                    bold[i] = true
                }
                start = s.indexOf(word, start + 1)
            }
        }

        val openTag = "<b>"
        val closeTag = "</b>"
        val ans = StringBuilder()

        for (i in 0 until n) {
            if (bold[i] && (i == 0 || !bold[i - 1])) {
                ans.append(openTag)
            }
            ans.append(s[i])
            if (bold[i] && (i == n - 1 || !bold[i + 1])) {
                ans.append(closeTag)
            }
        }

        return ans.toString()
    }
}
```

```swift
class Solution {
    func addBoldTag(_ s: String, _ words: [String]) -> String {
        let chars = Array(s)
        let n = chars.count
        var bold = [Bool](repeating: false, count: n)

        for word in words {
            var searchStart = s.startIndex
            while let range = s.range(of: word, range: searchStart..<s.endIndex) {
                let start = s.distance(from: s.startIndex, to: range.lowerBound)
                let end = s.distance(from: s.startIndex, to: range.upperBound)
                for i in start..<end {
                    bold[i] = true
                }
                searchStart = s.index(after: range.lowerBound)
            }
        }

        let openTag = "<b>"
        let closeTag = "</b>"
        var ans = ""

        for i in 0..<n {
            if bold[i] && (i == 0 || !bold[i - 1]) {
                ans += openTag
            }
            ans.append(chars[i])
            if bold[i] && (i == n - 1 || !bold[i + 1]) {
                ans += closeTag
            }
        }

        return ans
    }
}
```

::tabs-end

### Time & Space Complexity
The time complexity may differ between languages. It is dependent on how the built-in method is implemented.
For this analysis, we will assume that we are using Java.

- Time complexity: $O(m \cdot (n^2 \cdot k - n \cdot k^2))$
- Space complexity: $O(n)$

>  Where $n$ is `s.length`, $m$ is `words.length`, and $k$ is the average length of the words.

---

## Common Pitfalls

### Not Merging Adjacent Bold Regions
A common mistake is inserting separate `<b>` tags for each word match without merging overlapping or adjacent regions. For example, if "ab" and "bc" both match in "abc", the result should be `<b>abc</b>`, not `<b>ab</b><b>bc</b>`.
```python
# Wrong: treating each match independently
for word in words:
    s = s.replace(word, f"<b>{word}</b>")  # Creates nested/separate tags
```

### Off-by-One When Marking Bold Ranges
When marking character positions as bold, forgetting that the end index should be `start + len(word) - 1` (inclusive) or using `start + len(word)` (exclusive) inconsistently leads to incorrect bold boundaries.
```python
# Wrong: marking one character too many or too few
for i in range(start, start + len(word) + 1):  # Off-by-one error
    bold[i] = True
```

### Missing Overlapping Occurrences of the Same Word
Using `find()` with `start + len(word)` as the next search position misses overlapping matches. For example, searching for "aa" in "aaa" should find two matches (at index 0 and 1), but skipping by word length finds only one.
```python
# Wrong: skipping by word length misses overlaps
start = s.find(word, start + len(word))  # Should be start + 1
```
