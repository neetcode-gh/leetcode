## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2)$
- Space complexity: $O(1)$ constant space

>  Where $N$ is the number of integers in the list `nums1` and `nums2`.

---

## 2. HashMap

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the number of integers in the list `nums1` and `nums2`.

---

## 3. Bit Manipulation + Sorting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(\log N)$

>  Where $N$ is the number of integers in the list `nums1` and `nums2`.
