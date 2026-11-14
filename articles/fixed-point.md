## 1. Linear Search

::tabs-start

```python
class Solution:
    def fixedPoint(self, arr: List[int]) -> int:
        for i in range(len(arr)):
            if arr[i] == i:
                return i
        return -1
```

```java
public class Solution {
    public int fixedPoint(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == i) {
                return i;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int fixedPoint(vector<int>& arr) {
        for (int i = 0; i < arr.size(); i++) {
            if (arr[i] == i) {
                return i;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    fixedPoint(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === i) {
                return i;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FixedPoint(int[] arr) {
        for (int i = 0; i < arr.Length; i++) {
            if (arr[i] == i) {
                return i;
            }
        }
        return -1;
    }
}
```

```go
func fixedPoint(arr []int) int {
    for i := 0; i < len(arr); i++ {
        if arr[i] == i {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun fixedPoint(arr: IntArray): Int {
        for (i in arr.indices) {
            if (arr[i] == i) {
                return i
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func fixedPoint(_ arr: [Int]) -> Int {
        for i in 0..<arr.count {
            if arr[i] == i {
                return i
            }
        }
        return -1
    }
}
```

```rust
impl Solution {
    pub fn fixed_point(arr: Vec<i32>) -> i32 {
        for i in 0..arr.len() {
            if arr[i] == i as i32 {
                return i as i32;
            }
        }
        -1
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    fixedPoint(arr: number[]): number {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === i) {
                return i;
            }
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

> Where $n$ is the length of the array $arr$.

---

## 2. Recursive Binary Search

::tabs-start

```python
class Solution:
    def binarySearch(self, l: int, r: int, arr: List[int]) -> int:
        if l > r:
            return -1
        m = l + (r - l) // 2

        if arr[m] < m:
            return self.binarySearch(m + 1, r, arr)
        if arr[m] > m:
            return self.binarySearch(l, m - 1, arr)
        left = self.binarySearch(l, m - 1, arr)
        return left if left != -1 else m

    def fixedPoint(self, arr: List[int]) -> int:
        return self.binarySearch(0, len(arr) - 1, arr)
```

```java
public class Solution {
    private int binarySearch(int l, int r, int[] arr) {
        if (l > r) return -1;
        int m = l + (r - l) / 2;

        if (arr[m] < m) {
            return binarySearch(m + 1, r, arr);
        }
        if (arr[m] > m) {
            return binarySearch(l, m - 1, arr);
        }
        int left = binarySearch(l, m - 1, arr);
        return left != -1 ? left : m;
    }

    public int fixedPoint(int[] arr) {
        return binarySearch(0, arr.length - 1, arr);
    }
}
```

```cpp
class Solution {
public:
    int binarySearch(int l, int r, vector<int>& arr) {
        if (l > r) return -1;
        int m = l + (r - l) / 2;

        if (arr[m] < m) {
            return binarySearch(m + 1, r, arr);
        }
        if (arr[m] > m) {
            return binarySearch(l, m - 1, arr);
        }
        int left = binarySearch(l, m - 1, arr);
        return left != -1 ? left : m;
    }

    int fixedPoint(vector<int>& arr) {
        return binarySearch(0, arr.size() - 1, arr);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    fixedPoint(arr) {
        return this.binarySearch(0, arr.length - 1, arr);
    }

    /**
     * @param {number} l
     * @param {number} r
     * @param {number[]} arr
     * @return {number}
     */
    binarySearch(l, r, arr) {
        if (l > r) return -1;
        const m = l + Math.floor((r - l) / 2);

        if (arr[m] < m) {
            return this.binarySearch(m + 1, r, arr);
        }
        if (arr[m] > m) {
            return this.binarySearch(l, m - 1, arr);
        }
        const left = this.binarySearch(l, m - 1, arr);
        return left !== -1 ? left : m;
    }
}
```

```csharp
public class Solution {
    private int BinarySearch(int l, int r, int[] arr) {
        if (l > r) return -1;
        int m = l + (r - l) / 2;

        if (arr[m] < m) {
            return BinarySearch(m + 1, r, arr);
        }
        if (arr[m] > m) {
            return BinarySearch(l, m - 1, arr);
        }
        int left = BinarySearch(l, m - 1, arr);
        return left != -1 ? left : m;
    }

    public int FixedPoint(int[] arr) {
        return BinarySearch(0, arr.Length - 1, arr);
    }
}
```

```go
func binarySearch(l, r int, arr []int) int {
    if l > r {
        return -1
    }
    m := l + (r-l)/2

    if arr[m] < m {
        return binarySearch(m+1, r, arr)
    }
    if arr[m] > m {
        return binarySearch(l, m-1, arr)
    }
    if left := binarySearch(l, m-1, arr); left != -1 {
        return left
    }
    return m
}

func fixedPoint(arr []int) int {
    return binarySearch(0, len(arr)-1, arr)
}
```

```kotlin
class Solution {
    private fun binarySearch(l: Int, r: Int, arr: IntArray): Int {
        if (l > r) {
            return -1
        }
        val m = l + (r - l) / 2

        return when {
            arr[m] < m -> binarySearch(m + 1, r, arr)
            arr[m] > m -> binarySearch(l, m - 1, arr)
            else -> {
                val left = binarySearch(l, m - 1, arr)
                if (left != -1) left else m
            }
        }
    }

    fun fixedPoint(arr: IntArray): Int {
        return binarySearch(0, arr.size - 1, arr)
    }
}
```

```swift
class Solution {
    func binarySearch(_ l: Int, _ r: Int, _ arr: [Int]) -> Int {
        if l > r {
            return -1
        }
        let m = l + (r - l) / 2

        if arr[m] < m {
            return binarySearch(m + 1, r, arr)
        }
        if arr[m] > m {
            return binarySearch(l, m - 1, arr)
        }
        let left = binarySearch(l, m - 1, arr)
        return left != -1 ? left : m
    }

    func fixedPoint(_ arr: [Int]) -> Int {
        return binarySearch(0, arr.count - 1, arr)
    }
}
```

```rust
impl Solution {
    pub fn fixed_point(arr: Vec<i32>) -> i32 {
        Self::binary_search(0, arr.len() as i32 - 1, &arr)
    }

    fn binary_search(l: i32, r: i32, arr: &[i32]) -> i32 {
        if l > r {
            return -1;
        }
        let m = l + (r - l) / 2;
        if arr[m as usize] < m {
            return Self::binary_search(m + 1, r, arr);
        }
        if arr[m as usize] > m {
            return Self::binary_search(l, m - 1, arr);
        }
        let left = Self::binary_search(l, m - 1, arr);
        if left != -1 { left } else { m }
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    fixedPoint(arr: number[]): number {
        return this.binarySearch(0, arr.length - 1, arr);
    }

    /**
     * @param {number} l
     * @param {number} r
     * @param {number[]} arr
     * @return {number}
     */
    binarySearch(l: number, r: number, arr: number[]): number {
        if (l > r) return -1;
        const m = l + Math.floor((r - l) / 2);

        if (arr[m] < m) {
            return this.binarySearch(m + 1, r, arr);
        }
        if (arr[m] > m) {
            return this.binarySearch(l, m - 1, arr);
        }
        const left = this.binarySearch(l, m - 1, arr);
        return left !== -1 ? left : m;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

> Where $n$ is the length of the array $arr$.

---

## 3. Iterative Binary Search

::tabs-start

```python
class Solution:
    def fixedPoint(self, arr: List[int]) -> int:
        l, r = 0, len(arr) - 1
        res = -1
        while l <= r:
            m = l + (r - l) // 2
            if arr[m] == m:
                res = m
                r = m - 1
            elif arr[m] < m:
                l = m + 1
            else:
                r = m - 1
        return res
```

```java
public class Solution {
    public int fixedPoint(int[] arr) {
        int l = 0, r = arr.length - 1;
        int res = -1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (arr[m] == m) {
                res = m;
                r = m - 1;
            } else if (arr[m] < m) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int fixedPoint(vector<int>& arr) {
        int l = 0, r = arr.size() - 1;
        int res = -1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (arr[m] == m) {
                res = m;
                r = m - 1;
            } else if (arr[m] < m) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    fixedPoint(arr) {
        let l = 0,
            r = arr.length - 1;
        let res = -1;
        while (l <= r) {
            const m = l + Math.floor((r - l) / 2);
            if (arr[m] === m) {
                res = m;
                r = m - 1;
            } else if (arr[m] < m) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int FixedPoint(int[] arr) {
        int l = 0, r = arr.Length - 1;
        int res = -1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (arr[m] == m) {
                res = m;
                r = m - 1;
            } else if (arr[m] < m) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return res;
    }
}
```

```go
func fixedPoint(arr []int) int {
    l, r := 0, len(arr)-1
    res := -1
    for l <= r {
        m := l + (r-l)/2
        if arr[m] == m {
            res = m
            r = m - 1
        } else if arr[m] < m {
            l = m + 1
        } else {
            r = m - 1
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun fixedPoint(arr: IntArray): Int {
        var l = 0
        var r = arr.size - 1
        var res = -1
        while (l <= r) {
            val m = l + (r - l) / 2
            if (arr[m] == m) {
                res = m
                r = m - 1
            } else if (arr[m] < m) {
                l = m + 1
            } else {
                r = m - 1
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func fixedPoint(_ arr: [Int]) -> Int {
        var l = 0, r = arr.count - 1
        var res = -1
        while l <= r {
            let m = l + (r - l) / 2
            if arr[m] == m {
                res = m
                r = m - 1
            } else if arr[m] < m {
                l = m + 1
            } else {
                r = m - 1
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn fixed_point(arr: Vec<i32>) -> i32 {
        let (mut l, mut r) = (0i32, arr.len() as i32 - 1);
        let mut res = -1;
        while l <= r {
            let m = l + (r - l) / 2;
            if arr[m as usize] == m {
                res = m;
                r = m - 1;
            } else if arr[m as usize] < m {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    fixedPoint(arr: number[]): number {
        let l = 0,
            r = arr.length - 1;
        let res = -1;
        while (l <= r) {
            const m = l + Math.floor((r - l) / 2);
            if (arr[m] === m) {
                res = m;
                r = m - 1;
            } else if (arr[m] < m) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

> Where $n$ is the length of the array $arr$.

---

## 4. Binary Search (Lower Bound)

::tabs-start

```python
class Solution:
    def fixedPoint(self, arr: List[int]) -> int:
        l, r = 0, len(arr)
        while l < r:
            m = l + (r - l) // 2
            if arr[m] >= m:
                r = m
            else:
                l = m + 1
        return l if l < len(arr) and arr[l] == l else -1
```

```java
public class Solution {
    public int fixedPoint(int[] arr) {
        int l = 0, r = arr.length;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (arr[m] >= m) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l < arr.length && arr[l] == l ? l : -1;
    }
}
```

```cpp
class Solution {
public:
    int fixedPoint(vector<int>& arr) {
        int l = 0, r = arr.size();
        while (l < r) {
            int m = l + (r - l) / 2;
            if (arr[m] >= m) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l < arr.size() && arr[l] == l ? l : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    fixedPoint(arr) {
        let l = 0,
            r = arr.length;
        while (l < r) {
            const m = l + Math.floor((r - l) / 2);
            if (arr[m] >= m) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l < arr.length && arr[l] === l ? l : -1;
    }
}
```

```csharp
public class Solution {
    public int FixedPoint(int[] arr) {
        int l = 0, r = arr.Length;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (arr[m] >= m) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l < arr.Length && arr[l] == l ? l : -1;
    }
}
```

```go
func fixedPoint(arr []int) int {
    l, r := 0, len(arr)
    for l < r {
        m := l + (r-l)/2
        if arr[m] >= m {
            r = m
        } else {
            l = m + 1
        }
    }
    if l < len(arr) && arr[l] == l {
        return l
    }
    return -1
}
```

```kotlin
class Solution {
    fun fixedPoint(arr: IntArray): Int {
        var l = 0
        var r = arr.size
        while (l < r) {
            val m = l + (r - l) / 2
            if (arr[m] >= m) {
                r = m
            } else {
                l = m + 1
            }
        }
        return if (l < arr.size && arr[l] == l) l else -1
    }
}
```

```swift
class Solution {
    func fixedPoint(_ arr: [Int]) -> Int {
        var l = 0, r = arr.count
        while l < r {
            let m = l + (r - l) / 2
            if arr[m] >= m {
                r = m
            } else {
                l = m + 1
            }
        }
        return l < arr.count && arr[l] == l ? l : -1
    }
}
```

```rust
impl Solution {
    pub fn fixed_point(arr: Vec<i32>) -> i32 {
        let (mut l, mut r) = (0, arr.len());
        while l < r {
            let m = l + (r - l) / 2;
            if arr[m] >= m as i32 {
                r = m;
            } else {
                l = m + 1;
            }
        }
        if l < arr.len() && arr[l] == l as i32 { l as i32 } else { -1 }
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    fixedPoint(arr: number[]): number {
        let l = 0,
            r = arr.length;
        while (l < r) {
            const m = l + Math.floor((r - l) / 2);
            if (arr[m] >= m) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l < arr.length && arr[l] === l ? l : -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

> Where $n$ is the length of the array $arr$.
