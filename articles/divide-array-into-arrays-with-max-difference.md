## 1. Sorting

### Intuition

To minimize the difference within each group of three, we should place elements that are close in value together. Sorting the array achieves this naturally. After sorting, we greedily form groups of three consecutive elements. For each group, we only need to check if the difference between the largest and smallest element (first and third in the triplet) is within `k`. If any group fails this check, no valid division exists.

### Algorithm

1. Sort the array in ascending order.
2. Iterate through the array in steps of 3.
3. For each group of three consecutive elements, check if `nums[i+2] - nums[i] > k`.
4. If the condition is violated, return an empty array.
5. Otherwise, add the triplet to the result.
6. Return the list of triplets.

::tabs-start

```python
class Solution:
    def divideArray(self, nums: List[int], k: int) -> List[List[int]]:
        nums.sort()
        res = []

        for i in range(0, len(nums), 3):
            if nums[i + 2] - nums[i] > k:
                return []
            res.append(nums[i: i + 3])

        return res
```

```java
public class Solution {
    public int[][] divideArray(int[] nums, int k) {
        Arrays.sort(nums);
        int[][] res = new int[nums.length / 3][3];

        for (int i = 0, idx = 0; i < nums.length; i += 3, idx++) {
            if (nums[i + 2] - nums[i] > k) {
                return new int[][]{};
            }
            res[idx][0] = nums[i];
            res[idx][1] = nums[i + 1];
            res[idx][2] = nums[i + 2];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> divideArray(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;

        for (int i = 0; i < nums.size(); i += 3) {
            if (nums[i + 2] - nums[i] > k) {
                return {};
            }
            res.push_back({nums[i], nums[i + 1], nums[i + 2]});
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[][]}
     */
    divideArray(nums, k) {
        nums.sort((a, b) => a - b);
        const res = [];

        for (let i = 0; i < nums.length; i += 3) {
            if (nums[i + 2] - nums[i] > k) {
                return [];
            }
            res.push([nums[i], nums[i + 1], nums[i + 2]]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] DivideArray(int[] nums, int k) {
        Array.Sort(nums);
        int[][] res = new int[nums.Length / 3][];

        for (int i = 0, idx = 0; i < nums.Length; i += 3, idx++) {
            if (nums[i + 2] - nums[i] > k) {
                return new int[][] {};
            }
            res[idx] = new int[] { nums[i], nums[i + 1], nums[i + 2] };
        }

        return res;
    }
}
```

```go
func divideArray(nums []int, k int) [][]int {
    sort.Ints(nums)
    res := [][]int{}

    for i := 0; i < len(nums); i += 3 {
        if nums[i+2]-nums[i] > k {
            return [][]int{}
        }
        res = append(res, []int{nums[i], nums[i+1], nums[i+2]})
    }

    return res
}
```

```kotlin
class Solution {
    fun divideArray(nums: IntArray, k: Int): Array<IntArray> {
        nums.sort()
        val res = mutableListOf<IntArray>()

        for (i in nums.indices step 3) {
            if (nums[i + 2] - nums[i] > k) {
                return emptyArray()
            }
            res.add(intArrayOf(nums[i], nums[i + 1], nums[i + 2]))
        }

        return res.toTypedArray()
    }
}
```

```swift
class Solution {
    func divideArray(_ nums: [Int], _ k: Int) -> [[Int]] {
        let nums = nums.sorted()
        var res = [[Int]]()

        for i in stride(from: 0, to: nums.count, by: 3) {
            if nums[i + 2] - nums[i] > k {
                return []
            }
            res.append([nums[i], nums[i + 1], nums[i + 2]])
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$ for the output array.

---

## 2. Counting Sort

### Intuition

When the range of values is bounded, counting sort can be faster than comparison-based sorting. We count occurrences of each number, then iterate through possible values in order, building groups of three. As we form each group, we verify that the difference between the smallest and largest element in the group does not exceed `k`.

### Algorithm

1. Find the maximum value in the array and create a count array.
2. Count the frequency of each number.
3. Iterate through numbers from 0 to the maximum.
4. For each number with remaining count, add it to the current group.
5. When the group reaches size 3, check if `group[2] - group[0] > k`. If so, return an empty array.
6. Otherwise, add the group to the result and start a new group.
7. Return all groups.

::tabs-start

```python
class Solution:
    def divideArray(self, nums: List[int], k: int) -> List[List[int]]:
        max_num = max(nums)
        count = [0] * (max_num + 1)
        for num in nums:
            count[num] += 1

        res = []
        group = []

        for num in range(max_num + 1):
            while count[num] > 0:
                group.append(num)
                count[num] -= 1

                if len(group) == 3:
                    if group[2] - group[0] > k:
                        return []
                    res.append(group)
                    group = []

        return res
```

```java
public class Solution {
    public int[][] divideArray(int[] nums, int k) {
        int max = 0;
        for (int num : nums) {
            max = Math.max(max, num);
        }

        int[] count = new int[max + 1];
        for (int num : nums) {
            count[num]++;
        }

        int[][] res = new int[nums.length / 3][3];
        int[] group = new int[3];
        int i = 0;

        for (int num = 0, idx = 0; num <= max; num++) {
            while (count[num] > 0) {
                group[i++] = num;
                count[num]--;

                if (i == 3) {
                    if (group[2] - group[0] > k) {
                        return new int[][]{};
                    }
                    for (int j = 0; j < 3; j++) {
                        res[idx][j] = group[j];
                    }
                    i = 0;
                    idx++;
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> divideArray(vector<int>& nums, int k) {
        int maxNum = *max_element(nums.begin(), nums.end());
        vector<int> count(maxNum + 1, 0);

        for (int& num : nums) {
            count[num]++;
        }

        vector<vector<int>> res;
        vector<int> group;

        for (int num = 0; num <= maxNum; num++) {
            while (count[num] > 0) {
                group.push_back(num);
                count[num]--;

                if (group.size() == 3) {
                    if (group[2] - group[0] > k) {
                        return {};
                    }
                    res.push_back(group);
                    group.clear();
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[][]}
     */
    divideArray(nums, k) {
        const max = Math.max(...nums);
        const count = new Array(max + 1).fill(0);

        for (const num of nums) {
            count[num]++;
        }

        const res = [];
        let group = [];

        for (let num = 0; num <= max; num++) {
            while (count[num] > 0) {
                group.push(num);
                count[num]--;

                if (group.length === 3) {
                    if (group[2] - group[0] > k) {
                        return [];
                    }
                    res.push(group);
                    group = [];
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] DivideArray(int[] nums, int k) {
        int max = 0;
        foreach (int num in nums) {
            max = Math.Max(max, num);
        }

        int[] count = new int[max + 1];
        foreach (int num in nums) {
            count[num]++;
        }

        int[][] res = new int[nums.Length / 3][];
        int[] group = new int[3];
        int i = 0, idx = 0;

        for (int num = 0; num <= max; num++) {
            while (count[num] > 0) {
                group[i++] = num;
                count[num]--;

                if (i == 3) {
                    if (group[2] - group[0] > k) {
                        return new int[][] {};
                    }
                    res[idx++] = new int[] { group[0], group[1], group[2] };
                    i = 0;
                }
            }
        }

        return res;
    }
}
```

```go
func divideArray(nums []int, k int) [][]int {
    maxNum := 0
    for _, num := range nums {
        if num > maxNum {
            maxNum = num
        }
    }

    count := make([]int, maxNum+1)
    for _, num := range nums {
        count[num]++
    }

    res := [][]int{}
    group := []int{}

    for num := 0; num <= maxNum; num++ {
        for count[num] > 0 {
            group = append(group, num)
            count[num]--

            if len(group) == 3 {
                if group[2]-group[0] > k {
                    return [][]int{}
                }
                res = append(res, group)
                group = []int{}
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun divideArray(nums: IntArray, k: Int): Array<IntArray> {
        val maxNum = nums.max()
        val count = IntArray(maxNum + 1)

        for (num in nums) {
            count[num]++
        }

        val res = mutableListOf<IntArray>()
        val group = mutableListOf<Int>()

        for (num in 0..maxNum) {
            while (count[num] > 0) {
                group.add(num)
                count[num]--

                if (group.size == 3) {
                    if (group[2] - group[0] > k) {
                        return emptyArray()
                    }
                    res.add(group.toIntArray())
                    group.clear()
                }
            }
        }

        return res.toTypedArray()
    }
}
```

```swift
class Solution {
    func divideArray(_ nums: [Int], _ k: Int) -> [[Int]] {
        let maxNum = nums.max()!
        var count = [Int](repeating: 0, count: maxNum + 1)

        for num in nums {
            count[num] += 1
        }

        var res = [[Int]]()
        var group = [Int]()

        for num in 0...maxNum {
            while count[num] > 0 {
                group.append(num)
                count[num] -= 1

                if group.count == 3 {
                    if group[2] - group[0] > k {
                        return []
                    }
                    res.append(group)
                    group = []
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum element in $nums$.
