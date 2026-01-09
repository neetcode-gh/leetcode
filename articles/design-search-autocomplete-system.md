## 1. Trie

### Intuition
Autocomplete works by finding sentences that share a common prefix with what the user has typed so far. A trie is ideal for prefix-based lookups. We build a trie where each node stores all sentences that pass through it along with their frequencies. As the user types, we walk down the trie character by character. At any node, we have direct access to all matching sentences and can sort them by frequency (highest first) and then alphabetically to return the top 3 results.

### Algorithm
1. **Initialization:** Build a trie from the given sentences. For each character in a sentence, create a trie node if needed and store the full sentence with its count at every node along the path. Track the current input, the current trie node, and a dead node for invalid prefixes.
2. **input(c):** If `c` is `#`, add the completed sentence to the trie, reset the current sentence and node, and return an empty list.
3. Otherwise, append `c` to the current sentence. If `c` is not a child of the current node, move to the dead node and return an empty list.
4. Move to the child node for `c`. Retrieve all sentences stored at this node, sort them by frequency descending and then alphabetically, and return the top `3`.
5. **addToTrie(sentence, count):** Walk through each character in the sentence, creating nodes as needed. At each node, increment the sentence's count.

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.sentences = defaultdict(int)

class AutocompleteSystem:
    def __init__(self, sentences: List[str], times: List[int]):
        self.root = TrieNode()
        for sentence, count in zip(sentences, times):
            self.add_to_trie(sentence, count)
            
        self.curr_sentence = []
        self.curr_node = self.root
        self.dead = TrieNode()
        
    def input(self, c: str) -> List[str]:
        if c == "#":
            curr_sentence = "".join(self.curr_sentence)
            self.add_to_trie(curr_sentence, 1)
            self.curr_sentence = []
            self.curr_node = self.root
            return []
        
        self.curr_sentence.append(c)
        if c not in self.curr_node.children:
            self.curr_node = self.dead
            return []
        
        self.curr_node = self.curr_node.children[c]
        sentences = self.curr_node.sentences
        sorted_sentences = sorted(sentences.items(), key = lambda x: (-x[1], x[0]))
        
        ans = []
        for i in range(min(3, len(sorted_sentences))):
            ans.append(sorted_sentences[i][0])
        
        return ans

    def add_to_trie(self, sentence, count):
        node = self.root
        for c in sentence:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
            node.sentences[sentence] += count
```

```java
class TrieNode {
    Map<Character, TrieNode> children;
    Map<String, Integer> sentences;
    public TrieNode() {
        children = new HashMap<>();
        sentences = new HashMap<>();
    }
}

class AutocompleteSystem {
    TrieNode root;
    TrieNode currNode;
    TrieNode dead;
    StringBuilder currSentence;

    public AutocompleteSystem(String[] sentences, int[] times) {
        root = new TrieNode();
        for (int i = 0; i < sentences.length; i++) {
            addToTrie(sentences[i], times[i]);
        }

        currSentence = new StringBuilder();
        currNode = root;
        dead = new TrieNode();
    }

    public List<String> input(char c) {
        if (c == '#') {
            addToTrie(currSentence.toString(), 1);
            currSentence.setLength(0);
            currNode = root;
            return new ArrayList<String>();
        }

        currSentence.append(c);
        if (!currNode.children.containsKey(c)) {
            currNode = dead;
            return new ArrayList<String>();
        }

        currNode = currNode.children.get(c);
        List<String> sentences = new ArrayList<>(currNode.sentences.keySet());
        Collections.sort(sentences, (a, b) -> {
            int hotA = currNode.sentences.get(a);
            int hotB = currNode.sentences.get(b);
            if (hotA == hotB) {
                return a.compareTo(b);
            }

            return hotB - hotA;
        });

        List<String> ans = new ArrayList<>();
        for (int i = 0; i < Math.min(3, sentences.size()); i++) {
            ans.add(sentences.get(i));
        }

        return ans;
    }

    private void addToTrie(String sentence, int count) {
        TrieNode node = root;
        for (char c: sentence.toCharArray()) {
            if (!node.children.containsKey(c)) {
                node.children.put(c, new TrieNode());
            }

            node = node.children.get(c);
            node.sentences.put(sentence, node.sentences.getOrDefault(sentence, 0) + count);
        }
    }
}
```

```cpp
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    unordered_map<string, int> sentences;
};

class AutocompleteSystem {
private:
    TrieNode* root;
    TrieNode* currNode;
    TrieNode* dead;
    string currSentence;

    void addToTrie(const string& sentence, int count) {
        TrieNode* node = root;
        for (char c : sentence) {
            if (node->children.find(c) == node->children.end()) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
            node->sentences[sentence] += count;
        }
    }

public:
    AutocompleteSystem(vector<string>& sentences, vector<int>& times) {
        root = new TrieNode();
        dead = new TrieNode();
        currNode = root;
        currSentence = "";

        for (int i = 0; i < sentences.size(); i++) {
            addToTrie(sentences[i], times[i]);
        }
    }

    vector<string> input(char c) {
        if (c == '#') {
            addToTrie(currSentence, 1);
            currSentence = "";
            currNode = root;
            return {};
        }

        currSentence += c;
        if (currNode->children.find(c) == currNode->children.end()) {
            currNode = dead;
            return {};
        }

        currNode = currNode->children[c];
        vector<pair<int, string>> items;
        for (const auto& [sentence, count] : currNode->sentences) {
            items.push_back({-count, sentence});
        }

        sort(items.begin(), items.end());

        vector<string> ans;
        for (int i = 0; i < min(3, (int)items.size()); i++) {
            ans.push_back(items[i].second);
        }
        return ans;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.sentences = new Map();
    }
}

class AutocompleteSystem {
    /**
     * @param {string[]} sentences
     * @param {number[]} times
     */
    constructor(sentences, times) {
        this.root = new TrieNode();
        for (let i = 0; i < sentences.length; i++) {
            this.addToTrie(sentences[i], times[i]);
        }
        this.currSentence = [];
        this.currNode = this.root;
        this.dead = new TrieNode();
    }

    /**
     * @param {character} c
     * @return {string[]}
     */
    input(c) {
        if (c === "#") {
            const currSentenceStr = this.currSentence.join("");
            this.addToTrie(currSentenceStr, 1);
            this.currSentence = [];
            this.currNode = this.root;
            return [];
        }

        this.currSentence.push(c);
        if (!this.currNode.children.has(c)) {
            this.currNode = this.dead;
            return [];
        }

        this.currNode = this.currNode.children.get(c);
        const items = [];
        for (const [sentence, count] of this.currNode.sentences) {
            items.push([sentence, count]);
        }

        items.sort((a, b) => {
            if (a[1] !== b[1]) return b[1] - a[1];
            return a[0].localeCompare(b[0]);
        });

        const ans = [];
        for (let i = 0; i < Math.min(3, items.length); i++) {
            ans.push(items[i][0]);
        }
        return ans;
    }

    addToTrie(sentence, count) {
        let node = this.root;
        for (const c of sentence) {
            if (!node.children.has(c)) {
                node.children.set(c, new TrieNode());
            }
            node = node.children.get(c);
            node.sentences.set(sentence, (node.sentences.get(sentence) || 0) + count);
        }
    }
}
```

```csharp
public class TrieNode {
    public Dictionary<char, TrieNode> Children = new Dictionary<char, TrieNode>();
    public Dictionary<string, int> Sentences = new Dictionary<string, int>();
}

public class AutocompleteSystem {
    private TrieNode root;
    private TrieNode currNode;
    private TrieNode dead;
    private StringBuilder currSentence;

    public AutocompleteSystem(string[] sentences, int[] times) {
        root = new TrieNode();
        dead = new TrieNode();
        currNode = root;
        currSentence = new StringBuilder();

        for (int i = 0; i < sentences.Length; i++) {
            AddToTrie(sentences[i], times[i]);
        }
    }

    public IList<string> Input(char c) {
        if (c == '#') {
            AddToTrie(currSentence.ToString(), 1);
            currSentence.Clear();
            currNode = root;
            return new List<string>();
        }

        currSentence.Append(c);
        if (!currNode.Children.ContainsKey(c)) {
            currNode = dead;
            return new List<string>();
        }

        currNode = currNode.Children[c];
        var sorted = currNode.Sentences
            .OrderByDescending(x => x.Value)
            .ThenBy(x => x.Key)
            .Take(3)
            .Select(x => x.Key)
            .ToList();

        return sorted;
    }

    private void AddToTrie(string sentence, int count) {
        TrieNode node = root;
        foreach (char c in sentence) {
            if (!node.Children.ContainsKey(c)) {
                node.Children[c] = new TrieNode();
            }
            node = node.Children[c];
            if (!node.Sentences.ContainsKey(sentence)) {
                node.Sentences[sentence] = 0;
            }
            node.Sentences[sentence] += count;
        }
    }
}
```

```go
type TrieNode struct {
    children  map[rune]*TrieNode
    sentences map[string]int
}

func NewTrieNode() *TrieNode {
    return &TrieNode{
        children:  make(map[rune]*TrieNode),
        sentences: make(map[string]int),
    }
}

type AutocompleteSystem struct {
    root         *TrieNode
    currNode     *TrieNode
    dead         *TrieNode
    currSentence []rune
}

func Constructor(sentences []string, times []int) AutocompleteSystem {
    sys := AutocompleteSystem{
        root:         NewTrieNode(),
        dead:         NewTrieNode(),
        currSentence: []rune{},
    }
    sys.currNode = sys.root
    for i, sentence := range sentences {
        sys.addToTrie(sentence, times[i])
    }
    return sys
}

func (this *AutocompleteSystem) Input(c byte) []string {
    if c == '#' {
        this.addToTrie(string(this.currSentence), 1)
        this.currSentence = []rune{}
        this.currNode = this.root
        return []string{}
    }

    this.currSentence = append(this.currSentence, rune(c))
    if _, exists := this.currNode.children[rune(c)]; !exists {
        this.currNode = this.dead
        return []string{}
    }

    this.currNode = this.currNode.children[rune(c)]
    type pair struct {
        sentence string
        count    int
    }
    items := []pair{}
    for sentence, count := range this.currNode.sentences {
        items = append(items, pair{sentence, count})
    }

    sort.Slice(items, func(i, j int) bool {
        if items[i].count != items[j].count {
            return items[i].count > items[j].count
        }
        return items[i].sentence < items[j].sentence
    })

    ans := []string{}
    for i := 0; i < len(items) && i < 3; i++ {
        ans = append(ans, items[i].sentence)
    }
    return ans
}

func (this *AutocompleteSystem) addToTrie(sentence string, count int) {
    node := this.root
    for _, c := range sentence {
        if _, exists := node.children[c]; !exists {
            node.children[c] = NewTrieNode()
        }
        node = node.children[c]
        node.sentences[sentence] += count
    }
}
```

```kotlin
class TrieNode {
    val children = mutableMapOf<Char, TrieNode>()
    val sentences = mutableMapOf<String, Int>()
}

class AutocompleteSystem(sentences: Array<String>, times: IntArray) {
    private val root = TrieNode()
    private var currNode = root
    private val dead = TrieNode()
    private val currSentence = StringBuilder()

    init {
        for (i in sentences.indices) {
            addToTrie(sentences[i], times[i])
        }
    }

    fun input(c: Char): List<String> {
        if (c == '#') {
            addToTrie(currSentence.toString(), 1)
            currSentence.clear()
            currNode = root
            return emptyList()
        }

        currSentence.append(c)
        if (c !in currNode.children) {
            currNode = dead
            return emptyList()
        }

        currNode = currNode.children[c]!!
        return currNode.sentences.entries
            .sortedWith(compareByDescending<Map.Entry<String, Int>> { it.value }
                .thenBy { it.key })
            .take(3)
            .map { it.key }
    }

    private fun addToTrie(sentence: String, count: Int) {
        var node = root
        for (c in sentence) {
            if (c !in node.children) {
                node.children[c] = TrieNode()
            }
            node = node.children[c]!!
            node.sentences[sentence] = node.sentences.getOrDefault(sentence, 0) + count
        }
    }
}
```

```swift
class TrieNode {
    var children: [Character: TrieNode] = [:]
    var sentences: [String: Int] = [:]
}

class AutocompleteSystem {
    private let root = TrieNode()
    private var currNode: TrieNode
    private let dead = TrieNode()
    private var currSentence = ""

    init(_ sentences: [String], _ times: [Int]) {
        currNode = root
        for i in 0..<sentences.count {
            addToTrie(sentences[i], times[i])
        }
    }

    func input(_ c: Character) -> [String] {
        if c == "#" {
            addToTrie(currSentence, 1)
            currSentence = ""
            currNode = root
            return []
        }

        currSentence.append(c)
        guard let next = currNode.children[c] else {
            currNode = dead
            return []
        }

        currNode = next
        let sorted = currNode.sentences.sorted { a, b in
            if a.value != b.value {
                return a.value > b.value
            }
            return a.key < b.key
        }

        return Array(sorted.prefix(3).map { $0.key })
    }

    private func addToTrie(_ sentence: String, _ count: Int) {
        var node = root
        for c in sentence {
            if node.children[c] == nil {
                node.children[c] = TrieNode()
            }
            node = node.children[c]!
            node.sentences[sentence, default: 0] += count
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot k + m \cdot (n + \frac{m}{k}) \cdot \log(n + \frac{m}{k}))$

  `constructor`:
  - We initialize the trie, which costs $O(n \cdot k)$ as we iterate over each character in each sentence.

  `input`:
  - We add a character to `currSentence` and the trie, both cost $O(1)$. Next, we fetch and sort the sentences in the current node. Initially, a node could hold $O(n)$ sentences. After we call `input` $m$ times, we could add $\frac{m}{k}$ new sentences. Overall, there could be up to $O(n + \frac{m}{k})$ sentences, so a sort would cost $O((n + \frac{m}{k}) \cdot \log(n + \frac{m}{k}))$.
  - The work done in the other cases (like adding a new sentence to the trie) will be dominated by this sort.
  - `input` is called $m$ times, which gives us a total of $O(m \cdot (n + \frac{m}{k}) \cdot \log(n + \frac{m}{k}))$

- Space complexity: $O(k \cdot (n \cdot k + m))$

>  Where $n$ is the length of `sentences`, $k$ is the average length of all sentences, and $m$ is the number of times `input` is called.

---

## 2. Optimize with Heap

### Intuition
Sorting all matching sentences every time is expensive when there are many matches. Since we only need the top 3 results, we can use a heap to find them more efficiently. By building a min-heap of size 3, we process each sentence once and keep only the best candidates. In languages with linear-time heapify (like Python's `heapq.nsmallest`), this gives a performance boost over full sorting.

### Algorithm
1. **Initialization:** Same as before: build the trie with sentence counts at each node. Store counts as negative values so that a min-heap naturally gives us the highest frequencies.
2. **input(c):** If `c` is `#`, add the completed sentence to the trie, reset state, and return empty.
3. Otherwise, append `c` and navigate the trie. If the character does not exist, go to the dead node and return empty.
4. At the current node, use a heap to find the top `3` sentences. With negative counts, the smallest values represent the highest frequencies. Extract up to `3` items and return them.
5. **addToTrie(sentence, count):** Walk through each character, creating nodes as needed. Subtract (rather than add) the count so that smaller numeric values indicate higher popularity.

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.sentences = defaultdict(int)

class AutocompleteSystem:
    def __init__(self, sentences: List[str], times: List[int]):
        self.root = TrieNode()
        for sentence, count in zip(sentences, times):
            self.add_to_trie(sentence, count)
            
        self.curr_sentence = []
        self.curr_node = self.root
        self.dead = TrieNode()
        
    def input(self, c: str) -> List[str]:
        if c == "#":
            curr_sentence = "".join(self.curr_sentence)
            self.add_to_trie(curr_sentence, 1)
            self.curr_sentence = []
            self.curr_node = self.root
            return []
        
        self.curr_sentence.append(c)
        if c not in self.curr_node.children:
            self.curr_node = self.dead
            return []
        
        self.curr_node = self.curr_node.children[c]
        items = [(val, key) for key, val in self.curr_node.sentences.items()]
        ans = heapq.nsmallest(3, items)
        return [item[1] for item in ans]

    def add_to_trie(self, sentence, count):
        node = self.root
        for c in sentence:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
            node.sentences[sentence] -= count
```

```java
class TrieNode {
    Map<Character, TrieNode> children;
    Map<String, Integer> sentences;
    public TrieNode() {
        children = new HashMap<>();
        sentences = new HashMap<>();
    }
}

class AutocompleteSystem {
    TrieNode root;
    TrieNode currNode;
    TrieNode dead;
    StringBuilder currSentence;
    
    public AutocompleteSystem(String[] sentences, int[] times) {
        root = new TrieNode();
        for (int i = 0; i < sentences.length; i++) {
            addToTrie(sentences[i], times[i]);
        }
        
        currSentence = new StringBuilder();
        currNode = root;
        dead = new TrieNode();
    }
    
    public List<String> input(char c) {
        if (c == '#') {
            addToTrie(currSentence.toString(), 1);
            currSentence.setLength(0);
            currNode = root;
            return new ArrayList<String>();
        }
        
        currSentence.append(c);
        if (!currNode.children.containsKey(c)) {
            currNode = dead;
            return new ArrayList<String>();
        }
        
        currNode = currNode.children.get(c);
        PriorityQueue<String> heap = new PriorityQueue<>((a, b) -> {
            int hotA = currNode.sentences.get(a);
            int hotB = currNode.sentences.get(b);
            if (hotA == hotB) {
                return b.compareTo(a);
            }
            
            return hotA - hotB;
        });
        
        for (String sentence: currNode.sentences.keySet()) {
            heap.add(sentence);
            if (heap.size() > 3) {
                heap.remove();
            }
        }
        
        List<String> ans = new ArrayList<>();
        while (!heap.isEmpty()) {
            ans.add(heap.remove());
        }
        
        Collections.reverse(ans);
        return ans;
    }
    
    private void addToTrie(String sentence, int count) {
        TrieNode node = root;
        for (char c: sentence.toCharArray()) {
            if (!node.children.containsKey(c)) {
                node.children.put(c, new TrieNode());
            }
            
            node = node.children.get(c);
            node.sentences.put(sentence, node.sentences.getOrDefault(sentence, 0) + count);
        }
    }
}
```

```cpp
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    unordered_map<string, int> sentences;
    
    TrieNode() {}
};

class AutocompleteSystem {
private:
    TrieNode* root;
    TrieNode* currNode;
    TrieNode* dead;
    string currSentence;
    
    void addToTrie(const string& sentence, int count) {
        TrieNode* node = root;
        for (char c : sentence) {
            if (node->children.find(c) == node->children.end()) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
            node->sentences[sentence] -= count;
        }
    }
    
public:
    AutocompleteSystem(vector<string>& sentences, vector<int>& times) {
        root = new TrieNode();
        dead = new TrieNode();
        currNode = root;
        currSentence = "";
        
        for (int i = 0; i < sentences.size(); i++) {
            addToTrie(sentences[i], times[i]);
        }
    }
    
    vector<string> input(char c) {
        if (c == '#') {
            addToTrie(currSentence, 1);
            currSentence = "";
            currNode = root;
            return {};
        }
        
        currSentence += c;
        if (currNode->children.find(c) == currNode->children.end()) {
            currNode = dead;
            return {};
        }
        
        currNode = currNode->children[c];
        
        vector<pair<int, string>> items;
        for (const auto& [sentence, count] : currNode->sentences) {
            items.push_back({count, sentence});
        }
        
        // O(n log n) sort instead of O(n) heapify - main performance difference from Python
        sort(items.begin(), items.end(), [](const pair<int, string>& a, const pair<int, string>& b) {
            if (a.first != b.first) return a.first < b.first;
            return a.second < b.second;
        });
        
        vector<string> ans;
        for (int i = 0; i < min(3, (int)items.size()); i++) {
            ans.push_back(items[i].second);
        }
        return ans;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.sentences = new Map();
    }
}

class AutocompleteSystem {
    /**
     * @param {string[]} sentences
     * @param {number[]} times
     */
    constructor(sentences, times) {
        this.root = new TrieNode();
        for (let i = 0; i < sentences.length; i++) {
            this.addToTrie(sentences[i], times[i]);
        }
        this.currSentence = [];
        this.currNode = this.root;
        this.dead = new TrieNode();
    }

    /**
     * @param {character} c
     * @return {string[]}
     */
    input(c) {
        if (c === "#") {
            const currSentenceStr = this.currSentence.join("");
            this.addToTrie(currSentenceStr, 1);
            this.currSentence = [];
            this.currNode = this.root;
            return [];
        }

        this.currSentence.push(c);
        if (!this.currNode.children.has(c)) {
            this.currNode = this.dead;
            return [];
        }

        this.currNode = this.currNode.children.get(c);

        const items = [];
        for (const [sentence, count] of this.currNode.sentences) {
            items.push({ sentence, count });
        }

        // Using @datastructures-js/priority-queue
        const pq = new PriorityQueue((a, b) => {
            if (a.count !== b.count) {
                return a.count - b.count;
            }
            return a.sentence.localeCompare(b.sentence);
        }, items);

        const ans = [];
        while (ans.length < 3 && !pq.isEmpty()) {
            ans.push(pq.dequeue().sentence);
        }

        return ans;
    }

    addToTrie(sentence, count) {
        let node = this.root;
        for (const c of sentence) {
            if (!node.children.has(c)) {
                node.children.set(c, new TrieNode());
            }
            node = node.children.get(c);
            node.sentences.set(sentence, (node.sentences.get(sentence) || 0) - count);
        }
    }
}
```

```csharp
public class TrieNode {
    public Dictionary<char, TrieNode> Children = new Dictionary<char, TrieNode>();
    public Dictionary<string, int> Sentences = new Dictionary<string, int>();
}

public class AutocompleteSystem {
    private TrieNode root;
    private TrieNode currNode;
    private TrieNode dead;
    private StringBuilder currSentence;

    public AutocompleteSystem(string[] sentences, int[] times) {
        root = new TrieNode();
        dead = new TrieNode();
        currNode = root;
        currSentence = new StringBuilder();

        for (int i = 0; i < sentences.Length; i++) {
            AddToTrie(sentences[i], times[i]);
        }
    }

    public IList<string> Input(char c) {
        if (c == '#') {
            AddToTrie(currSentence.ToString(), 1);
            currSentence.Clear();
            currNode = root;
            return new List<string>();
        }

        currSentence.Append(c);
        if (!currNode.Children.ContainsKey(c)) {
            currNode = dead;
            return new List<string>();
        }

        currNode = currNode.Children[c];

        var pq = new SortedSet<(int count, string sentence)>(
            Comparer<(int count, string sentence)>.Create((a, b) => {
                if (a.count != b.count) return a.count.CompareTo(b.count);
                return b.sentence.CompareTo(a.sentence);
            })
        );

        foreach (var kvp in currNode.Sentences) {
            pq.Add((-kvp.Value, kvp.Key));
            if (pq.Count > 3) {
                pq.Remove(pq.Max);
            }
        }

        var result = pq.Select(x => x.sentence).Reverse().ToList();
        return result;
    }

    private void AddToTrie(string sentence, int count) {
        TrieNode node = root;
        foreach (char c in sentence) {
            if (!node.Children.ContainsKey(c)) {
                node.Children[c] = new TrieNode();
            }
            node = node.Children[c];
            if (!node.Sentences.ContainsKey(sentence)) {
                node.Sentences[sentence] = 0;
            }
            node.Sentences[sentence] += count;
        }
    }
}
```

```go
type TrieNode struct {
    children  map[rune]*TrieNode
    sentences map[string]int
}

func NewTrieNode() *TrieNode {
    return &TrieNode{
        children:  make(map[rune]*TrieNode),
        sentences: make(map[string]int),
    }
}

type AutocompleteSystem struct {
    root         *TrieNode
    currNode     *TrieNode
    dead         *TrieNode
    currSentence []rune
}

func Constructor(sentences []string, times []int) AutocompleteSystem {
    sys := AutocompleteSystem{
        root:         NewTrieNode(),
        dead:         NewTrieNode(),
        currSentence: []rune{},
    }
    sys.currNode = sys.root
    for i, sentence := range sentences {
        sys.addToTrie(sentence, times[i])
    }
    return sys
}

func (this *AutocompleteSystem) Input(c byte) []string {
    if c == '#' {
        this.addToTrie(string(this.currSentence), 1)
        this.currSentence = []rune{}
        this.currNode = this.root
        return []string{}
    }

    this.currSentence = append(this.currSentence, rune(c))
    if _, exists := this.currNode.children[rune(c)]; !exists {
        this.currNode = this.dead
        return []string{}
    }

    this.currNode = this.currNode.children[rune(c)]

    type pair struct {
        sentence string
        count    int
    }

    h := &minHeap{}
    heap.Init(h)

    for sentence, count := range this.currNode.sentences {
        heap.Push(h, pair{sentence, -count})
        if h.Len() > 3 {
            heap.Pop(h)
        }
    }

    ans := make([]string, h.Len())
    for i := len(ans) - 1; i >= 0; i-- {
        ans[i] = heap.Pop(h).(pair).sentence
    }
    return ans
}

func (this *AutocompleteSystem) addToTrie(sentence string, count int) {
    node := this.root
    for _, c := range sentence {
        if _, exists := node.children[c]; !exists {
            node.children[c] = NewTrieNode()
        }
        node = node.children[c]
        node.sentences[sentence] += count
    }
}

type minHeap []struct {
    sentence string
    count    int
}

func (h minHeap) Len() int { return len(h) }
func (h minHeap) Less(i, j int) bool {
    if h[i].count != h[j].count {
        return h[i].count > h[j].count
    }
    return h[i].sentence < h[j].sentence
}
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.(struct{ sentence string; count int })) }
func (h *minHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class TrieNode {
    val children = mutableMapOf<Char, TrieNode>()
    val sentences = mutableMapOf<String, Int>()
}

class AutocompleteSystem(sentences: Array<String>, times: IntArray) {
    private val root = TrieNode()
    private var currNode = root
    private val dead = TrieNode()
    private val currSentence = StringBuilder()

    init {
        for (i in sentences.indices) {
            addToTrie(sentences[i], times[i])
        }
    }

    fun input(c: Char): List<String> {
        if (c == '#') {
            addToTrie(currSentence.toString(), 1)
            currSentence.clear()
            currNode = root
            return emptyList()
        }

        currSentence.append(c)
        if (c !in currNode.children) {
            currNode = dead
            return emptyList()
        }

        currNode = currNode.children[c]!!

        val pq = java.util.PriorityQueue<Pair<String, Int>> { a, b ->
            if (a.second != b.second) a.second - b.second
            else b.first.compareTo(a.first)
        }

        for ((sentence, count) in currNode.sentences) {
            pq.offer(Pair(sentence, -count))
            if (pq.size > 3) {
                pq.poll()
            }
        }

        val result = mutableListOf<String>()
        while (pq.isNotEmpty()) {
            result.add(pq.poll().first)
        }
        return result.reversed()
    }

    private fun addToTrie(sentence: String, count: Int) {
        var node = root
        for (c in sentence) {
            if (c !in node.children) {
                node.children[c] = TrieNode()
            }
            node = node.children[c]!!
            node.sentences[sentence] = node.sentences.getOrDefault(sentence, 0) + count
        }
    }
}
```

```swift
class TrieNode {
    var children: [Character: TrieNode] = [:]
    var sentences: [String: Int] = [:]
}

class AutocompleteSystem {
    private let root = TrieNode()
    private var currNode: TrieNode
    private let dead = TrieNode()
    private var currSentence = ""

    init(_ sentences: [String], _ times: [Int]) {
        currNode = root
        for i in 0..<sentences.count {
            addToTrie(sentences[i], times[i])
        }
    }

    func input(_ c: Character) -> [String] {
        if c == "#" {
            addToTrie(currSentence, 1)
            currSentence = ""
            currNode = root
            return []
        }

        currSentence.append(c)
        guard let next = currNode.children[c] else {
            currNode = dead
            return []
        }

        currNode = next

        var items = currNode.sentences.map { ($0.key, -$0.value) }
        items.sort { a, b in
            if a.1 != b.1 {
                return a.1 < b.1
            }
            return a.0 < b.0
        }

        return Array(items.prefix(3).map { $0.0 })
    }

    private func addToTrie(_ sentence: String, _ count: Int) {
        var node = root
        for c in sentence {
            if node.children[c] == nil {
                node.children[c] = TrieNode()
            }
            node = node.children[c]!
            node.sentences[sentence, default: 0] += count
        }
    }
}
```

::tabs-end

### Time & Space Complexity

> This analysis will assume that you have access to a linear time heapify method, like in the Python implementation.

- Time complexity: $O(n \cdot k + m \cdot (n + \frac{m}{k}))$

  `constructor`:
  - We initialize the trie, which costs $O(n \cdot k)$ as we iterate over each character in each sentence.

  `input`:
  - We add a character to `currSentence` and the trie, both cost $O(1)$. Next, we fetch the sentences in the current node. Initially, a node could hold $O(n)$ sentences. After we call `input` $m$ times, we could add $\frac{m}{k}$ new sentences. Overall, there could be up to $O(n + \frac{m}{k})$ sentences. We heapify these sentences and find the best 3 in linear time, which costs $O(n + \frac{m}{k})$.
  - The work done in the other cases (like adding a new sentence to the trie) will be dominated by this.
  - `input` is called $m$ times, which gives us a total of $O(m \cdot (n + \frac{m}{k}))$.

- Space complexity: $O(k \cdot (n \cdot k + m))$

>  Where $n$ is the length of `sentences`, $k$ is the average length of all sentences, and $m$ is the number of times `input` is called.
