## 1. Breadth First Search - I

::tabs-start

```python
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        if (endWord not in wordList) or (beginWord == endWord):
            return 0
        
        n, m = len(wordList), len(wordList[0])
        adj = [[] for _ in range(n)]
        mp = {}
        for i in range(n):
            mp[wordList[i]] = i

        for i in range(n):
            for j in range(i + 1, n):
                cnt = 0
                for k in range(m):
                    if wordList[i][k] != wordList[j][k]:
                        cnt += 1
                if cnt == 1:
                    adj[i].append(j)
                    adj[j].append(i)
        
        q, res = deque(), 1
        visit = set()
        for i in range(m):
            for c in range(97, 123):
                if chr(c) == beginWord[i]:
                    continue
                word = beginWord[:i] + chr(c) + beginWord[i + 1:]
                if word in mp and mp[word] not in visit:
                    q.append(mp[word])
                    visit.add(mp[word])
        
        while q:
            res += 1
            for i in range(len(q)):
                node = q.popleft()
                if wordList[node] == endWord:
                    return res
                for nei in adj[node]:
                    if nei not in visit:
                        visit.add(nei)
                        q.append(nei)
            
        return 0
```

```java
public class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        if (!wordList.contains(endWord) || beginWord.equals(endWord)) {
            return 0;
        }
        
        int n = wordList.size();
        int m = wordList.get(0).length();
        List<List<Integer>> adj = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        
        Map<String, Integer> mp = new HashMap<>();
        for (int i = 0; i < n; i++) {
            mp.put(wordList.get(i), i);
        }

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int cnt = 0;
                for (int k = 0; k < m; k++) {
                    if (wordList.get(i).charAt(k) != wordList.get(j).charAt(k)) {
                        cnt++;
                    }
                }
                if (cnt == 1) {
                    adj.get(i).add(j);
                    adj.get(j).add(i);
                }
            }
        }

        Queue<Integer> q = new LinkedList<>();
        int res = 1;
        Set<Integer> visit = new HashSet<>();
        
        for (int i = 0; i < m; i++) {
            for (char c = 'a'; c <= 'z'; c++) {
                if (c == beginWord.charAt(i)) {
                    continue;
                }
                String word = beginWord.substring(0, i) + c + beginWord.substring(i + 1);
                if (mp.containsKey(word) && !visit.contains(mp.get(word))) {
                    q.add(mp.get(word));
                    visit.add(mp.get(word));
                }
            }
        }

        while (!q.isEmpty()) {
            res++;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int node = q.poll();
                if (wordList.get(node).equals(endWord)) {
                    return res;
                }
                for (int nei : adj.get(node)) {
                    if (!visit.contains(nei)) {
                        visit.add(nei);
                        q.add(nei);
                    }
                }
            }
        }
        
        return 0;
    }
}
```

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        if (find(wordList.begin(), wordList.end(), endWord) == wordList.end() || 
            beginWord == endWord) {
            return 0;
        }
        
        int n = wordList.size();
        int m = wordList[0].size();
        vector<vector<int>> adj(n);
        unordered_map<string, int> mp;
        for (int i = 0; i < n; i++) {
            mp[wordList[i]] = i;
        }

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int cnt = 0;
                for (int k = 0; k < m; k++) {
                    if (wordList[i][k] != wordList[j][k]) {
                        cnt++;
                    }
                }
                if (cnt == 1) {
                    adj[i].push_back(j);
                    adj[j].push_back(i);
                }
            }
        }

        queue<int> q;
        int res = 1;
        unordered_set<int> visit;
        
        for (int i = 0; i < m; i++) {
            for (char c = 'a'; c <= 'z'; c++) {
                if (c == beginWord[i]) {
                    continue;
                }
                string word = beginWord.substr(0, i) + c + beginWord.substr(i + 1);
                if (mp.find(word) != mp.end() && visit.find(mp[word]) == visit.end()) {
                    q.push(mp[word]);
                    visit.insert(mp[word]);
                }
            }
        }

        while (!q.empty()) {
            res++;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int node = q.front();
                q.pop();
                if (wordList[node] == endWord) {
                    return res;
                }
                for (int nei : adj[node]) {
                    if (visit.find(nei) == visit.end()) {
                        visit.insert(nei);
                        q.push(nei);
                    }
                }
            }
        }
        
        return 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} beginWord
     * @param {string} endWord
     * @param {string[]} wordList
     * @return {number}
     */
    ladderLength(beginWord, endWord, wordList) {
        if (!wordList.includes(endWord) || 
            beginWord === endWord) {
            return 0;
        }

        const n = wordList.length;
        const m = wordList[0].length;
        const adj = Array.from({ length: n }, () => []);
        const mp = new Map();
        
        for (let i = 0; i < n; i++) {
            mp.set(wordList[i], i);
        }

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                let cnt = 0;
                for (let k = 0; k < m; k++) {
                    if (wordList[i][k] !== wordList[j][k]) {
                        cnt++;
                    }
                }
                if (cnt === 1) {
                    adj[i].push(j);
                    adj[j].push(i);
                }
            }
        }

        const q = new Queue();
        let res = 1;
        const visit = new Set();

        for (let i = 0; i < m; i++) {
            for (let c = 97; c < 123; c++) {
                if (String.fromCharCode(c) === beginWord[i]) {
                    continue;
                }
                const word = beginWord.slice(0, i) + 
                             String.fromCharCode(c) + beginWord.slice(i + 1);
                if (mp.has(word) && !visit.has(mp.get(word))) {
                    q.push(mp.get(word));
                    visit.add(mp.get(word));
                }
            }
        }

        while (!q.isEmpty()) {
            res++;
            let size = q.size();
            for (let i = 0; i < size; i++) {
                let node = q.pop();
                if (wordList[node] === endWord) {
                    return res;
                }
                for (let nei of adj[node]) {
                    if (!visit.has(nei)) {
                        visit.add(nei);
                        q.push(nei);
                    }
                }
            }
        }
        
        return 0;
    }
}
```

```csharp
public class Solution {
    public int LadderLength(string beginWord, string endWord, IList<string> wordList) {
        if (!wordList.Contains(endWord) || beginWord == endWord) {
            return 0;
        }
        
        int n = wordList.Count;
        int m = wordList[0].Length;
        List<List<int>> adj = new List<List<int>>(n);
        for (int i = 0; i < n; i++) {
            adj.Add(new List<int>());
        }
        
        Dictionary<string, int> mp = new Dictionary<string, int>();
        for (int i = 0; i < n; i++) {
            mp[wordList[i]] = i;
        }

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int cnt = 0;
                for (int k = 0; k < m; k++) {
                    if (wordList[i][k] != wordList[j][k]) {
                        cnt++;
                    }
                }
                if (cnt == 1) {
                    adj[i].Add(j);
                    adj[j].Add(i);
                }
            }
        }

        Queue<int> q = new Queue<int>();
        int res = 1;
        HashSet<int> visit = new HashSet<int>();
        
        for (int i = 0; i < m; i++) {
            for (char c = 'a'; c <= 'z'; c++) {
                if (c == beginWord[i]) {
                    continue;
                }
                string word = beginWord.Substring(0, i) + c + 
                              beginWord.Substring(i + 1);
                if (mp.ContainsKey(word) && !visit.Contains(mp[word])) {
                    q.Enqueue(mp[word]);
                    visit.Add(mp[word]);
                }
            }
        }

        while (q.Count > 0) {
            res++;
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                int node = q.Dequeue();
                if (wordList[node] == endWord) {
                    return res;
                }
                foreach (int nei in adj[node]) {
                    if (!visit.Contains(nei)) {
                        visit.Add(nei);
                        q.Enqueue(nei);
                    }
                }
            }
        }
        
        return 0;
    }
}
```

```go
func ladderLength(beginWord string, endWord string, wordList []string) int {
    if !contains(wordList, endWord) || beginWord == endWord {
        return 0
    }

    n, m := len(wordList), len(wordList[0])
    adj := make([][]int, n)
    mp := make(map[string]int)

    for i := 0; i < n; i++ {
        mp[wordList[i]] = i
    }

    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            cnt := 0
            for k := 0; k < m; k++ {
                if wordList[i][k] != wordList[j][k] {
                    cnt++
                }
            }
            if cnt == 1 {
                adj[i] = append(adj[i], j)
                adj[j] = append(adj[j], i)
            }
        }
    }

    q := []int{}
    res := 1
    visit := make(map[int]bool)

    for i := 0; i < m; i++ {
        for c := 'a'; c <= 'z'; c++ {
            if rune(beginWord[i]) == c {
                continue
            }
            word := beginWord[:i] + string(c) + beginWord[i+1:]
            if idx, exists := mp[word]; exists && !visit[idx] {
                q = append(q, idx)
                visit[idx] = true
            }
        }
    }

    for len(q) > 0 {
        res++
        size := len(q)
        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]
            if wordList[node] == endWord {
                return res
            }
            for _, nei := range adj[node] {
                if !visit[nei] {
                    visit[nei] = true
                    q = append(q, nei)
                }
            }
        }
    }
    return 0
}

func contains(wordList []string, word string) bool {
    for _, w := range wordList {
        if w == word {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun ladderLength(beginWord: String, endWord: String, wordList: List<String>): Int {
        if (!wordList.contains(endWord) || beginWord == endWord) {
            return 0
        }

        val n = wordList.size
        val m = wordList[0].length
        val adj = Array(n) { mutableListOf<Int>() }
        val mp = HashMap<String, Int>()

        for (i in 0 until n) {
            mp[wordList[i]] = i
        }

        for (i in 0 until n) {
            for (j in i + 1 until n) {
                var cnt = 0
                for (k in 0 until m) {
                    if (wordList[i][k] != wordList[j][k]) {
                        cnt++
                    }
                }
                if (cnt == 1) {
                    adj[i].add(j)
                    adj[j].add(i)
                }
            }
        }

        val q = ArrayDeque<Int>()
        var res = 1
        val visit = HashSet<Int>()

        for (i in 0 until m) {
            for (c in 'a'..'z') {
                if (beginWord[i] == c) {
                    continue
                }
                val word = beginWord.substring(0, i) + c + beginWord.substring(i + 1)
                mp[word]?.let { idx ->
                    if (!visit.contains(idx)) {
                        q.add(idx)
                        visit.add(idx)
                    }
                }
            }
        }

        while (q.isNotEmpty()) {
            res++
            repeat(q.size) {
                val node = q.removeFirst()
                if (wordList[node] == endWord) {
                    return res
                }
                for (nei in adj[node]) {
                    if (!visit.contains(nei)) {
                        visit.add(nei)
                        q.add(nei)
                    }
                }
            }
        }
        return 0
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 * m)$
* Space complexity: $O(n ^ 2)$

> Where $n$ is the number of words and $m$ is the length of the word.

---

## 2. Breadth First Search - II

::tabs-start

```python
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        if (endWord not in wordList) or (beginWord == endWord):
            return 0
        words, res = set(wordList), 0
        q = deque([beginWord])
        while q:
            res += 1
            for _ in range(len(q)):
                node = q.popleft()
                if node == endWord:
                    return res
                for i in range(len(node)):
                    for c in range(97, 123):
                        if chr(c) == node[i]:
                            continue
                        nei = node[:i] + chr(c) + node[i + 1:]
                        if nei in words:
                            q.append(nei)
                            words.remove(nei)
        return 0
```

```java
public class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        if (!wordList.contains(endWord) || beginWord.equals(endWord)) return 0;
        Set<String> words = new HashSet<>(wordList);
        int res = 0;
        Queue<String> q = new LinkedList<>();
        q.offer(beginWord);
        
        while (!q.isEmpty()) {
            res++;
            for (int i = q.size(); i > 0; i--) {
                String node = q.poll();
                if (node.equals(endWord)) return res;
                for (int j = 0; j < node.length(); j++) {
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == node.charAt(j)) continue;
                        String nei = node.substring(0, j) + c + node.substring(j + 1);
                        if (words.contains(nei)) {
                            q.offer(nei);
                            words.remove(nei);
                        }
                    }
                }
            }
        }
        return 0;
    }
}
```

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> words(wordList.begin(), wordList.end());
        if (words.find(endWord) == words.end() || beginWord == endWord) return 0;
        int res = 0;
        queue<string> q;
        q.push(beginWord);
        
        while (!q.empty()) {
            res++;
            int len = q.size();
            for (int i = 0; i < len; i++) {
                string node = q.front();
                q.pop();
                if (node == endWord) return res;
                for (int j = 0; j < node.length(); j++) {
                    char original = node[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        node[j] = c;
                        if (words.find(node) != words.end()) {
                            q.push(node);
                            words.erase(node);
                        }
                    }
                    node[j] = original;
                }
            }
        }
        return 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} beginWord
     * @param {string} endWord
     * @param {string[]} wordList
     * @return {number}
     */
    ladderLength(beginWord, endWord, wordList) {
        const words = new Set(wordList);
        if (!words.has(endWord) || beginWord === endWord) {
            return 0;
        }
        let res = 0;
        const q = new Queue([beginWord]);
        
        while (!q.isEmpty()) {
            res++;
            let len = q.size();
            for (let i = 0; i < len; i++) {
                const node = q.pop();
                if (node === endWord) return res;
                for (let j = 0; j < node.length; j++) {
                    for (let c = 97; c < 123; c++) {
                        if (String.fromCharCode(c) === node[j]) {
                            continue;
                        }
                        const nei = node.slice(0, j) + 
                                    String.fromCharCode(c) + 
                                    node.slice(j + 1);
                        if (words.has(nei)) {
                            q.push(nei);
                            words.delete(nei);
                        }
                    }
                }
            }
        }
        return 0;
    }
}
```

```csharp
public class Solution {
    public int LadderLength(string beginWord, string endWord, IList<string> wordList) {
        var words = new HashSet<string>(wordList);
        if (!words.Contains(endWord) || beginWord == endWord) return 0;
        int res = 0;
        var q = new Queue<string>();
        q.Enqueue(beginWord);
        
        while (q.Count > 0) {
            res++;
            int len = q.Count;
            for (int i = 0; i < len; i++) {
                string node = q.Dequeue();
                if (node == endWord) return res;
                char[] arr = node.ToCharArray();
                for (int j = 0; j < arr.Length; j++) {
                    char original = arr[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        arr[j] = c;
                        string nei = new string(arr);
                        if (words.Contains(nei)) {
                            q.Enqueue(nei);
                            words.Remove(nei);
                        }
                    }
                    arr[j] = original;
                }
            }
        }
        return 0;
    }
}
```

```go
func ladderLength(beginWord string, endWord string, wordList []string) int {
    if !contains(wordList, endWord) || beginWord == endWord {
        return 0
    }

    words := make(map[string]bool)
    for _, word := range wordList {
        words[word] = true
    }

    res := 0
    q := []string{beginWord}

    for len(q) > 0 {
        res++
        size := len(q)
        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]
            
            if node == endWord {
                return res
            }

            for i := 0; i < len(node); i++ {
                for c := 'a'; c <= 'z'; c++ {
                    if rune(node[i]) == c {
                        continue
                    }
                    nei := node[:i] + string(c) + node[i+1:]
                    if words[nei] {
                        q = append(q, nei)
                        delete(words, nei)
                    }
                }
            }
        }
    }
    return 0
}

func contains(wordList []string, word string) bool {
    for _, w := range wordList {
        if w == word {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun ladderLength(beginWord: String, endWord: String, wordList: List<String>): Int {
        if (!wordList.contains(endWord) || beginWord == endWord) {
            return 0
        }

        val words = wordList.toMutableSet()
        var res = 0
        val q = ArrayDeque<String>().apply { add(beginWord) }

        while (q.isNotEmpty()) {
            res++
            repeat(q.size) {
                val node = q.removeFirst()
                
                if (node == endWord) {
                    return res
                }

                for (i in node.indices) {
                    for (c in 'a'..'z') {
                        if (node[i] == c) {
                            continue
                        }
                        val nei = node.substring(0, i) + c + node.substring(i + 1)
                        if (words.remove(nei)) {
                            q.add(nei)
                        }
                    }
                }
            }
        }
        return 0
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m ^ 2 * n)$
* Space complexity: $O(m ^ 2 * n)$

> Where $n$ is the number of words and $m$ is the length of the word.

---

## 3. Breadth First Search - III

::tabs-start

```python
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        if endWord not in wordList:
            return 0

        nei = collections.defaultdict(list)
        wordList.append(beginWord)
        for word in wordList:
            for j in range(len(word)):
                pattern = word[:j] + "*" + word[j + 1 :]
                nei[pattern].append(word)

        visit = set([beginWord])
        q = deque([beginWord])
        res = 1
        while q:
            for i in range(len(q)):
                word = q.popleft()
                if word == endWord:
                    return res
                for j in range(len(word)):
                    pattern = word[:j] + "*" + word[j + 1 :]
                    for neiWord in nei[pattern]:
                        if neiWord not in visit:
                            visit.add(neiWord)
                            q.append(neiWord)
            res += 1
        return 0
```

```java
public class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        if (!wordList.contains(endWord)) {
            return 0;
        }

        Map<String, List<String>> nei = new HashMap<>();
        wordList.add(beginWord);
        for (String word : wordList) {
            for (int j = 0; j < word.length(); j++) {
                String pattern = word.substring(0, j) + "*" + word.substring(j + 1);
                nei.computeIfAbsent(pattern, k -> new ArrayList<>()).add(word);
            }
        }

        Set<String> visit = new HashSet<>();
        Queue<String> q = new LinkedList<>();
        q.offer(beginWord);
        int res = 1;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                String word = q.poll();
                if (word.equals(endWord)) {
                    return res;
                }
                for (int j = 0; j < word.length(); j++) {
                    String pattern = word.substring(0, j) + "*" + word.substring(j + 1);
                    for (String neiWord : nei.getOrDefault(pattern, Collections.emptyList())) {
                        if (!visit.contains(neiWord)) {
                            visit.add(neiWord);
                            q.offer(neiWord);
                        }
                    }
                }
            }
            res++;
        }
        return 0;
    }
}
```

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        if (endWord.empty() || find(wordList.begin(), wordList.end(), endWord) == wordList.end()) {
            return 0;
        }

        unordered_map<string, vector<string>> nei;
        wordList.push_back(beginWord);
        for (const string& word : wordList) {
            for (int j = 0; j < word.size(); ++j) {
                string pattern = word.substr(0, j) + "*" + word.substr(j + 1);
                nei[pattern].push_back(word);
            }
        }

        unordered_set<string> visit{beginWord};
        queue<string> q;
        q.push(beginWord);
        int res = 1;
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; ++i) {
                string word = q.front();
                q.pop();
                if (word == endWord) {
                    return res;
                }
                for (int j = 0; j < word.size(); ++j) {
                    string pattern = word.substr(0, j) + "*" + word.substr(j + 1);
                    for (const string& neiWord : nei[pattern]) {
                        if (visit.find(neiWord) == visit.end()) {
                            visit.insert(neiWord);
                            q.push(neiWord);
                        }
                    }
                }
            }
            ++res;
        }
        return 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} beginWord
     * @param {string} endWord
     * @param {string[]} wordList
     * @return {number}
     */
    ladderLength(beginWord, endWord, wordList) {
        if (!wordList.includes(endWord)) {
            return 0;
        }

        const nei = {};
        wordList.push(beginWord);
        for (const word of wordList) {
            for (let j = 0; j < word.length; ++j) {
                const pattern = word.substring(0, j) + 
                                '*' + word.substring(j + 1);
                if (!nei[pattern]) {
                    nei[pattern] = [];
                }
                nei[pattern].push(word);
            }
        }

        const visit = new Set([beginWord]);
        const q =new Queue([beginWord]);
        let res = 1;
        while (!q.isEmpty()) {
            const size = q.size();
            for (let i = 0; i < size; ++i) {
                const word = q.pop();
                if (word === endWord) {
                    return res;
                }
                for (let j = 0; j < word.length; ++j) {
                    const pattern = word.substring(0, j) + 
                                    '*' + word.substring(j + 1);
                    for (const neiWord of nei[pattern]) {
                        if (!visit.has(neiWord)) {
                            visit.add(neiWord);
                            q.push(neiWord);
                        }
                    }
                }
            }
            ++res;
        }
        return 0;
    }
}
```

```csharp
public class Solution {
    public int LadderLength(string beginWord, string endWord, IList<string> wordList) {
        if (!wordList.Contains(endWord)) {
            return 0;
        }

        Dictionary<string, List<string>> nei = new Dictionary<string, List<string>>();
        wordList.Add(beginWord);
        foreach (string word in wordList) {
            for (int j = 0; j < word.Length; j++) {
                string pattern = word.Substring(0, j) + 
                                 "*" + word.Substring(j + 1);
                if (!nei.ContainsKey(pattern)) {
                    nei[pattern] = new List<string>();
                }
                nei[pattern].Add(word);
            }
        }

        HashSet<string> visit = new HashSet<string>();
        Queue<string> q = new Queue<string>();
        q.Enqueue(beginWord);
        int res = 1;
        while (q.Count > 0) {
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                string word = q.Dequeue();
                if (word == endWord) {
                    return res;
                }
                for (int j = 0; j < word.Length; j++) {
                    string pattern = word.Substring(0, j) + 
                                     "*" + word.Substring(j + 1);
                    if (nei.ContainsKey(pattern)) {
                        foreach (string neiWord in nei[pattern]) {
                            if (!visit.Contains(neiWord)) {
                                visit.Add(neiWord);
                                q.Enqueue(neiWord);
                            }
                        }
                    }
                }
            }
            res++;
        }
        return 0;
    }
}
```

```go
func ladderLength(beginWord string, endWord string, wordList []string) int {
    if !contains(wordList, endWord) {
        return 0
    }

    nei := make(map[string][]string)
    wordList = append(wordList, beginWord)

    for _, word := range wordList {
        for j := 0; j < len(word); j++ {
            pattern := word[:j] + "*" + word[j+1:]
            nei[pattern] = append(nei[pattern], word)
        }
    }

    visit := make(map[string]bool)
    visit[beginWord] = true
    q := []string{beginWord}
    res := 1

    for len(q) > 0 {
        for i := len(q); i > 0; i-- {
            word := q[0]
            q = q[1:]
            
            if word == endWord {
                return res
            }

            for j := 0; j < len(word); j++ {
                pattern := word[:j] + "*" + word[j+1:]
                for _, neiWord := range nei[pattern] {
                    if !visit[neiWord] {
                        visit[neiWord] = true
                        q = append(q, neiWord)
                    }
                }
            }
        }
        res++
    }
    return 0
}

func contains(wordList []string, word string) bool {
    for _, w := range wordList {
        if w == word {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun ladderLength(beginWord: String, endWord: String, wordList: List<String>): Int {
        if (!wordList.contains(endWord)) {
            return 0
        }

        val nei = HashMap<String, MutableList<String>>().withDefault { mutableListOf() }
        val allWords = wordList.toMutableList().apply { add(beginWord) }

        for (word in allWords) {
            for (j in word.indices) {
                val pattern = word.substring(0, j) + "*" + word.substring(j + 1)
                nei[pattern] = nei.getValue(pattern).apply { add(word) }
            }
        }

        val visit = hashSetOf(beginWord)
        val q = ArrayDeque<String>().apply { add(beginWord) }
        var res = 1

        while (q.isNotEmpty()) {
            repeat(q.size) {
                val word = q.removeFirst()
                
                if (word == endWord) {
                    return res
                }

                for (j in word.indices) {
                    val pattern = word.substring(0, j) + "*" + word.substring(j + 1)
                    for (neiWord in nei.getValue(pattern)) {
                        if (visit.add(neiWord)) {
                            q.add(neiWord)
                        }
                    }
                }
            }
            res++
        }
        return 0
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m ^ 2 * n)$
* Space complexity: $O(m ^ 2 * n)$

> Where $n$ is the number of words and $m$ is the length of the word.

---

## 4. Meet In The Middle (BFS)

::tabs-start

```python
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        if endWord not in wordList or beginWord == endWord:
            return 0
        m = len(wordList[0])
        wordSet = set(wordList)
        qb, qe = deque([beginWord]), deque([endWord])
        fromBegin, fromEnd = {beginWord: 1}, {endWord: 1}
        
        while qb and qe:
            if len(qb) > len(qe):
                qb, qe = qe, qb
                fromBegin, fromEnd = fromEnd, fromBegin
            for _ in range(len(qb)):
                word = qb.popleft()
                steps = fromBegin[word]
                for i in range(m):
                    for c in range(97, 123):
                        if chr(c) == word[i]:
                            continue
                        nei = word[:i] + chr(c) + word[i + 1:]
                        if nei not in wordSet:
                            continue
                        if nei in fromEnd:
                            return steps + fromEnd[nei]
                        if nei not in fromBegin:
                            fromBegin[nei] = steps + 1
                            qb.append(nei)
        return 0
```

```java
public class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        if (!wordList.contains(endWord) || beginWord.equals(endWord))
            return 0;
        int m = wordList.get(0).length();
        Set<String> wordSet = new HashSet<>(wordList);
        Queue<String> qb = new LinkedList<>(), qe = new LinkedList<>();
        Map<String, Integer> fromBegin = new HashMap<>();
        Map<String, Integer> fromEnd = new HashMap<>();
        qb.add(beginWord);
        qe.add(endWord);
        fromBegin.put(beginWord, 1);
        fromEnd.put(endWord, 1);
        
        while (!qb.isEmpty() && !qe.isEmpty()) {
            if (qb.size() > qe.size()) {
                Queue<String> tempQ = qb;
                qb = qe;
                qe = tempQ;
                Map<String, Integer> tempMap = fromBegin;
                fromBegin = fromEnd;
                fromEnd = tempMap;
            }
            int size = qb.size();
            for (int k = 0; k < size; k++) {
                String word = qb.poll();
                int steps = fromBegin.get(word);
                for (int i = 0; i < m; i++) {
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == word.charAt(i))
                            continue;
                        String nei = word.substring(0, i) + 
                                     c + word.substring(i + 1);
                        if (!wordSet.contains(nei))
                            continue;
                        if (fromEnd.containsKey(nei))
                            return steps + fromEnd.get(nei);
                        if (!fromBegin.containsKey(nei)) {
                            fromBegin.put(nei, steps + 1);
                            qb.add(nei);
                        }
                    }
                }
            }
        }
        return 0;
    }
}
```

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        if (find(wordList.begin(), wordList.end(), endWord) == wordList.end() || 
            beginWord == endWord)
            return 0;
        int m = wordList[0].size();
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        queue<string> qb, qe;
        unordered_map<string, int> fromBegin, fromEnd;
        qb.push(beginWord);
        qe.push(endWord);
        fromBegin[beginWord] = 1;
        fromEnd[endWord] = 1;
        
        while (!qb.empty() && !qe.empty()) {
            if (qb.size() > qe.size()) {
                swap(qb, qe);
                swap(fromBegin, fromEnd);
            }
            int size = qb.size();
            for (int k = 0; k < size; k++) {
                string word = qb.front();
                qb.pop();
                int steps = fromBegin[word];
                for (int i = 0; i < m; i++) {
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == word[i])
                            continue;
                        string nei = word.substr(0, i) + 
                                     c + word.substr(i + 1);
                        if (!wordSet.count(nei))
                            continue;
                        if (fromEnd.count(nei))
                            return steps + fromEnd[nei];
                        if (!fromBegin.count(nei)) {
                            fromBegin[nei] = steps + 1;
                            qb.push(nei);
                        }
                    }
                }
            }
        }
        return 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} beginWord
     * @param {string} endWord
     * @param {string[]} wordList
     * @return {number}
     */
    ladderLength(beginWord, endWord, wordList) {
        if (!wordList.includes(endWord) || 
            beginWord === endWord) {
            return 0;
        }
        const m = wordList[0].length;
        const wordSet = new Set(wordList);
        let qb = new Queue([beginWord]);
        let qe = new Queue([endWord]);
        let fromBegin = { [beginWord]: 1 };
        let fromEnd = { [endWord]: 1 };

        while (!qb.isEmpty() && !qe.isEmpty()) {
            if (qb.size() > qe.size()) {
                [qb, qe] = [qe, qb];
                [fromBegin, fromEnd] = [fromEnd, fromBegin];
            }
            const size = qb.size();
            for (let k = 0; k < size; k++) {
                const word = qb.pop();
                const steps = fromBegin[word];
                for (let i = 0; i < m; i++) {
                    for (let c = 97; c <= 122; c++) {
                        if (String.fromCharCode(c) === word[i])
                            continue;
                        const nei = word.slice(0, i) + 
                                    String.fromCharCode(c) + 
                                    word.slice(i + 1);
                        if (!wordSet.has(nei))
                            continue;
                        if (fromEnd[nei] !== undefined)
                            return steps + fromEnd[nei];
                        if (fromBegin[nei] === undefined) {
                            fromBegin[nei] = steps + 1;
                            qb.push(nei);
                        }
                    }
                }
            }
        }
        return 0;
    }
}
```

```csharp
public class Solution {
    public int LadderLength(string beginWord, string endWord, IList<string> wordList) {
        if (!wordList.Contains(endWord) || beginWord == endWord)
            return 0;
        int m = wordList[0].Length;
        HashSet<string> wordSet = new HashSet<string>(wordList);
        Queue<string> qb = new Queue<string>(), qe = new Queue<string>();
        Dictionary<string, int> fromBegin = new Dictionary<string, int>(), 
                                fromEnd = new Dictionary<string, int>();
        qb.Enqueue(beginWord);
        qe.Enqueue(endWord);
        fromBegin[beginWord] = 1;
        fromEnd[endWord] = 1;
        
        while (qb.Count > 0 && qe.Count > 0) {
            if (qb.Count > qe.Count) {
                var tempQ = qb;
                qb = qe;
                qe = tempQ;
                var tempMap = fromBegin;
                fromBegin = fromEnd;
                fromEnd = tempMap;
            }
            int size = qb.Count;
            for (int k = 0; k < size; k++) {
                string word = qb.Dequeue();
                int steps = fromBegin[word];
                for (int i = 0; i < m; i++) {
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == word[i])
                            continue;
                        string nei = word.Substring(0, i) + 
                                     c + word.Substring(i + 1);
                        if (!wordSet.Contains(nei))
                            continue;
                        if (fromEnd.ContainsKey(nei))
                            return steps + fromEnd[nei];
                        if (!fromBegin.ContainsKey(nei)) {
                            fromBegin[nei] = steps + 1;
                            qb.Enqueue(nei);
                        }
                    }
                }
            }
        }
        return 0;
    }
}
```

```go
func ladderLength(beginWord string, endWord string, wordList []string) int {
    if len(wordList) == 0 || len(beginWord) != len(wordList[0]) {
        return 0
    }
    
    wordSet := make(map[string]bool)
    for _, word := range wordList {
        wordSet[word] = true
    }
    
    if !wordSet[endWord] || beginWord == endWord {
        return 0
    }
    
    m := len(beginWord)
    qb := []string{beginWord}
    qe := []string{endWord}
    fromBegin := map[string]int{beginWord: 1}
    fromEnd := map[string]int{endWord: 1}
    
    for len(qb) > 0 && len(qe) > 0 {
        if len(qb) > len(qe) {
            qb, qe = qe, qb
            fromBegin, fromEnd = fromEnd, fromBegin
        }
        
        size := len(qb)
        for i := 0; i < size; i++ {
            word := qb[0]
            qb = qb[1:]
            steps := fromBegin[word]
            
            wordBytes := []byte(word)
            for j := 0; j < m; j++ {
                orig := wordBytes[j]
                for c := byte('a'); c <= byte('z'); c++ {
                    if c == orig {
                        continue
                    }
                    wordBytes[j] = c
                    nei := string(wordBytes)
                    
                    if !wordSet[nei] {
                        continue
                    }
                    if val, exists := fromEnd[nei]; exists {
                        return steps + val
                    }
                    if _, exists := fromBegin[nei]; !exists {
                        fromBegin[nei] = steps + 1
                        qb = append(qb, nei)
                    }
                }
                wordBytes[j] = orig
            }
        }
    }
    return 0
}
```

```kotlin
class Solution {
    fun ladderLength(beginWord: String, endWord: String, wordList: List<String>): Int {
        if (!wordList.contains(endWord) || beginWord == endWord) {
            return 0
        }
        
        val m = wordList[0].length
        val wordSet = wordList.toSet()
        val qb = ArrayDeque<String>().apply { add(beginWord) }
        val qe = ArrayDeque<String>().apply { add(endWord) }
        val fromBegin = hashMapOf(beginWord to 1)
        val fromEnd = hashMapOf(endWord to 1)
        
        while (qb.isNotEmpty() && qe.isNotEmpty()) {
            if (qb.size > qe.size) {
                qb.swap(qe)
                fromBegin.swap(fromEnd)
            }
            
            repeat(qb.size) {
                val word = qb.removeFirst()
                val steps = fromBegin[word]!!
                
                for (i in 0 until m) {
                    for (c in 'a'..'z') {
                        if (c == word[i]) continue
                        val nei = word.substring(0, i) + c + word.substring(i + 1)
                        
                        if (!wordSet.contains(nei)) continue
                        fromEnd[nei]?.let { return steps + it }
                        if (nei !in fromBegin) {
                            fromBegin[nei] = steps + 1
                            qb.add(nei)
                        }
                    }
                }
            }
        }
        return 0
    }
    
    private fun <T> ArrayDeque<T>.swap(other: ArrayDeque<T>) {
        val temp = ArrayDeque(this)
        this.clear()
        this.addAll(other)
        other.clear()
        other.addAll(temp)
    }
    
    private fun <K, V> HashMap<K, V>.swap(other: HashMap<K, V>) {
        val temp = HashMap<K, V>()
        temp.putAll(this)
        this.clear()
        this.putAll(other)
        other.clear()
        other.putAll(temp)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m ^ 2 * n)$
* Space complexity: $O(m ^ 2 * n)$

> Where $n$ is the number of words and $m$ is the length of the word.