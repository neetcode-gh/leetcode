## 1. Greedy

### Intuition

When we find a "violation" where `nums[i] > nums[i + 1]`, we need to fix it by modifying one element. The key insight is deciding which element to change. We have two options: decrease `nums[i]` to match `nums[i + 1]`, or increase `nums[i + 1]` to match `nums[i]`. The greedy choice is to prefer decreasing `nums[i]` when possible, because a smaller value is less likely to cause future violations. However, we can only do this if `nums[i + 1]` is at least as large as `nums[i - 1]` (the element before the violation). Otherwise, we must increase `nums[i + 1]`. If we encounter more than one violation, the answer is `false`.

### Algorithm

1. Track whether we have already made a modification using a boolean flag `changed`.
2. Iterate through the array comparing adjacent pairs.
3. If `nums[i] <= nums[i + 1]`, the pair is valid, so continue.
4. If we find a violation (`nums[i] > nums[i + 1]`) and `changed` is already `true`, return `false`.
5. Otherwise, decide how to fix the violation:
   - If `i == 0` or `nums[i + 1] >= nums[i - 1]`, set `nums[i] = nums[i + 1]` (decrease the larger element).
   - Otherwise, set `nums[i + 1] = nums[i]` (increase the smaller element).
6. Mark `changed` as `true`.
7. If we complete the loop without returning `false`, return `true`.

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

```csharp
public class Solution {
    public bool CheckPossibility(int[] nums) {
        bool changed = false;

        for (int i = 0; i < nums.Length - 1; i++) {
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

```go
func checkPossibility(nums []int) bool {
    changed := false

    for i := 0; i < len(nums)-1; i++ {
        if nums[i] <= nums[i+1] {
            continue
        }
        if changed {
            return false
        }
        if i == 0 || nums[i+1] >= nums[i-1] {
            nums[i] = nums[i+1]
        } else {
            nums[i+1] = nums[i]
        }
        changed = true
    }
    return true
}
```

```kotlin
class Solution {
    fun checkPossibility(nums: IntArray): Boolean {
        var changed = false

        for (i in 0 until nums.size - 1) {
            if (nums[i] <= nums[i + 1]) {
                continue
            }
            if (changed) {
                return false
            }
            if (i == 0 || nums[i + 1] >= nums[i - 1]) {
                nums[i] = nums[i + 1]
            } else {
                nums[i + 1] = nums[i]
            }
            changed = true
        }
        return true
    }
}
```

```swift
class Solution {
    func checkPossibility(_ nums: [Int]) -> Bool {
        var nums = nums
        var changed = false

        for i in 0..<(nums.count - 1) {
            if nums[i] <= nums[i + 1] {
                continue
            }
            if changed {
                return false
            }
            if i == 0 || nums[i + 1] >= nums[i - 1] {
                nums[i] = nums[i + 1]
            } else {
                nums[i + 1] = nums[i]
            }
            changed = true
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
