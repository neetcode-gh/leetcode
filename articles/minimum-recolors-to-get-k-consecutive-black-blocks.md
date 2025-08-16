## 1. Brute Force

::tabs-start

```python
class Solution:
    def minimumRecolors(self, blocks: str, k: int) -> int:
        res = len(blocks)
        for i in range(len(blocks) - k + 1):
            count_w = 0
            for j in range(i, i + k):
                if blocks[j] == 'W':
                    count_w += 1
            res = min(res, count_w)
        return res
```

```java
public class Solution {
    public int minimumRecolors(String blocks, int k) {
        int res = blocks.length();
        for (int i = 0; i <= blocks.length() - k; i++) {
            int count_w = 0;
            for (int j = i; j < i + k; j++) {
                if (blocks.charAt(j) == 'W') {
                    count_w++;
                }
            }
            res = Math.min(res, count_w);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minimumRecolors(string blocks, int k) {
        int res = blocks.length();
        for (int i = 0; i <= blocks.length() - k; i++) {
            int count_w = 0;
            for (int j = i; j < i + k; j++) {
                if (blocks[j] == 'W') {
                    count_w++;
                }
            }
            res = min(res, count_w);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} blocks
     * @param {number} k
     * @return {number}
     */
    minimumRecolors(blocks, k) {
        let res = blocks.length;
        for (let i = 0; i <= blocks.length - k; i++) {
            let count_w = 0;
            for (let j = i; j < i + k; j++) {
                if (blocks[j] === 'W') {
                    count_w++;
                }
            }
            res = Math.min(res, count_w);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinimumRecolors(string blocks, int k) {
        int res = blocks.Length;
        for (int i = 0; i <= blocks.Length - k; i++) {
            int count_w = 0;
            for (int j = i; j < i + k; j++) {
                if (blocks[j] == 'W') {
                    count_w++;
                }
            }
            res = Math.Min(res, count_w);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * k)$
* Space complexity: $O(1)$

---

## 2. Sliding Window

::tabs-start

```python
class Solution:
    def minimumRecolors(self, blocks: str, k: int) -> int:
        count_w = 0
        for i in range(k):
            if blocks[i] == 'W':
                count_w += 1

        res = count_w
        for i in range(k, len(blocks)):
            if blocks[i - k] == 'W':
                count_w -= 1
            if blocks[i] == 'W':
                count_w += 1
            res = min(res, count_w)
        return res
```

```java
public class Solution {
    public int minimumRecolors(String blocks, int k) {
        int count_w = 0;
        for (int i = 0; i < k; i++) {
            if (blocks.charAt(i) == 'W') {
                count_w++;
            }
        }

        int res = count_w;
        for (int i = k; i < blocks.length(); i++) {
            if (blocks.charAt(i - k) == 'W') {
                count_w--;
            }
            if (blocks.charAt(i) == 'W') {
                count_w++;
            }
            res = Math.min(res, count_w);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minimumRecolors(string blocks, int k) {
        int count_w = 0;
        for (int i = 0; i < k; i++) {
            if (blocks[i] == 'W') {
                count_w++;
            }
        }

        int res = count_w;
        for (int i = k; i < blocks.size(); i++) {
            if (blocks[i - k] == 'W') {
                count_w--;
            }
            if (blocks[i] == 'W') {
                count_w++;
            }
            res = min(res, count_w);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} blocks
     * @param {number} k
     * @return {number}
     */
    minimumRecolors(blocks, k) {
        let count_w = 0;
        for (let i = 0; i < k; i++) {
            if (blocks[i] === 'W') {
                count_w++;
            }
        }

        let res = count_w;
        for (let i = k; i < blocks.length; i++) {
            if (blocks[i - k] === 'W') {
                count_w--;
            }
            if (blocks[i] === 'W') {
                count_w++;
            }
            res = Math.min(res, count_w);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinimumRecolors(string blocks, int k) {
        int count_w = 0;
        for (int i = 0; i < k; i++) {
            if (blocks[i] == 'W') {
                count_w++;
            }
        }

        int res = count_w;
        for (int i = k; i < blocks.Length; i++) {
            if (blocks[i - k] == 'W') {
                count_w--;
            }
            if (blocks[i] == 'W') {
                count_w++;
            }
            res = Math.Min(res, count_w);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$