## 1. Brute Force

### Intuition

The straightforward approach is to apply each shift operation directly. For each shift, we iterate through the specified range and increment or decrement each character. Since characters wrap around the alphabet, we use modulo 26 arithmetic.

This approach is simple but slow because we might repeatedly process the same characters across multiple overlapping shifts.

### Algorithm

1. Convert the string to an array of integers (0-25 representing 'a'-'z').
2. For each shift `[l, r, d]`:
   - Iterate through indices from `l` to `r`.
   - Add `1` if direction is forward, subtract `1` if backward.
   - Apply modulo `26` to handle wraparound.
3. Convert the integer array back to characters.
4. Return the resulting string.

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

```csharp
public class Solution {
    public string ShiftingLetters(string s, int[][] shifts) {
        char[] arr = s.ToCharArray();
        int[] letters = new int[arr.Length];

        for (int i = 0; i < arr.Length; i++) {
            letters[i] = arr[i] - 'a';
        }

        foreach (int[] shift in shifts) {
            int l = shift[0], r = shift[1], d = shift[2];
            for (int i = l; i <= r; i++) {
                letters[i] = (letters[i] + (d == 1 ? 1 : -1) + 26) % 26;
            }
        }

        for (int i = 0; i < arr.Length; i++) {
            arr[i] = (char)(letters[i] + 'a');
        }

        return new string(arr);
    }
}
```

```go
func shiftingLetters(s string, shifts [][]int) string {
    letters := make([]int, len(s))
    for i := 0; i < len(s); i++ {
        letters[i] = int(s[i] - 'a')
    }

    for _, shift := range shifts {
        l, r, d := shift[0], shift[1], shift[2]
        for i := l; i <= r; i++ {
            if d == 1 {
                letters[i] = (letters[i] + 1 + 26) % 26
            } else {
                letters[i] = (letters[i] - 1 + 26) % 26
            }
        }
    }

    result := make([]byte, len(s))
    for i := 0; i < len(s); i++ {
        result[i] = byte(letters[i] + 'a')
    }

    return string(result)
}
```

```kotlin
class Solution {
    fun shiftingLetters(s: String, shifts: Array<IntArray>): String {
        val arr = s.map { it - 'a' }.toIntArray()

        for ((l, r, d) in shifts) {
            for (i in l..r) {
                arr[i] = (arr[i] + (if (d == 1) 1 else -1) + 26) % 26
            }
        }

        return arr.map { ('a' + it) }.joinToString("")
    }
}
```

```swift
class Solution {
    func shiftingLetters(_ s: String, _ shifts: [[Int]]) -> String {
        var arr = s.map { Int($0.asciiValue! - Character("a").asciiValue!) }

        for shift in shifts {
            let l = shift[0], r = shift[1], d = shift[2]
            for i in l...r {
                arr[i] = (arr[i] + (d == 1 ? 1 : -1) + 26) % 26
            }
        }

        return String(arr.map { Character(UnicodeScalar($0 + Int(Character("a").asciiValue!))!) })
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

### Intuition

Instead of applying each shift individually, we can use a difference array technique. The idea is to mark where shifts begin and end, then compute the cumulative effect as we scan through the string.

For a shift affecting range `[l, r]`, we add the shift value at index `l` and subtract it at index `r + 1`. When we compute the running sum (prefix sum) of this difference array, each position automatically accumulates the total shift from all overlapping operations.

### Algorithm

1. Create a difference array `prefix_diff` of size `n + 1`, initialized to zeros.
2. For each shift `[l, r, d]`:
   - Add `+1` or `-1` (based on direction) at index `l`.
   - Subtract the same value at index `r + 1`.
3. Compute the running sum while traversing the string:
   - Maintain a cumulative `diff` variable.
   - For each index, add the net shift to the character.
   - Apply modulo `26` arithmetic for wraparound.
4. Return the resulting string.

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

```csharp
public class Solution {
    public string ShiftingLetters(string s, int[][] shifts) {
        int n = s.Length;
        int[] prefix_diff = new int[n + 1];

        foreach (int[] shift in shifts) {
            int left = shift[0], right = shift[1], d = shift[2];
            int val = d == 1 ? 1 : -1;
            prefix_diff[left] += val;
            prefix_diff[right + 1] -= val;
        }

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            res[i] = s[i] - 'a';
        }

        int diff = 0;
        for (int i = 0; i < n; i++) {
            diff += prefix_diff[i];
            res[i] = (res[i] + diff % 26 + 26) % 26;
        }

        char[] result = new char[n];
        for (int i = 0; i < n; i++) {
            result[i] = (char)('a' + res[i]);
        }

        return new string(result);
    }
}
```

```go
func shiftingLetters(s string, shifts [][]int) string {
    n := len(s)
    prefixDiff := make([]int, n+1)

    for _, shift := range shifts {
        left, right, d := shift[0], shift[1], shift[2]
        val := 1
        if d == 0 {
            val = -1
        }
        prefixDiff[left] += val
        prefixDiff[right+1] -= val
    }

    diff := 0
    res := make([]int, n)
    for i := 0; i < n; i++ {
        res[i] = int(s[i] - 'a')
    }

    for i := 0; i < n; i++ {
        diff += prefixDiff[i]
        res[i] = ((diff%26 + res[i]) + 26) % 26
    }

    result := make([]byte, n)
    for i := 0; i < n; i++ {
        result[i] = byte(res[i] + 'a')
    }

    return string(result)
}
```

```kotlin
class Solution {
    fun shiftingLetters(s: String, shifts: Array<IntArray>): String {
        val n = s.length
        val prefixDiff = IntArray(n + 1)

        for ((left, right, d) in shifts) {
            val value = if (d == 1) 1 else -1
            prefixDiff[left] += value
            prefixDiff[right + 1] -= value
        }

        var diff = 0
        val res = s.map { it - 'a' }.toIntArray()

        for (i in 0 until n) {
            diff += prefixDiff[i]
            res[i] = ((diff % 26 + res[i]) + 26) % 26
        }

        return res.map { ('a' + it) }.joinToString("")
    }
}
```

```swift
class Solution {
    func shiftingLetters(_ s: String, _ shifts: [[Int]]) -> String {
        let n = s.count
        var prefixDiff = [Int](repeating: 0, count: n + 1)

        for shift in shifts {
            let left = shift[0], right = shift[1], d = shift[2]
            let val = d == 1 ? 1 : -1
            prefixDiff[left] += val
            prefixDiff[right + 1] -= val
        }

        var diff = 0
        var res = s.map { Int($0.asciiValue! - Character("a").asciiValue!) }

        for i in 0..<n {
            diff += prefixDiff[i]
            res[i] = ((diff % 26 + res[i]) + 26) % 26
        }

        return String(res.map { Character(UnicodeScalar($0 + Int(Character("a").asciiValue!))!) })
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

### Intuition

A Binary Indexed Tree (BIT) efficiently handles range updates and point queries. For this problem, we use the BIT to support range updates: when we need to add a value to all elements in range `[l, r]`, we update at position `l` and cancel at position `r + 1`.

When querying, the prefix sum at any index gives us the total accumulated shift for that position. This is useful when shifts need to be applied dynamically or when we need to query intermediate results.

### Algorithm

1. Initialize a BIT of size `n + 2`.
2. For each shift `[l, r, d]`:
   - Perform a range update by calling `update(l, delta)` and `update(r + 1, -delta)`, where `delta` is `+1` or `-1`.
3. For each character in the string:
   - Query the BIT to get the total shift at that position.
   - Apply the shift with modulo `26` arithmetic.
   - Build the result character.
4. Return the resulting string.

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

```csharp
public class BIT {
    private int[] tree;
    private int n;

    public BIT(int size) {
        n = size + 2;
        tree = new int[n];
    }

    public void Update(int index, int delta) {
        index++;
        while (index < n) {
            tree[index] += delta;
            index += index & -index;
        }
    }

    public int PrefixSum(int index) {
        index++;
        int sum = 0;
        while (index > 0) {
            sum += tree[index];
            index -= index & -index;
        }
        return sum;
    }

    public void RangeUpdate(int left, int right, int delta) {
        Update(left, delta);
        Update(right + 1, -delta);
    }
}

public class Solution {
    public string ShiftingLetters(string s, int[][] shifts) {
        int n = s.Length;
        BIT bit = new BIT(n);

        foreach (var shift in shifts) {
            int left = shift[0], right = shift[1], d = shift[2];
            int delta = d == 1 ? 1 : -1;
            bit.RangeUpdate(left, right, delta);
        }

        char[] res = new char[n];
        for (int i = 0; i < n; i++) {
            int sh = bit.PrefixSum(i) % 26;
            int code = (s[i] - 'a' + sh + 26) % 26;
            res[i] = (char)('a' + code);
        }

        return new string(res);
    }
}
```

```go
type BIT struct {
    tree []int
    n    int
}

func NewBIT(size int) *BIT {
    n := size + 2
    return &BIT{
        tree: make([]int, n),
        n:    n,
    }
}

func (b *BIT) Update(index, delta int) {
    index++
    for index < b.n {
        b.tree[index] += delta
        index += index & -index
    }
}

func (b *BIT) PrefixSum(index int) int {
    index++
    sum := 0
    for index > 0 {
        sum += b.tree[index]
        index -= index & -index
    }
    return sum
}

func (b *BIT) RangeUpdate(left, right, delta int) {
    b.Update(left, delta)
    b.Update(right+1, -delta)
}

func shiftingLetters(s string, shifts [][]int) string {
    n := len(s)
    bit := NewBIT(n)

    for _, shift := range shifts {
        left, right, d := shift[0], shift[1], shift[2]
        delta := 1
        if d == 0 {
            delta = -1
        }
        bit.RangeUpdate(left, right, delta)
    }

    res := make([]byte, n)
    for i := 0; i < n; i++ {
        sh := bit.PrefixSum(i) % 26
        code := ((int(s[i]-'a') + sh) % 26 + 26) % 26
        res[i] = byte('a' + code)
    }

    return string(res)
}
```

```kotlin
class BIT(size: Int) {
    private val n = size + 2
    private val tree = IntArray(n)

    fun update(index: Int, delta: Int) {
        var i = index + 1
        while (i < n) {
            tree[i] += delta
            i += i and -i
        }
    }

    fun prefixSum(index: Int): Int {
        var i = index + 1
        var sum = 0
        while (i > 0) {
            sum += tree[i]
            i -= i and -i
        }
        return sum
    }

    fun rangeUpdate(left: Int, right: Int, delta: Int) {
        update(left, delta)
        update(right + 1, -delta)
    }
}

class Solution {
    fun shiftingLetters(s: String, shifts: Array<IntArray>): String {
        val n = s.length
        val bit = BIT(n)

        for ((left, right, d) in shifts) {
            val delta = if (d == 1) 1 else -1
            bit.rangeUpdate(left, right, delta)
        }

        val res = StringBuilder()
        for (i in 0 until n) {
            val sh = bit.prefixSum(i) % 26
            val code = ((s[i] - 'a' + sh) % 26 + 26) % 26
            res.append('a' + code)
        }

        return res.toString()
    }
}
```

```swift
class BIT {
    private var tree: [Int]
    private var n: Int

    init(_ size: Int) {
        n = size + 2
        tree = [Int](repeating: 0, count: n)
    }

    func update(_ index: Int, _ delta: Int) {
        var i = index + 1
        while i < n {
            tree[i] += delta
            i += i & -i
        }
    }

    func prefixSum(_ index: Int) -> Int {
        var i = index + 1
        var sum = 0
        while i > 0 {
            sum += tree[i]
            i -= i & -i
        }
        return sum
    }

    func rangeUpdate(_ left: Int, _ right: Int, _ delta: Int) {
        update(left, delta)
        update(right + 1, -delta)
    }
}

class Solution {
    func shiftingLetters(_ s: String, _ shifts: [[Int]]) -> String {
        let n = s.count
        let bit = BIT(n)
        let chars = Array(s)

        for shift in shifts {
            let left = shift[0], right = shift[1], d = shift[2]
            let delta = d == 1 ? 1 : -1
            bit.rangeUpdate(left, right, delta)
        }

        var res = ""
        for i in 0..<n {
            let sh = bit.prefixSum(i) % 26
            let charVal = Int(chars[i].asciiValue! - Character("a").asciiValue!)
            let code = ((charVal + sh) % 26 + 26) % 26
            res += String(Character(UnicodeScalar(code + Int(Character("a").asciiValue!))!))
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((m + n) * \log n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$ and $m$ is the size of the array $shifts$.
