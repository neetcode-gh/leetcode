## 1. Counting

### Intuition

Laser beams only form between adjacent rows that contain at least one security device. If one row has `a` devices and the next non-empty row has `b` devices, they form `a * b` beams. We track the count from the previous non-empty row and multiply it by the current row's count whenever we encounter a new row with devices.

### Algorithm

1. Initialize `prev` with the count of `'1'`s in the first row and `res` to zero.
2. For each subsequent row, count the number of `'1'`s (`curr`).
3. If `curr > 0`, add `prev * curr` to `res` and update `prev = curr`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def numberOfBeams(self, bank: List[str]) -> int:
        prev = bank[0].count("1")
        res = 0

        for i in range(1, len(bank)):
            curr = bank[i].count("1")
            if curr:
                res += prev * curr
                prev = curr

        return res
```

```java
public class Solution {
    public int numberOfBeams(String[] bank) {
        int prev = countOnes(bank[0]);
        int res = 0;

        for (int i = 1; i < bank.length; i++) {
            int curr = countOnes(bank[i]);
            if (curr > 0) {
                res += prev * curr;
                prev = curr;
            }
        }

        return res;
    }

    private int countOnes(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '1') count++;
        }
        return count;
    }
}
```

```cpp
class Solution {
public:
    int numberOfBeams(vector<string>& bank) {
        int prev = countOnes(bank[0]);
        int res = 0;

        for (int i = 1; i < bank.size(); i++) {
            int curr = countOnes(bank[i]);
            if (curr > 0) {
                res += prev * curr;
                prev = curr;
            }
        }

        return res;
    }

private:
    int countOnes(const string& s) {
        return count(s.begin(), s.end(), '1');
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} bank
     * @return {number}
     */
    numberOfBeams(bank) {
        const countOnes = (s) => {
            let cnt = 0;
            for (let c of s) {
                if (c === '1') cnt += 1;
            }
            return cnt;
        };

        let prev = countOnes(bank[0]);
        let res = 0;

        for (let i = 1; i < bank.length; i++) {
            let curr = countOnes(bank[i]);
            if (curr > 0) {
                res += prev * curr;
                prev = curr;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumberOfBeams(string[] bank) {
        int prev = CountOnes(bank[0]);
        int res = 0;

        for (int i = 1; i < bank.Length; i++) {
            int curr = CountOnes(bank[i]);
            if (curr > 0) {
                res += prev * curr;
                prev = curr;
            }
        }

        return res;
    }

    private int CountOnes(string s) {
        int count = 0;
        foreach (char c in s) {
            if (c == '1') count++;
        }
        return count;
    }
}
```

```go
func numberOfBeams(bank []string) int {
    countOnes := func(s string) int {
        count := 0
        for _, c := range s {
            if c == '1' {
                count++
            }
        }
        return count
    }

    prev := countOnes(bank[0])
    res := 0

    for i := 1; i < len(bank); i++ {
        curr := countOnes(bank[i])
        if curr > 0 {
            res += prev * curr
            prev = curr
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun numberOfBeams(bank: Array<String>): Int {
        fun countOnes(s: String): Int {
            return s.count { it == '1' }
        }

        var prev = countOnes(bank[0])
        var res = 0

        for (i in 1 until bank.size) {
            val curr = countOnes(bank[i])
            if (curr > 0) {
                res += prev * curr
                prev = curr
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func numberOfBeams(_ bank: [String]) -> Int {
        func countOnes(_ s: String) -> Int {
            return s.filter { $0 == "1" }.count
        }

        var prev = countOnes(bank[0])
        var res = 0

        for i in 1..<bank.count {
            let curr = countOnes(bank[i])
            if curr > 0 {
                res += prev * curr
                prev = curr
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns.
