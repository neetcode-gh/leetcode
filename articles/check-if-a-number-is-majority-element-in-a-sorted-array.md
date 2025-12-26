## 1. Frequency Count

::tabs-start

```python
class Solution:
    def isMajorityElement(self, nums: List[int], target: int) -> bool:
        count = 0
        for num in nums:
            count = count + 1 if num == target else count
        
        return count > len(nums) // 2
```

```java
class Solution {
    public boolean isMajorityElement(int[] nums, int target) {
        int count = 0;
        for (int num : nums) {
            count = num == target ? count + 1 : count;
        }
        
        return count > nums.length / 2;
    }
}
```

```cpp
class Solution {
public:
    bool isMajorityElement(vector<int>& nums, int target) {
        int count = 0;
        for (int num : nums) {
            count = num == target ? count + 1 : count;
        }
        
        return count > nums.size() / 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {boolean}
     */
    isMajorityElement(nums, target) {
        let count = 0;
        for (let num of nums) {
            count = num === target ? count + 1 : count;
        }
        
        return count > Math.floor(nums.length / 2);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$ constant space

>  Where $N$ is the size of `nums`.

---

## 2. Binary Search (Two Pass)

::tabs-start

```python
class Solution:
    def lower_bound(self, nums: List[int], target: int) -> int:
        """
        Returns the index of the first element equal to or greater than the target.
        If there is no instance of the target in the list, it returns the length of the list.
        """
        start = 0
        end = len(nums) - 1
        index = len(nums)
        
        while start <= end:
            mid = (start + end) // 2
            if nums[mid] >= target:
                end = mid - 1
                index = mid
            else:
                start = mid + 1
        
        return index
    
    def upper_bound(self, nums: List[int], target: int) -> int:
        """
        Returns the index of the first element greater than the target.
        If there is no instance of the target in the list, it returns the length of the list.
        """
        start = 0
        end = len(nums) - 1
        index = len(nums)
        
        while start <= end:
            mid = (start + end) // 2
            if nums[mid] > target:
                end = mid - 1
                index = mid
            else:
                start = mid + 1
        
        return index
    
    def isMajorityElement(self, nums: List[int], target: int) -> bool:
        first_index = self.lower_bound(nums, target)
        next_to_last_index = self.upper_bound(nums, target)
        return next_to_last_index - first_index > len(nums) // 2
```

```java
class Solution {
    // Returns the index of the first element equal to or greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int lower_bound(int[] nums, int target) {
        int start = 0;
        int end = nums.length - 1;
        int index = nums.length;
            
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    // Returns the index of the first element greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int upper_bound(int[] nums, int target) {
        int start = 0;
        int end = nums.length - 1;
        int index = nums.length;
        
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] > target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    public boolean isMajorityElement(int[] nums, int target) {
        int firstIndex = lower_bound(nums, target);
        int nextToLastIndex = upper_bound(nums, target);
        
        return nextToLastIndex - firstIndex > nums.length / 2;
    }
}
```

```cpp
class Solution {
public:
    // Returns the index of the first element equal to or greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int lower_bound(vector<int>& nums, int target) {
        int start = 0;
        int end = nums.size() - 1;
        int index = nums.size();
            
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    // Returns the index of the first element greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int upper_bound(vector<int>& nums, int target) {
        int start = 0;
        int end = nums.size() - 1;
        int index = nums.size();
        
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] > target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    bool isMajorityElement(vector<int>& nums, int target) {
        int firstIndex = lower_bound(nums, target);
        int nextToLastIndex = upper_bound(nums, target);
        
        return nextToLastIndex - firstIndex > nums.size() / 2;
    }
};
```

```javascript
class Solution {
    /**
     * Returns the index of the first element equal to or greater than the target.
     * If there is no instance of the target in the list, it returns the length of the list.
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    lowerBound(nums, target) {
        let start = 0;
        let end = nums.length - 1;
        let index = nums.length;
        
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    /**
     * Returns the index of the first element greater than the target.
     * If there is no instance of the target in the list, it returns the length of the list.
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    upperBound(nums, target) {
        let start = 0;
        let end = nums.length - 1;
        let index = nums.length;
        
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (nums[mid] > target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {boolean}
     */
    isMajorityElement(nums, target) {
        const firstIndex = this.lowerBound(nums, target);
        const nextToLastIndex = this.upperBound(nums, target);
        return nextToLastIndex - firstIndex > Math.floor(nums.length / 2);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log N)$
- Space complexity: $O(1)$  constant space

>  Where $N$ is the size of `nums`.

---

## 3. Binary Search (One Pass)

::tabs-start

```python
class Solution:
    def lower_bound(self, nums: List[int], target: int) -> int:
        """
        Returns the index of the first element that is equal to or greater than the target.
        If there is no instance of the target in the list, it returns the length of the list.
        """
        start = 0
        end = len(nums) - 1
        index = len(nums)
        
        while start <= end:
            mid = (start + end) // 2
            if nums[mid] >= target:
                end = mid - 1
                index = mid
            else:
                start = mid + 1
        
        return index
    
    def isMajorityElement(self, nums: List[int], target: int) -> bool:
        first_index = self.lower_bound(nums, target)
        return first_index + len(nums) // 2 < len(nums) and nums[first_index + len(nums) // 2] == target
```

```java
class Solution {
    // Returns the index of the first element that is equal to or greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int lower_bound(int[] nums, int target) {
        int start = 0;
        int end = nums.length - 1;
        int index = nums.length;
            
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    public boolean isMajorityElement(int[] nums, int target) {
        int firstIndex = lower_bound(nums, target);
        
        return firstIndex + nums.length / 2 < nums.length && nums[firstIndex + nums.length / 2] == target;
    }
}
```

```cpp
class Solution {
public:
    // Returns the index of the first element equal to or greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int lower_bound(vector<int>& nums, int target) {
        int start = 0;
        int end = nums.size() - 1;
        int index = nums.size();
            
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    bool isMajorityElement(vector<int>& nums, int target) {
        int firstIndex = lower_bound(nums, target);
        
        return firstIndex + nums.size() / 2 < nums.size() && nums[firstIndex + nums.size() / 2] == target;
    }
};
```

```javascript
class Solution {
    /**
     * Returns the index of the first element that is equal to or greater than the target.
     * If there is no instance of the target in the list, it returns the length of the list.
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    lowerBound(nums, target) {
        let start = 0;
        let end = nums.length - 1;
        let index = nums.length;
        
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {boolean}
     */
    isMajorityElement(nums, target) {
        const firstIndex = this.lowerBound(nums, target);
        return firstIndex + Math.floor(nums.length / 2) < nums.length && nums[firstIndex + Math.floor(nums.length / 2)] === target;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log N)$
- Space complexity: $O(1)$  constant space

>  Where $N$ is the size of `nums`.
