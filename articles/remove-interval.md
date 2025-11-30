## 1.  Sweep Line, One Pass.

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$ without considering $O(N)$ space for the output list.

>  Where $N$ is the number of intervals in `intervals`
