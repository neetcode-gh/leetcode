## 1. Sorting

### Intuition

After sorting in descending order, we can scan from largest to smallest. A number is unique if it differs from its neighbors. We skip over groups of duplicates and return the first number that appears exactly once.

### Algorithm

1. Handle the edge case: if there is only one element, return it.
2. Sort the array in descending order.
3. Iterate through the sorted array:
   - If the current element differs from the next (or is the last element), it is unique. Return it.
   - Otherwise, skip all consecutive duplicates.
4. If no unique number is found, return -1.

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

```csharp
public class Solution {
    public int LargestUniqueNumber(int[] nums) {
        int n = nums.Length;

        // If there's only one element, it's unique by default
        if (n == 1) {
            return nums[0];
        }

        Array.Sort(nums);

        // Start from the end (largest numbers)
        int currentIndex = n - 1;

        while (currentIndex >= 0) {
            // If it's the first element or different from the previous one, it's unique
            if (currentIndex == 0 || nums[currentIndex] != nums[currentIndex - 1]) {
                return nums[currentIndex];
            }

            // Skip duplicates
            while (currentIndex > 0 && nums[currentIndex] == nums[currentIndex - 1]) {
                currentIndex--;
            }

            // Move to the next unique number
            currentIndex--;
        }

        return -1;
    }
}
```

```go
func largestUniqueNumber(nums []int) int {
    n := len(nums)

    // If there's only one element, it's unique by default
    if n == 1 {
        return nums[0]
    }

    sort.Sort(sort.Reverse(sort.IntSlice(nums)))

    // Start from the beginning (largest numbers)
    currentIndex := 0

    for currentIndex < n {
        // If it's the last element or different from the next one, it's unique
        if currentIndex == n-1 || nums[currentIndex] != nums[currentIndex+1] {
            return nums[currentIndex]
        }

        // Skip duplicates
        for currentIndex < n-1 && nums[currentIndex] == nums[currentIndex+1] {
            currentIndex++
        }

        // Move to the next unique number
        currentIndex++
    }

    return -1
}
```

```kotlin
class Solution {
    fun largestUniqueNumber(nums: IntArray): Int {
        val n = nums.size

        // If there's only one element, it's unique by default
        if (n == 1) {
            return nums[0]
        }

        nums.sortDescending()

        // Start from the beginning (largest numbers)
        var currentIndex = 0

        while (currentIndex < n) {
            // If it's the last element or different from the next one, it's unique
            if (currentIndex == n - 1 || nums[currentIndex] != nums[currentIndex + 1]) {
                return nums[currentIndex]
            }

            // Skip duplicates
            while (currentIndex < n - 1 && nums[currentIndex] == nums[currentIndex + 1]) {
                currentIndex++
            }

            // Move to the next unique number
            currentIndex++
        }

        return -1
    }
}
```

```swift
class Solution {
    func largestUniqueNumber(_ nums: [Int]) -> Int {
        let n = nums.count

        // If there's only one element, it's unique by default
        if n == 1 {
            return nums[0]
        }

        let sorted = nums.sorted(by: >)

        // Start from the beginning (largest numbers)
        var currentIndex = 0

        while currentIndex < n {
            // If it's the last element or different from the next one, it's unique
            if currentIndex == n - 1 || sorted[currentIndex] != sorted[currentIndex + 1] {
                return sorted[currentIndex]
            }

            // Skip duplicates
            while currentIndex < n - 1 && sorted[currentIndex] == sorted[currentIndex + 1] {
                currentIndex += 1
            }

            // Move to the next unique number
            currentIndex += 1
        }

        return -1
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

### Intuition

We can count the frequency of each number using a sorted map (tree map). Since the map maintains keys in sorted order, we iterate from the largest key downward and return the first key with frequency 1.

### Algorithm

1. Build a frequency map counting occurrences of each number.
2. Use a sorted map structure that keeps keys in order.
3. Iterate through the keys in descending order.
4. Return the first key with a frequency of 1, or -1 if none exists.

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

```csharp
public class Solution {
    public int LargestUniqueNumber(int[] nums) {
        // Use a SortedDictionary to store numbers and their frequencies
        SortedDictionary<int, int> frequencyMap = new SortedDictionary<int, int>();

        // Populate the frequencyMap
        foreach (int num in nums) {
            if (frequencyMap.ContainsKey(num)) {
                frequencyMap[num]++;
            } else {
                frequencyMap[num] = 1;
            }
        }

        // Initialize the result to -1 (default if no unique number is found)
        int largestUnique = -1;

        // Iterate through the map in reverse order (largest to smallest)
        foreach (int num in frequencyMap.Keys.Reverse()) {
            // If the frequency is 1, we've found our largest unique number
            if (frequencyMap[num] == 1) {
                largestUnique = num;
                break;
            }
        }

        return largestUnique;
    }
}
```

```go
func largestUniqueNumber(nums []int) int {
    // Create a frequency map
    frequencyMap := make(map[int]int)
    for _, num := range nums {
        frequencyMap[num]++
    }

    // Get all keys and sort them in descending order
    keys := make([]int, 0, len(frequencyMap))
    for k := range frequencyMap {
        keys = append(keys, k)
    }
    sort.Sort(sort.Reverse(sort.IntSlice(keys)))

    // Find the largest unique number
    for _, num := range keys {
        if frequencyMap[num] == 1 {
            return num
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun largestUniqueNumber(nums: IntArray): Int {
        // Use a TreeMap to store numbers and their frequencies
        val frequencyMap = sortedMapOf<Int, Int>()

        // Populate the frequencyMap
        for (num in nums) {
            frequencyMap[num] = frequencyMap.getOrDefault(num, 0) + 1
        }

        // Initialize the result to -1 (default if no unique number is found)
        var largestUnique = -1

        // Iterate through the map in reverse order (largest to smallest)
        for (num in frequencyMap.keys.reversed()) {
            // If the frequency is 1, we've found our largest unique number
            if (frequencyMap[num] == 1) {
                largestUnique = num
                break
            }
        }

        return largestUnique
    }
}
```

```swift
class Solution {
    func largestUniqueNumber(_ nums: [Int]) -> Int {
        // Create a frequency map
        var frequencyMap = [Int: Int]()
        for num in nums {
            frequencyMap[num, default: 0] += 1
        }

        // Sort keys in descending order
        let sortedKeys = frequencyMap.keys.sorted(by: >)

        // Find the largest unique number
        for num in sortedKeys {
            if frequencyMap[num] == 1 {
                return num
            }
        }

        return -1
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

### Intuition

Using a regular hash map, we count frequencies in linear time. Then we scan all entries and track the maximum number with frequency 1. This avoids the overhead of maintaining sorted order.

### Algorithm

1. Build a frequency map counting occurrences of each number.
2. Initialize the result to -1.
3. Iterate through all entries in the map:
   - If frequency equals 1 and the number is larger than the current result, update the result.
4. Return the result.

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

```csharp
public class Solution {
    public int LargestUniqueNumber(int[] nums) {
        // Create a Dictionary to store the frequency of each number
        Dictionary<int, int> frequencyMap = new Dictionary<int, int>();

        // Populate the frequencyMap
        foreach (int num in nums) {
            if (frequencyMap.ContainsKey(num)) {
                frequencyMap[num]++;
            } else {
                frequencyMap[num] = 1;
            }
        }

        // Initialize the result to -1 (default if no unique number is found)
        int largestUnique = -1;

        foreach (int num in frequencyMap.Keys) {
            // Check if the number appears only once and is larger than the current largestUnique
            if (frequencyMap[num] == 1 && num > largestUnique) {
                largestUnique = num;
            }
        }

        return largestUnique;
    }
}
```

```go
func largestUniqueNumber(nums []int) int {
    // Create a map to store the frequency of each number
    frequencyMap := make(map[int]int)

    // Populate the frequencyMap
    for _, num := range nums {
        frequencyMap[num]++
    }

    // Initialize the result to -1 (default if no unique number is found)
    largestUnique := -1

    for num, freq := range frequencyMap {
        // Check if the number appears only once and is larger than the current largestUnique
        if freq == 1 && num > largestUnique {
            largestUnique = num
        }
    }

    return largestUnique
}
```

```kotlin
class Solution {
    fun largestUniqueNumber(nums: IntArray): Int {
        // Create a HashMap to store the frequency of each number
        val frequencyMap = mutableMapOf<Int, Int>()

        // Populate the frequencyMap
        for (num in nums) {
            frequencyMap[num] = frequencyMap.getOrDefault(num, 0) + 1
        }

        // Initialize the result to -1 (default if no unique number is found)
        var largestUnique = -1

        for ((num, freq) in frequencyMap) {
            // Check if the number appears only once and is larger than the current largestUnique
            if (freq == 1 && num > largestUnique) {
                largestUnique = num
            }
        }

        return largestUnique
    }
}
```

```swift
class Solution {
    func largestUniqueNumber(_ nums: [Int]) -> Int {
        // Create a Dictionary to store the frequency of each number
        var frequencyMap = [Int: Int]()

        // Populate the frequencyMap
        for num in nums {
            frequencyMap[num, default: 0] += 1
        }

        // Initialize the result to -1 (default if no unique number is found)
        var largestUnique = -1

        for (num, freq) in frequencyMap {
            // Check if the number appears only once and is larger than the current largestUnique
            if freq == 1 && num > largestUnique {
                largestUnique = num
            }
        }

        return largestUnique
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the `nums` array.
