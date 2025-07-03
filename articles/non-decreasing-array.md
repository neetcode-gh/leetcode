## 1. Greedy

::tabs-start

```python
class Solution:
    def checkPossibility(self, nums: list[int]) -> bool:
        changed = False

        for i in range(len(nums) - 1):
            if nums[i] <= nums[i + 1]:
                continue
            if changed:
                return False
            if i == 0 or nums[i + 1] >= nums[i - 1]:
                nums[i] = nums[i + 1]
            else:
                nums[i + 1] = nums[i]
            changed = True
        return True
```

```java
public class Solution {
    public boolean checkPossibility(int[] nums) {
        boolean changed = false;

        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] <= nums[i + 1]) {
                continue;
            }
            if (changed) {
                return false;
            }
            if (i == 0 || nums[i + 1] >= nums[i - 1]) {
                nums[i] = nums[i + 1];
            } else {
                nums[i + 1] = nums[i];
            }
            changed = true;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool checkPossibility(vector<int>& nums) {
        bool changed = false;

        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] <= nums[i + 1]) {
                continue;
            }
            if (changed) {
                return false;
            }
            if (i == 0 || nums[i + 1] >= nums[i - 1]) {
                nums[i] = nums[i + 1];
            } else {
                nums[i + 1] = nums[i];
            }
            changed = true;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    checkPossibility(nums) {
        let changed = false;

        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] <= nums[i + 1]) {
                continue;
            }
            if (changed) {
                return false;
            }
            if (i === 0 || nums[i + 1] >= nums[i - 1]) {
                nums[i] = nums[i + 1];
            } else {
                nums[i + 1] = nums[i];
            }
            changed = true;
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
