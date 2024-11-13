## 1. Depth First Search

::tabs-start

```python
class Solution:
    def foreignDictionary(self, words: List[str]) -> str:
        adj = {c: set() for w in words for c in w}

        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            minLen = min(len(w1), len(w2))
            if len(w1) > len(w2) and w1[:minLen] == w2[:minLen]:
                return ""
            for j in range(minLen):
                if w1[j] != w2[j]:
                    adj[w1[j]].add(w2[j])
                    break

        visited = {}
        res = []

        def dfs(char):
            if char in visited:
                return visited[char]

            visited[char] = True

            for neighChar in adj[char]:
                if dfs(neighChar):
                    return True

            visited[char] = False
            res.append(char)

        for char in adj:
            if dfs(char):
                return ""

        res.reverse()
        return "".join(res)
```

```java
public class Solution {
    private Map<Character, Set<Character>> adj;
    private Map<Character, Boolean> visited;
    private List<Character> result;

    public String foreignDictionary(String[] words) {
        adj = new HashMap<>();
        for (String word : words) {
            for (char c : word.toCharArray()) {
                adj.putIfAbsent(c, new HashSet<>());
            }
        }

        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            int minLen = Math.min(w1.length(), w2.length());
            if (w1.length() > w2.length() && 
                w1.substring(0, minLen).equals(w2.substring(0, minLen))) {
                return "";
            }
            for (int j = 0; j < minLen; j++) {
                if (w1.charAt(j) != w2.charAt(j)) {
                    adj.get(w1.charAt(j)).add(w2.charAt(j));
                    break;
                }
            }
        }

        visited = new HashMap<>();
        result = new ArrayList<>();
        for (char c : adj.keySet()) {
            if (dfs(c)) {
                return "";
            }
        }

        Collections.reverse(result);
        StringBuilder sb = new StringBuilder();
        for (char c : result) {
            sb.append(c);
        }
        return sb.toString();
    }

    private boolean dfs(char ch) {
        if (visited.containsKey(ch)) {
            return visited.get(ch);
        }

        visited.put(ch, true);
        for (char next : adj.get(ch)) {
            if (dfs(next)) {
                return true;
            }
        }
        visited.put(ch, false);
        result.add(ch);
        return false;
    }
}
```

```cpp
class Solution {
public:
    unordered_map<char, unordered_set<char>> adj;
    unordered_map<char, bool> visited;
    string result;

    string foreignDictionary(vector<string>& words) {
        for (const auto& word : words) {
            for (char ch : word) {
                adj[ch];
            }
        }

        for (size_t i = 0; i < words.size() - 1; ++i) {
            const string& w1 = words[i], & w2 = words[i + 1];
            size_t minLen = min(w1.length(), w2.length());
            if (w1.length() > w2.length() && 
                w1.substr(0, minLen) == w2.substr(0, minLen)) {
                return "";
            }
            for (size_t j = 0; j < minLen; ++j) {
                if (w1[j] != w2[j]) {
                    adj[w1[j]].insert(w2[j]);
                    break;
                }
            }
        }

        for (const auto& pair : adj) {
            if (dfs(pair.first)) {
                return "";
            }
        }

        reverse(result.begin(), result.end());
        return result;
    }

    bool dfs(char ch) {
        if (visited.find(ch) != visited.end()) {
            return visited[ch];
        }

        visited[ch] = true;
        for (char next : adj[ch]) {
            if (dfs(next)) {
                return true;
            }
        }
        visited[ch] = false;
        result.push_back(ch);
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @returns {string}
     */
    foreignDictionary(words) {
        const adj = {};
        for (const word of words) {
            for (const char of word) {
                adj[char] = new Set();
            }
        }

        for (let i = 0; i < words.length - 1; i++) {
            const w1 = words[i];
            const w2 = words[i + 1];
            const minLen = Math.min(w1.length, w2.length);
            if (w1.length > w2.length && 
                w1.slice(0, minLen) === w2.slice(0, minLen)) {
                return "";
            }
            for (let j = 0; j < minLen; j++) {
                if (w1[j] !== w2[j]) {
                    adj[w1[j]].add(w2[j]);
                    break;
                }
            }
        }

        const visited = {};
        const res = [];

        const dfs = (char) => {
            if (char in visited) return visited[char];
            visited[char] = true;

            for (const neighChar of adj[char]) {
                if (dfs(neighChar)) return true;
            }

            visited[char] = false;
            res.push(char);
            return false;
        };

        for (const char in adj) {
            if (dfs(char)) return "";
        }

        res.reverse();
        return res.join("");
    }
}
```

```csharp
public class Solution {
    private Dictionary<char, HashSet<char>> adj;
    private Dictionary<char, bool> visited;
    private List<char> result;

    public string foreignDictionary(string[] words) {
        adj = new Dictionary<char, HashSet<char>>();
        foreach (var word in words) {
            foreach (var c in word) {
                if (!adj.ContainsKey(c)) {
                    adj[c] = new HashSet<char>();
                }
            }
        }

        for (int i = 0; i < words.Length - 1; i++) {
            var w1 = words[i];
            var w2 = words[i + 1];
            int minLen = Math.Min(w1.Length, w2.Length);
            if (w1.Length > w2.Length && w1.Substring(0, minLen) == w2.Substring(0, minLen)) {
                return "";
            }
            for (int j = 0; j < minLen; j++) {
                if (w1[j] != w2[j]) {
                    adj[w1[j]].Add(w2[j]);
                    break;
                }
            }
        }

        visited = new Dictionary<char, bool>();
        result = new List<char>();
        foreach (var c in adj.Keys) {
            if (dfs(c)) {
                return "";
            }
        }

        result.Reverse();
        var sb = new StringBuilder();
        foreach (var c in result) {
            sb.Append(c);
        }
        return sb.ToString();
    }

    private bool dfs(char ch) {
        if (visited.ContainsKey(ch)) {
            return visited[ch];
        }

        visited[ch] = true;
        foreach (var next in adj[ch]) {
            if (dfs(next)) {
                return true;
            }
        }
        visited[ch] = false;
        result.Add(ch);
        return false;
    }
}
```

```go
func foreignDictionary(words []string) string {
    adj := make(map[rune]map[rune]struct{})
    for _, w := range words {
        for _, c := range w {
            if _, exists := adj[c]; !exists {
                adj[c] = make(map[rune]struct{})
            }
        }
    }

    for i := 0; i < len(words)-1; i++ {
        w1, w2 := words[i], words[i+1]
        minLen := len(w1)
        if len(w2) < minLen {
            minLen = len(w2)
        }
        if len(w1) > len(w2) && w1[:minLen] == w2[:minLen] {
            return ""
        }
        for j := 0; j < minLen; j++ {
            if w1[j] != w2[j] {
                adj[rune(w1[j])][rune(w2[j])] = struct{}{}
                break
            }
        }
    }

    visited := make(map[rune]int)
    var res []rune

    var dfs func(char rune) bool
    dfs = func(char rune) bool {
        if status, exists := visited[char]; exists {
            return status == 1
        }

        visited[char] = 1

        for neighChar := range adj[char] {
            if dfs(neighChar) {
                return true
            }
        }

        visited[char] = -1
        res = append(res, char)
        return false
    }

    for char := range adj {
        if dfs(char) {
            return ""
        }
    }

    var result []byte
    for i := len(res) - 1; i >= 0; i-- {
        result = append(result, byte(res[i]))
    }

    return string(result)
}
```

```kotlin
class Solution {
    fun foreignDictionary(words: Array<String>): String {
        val adj = HashMap<Char, HashSet<Char>>()
        for (w in words) {
            for (c in w) {
                adj.putIfAbsent(c, hashSetOf())
            }
        }

        for (i in 0 until words.size - 1) {
            val w1 = words[i]
            val w2 = words[i + 1]
            val minLen = minOf(w1.length, w2.length)
            if (w1.length > w2.length && 
                w1.substring(0, minLen) == w2.substring(0, minLen)) {
                return ""
            }
            for (j in 0 until minLen) {
                if (w1[j] != w2[j]) {
                    adj[w1[j]]?.add(w2[j])
                    break
                }
            }
        }

        val visited = HashMap<Char, Int>()
        val res = mutableListOf<Char>()

        fun dfs(char: Char): Boolean {
            if (char in visited) {
                return visited[char] == 1
            }

            visited[char] = 1

            for (neighChar in adj[char] ?: emptySet()) {
                if (dfs(neighChar)) {
                    return true
                }
            }

            visited[char] = -1
            res.add(char)
            return false
        }

        for (char in adj.keys) {
            if (dfs(char)) {
                return ""
            }
        }

        return res.reversed().joinToString("")
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(N + V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of unique characters, $E$ is the number of edges and $N$ is the sum of lengths of all the strings.

---

## 2. Topological Sort (Kahn's Algorithm)

::tabs-start

```python
class Solution:
    def foreignDictionary(self, words):
        adj = {c: set() for w in words for c in w}
        indegree = {c: 0 for c in adj}
        
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            minLen = min(len(w1), len(w2))
            if len(w1) > len(w2) and w1[:minLen] == w2[:minLen]:
                return ""
            for j in range(minLen):
                if w1[j] != w2[j]:
                    if w2[j] not in adj[w1[j]]:
                        adj[w1[j]].add(w2[j])
                        indegree[w2[j]] += 1
                    break
        
        q = deque([c for c in indegree if indegree[c] == 0])
        res = []
        
        while q:
            char = q.popleft()
            res.append(char)
            for neighbor in adj[char]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    q.append(neighbor)
        
        if len(res) != len(indegree):
            return ""
        
        return "".join(res)
```

```java
public class Solution {
    public String foreignDictionary(String[] words) {
        Map<Character, Set<Character>> adj = new HashMap<>();
        Map<Character, Integer> indegree = new HashMap<>();
        
        for (String word : words) {
            for (char c : word.toCharArray()) {
                adj.putIfAbsent(c, new HashSet<>());
                indegree.putIfAbsent(c, 0);
            }
        }

        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i];
            String w2 = words[i + 1];
            int minLen = Math.min(w1.length(), w2.length());
            if (w1.length() > w2.length() && 
                w1.substring(0, minLen).equals(w2.substring(0, minLen))) {
                return "";
            }
            for (int j = 0; j < minLen; j++) {
                if (w1.charAt(j) != w2.charAt(j)) {
                    if (!adj.get(w1.charAt(j)).contains(w2.charAt(j))) {
                        adj.get(w1.charAt(j)).add(w2.charAt(j));
                        indegree.put(w2.charAt(j), 
                                     indegree.get(w2.charAt(j)) + 1);
                    }
                    break;
                }
            }
        }

        Queue<Character> q = new LinkedList<>();
        for (char c : indegree.keySet()) {
            if (indegree.get(c) == 0) {
                q.offer(c);
            }
        }

        StringBuilder res = new StringBuilder();
        while (!q.isEmpty()) {
            char char_ = q.poll();
            res.append(char_);
            for (char neighbor : adj.get(char_)) {
                indegree.put(neighbor, indegree.get(neighbor) - 1);
                if (indegree.get(neighbor) == 0) {
                    q.offer(neighbor);
                }
            }
        }

        if (res.length() != indegree.size()) {
            return "";
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string foreignDictionary(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        unordered_map<char, int> indegree;
        for (string w : words) {
            for (char c : w) {
                adj[c] = unordered_set<char>();
                indegree[c] = 0;
            }
        }
        
        for (int i = 0; i < words.size() - 1; i++) {
            string w1 = words[i], w2 = words[i + 1];
            int minLen = min(w1.size(), w2.size());
            if (w1.size() > w2.size() && 
                w1.substr(0, minLen) == w2.substr(0, minLen)) {
                return "";
            }
            for (int j = 0; j < minLen; j++) {
                if (w1[j] != w2[j]) {
                    if (!adj[w1[j]].count(w2[j])) {
                        adj[w1[j]].insert(w2[j]);
                        indegree[w2[j]]++;
                    }
                    break;
                }
            }
        }
        
        queue<char> q;
        for (auto &[c, deg] : indegree) {
            if (deg == 0) {
                q.push(c);
            }
        }
        
        string res;
        while (!q.empty()) {
            char char_ = q.front();
            q.pop();
            res += char_;
            for (char neighbor : adj[char_]) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }
        
        return res.size() == indegree.size() ? res : "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @returns {string}
     */
    foreignDictionary(words) {
        let adj = {};
        let indegree = {};
        for (let w of words) {
            for (let c of w) {
                adj[c] = new Set();
                indegree[c] = 0;
            }
        }
        
        for (let i = 0; i < words.length - 1; i++) {
            let w1 = words[i], w2 = words[i + 1];
            let minLen = Math.min(w1.length, w2.length);
            if (w1.length > w2.length && 
                w1.slice(0, minLen) === w2.slice(0, minLen)) {
                return "";
            }
            for (let j = 0; j < minLen; j++) {
                if (w1[j] !== w2[j]) {
                    if (!adj[w1[j]].has(w2[j])) {
                        adj[w1[j]].add(w2[j]);
                        indegree[w2[j]] += 1;
                    }
                    break;
                }
            }
        }
        
        let q = new Queue();
        for (let c in indegree) {
            if (indegree[c] === 0) {
                q.push(c);
            }
        }
        
        let res = [];
        while (!q.isEmpty()) {
            let char = q.pop();
            res.push(char);
            for (let neighbor of adj[char]) {
                indegree[neighbor] -= 1;
                if (indegree[neighbor] === 0) {
                    q.push(neighbor);
                }
            }
        }
        
        if (res.length !== Object.keys(indegree).length) {
            return "";
        }
        
        return res.join("");
    }
}
```

```csharp
public class Solution {
    public string foreignDictionary(string[] words) {
        var adj = new Dictionary<char, HashSet<char>>();
        var indegree = new Dictionary<char, int>();

        foreach (var word in words) {
            foreach (var c in word) {
                if (!adj.ContainsKey(c)) {
                    adj[c] = new HashSet<char>();
                }
                if (!indegree.ContainsKey(c)) {
                    indegree[c] = 0;
                }
            }
        }

        for (int i = 0; i < words.Length - 1; i++) {
            var w1 = words[i];
            var w2 = words[i + 1];
            int minLen = Math.Min(w1.Length, w2.Length);
            if (w1.Length > w2.Length && 
                w1.Substring(0, minLen) == w2.Substring(0, minLen)) {
                return "";
            }
            for (int j = 0; j < minLen; j++) {
                if (w1[j] != w2[j]) {
                    if (!adj[w1[j]].Contains(w2[j])) {
                        adj[w1[j]].Add(w2[j]);
                        indegree[w2[j]]++;
                    }
                    break;
                }
            }
        }

        var q = new Queue<char>();
        foreach (var c in indegree.Keys) {
            if (indegree[c] == 0) {
                q.Enqueue(c);
            }
        }

        var res = new StringBuilder();
        while (q.Count > 0) {
            var char_ = q.Dequeue();
            res.Append(char_);
            foreach (var neighbor in adj[char_]) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    q.Enqueue(neighbor);
                }
            }
        }

        if (res.Length != indegree.Count) {
            return "";
        }

        return res.ToString();
    }
}
```

```go
func foreignDictionary(words []string) string {
    adj := make(map[byte]map[byte]struct{})
    indegree := make(map[byte]int)
    
    for _, word := range words {
        for i := 0; i < len(word); i++ {
            char := word[i]
            if _, exists := adj[char]; !exists {
                adj[char] = make(map[byte]struct{})
            }
            indegree[char] = 0
        }
    }
    
    for i := 0; i < len(words)-1; i++ {
        w1, w2 := words[i], words[i+1]
        minLen := len(w1)
        if len(w2) < minLen {
            minLen = len(w2)
        }
        
        if len(w1) > len(w2) && w1[:minLen] == w2[:minLen] {
            return ""
        }
        
        for j := 0; j < minLen; j++ {
            if w1[j] != w2[j] {
                if _, exists := adj[w1[j]][w2[j]]; !exists {
                    adj[w1[j]][w2[j]] = struct{}{}
                    indegree[w2[j]]++
                }
                break
            }
        }
    }
    
    q := []byte{}
    for char := range indegree {
        if indegree[char] == 0 {
            q = append(q, char)
        }
    }
    
    res := []byte{}
    for len(q) > 0 {
        char := q[0]
        q = q[1:]
        res = append(res, char)
        
        for neighbor := range adj[char] {
            indegree[neighbor]--
            if indegree[neighbor] == 0 {
                q = append(q, neighbor)
            }
        }
    }
    
    if len(res) != len(indegree) {
        return ""
    }
    
    return string(res)
}
```

```kotlin
class Solution {
    fun foreignDictionary(words: Array<String>): String {
        val adj = HashMap<Char, HashSet<Char>>()
        val indegree = HashMap<Char, Int>()
        
        for (word in words) {
            for (c in word) {
                adj.computeIfAbsent(c) { hashSetOf() }
                indegree[c] = 0
            }
        }
        
        for (i in 0 until words.size - 1) {
            val w1 = words[i]
            val w2 = words[i + 1]
            val minLen = minOf(w1.length, w2.length)
            
            if (w1.length > w2.length && 
                w1.substring(0, minLen) == w2.substring(0, minLen)) {
                return ""
            }
            
            for (j in 0 until minLen) {
                if (w1[j] != w2[j]) {
                    if (w2[j] !in adj[w1[j]]!!) {
                        adj[w1[j]]!!.add(w2[j])
                        indegree[w2[j]] = indegree[w2[j]]!! + 1
                    }
                    break
                }
            }
        }
        
        val q: Queue<Char> = LinkedList()
        for ((char, degree) in indegree) {
            if (degree == 0) {
                q.add(char)
            }
        }
        
        val res = StringBuilder()
        while (q.isNotEmpty()) {
            val char = q.poll()
            res.append(char)
            
            for (neighbor in adj[char]!!) {
                indegree[neighbor] = indegree[neighbor]!! - 1
                if (indegree[neighbor] == 0) {
                    q.add(neighbor)
                }
            }
        }
        
        return if (res.length != indegree.size) "" else res.toString()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(N + V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of unique characters, $E$ is the number of edges and $N$ is the sum of lengths of all the strings.