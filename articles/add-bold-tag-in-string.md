## 1. Mark Bold Characters

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

::tabs-end

### Time & Space Complexity
The time complexity may differ between languages. It is dependent on how the built-in method is implemented.
For this analysis, we will assume that we are using Java.

- Time complexity: $O(m \cdot (n^2 \cdot k - n \cdot k^2))$
- Space complexity: $O(n)$

>  Where $n$ is `s.length`, $m$ is `words.length`, and $k$ is the average length of the words.
