## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Intervals** - Understanding interval representation as [start, end] pairs
- **Interval Overlap Detection** - Determining when two intervals overlap or are disjoint
- **Array Iteration** - Traversing a list of intervals and building a result list

---

## 1. Sweep Line, One Pass

### Intuition

Each interval in the input can relate to the removal interval in one of three ways: completely outside (no overlap), completely inside (fully removed), or partially overlapping.
If there is no overlap, we keep the interval unchanged.
If there is overlap, we need to preserve any portions that fall outside the removal range.
This could mean keeping a left portion, a right portion, or both if the removal interval sits in the middle.

### Algorithm

1. Extract `remove_start` and `remove_end` from `toBeRemoved`.
2. For each interval `[start, end]` in `intervals`:
   - If the interval has no overlap with the removal range (ends before it starts or starts after it ends), add it to the output as is.
   - Otherwise, check if there is a left portion to keep (`start < remove_start`) and add `[start, remove_start]`.
   - Check if there is a right portion to keep (`end > remove_end`) and add `[remove_end, end]`.
3. Return the resulting list of intervals.

::tabs-start

```python
class Solution:
    def removeInterval(self, intervals: List[List[int]], toBeRemoved: List[int]) -> List[List[int]]:

        remove_start, remove_end = toBeRemoved
        output = []

        for start, end in intervals:
            # If there are no overlaps, add the interval to the list as is.
            if start > remove_end or end < remove_start:
                output.append([start, end])
            else:
                # Is there a left interval we need to keep?
                if start < remove_start:
                    output.append([start, remove_start])
                # Is there a right interval we need to keep?
                if end > remove_end:
                    output.append([remove_end, end])

        return output
```

```java
class Solution {
    public List<List<Integer>> removeInterval(int[][] intervals, int[] toBeRemoved) {
        List<List<Integer>> result = new ArrayList<>();
        
        for (int[] interval : intervals) {
            // If there are no overlaps, add the interval to the list as is.
            if (interval[0] > toBeRemoved[1] || interval[1] < toBeRemoved[0]) {
                result.add(Arrays.asList(interval[0], interval[1]));
            } else {
                // Is there a left interval we need to keep?
                if (interval[0] < toBeRemoved[0]) {
                    result.add(Arrays.asList(interval[0], toBeRemoved[0]));
                }
                // Is there a right interval we need to keep?
                if (interval[1] > toBeRemoved[1]) {
                    result.add(Arrays.asList(toBeRemoved[1], interval[1]));
                }
            }
        }
        
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> removeInterval(vector<vector<int>>& intervals, vector<int>& toBeRemoved) {
        vector<vector<int>> result;
        
        for (auto& interval : intervals) {
            // If there are no overlaps, add the interval to the list as is.
            if (interval[0] > toBeRemoved[1] || interval[1] < toBeRemoved[0]) {
                result.push_back({interval[0], interval[1]});
            } else {
                // Is there a left interval we need to keep?
                if (interval[0] < toBeRemoved[0]) {
                    result.push_back({interval[0], toBeRemoved[0]});
                }
                // Is there a right interval we need to keep?
                if (interval[1] > toBeRemoved[1]) {
                    result.push_back({toBeRemoved[1], interval[1]});
                }
            }
        }
        
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} toBeRemoved
     * @return {number[][]}
     */
    removeInterval(intervals, toBeRemoved) {
        const result = [];

        for (const interval of intervals) {
            // If there are no overlaps, add the interval to the list as is.
            if (interval[0] > toBeRemoved[1] || interval[1] < toBeRemoved[0]) {
                result.push([interval[0], interval[1]]);
            } else {
                // Is there a left interval we need to keep?
                if (interval[0] < toBeRemoved[0]) {
                    result.push([interval[0], toBeRemoved[0]]);
                }
                // Is there a right interval we need to keep?
                if (interval[1] > toBeRemoved[1]) {
                    result.push([toBeRemoved[1], interval[1]]);
                }
            }
        }

        return result;
    }
}
```

```csharp
public class Solution {
    public IList<IList<int>> RemoveInterval(int[][] intervals, int[] toBeRemoved) {
        IList<IList<int>> result = new List<IList<int>>();

        foreach (var interval in intervals) {
            // If there are no overlaps, add the interval to the list as is.
            if (interval[0] > toBeRemoved[1] || interval[1] < toBeRemoved[0]) {
                result.Add(new List<int> { interval[0], interval[1] });
            } else {
                // Is there a left interval we need to keep?
                if (interval[0] < toBeRemoved[0]) {
                    result.Add(new List<int> { interval[0], toBeRemoved[0] });
                }
                // Is there a right interval we need to keep?
                if (interval[1] > toBeRemoved[1]) {
                    result.Add(new List<int> { toBeRemoved[1], interval[1] });
                }
            }
        }

        return result;
    }
}
```

```go
func removeInterval(intervals [][]int, toBeRemoved []int) [][]int {
    result := [][]int{}

    for _, interval := range intervals {
        // If there are no overlaps, add the interval to the list as is.
        if interval[0] > toBeRemoved[1] || interval[1] < toBeRemoved[0] {
            result = append(result, []int{interval[0], interval[1]})
        } else {
            // Is there a left interval we need to keep?
            if interval[0] < toBeRemoved[0] {
                result = append(result, []int{interval[0], toBeRemoved[0]})
            }
            // Is there a right interval we need to keep?
            if interval[1] > toBeRemoved[1] {
                result = append(result, []int{toBeRemoved[1], interval[1]})
            }
        }
    }

    return result
}
```

```kotlin
class Solution {
    fun removeInterval(intervals: Array<IntArray>, toBeRemoved: IntArray): List<List<Int>> {
        val result = mutableListOf<List<Int>>()

        for (interval in intervals) {
            // If there are no overlaps, add the interval to the list as is.
            if (interval[0] > toBeRemoved[1] || interval[1] < toBeRemoved[0]) {
                result.add(listOf(interval[0], interval[1]))
            } else {
                // Is there a left interval we need to keep?
                if (interval[0] < toBeRemoved[0]) {
                    result.add(listOf(interval[0], toBeRemoved[0]))
                }
                // Is there a right interval we need to keep?
                if (interval[1] > toBeRemoved[1]) {
                    result.add(listOf(toBeRemoved[1], interval[1]))
                }
            }
        }

        return result
    }
}
```

```swift
class Solution {
    func removeInterval(_ intervals: [[Int]], _ toBeRemoved: [Int]) -> [[Int]] {
        var result = [[Int]]()

        for interval in intervals {
            // If there are no overlaps, add the interval to the list as is.
            if interval[0] > toBeRemoved[1] || interval[1] < toBeRemoved[0] {
                result.append([interval[0], interval[1]])
            } else {
                // Is there a left interval we need to keep?
                if interval[0] < toBeRemoved[0] {
                    result.append([interval[0], toBeRemoved[0]])
                }
                // Is there a right interval we need to keep?
                if interval[1] > toBeRemoved[1] {
                    result.append([toBeRemoved[1], interval[1]])
                }
            }
        }

        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$ without considering $O(N)$ space for the output list.

>  Where $N$ is the number of intervals in `intervals`

---

## Common Pitfalls

### Using Wrong Comparison Operators for Overlap Detection

A frequent mistake is using `>=` or `<=` instead of `>` or `<` when checking for no overlap. The condition `start > remove_end or end < remove_start` correctly identifies non-overlapping intervals. Using `>=` or `<=` would incorrectly treat intervals that just touch the removal boundary as overlapping, leading to unnecessary splits or lost intervals.

### Forgetting to Handle Both Left and Right Portions

When an interval overlaps with the removal range, there can be zero, one, or two remaining portions. A common error is only checking for one side. You must independently check if `start < remove_start` (left portion exists) and if `end > remove_end` (right portion exists). An interval like `[1, 10]` with removal `[3, 7]` produces both `[1, 3]` and `[7, 10]`.

### Modifying the Original Interval List In-Place

Some developers try to modify the input list while iterating, which leads to index shifting issues or skipped elements. Instead, always build a new output list and append valid intervals or portions to it. This avoids off-by-one errors and makes the logic cleaner to reason about.
