## 1. Brute Force

::tabs-start

```python
class Solution:
    def findDifference(self, nums1: list[int], nums2: list[int]) -> list[list[int]]:
        res = [set(), set()]

        for num1 in nums1:
            found = False
            for num2 in nums2:
                if num1 == num2:
                    found = True
                    break
            if not found:
                res[0].add(num1)

        for num2 in nums2:
            found = False
            for num1 in nums1:
                if num1 == num2:
                    found = True
                    break
            if not found:
                res[1].add(num2)

        return [list(res[0]), list(res[1])]
```

```java
public class Solution {
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        Set<Integer> res1 = new HashSet<>();
        Set<Integer> res2 = new HashSet<>();

        for (int num1 : nums1) {
            boolean found = false;
            for (int num2 : nums2) {
                if (num1 == num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res1.add(num1);
            }
        }

        for (int num2 : nums2) {
            boolean found = false;
            for (int num1 : nums1) {
                if (num1 == num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res2.add(num2);
            }
        }

        List<List<Integer>> result = new ArrayList<>();
        result.add(new ArrayList<>(res1));
        result.add(new ArrayList<>(res2));
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        set<int> res1, res2;

        for (int num1 : nums1) {
            bool found = false;
            for (int num2 : nums2) {
                if (num1 == num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res1.insert(num1);
            }
        }

        for (int num2 : nums2) {
            bool found = false;
            for (int num1 : nums1) {
                if (num1 == num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res2.insert(num2);
            }
        }

        return {vector<int>(res1.begin(), res1.end()),
                vector<int>(res2.begin(), res2.end())};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[][]}
     */
    findDifference(nums1, nums2) {
        const res1 = new Set();
        const res2 = new Set();

        for (const num1 of nums1) {
            let found = false;
            for (const num2 of nums2) {
                if (num1 === num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res1.add(num1);
            }
        }

        for (const num2 of nums2) {
            let found = false;
            for (const num1 of nums1) {
                if (num1 === num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res2.add(num2);
            }
        }

        return [Array.from(res1), Array.from(res2)];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def findDifference(self, nums1: list[int], nums2: list[int]) -> list[list[int]]:
        nums1.sort()
        nums2.sort()

        def helper(A, B):
            n, m = len(A), len(B)
            res = []

            j = 0
            prev = float('-inf')
            for num in A:
                if prev == num:
                    continue
                while j < m and B[j] < num:
                    j += 1
                if j == m or B[j] != num:
                    res.append(num)
                prev = num
            return res

        return [helper(nums1, nums2), helper(nums2, nums1)]
```

```java
public class Solution {
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        Arrays.sort(nums1);
        Arrays.sort(nums2);

        List<Integer> diff1 = helper(nums1, nums2);
        List<Integer> diff2 = helper(nums2, nums1);

        List<List<Integer>> result = new ArrayList<>();
        result.add(diff1);
        result.add(diff2);

        return result;
    }

    private List<Integer> helper(int[] A, int[] B) {
        int n = A.length, m = B.length, j = 0;
        List<Integer> res = new ArrayList<>();
        int prev = Integer.MIN_VALUE;

        for (int num : A) {
            if (num == prev) continue;
            while (j < m && B[j] < num) j++;
            if (j == m || B[j] != num) res.add(num);
            prev = num;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());

        return {helper(nums1, nums2), helper(nums2, nums1)};
    }

private:
    vector<int> helper(vector<int>& A, vector<int>& B) {
        vector<int> res;
        int n = A.size(), m = B.size(), j = 0, prev = INT_MIN;

        for (int num : A) {
            if (num == prev) continue;
            while (j < m && B[j] < num) j++;
            if (j == m || B[j] != num) res.push_back(num);
            prev = num;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[][]}
     */
    findDifference(nums1, nums2) {
        nums1.sort((a, b) => a - b);
        nums2.sort((a, b) => a - b);

        const helper = (A, B) => {
            const res = [];
            let j = 0;
            let prev = -Infinity;

            for (const num of A) {
                if (num === prev) continue;
                while (j < B.length && B[j] < num) j++;
                if (j === B.length || B[j] !== num) res.push(num);
                prev = num;
            }

            return res;
        };

        return [helper(nums1, nums2), helper(nums2, nums1)];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m \log m)$
- Space complexity: $O(1)$ or $O(n + m)$ depending on the sorting algorithm.

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 3. Hash Set

::tabs-start

```python
class Solution:
    def findDifference(self, nums1: List[int], nums2: List[int]) -> List[List[int]]:
        num1Set, num2Set = set(nums1), set(nums2)
        res1, res2 = [], []

        for num in num1Set:
            if num not in num2Set:
                res1.append(num)

        for num in num2Set:
            if num not in num1Set:
                res2.append(num)

        return [res1, res2]
```

```java
public class Solution {
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        Set<Integer> num1Set = new HashSet<>();
        Set<Integer> num2Set = new HashSet<>();
        for (int num : nums1) num1Set.add(num);
        for (int num : nums2) num2Set.add(num);

        List<Integer> res1 = new ArrayList<>();
        List<Integer> res2 = new ArrayList<>();

        for (int num : num1Set) {
            if (!num2Set.contains(num)) res1.add(num);
        }

        for (int num : num2Set) {
            if (!num1Set.contains(num)) res2.add(num);
        }

        return Arrays.asList(res1, res2);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> num1Set(nums1.begin(), nums1.end());
        unordered_set<int> num2Set(nums2.begin(), nums2.end());
        vector<int> res1, res2;

        for (int num : num1Set) {
            if (num2Set.find(num) == num2Set.end()) res1.push_back(num);
        }

        for (int num : num2Set) {
            if (num1Set.find(num) == num1Set.end()) res2.push_back(num);
        }

        return {res1, res2};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[][]}
     */
    findDifference(nums1, nums2) {
        const num1Set = new Set(nums1);
        const num2Set = new Set(nums2);
        const res1 = [];
        const res2 = [];

        for (const num of num1Set) {
            if (!num2Set.has(num)) res1.push(num);
        }

        for (const num of num2Set) {
            if (!num1Set.has(num)) res2.push(num);
        }

        return [res1, res2];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 4. Hash Set Difference

::tabs-start

```python
class Solution:
    def findDifference(self, nums1: List[int], nums2: List[int]) -> List[List[int]]:
        numSet1, numSet2 = set(nums1), set(nums2)
        return [list(numSet1 - numSet2), list(numSet2 - numSet1)]
```

```java
public class Solution {
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        Set<Integer> numSet1 = new HashSet<>();
        Set<Integer> numSet2 = new HashSet<>();
        for (int num : nums1) numSet1.add(num);
        for (int num : nums2) numSet2.add(num);

        List<Integer> res1 = new ArrayList<>(numSet1);
        res1.removeAll(numSet2);

        List<Integer> res2 = new ArrayList<>(numSet2);
        res2.removeAll(numSet1);

        return Arrays.asList(res1, res2);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        vector<int> res1, res2;
        set<int> numSet1(begin(nums1), end(nums1)), numSet2(begin(nums2), end(nums2));

        set_difference(begin(numSet1), end(numSet1), begin(numSet2), end(numSet2), back_inserter(res1));
        set_difference(begin(numSet2), end(numSet2), begin(numSet1), end(numSet1), back_inserter(res2));

        return {res1, res2};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[][]}
     */
    findDifference(nums1, nums2) {
        const numSet1 = new Set(nums1);
        const numSet2 = new Set(nums2);

        const res1 = Array.from(numSet1).filter((num) => !numSet2.has(num));
        const res2 = Array.from(numSet2).filter((num) => !numSet1.has(num));

        return [res1, res2];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.
