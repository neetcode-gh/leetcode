## 1. Brute Force

### Intuition

The simplest approach is to try every possible starting position and extend the window as far as we can while allowing at most one zero to be flipped. For each starting index, we scan forward and count zeros. As long as we have seen at most one zero, the current window is valid. Once we encounter a second zero, we stop extending and record the maximum length found so far. This guarantees we consider all possible substrings but results in checking many overlapping ranges.

### Algorithm

1. Initialize `longestSequence` to track the maximum valid window length.
2. For each starting index `left`, iterate through the array with `right`:
   - Count zeros encountered so far.
   - If the count exceeds 1, stop expanding this window.
   - Otherwise, update `longestSequence` with the current window size.
3. Return `longestSequence`.

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

```csharp
public class Solution {
    public int FindMaxConsecutiveOnes(int[] nums) {
        int longestSequence = 0;

        for (int left = 0; left < nums.Length; left++) {
            int numZeroes = 0;

            for (int right = left; right < nums.Length; right++) {
                if (nums[right] == 0) {
                    numZeroes++;
                }

                if (numZeroes <= 1) {
                    longestSequence = Math.Max(longestSequence, right - left + 1);
                }
            }
        }

        return longestSequence;
    }
}
```

```go
func findMaxConsecutiveOnes(nums []int) int {
    longestSequence := 0

    for left := 0; left < len(nums); left++ {
        numZeroes := 0

        for right := left; right < len(nums); right++ {
            if nums[right] == 0 {
                numZeroes++
            }

            if numZeroes <= 1 {
                if right-left+1 > longestSequence {
                    longestSequence = right - left + 1
                }
            }
        }
    }

    return longestSequence
}
```

```kotlin
class Solution {
    fun findMaxConsecutiveOnes(nums: IntArray): Int {
        var longestSequence = 0

        for (left in nums.indices) {
            var numZeroes = 0

            for (right in left until nums.size) {
                if (nums[right] == 0) {
                    numZeroes++
                }

                if (numZeroes <= 1) {
                    longestSequence = maxOf(longestSequence, right - left + 1)
                }
            }
        }

        return longestSequence
    }
}
```

```swift
class Solution {
    func findMaxConsecutiveOnes(_ nums: [Int]) -> Int {
        var longestSequence = 0

        for left in 0..<nums.count {
            var numZeroes = 0

            for right in left..<nums.count {
                if nums[right] == 0 {
                    numZeroes += 1
                }

                if numZeroes <= 1 {
                    longestSequence = max(longestSequence, right - left + 1)
                }
            }
        }

        return longestSequence
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

### Intuition

Instead of restarting from every position, we can use a sliding window that grows and shrinks dynamically. The key insight is that we only need to shrink the window when we have more than one zero inside it. By maintaining a count of zeros in the current window, we expand by moving the right pointer and contract by moving the left pointer whenever the window becomes invalid. This way, each element is visited at most twice, making the solution linear.

### Algorithm

1. Initialize two pointers `left` and `right` at 0, along with `numZeroes` to track zeros in the window.
2. Expand the window by moving `right`:
   - If the element at `right` is 0, increment `numZeroes`.
3. While `numZeroes` equals 2 (window is invalid):
   - If the element at `left` is 0, decrement `numZeroes`.
   - Move `left` forward to shrink the window.
4. Update `longestSequence` with the current window size (`right - left + 1`).
5. Continue until `right` reaches the end, then return `longestSequence`.

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

```csharp
public class Solution {
    public int FindMaxConsecutiveOnes(int[] nums) {
        int longestSequence = 0;
        int left = 0;
        int right = 0;
        int numZeroes = 0;

        while (right < nums.Length) {
            if (nums[right] == 0) {
                numZeroes++;
            }

            while (numZeroes == 2) {
                if (nums[left] == 0) {
                    numZeroes--;
                }
                left++;
            }

            longestSequence = Math.Max(longestSequence, right - left + 1);
            right++;
        }

        return longestSequence;
    }
}
```

```go
func findMaxConsecutiveOnes(nums []int) int {
    longestSequence := 0
    left := 0
    right := 0
    numZeroes := 0

    for right < len(nums) {
        if nums[right] == 0 {
            numZeroes++
        }

        for numZeroes == 2 {
            if nums[left] == 0 {
                numZeroes--
            }
            left++
        }

        if right-left+1 > longestSequence {
            longestSequence = right - left + 1
        }
        right++
    }

    return longestSequence
}
```

```kotlin
class Solution {
    fun findMaxConsecutiveOnes(nums: IntArray): Int {
        var longestSequence = 0
        var left = 0
        var right = 0
        var numZeroes = 0

        while (right < nums.size) {
            if (nums[right] == 0) {
                numZeroes++
            }

            while (numZeroes == 2) {
                if (nums[left] == 0) {
                    numZeroes--
                }
                left++
            }

            longestSequence = maxOf(longestSequence, right - left + 1)
            right++
        }

        return longestSequence
    }
}
```

```swift
class Solution {
    func findMaxConsecutiveOnes(_ nums: [Int]) -> Int {
        var longestSequence = 0
        var left = 0
        var right = 0
        var numZeroes = 0

        while right < nums.count {
            if nums[right] == 0 {
                numZeroes += 1
            }

            while numZeroes == 2 {
                if nums[left] == 0 {
                    numZeroes -= 1
                }
                left += 1
            }

            longestSequence = max(longestSequence, right - left + 1)
            right += 1
        }

        return longestSequence
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ constant space used

>  Where $n$ is the length of the input array `nums`.
