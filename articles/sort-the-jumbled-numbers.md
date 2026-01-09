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

```csharp
public class Solution {
    public int[] SortJumbled(int[] mapping, int[] nums) {
        int n = nums.Length;
        int[][] pairs = new int[n][];

        for (int i = 0; i < n; i++) {
            string numStr = nums[i].ToString();
            int mapped_n = 0;
            foreach (char c in numStr) {
                mapped_n = mapped_n * 10 + mapping[c - '0'];
            }
            pairs[i] = new int[] { mapped_n, i };
        }

        Array.Sort(pairs, (a, b) => a[0].CompareTo(b[0]));

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            res[i] = nums[pairs[i][1]];
        }

        return res;
    }
}
```

```go
func sortJumbled(mapping []int, nums []int) []int {
    n := len(nums)
    pairs := make([][2]int, n)

    for i, num := range nums {
        numStr := strconv.Itoa(num)
        mapped_n := 0
        for _, c := range numStr {
            mapped_n = mapped_n*10 + mapping[c-'0']
        }
        pairs[i] = [2]int{mapped_n, i}
    }

    sort.Slice(pairs, func(i, j int) bool {
        return pairs[i][0] < pairs[j][0]
    })

    res := make([]int, n)
    for i, p := range pairs {
        res[i] = nums[p[1]]
    }

    return res
}
```

```kotlin
class Solution {
    fun sortJumbled(mapping: IntArray, nums: IntArray): IntArray {
        val n = nums.size
        val pairs = Array(n) { intArrayOf(0, 0) }

        for (i in 0 until n) {
            val numStr = nums[i].toString()
            var mapped_n = 0
            for (c in numStr) {
                mapped_n = mapped_n * 10 + mapping[c - '0']
            }
            pairs[i] = intArrayOf(mapped_n, i)
        }

        pairs.sortBy { it[0] }

        return IntArray(n) { nums[pairs[it][1]] }
    }
}
```

```swift
class Solution {
    func sortJumbled(_ mapping: [Int], _ nums: [Int]) -> [Int] {
        let n = nums.count
        var pairs = [(Int, Int)]()

        for i in 0..<n {
            let numStr = String(nums[i])
            var mapped_n = 0
            for c in numStr {
                mapped_n = mapped_n * 10 + mapping[Int(String(c))!]
            }
            pairs.append((mapped_n, i))
        }

        pairs.sort { $0.0 < $1.0 }

        return pairs.map { nums[$0.1] }
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

```csharp
public class Solution {
    public int[] SortJumbled(int[] mapping, int[] nums) {
        int n = nums.Length;
        int[][] pairs = new int[n][];

        for (int i = 0; i < n; i++) {
            int mapped_n = 0, base_val = 1;
            int num = nums[i];

            if (num == 0) {
                mapped_n = mapping[0];
            } else {
                while (num > 0) {
                    int digit = num % 10;
                    num /= 10;
                    mapped_n += base_val * mapping[digit];
                    base_val *= 10;
                }
            }

            pairs[i] = new int[] { mapped_n, i };
        }

        Array.Sort(pairs, (a, b) => a[0].CompareTo(b[0]));

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            res[i] = nums[pairs[i][1]];
        }

        return res;
    }
}
```

```go
func sortJumbled(mapping []int, nums []int) []int {
    n := len(nums)
    pairs := make([][2]int, n)

    for i, num := range nums {
        mapped_n, base := 0, 1

        if num == 0 {
            mapped_n = mapping[0]
        } else {
            for num > 0 {
                digit := num % 10
                num /= 10
                mapped_n += base * mapping[digit]
                base *= 10
            }
        }

        pairs[i] = [2]int{mapped_n, i}
    }

    sort.Slice(pairs, func(i, j int) bool {
        return pairs[i][0] < pairs[j][0]
    })

    res := make([]int, n)
    for i, p := range pairs {
        res[i] = nums[p[1]]
    }

    return res
}
```

```kotlin
class Solution {
    fun sortJumbled(mapping: IntArray, nums: IntArray): IntArray {
        val n = nums.size
        val pairs = Array(n) { intArrayOf(0, 0) }

        for (i in 0 until n) {
            var mapped_n = 0
            var base = 1
            var num = nums[i]

            if (num == 0) {
                mapped_n = mapping[0]
            } else {
                while (num > 0) {
                    val digit = num % 10
                    num /= 10
                    mapped_n += base * mapping[digit]
                    base *= 10
                }
            }

            pairs[i] = intArrayOf(mapped_n, i)
        }

        pairs.sortBy { it[0] }

        return IntArray(n) { nums[pairs[it][1]] }
    }
}
```

```swift
class Solution {
    func sortJumbled(_ mapping: [Int], _ nums: [Int]) -> [Int] {
        let n = nums.count
        var pairs = [(Int, Int)]()

        for i in 0..<n {
            var mapped_n = 0
            var base = 1
            var num = nums[i]

            if num == 0 {
                mapped_n = mapping[0]
            } else {
                while num > 0 {
                    let digit = num % 10
                    num /= 10
                    mapped_n += base * mapping[digit]
                    base *= 10
                }
            }

            pairs.append((mapped_n, i))
        }

        pairs.sort { $0.0 < $1.0 }

        return pairs.map { nums[$0.1] }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
