## 1. Horizontal Scanning

### Intuition

Start with the first string as the initial prefix candidate. Then compare it with each subsequent string, shrinking the prefix to match only the common portion. After processing all strings, what remains is the longest common prefix. The prefix can only shrink or stay the same as we go through more strings.

### Algorithm

1. Initialize `prefix` as the first string in the array.
2. For each subsequent string, compare characters one by one with the current prefix.
3. Find the index `j` where characters stop matching (or we run out of characters in either string).
4. Truncate `prefix` to include only characters from index `0` to `j-1`.
5. After processing all strings, return the remaining prefix.

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

```go
func longestCommonPrefix(strs []string) string {
    prefix := strs[0]
    for i := 1; i < len(strs); i++ {
        j := 0
        for j < len(prefix) && j < len(strs[i]) {
            if prefix[j] != strs[i][j] {
                break
            }
            j++
        }
        prefix = prefix[:j]
    }
    return prefix
}
```

```kotlin
class Solution {
    fun longestCommonPrefix(strs: Array<String>): String {
        var prefix = strs[0]
        for (i in 1 until strs.size) {
            var j = 0
            while (j < minOf(prefix.length, strs[i].length)) {
                if (prefix[j] != strs[i][j]) {
                    break
                }
                j++
            }
            prefix = prefix.substring(0, j)
        }
        return prefix
    }
}
```

```swift
class Solution {
    func longestCommonPrefix(_ strs: [String]) -> String {
        var prefix = Array(strs[0])
        for i in 1..<strs.count {
            let s = Array(strs[i])
            var j = 0
            while j < min(prefix.count, s.count) {
                if prefix[j] != s[j] {
                    break
                }
                j += 1
            }
            prefix = Array(prefix[0..<j])
        }
        return String(prefix)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the shortest string and $m$ is the number of strings.

---

## 2. Vertical Scanning

### Intuition

Instead of comparing entire strings horizontally, we can compare characters column by column across all strings. Check if all strings have the same character at position `0`, then position `1`, and so on. The moment we find a mismatch or reach the end of any string, we've found where the common prefix ends.

### Algorithm

1. Iterate through character positions starting from index `0`.
2. At each position `i`, check the character in the first string.
3. Compare this character against position `i` in every other string.
4. If any string is too short or has a different character, return the prefix up to index `i-1`.
5. If we complete the loop without returning, the entire first string is the common prefix.

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

```go
func longestCommonPrefix(strs []string) string {
    for i := 0; i < len(strs[0]); i++ {
        for _, s := range strs {
            if i == len(s) || s[i] != strs[0][i] {
                return s[:i]
            }
        }
    }
    return strs[0]
}
```

```kotlin
class Solution {
    fun longestCommonPrefix(strs: Array<String>): String {
        for (i in strs[0].indices) {
            for (s in strs) {
                if (i == s.length || s[i] != strs[0][i]) {
                    return s.substring(0, i)
                }
            }
        }
        return strs[0]
    }
}
```

```swift
class Solution {
    func longestCommonPrefix(_ strs: [String]) -> String {
        let first = Array(strs[0])
        for i in 0..<first.count {
            for str in strs {
                let s = Array(str)
                if i == s.count || s[i] != first[i] {
                    return String(first[0..<i])
                }
            }
        }
        return strs[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ since we did not use extra space.

> Where $n$ is the length of the shortest string and $m$ is the number of strings.

---

## 3. Sorting

### Intuition

When strings are sorted lexicographically, the first and last strings in the sorted order are the most different from each other. If these two extremes share a common prefix, then all strings in between must also share that same prefix. So we only need to compare the first and last strings after sorting.

### Algorithm

1. If there's only one string, return it directly.
2. Sort the array of strings lexicographically.
3. Compare only the first and last strings in the sorted array.
4. Find the longest prefix they share by comparing characters one by one.
5. Return this prefix, which is guaranteed to be common to all strings.

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

```go
import "sort"

func longestCommonPrefix(strs []string) string {
    if len(strs) == 1 {
        return strs[0]
    }

    sort.Strings(strs)
    first := strs[0]
    last := strs[len(strs)-1]
    n := len(first)
    if len(last) < n {
        n = len(last)
    }

    for i := 0; i < n; i++ {
        if first[i] != last[i] {
            return first[:i]
        }
    }
    return first
}
```

```kotlin
class Solution {
    fun longestCommonPrefix(strs: Array<String>): String {
        if (strs.size == 1) {
            return strs[0]
        }

        strs.sort()
        val first = strs[0]
        val last = strs[strs.size - 1]

        var i = 0
        while (i < minOf(first.length, last.length)) {
            if (first[i] != last[i]) {
                return first.substring(0, i)
            }
            i++
        }

        return first
    }
}
```

```swift
class Solution {
    func longestCommonPrefix(_ strs: [String]) -> String {
        if strs.count == 1 {
            return strs[0]
        }

        let sorted = strs.sorted()
        let first = Array(sorted[0])
        let last = Array(sorted[sorted.count - 1])

        var i = 0
        while i < min(first.count, last.count) {
            if first[i] != last[i] {
                return String(first[0..<i])
            }
            i += 1
        }

        return sorted[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m \log m)$
- Space complexity: $O(1)$ or $O(m)$ depending on the sorting algorithm.

> Where $n$ is the length of the longest string and $m$ is the number of strings.

---

## 4. Trie

### Intuition

A Trie naturally represents all prefixes. We insert the shortest string into the trie, then query each other string against it. For each string, we walk down the trie as far as characters match, tracking how deep we get. The minimum depth reached across all strings is the length of the longest common prefix.

### Algorithm

1. Find the shortest string and insert it into a Trie (this limits the trie size and ensures we don't go beyond what could be common).
2. Initialize `prefixLen` to the length of the shortest string.
3. For each string, traverse the trie while characters match, updating `prefixLen` to be the minimum of its current value and how far we matched.
4. After checking all strings, extract the first `prefixLen` characters from any string as the result.

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

```go
type TrieNode struct {
    children map[byte]*TrieNode
}

type Trie struct {
    root *TrieNode
}

func NewTrie() *Trie {
    return &Trie{root: &TrieNode{children: make(map[byte]*TrieNode)}}
}

func (t *Trie) Insert(word string) {
    node := t.root
    for i := 0; i < len(word); i++ {
        c := word[i]
        if _, exists := node.children[c]; !exists {
            node.children[c] = &TrieNode{children: make(map[byte]*TrieNode)}
        }
        node = node.children[c]
    }
}

func (t *Trie) Lcp(word string, prefixLen int) int {
    node := t.root
    length := len(word)
    if prefixLen < length {
        length = prefixLen
    }
    for i := 0; i < length; i++ {
        if _, exists := node.children[word[i]]; !exists {
            return i
        }
        node = node.children[word[i]]
    }
    if len(word) < prefixLen {
        return len(word)
    }
    return prefixLen
}

func longestCommonPrefix(strs []string) string {
    if len(strs) == 1 {
        return strs[0]
    }

    mini := 0
    for i := 1; i < len(strs); i++ {
        if len(strs[i]) < len(strs[mini]) {
            mini = i
        }
    }

    trie := NewTrie()
    trie.Insert(strs[mini])
    prefixLen := len(strs[mini])

    for i := 0; i < len(strs); i++ {
        prefixLen = trie.Lcp(strs[i], prefixLen)
    }

    return strs[0][:prefixLen]
}
```

```kotlin
class TrieNode {
    val children = HashMap<Char, TrieNode>()
}

class Trie {
    val root = TrieNode()

    fun insert(word: String) {
        var node = root
        for (c in word) {
            if (!node.children.containsKey(c)) {
                node.children[c] = TrieNode()
            }
            node = node.children[c]!!
        }
    }

    fun lcp(word: String, prefixLen: Int): Int {
        var node = root
        var i = 0
        while (i < minOf(word.length, prefixLen)) {
            if (!node.children.containsKey(word[i])) {
                return i
            }
            node = node.children[word[i]]!!
            i++
        }
        return minOf(word.length, prefixLen)
    }
}

class Solution {
    fun longestCommonPrefix(strs: Array<String>): String {
        if (strs.size == 1) return strs[0]

        var mini = 0
        for (i in 1 until strs.size) {
            if (strs[i].length < strs[mini].length) {
                mini = i
            }
        }

        val trie = Trie()
        trie.insert(strs[mini])
        var prefixLen = strs[mini].length

        for (i in strs.indices) {
            prefixLen = trie.lcp(strs[i], prefixLen)
        }

        return strs[0].substring(0, prefixLen)
    }
}
```

```swift
class TrieNode {
    var children = [Character: TrieNode]()
}

class Trie {
    var root = TrieNode()

    func insert(_ word: String) {
        var node = root
        for c in word {
            if node.children[c] == nil {
                node.children[c] = TrieNode()
            }
            node = node.children[c]!
        }
    }

    func lcp(_ word: String, _ prefixLen: Int) -> Int {
        var node = root
        let chars = Array(word)
        var i = 0
        while i < min(chars.count, prefixLen) {
            if node.children[chars[i]] == nil {
                return i
            }
            node = node.children[chars[i]]!
            i += 1
        }
        return min(chars.count, prefixLen)
    }
}

class Solution {
    func longestCommonPrefix(_ strs: [String]) -> String {
        if strs.count == 1 {
            return strs[0]
        }

        var mini = 0
        for i in 1..<strs.count {
            if strs[i].count < strs[mini].count {
                mini = i
            }
        }

        let trie = Trie()
        trie.insert(strs[mini])
        var prefixLen = strs[mini].count

        for i in 0..<strs.count {
            prefixLen = trie.lcp(strs[i], prefixLen)
        }

        return String(strs[0].prefix(prefixLen))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the shortest string and $m$ is the number of strings.

## Common Pitfalls

### Not Handling Empty Strings in the Array

If any string in the input array is empty, the longest common prefix must be an empty string. Failing to check for this case before accessing characters can lead to index out of bounds errors.

### Accessing Characters Beyond String Length

When comparing characters at a given index, you must ensure the index is valid for all strings being compared. A common mistake is to iterate based on one string's length without checking if shorter strings have characters at that position.
