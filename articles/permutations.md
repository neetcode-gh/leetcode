## 1. Recursion

::tabs-start

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        if len(nums) == 0:
            return [[]]
        
        perms = self.permute(nums[1:])
        res = []
        for p in perms:
            for i in range(len(p) + 1):
                p_copy = p.copy()
                p_copy.insert(i, nums[0])
                res.append(p_copy)
        return res
```

```java
public class Solution {
    public List<List<Integer>> permute(int[] nums) {
        if (nums.length == 0) {
            return Arrays.asList(new ArrayList<>());
        }
        
        List<List<Integer>> perms = permute(Arrays.copyOfRange(nums, 1, nums.length));
        List<List<Integer>> res = new ArrayList<>();
        for (List<Integer> p : perms) {
            for (int i = 0; i <= p.size(); i++) {
                List<Integer> p_copy = new ArrayList<>(p);
                p_copy.add(i, nums[0]);
                res.add(p_copy);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        if (nums.empty()) {
            return {{}};
        }
        
        vector<int> tmp = vector<int>(nums.begin() + 1, nums.end());
        vector<vector<int>> perms = permute(tmp);
        vector<vector<int>> res;
        for (const auto& p : perms) {
            for (int i = 0; i <= p.size(); i++) {
                vector<int> p_copy = p;
                p_copy.insert(p_copy.begin() + i, nums[0]);
                res.push_back(p_copy);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        if (nums.length === 0) {
            return [[]];
        }

        let perms = this.permute(nums.slice(1));
        let res = [];
        for (let p of perms) {
            for (let i = 0; i <= p.length; i++) {
                let p_copy = p.slice();
                p_copy.splice(i, 0, nums[0]);
                res.push(p_copy);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> Permute(int[] nums) {
        if (nums.Length == 0) {
            return new List<List<int>> { new List<int>() };
        }
        
        var perms = Permute(nums[1..]);
        var res = new List<List<int>>();
        foreach (var p in perms) {
            for (int i = 0; i <= p.Count; i++) {
                var p_copy = new List<int>(p);
                p_copy.Insert(i, nums[0]);
                res.Add(p_copy);
            }
        }
        return res;
    }
}
```

```go
func permute(nums []int) [][]int {
    if len(nums) == 0 {
        return [][]int{{}}
    }
    
    perms := permute(nums[1:])
    var res [][]int
    for _, p := range perms {
        for i := 0; i <= len(p); i++ {
            pCopy := append([]int{}, p...)
            pCopy = append(pCopy[:i], append([]int{nums[0]}, pCopy[i:]...)...)
            res = append(res, pCopy)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun permute(nums: IntArray): List<List<Int>> {
        if (nums.isEmpty()) return listOf(listOf())
        
        val perms = permute(nums.sliceArray(1 until nums.size))
        val res = mutableListOf<List<Int>>()
        for (p in perms) {
            for (i in 0..p.size) {
                val pCopy = p.toMutableList()
                pCopy.add(i, nums[0])
                res.add(pCopy)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n! * n ^ 2)$
* Space complexity: $O(n! * n)$

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        perms = [[]]
        for num in nums:
            new_perms = []
            for p in perms:
                for i in range(len(p) + 1):
                    p_copy = p.copy()
                    p_copy.insert(i, num)
                    new_perms.append(p_copy)
            perms = new_perms
        return perms
```

```java
public class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> perms = new ArrayList<>();
        perms.add(new ArrayList<>());

        for (int num : nums) {
            List<List<Integer>> new_perms = new ArrayList<>();
            for (List<Integer> p : perms) {
                for (int i = 0; i <= p.size(); i++) {
                    List<Integer> p_copy = new ArrayList<>(p);
                    p_copy.add(i, num);
                    new_perms.add(p_copy);
                }
            }
            perms = new_perms;
        }
        return perms;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> perms = {{}};
        for (int num : nums) {
            vector<vector<int>> new_perms;
            for (const auto& p : perms) {
                for (int i = 0; i <= p.size(); i++) {
                    vector<int> p_copy = p;
                    p_copy.insert(p_copy.begin() + i, num);
                    new_perms.push_back(p_copy);
                }
            }
            perms = new_perms;
        }
        return perms;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        let perms = [[]];
        for (let num of nums) {
            let new_perms = [];
            for (let p of perms) {
                for (let i = 0; i <= p.length; i++) {
                    let p_copy = p.slice();
                    p_copy.splice(i, 0, num);
                    new_perms.push(p_copy);
                }
            }
            perms = new_perms;
        }
        return perms;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> Permute(int[] nums) {
        var perms = new List<List<int>>() { new List<int>() };
        foreach (int num in nums) {
            var new_perms = new List<List<int>>();
            foreach (var p in perms) {
                for (int i = 0; i <= p.Count; i++) {
                    var p_copy = new List<int>(p);
                    p_copy.Insert(i, num);
                    new_perms.Add(p_copy);
                }
            }
            perms = new_perms;
        }
        return perms;
    }
}
```

```go
func permute(nums []int) [][]int {
    perms := [][]int{{}}
    
    for _, num := range nums {
        var newPerms [][]int
        for _, p := range perms {
            for i := 0; i <= len(p); i++ {
                pCopy := append([]int{}, p...)
                pCopy = append(pCopy[:i], append([]int{num}, pCopy[i:]...)...)
                newPerms = append(newPerms, pCopy)
            }
        }
        perms = newPerms
    }
    
    return perms
}
```

```kotlin
class Solution {
    fun permute(nums: IntArray): List<List<Int>> {
        var perms = mutableListOf(listOf<Int>())
        
        for (num in nums) {
            val newPerms = mutableListOf<List<Int>>()
            for (p in perms) {
                for (i in 0..p.size) {
                    val pCopy = p.toMutableList()
                    pCopy.add(i, num)
                    newPerms.add(pCopy)
                }
            }
            perms = newPerms
        }
        
        return perms
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n! * n ^ 2)$
* Space complexity: $O(n! * n)$

---

## 3. Backtracking

::tabs-start

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        self.res = []
        self.backtrack([], nums, [False] * len(nums))
        return self.res

    def backtrack(self, perm: List[int], nums: List[int], pick: List[bool]):
        if len(perm) == len(nums):
            self.res.append(perm[:])
            return
        for i in range(len(nums)):
            if not pick[i]:
                perm.append(nums[i])
                pick[i] = True
                self.backtrack(perm, nums, pick)
                perm.pop()
                pick[i] = False
```

```java
public class Solution {
    List<List<Integer>> res;
    public List<List<Integer>> permute(int[] nums) {
        res = new ArrayList<>();
        backtrack(new ArrayList<>(), nums, new boolean[nums.length]);
        return res;
    }

    public void backtrack(List<Integer> perm, int[] nums, boolean[] pick) {
        if (perm.size() == nums.length) {
            res.add(new ArrayList<>(perm));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (!pick[i]) {
                perm.add(nums[i]);
                pick[i] = true;
                backtrack(perm, nums, pick);
                perm.remove(perm.size() - 1);
                pick[i] = false;
            }
        }
    }
}
```

```cpp
class Solution {
    vector<vector<int>> res;
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<bool> pick(nums.size(), false);
        vector<int> perm;
        backtrack(perm, nums, pick);
        return res;
    }

    void backtrack(vector<int>& perm, vector<int>& nums, vector<bool>& pick) {
        if (perm.size() == nums.size()) {
            res.push_back(perm);
            return;
        }
        for (int i = 0; i < nums.size(); i++) {
            if (!pick[i]) {
                perm.push_back(nums[i]);
                pick[i] = true;
                backtrack(perm, nums, pick);
                perm.pop_back();
                pick[i] = false;
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        let res = [];
        backtrack([], nums, new Array(nums.length).fill(false));
        return res;
        
        function backtrack(perm, nums, pick) {
            if (perm.length === nums.length) {
                res.push([...perm]);
                return;
            }
            for (let i = 0; i < nums.length; i++) {
                if (!pick[i]) {
                    perm.push(nums[i]);
                    pick[i] = true;
                    backtrack(perm, nums, pick);
                    perm.pop();
                    pick[i] = false;
                }
            }
        }
    }
}
```

```csharp
public class Solution {
    List<List<int>> res;
    public List<List<int>> Permute(int[] nums) {
        res = new List<List<int>>();
        Backtrack(new List<int>(), nums, new bool[nums.Length]);
        return res;
    }

    private void Backtrack(List<int> perm, int[] nums, bool[] pick) {
        if (perm.Count == nums.Length) {
            res.Add(new List<int>(perm));
            return;
        }
        for (int i = 0; i < nums.Length; i++) {
            if (!pick[i]) {
                perm.Add(nums[i]);
                pick[i] = true;
                Backtrack(perm, nums, pick);
                perm.RemoveAt(perm.Count - 1);
                pick[i] = false;
            }
        }
    }
}
```

```go
func permute(nums []int) [][]int {
    var res [][]int
    backtrack(&res, []int{}, nums, make([]bool, len(nums)))
    return res
}

func backtrack(res *[][]int, perm []int, nums []int, pick []bool) {
    if len(perm) == len(nums) {
        temp := append([]int{}, perm...)
        *res = append(*res, temp)
        return
    }
    for i := 0; i < len(nums); i++ {
        if !pick[i] {
            perm = append(perm, nums[i])
            pick[i] = true
            backtrack(res, perm, nums, pick)
            perm = perm[:len(perm)-1]
            pick[i] = false
        }
    }
}
```

```kotlin
class Solution {
    private val res = mutableListOf<List<Int>>()
    
    fun permute(nums: IntArray): List<List<Int>> {
        backtrack(mutableListOf(), nums, BooleanArray(nums.size))
        return res
    }
    
    private fun backtrack(perm: MutableList<Int>, nums: IntArray, pick: BooleanArray) {
        if (perm.size == nums.size) {
            res.add(ArrayList(perm))
            return
        }
        for (i in nums.indices) {
            if (!pick[i]) {
                perm.add(nums[i])
                pick[i] = true
                backtrack(perm, nums, pick)
                perm.removeAt(perm.size - 1)
                pick[i] = false
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n! * n)$
* Space complexity: $O(n)$

---

## 4. Backtracking (Bit Mask)

::tabs-start

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        self.res = []
        self.backtrack([], nums, 0)
        return self.res

    def backtrack(self, perm: List[int], nums: List[int], mask: int):
        if len(perm) == len(nums):
            self.res.append(perm[:])
            return
        for i in range(len(nums)):
            if not (mask & (1 << i)):
                perm.append(nums[i])
                self.backtrack(perm, nums, mask | (1 << i))
                perm.pop()
```

```java
public class Solution {
    List<List<Integer>> res = new ArrayList<>();

    public List<List<Integer>> permute(int[] nums) {
        backtrack(new ArrayList<>(), nums, 0);
        return res;
    }

    private void backtrack(List<Integer> perm, int[] nums, int mask) {
        if (perm.size() == nums.length) {
            res.add(new ArrayList<>(perm));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if ((mask & (1 << i)) == 0) {
                perm.add(nums[i]);
                backtrack(perm, nums, mask | (1 << i));
                perm.remove(perm.size() - 1);
            }
        }
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> res;

    vector<vector<int>> permute(vector<int>& nums) {
        backtrack({}, nums, 0);
        return res;
    }

    void backtrack(vector<int> perm, vector<int>& nums, int mask) {
        if (perm.size() == nums.size()) {
            res.push_back(perm);
            return;
        }
        for (int i = 0; i < nums.size(); i++) {
            if (!(mask & (1 << i))) {
                perm.push_back(nums[i]);
                backtrack(perm, nums, mask | (1 << i));
                perm.pop_back();
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        let res = [];
        this.backtrack([], nums, 0, res);
        return res;
    }

    /**
     * @param {number[]} perm
     * @param {number[]} nums
     * @param {number} mask
     * @param {number[][]} res
     * @return {void}
     */
    backtrack(perm, nums, mask, res) {
        if (perm.length === nums.length) {
            res.push([...perm]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (!(mask & (1 << i))) {
                perm.push(nums[i]);
                this.backtrack(perm, nums, mask | (1 << i), res);
                perm.pop();
            }
        }
    }
}
```

```csharp
public class Solution {
    List<List<int>> res = new List<List<int>>();

    public List<List<int>> Permute(int[] nums) {
        Backtrack(new List<int>(), nums, 0);
        return res;
    }

    private void Backtrack(List<int> perm, int[] nums, int mask) {
        if (perm.Count == nums.Length) {
            res.Add(new List<int>(perm));
            return;
        }
        for (int i = 0; i < nums.Length; i++) {
            if ((mask & (1 << i)) == 0) {
                perm.Add(nums[i]);
                Backtrack(perm, nums, mask | (1 << i));
                perm.RemoveAt(perm.Count - 1);
            }
        }
    }
}
```

```go
func permute(nums []int) [][]int {
    var res [][]int
    backtrack(&res, []int{}, nums, 0)
    return res
}

func backtrack(res *[][]int, perm []int, nums []int, mask int) {
    if len(perm) == len(nums) {
        temp := append([]int{}, perm...)
        *res = append(*res, temp)
        return
    }
    for i := 0; i < len(nums); i++ {
        if mask&(1<<i) == 0 {
            perm = append(perm, nums[i])
            backtrack(res, perm, nums, mask|(1<<i))
            perm = perm[:len(perm)-1]
        }
    }
}
```

```kotlin
class Solution {
    private val res = mutableListOf<List<Int>>()
    
    fun permute(nums: IntArray): List<List<Int>> {
        backtrack(mutableListOf(), nums, 0)
        return res
    }
    
    private fun backtrack(perm: MutableList<Int>, nums: IntArray, mask: Int) {
        if (perm.size == nums.size) {
            res.add(ArrayList(perm))
            return
        }
        for (i in nums.indices) {
            if (mask and (1 shl i) == 0) {
                perm.add(nums[i])
                backtrack(perm, nums, mask or (1 shl i))
                perm.removeAt(perm.size - 1)
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n! * n)$
* Space complexity: $O(n)$

---

## 5. Backtracking (Optimal)

::tabs-start

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        self.res = []
        self.backtrack(nums, 0)
        return self.res

    def backtrack(self, nums: List[int], idx: int):
        if idx == len(nums):
            self.res.append(nums[:])
            return
        for i in range(idx, len(nums)):
            nums[idx], nums[i] = nums[i], nums[idx]
            self.backtrack(nums, idx + 1)
            nums[idx], nums[i] = nums[i], nums[idx]
```

```java
public class Solution {
    List<List<Integer>> res;
    public List<List<Integer>> permute(int[] nums) {
        res = new ArrayList<>();
        backtrack(nums, 0);
        return res;
    }

    public void backtrack(int[] nums, int idx) {
        if (idx == nums.length) {
            List<Integer> perm = new ArrayList<>();
            for (int num : nums) perm.add(num);
            res.add(perm);
            return;
        }
        for (int i = idx; i < nums.length; i++) {
            swap(nums, idx, i);
            backtrack(nums, idx + 1);
            swap(nums, idx, i);
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> res;
public:
    vector<vector<int>> permute(vector<int>& nums) {
        backtrack(nums, 0);
        return res;
    }

    void backtrack(vector<int>& nums, int idx) {
        if (idx == nums.size()) {
            res.push_back(nums);
            return;
        }
        for (int i = idx; i < nums.size(); i++) {
            swap(nums[idx], nums[i]);
            backtrack(nums, idx + 1);
            swap(nums[idx], nums[i]);
        }
    }
};
```

```javascript
class Solution {
    constructor() {
        this.res = [];
    }
    
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        this.backtrack(nums, 0);
        return this.res;
    }

    /**
     * @param {number[]} nums
     * @param {number} idx
     * @return {void}
     */
    backtrack(nums, idx) {
        if (idx === nums.length) {
            this.res.push([...nums]);
            return;
        }
        for (let i = idx; i < nums.length; i++) {
            [nums[idx], nums[i]] = [nums[i], nums[idx]];
            this.backtrack(nums, idx + 1);
            [nums[idx], nums[i]] = [nums[i], nums[idx]];
        }
    }
}
```

```csharp
public class Solution {
    private List<List<int>> res;

    public List<List<int>> Permute(int[] nums) {
        res = new List<List<int>>();
        Backtrack(nums, 0);
        return res;
    }

    private void Backtrack(int[] nums, int idx) {
        if (idx == nums.Length) {
            res.Add(new List<int>(nums));
            return;
        }
        for (int i = idx; i < nums.Length; i++) {
            Swap(nums, idx, i);
            Backtrack(nums, idx + 1);
            Swap(nums, idx, i);
        }
    }

    private void Swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

```go
func permute(nums []int) [][]int {
    var res [][]int
    backtrack(&res, nums, 0)
    return res
}

func backtrack(res *[][]int, nums []int, idx int) {
    if idx == len(nums) {
        temp := append([]int{}, nums...)
        *res = append(*res, temp)
        return
    }
    for i := idx; i < len(nums); i++ {
        nums[idx], nums[i] = nums[i], nums[idx]
        backtrack(res, nums, idx+1)
        nums[idx], nums[i] = nums[i], nums[idx]
    }
}
```

```kotlin
class Solution {
    private val res = mutableListOf<List<Int>>()
    
    fun permute(nums: IntArray): List<List<Int>> {
        backtrack(nums, 0)
        return res
    }
    
    private fun backtrack(nums: IntArray, idx: Int) {
        if (idx == nums.size) {
            res.add(nums.toList())
            return
        }
        for (i in idx until nums.size) {
            nums.swap(idx, i)
            backtrack(nums, idx + 1)
            nums.swap(idx, i)
        }
    }
    
    private fun IntArray.swap(i: Int, j: Int) {
        val temp = this[i]
        this[i] = this[j]
        this[j] = temp
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n! * n)$
* Space complexity: $O(n)$