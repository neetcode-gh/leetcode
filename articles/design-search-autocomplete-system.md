## 1. Trie

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
        this.sentences = new Map(); // Map<string, number>
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
