## 1. Linear Scan

::tabs-start

```python
class Solution:
    def findMissingRanges(
        self, nums: List[int], lower: int, upper: int
    ) -> List[List[int]]:
        n = len(nums)
        missing_ranges = []
        if n == 0:
            missing_ranges.append([lower, upper])
            return missing_ranges

        # Check for any missing numbers between the lower bound and nums[0].
        if lower < nums[0]:
            missing_ranges.append([lower, nums[0] - 1])

        # Check for any missing numbers between successive elements of nums.
        for i in range(n - 1):
            if nums[i + 1] - nums[i] <= 1:
                continue
            missing_ranges.append([nums[i] + 1, nums[i + 1] - 1])

        # Check for any missing numbers between the last element of nums and the upper bound.
        if upper > nums[n - 1]:
            missing_ranges.append([nums[n - 1] + 1, upper])

        return missing_ranges
```

```java
class Solution {
    public List<List<Integer>> findMissingRanges(
        int[] nums,
        int lower,
        int upper
    ) {
        int n = nums.length;
        List<List<Integer>> missingRanges = new ArrayList<>();

        if (n == 0) {
            missingRanges.add(Arrays.asList(lower, upper));
            return missingRanges;
        }
        // Check for any missing numbers between the lower bound and nums[0].
        if (lower < nums[0]) {
            missingRanges.add(Arrays.asList(lower, nums[0] - 1));
        }

        // Check for any missing numbers between successive elements of nums.
        for (int i = 0; i < n - 1; i++) {
            if (nums[i + 1] - nums[i] <= 1) {
                continue;
            }
            missingRanges.add(Arrays.asList(nums[i] + 1, nums[i + 1] - 1));
        }

        // Check for any missing numbers between the last element of nums and the upper bound.
        if (upper > nums[n - 1]) {
            missingRanges.add(Arrays.asList(nums[n - 1] + 1, upper));
        }

        return missingRanges;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findMissingRanges(vector<int>& nums, int lower,
                                          int upper) {
        int n = nums.size();
        vector<vector<int>> missingRanges;
        if (n == 0) {
            missingRanges.push_back(vector<int>{lower, upper});
            return missingRanges;
        }

        // Check for any missing numbers between the lower bound and nums[0].
        if (lower < nums[0]) {
            missingRanges.push_back(vector<int>{lower, nums[0] - 1});
        }

        // Check for any missing numbers between successive elements of nums.
        for (int i = 0; i < n - 1; i++) {
            if (nums[i + 1] - nums[i] <= 1) {
                continue;
            }
            missingRanges.push_back(vector<int>{nums[i] + 1, nums[i + 1] - 1});
        }

        // Check for any missing numbers between the last element of nums and
        // the upper bound.
        if (upper > nums[n - 1]) {
            missingRanges.push_back(vector<int>{nums[n - 1] + 1, upper});
        }

        return missingRanges;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} lower
     * @param {number} upper
     * @return {number[][]}
     */
    findMissingRanges(nums, lower, upper) {
        let n = nums.length;
        let missingRanges = [];
        if (n === 0) {
            missingRanges.push([lower, upper]);
            return missingRanges;
        }

        // Check for any missing numbers between the lower bound and nums[0].
        if (lower < nums[0]) {
            missingRanges.push([lower, nums[0] - 1]);
        }

        // Check for any missing numbers between successive elements of nums.
        for (let i = 0; i < n - 1; i++) {
            if (nums[i + 1] - nums[i] <= 1) {
                continue;
            }
            missingRanges.push([nums[i] + 1, nums[i + 1] - 1]);
        }

        // Check for any missing numbers between the last element of nums and the upper bound.
        if (upper > nums[n - 1]) {
            missingRanges.push([nums[n - 1] + 1, upper]);
        }

        return missingRanges;
    }
}
```

```csharp
public class Solution {
    public IList<IList<int>> FindMissingRanges(int[] nums, int lower, int upper) {
        int n = nums.Length;
        IList<IList<int>> missingRanges = new List<IList<int>>();

        if (n == 0) {
            missingRanges.Add(new List<int> { lower, upper });
            return missingRanges;
        }

        // Check for any missing numbers between the lower bound and nums[0].
        if (lower < nums[0]) {
            missingRanges.Add(new List<int> { lower, nums[0] - 1 });
        }

        // Check for any missing numbers between successive elements of nums.
        for (int i = 0; i < n - 1; i++) {
            if (nums[i + 1] - nums[i] <= 1) {
                continue;
            }
            missingRanges.Add(new List<int> { nums[i] + 1, nums[i + 1] - 1 });
        }

        // Check for any missing numbers between the last element of nums and the upper bound.
        if (upper > nums[n - 1]) {
            missingRanges.Add(new List<int> { nums[n - 1] + 1, upper });
        }

        return missingRanges;
    }
}
```

```go
func findMissingRanges(nums []int, lower int, upper int) [][]int {
    n := len(nums)
    missingRanges := [][]int{}

    if n == 0 {
        missingRanges = append(missingRanges, []int{lower, upper})
        return missingRanges
    }

    // Check for any missing numbers between the lower bound and nums[0].
    if lower < nums[0] {
        missingRanges = append(missingRanges, []int{lower, nums[0] - 1})
    }

    // Check for any missing numbers between successive elements of nums.
    for i := 0; i < n-1; i++ {
        if nums[i+1]-nums[i] <= 1 {
            continue
        }
        missingRanges = append(missingRanges, []int{nums[i] + 1, nums[i+1] - 1})
    }

    // Check for any missing numbers between the last element of nums and the upper bound.
    if upper > nums[n-1] {
        missingRanges = append(missingRanges, []int{nums[n-1] + 1, upper})
    }

    return missingRanges
}
```

```kotlin
class Solution {
    fun findMissingRanges(nums: IntArray, lower: Int, upper: Int): List<List<Int>> {
        val n = nums.size
        val missingRanges = mutableListOf<List<Int>>()

        if (n == 0) {
            missingRanges.add(listOf(lower, upper))
            return missingRanges
        }

        // Check for any missing numbers between the lower bound and nums[0].
        if (lower < nums[0]) {
            missingRanges.add(listOf(lower, nums[0] - 1))
        }

        // Check for any missing numbers between successive elements of nums.
        for (i in 0 until n - 1) {
            if (nums[i + 1] - nums[i] <= 1) {
                continue
            }
            missingRanges.add(listOf(nums[i] + 1, nums[i + 1] - 1))
        }

        // Check for any missing numbers between the last element of nums and the upper bound.
        if (upper > nums[n - 1]) {
            missingRanges.add(listOf(nums[n - 1] + 1, upper))
        }

        return missingRanges
    }
}
```

```swift
class Solution {
    func findMissingRanges(_ nums: [Int], _ lower: Int, _ upper: Int) -> [[Int]] {
        let n = nums.count
        var missingRanges = [[Int]]()

        if n == 0 {
            missingRanges.append([lower, upper])
            return missingRanges
        }

        // Check for any missing numbers between the lower bound and nums[0].
        if lower < nums[0] {
            missingRanges.append([lower, nums[0] - 1])
        }

        // Check for any missing numbers between successive elements of nums.
        for i in 0..<(n - 1) {
            if nums[i + 1] - nums[i] <= 1 {
                continue
            }
            missingRanges.append([nums[i] + 1, nums[i + 1] - 1])
        }

        // Check for any missing numbers between the last element of nums and the upper bound.
        if upper > nums[n - 1] {
            missingRanges.append([nums[n - 1] + 1, upper])
        }

        return missingRanges
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the number of elements in `nums`.
