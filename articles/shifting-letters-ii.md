## 1. Brute Force

::tabs-start

```python
class Solution:
    def shiftingLetters(self, s: str, shifts: List[List[int]]) -> str:
        s = [ord(c) - ord('a') for c in s]

        for l, r, d in shifts:
            for i in range(l, r + 1):
                s[i] += 1 if d else -1
                s[i] %= 26

        s = [chr(ord('a') + c) for c in s]
        return "".join(s)
```

```java
class Solution {
    public String shiftingLetters(String s, int[][] shifts) {
        char[] arr = s.toCharArray();
        int[] letters = new int[arr.length];

        for (int i = 0; i < arr.length; i++) {
            letters[i] = arr[i] - 'a';
        }

        for (int[] shift : shifts) {
            int l = shift[0], r = shift[1], d = shift[2];
            for (int i = l; i <= r; i++) {
                letters[i] = (letters[i] + (d == 1 ? 1 : -1) + 26) % 26;
            }
        }

        for (int i = 0; i < arr.length; i++) {
            arr[i] = (char) (letters[i] + 'a');
        }

        return new String(arr);
    }
}
```

```cpp
class Solution {
public:
    string shiftingLetters(string s, vector<vector<int>>& shifts) {
        vector<int> letters(s.size());
        for (int i = 0; i < s.size(); i++) {
            letters[i] = s[i] - 'a';
        }

        for (const auto& shift : shifts) {
            int l = shift[0], r = shift[1], d = shift[2];
            for (int i = l; i <= r; i++) {
                letters[i] = (letters[i] + (d == 1 ? 1 : -1) + 26) % 26;
            }
        }

        for (int i = 0; i < s.size(); i++) {
            s[i] = letters[i] + 'a';
        }

        return s;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number[][]} shifts
     * @return {string}
     */
    shiftingLetters(s, shifts) {
        let arr = Array.from(s).map((c) => c.charCodeAt(0) - 97);

        for (const [l, r, d] of shifts) {
            for (let i = l; i <= r; i++) {
                arr[i] = (arr[i] + (d === 1 ? 1 : -1) + 26) % 26;
            }
        }

        return arr.map((c) => String.fromCharCode(c + 97)).join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$ and $m$ is the size of the array $shifts$.

---

## 2. Sweep Line Algorithm

::tabs-start

```python
class Solution:
    def shiftingLetters(self, s: str, shifts: List[List[int]]) -> str:
        prefix_diff = [0] * (len(s) + 1)

        for left, right, d in shifts:
            val = 1 if d == 1 else -1
            prefix_diff[left] += val
            prefix_diff[right + 1] -= val

        diff = 0
        res = [ord(c) - ord("a") for c in s]

        for i in range(len(s)):
            diff += prefix_diff[i]
            res[i] = (diff + res[i] + 26) % 26

        s = [chr(ord("a") + n) for n in res]
        return "".join(s)
```

```java
class Solution {
    public String shiftingLetters(String s, int[][] shifts) {
        int n = s.length();
        int[] prefix_diff = new int[n + 1];

        for (int[] shift : shifts) {
            int left = shift[0], right = shift[1], d = shift[2];
            int val = d == 1 ? 1 : -1;
            prefix_diff[left] += val;
            prefix_diff[right + 1] -= val;
        }

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            res[i] = s.charAt(i) - 'a';
        }

        int diff = 0;
        for (int i = 0; i < n; i++) {
            diff += prefix_diff[i];
            res[i] = (res[i] + diff % 26 + 26) % 26;
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append((char) ('a' + res[i]));
        }

        return sb.toString();
    }
}
```

```cpp
class Solution {
public:
    string shiftingLetters(string s, vector<vector<int>>& shifts) {
        int n = s.size();
        vector<int> prefix_diff(n + 1, 0);

        for (auto& shift : shifts) {
            int left = shift[0], right = shift[1], d = shift[2];
            int val = d == 1 ? 1 : -1;
            prefix_diff[left] += val;
            prefix_diff[right + 1] -= val;
        }

        int diff = 0;
        vector<int> res(n);
        for (int i = 0; i < n; ++i) {
            res[i] = s[i] - 'a';
        }

        for (int i = 0; i < n; ++i) {
            diff += prefix_diff[i];
            res[i] = (diff % 26 + res[i] + 26) % 26;
        }

        for (int i = 0; i < n; ++i) {
            s[i] = 'a' + res[i];
        }

        return s;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number[][]} shifts
     * @return {string}
     */
    shiftingLetters(s, shifts) {
        const n = s.length;
        const prefix_diff = Array(n + 1).fill(0);

        for (const [left, right, d] of shifts) {
            const val = d === 1 ? 1 : -1;
            prefix_diff[left] += val;
            prefix_diff[right + 1] -= val;
        }

        let diff = 0;
        const res = Array.from(s).map(
            (c) => c.charCodeAt(0) - 'a'.charCodeAt(0),
        );

        for (let i = 0; i < n; i++) {
            diff += prefix_diff[i];
            res[i] = ((diff % 26) + res[i] + 26) % 26;
        }

        return res
            .map((x) => String.fromCharCode('a'.charCodeAt(0) + x))
            .join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$ and $m$ is the size of the array $shifts$.

---

## 3. Binary Indexed Tree (Fenwick Tree)

::tabs-start

```python
class BIT:
    def __init__(self, size):
        self.n = size + 2
        self.tree = [0] * self.n

    def update(self, index, delta):
        index += 1
        while index < self.n:
            self.tree[index] += delta
            index += index & -index

    def prefix_sum(self, index):
        index += 1
        total = 0
        while index > 0:
            total += self.tree[index]
            index -= index & -index
        return total

    def range_update(self, left, right, delta):
        self.update(left, delta)
        self.update(right + 1, -delta)


class Solution:
    def shiftingLetters(self, s: str, shifts: List[List[int]]) -> str:
        n = len(s)
        bit = BIT(n)

        for left, right, d in shifts:
            delta = 1 if d == 1 else -1
            bit.range_update(left, right, delta)

        res = []
        for i in range(n):
            shift = bit.prefix_sum(i) % 26
            code = (ord(s[i]) - ord('a') + shift + 26) % 26
            res.append(chr(ord('a') + code))

        return ''.join(res)
```

```java
class BIT {
    int[] tree;
    int n;

    public BIT(int size) {
        n = size + 2;
        tree = new int[n];
    }

    public void update(int index, int delta) {
        index++;
        while (index < n) {
            tree[index] += delta;
            index += index & -index;
        }
    }

    public int prefixSum(int index) {
        index++;
        int sum = 0;
        while (index > 0) {
            sum += tree[index];
            index -= index & -index;
        }
        return sum;
    }

    public void rangeUpdate(int left, int right, int delta) {
        update(left, delta);
        update(right + 1, -delta);
    }
}

public class Solution {
    public String shiftingLetters(String s, int[][] shifts) {
        int n = s.length();
        BIT bit = new BIT(n);

        for (int[] shift : shifts) {
            int left = shift[0], right = shift[1], d = shift[2];
            int delta = d == 1 ? 1 : -1;
            bit.rangeUpdate(left, right, delta);
        }

        StringBuilder res = new StringBuilder();
        for (int i = 0; i < n; i++) {
            int shift = bit.prefixSum(i) % 26;
            int code = (s.charAt(i) - 'a' + shift + 26) % 26;
            res.append((char) ('a' + code));
        }

        return res.toString();
    }
}
```

```cpp
class BIT {
    vector<int> tree;
    int n;
public:
    BIT(int size) {
        n = size + 2;
        tree.assign(n, 0);
    }

    void update(int index, int delta) {
        index++;
        while (index < n) {
            tree[index] += delta;
            index += index & -index;
        }
    }

    int prefixSum(int index) {
        index++;
        int sum = 0;
        while (index > 0) {
            sum += tree[index];
            index -= index & -index;
        }
        return sum;
    }

    void rangeUpdate(int left, int right, int delta) {
        update(left, delta);
        update(right + 1, -delta);
    }
};

class Solution {
public:
    string shiftingLetters(string s, vector<vector<int>>& shifts) {
        int n = s.size();
        BIT bit(n);

        for (auto& shift : shifts) {
            int left = shift[0], right = shift[1], d = shift[2];
            int delta = d == 1 ? 1 : -1;
            bit.rangeUpdate(left, right, delta);
        }

        string res;
        for (int i = 0; i < n; i++) {
            int shift = bit.prefixSum(i) % 26;
            int code = (s[i] - 'a' + shift + 26) % 26;
            res += char('a' + code);
        }

        return res;
    }
};
```

```javascript
class BIT {
    /**
     * @constructor
     * @param {number} size
     */
    constructor(size) {
        this.n = size + 2;
        this.tree = new Array(this.n).fill(0);
    }

    /**
     * @param {number} index
     * @param {number} delta
     * @return {void}
     */
    update(index, delta) {
        index++;
        while (index < this.n) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }

    /**
     * @param {number} index
     * @return {number}
     */
    prefixSum(index) {
        index++;
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= index & -index;
        }
        return sum;
    }

    /**
     * @param {number} left
     * @param {number} right
     * @param {number} delta
     * @return {void}
     */
    rangeUpdate(left, right, delta) {
        this.update(left, delta);
        this.update(right + 1, -delta);
    }
}

class Solution {
    /**
     * @param {string} s
     * @param {number[][]} shifts
     * @return {string}
     */
    shiftingLetters(s, shifts) {
        const n = s.length;
        const bit = new BIT(n);
        for (const [left, right, d] of shifts) {
            const delta = d === 1 ? 1 : -1;
            bit.rangeUpdate(left, right, delta);
        }

        let res = '';
        for (let i = 0; i < n; i++) {
            const shift = bit.prefixSum(i) % 26;
            const code = (s.charCodeAt(i) - 97 + shift + 26) % 26;
            res += String.fromCharCode(97 + code);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((m + n) * \log n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$ and $m$ is the size of the array $shifts$.
