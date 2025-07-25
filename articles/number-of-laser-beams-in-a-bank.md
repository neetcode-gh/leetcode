## 1. Counting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns.
