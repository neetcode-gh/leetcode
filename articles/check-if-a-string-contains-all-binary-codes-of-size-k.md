## 1. Brute Force

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
