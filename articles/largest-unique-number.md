## 1. Sorting

::tabs-start

```python
class Solution:
    def largestUniqueNumber(self, nums: List[int]) -> int:
        n = len(nums)

        # If there's only one element, it's unique by default
        if n == 1:
            return nums[0]

        nums.sort(reverse=True)

        # Start from the beginning (largest numbers)
        currentIndex = 0

        while currentIndex < n:
            # If it's the first element or different from the next one, it's unique
            if (
                currentIndex == n - 1
                or nums[currentIndex] != nums[currentIndex + 1]
            ):
                return nums[currentIndex]
            # Skip duplicates
            while (
                currentIndex < n - 1
                and nums[currentIndex] == nums[currentIndex + 1]
            ):
                currentIndex += 1
            # Move to the next unique number
            currentIndex += 1

        return -1
```

```java
class Solution {
    public int largestUniqueNumber(int[] nums) {
        int n = nums.length;

        // If there's only one element, it's unique by default
        if (n == 1) {
            return nums[0];
        }

        Arrays.sort(nums);

        // Start from the end (largest numbers)
        int currentIndex = n - 1;

        while (currentIndex >= 0) {
            // If it's the first element or different from the previous one, it's unique
            if (
                currentIndex == 0 ||
                nums[currentIndex] != nums[currentIndex - 1]
            ) {
                return nums[currentIndex];
            }

            // Skip duplicates
            while (
                currentIndex > 0 && nums[currentIndex] == nums[currentIndex - 1]
            ) {
                currentIndex--;
            }

            // Move to the next unique number
            currentIndex--;
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int largestUniqueNumber(vector<int>& nums) {
        int n = nums.size();

        // If there's only one element, it's unique by default
        if (n == 1) {
            return nums[0];
        }

        sort(nums.begin(), nums.end(), greater<int>());

        // Start from the beginning (largest numbers)
        int currentIndex = 0;

        while (currentIndex < n) {
            // If it's the last element or different from the next one,
            // it's unique
            if (currentIndex == n - 1 ||
                nums[currentIndex] != nums[currentIndex + 1]) {
                return nums[currentIndex];
            }

            // Skip duplicates
            while (currentIndex < n - 1 &&
                   nums[currentIndex] == nums[currentIndex + 1]) {
                currentIndex++;
            }

            // Move to the next unique number
            currentIndex++;
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    largestUniqueNumber(nums) {
        const n = nums.length;
        
        // If there's only one element, it's unique by default
        if (n === 1) {
            return nums[0];
        }
        
        nums.sort((a, b) => b - a);
        
        // Start from the beginning (largest numbers)
        let currentIndex = 0;
        
        while (currentIndex < n) {
            // If it's the first element or different from the next one, it's unique
            if (
                currentIndex === n - 1
                || nums[currentIndex] !== nums[currentIndex + 1]
            ) {
                return nums[currentIndex];
            }
            
            // Skip duplicates
            while (
                currentIndex < n - 1
                && nums[currentIndex] === nums[currentIndex + 1]
            ) {
                currentIndex++;
            }
            
            // Move to the next unique number
            currentIndex++;
        }
        
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log n)$
- Space complexity: $O(S)$ Depends on the language of implementation

>  Where $n$ is the length of the `nums` array and $S$ is the sorting algorthm

---

## 2. Sorted Map

::tabs-start

```python
class Solution:
    def largestUniqueNumber(self, nums: List[int]) -> int:
        # Create a frequency map
        frequency_map = {}
        for num in nums:
            frequency_map[num] = frequency_map.get(num, 0) + 1

        # Create a sorted OrderedDict
        sorted_map = OrderedDict(sorted(frequency_map.items(), reverse=True))

        # Find the largest unique number
        for num, freq in sorted_map.items():
            if freq == 1:
                return num

        return -1
```

```java
class Solution {
    public int largestUniqueNumber(int[] nums) {
        // Use a TreeMap to store numbers and their frequencies
        TreeMap<Integer, Integer> frequencyMap = new TreeMap<>();

        // Populate the frequencyMap
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        // Initialize the result to -1 (default if no unique number is found)
        int largestUnique = -1;

        // Iterate through the map in reverse order (largest to smallest)
        for (Integer num : frequencyMap.descendingKeySet()) {
            // If the frequency is 1, we've found our largest unique number
            if (frequencyMap.get(num) == 1) {
                largestUnique = num;
                break;
            }
        }

        return largestUnique;
    }
}
```

```cpp
class Solution {
public:
    int largestUniqueNumber(vector<int>& nums) {
        // Use a map to store numbers and their frequencies
        map<int, int> frequencyMap;

        // Populate the frequencyMap
        for (int num : nums) {
            frequencyMap[num]++;
        }

        // Initialize the result to -1 (default if no unique number is found)
        int largestUnique = -1;

        // Iterate through the map in reverse order (largest to smallest)
        for (auto it = frequencyMap.rbegin(); it != frequencyMap.rend(); ++it) {
            // If the frequency is 1, we've found our largest unique number
            if (it->second == 1) {
                largestUnique = it->first;
                break;
            }
        }

        return largestUnique;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    largestUniqueNumber(nums) {
        // Create a frequency map
        const frequencyMap = {};
        for (const num of nums) {
            frequencyMap[num] = (frequencyMap[num] || 0) + 1;
        }

        // Create a sorted OrderedDict
        const sortedMap = new Map(
            Object.entries(frequencyMap).sort((a, b) => b[0] - a[0])
        );

        // Find the largest unique number
        for (const [num, freq] of sortedMap) {
            if (freq === 1) {
                return Number(num);
            }
        }
        
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log n)$
- Space complexity: $O(n)$


>  Where $n$ is the length of the `nums` array.

---

## 3. Map

::tabs-start

```python
class Solution:
    def largestUniqueNumber(self, nums: List[int]) -> int:
        # Use Counter to count frequencies of numbers
        frequency_map = Counter(nums)

        # Find the largest number with frequency 1, or -1 if none found
        return max(
            (num for num, freq in frequency_map.items() if freq == 1),
            default=-1,
        )
```

```java
class Solution {
    public int largestUniqueNumber(int[] nums) {
        // Create a HashMap to store the frequency of each number
        Map<Integer, Integer> frequencyMap = new HashMap<>();

        // Populate the frequencyMap
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        // Initialize the result to -1 (default if no unique number is found)
        int largestUnique = -1;

        for (int num : frequencyMap.keySet()) {
            // Check if the number appears only once and is larger than the current largestUnique
            if (frequencyMap.get(num) == 1 && num > largestUnique) {
                largestUnique = num;
            }
        }

        return largestUnique;
    }
}
```

```cpp
class Solution {
public:
    int largestUniqueNumber(vector<int>& nums) {
        // Create an unordered_map to store the frequency of each number
        unordered_map<int, int> frequencyMap;

        // Populate the frequencyMap
        for (int num : nums) {
            frequencyMap[num]++;
        }

        // Initialize the result to -1 (default if no unique number is found)
        int largestUnique = -1;

        for (auto& pair : frequencyMap) {
            // Check if the number appears only once and is larger than the
            // current largestUnique
            if (pair.second == 1 && pair.first > largestUnique) {
                largestUnique = pair.first;
            }
        }

        return largestUnique;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    largestUniqueNumber(nums) {
        // Create a HashMap to store the frequency of each number
        const frequencyMap = new Map();

        // Populate the frequencyMap
        for (const num of nums) {
            frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
        }

        // Initialize the result to -1 (default if no unique number is found)
        let largestUnique = -1;
        for (const num of frequencyMap.keys()) {
            // Check if the number appears only once and is larger than the current largestUnique
            if (frequencyMap.get(num) === 1 && num > largestUnique) {
                largestUnique = num;
            }
        }
        return largestUnique;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the `nums` array.
