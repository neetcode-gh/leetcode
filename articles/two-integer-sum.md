## 1. Brute Force

::tabs-start

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n^2)$
* Space complexity: $O(1)$

---

## 2. Hash Map (Two Pass)

::tabs-start

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        indices = {}  # val -> index

        for i, n in enumerate(nums):
            indices[n] = i

        for i, n in enumerate(nums):
            diff = target - n
            if diff in indices and indices[diff] != i:
                return [i, indices[diff]]
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Hash Map (One Pass)

::tabs-start

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {}  # val -> index

        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$
