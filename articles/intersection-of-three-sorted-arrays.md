## 1. Brute Force

::tabs-start

```python
class Solution:
    def arraysIntersection(self, arr1: List[int], arr2: List[int], arr3: List[int]) -> List[int]:
        def contains(arr, target):
            for num in arr:
                if num == target:
                    return True
            return False

        res = []
        for num in arr1:
            if contains(arr2, num) and contains(arr3, num):
                res.append(num)
        return res
```

```java
public class Solution {
    public int[] arraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        List<Integer> res = new ArrayList<>();
        for (int num : arr1) {
            if (contains(arr2, num) && contains(arr3, num)) {
                res.add(num);
            }
        }
        return res.stream().mapToInt(Integer::intValue).toArray();
    }

    private boolean contains(int[] arr, int target) {
        for (int num : arr) {
            if (num == target) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        vector<int> res;
        for (int num : arr1) {
            if (contains(arr2, num) && contains(arr3, num)) {
                res.push_back(num);
            }
        }
        return res;
    }

private:
    bool contains(vector<int>& arr, int target) {
        for (int num : arr) {
            if (num == target) {
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @param {number[]} arr3
     * @return {number[]}
     */
    arraysIntersection(arr1, arr2, arr3) {
        const res = [];
        for (const num of arr1) {
            if (this.contains(arr2, num) && this.contains(arr3, num)) {
                res.push(num);
            }
        }
        return res;
    }

    /**
     * @param {number[]} arr
     * @param {number} target
     * @return {boolean}
     */
    contains(arr, target) {
        for (const num of arr) {
            if (num === target) {
                return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public int[] ArraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        List<int> res = new List<int>();
        foreach (int num in arr1) {
            if (Contains(arr2, num) && Contains(arr3, num)) {
                res.Add(num);
            }
        }
        return res.ToArray();
    }

    private bool Contains(int[] arr, int target) {
        foreach (int num in arr) {
            if (num == target) {
                return true;
            }
        }
        return false;
    }
}
```

```go
func arraysIntersection(arr1 []int, arr2 []int, arr3 []int) []int {
    contains := func(arr []int, target int) bool {
        for _, num := range arr {
            if num == target {
                return true
            }
        }
        return false
    }

    res := []int{}
    for _, num := range arr1 {
        if contains(arr2, num) && contains(arr3, num) {
            res = append(res, num)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun arraysIntersection(arr1: IntArray, arr2: IntArray, arr3: IntArray): IntArray {
        val res = mutableListOf<Int>()
        for (num in arr1) {
            if (contains(arr2, num) && contains(arr3, num)) {
                res.add(num)
            }
        }
        return res.toIntArray()
    }

    private fun contains(arr: IntArray, target: Int): Boolean {
        for (num in arr) {
            if (num == target) {
                return true
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func arraysIntersection(_ arr1: [Int], _ arr2: [Int], _ arr3: [Int]) -> [Int] {
        var res = [Int]()
        for num in arr1 {
            if contains(arr2, num) && contains(arr3, num) {
                res.append(num)
            }
        }
        return res
    }

    private func contains(_ arr: [Int], _ target: Int) -> Bool {
        for num in arr {
            if num == target {
                return true
            }
        }
        return false
    }
}
```

```rust
impl Solution {
    pub fn arrays_intersection(arr1: Vec<i32>, arr2: Vec<i32>, arr3: Vec<i32>) -> Vec<i32> {
        let mut res = Vec::new();
        for &num in &arr1 {
            if Self::contains(&arr2, num) && Self::contains(&arr3, num) {
                res.push(num);
            }
        }
        res
    }

    fn contains(arr: &[i32], target: i32) -> bool {
        for &num in arr {
            if num == target {
                return true;
            }
        }
        false
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @param {number[]} arr3
     * @return {number[]}
     */
    arraysIntersection(
        arr1: number[],
        arr2: number[],
        arr3: number[],
    ): number[] {
        const res: number[] = [];
        for (const num of arr1) {
            if (this.contains(arr2, num) && this.contains(arr3, num)) {
                res.push(num);
            }
        }
        return res;
    }

    /**
     * @param {number[]} arr
     * @param {number} target
     * @return {boolean}
     */
    contains(arr: number[], target: number): boolean {
        for (const num of arr) {
            if (num === target) {
                return true;
            }
        }
        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * (m + k))$
- Space complexity: $O(1)$ extra space.

> Where $n$, $m$, and $k$ are the lengths of the arrays $arr1$, $arr2$, and $arr3$ respectively.

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def arraysIntersection(self, arr1: List[int], arr2: List[int], arr3: List[int]) -> List[int]:
        count = {}
        for arr in (arr1, arr2, arr3):
            for num in arr:
                count[num] = count.get(num, 0) + 1

        res = []
        for num in arr1:
            if count[num] == 3:
                res.append(num)
        return res
```

```java
public class Solution {
    public int[] arraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int[] arr : new int[][] { arr1, arr2, arr3 }) {
            for (int num : arr) {
                count.put(num, count.getOrDefault(num, 0) + 1);
            }
        }

        List<Integer> res = new ArrayList<>();
        for (int num : arr1) {
            if (count.get(num) == 3) {
                res.add(num);
            }
        }
        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        unordered_map<int, int> count;
        for (vector<int>* arr : {&arr1, &arr2, &arr3}) {
            for (int num : *arr) {
                count[num]++;
            }
        }

        vector<int> res;
        for (int num : arr1) {
            if (count[num] == 3) {
                res.push_back(num);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @param {number[]} arr3
     * @return {number[]}
     */
    arraysIntersection(arr1, arr2, arr3) {
        const count = new Map();
        for (const arr of [arr1, arr2, arr3]) {
            for (const num of arr) {
                count.set(num, (count.get(num) || 0) + 1);
            }
        }

        const res = [];
        for (const num of arr1) {
            if (count.get(num) === 3) {
                res.push(num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] ArraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int[] arr in new int[][] { arr1, arr2, arr3 }) {
            foreach (int num in arr) {
                count[num] = count.GetValueOrDefault(num, 0) + 1;
            }
        }

        List<int> res = new List<int>();
        foreach (int num in arr1) {
            if (count[num] == 3) {
                res.Add(num);
            }
        }
        return res.ToArray();
    }
}
```

```go
func arraysIntersection(arr1 []int, arr2 []int, arr3 []int) []int {
    count := map[int]int{}
    for _, arr := range [][]int{arr1, arr2, arr3} {
        for _, num := range arr {
            count[num]++
        }
    }

    res := []int{}
    for _, num := range arr1 {
        if count[num] == 3 {
            res = append(res, num)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun arraysIntersection(arr1: IntArray, arr2: IntArray, arr3: IntArray): IntArray {
        val count = HashMap<Int, Int>()
        for (arr in arrayOf(arr1, arr2, arr3)) {
            for (num in arr) {
                count[num] = count.getOrDefault(num, 0) + 1
            }
        }

        val res = mutableListOf<Int>()
        for (num in arr1) {
            if (count[num] == 3) {
                res.add(num)
            }
        }
        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func arraysIntersection(_ arr1: [Int], _ arr2: [Int], _ arr3: [Int]) -> [Int] {
        var count = [Int: Int]()
        for arr in [arr1, arr2, arr3] {
            for num in arr {
                count[num, default: 0] += 1
            }
        }

        var res = [Int]()
        for num in arr1 {
            if count[num] == 3 {
                res.append(num)
            }
        }
        return res
    }
}
```

```rust
use std::collections::HashMap;

impl Solution {
    pub fn arrays_intersection(arr1: Vec<i32>, arr2: Vec<i32>, arr3: Vec<i32>) -> Vec<i32> {
        let mut count: HashMap<i32, i32> = HashMap::new();
        for arr in [&arr1, &arr2, &arr3] {
            for &num in arr.iter() {
                *count.entry(num).or_insert(0) += 1;
            }
        }

        let mut res = Vec::new();
        for &num in &arr1 {
            if count[&num] == 3 {
                res.push(num);
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @param {number[]} arr3
     * @return {number[]}
     */
    arraysIntersection(
        arr1: number[],
        arr2: number[],
        arr3: number[],
    ): number[] {
        const count = new Map<number, number>();
        for (const arr of [arr1, arr2, arr3]) {
            for (const num of arr) {
                count.set(num, (count.get(num) || 0) + 1);
            }
        }

        const res: number[] = [];
        for (const num of arr1) {
            if (count.get(num) === 3) {
                res.push(num);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m + k)$
- Space complexity: $O(n + m + k)$

> Where $n$, $m$, and $k$ are the lengths of the arrays $arr1$, $arr2$, and $arr3$ respectively.

---

## 3. Binary Search

::tabs-start

```python
class Solution:
    def arraysIntersection(self, arr1: List[int], arr2: List[int], arr3: List[int]) -> List[int]:
        def binarySearch(arr, target):
            l, r = 0, len(arr) - 1
            while l <= r:
                mid = (l + r) // 2
                if arr[mid] == target:
                    return True
                if arr[mid] < target:
                    l = mid + 1
                else:
                    r = mid - 1
            return False

        res = []
        for num in arr1:
            if binarySearch(arr2, num) and binarySearch(arr3, num):
                res.append(num)
        return res
```

```java
public class Solution {
    public int[] arraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        List<Integer> res = new ArrayList<>();
        for (int num : arr1) {
            if (binarySearch(arr2, num) && binarySearch(arr3, num)) {
                res.add(num);
            }
        }
        return res.stream().mapToInt(Integer::intValue).toArray();
    }

    private boolean binarySearch(int[] arr, int target) {
        int l = 0, r = arr.length - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (arr[mid] == target) {
                return true;
            }
            if (arr[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        vector<int> res;
        for (int num : arr1) {
            if (binarySearch(arr2, num) && binarySearch(arr3, num)) {
                res.push_back(num);
            }
        }
        return res;
    }

private:
    bool binarySearch(vector<int>& arr, int target) {
        int l = 0, r = arr.size() - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (arr[mid] == target) {
                return true;
            }
            if (arr[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @param {number[]} arr3
     * @return {number[]}
     */
    arraysIntersection(arr1, arr2, arr3) {
        const res = [];
        for (const num of arr1) {
            if (this.binarySearch(arr2, num) && this.binarySearch(arr3, num)) {
                res.push(num);
            }
        }
        return res;
    }

    /**
     * @param {number[]} arr
     * @param {number} target
     * @return {boolean}
     */
    binarySearch(arr, target) {
        let l = 0,
            r = arr.length - 1;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (arr[mid] === target) {
                return true;
            }
            if (arr[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public int[] ArraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        List<int> res = new List<int>();
        foreach (int num in arr1) {
            if (BinarySearch(arr2, num) && BinarySearch(arr3, num)) {
                res.Add(num);
            }
        }
        return res.ToArray();
    }

    private bool BinarySearch(int[] arr, int target) {
        int l = 0, r = arr.Length - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (arr[mid] == target) {
                return true;
            }
            if (arr[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return false;
    }
}
```

```go
func arraysIntersection(arr1 []int, arr2 []int, arr3 []int) []int {
    binarySearch := func(arr []int, target int) bool {
        l, r := 0, len(arr)-1
        for l <= r {
            mid := (l + r) / 2
            if arr[mid] == target {
                return true
            }
            if arr[mid] < target {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return false
    }

    res := []int{}
    for _, num := range arr1 {
        if binarySearch(arr2, num) && binarySearch(arr3, num) {
            res = append(res, num)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun arraysIntersection(arr1: IntArray, arr2: IntArray, arr3: IntArray): IntArray {
        val res = mutableListOf<Int>()
        for (num in arr1) {
            if (binarySearch(arr2, num) && binarySearch(arr3, num)) {
                res.add(num)
            }
        }
        return res.toIntArray()
    }

    private fun binarySearch(arr: IntArray, target: Int): Boolean {
        var l = 0
        var r = arr.size - 1
        while (l <= r) {
            val mid = (l + r) / 2
            if (arr[mid] == target) {
                return true
            }
            if (arr[mid] < target) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func arraysIntersection(_ arr1: [Int], _ arr2: [Int], _ arr3: [Int]) -> [Int] {
        var res = [Int]()
        for num in arr1 {
            if binarySearch(arr2, num) && binarySearch(arr3, num) {
                res.append(num)
            }
        }
        return res
    }

    private func binarySearch(_ arr: [Int], _ target: Int) -> Bool {
        var l = 0
        var r = arr.count - 1
        while l <= r {
            let mid = (l + r) / 2
            if arr[mid] == target {
                return true
            }
            if arr[mid] < target {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return false
    }
}
```

```rust
impl Solution {
    pub fn arrays_intersection(arr1: Vec<i32>, arr2: Vec<i32>, arr3: Vec<i32>) -> Vec<i32> {
        let mut res = Vec::new();
        for &num in &arr1 {
            if Self::binary_search(&arr2, num) && Self::binary_search(&arr3, num) {
                res.push(num);
            }
        }
        res
    }

    fn binary_search(arr: &[i32], target: i32) -> bool {
        let (mut l, mut r) = (0i32, arr.len() as i32 - 1);
        while l <= r {
            let mid = (l + r) / 2;
            if arr[mid as usize] == target {
                return true;
            }
            if arr[mid as usize] < target {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        false
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @param {number[]} arr3
     * @return {number[]}
     */
    arraysIntersection(
        arr1: number[],
        arr2: number[],
        arr3: number[],
    ): number[] {
        const res: number[] = [];
        for (const num of arr1) {
            if (this.binarySearch(arr2, num) && this.binarySearch(arr3, num)) {
                res.push(num);
            }
        }
        return res;
    }

    /**
     * @param {number[]} arr
     * @param {number} target
     * @return {boolean}
     */
    binarySearch(arr: number[], target: number): boolean {
        let l = 0,
            r = arr.length - 1;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (arr[mid] === target) {
                return true;
            }
            if (arr[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * (\log m + \log k))$
- Space complexity: $O(1)$ extra space.

> Where $n$, $m$, and $k$ are the lengths of the arrays $arr1$, $arr2$, and $arr3$ respectively.

---

## 4. Three Pointers

::tabs-start

```python
class Solution:
    def arraysIntersection(self, arr1: List[int], arr2: List[int], arr3: List[int]) -> List[int]:
        i = j = k = 0
        res = []
        while i < len(arr1) and j < len(arr2) and k < len(arr3):
            if arr1[i] == arr2[j] == arr3[k]:
                res.append(arr1[i])
                i += 1
                j += 1
                k += 1
            else:
                mn = min(arr1[i], arr2[j], arr3[k])
                if arr1[i] == mn:
                    i += 1
                if arr2[j] == mn:
                    j += 1
                if arr3[k] == mn:
                    k += 1
        return res
```

```java
public class Solution {
    public int[] arraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        int i = 0, j = 0, k = 0;
        List<Integer> res = new ArrayList<>();
        while (i < arr1.length && j < arr2.length && k < arr3.length) {
            if (arr1[i] == arr2[j] && arr2[j] == arr3[k]) {
                res.add(arr1[i]);
                i++;
                j++;
                k++;
            } else {
                int mn = Math.min(arr1[i], Math.min(arr2[j], arr3[k]));
                if (arr1[i] == mn) i++;
                if (arr2[j] == mn) j++;
                if (arr3[k] == mn) k++;
            }
        }
        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        int i = 0, j = 0, k = 0;
        vector<int> res;
        while (i < arr1.size() && j < arr2.size() && k < arr3.size()) {
            if (arr1[i] == arr2[j] && arr2[j] == arr3[k]) {
                res.push_back(arr1[i]);
                i++;
                j++;
                k++;
            } else {
                int mn = min({arr1[i], arr2[j], arr3[k]});
                if (arr1[i] == mn) i++;
                if (arr2[j] == mn) j++;
                if (arr3[k] == mn) k++;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @param {number[]} arr3
     * @return {number[]}
     */
    arraysIntersection(arr1, arr2, arr3) {
        let i = 0,
            j = 0,
            k = 0;
        const res = [];
        while (i < arr1.length && j < arr2.length && k < arr3.length) {
            if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
                res.push(arr1[i]);
                i++;
                j++;
                k++;
            } else {
                const mn = Math.min(arr1[i], arr2[j], arr3[k]);
                if (arr1[i] === mn) i++;
                if (arr2[j] === mn) j++;
                if (arr3[k] === mn) k++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] ArraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        int i = 0, j = 0, k = 0;
        List<int> res = new List<int>();
        while (i < arr1.Length && j < arr2.Length && k < arr3.Length) {
            if (arr1[i] == arr2[j] && arr2[j] == arr3[k]) {
                res.Add(arr1[i]);
                i++;
                j++;
                k++;
            } else {
                int mn = Math.Min(arr1[i], Math.Min(arr2[j], arr3[k]));
                if (arr1[i] == mn) i++;
                if (arr2[j] == mn) j++;
                if (arr3[k] == mn) k++;
            }
        }
        return res.ToArray();
    }
}
```

```go
func arraysIntersection(arr1 []int, arr2 []int, arr3 []int) []int {
    i, j, k := 0, 0, 0
    res := []int{}
    for i < len(arr1) && j < len(arr2) && k < len(arr3) {
        if arr1[i] == arr2[j] && arr2[j] == arr3[k] {
            res = append(res, arr1[i])
            i++
            j++
            k++
        } else {
            mn := min(arr1[i], arr2[j], arr3[k])
            if arr1[i] == mn {
                i++
            }
            if arr2[j] == mn {
                j++
            }
            if arr3[k] == mn {
                k++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun arraysIntersection(arr1: IntArray, arr2: IntArray, arr3: IntArray): IntArray {
        var i = 0
        var j = 0
        var k = 0
        val res = mutableListOf<Int>()
        while (i < arr1.size && j < arr2.size && k < arr3.size) {
            if (arr1[i] == arr2[j] && arr2[j] == arr3[k]) {
                res.add(arr1[i])
                i++
                j++
                k++
            } else {
                val mn = minOf(arr1[i], arr2[j], arr3[k])
                if (arr1[i] == mn) i++
                if (arr2[j] == mn) j++
                if (arr3[k] == mn) k++
            }
        }
        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func arraysIntersection(_ arr1: [Int], _ arr2: [Int], _ arr3: [Int]) -> [Int] {
        var i = 0, j = 0, k = 0
        var res = [Int]()
        while i < arr1.count && j < arr2.count && k < arr3.count {
            if arr1[i] == arr2[j] && arr2[j] == arr3[k] {
                res.append(arr1[i])
                i += 1
                j += 1
                k += 1
            } else {
                let mn = min(arr1[i], arr2[j], arr3[k])
                if arr1[i] == mn { i += 1 }
                if arr2[j] == mn { j += 1 }
                if arr3[k] == mn { k += 1 }
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn arrays_intersection(arr1: Vec<i32>, arr2: Vec<i32>, arr3: Vec<i32>) -> Vec<i32> {
        let (mut i, mut j, mut k) = (0, 0, 0);
        let mut res = Vec::new();
        while i < arr1.len() && j < arr2.len() && k < arr3.len() {
            if arr1[i] == arr2[j] && arr2[j] == arr3[k] {
                res.push(arr1[i]);
                i += 1;
                j += 1;
                k += 1;
            } else {
                let mn = arr1[i].min(arr2[j]).min(arr3[k]);
                if arr1[i] == mn { i += 1; }
                if arr2[j] == mn { j += 1; }
                if arr3[k] == mn { k += 1; }
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} arr1
     * @param {number[]} arr2
     * @param {number[]} arr3
     * @return {number[]}
     */
    arraysIntersection(
        arr1: number[],
        arr2: number[],
        arr3: number[],
    ): number[] {
        let i = 0,
            j = 0,
            k = 0;
        const res: number[] = [];
        while (i < arr1.length && j < arr2.length && k < arr3.length) {
            if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
                res.push(arr1[i]);
                i++;
                j++;
                k++;
            } else {
                const mn = Math.min(arr1[i], arr2[j], arr3[k]);
                if (arr1[i] === mn) i++;
                if (arr2[j] === mn) j++;
                if (arr3[k] === mn) k++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m + k)$
- Space complexity: $O(1)$ extra space.

> Where $n$, $m$, and $k$ are the lengths of the arrays $arr1$, $arr2$, and $arr3$ respectively.
