## 1. Brute Force

### Intuition

The problem asks us to find, for each element in `nums1`, an index in `nums2` where that same value appears. The simplest approach is to check every position in `nums2` for each element in `nums1`. When we find a match, we record that index and move on. This guarantees correctness since we examine all possibilities.

### Algorithm

1. Create a result array `mappings` of the same length as `nums1`.
2. For each index `i` in `nums1`:
   - Iterate through `nums2` with index `j`.
   - When `nums1[i]` equals `nums2[j]`, store `j` in `mappings[i]` and break.
3. Return the `mappings` array.

::tabs-start

```python
class Solution:
    def anagramMappings(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # List to store the anagram mappings.
        mappings = [0] * len(nums1)
        
        for i in range(len(nums1)):
            for j in range(len(nums2)):
                # Store the corresponding index of number in the second list.
                if nums1[i] == nums2[j]:
                    mappings[i] = j
                    break
        
        return mappings
```

```java
class Solution {
    public int[] anagramMappings(int[] nums1, int[] nums2) {
        // List to store the anagram mappings.
        int[] mappings = new int[nums1.length];
        
        for (int i = 0; i < nums1.length; i++) {
            for (int j = 0; j < nums2.length; j++) {
                // Store the corresponding index of number in the second list.
                if (nums1[i] == nums2[j]) {
                    mappings[i] = j;
                    break;
                }
            }
        }
        return mappings;
    }
}
```

```cpp
class Solution {
public:
    vector<int> anagramMappings(vector<int>& nums1, vector<int>& nums2) {
        // List to store the anagram mappings.
        vector<int> mappings;
        
        for (int num : nums1) {
            for (int i = 0; i < nums2.size(); i++) {
                // Store the corresponding index of number in the second list.
                if (num == nums2[i]) {
                    mappings.push_back(i);
                    break;
                }
            }
        }
        return mappings;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    anagramMappings(nums1, nums2) {
        // Array to store the anagram mappings.
        const mappings = new Array(nums1.length);

        for (let i = 0; i < nums1.length; i++) {
            for (let j = 0; j < nums2.length; j++) {
                // Store the corresponding index of number in the second array.
                if (nums1[i] === nums2[j]) {
                    mappings[i] = j;
                    break;
                }
            }
        }
        return mappings;
    }
}
```

```go
func anagramMappings(nums1 []int, nums2 []int) []int {
    // Slice to store the anagram mappings.
    mappings := make([]int, len(nums1))

    for i := 0; i < len(nums1); i++ {
        for j := 0; j < len(nums2); j++ {
            // Store the corresponding index of number in the second slice.
            if nums1[i] == nums2[j] {
                mappings[i] = j
                break
            }
        }
    }
    return mappings
}
```

```kotlin
class Solution {
    fun anagramMappings(nums1: IntArray, nums2: IntArray): IntArray {
        // Array to store the anagram mappings.
        val mappings = IntArray(nums1.size)

        for (i in nums1.indices) {
            for (j in nums2.indices) {
                // Store the corresponding index of number in the second array.
                if (nums1[i] == nums2[j]) {
                    mappings[i] = j
                    break
                }
            }
        }
        return mappings
    }
}
```

```swift
class Solution {
    func anagramMappings(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        // Array to store the anagram mappings.
        var mappings = [Int](repeating: 0, count: nums1.count)

        for i in 0..<nums1.count {
            for j in 0..<nums2.count {
                // Store the corresponding index of number in the second array.
                if nums1[i] == nums2[j] {
                    mappings[i] = j
                    break
                }
            }
        }
        return mappings
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2)$
- Space complexity: $O(1)$ constant space

>  Where $N$ is the number of integers in the list `nums1` and `nums2`.

---

## 2. HashMap

### Intuition

Instead of scanning `nums2` repeatedly, we can preprocess it into a hash map that stores each value's index. This allows us to look up the corresponding index for any element in constant time. Since both arrays are anagrams, every element in `nums1` is guaranteed to exist in `nums2`.

### Algorithm

1. Build a hash map `valueToPos` where each key is a value from `nums2` and each entry stores its index.
2. Create a result array `mappings`.
3. For each element in `nums1`, look up its index in the hash map and store it in `mappings`.
4. Return `mappings`.

::tabs-start

```python
class Solution:
    def anagramMappings(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # Store the index corresponding to the value in the second list.
        valueToPos = {}
        for i in range(len(nums2)):
            valueToPos[nums2[i]] = i

        # List to store the anagram mappings.
        mappings = [0] * len(nums1)
        for i in range(len(nums1)):
            mappings[i] = valueToPos[nums1[i]]

        return mappings
```

```java
class Solution {
    public int[] anagramMappings(int[] nums1, int[] nums2) {
        // Store the index corresponding to the value in the second list.
        HashMap<Integer,Integer> valueToPos = new HashMap<>();
        for (int i = 0; i < nums2.length; i++) {
            valueToPos.put(nums2[i], i);
        }

        // List to store the anagram mappings.
        int[] mappings = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            mappings[i]  = valueToPos.get(nums1[i]);
        }

        return mappings;
    }
}
```

```cpp
class Solution {
public:
    vector<int> anagramMappings(vector<int>& nums1, vector<int>& nums2) {
        // Store the index corresponding to the value in the second list.
        unordered_map<int, int> valueToPos;
        for (int i = 0; i < nums2.size(); i++) {
            valueToPos[nums2[i]] = i;
        }
        
        // List to store the anagram mappings.
        vector<int> mappings;
        for (int num : nums1) {
            mappings.push_back(valueToPos[num]);
        }
        
        return mappings;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    anagramMappings(nums1, nums2) {
        // Store the index corresponding to the value in the second list.
        const valueToPos = new Map();
        for (let i = 0; i < nums2.length; i++) {
            valueToPos.set(nums2[i], i);
        }

        // List to store the anagram mappings.
        const mappings = new Array(nums1.length);
        for (let i = 0; i < nums1.length; i++) {
            mappings[i] = valueToPos.get(nums1[i]);
        }

        return mappings;
    }
}
```

```go
func anagramMappings(nums1 []int, nums2 []int) []int {
    // Store the index corresponding to the value in the second slice.
    valueToPos := make(map[int]int)
    for i := 0; i < len(nums2); i++ {
        valueToPos[nums2[i]] = i
    }

    // Slice to store the anagram mappings.
    mappings := make([]int, len(nums1))
    for i := 0; i < len(nums1); i++ {
        mappings[i] = valueToPos[nums1[i]]
    }

    return mappings
}
```

```kotlin
class Solution {
    fun anagramMappings(nums1: IntArray, nums2: IntArray): IntArray {
        // Store the index corresponding to the value in the second array.
        val valueToPos = HashMap<Int, Int>()
        for (i in nums2.indices) {
            valueToPos[nums2[i]] = i
        }

        // Array to store the anagram mappings.
        val mappings = IntArray(nums1.size)
        for (i in nums1.indices) {
            mappings[i] = valueToPos[nums1[i]]!!
        }

        return mappings
    }
}
```

```swift
class Solution {
    func anagramMappings(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        // Store the index corresponding to the value in the second array.
        var valueToPos = [Int: Int]()
        for i in 0..<nums2.count {
            valueToPos[nums2[i]] = i
        }

        // Array to store the anagram mappings.
        var mappings = [Int](repeating: 0, count: nums1.count)
        for i in 0..<nums1.count {
            mappings[i] = valueToPos[nums1[i]]!
        }

        return mappings
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the number of integers in the list `nums1` and `nums2`.

---

## 3. Bit Manipulation + Sorting

### Intuition

We can avoid using extra hash map space by encoding each element's original index directly into the element itself using bit manipulation. By left-shifting each value and adding its index, we preserve both pieces of information in a single integer. After sorting both arrays, elements with the same original value will align at the same positions, letting us extract and pair up their indices.

### Algorithm

1. For each index `i`, encode both arrays: `nums[i] = (nums[i] << 7) + i`. The shift amount (`7` bits) must be large enough to hold the maximum index.
2. Sort both `nums1` and `nums2`. Equal values now appear at matching positions.
3. Create the result array `mappings`.
4. For each position `i`, extract the original indices using a bitmask: `mappings[nums1[i] & mask] = nums2[i] & mask`.
5. Return `mappings`.

::tabs-start

```python
class Solution:
    def anagramMappings(self, nums1: List[int], nums2: List[int]) -> List[int]:
        bitsToShift = 7
        numToGetLastBits = (1 << bitsToShift) - 1
        
        # Store the index within the integer itself.
        for i in range(len(nums1)):
            nums1[i] = (nums1[i] << bitsToShift) + i
            nums2[i] = (nums2[i] << bitsToShift) + i
        
        # Sort both lists so that the original integers end up at the same index.
        nums1.sort()
        nums2.sort()
        
        # List to store the anagram mappings.
        mappings = [0] * len(nums1)
        
        for i in range(len(nums1)):
            # Store the index in the second list corresponding to the integer index in the first list.
            mappings[nums1[i] & numToGetLastBits] = (nums2[i] & numToGetLastBits)
        
        return mappings
```

```java
class Solution {
    final int bitsToShift = 7;
    final int numToGetLastBits = (1 << bitsToShift) - 1;

    public int[] anagramMappings(int[] nums1, int[] nums2) {
        // Store the index within the integer itself.
        for (int i = 0; i < nums1.length; i++) {
            nums1[i] = (nums1[i] << bitsToShift) + i;
            nums2[i] = (nums2[i] << bitsToShift) + i;
        }

        // Sort both lists so that the original integers end up at the same index.
        Arrays.sort(nums1);
        Arrays.sort(nums2);

        // List to store the anagram mappings.
        int[] mappings = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            // Store the index in the second list corresponding to the integer index in the first list.
            mappings[nums1[i] & numToGetLastBits] = (nums2[i] & numToGetLastBits);
        }

        return mappings;
    }
}
```

```cpp
class Solution {
public:
    const int bitsToShift = 7;
    const int numToGetLastBits = (1 << bitsToShift) - 1;
    
    vector<int> anagramMappings(vector<int>& nums1, vector<int>& nums2) {
        // Store the index within the integer itself.
        for (int i = 0; i < nums1.size(); i++) {
            nums1[i] = (nums1[i] << bitsToShift) + i;
            nums2[i] = (nums2[i] << bitsToShift) + i;
        }
        
        // Sort both lists so that the original integers end up at the same index.
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());
        
        // List to store the anagram mappings.
        vector<int> mappings(nums1.size());
        for (int i = 0; i < nums1.size(); i++) {
            // Store the index in the second list corresponding to the integer index in the first list.
            mappings[nums1[i] & numToGetLastBits] = (nums2[i] & numToGetLastBits);
        }

        return mappings;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[]}
     */
    anagramMappings(nums1, nums2) {
        const bitsToShift = 7;
        const numToGetLastBits = (1 << bitsToShift) - 1;

        // Store the index within the integer itself.
        for (let i = 0; i < nums1.length; i++) {
            nums1[i] = (nums1[i] << bitsToShift) + i;
            nums2[i] = (nums2[i] << bitsToShift) + i;
        }

        // Sort both arrays so that the original integers end up at the same index.
        nums1.sort((a, b) => a - b);
        nums2.sort((a, b) => a - b);

        // Array to store the anagram mappings.
        const mappings = new Array(nums1.length);

        for (let i = 0; i < nums1.length; i++) {
            // Store the index in the second array corresponding to the integer index in the first array.
            mappings[nums1[i] & numToGetLastBits] = (nums2[i] & numToGetLastBits);
        }

        return mappings;
    }
}
```

```go
func anagramMappings(nums1 []int, nums2 []int) []int {
    bitsToShift := 7
    numToGetLastBits := (1 << bitsToShift) - 1

    // Store the index within the integer itself.
    for i := 0; i < len(nums1); i++ {
        nums1[i] = (nums1[i] << bitsToShift) + i
        nums2[i] = (nums2[i] << bitsToShift) + i
    }

    // Sort both slices so that the original integers end up at the same index.
    sort.Ints(nums1)
    sort.Ints(nums2)

    // Slice to store the anagram mappings.
    mappings := make([]int, len(nums1))

    for i := 0; i < len(nums1); i++ {
        // Store the index in the second slice corresponding to the integer index in the first slice.
        mappings[nums1[i] & numToGetLastBits] = nums2[i] & numToGetLastBits
    }

    return mappings
}
```

```kotlin
class Solution {
    fun anagramMappings(nums1: IntArray, nums2: IntArray): IntArray {
        val bitsToShift = 7
        val numToGetLastBits = (1 shl bitsToShift) - 1

        // Store the index within the integer itself.
        for (i in nums1.indices) {
            nums1[i] = (nums1[i] shl bitsToShift) + i
            nums2[i] = (nums2[i] shl bitsToShift) + i
        }

        // Sort both arrays so that the original integers end up at the same index.
        nums1.sort()
        nums2.sort()

        // Array to store the anagram mappings.
        val mappings = IntArray(nums1.size)

        for (i in nums1.indices) {
            // Store the index in the second array corresponding to the integer index in the first array.
            mappings[nums1[i] and numToGetLastBits] = nums2[i] and numToGetLastBits
        }

        return mappings
    }
}
```

```swift
class Solution {
    func anagramMappings(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        var nums1 = nums1
        var nums2 = nums2
        let bitsToShift = 7
        let numToGetLastBits = (1 << bitsToShift) - 1

        // Store the index within the integer itself.
        for i in 0..<nums1.count {
            nums1[i] = (nums1[i] << bitsToShift) + i
            nums2[i] = (nums2[i] << bitsToShift) + i
        }

        // Sort both arrays so that the original integers end up at the same index.
        nums1.sort()
        nums2.sort()

        // Array to store the anagram mappings.
        var mappings = [Int](repeating: 0, count: nums1.count)

        for i in 0..<nums1.count {
            // Store the index in the second array corresponding to the integer index in the first array.
            mappings[nums1[i] & numToGetLastBits] = nums2[i] & numToGetLastBits
        }

        return mappings
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(\log N)$

>  Where $N$ is the number of integers in the list `nums1` and `nums2`.

---

## Common Pitfalls

### Overwriting Indices for Duplicate Values

When using a hash map, storing only a single index per value means duplicate values all map to the same index. If the problem requires distinct mappings for duplicates, use a list of indices or pop from a stack of indices instead.

### Off-by-One Errors in Bit Manipulation

When encoding indices into values using bit shifts, using too few bits causes index collisions for larger arrays. Ensure the shift amount is large enough to accommodate the maximum possible index value.
