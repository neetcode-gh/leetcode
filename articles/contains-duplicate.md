# Contains Duplicate

## Problem Statement
Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is **distinct**.

## Intuition
We're checking for repeated values in an array. There are several ways to approach this problem, each with different trade-offs between time and space complexity. We can either compare every pair of elements, sort the array and check adjacent elements, or use a hash set for efficient duplicate detection.

## Approaches & Solutions

### 1. Brute Force - Compare All Pairs
**Logic:** Use two nested loops to compare every pair of elements in the array.

```cpp
class Solution {
public:
    bool hasDuplicate(vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] == nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

**Time Complexity:** O(n²)  
**Space Complexity:** O(1)

This approach is simple to understand but becomes inefficient for large arrays due to the quadratic time complexity.

### 2. Sorting & Checking Adjacent Elements
**Logic:** If duplicates exist, they will appear next to each other in a sorted array.

```cpp
class Solution {
public:
    bool hasDuplicate(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) {
                return true;
            }
        }
        return false;
    }
};
```

**Time Complexity:** O(n log n)  
**Space Complexity:** O(1) or O(n) depending on the sorting algorithm used

This approach is more efficient than brute force and works well when you don't mind modifying the original array.

### 3. Using Hash Set
**Logic:** Store seen elements in a hash set and check if an element already exists before adding it.

```cpp
class Solution {
public:
    bool hasDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) {
                return true;
            }
            seen.insert(num);
        }
        return false;
    }
};
```

**Time Complexity:** O(n)  
**Space Complexity:** O(n)

This is the most efficient approach in terms of time complexity and is widely used in practice.

### 4. Using Set Length Comparison
**Logic:** Convert the array to a set and compare the sizes. If they differ, duplicates exist.

```cpp
class Solution {
public:
    bool hasDuplicate(vector<int>& nums) {
        return unordered_set<int>(nums.begin(), nums.end()).size() < nums.size();
    }
};
```

**Time Complexity:** O(n)  
**Space Complexity:** O(n)

This is a clean, one-liner solution that's both efficient and easy to read.

## Summary

| Approach | Time Complexity | Space Complexity | Notes |
|----------|----------------|------------------|-------|
| Brute Force | O(n²) | O(1) | Simple but slow for large inputs |
| Sort & Check | O(n log n) | O(1)/O(n) | Good balance, modifies original array |
| Hash Set | O(n) | O(n) | Most efficient, recommended approach |
| Set Length Compare | O(n) | O(n) | Clean and fast implementation |

The hash set approach is generally recommended as it provides the best time complexity while maintaining readable code. The set length comparison is also excellent for its simplicity and efficiency.

