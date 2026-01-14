## 1. Brute Force

### Intuition

The most straightforward approach is to generate all possible binary codes of length `k` and check if each one exists as a substring in the given string `s`. There are exactly $2^k$ such binary codes (from 0 to $2^k - 1$), and we need to verify that every single one appears somewhere in `s`.

### Algorithm

1. If the length of `s` is less than $2^k$, return `false` immediately since there cannot be enough substrings.
2. Iterate through all numbers from `0` to $2^k - 1$.
3. For each number, convert it to its binary representation with exactly `k` digits (padding with leading zeros if needed).
4. Check if this binary string exists as a substring in `s`.
5. If any binary code is not found, return `false`.
6. If all binary codes are found, return `true`.

::tabs-start

```python
class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        n = len(s)
        if n < (1 << k):
            return False

        for num in range(1 << k):
            binaryCode = format(num, f'0{k}b')
            if binaryCode not in s:
                return False

        return True
```

```java
public class Solution {
    public boolean hasAllCodes(String s, int k) {
        int n = s.length();
        if (n < (1 << k)) {
            return false;
        }

        for (int num = 0; num < (1 << k); num++) {
            String binaryCode = String.format("%" + k + "s", Integer.toBinaryString(num)).replace(' ', '0');
            if (!s.contains(binaryCode)) {
                return false;
            }
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool hasAllCodes(string s, int k) {
        int n = s.size();
        if (n < (1 << k)) {
            return false;
        }

        for (int num = 0; num < (1 << k); num++) {
            string binaryCode = bitset<20>(num).to_string().substr(20 - k);
            if (s.find(binaryCode) == string::npos) {
                return false;
            }
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {boolean}
     */
    hasAllCodes(s, k) {
        const n = s.length;
        if (n < 1 << k) {
            return false;
        }

        for (let num = 0; num < 1 << k; num++) {
            const binaryCode = num.toString(2).padStart(k, '0');
            if (!s.includes(binaryCode)) {
                return false;
            }
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool HasAllCodes(string s, int k) {
        int n = s.Length;
        if (n < (1 << k)) {
            return false;
        }

        for (int num = 0; num < (1 << k); num++) {
            string binaryCode = Convert.ToString(num, 2).PadLeft(k, '0');
            if (!s.Contains(binaryCode)) {
                return false;
            }
        }

        return true;
    }
}
```

```go
func hasAllCodes(s string, k int) bool {
    n := len(s)
    if n < (1 << k) {
        return false
    }

    for num := 0; num < (1 << k); num++ {
        binaryCode := fmt.Sprintf("%0*b", k, num)
        if !strings.Contains(s, binaryCode) {
            return false
        }
    }

    return true
}
```

```kotlin
class Solution {
    fun hasAllCodes(s: String, k: Int): Boolean {
        val n = s.length
        if (n < (1 shl k)) {
            return false
        }

        for (num in 0 until (1 shl k)) {
            val binaryCode = num.toString(2).padStart(k, '0')
            if (!s.contains(binaryCode)) {
                return false
            }
        }

        return true
    }
}
```

```swift
class Solution {
    func hasAllCodes(_ s: String, _ k: Int) -> Bool {
        let n = s.count
        if n < (1 << k) {
            return false
        }

        for num in 0..<(1 << k) {
            let binaryCode = String(num, radix: 2).paddingLeft(toLength: k, withPad: "0")
            if !s.contains(binaryCode) {
                return false
            }
        }

        return true
    }
}

extension String {
    func paddingLeft(toLength: Int, withPad: String) -> String {
        let padding = String(repeating: withPad, count: max(0, toLength - self.count))
        return padding + self
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ k)$
- Space complexity: $O(k)$

> Where $n$ is the length of the string $s$ and $k$ is the length of the binary code.

---

## 2. Hash Set

### Intuition

Instead of checking each possible binary code one by one, we can flip the approach: extract all substrings of length `k` from `s` and store them in a set. If the set contains exactly $2^k$ unique substrings, then all binary codes are present. This is more efficient because we process each substring only once.

### Algorithm

1. If the length of `s` is less than $2^k$, return `false` immediately.
2. Create an empty hash set to store unique substrings.
3. Iterate through `s` and extract every substring of length `k`.
4. Add each substring to the hash set.
5. After processing all substrings, check if the set size equals $2^k$.
6. Return `true` if the count matches, `false` otherwise.

::tabs-start

```python
class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        if len(s) < 2 ** k:
            return False

        codeSet = set()
        for i in range(len(s) - k + 1):
            codeSet.add(s[i:i + k])

        return len(codeSet) == 2 ** k
```

```java
public class Solution {
    public boolean hasAllCodes(String s, int k) {
        if (s.length() < (1 << k)) {
            return false;
        }

        HashSet<String> codeSet = new HashSet<>();
        for (int i = 0; i <= s.length() - k; i++) {
            codeSet.add(s.substring(i, i + k));
        }

        return codeSet.size() == (1 << k);
    }
}
```

```cpp
class Solution {
public:
    bool hasAllCodes(std::string s, int k) {
        if (s.size() < (1 << k)) {
            return false;
        }

        std::unordered_set<std::string> codeSet;
        for (int i = 0; i <= s.size() - k; i++) {
            codeSet.insert(s.substr(i, k));
        }

        return codeSet.size() == (1 << k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {boolean}
     */
    hasAllCodes(s, k) {
        if (s.length < 1 << k) {
            return false;
        }

        const codeSet = new Set();
        for (let i = 0; i <= s.length - k; i++) {
            codeSet.add(s.substring(i, i + k));
        }

        return codeSet.size === 1 << k;
    }
}
```

```csharp
public class Solution {
    public bool HasAllCodes(string s, int k) {
        if (s.Length < (1 << k)) {
            return false;
        }

        HashSet<string> codeSet = new HashSet<string>();
        for (int i = 0; i <= s.Length - k; i++) {
            codeSet.Add(s.Substring(i, k));
        }

        return codeSet.Count == (1 << k);
    }
}
```

```go
func hasAllCodes(s string, k int) bool {
    if len(s) < (1 << k) {
        return false
    }

    codeSet := make(map[string]bool)
    for i := 0; i <= len(s)-k; i++ {
        codeSet[s[i:i+k]] = true
    }

    return len(codeSet) == (1 << k)
}
```

```kotlin
class Solution {
    fun hasAllCodes(s: String, k: Int): Boolean {
        if (s.length < (1 shl k)) {
            return false
        }

        val codeSet = HashSet<String>()
        for (i in 0..s.length - k) {
            codeSet.add(s.substring(i, i + k))
        }

        return codeSet.size == (1 shl k)
    }
}
```

```swift
class Solution {
    func hasAllCodes(_ s: String, _ k: Int) -> Bool {
        if s.count < (1 << k) {
            return false
        }

        var codeSet = Set<String>()
        let arr = Array(s)
        for i in 0...(arr.count - k) {
            codeSet.insert(String(arr[i..<(i + k)]))
        }

        return codeSet.count == (1 << k)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(2 ^ k)$

> Where $n$ is the length of the string $s$ and $k$ is the length of the binary code.

---

## 3. Sliding Window

### Intuition

We can improve upon the hash set approach by using bit manipulation to represent each substring as an integer. Instead of storing strings, we maintain a sliding window of `k` bits. As we move through the string, we update the integer representation by removing the leftmost bit and adding the new rightmost bit. This converts string operations into faster bitwise operations.

### Algorithm

1. If the length of `s` is less than $2^k$, return `false`.
2. Create a boolean array of size $2^k$ to track which codes have been seen.
3. Build the initial window by reading the first `k` characters and converting them to an integer using bit shifts.
4. Mark the first code as seen and initialize a counter.
5. Slide the window one character at a time:
   - Remove the leftmost bit using XOR if it was `1`.
   - Shift the current value left by `1`.
   - Add the new rightmost bit using OR.
   - If this code has not been seen before, mark it and increment the counter.
6. Return `true` if the counter equals $2^k$.

::tabs-start

```python
class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        n = len(s)
        if n < (1 << k):
            return False

        codeSet = [False] * (1 << k)
        cur = 0
        i = j = 0
        bit = k - 1
        while j < k:
            if s[j] == '1':
                cur |= (1 << bit)
            bit -= 1
            j += 1

        have = 1
        codeSet[cur] = True
        while j < n:
            if s[i] == '1':
                cur ^= (1 << (k - 1))
            i += 1

            cur <<= 1
            if s[j] == '1':
                cur |= 1
            j += 1

            if not codeSet[cur]:
                have += 1
                codeSet[cur] = True

        return have == (1 << k)
```

```java
public class Solution {
    public boolean hasAllCodes(String s, int k) {
        int n = s.length();
        if (n < (1 << k)) {
            return false;
        }

        boolean[] codeSet = new boolean[1 << k];
        int cur = 0;
        int i = 0, j = 0, bit = k - 1;

        while (j < k) {
            if (s.charAt(j) == '1') {
                cur |= (1 << bit);
            }
            bit--;
            j++;
        }

        int have = 1;
        codeSet[cur] = true;

        while (j < n) {
            if (s.charAt(i) == '1') {
                cur ^= (1 << (k - 1));
            }
            i++;

            cur <<= 1;
            if (s.charAt(j) == '1') {
                cur |= 1;
            }
            j++;

            if (!codeSet[cur]) {
                have++;
                codeSet[cur] = true;
            }
        }

        return have == (1 << k);
    }
}
```

```cpp
class Solution {
public:
    bool hasAllCodes(string s, int k) {
        int n = s.size();
        if (n < (1 << k)) {
            return false;
        }

        vector<bool> codeSet(1 << k, false);
        int cur = 0;
        int i = 0, j = 0, bit = k - 1;

        while (j < k) {
            if (s[j] == '1') {
                cur |= (1 << bit);
            }
            bit--;
            j++;
        }

        int have = 1;
        codeSet[cur] = true;

        while (j < n) {
            if (s[i] == '1') {
                cur ^= (1 << (k - 1));
            }
            i++;

            cur <<= 1;
            if (s[j] == '1') {
                cur |= 1;
            }
            j++;

            if (!codeSet[cur]) {
                have++;
                codeSet[cur] = true;
            }
        }

        return have == (1 << k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {boolean}
     */
    hasAllCodes(s, k) {
        const n = s.length;
        if (n < 1 << k) {
            return false;
        }

        const codeSet = new Array(1 << k).fill(false);
        let cur = 0;
        let i = 0,
            j = 0,
            bit = k - 1;

        while (j < k) {
            if (s[j] === '1') {
                cur |= 1 << bit;
            }
            bit--;
            j++;
        }

        let have = 1;
        codeSet[cur] = true;

        while (j < n) {
            if (s[i] === '1') {
                cur ^= 1 << (k - 1);
            }
            i++;

            cur <<= 1;
            if (s[j] === '1') {
                cur |= 1;
            }
            j++;

            if (!codeSet[cur]) {
                have++;
                codeSet[cur] = true;
            }
        }

        return have === 1 << k;
    }
}
```

```csharp
public class Solution {
    public bool HasAllCodes(string s, int k) {
        int n = s.Length;
        if (n < (1 << k)) {
            return false;
        }

        bool[] codeSet = new bool[1 << k];
        int cur = 0;
        int i = 0, j = 0, bit = k - 1;

        while (j < k) {
            if (s[j] == '1') {
                cur |= (1 << bit);
            }
            bit--;
            j++;
        }

        int have = 1;
        codeSet[cur] = true;

        while (j < n) {
            if (s[i] == '1') {
                cur ^= (1 << (k - 1));
            }
            i++;

            cur <<= 1;
            if (s[j] == '1') {
                cur |= 1;
            }
            j++;

            if (!codeSet[cur]) {
                have++;
                codeSet[cur] = true;
            }
        }

        return have == (1 << k);
    }
}
```

```go
func hasAllCodes(s string, k int) bool {
    n := len(s)
    if n < (1 << k) {
        return false
    }

    codeSet := make([]bool, 1<<k)
    cur := 0
    i, j, bit := 0, 0, k-1

    for j < k {
        if s[j] == '1' {
            cur |= (1 << bit)
        }
        bit--
        j++
    }

    have := 1
    codeSet[cur] = true

    for j < n {
        if s[i] == '1' {
            cur ^= (1 << (k - 1))
        }
        i++

        cur <<= 1
        if s[j] == '1' {
            cur |= 1
        }
        j++

        if !codeSet[cur] {
            have++
            codeSet[cur] = true
        }
    }

    return have == (1 << k)
}
```

```kotlin
class Solution {
    fun hasAllCodes(s: String, k: Int): Boolean {
        val n = s.length
        if (n < (1 shl k)) {
            return false
        }

        val codeSet = BooleanArray(1 shl k)
        var cur = 0
        var i = 0
        var j = 0
        var bit = k - 1

        while (j < k) {
            if (s[j] == '1') {
                cur = cur or (1 shl bit)
            }
            bit--
            j++
        }

        var have = 1
        codeSet[cur] = true

        while (j < n) {
            if (s[i] == '1') {
                cur = cur xor (1 shl (k - 1))
            }
            i++

            cur = cur shl 1
            if (s[j] == '1') {
                cur = cur or 1
            }
            j++

            if (!codeSet[cur]) {
                have++
                codeSet[cur] = true
            }
        }

        return have == (1 shl k)
    }
}
```

```swift
class Solution {
    func hasAllCodes(_ s: String, _ k: Int) -> Bool {
        let n = s.count
        if n < (1 << k) {
            return false
        }

        let arr = Array(s)
        var codeSet = [Bool](repeating: false, count: 1 << k)
        var cur = 0
        var i = 0, j = 0, bit = k - 1

        while j < k {
            if arr[j] == "1" {
                cur |= (1 << bit)
            }
            bit -= 1
            j += 1
        }

        var have = 1
        codeSet[cur] = true

        while j < n {
            if arr[i] == "1" {
                cur ^= (1 << (k - 1))
            }
            i += 1

            cur <<= 1
            if arr[j] == "1" {
                cur |= 1
            }
            j += 1

            if !codeSet[cur] {
                have += 1
                codeSet[cur] = true
            }
        }

        return have == (1 << k)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(2 ^ k)$

> Where $n$ is the length of the string $s$ and $k$ is the length of the binary code.

---

## 4. Sliding Window (Optimal)

### Intuition

This approach simplifies the sliding window technique by using a bitmask to automatically handle the window size. Instead of explicitly removing the leftmost bit, we use a bitwise AND with a mask ($2^k - 1$) after shifting. This mask keeps only the rightmost `k` bits, effectively removing any bits that overflow beyond the window size.

### Algorithm

1. If the length of `s` is less than $2^k$, return `false`.
2. Create a boolean array of size $2^k$ to track seen codes.
3. Initialize the current code value and a counter for unique codes found.
4. Iterate through each character in `s`:
   - Shift the current value left by `1`.
   - Apply a bitmask (AND with $2^k - 1$) to keep only the last `k` bits.
   - Add the current character's bit value using OR.
   - Once we have processed at least `k` characters, check if this code is new.
   - If new, mark it as seen and increment the counter.
5. Return `true` if the counter equals $2^k$.

::tabs-start

```python
class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        n = len(s)
        if n < (1 << k):
            return False

        codeSet = [False] * (1 << k)
        cur = 0
        have = 0

        for i in range(n):
            cur = ((cur << 1) & ((1 << k) - 1)) | (ord(s[i]) - ord('0'))

            if i >= k - 1:
                if not codeSet[cur]:
                    codeSet[cur] = True
                    have += 1

        return have == (1 << k)
```

```java
public class Solution {
    public boolean hasAllCodes(String s, int k) {
        int n = s.length();
        if (n < (1 << k)) {
            return false;
        }

        boolean[] codeSet = new boolean[1 << k];
        int cur = 0, have = 0;

        for (int i = 0; i < n; i++) {
            cur = ((cur << 1) & ((1 << k) - 1)) | (s.charAt(i) - '0');

            if (i >= k - 1) {
                if (!codeSet[cur]) {
                    codeSet[cur] = true;
                    have++;
                }
            }
        }

        return have == (1 << k);
    }
}
```

```cpp
class Solution {
public:
    bool hasAllCodes(string s, int k) {
        int n = s.size();
        if (n < (1 << k)) {
            return false;
        }

        vector<bool> codeSet(1 << k, false);
        int cur = 0, have = 0;

        for (int i = 0; i < n; i++) {
            cur = ((cur << 1) & ((1 << k) - 1)) | (s[i] - '0');

            if (i >= k - 1) {
                if (!codeSet[cur]) {
                    codeSet[cur] = true;
                    have++;
                }
            }
        }

        return have == (1 << k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {boolean}
     */
    hasAllCodes(s, k) {
        const n = s.length;
        if (n < 1 << k) {
            return false;
        }

        const codeSet = new Array(1 << k).fill(false);
        let cur = 0,
            have = 0;

        for (let i = 0; i < n; i++) {
            cur = ((cur << 1) & ((1 << k) - 1)) | (s[i] - '0');

            if (i >= k - 1) {
                if (!codeSet[cur]) {
                    codeSet[cur] = true;
                    have++;
                }
            }
        }

        return have === 1 << k;
    }
}
```

```csharp
public class Solution {
    public bool HasAllCodes(string s, int k) {
        int n = s.Length;
        if (n < (1 << k)) {
            return false;
        }

        bool[] codeSet = new bool[1 << k];
        int cur = 0, have = 0;

        for (int i = 0; i < n; i++) {
            cur = ((cur << 1) & ((1 << k) - 1)) | (s[i] - '0');

            if (i >= k - 1) {
                if (!codeSet[cur]) {
                    codeSet[cur] = true;
                    have++;
                }
            }
        }

        return have == (1 << k);
    }
}
```

```go
func hasAllCodes(s string, k int) bool {
    n := len(s)
    if n < (1 << k) {
        return false
    }

    codeSet := make([]bool, 1<<k)
    cur, have := 0, 0

    for i := 0; i < n; i++ {
        cur = ((cur << 1) & ((1 << k) - 1)) | int(s[i]-'0')

        if i >= k-1 {
            if !codeSet[cur] {
                codeSet[cur] = true
                have++
            }
        }
    }

    return have == (1 << k)
}
```

```kotlin
class Solution {
    fun hasAllCodes(s: String, k: Int): Boolean {
        val n = s.length
        if (n < (1 shl k)) {
            return false
        }

        val codeSet = BooleanArray(1 shl k)
        var cur = 0
        var have = 0

        for (i in 0 until n) {
            cur = ((cur shl 1) and ((1 shl k) - 1)) or (s[i] - '0')

            if (i >= k - 1) {
                if (!codeSet[cur]) {
                    codeSet[cur] = true
                    have++
                }
            }
        }

        return have == (1 shl k)
    }
}
```

```swift
class Solution {
    func hasAllCodes(_ s: String, _ k: Int) -> Bool {
        let n = s.count
        if n < (1 << k) {
            return false
        }

        let arr = Array(s)
        var codeSet = [Bool](repeating: false, count: 1 << k)
        var cur = 0, have = 0

        for i in 0..<n {
            cur = ((cur << 1) & ((1 << k) - 1)) | (arr[i] == "1" ? 1 : 0)

            if i >= k - 1 {
                if !codeSet[cur] {
                    codeSet[cur] = true
                    have += 1
                }
            }
        }

        return have == (1 << k)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(2 ^ k)$

> Where $n$ is the length of the string $s$ and $k$ is the length of the binary code.

---

## Common Pitfalls

### Forgetting the Early Length Check
If the string length is less than `k + 2^k - 1`, it's impossible to contain all binary codes since there aren't enough substrings. Skipping this check leads to unnecessary computation and potential incorrect results.
```python
# Always check first:
if len(s) < (1 << k):
    return False
```

### Off-by-One Error in Substring Extraction
When iterating to extract substrings of length `k`, the loop should go from `0` to `len(s) - k` inclusive. Using `range(len(s) - k)` instead of `range(len(s) - k + 1)` misses the last valid substring.
```python
# Wrong: for i in range(len(s) - k)
# Correct:
for i in range(len(s) - k + 1):
    codeSet.add(s[i:i + k])
```

### Incorrect Bitmask in Sliding Window
When using the sliding window approach with bit manipulation, forgetting to mask the result after shifting causes the integer to grow beyond `k` bits. The mask `(1 << k) - 1` must be applied to keep only the last `k` bits.
```python
# Wrong: cur = (cur << 1) | bit
# Correct:
cur = ((cur << 1) & ((1 << k) - 1)) | bit
```
