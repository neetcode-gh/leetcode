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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(2 ^ k)$

> Where $n$ is the length of the string $s$ and $k$ is the length of the binary code.
