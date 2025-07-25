## 1. Convert To Strings + Sorting

::tabs-start

```python
class Solution:
    def sortJumbled(self, mapping: List[int], nums: List[int]) -> List[int]:
        pairs = []

        for i, n in enumerate(nums):
            n = str(n)
            mapped_n = 0
            for c in n:
                mapped_n *= 10
                mapped_n += mapping[int(c)]
            pairs.append((mapped_n, i))

        pairs.sort()
        return [nums[p[1]] for p in pairs]
```

```java
public class Solution {
    public int[] sortJumbled(int[] mapping, int[] nums) {
        int n = nums.length;
        int[][] pairs = new int[n][2];

        for (int i = 0; i < n; i++) {
            String numStr = String.valueOf(nums[i]);
            int mapped_n = 0;
            for (char c : numStr.toCharArray()) {
                mapped_n = mapped_n * 10 + mapping[c - '0'];
            }
            pairs[i][0] = mapped_n;
            pairs[i][1] = i;
        }

        Arrays.sort(pairs, (a, b) -> a[0] - b[0]);

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            res[i] = nums[pairs[i][1]];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortJumbled(vector<int>& mapping, vector<int>& nums) {
        vector<pair<int, int>> pairs;

        for (int i = 0; i < nums.size(); ++i) {
            string numStr = to_string(nums[i]);
            int mapped_n = 0;
            for (char c : numStr) {
                mapped_n = mapped_n * 10 + mapping[c - '0'];
            }
            pairs.push_back({mapped_n, i});
        }

        sort(pairs.begin(), pairs.end());

        vector<int> res;
        for (auto& p : pairs) {
            res.push_back(nums[p.second]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} mapping
     * @param {number[]} nums
     * @return {number[]}
     */
    sortJumbled(mapping, nums) {
        let pairs = [];

        for (let i = 0; i < nums.length; i++) {
            let numStr = nums[i].toString();
            let mapped_n = 0;
            for (let c of numStr) {
                mapped_n = mapped_n * 10 + mapping[parseInt(c)];
            }
            pairs.push([mapped_n, i]);
        }

        pairs.sort((a, b) => a[0] - b[0]);

        return pairs.map((p) => nums[p[1]]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Iterate On Numbers + Sorting

::tabs-start

```python
class Solution:
    def sortJumbled(self, mapping: List[int], nums: List[int]) -> List[int]:
        pairs = []

        for i, n in enumerate(nums):
            mapped_n = 0
            base = 1

            if n == 0:
                mapped_n = mapping[0]
            else:
                while n > 0:
                    digit = n % 10
                    n //= 10
                    mapped_n += base * mapping[digit]
                    base *= 10

            pairs.append((mapped_n, i))

        pairs.sort()
        return [nums[p[1]] for p in pairs]
```

```java
public class Solution {
    public int[] sortJumbled(int[] mapping, int[] nums) {
        int n = nums.length;
        int[][] pairs = new int[n][2];

        for (int i = 0; i < n; i++) {
            int mapped_n = 0, base = 1;
            int num = nums[i];

            if (num == 0) {
                mapped_n = mapping[0];
            } else {
                while (num > 0) {
                    int digit = num % 10;
                    num /= 10;
                    mapped_n += base * mapping[digit];
                    base *= 10;
                }
            }

            pairs[i][0] = mapped_n;
            pairs[i][1] = i;
        }

        Arrays.sort(pairs, (a, b) -> Integer.compare(a[0], b[0]));

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            res[i] = nums[pairs[i][1]];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortJumbled(vector<int>& mapping, vector<int>& nums) {
        vector<pair<int, int>> pairs;

        for (int i = 0; i < nums.size(); i++) {
            int mapped_n = 0, base = 1;
            int num = nums[i];

            if (num == 0) {
                mapped_n = mapping[0];
            } else {
                while (num > 0) {
                    int digit = num % 10;
                    num /= 10;
                    mapped_n += base * mapping[digit];
                    base *= 10;
                }
            }

            pairs.push_back({mapped_n, i});
        }

        sort(pairs.begin(), pairs.end());

        vector<int> res;
        for (auto& p : pairs) {
            res.push_back(nums[p.second]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} mapping
     * @param {number[]} nums
     * @return {number[]}
     */
    sortJumbled(mapping, nums) {
        let pairs = [];

        for (let i = 0; i < nums.length; i++) {
            let numStr = nums[i].toString();
            let mapped_n = 0;
            for (let c of numStr) {
                mapped_n = mapped_n * 10 + mapping[parseInt(c)];
            }
            pairs.push([mapped_n, i]);
        }

        pairs.sort((a, b) => a[0] - b[0]);

        return pairs.map((p) => nums[p[1]]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
