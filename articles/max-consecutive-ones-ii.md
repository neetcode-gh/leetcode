## 1. Brute Force

::tabs-start

```python
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        longest_sequence = 0

        for left in range(len(nums)):
            num_zeroes = 0
            for right in range(left, len(nums)):   # Check every consecutive sequence
                if num_zeroes == 2:
                    break
                if nums[right] == 0:               # Count how many 0's
                    num_zeroes += 1
                if num_zeroes <= 1:                 # Update answer if it's valid
                    longest_sequence = max(longest_sequence, right - left + 1)

        return longest_sequence
```

```java
class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int longestSequence = 0;
        for (int left = 0; left < nums.length; left++) {
            int numZeroes = 0;

            //Check every consecutive sequence
            for (int right = left; right < nums.length; right++) {
                // Count how many 0's
                if (nums[right] == 0) {
                    numZeroes += 1;
                }
                // Update answer if it's valid
                if (numZeroes <= 1) {
                    longestSequence = Math.max(longestSequence, right - left + 1);
                }
            }
        }
        return longestSequence;
    }
}
```

```cpp
class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int longestSequence = 0;

        for (int left = 0; left < nums.size(); left++) {
            int numZeroes = 0;

            //Check every consecutive sequence
            for (int right = left; right < nums.size(); right++) {

                // Count how many 0's
                if (nums[right] == 0) {
                    numZeroes += 1;
                }

                // Update answer if it's valid
                if (numZeroes <= 1) {
                    longestSequence = max(longestSequence, right - left + 1);
                }
            }
        }

        return longestSequence;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMaxConsecutiveOnes(nums) {
        let longestSequence = 0;

        for (let left = 0; left < nums.length; left++) {
            let numZeroes = 0;

            //Check every consecutive sequence
            for (let right = left; right < nums.length; right++) {

                // Count how many 0's
                if (nums[right] === 0) {
                    numZeroes += 1;
                }

                // Update answer if it's valid
                if (numZeroes <= 1) {
                    longestSequence = Math.max(longestSequence, right - left + 1);
                }
            }
        }

        return longestSequence;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^2)$
- Space complexity: $O(1)$ constant space used

>  Where $n$ is the length of the input array `nums`.

---

## 2. Sliding Window

::tabs-start

```python
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        longest_sequence = 0
        left, right = 0, 0
        num_zeroes = 0

        while right < len(nums):   # While our window is in bounds
            if nums[right] == 0:    # Increase num_zeroes if the rightmost element is 0
                num_zeroes += 1

            while num_zeroes == 2:   # If our window is invalid, contract our window
                if nums[left] == 0:    
                    num_zeroes -= 1
                left += 1

            longest_sequence = max(longest_sequence, right - left + 1)   # Update our longest sequence answer
            right += 1   # Expand our window

        return longest_sequence
```

```java
class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int longestSequence = 0;
        int left = 0;
        int right = 0;
        int numZeroes = 0;

        // While our window is in bounds
        while (right < nums.length) {

            // Increase numZeroes if the rightmost element is 0
            if (nums[right] == 0) {
                numZeroes++;
            }

            //If our window is invalid, contract our window
            while (numZeroes == 2) {
                if (nums[left] == 0) {
                    numZeroes--;
                }
                left++;
            }

            // Update our longest sequence answer
            longestSequence = Math.max(longestSequence, right - left + 1);

            // Expand our window
            right++;
        }
        return longestSequence;
    }
}
```

```cpp
class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int longestSequence = 0;
        int left = 0;
        int right = 0;
        int numZeroes = 0;

        // While our window is in bounds
        while (right < nums.size()) {

            // Increase numZeroes if the rightmost element is 0
            if (nums[right] == 0) {
                numZeroes++;
            }

            //If our window is invalid, contract our window
            while (numZeroes == 2) {
                if (nums[left] == 0) {
                    numZeroes--;
                }
                left++;
            }

            // Update our longest sequence answer
            longestSequence = max(longestSequence, right - left + 1);

            // Expand our window
            right++;
        }

        return longestSequence;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMaxConsecutiveOnes(nums) {
        let longestSequence = 0;
        let left = 0;
        let right = 0;
        let numZeroes = 0;

        // While our window is in bounds
        while (right < nums.length) {

            // Increase numZeroes if the rightmost element is 0
            if (nums[right] === 0) {
                numZeroes++;
            }

            //If our window is invalid, contract our window
            while (numZeroes === 2) {
                if (nums[left] === 0) {
                    numZeroes--;
                }
                left++;
            }

            // Update our longest sequence answer
            longestSequence = Math.max(longestSequence, right - left + 1);

            // Expand our window
            right++;
        }

        return longestSequence;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ constant space used

>  Where $n$ is the length of the input array `nums`.
