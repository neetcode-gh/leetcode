## 1. Backtracking (Recursion)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Backtracking (Iteration)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Cantor's Diagonal Argument

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output string.

---

## 4. Randomization

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(∞)$ in worst case.
- Space complexity: $O(n)$

---

## 5. Trie

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
