## 1. Backtracking (Recursion)

### Intuition

We need to find any binary string of length `n` that is not in the given array. Since there are `2^n` possible strings but only `n` strings in the input, at least one must be missing. We can systematically try building strings character by character, checking at each complete string whether it exists in the set.

### Algorithm

1. Store all input strings in a hash set for O(1) lookup.
2. Use backtracking starting with a string of all zeros.
3. At position `i`:
   - If `i == n`, check if the current string is in the set. If not, return it.
   - Try keeping position `i` as `'0'` and recurse.
   - If that fails, change position `i` to `'1'` and recurse.
4. Return the first string not found in the set.

::tabs-start

```python
class Solution:
    def findDifferentBinaryString(self, nums: List[str]) -> str:
        strSet = {s for s in nums}

        def backtrack(i, cur):
            if i == len(nums):
                res = "".join(cur)
                return None if res in strSet else res

            res = backtrack(i + 1, cur)
            if res: return res

            cur[i] = "1"
            return backtrack(i + 1, cur)

        return backtrack(0, ["0" for _ in nums])
```

```java
public class Solution {
    public String findDifferentBinaryString(String[] nums) {
        Set<String> strSet = new HashSet<>();
        for (String s : nums) {
            strSet.add(s);
        }
        return backtrack(0, new char[nums.length], strSet, nums.length);
    }

    private String backtrack(int i, char[] cur, Set<String> strSet, int n) {
        if (i == n) {
            String res = new String(cur);
            return strSet.contains(res) ? null : res;
        }

        cur[i] = '0';
        String res = backtrack(i + 1, cur, strSet, n);
        if (res != null) return res;

        cur[i] = '1';
        return backtrack(i + 1, cur, strSet, n);
    }
}
```

```cpp
class Solution {
public:
    string findDifferentBinaryString(vector<string>& nums) {
        unordered_set<string> strSet(nums.begin(), nums.end());
        string cur(nums.size(), '0');
        return backtrack(0, cur, strSet, nums.size());
    }

private:
    string backtrack(int i, string& cur, unordered_set<string>& strSet, int n) {
        if (i == n) {
            return strSet.count(cur) ? "" : cur;
        }

        string res = backtrack(i + 1, cur, strSet, n);
        if (!res.empty()) return res;

        cur[i] = '1';
        return backtrack(i + 1, cur, strSet, n);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} nums
     * @return {string}
     */
    findDifferentBinaryString(nums) {
        const strSet = new Set(nums);
        const n = nums.length;

        const backtrack = (i, cur) => {
            if (i === n) {
                const res = cur.join('');
                return strSet.has(res) ? null : res;
            }

            let res = backtrack(i + 1, cur);
            if (res) return res;

            cur[i] = '1';
            return backtrack(i + 1, cur);
        };

        return backtrack(0, Array(n).fill('0'));
    }
}
```

```csharp
public class Solution {
    public string FindDifferentBinaryString(string[] nums) {
        HashSet<string> strSet = new HashSet<string>(nums);
        return Backtrack(0, new char[nums.Length], strSet, nums.Length);
    }

    private string Backtrack(int i, char[] cur, HashSet<string> strSet, int n) {
        if (i == n) {
            string res = new string(cur);
            return strSet.Contains(res) ? null : res;
        }

        cur[i] = '0';
        string result = Backtrack(i + 1, cur, strSet, n);
        if (result != null) return result;

        cur[i] = '1';
        return Backtrack(i + 1, cur, strSet, n);
    }
}
```

```go
func findDifferentBinaryString(nums []string) string {
    strSet := make(map[string]bool)
    for _, s := range nums {
        strSet[s] = true
    }
    n := len(nums)
    cur := make([]byte, n)
    for i := range cur {
        cur[i] = '0'
    }

    var backtrack func(i int) string
    backtrack = func(i int) string {
        if i == n {
            res := string(cur)
            if !strSet[res] {
                return res
            }
            return ""
        }

        res := backtrack(i + 1)
        if res != "" {
            return res
        }

        cur[i] = '1'
        return backtrack(i + 1)
    }

    return backtrack(0)
}
```

```kotlin
class Solution {
    fun findDifferentBinaryString(nums: Array<String>): String {
        val strSet = nums.toHashSet()
        val n = nums.size

        fun backtrack(i: Int, cur: CharArray): String? {
            if (i == n) {
                val res = String(cur)
                return if (res in strSet) null else res
            }

            cur[i] = '0'
            val res = backtrack(i + 1, cur)
            if (res != null) return res

            cur[i] = '1'
            return backtrack(i + 1, cur)
        }

        return backtrack(0, CharArray(n) { '0' })!!
    }
}
```

```swift
class Solution {
    func findDifferentBinaryString(_ nums: [String]) -> String {
        let strSet = Set(nums)
        let n = nums.count
        var cur = [Character](repeating: "0", count: n)

        func backtrack(_ i: Int) -> String? {
            if i == n {
                let res = String(cur)
                return strSet.contains(res) ? nil : res
            }

            cur[i] = "0"
            if let res = backtrack(i + 1) {
                return res
            }

            cur[i] = "1"
            return backtrack(i + 1)
        }

        return backtrack(0)!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Backtracking (Iteration)

### Intuition

Instead of recursive backtracking, we can iterate through all possible binary strings from 0 to n (we only need n+1 candidates since there are n input strings). Convert each number to its binary representation, pad it to length n, and check if it exists in the set.

### Algorithm

1. Store all input strings in a hash set.
2. Iterate `num` from `0` to `n`:
   - Convert `num` to a binary string and pad with leading zeros to length `n`.
   - If this string is not in the set, return it.
3. Return empty string (though we are guaranteed to find one within `n+1` attempts).

::tabs-start

```python
class Solution:
    def findDifferentBinaryString(self, nums: List[str]) -> str:
        strSet = set(nums)
        n = len(nums)

        for num in range(1 << n):
            res = bin(num)[2:].zfill(n)
            if res not in strSet:
                return res

        return ""
```

```java
public class Solution {
    public String findDifferentBinaryString(String[] nums) {
        Set<String> strSet = new HashSet<>();
        for (String s : nums) {
            strSet.add(s);
        }
        int n = nums.length;

        for (int num = 0; num < (n + 1); num++) {
            String res = String.format("%" + n + "s",
                         Integer.toBinaryString(num)).replace(' ', '0');
            if (!strSet.contains(res)) {
                return res;
            }
        }

        return "";
    }
}
```

```cpp
class Solution {
public:
    string findDifferentBinaryString(vector<string>& nums) {
        unordered_set<string> strSet(nums.begin(), nums.end());
        int n = nums.size();

        for (int num = 0; num < (n + 1); num++) {
            string res = toBinaryString(num, n);
            if (strSet.find(res) == strSet.end()) {
                return res;
            }
        }

        return "";
    }

private:
    string toBinaryString(int num, int length) {
        string res = "";
        for (int i = length - 1; i >= 0; i--) {
            res += (num & (1 << i)) ? '1' : '0';
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} nums
     * @return {string}
     */
    findDifferentBinaryString(nums) {
        const strSet = new Set(nums);
        const n = nums.length;

        for (let num = 0; num < n + 1; num++) {
            let res = num.toString(2).padStart(n, '0');
            if (!strSet.has(res)) {
                return res;
            }
        }

        return '';
    }
}
```

```csharp
public class Solution {
    public string FindDifferentBinaryString(string[] nums) {
        HashSet<string> strSet = new HashSet<string>(nums);
        int n = nums.Length;

        for (int num = 0; num < n + 1; num++) {
            string res = Convert.ToString(num, 2).PadLeft(n, '0');
            if (!strSet.Contains(res)) {
                return res;
            }
        }

        return "";
    }
}
```

```go
func findDifferentBinaryString(nums []string) string {
    strSet := make(map[string]bool)
    for _, s := range nums {
        strSet[s] = true
    }
    n := len(nums)

    for num := 0; num <= n; num++ {
        res := fmt.Sprintf("%0*b", n, num)
        if !strSet[res] {
            return res
        }
    }

    return ""
}
```

```kotlin
class Solution {
    fun findDifferentBinaryString(nums: Array<String>): String {
        val strSet = nums.toHashSet()
        val n = nums.size

        for (num in 0..n) {
            val res = Integer.toBinaryString(num).padStart(n, '0')
            if (res !in strSet) {
                return res
            }
        }

        return ""
    }
}
```

```swift
class Solution {
    func findDifferentBinaryString(_ nums: [String]) -> String {
        let strSet = Set(nums)
        let n = nums.count

        for num in 0...n {
            var res = String(num, radix: 2)
            while res.count < n {
                res = "0" + res
            }
            if !strSet.contains(res) {
                return res
            }
        }

        return ""
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Cantor's Diagonal Argument

### Intuition

Cantor's diagonal argument provides an elegant O(n) solution. For each string `nums[i]`, we look at its `i`-th character and flip it. The resulting string differs from `nums[0]` at position 0, from `nums[1]` at position 1, and so on. This guarantees the constructed string differs from every input string at at least one position.

### Algorithm

1. Create an empty result string.
2. For each index `i` from `0` to `n-1`:
   - Look at character `nums[i][i]` (the diagonal).
   - Append the opposite character: if it is `'0'`, append `'1'`; if `'1'`, append `'0'`.
3. Return the result string.

::tabs-start

```python
class Solution:
    def findDifferentBinaryString(self, nums: List[str]) -> str:
        res = []
        for i in range(len(nums)):
            if nums[i][i] == '0':
                res.append('1')
            else:
                res.append('0')
        return "".join(res)
```

```java
public class Solution {
    public String findDifferentBinaryString(String[] nums) {
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < nums.length; i++) {
            res.append(nums[i].charAt(i) == '0' ? '1' : '0');
        }
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string findDifferentBinaryString(vector<string>& nums) {
        string res;
        for (int i = 0; i < nums.size(); i++) {
            res += (nums[i][i] == '0') ? '1' : '0';
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} nums
     * @return {string}
     */
    findDifferentBinaryString(nums) {
        let res = [];
        for (let i = 0; i < nums.length; i++) {
            res.push(nums[i][i] === '0' ? '1' : '0');
        }
        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string FindDifferentBinaryString(string[] nums) {
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < nums.Length; i++) {
            res.Append(nums[i][i] == '0' ? '1' : '0');
        }
        return res.ToString();
    }
}
```

```go
func findDifferentBinaryString(nums []string) string {
    res := make([]byte, len(nums))
    for i := 0; i < len(nums); i++ {
        if nums[i][i] == '0' {
            res[i] = '1'
        } else {
            res[i] = '0'
        }
    }
    return string(res)
}
```

```kotlin
class Solution {
    fun findDifferentBinaryString(nums: Array<String>): String {
        val res = StringBuilder()
        for (i in nums.indices) {
            res.append(if (nums[i][i] == '0') '1' else '0')
        }
        return res.toString()
    }
}
```

```swift
class Solution {
    func findDifferentBinaryString(_ nums: [String]) -> String {
        var res = ""
        for i in 0..<nums.count {
            let index = nums[i].index(nums[i].startIndex, offsetBy: i)
            res += nums[i][index] == "0" ? "1" : "0"
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output string.

---

## 4. Randomization

### Intuition

Since there are `2^n` possible strings but only `n` are in the input, randomly generating a string has a high probability of being unique. For small `n`, this probability is at least `(2^n - n) / 2^n`, which approaches 1 quickly. We keep generating random strings until we find one not in the set.

### Algorithm

1. Store all input strings in a hash set.
2. Loop indefinitely:
   - Generate a random binary string of length `n` by randomly choosing `'0'` or `'1'` for each position.
   - If the string is not in the set, return it.
3. The expected number of attempts is very small due to the sparsity of input strings.

::tabs-start

```python
class Solution:
    def findDifferentBinaryString(self, nums: List[str]) -> str:
        strSet = set(nums)
        n = len(nums)

        while True:
            res = "".join(random.choice("01") for _ in range(n))
            if res not in strSet:
                return res
```

```java
public class Solution {
    public String findDifferentBinaryString(String[] nums) {
        Set<String> strSet = new HashSet<>();
        for (String s : nums) {
            strSet.add(s);
        }
        int n = nums.length;
        Random random = new Random();

        while (true) {
            StringBuilder res = new StringBuilder();
            for (int i = 0; i < n; i++) {
                res.append(random.nextBoolean() ? '1' : '0');
            }
            String result = res.toString();
            if (!strSet.contains(result)) {
                return result;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    string findDifferentBinaryString(vector<string>& nums) {
        unordered_set<string> strSet(nums.begin(), nums.end());
        int n = nums.size();

        while (true) {
            string res = "";
            for (int i = 0; i < n; i++) {
                res += (rand() % 2) ? '1' : '0';
            }
            if (strSet.find(res) == strSet.end()) {
                return res;
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} nums
     * @return {string}
     */
    findDifferentBinaryString(nums) {
        const strSet = new Set(nums);
        const n = nums.length;

        while (true) {
            let res = Array.from({ length: n }, () =>
                Math.random() < 0.5 ? '0' : '1',
            ).join('');
            if (!strSet.has(res)) {
                return res;
            }
        }
    }
}
```

```csharp
public class Solution {
    private Random random = new Random();

    public string FindDifferentBinaryString(string[] nums) {
        HashSet<string> strSet = new HashSet<string>(nums);
        int n = nums.Length;

        while (true) {
            StringBuilder res = new StringBuilder();
            for (int i = 0; i < n; i++) {
                res.Append(random.Next(2) == 0 ? '0' : '1');
            }
            string result = res.ToString();
            if (!strSet.Contains(result)) {
                return result;
            }
        }
    }
}
```

```go
func findDifferentBinaryString(nums []string) string {
    strSet := make(map[string]bool)
    for _, s := range nums {
        strSet[s] = true
    }
    n := len(nums)

    for {
        res := make([]byte, n)
        for i := 0; i < n; i++ {
            if rand.Intn(2) == 0 {
                res[i] = '0'
            } else {
                res[i] = '1'
            }
        }
        result := string(res)
        if !strSet[result] {
            return result
        }
    }
}
```

```kotlin
class Solution {
    fun findDifferentBinaryString(nums: Array<String>): String {
        val strSet = nums.toHashSet()
        val n = nums.size
        val random = java.util.Random()

        while (true) {
            val res = StringBuilder()
            for (i in 0 until n) {
                res.append(if (random.nextBoolean()) '1' else '0')
            }
            val result = res.toString()
            if (result !in strSet) {
                return result
            }
        }
    }
}
```

```swift
class Solution {
    func findDifferentBinaryString(_ nums: [String]) -> String {
        let strSet = Set(nums)
        let n = nums.count

        while true {
            var res = ""
            for _ in 0..<n {
                res += Bool.random() ? "1" : "0"
            }
            if !strSet.contains(res) {
                return res
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(∞)$ in worst case.
- Space complexity: $O(n)$

---

## 5. Trie

### Intuition

A Trie (prefix tree) stores all input strings and allows us to find a missing string by traversing the tree. At each node, if one of the two children (0 or 1) is missing, we can take that path and fill the rest arbitrarily. This finds a missing string in O(n) time after O(n^2) preprocessing.

### Algorithm

1. Build a Trie by inserting all input strings.
2. Traverse the Trie from the root:
   - At each node, check if the `'0'` or `'1'` child is missing.
   - If `'0'` is missing, append `'0'` and return (fill remaining with any character).
   - If `'1'` is missing, append `'1'` and return.
   - If both exist, prefer `'1'` and continue deeper.
3. Pad the result with `'1'`s to reach length `n` if needed.
4. Return the constructed string.

::tabs-start

```python
class Node:
    def __init__(self):
        self.children = [None, None]

    def contains_bit(self, bit: int) -> bool:
        return self.children[bit] is not None

    def put(self, bit: int):
        self.children[bit] = Node()

    def get(self, bit: int):
        return self.children[bit]

class Trie:
    def __init__(self):
        self.root = Node()

    def insert(self, s: str):
        curr = self.root
        for c in s:
            bit = int(c)
            if not curr.contains_bit(bit):
                curr.put(bit)
            curr = curr.get(bit)

    def search(self, res: str, curr) -> bool:
        while curr.contains_bit(0) or curr.contains_bit(1):
            if not curr.contains_bit(0):
                res.append('0')
                return True
            if not curr.contains_bit(1):
                res.append('1')
                return True

            res.append('1')
            curr = curr.get(1)

        return False

class Solution:
    def findDifferentBinaryString(self, nums: List[str]) -> str:
        trie = Trie()
        for s in nums:
            trie.insert(s)

        res = []
        trie.search(res, trie.root)

        while len(res) < len(nums):
            res.append('1')

        return ''.join(res)
```

```java
class Node {
    Node[] children;

    Node() {
        this.children = new Node[2];
    }

    boolean containsBit(int bit) {
        return this.children[bit] != null;
    }

    void put(int bit) {
        this.children[bit] = new Node();
    }

    Node get(int bit) {
        return this.children[bit];
    }
}

class Trie {
    Node root;

    Trie() {
        this.root = new Node();
    }

    void insert(String s) {
        Node curr = root;
        for (char c : s.toCharArray()) {
            int bit = c - '0';
            if (!curr.containsBit(bit)) {
                curr.put(bit);
            }
            curr = curr.get(bit);
        }
    }

    boolean search(StringBuilder res, Node curr) {
        while (curr.containsBit(0) || curr.containsBit(1)) {
            if (!curr.containsBit(0)) {
                res.append('0');
                return true;
            }
            if (!curr.containsBit(1)) {
                res.append('1');
                return true;
            }

            res.append('1');
            curr = curr.get(1);
        }

        return false;
    }
}

public class Solution {
    public String findDifferentBinaryString(String[] nums) {
        Trie trie = new Trie();
        for (String s : nums) {
            trie.insert(s);
        }

        StringBuilder res = new StringBuilder();
        trie.search(res, trie.root);

        while (res.length() < nums.length) {
            res.append('1');
        }

        return res.toString();
    }
}
```

```cpp
class Node {
public:
    Node *children[2];

    Node() {
        this->children[0] = nullptr;
        this->children[1] = nullptr;
    }

    bool containsBit(int bit) {
        return this->children[bit] != nullptr;
    }

    void put(int bit) {
        this->children[bit] = new Node();
    }

    Node* get(int bit) {
        return this->children[bit];
    }
};

class Trie {
public:
    Node* root;

    Trie() {
        this->root = new Node();
    }

    void insert(const string& s) {
        Node* curr = root;
        for (char c : s) {
            int bit = c - '0';
            if (!curr->containsBit(bit)) {
                curr->put(bit);
            }
            curr = curr->get(bit);
        }
    }

    bool search(string& res, Node* curr) {
        while (curr->containsBit(0) || curr->containsBit(1)) {
            if (!curr->containsBit(0)) {
                res += '0';
                return true;
            }
            if (!curr->containsBit(1)) {
                res += '1';
                return true;
            }

            res += '1';
            curr = curr->get(1);
        }

        return false;
    }
};

class Solution {
public:
    string findDifferentBinaryString(vector<string>& nums) {
        Trie trie;
        for (const string& s : nums) {
            trie.insert(s);
        }

        string res;
        trie.search(res, trie.root);

        while (res.length() < nums.size()) {
            res += '1';
        }

        return res;
    }
};
```

```javascript
class Node {
    constructor() {
        this.children = [null, null];
    }

    /**
     * @param {number} bit
     * @return {boolean}
     */
    containsBit(bit) {
        return this.children[bit] !== null;
    }

    /**
     * @param {number} bit
     */
    put(bit) {
        this.children[bit] = new Node();
    }

    /**
     * @param {number} bit
     * @return {Node}
     */
    get(bit) {
        return this.children[bit];
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    /**
     * @param {string} s
     */
    insert(s) {
        let curr = this.root;
        for (const c of s) {
            let bit = c === '1' ? 1 : 0;
            if (!curr.containsBit(bit)) {
                curr.put(bit);
            }
            curr = curr.get(bit);
        }
    }

    /**
     * @param {string[]} res
     * @param {Node} curr
     * @return {boolean}
     */
    search(res, curr) {
        while (curr.containsBit(0) || curr.containsBit(1)) {
            if (!curr.containsBit(0)) {
                res.push('0');
                return true;
            }
            if (!curr.containsBit(1)) {
                res.push('1');
                return true;
            }

            res.push('1');
            curr = curr.get(1);
        }
        return false;
    }
}

class Solution {
    /**
     * @param {string[]} nums
     * @return {string}
     */
    findDifferentBinaryString(nums) {
        let trie = new Trie();
        for (const s of nums) {
            trie.insert(s);
        }

        let res = [];
        trie.search(res, trie.root);

        while (res.length < nums.length) {
            res.push('1');
        }

        return res.join('');
    }
}
```

```csharp
public class Node {
    public Node[] children = new Node[2];

    public bool ContainsBit(int bit) {
        return children[bit] != null;
    }

    public void Put(int bit) {
        children[bit] = new Node();
    }

    public Node Get(int bit) {
        return children[bit];
    }
}

public class Trie {
    public Node root = new Node();

    public void Insert(string s) {
        Node curr = root;
        foreach (char c in s) {
            int bit = c - '0';
            if (!curr.ContainsBit(bit)) {
                curr.Put(bit);
            }
            curr = curr.Get(bit);
        }
    }

    public bool Search(StringBuilder res, Node curr) {
        while (curr.ContainsBit(0) || curr.ContainsBit(1)) {
            if (!curr.ContainsBit(0)) {
                res.Append('0');
                return true;
            }
            if (!curr.ContainsBit(1)) {
                res.Append('1');
                return true;
            }

            res.Append('1');
            curr = curr.Get(1);
        }
        return false;
    }
}

public class Solution {
    public string FindDifferentBinaryString(string[] nums) {
        Trie trie = new Trie();
        foreach (string s in nums) {
            trie.Insert(s);
        }

        StringBuilder res = new StringBuilder();
        trie.Search(res, trie.root);

        while (res.Length < nums.Length) {
            res.Append('1');
        }

        return res.ToString();
    }
}
```

```go
type Node struct {
    children [2]*Node
}

func (n *Node) containsBit(bit int) bool {
    return n.children[bit] != nil
}

func (n *Node) put(bit int) {
    n.children[bit] = &Node{}
}

func (n *Node) get(bit int) *Node {
    return n.children[bit]
}

type Trie struct {
    root *Node
}

func newTrie() *Trie {
    return &Trie{root: &Node{}}
}

func (t *Trie) insert(s string) {
    curr := t.root
    for _, c := range s {
        bit := int(c - '0')
        if !curr.containsBit(bit) {
            curr.put(bit)
        }
        curr = curr.get(bit)
    }
}

func (t *Trie) search(res *[]byte, curr *Node) bool {
    for curr.containsBit(0) || curr.containsBit(1) {
        if !curr.containsBit(0) {
            *res = append(*res, '0')
            return true
        }
        if !curr.containsBit(1) {
            *res = append(*res, '1')
            return true
        }

        *res = append(*res, '1')
        curr = curr.get(1)
    }
    return false
}

func findDifferentBinaryString(nums []string) string {
    trie := newTrie()
    for _, s := range nums {
        trie.insert(s)
    }

    res := []byte{}
    trie.search(&res, trie.root)

    for len(res) < len(nums) {
        res = append(res, '1')
    }

    return string(res)
}
```

```kotlin
class Node {
    val children = arrayOfNulls<Node>(2)

    fun containsBit(bit: Int): Boolean = children[bit] != null

    fun put(bit: Int) {
        children[bit] = Node()
    }

    fun get(bit: Int): Node? = children[bit]
}

class Trie {
    val root = Node()

    fun insert(s: String) {
        var curr = root
        for (c in s) {
            val bit = c - '0'
            if (!curr.containsBit(bit)) {
                curr.put(bit)
            }
            curr = curr.get(bit)!!
        }
    }

    fun search(res: StringBuilder, curr: Node): Boolean {
        var node = curr
        while (node.containsBit(0) || node.containsBit(1)) {
            if (!node.containsBit(0)) {
                res.append('0')
                return true
            }
            if (!node.containsBit(1)) {
                res.append('1')
                return true
            }

            res.append('1')
            node = node.get(1)!!
        }
        return false
    }
}

class Solution {
    fun findDifferentBinaryString(nums: Array<String>): String {
        val trie = Trie()
        for (s in nums) {
            trie.insert(s)
        }

        val res = StringBuilder()
        trie.search(res, trie.root)

        while (res.length < nums.size) {
            res.append('1')
        }

        return res.toString()
    }
}
```

```swift
class Node {
    var children: [Node?] = [nil, nil]

    func containsBit(_ bit: Int) -> Bool {
        return children[bit] != nil
    }

    func put(_ bit: Int) {
        children[bit] = Node()
    }

    func get(_ bit: Int) -> Node? {
        return children[bit]
    }
}

class Trie {
    var root = Node()

    func insert(_ s: String) {
        var curr = root
        for c in s {
            let bit = c == "1" ? 1 : 0
            if !curr.containsBit(bit) {
                curr.put(bit)
            }
            curr = curr.get(bit)!
        }
    }

    func search(_ res: inout [Character], _ curr: Node) -> Bool {
        var node = curr
        while node.containsBit(0) || node.containsBit(1) {
            if !node.containsBit(0) {
                res.append("0")
                return true
            }
            if !node.containsBit(1) {
                res.append("1")
                return true
            }

            res.append("1")
            node = node.get(1)!
        }
        return false
    }
}

class Solution {
    func findDifferentBinaryString(_ nums: [String]) -> String {
        let trie = Trie()
        for s in nums {
            trie.insert(s)
        }

        var res = [Character]()
        _ = trie.search(&res, trie.root)

        while res.count < nums.count {
            res.append("1")
        }

        return String(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## Common Pitfalls

### Iterating Through All 2^n Possibilities

Since there are only n input strings but 2^n possible strings of length n, a missing string is guaranteed to exist. However, iterating through all 2^n possibilities is exponential and will time out for larger n. The optimal approach only needs to check n+1 candidates or use Cantor's diagonal argument.

### Forgetting to Pad Binary Strings with Leading Zeros

When converting integers to binary strings, the result may be shorter than n characters. Forgetting to pad with leading zeros (e.g., "1" instead of "001" for n=3) will cause the generated string to have incorrect length and fail comparison with input strings.

### Misunderstanding Cantor's Diagonal Argument

The diagonal approach flips the i-th character of the i-th string to guarantee the result differs from every input. A common mistake is flipping at fixed positions (like always the first character) or not understanding why the diagonal specifically ensures uniqueness.
