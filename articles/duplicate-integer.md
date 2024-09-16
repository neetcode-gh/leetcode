## 1. Brute Force

::tabs-start

```python
class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] == nums[j]:
                    return True
        return False
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n^2)$
* Space complexity: $O(1)$

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        nums.sort()
        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                return True
        return False
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Hash Set

::tabs-start

```python
class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Hash Set Length

::tabs-start

```python
class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        return len(set(nums)) < len(nums)
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

