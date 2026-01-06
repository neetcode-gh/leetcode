## 1. Horizontal Scanning

### Intuition

Imagine you have a list of words and you want to find what they all have in common at the start. A natural way to do this is to compare the first two words and find their common prefix. Once you have that "intermediate" prefix, you compare it with the third word to see if it needs to be shortened further. You repeat this process until you've checked every word or the prefix becomes an empty string.

For example, with `strs = ["flower", "flow", "flight"]`:
1. Compare "flower" and "flow" $\rightarrow$ Common prefix is "flow".
2. Compare "flow" and "flight" $\rightarrow$ Common prefix is "fl".
3. Final result: "fl".

### Algorithm

1. Initialize the `prefix` as the first string in the array `strs[0]`.
2. Iterate through the rest of the strings in the array starting from index $1$.
3. For each string, compare it character by character with the current `prefix`.
4. Update the `prefix` to include only the characters that matched from the beginning.
5. If at any point the `prefix` becomes empty, return `""` immediately.
6. After checking all strings, return the final `prefix`.

::tabs-start

```python
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        prefix = strs[0]
        for i in range(1, len(strs)):
            j = 0
            while j < min(len(prefix), len(strs[i])):
                if prefix[j] != strs[i][j]:
                    break
                j += 1
            prefix = prefix[:j]
        return prefix
```

```java
public class Solution {
    public String longestCommonPrefix(String[] strs) {
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            int j = 0;
            while (j < Math.min(prefix.length(), strs[i].length())) {
                if (prefix.charAt(j) != strs[i].charAt(j)) {
                    break;
                }
                j++;
            }
            prefix = prefix.substring(0, j);
        }
        return prefix;
    }
}
```

```cpp
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        string prefix = strs[0];
        for (int i = 1; i < strs.size(); i++) {
            int j = 0;
            while (j < min(prefix.length(), strs[i].length())) {
                if (prefix[j] != strs[i][j]) {
                    break;
                }
                j++;
            }
            prefix = prefix.substr(0, j);
        }
        return prefix;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @return {string}
     */
    longestCommonPrefix(strs) {
        let prefix = strs[0];
        for (let i = 1; i < strs.length; i++) {
            let j = 0;
            while (j < Math.min(prefix.length, strs[i].length)) {
                if (prefix[j] !== strs[i][j]) {
                    break;
                }
                j++;
            }
            prefix = prefix.slice(0, j);
        }
        return prefix;
    }
}
```

```csharp
public class Solution {
    public string LongestCommonPrefix(string[] strs) {
        string prefix = strs[0];

        for (int i = 1; i < strs.Length; i++) {
            int j = 0;
            while (j < Math.Min(prefix.Length, strs[i].Length)) {
                if (prefix[j] != strs[i][j]) {
                    break;
                }
                j++;
            }
            prefix = prefix.Substring(0, j);
        }

        return prefix;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$, where $n$ is the number of strings and $m$ is the length of the shortest string. In the worst case (all strings are identical), we compare every character of every string.
- Space complexity: $O(1)$ if we don't count the space used to store the result, as we only update a reference or a substring.

---

## 2. Vertical Scanning

### Intuition

Instead of comparing words one by one, we can look at all words "vertically"—column by column. We check the first character of every word, then the second character of every word, and so on. As soon as we find a character that doesn't match across all words, or we reach the end of one of the strings, the characters we've collected so far form the longest common prefix.

For `strs = ["apple", "apply", "ape"]`:

- Column 0: 'a', 'a', 'a' (Match!)
- Column 1: 'p', 'p', 'p' (Match!)
- Column 2: 'p', 'p', 'e' (Mismatch! Stop here.)
- Result: "ap".

### Algorithm

1. Start a loop with index $i$ from $0$ to the length of the first string `strs[0]`. This index $i$ represents the current character position we are comparing.
2. Inside this loop, iterate through the rest of the strings in the array using an index $j$ (from $1$ to $n-1$).
3. For each string `strs[j]`, perform two checks:
    - **Boundary Check:** If $i$ is equal to the length of `strs[j]`, it means `strs[j]` is the shortest string and we have exhausted it.
    - **Character Check:** If the character at `strs[j][i]` is not equal to the character at `strs[0][i]`, the prefix has ended.
4. If either check fails, return the substring of `strs[0]` from index $0$ up to (but not including) $i$.
5. If the outer loop completes, it means the entire first string is the common prefix.

::tabs-start

```python
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        for i in range(len(strs[0])):
            for s in strs:
                if i == len(s) or s[i] != strs[0][i]:
                    return s[:i]
        return strs[0]
```

```java
public class Solution {
    public String longestCommonPrefix(String[] strs) {
        for (int i = 0; i < strs[0].length(); i++) {
            for (String s : strs) {
                if (i == s.length() || s.charAt(i) != strs[0].charAt(i)) {
                    return s.substring(0, i);
                }
            }
        }
        return strs[0];
    }
}
```

```cpp
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        for (int i = 0; i < strs[0].length(); i++) {
            for (const string& s : strs) {
                if (i == s.length() || s[i] != strs[0][i]) {
                    return s.substr(0, i);
                }
            }
        }
        return strs[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @return {string}
     */
    longestCommonPrefix(strs) {
        for (let i = 0; i < strs[0].length; i++) {
            for (let s of strs) {
                if (i === s.length || s[i] !== strs[0][i]) {
                    return s.slice(0, i);
                }
            }
        }
        return strs[0];
    }
}
```

```csharp
public class Solution {
    public string LongestCommonPrefix(string[] strs) {
        for (int i = 0; i < strs[0].Length; i++) {
            foreach (string s in strs) {
                if (i == s.Length || s[i] != strs[0][i]) {
                    return s.Substring(0, i);
                }
            }
        }
        return strs[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$, where $n$ is the number of strings and $m$ is the length of the common prefix. This approach is often more efficient than horizontal scanning because it stops as soon as a mismatch is found in any string at the current position $i$.
- Space complexity: $O(1)$ since we did not use extra space.

---

## 3. Sorting

### Intuition

When you sort a list of strings lexicographically (alphabetically), the two strings that are most different from each other will be at the very beginning and the very end of the sorted array. Specifically, the longest common prefix of the entire array must be the same as the common prefix between the first and the last string in the sorted list.

For `strs = ["apple", "apply", "ape"]`:
1. Sorted: `["ape", "apple", "apply"]`.
2. Compare "ape" and "apply" $\rightarrow$ Common prefix is "ap".
3. Final result: "ap".

### Algorithm

1. If the input array has only one string, return it.
2. Sort the array `strs`.
3. Compare the first string `strs[0]` and the last string `strs[n-1]`.
4. Find the common characters between these two strings from the start.
5. Return the substring representing the match.

::tabs-start

```python
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        if len(strs) == 1:
            return strs[0]

        strs = sorted(strs)
        for i in range(min(len(strs[0]), len(strs[-1]))):
            if strs[0][i] != strs[-1][i]:
                return strs[0][:i]
        return strs[0]
```

```java
public class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 1) {
            return strs[0];
        }

        Arrays.sort(strs);
        int N = Math.min(strs[0].length(), strs[strs.length - 1].length());
        for (int i = 0; i < N; i++) {
            if (strs[0].charAt(i) != strs[strs.length - 1].charAt(i)) {
                return strs[0].substring(0, i);
            }
        }
        return strs[0];
    }
}
```

```cpp
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.size() == 1) {
            return strs[0];
        }

        sort(strs.begin(), strs.end());
        for (int i = 0; i < min(strs[0].length(), strs.back().length()); i++) {
            if (strs[0][i] != strs.back()[i]) {
                return strs[0].substr(0, i);
            }
        }
        return strs[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @return {string}
     */
    longestCommonPrefix(strs) {
        if (strs.length === 1) {
            return strs[0];
        }

        strs.sort();
        let N = Math.min(strs[0].length, strs[strs.length - 1].length);
        for (let i = 0; i < N; i++) {
            if (strs[0][i] !== strs[strs.length - 1][i]) {
                return strs[0].slice(0, i);
            }
        }
        return strs[0];
    }
}
```

```csharp
public class Solution {
    public string LongestCommonPrefix(string[] strs) {
        if (strs.Length == 1) {
            return strs[0];
        }

        Array.Sort(strs);
        string first = strs[0];
        string last = strs[strs.Length - 1];

        int i = 0;
        while (i < Math.Min(first.Length, last.Length)) {
            if (first[i] != last[i]) {
                return first.Substring(0, i);
            }
            i++;
        }

        return first;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n * m)$, where $n$ is the number of strings and $m$ is the length of the common prefix. The sorting process dominates the time complexity.
- Space complexity: $O(m)$ or $O(n*m)$ where $n$ is the number of strings and $m$ is the length of the longest string depending on the sorting implementation and whether it handles string copies.

---

## 4. Trie

### Intuition

A **Trie** (Prefix Tree) is a specialized data structure for storing strings where each node represents a character. If we insert one string into a Trie and then "trace" the path other strings take through it, we can find where they deviate. To find the longest common prefix, we can insert the shortest string into the Trie and then check how much of each subsequent string matches the paths in the Trie.

### Algorithm

1. Find the shortest string in the array to minimize the Trie size.
2. Insert this shortest string into a Trie.
3. For every other string in the array, traverse the Trie to see how many characters match.
4. Keep track of the minimum match length found across all strings.
5. Return the substring of the first string up to that minimum length.

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = {}

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]

    def lcp(self, word: str, prefixLen: int) -> int:
        node = self.root
        for i in range(min(len(word), prefixLen)):
            if word[i] not in node.children:
                return i
            node = node.children[word[i]]
        return min(len(word), prefixLen)

class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if len(strs) == 1:
            return strs[0]

        mini = 0
        for i in range(1, len(strs)):
            if len(strs[mini]) > len(strs[i]):
                mini = i

        trie = Trie()
        trie.insert(strs[mini])
        prefixLen = len(strs[mini])
        for i in range(len(strs)):
            prefixLen = trie.lcp(strs[i], prefixLen)
        return strs[0][:prefixLen]
```

```java
class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
}

class Trie {
    TrieNode root = new TrieNode();

    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
    }

    int lcp(String word, int prefixLen) {
        TrieNode node = root;
        int i = 0;
        while (i < Math.min(word.length(), prefixLen)) {
            if (!node.children.containsKey(word.charAt(i))) {
                return i;
            }
            node = node.children.get(word.charAt(i));
            i++;
        }
        return Math.min(word.length(), prefixLen);
    }
}

public class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 1) {
            return strs[0];
        }

        int mini = 0;
        for (int i = 1; i < strs.length; i++) {
            if (strs[mini].length() > strs[i].length()) {
                mini = i;
            }
        }

        Trie trie = new Trie();
        trie.insert(strs[mini]);
        int prefixLen = strs[mini].length();

        for (int i = 0; i < strs.length; i++) {
            prefixLen = trie.lcp(strs[i], prefixLen);
        }

        return strs[0].substring(0, prefixLen);
    }
}
```

```cpp
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
};

class Trie {
public:
    TrieNode* root;
    Trie() {
        root = new TrieNode();
    }

    void insert(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children.find(c) == node->children.end()) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
    }

    int lcp(const string& word, int prefixLen) {
        TrieNode* node = root;
        int i = 0;
        while (i < min((int)word.length(), prefixLen)) {
            if (node->children.find(word[i]) == node->children.end()) {
                return i;
            }
            node = node->children[word[i]];
            i++;
        }
        return min((int)word.length(), prefixLen);
    }
};

class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.size() == 1) {
            return strs[0];
        }
        int mini = 0;
        for (int i = 1; i < strs.size(); i++) {
            if (strs[mini].size() > strs[i].size()) {
                mini = i;
            }
        }

        Trie trie;
        trie.insert(strs[mini]);
        int prefixLen = strs[mini].length();

        for (int i = 0; i < strs.size(); i++) {
            prefixLen = trie.lcp(strs[i], prefixLen);
        }

        return strs[0].substr(0, prefixLen);
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = {};
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
    }

    /**
     * @param {string} word
     * @param {number} prefixLen
     * @return {number}
     */
    lcp(word, prefixLen) {
        let node = this.root;
        let i = 0;
        while (i < Math.min(word.length, prefixLen)) {
            if (!node.children[word[i]]) {
                return i;
            }
            node = node.children[word[i]];
            i++;
        }
        return Math.min(word.length, prefixLen);
    }
}

class Solution {
    /**
     * @param {string[]} strs
     * @return {string}
     */
    longestCommonPrefix(strs) {
        if (strs.length === 1) {
            return strs[0];
        }

        let mini = 0;
        for (let i = 1; i < strs.length; i++) {
            if (strs[mini].length > strs[i].length) {
                mini = i;
            }
        }

        const trie = new Trie();
        trie.insert(strs[mini]);
        let prefixLen = strs[mini].length;

        for (let i = 0; i < strs.length; i++) {
            prefixLen = trie.lcp(strs[i], prefixLen);
        }

        return strs[0].substring(0, prefixLen);
    }
}
```

```csharp
public class TrieNode {
    public Dictionary<char, TrieNode> Children = new Dictionary<char, TrieNode>();
}

public class Trie {
    public TrieNode Root;

    public Trie() {
        Root = new TrieNode();
    }

    public void Insert(string word) {
        TrieNode node = Root;
        foreach (char c in word) {
            if (!node.Children.ContainsKey(c)) {
                node.Children[c] = new TrieNode();
            }
            node = node.Children[c];
        }
    }

    public int Lcp(string word, int prefixLen) {
        TrieNode node = Root;
        for (int i = 0; i < Math.Min(word.Length, prefixLen); i++) {
            if (!node.Children.ContainsKey(word[i])) {
                return i;
            }
            node = node.Children[word[i]];
        }
        return Math.Min(word.Length, prefixLen);
    }
}

public class Solution {
    public string LongestCommonPrefix(string[] strs) {
        if (strs.Length == 1) return strs[0];

        int mini = 0;
        for (int i = 1; i < strs.Length; i++) {
            if (strs[i].Length < strs[mini].Length) {
                mini = i;
            }
        }

        Trie trie = new Trie();
        trie.Insert(strs[mini]);

        int prefixLen = strs[mini].Length;
        for (int i = 0; i < strs.Length; i++) {
            prefixLen = trie.Lcp(strs[i], prefixLen);
        }

        return strs[0].Substring(0, prefixLen);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$, where $n$ is the number of strings and $m$ is the length of the shortest string. We process each character during insertion and searching.
- Space complexity: $O(m)$, where $m$ is the length of the string inserted into the Trie. We only store one string's characters in the Trie nodes.
