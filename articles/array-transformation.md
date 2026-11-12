## 1. Simulation (Extra Space)

::tabs-start

```python
class Solution:
    def transformArray(self, arr: List[int]) -> List[int]:
        changed = True
        while changed:
            changed = False
            prev = arr[:]
            for i in range(1, len(arr) - 1):
                if prev[i] > prev[i - 1] and prev[i] > prev[i + 1]:
                    arr[i] -= 1
                    changed = True
                elif prev[i] < prev[i - 1] and prev[i] < prev[i + 1]:
                    arr[i] += 1
                    changed = True
        return arr
```

```java
public class Solution {
    public List<Integer> transformArray(int[] arr) {
        boolean changed = true;
        while (changed) {
            changed = false;
            int[] prev = arr.clone();
            for (int i = 1; i < arr.length - 1; i++) {
                if (prev[i] > prev[i - 1] && prev[i] > prev[i + 1]) {
                    arr[i]--;
                    changed = true;
                } else if (prev[i] < prev[i - 1] && prev[i] < prev[i + 1]) {
                    arr[i]++;
                    changed = true;
                }
            }
        }

        List<Integer> res = new ArrayList<>();
        for (int num : arr) {
            res.add(num);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> transformArray(vector<int>& arr) {
        bool changed = true;
        while (changed) {
            changed = false;
            vector<int> prev = arr;
            for (int i = 1; i < (int)arr.size() - 1; i++) {
                if (prev[i] > prev[i - 1] && prev[i] > prev[i + 1]) {
                    arr[i]--;
                    changed = true;
                } else if (prev[i] < prev[i - 1] && prev[i] < prev[i + 1]) {
                    arr[i]++;
                    changed = true;
                }
            }
        }
        return arr;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number[]}
     */
    transformArray(arr) {
        let changed = true;
        while (changed) {
            changed = false;
            const prev = [...arr];
            for (let i = 1; i < arr.length - 1; i++) {
                if (prev[i] > prev[i - 1] && prev[i] > prev[i + 1]) {
                    arr[i]--;
                    changed = true;
                } else if (prev[i] < prev[i - 1] && prev[i] < prev[i + 1]) {
                    arr[i]++;
                    changed = true;
                }
            }
        }
        return arr;
    }
}
```

```csharp
public class Solution {
    public List<int> TransformArray(int[] arr) {
        bool changed = true;
        while (changed) {
            changed = false;
            int[] prev = (int[])arr.Clone();
            for (int i = 1; i < arr.Length - 1; i++) {
                if (prev[i] > prev[i - 1] && prev[i] > prev[i + 1]) {
                    arr[i]--;
                    changed = true;
                } else if (prev[i] < prev[i - 1] && prev[i] < prev[i + 1]) {
                    arr[i]++;
                    changed = true;
                }
            }
        }
        return new List<int>(arr);
    }
}
```

```go
func transformArray(arr []int) []int {
    changed := true
    for changed {
        changed = false
        prev := make([]int, len(arr))
        copy(prev, arr)
        for i := 1; i < len(arr)-1; i++ {
            if prev[i] > prev[i-1] && prev[i] > prev[i+1] {
                arr[i]--
                changed = true
            } else if prev[i] < prev[i-1] && prev[i] < prev[i+1] {
                arr[i]++
                changed = true
            }
        }
    }
    return arr
}
```

```kotlin
class Solution {
    fun transformArray(arr: IntArray): List<Int> {
        var changed = true
        while (changed) {
            changed = false
            val prev = arr.copyOf()
            for (i in 1 until arr.size - 1) {
                if (prev[i] > prev[i - 1] && prev[i] > prev[i + 1]) {
                    arr[i]--
                    changed = true
                } else if (prev[i] < prev[i - 1] && prev[i] < prev[i + 1]) {
                    arr[i]++
                    changed = true
                }
            }
        }
        return arr.toList()
    }
}
```

```swift
class Solution {
    func transformArray(_ arr: [Int]) -> [Int] {
        var arr = arr
        var changed = true
        while changed {
            changed = false
            let prev = arr
            for i in 1..<(arr.count - 1) {
                if prev[i] > prev[i - 1] && prev[i] > prev[i + 1] {
                    arr[i] -= 1
                    changed = true
                } else if prev[i] < prev[i - 1] && prev[i] < prev[i + 1] {
                    arr[i] += 1
                    changed = true
                }
            }
        }
        return arr
    }
}
```

```rust
impl Solution {
    pub fn transform_array(arr: Vec<i32>) -> Vec<i32> {
        let mut arr = arr;
        let mut changed = true;
        while changed {
            changed = false;
            let prev = arr.clone();
            for i in 1..arr.len() - 1 {
                if prev[i] > prev[i - 1] && prev[i] > prev[i + 1] {
                    arr[i] -= 1;
                    changed = true;
                } else if prev[i] < prev[i - 1] && prev[i] < prev[i + 1] {
                    arr[i] += 1;
                    changed = true;
                }
            }
        }
        arr
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number[]}
     */
    transformArray(arr: number[]): number[] {
        let changed = true;
        while (changed) {
            changed = false;
            const prev = [...arr];
            for (let i = 1; i < arr.length - 1; i++) {
                if (prev[i] > prev[i - 1] && prev[i] > prev[i + 1]) {
                    arr[i]--;
                    changed = true;
                } else if (prev[i] < prev[i - 1] && prev[i] < prev[i + 1]) {
                    arr[i]++;
                    changed = true;
                }
            }
        }
        return arr;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot (n + m))$
- Space complexity: $O(n)$

> Where $n$ is the length of the array $arr$ and $m$ is the maximum value in $arr$.

---

## 2. Simulation

::tabs-start

```python
class Solution:
    def transformArray(self, arr: List[int]) -> List[int]:
        changed = True
        while changed:
            changed = False
            prev = arr[0]
            for i in range(1, len(arr) - 1):
                cur = arr[i]
                if cur > prev and cur > arr[i + 1]:
                    arr[i] -= 1
                    changed = True
                elif cur < prev and cur < arr[i + 1]:
                    arr[i] += 1
                    changed = True
                prev = cur
        return arr
```

```java
public class Solution {
    public List<Integer> transformArray(int[] arr) {
        boolean changed = true;
        while (changed) {
            changed = false;
            int prev = arr[0];
            for (int i = 1; i < arr.length - 1; i++) {
                int cur = arr[i];
                if (cur > prev && cur > arr[i + 1]) {
                    arr[i]--;
                    changed = true;
                } else if (cur < prev && cur < arr[i + 1]) {
                    arr[i]++;
                    changed = true;
                }
                prev = cur;
            }
        }

        List<Integer> res = new ArrayList<>();
        for (int num : arr) {
            res.add(num);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> transformArray(vector<int>& arr) {
        bool changed = true;
        while (changed) {
            changed = false;
            int prev = arr[0];
            for (int i = 1; i < (int)arr.size() - 1; i++) {
                int cur = arr[i];
                if (cur > prev && cur > arr[i + 1]) {
                    arr[i]--;
                    changed = true;
                } else if (cur < prev && cur < arr[i + 1]) {
                    arr[i]++;
                    changed = true;
                }
                prev = cur;
            }
        }
        return arr;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number[]}
     */
    transformArray(arr) {
        let changed = true;
        while (changed) {
            changed = false;
            let prev = arr[0];
            for (let i = 1; i < arr.length - 1; i++) {
                const cur = arr[i];
                if (cur > prev && cur > arr[i + 1]) {
                    arr[i]--;
                    changed = true;
                } else if (cur < prev && cur < arr[i + 1]) {
                    arr[i]++;
                    changed = true;
                }
                prev = cur;
            }
        }
        return arr;
    }
}
```

```csharp
public class Solution {
    public List<int> TransformArray(int[] arr) {
        bool changed = true;
        while (changed) {
            changed = false;
            int prev = arr[0];
            for (int i = 1; i < arr.Length - 1; i++) {
                int cur = arr[i];
                if (cur > prev && cur > arr[i + 1]) {
                    arr[i]--;
                    changed = true;
                } else if (cur < prev && cur < arr[i + 1]) {
                    arr[i]++;
                    changed = true;
                }
                prev = cur;
            }
        }
        return new List<int>(arr);
    }
}
```

```go
func transformArray(arr []int) []int {
    changed := true
    for changed {
        changed = false
        prev := arr[0]
        for i := 1; i < len(arr)-1; i++ {
            cur := arr[i]
            if cur > prev && cur > arr[i+1] {
                arr[i]--
                changed = true
            } else if cur < prev && cur < arr[i+1] {
                arr[i]++
                changed = true
            }
            prev = cur
        }
    }
    return arr
}
```

```kotlin
class Solution {
    fun transformArray(arr: IntArray): List<Int> {
        var changed = true
        while (changed) {
            changed = false
            var prev = arr[0]
            for (i in 1 until arr.size - 1) {
                val cur = arr[i]
                if (cur > prev && cur > arr[i + 1]) {
                    arr[i]--
                    changed = true
                } else if (cur < prev && cur < arr[i + 1]) {
                    arr[i]++
                    changed = true
                }
                prev = cur
            }
        }
        return arr.toList()
    }
}
```

```swift
class Solution {
    func transformArray(_ arr: [Int]) -> [Int] {
        var arr = arr
        var changed = true
        while changed {
            changed = false
            var prev = arr[0]
            for i in 1..<(arr.count - 1) {
                let cur = arr[i]
                if cur > prev && cur > arr[i + 1] {
                    arr[i] -= 1
                    changed = true
                } else if cur < prev && cur < arr[i + 1] {
                    arr[i] += 1
                    changed = true
                }
                prev = cur
            }
        }
        return arr
    }
}
```

```rust
impl Solution {
    pub fn transform_array(arr: Vec<i32>) -> Vec<i32> {
        let mut arr = arr;
        let mut changed = true;
        while changed {
            changed = false;
            let mut prev = arr[0];
            for i in 1..arr.len() - 1 {
                let cur = arr[i];
                if cur > prev && cur > arr[i + 1] {
                    arr[i] -= 1;
                    changed = true;
                } else if cur < prev && cur < arr[i + 1] {
                    arr[i] += 1;
                    changed = true;
                }
                prev = cur;
            }
        }
        arr
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number[]}
     */
    transformArray(arr: number[]): number[] {
        let changed = true;
        while (changed) {
            changed = false;
            let prev = arr[0];
            for (let i = 1; i < arr.length - 1; i++) {
                const cur = arr[i];
                if (cur > prev && cur > arr[i + 1]) {
                    arr[i]--;
                    changed = true;
                } else if (cur < prev && cur < arr[i + 1]) {
                    arr[i]++;
                    changed = true;
                }
                prev = cur;
            }
        }
        return arr;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot (n + m))$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the array $arr$ and $m$ is the maximum value in $arr$.

---

## 3. Simulation (Optimal)

::tabs-start

```python
class Solution:
    def transformArray(self, arr: List[int]) -> List[int]:
        n = len(arr)
        changed = True
        while changed:
            changed = False
            i = 1
            while i < n - 1:
                if not self.isExtremum(arr, i):
                    i += 1
                    continue

                j = i
                while j < n - 1 and self.isExtremum(arr, j):
                    j += 1

                steps = float("inf")
                for k in range(i, j):
                    left = abs(arr[k] - arr[k - 1])
                    right = abs(arr[k] - arr[k + 1])
                    if k > i:
                        left = (left + 1) // 2
                    if k < j - 1:
                        right = (right + 1) // 2
                    steps = min(steps, left, right)

                for k in range(i, j):
                    if arr[k] < arr[k + 1]:
                        arr[k] += steps
                    else:
                        arr[k] -= steps

                changed = True
                i = j
        return arr

    def isExtremum(self, arr: List[int], i: int) -> bool:
        return (arr[i] > arr[i - 1] and arr[i] > arr[i + 1]) or (
            arr[i] < arr[i - 1] and arr[i] < arr[i + 1]
        )
```

```java
public class Solution {
    public List<Integer> transformArray(int[] arr) {
        int n = arr.length;
        boolean changed = true;
        while (changed) {
            changed = false;
            int i = 1;
            while (i < n - 1) {
                if (!isExtremum(arr, i)) {
                    i++;
                    continue;
                }

                int j = i;
                while (j < n - 1 && isExtremum(arr, j)) {
                    j++;
                }

                int steps = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int left = Math.abs(arr[k] - arr[k - 1]);
                    int right = Math.abs(arr[k] - arr[k + 1]);
                    if (k > i) {
                        left = (left + 1) / 2;
                    }
                    if (k < j - 1) {
                        right = (right + 1) / 2;
                    }
                    steps = Math.min(steps, Math.min(left, right));
                }

                for (int k = i; k < j; k++) {
                    if (arr[k] < arr[k + 1]) {
                        arr[k] += steps;
                    } else {
                        arr[k] -= steps;
                    }
                }

                changed = true;
                i = j;
            }
        }

        List<Integer> res = new ArrayList<>();
        for (int num : arr) {
            res.add(num);
        }
        return res;
    }

    private boolean isExtremum(int[] arr, int i) {
        return (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) ||
               (arr[i] < arr[i - 1] && arr[i] < arr[i + 1]);
    }
}
```

```cpp
class Solution {
public:
    vector<int> transformArray(vector<int>& arr) {
        int n = arr.size();
        bool changed = true;
        while (changed) {
            changed = false;
            int i = 1;
            while (i < n - 1) {
                if (!isExtremum(arr, i)) {
                    i++;
                    continue;
                }

                int j = i;
                while (j < n - 1 && isExtremum(arr, j)) {
                    j++;
                }

                int steps = INT_MAX;
                for (int k = i; k < j; k++) {
                    int left = abs(arr[k] - arr[k - 1]);
                    int right = abs(arr[k] - arr[k + 1]);
                    if (k > i) {
                        left = (left + 1) / 2;
                    }
                    if (k < j - 1) {
                        right = (right + 1) / 2;
                    }
                    steps = min(steps, min(left, right));
                }

                for (int k = i; k < j; k++) {
                    if (arr[k] < arr[k + 1]) {
                        arr[k] += steps;
                    } else {
                        arr[k] -= steps;
                    }
                }

                changed = true;
                i = j;
            }
        }
        return arr;
    }

private:
    bool isExtremum(vector<int>& arr, int i) {
        return (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) ||
               (arr[i] < arr[i - 1] && arr[i] < arr[i + 1]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number[]}
     */
    transformArray(arr) {
        const n = arr.length;
        let changed = true;
        while (changed) {
            changed = false;
            let i = 1;
            while (i < n - 1) {
                if (!this.isExtremum(arr, i)) {
                    i++;
                    continue;
                }

                let j = i;
                while (j < n - 1 && this.isExtremum(arr, j)) {
                    j++;
                }

                let steps = Infinity;
                for (let k = i; k < j; k++) {
                    let left = Math.abs(arr[k] - arr[k - 1]);
                    let right = Math.abs(arr[k] - arr[k + 1]);
                    if (k > i) {
                        left = Math.floor((left + 1) / 2);
                    }
                    if (k < j - 1) {
                        right = Math.floor((right + 1) / 2);
                    }
                    steps = Math.min(steps, left, right);
                }

                for (let k = i; k < j; k++) {
                    if (arr[k] < arr[k + 1]) {
                        arr[k] += steps;
                    } else {
                        arr[k] -= steps;
                    }
                }

                changed = true;
                i = j;
            }
        }
        return arr;
    }

    /**
     * @param {number[]} arr
     * @param {number} i
     * @return {boolean}
     */
    isExtremum(arr, i) {
        return (
            (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) ||
            (arr[i] < arr[i - 1] && arr[i] < arr[i + 1])
        );
    }
}
```

```csharp
public class Solution {
    public List<int> TransformArray(int[] arr) {
        int n = arr.Length;
        bool changed = true;
        while (changed) {
            changed = false;
            int i = 1;
            while (i < n - 1) {
                if (!IsExtremum(arr, i)) {
                    i++;
                    continue;
                }

                int j = i;
                while (j < n - 1 && IsExtremum(arr, j)) {
                    j++;
                }

                int steps = int.MaxValue;
                for (int k = i; k < j; k++) {
                    int left = Math.Abs(arr[k] - arr[k - 1]);
                    int right = Math.Abs(arr[k] - arr[k + 1]);
                    if (k > i) {
                        left = (left + 1) / 2;
                    }
                    if (k < j - 1) {
                        right = (right + 1) / 2;
                    }
                    steps = Math.Min(steps, Math.Min(left, right));
                }

                for (int k = i; k < j; k++) {
                    if (arr[k] < arr[k + 1]) {
                        arr[k] += steps;
                    } else {
                        arr[k] -= steps;
                    }
                }

                changed = true;
                i = j;
            }
        }
        return new List<int>(arr);
    }

    private bool IsExtremum(int[] arr, int i) {
        return (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) ||
               (arr[i] < arr[i - 1] && arr[i] < arr[i + 1]);
    }
}
```

```go
func transformArray(arr []int) []int {
    n := len(arr)
    isExtremum := func(i int) bool {
        return (arr[i] > arr[i-1] && arr[i] > arr[i+1]) ||
            (arr[i] < arr[i-1] && arr[i] < arr[i+1])
    }
    abs := func(x int) int {
        if x < 0 {
            return -x
        }
        return x
    }

    changed := true
    for changed {
        changed = false
        i := 1
        for i < n-1 {
            if !isExtremum(i) {
                i++
                continue
            }

            j := i
            for j < n-1 && isExtremum(j) {
                j++
            }

            steps := math.MaxInt32
            for k := i; k < j; k++ {
                left := abs(arr[k] - arr[k-1])
                right := abs(arr[k] - arr[k+1])
                if k > i {
                    left = (left + 1) / 2
                }
                if k < j-1 {
                    right = (right + 1) / 2
                }
                steps = min(steps, left, right)
            }

            for k := i; k < j; k++ {
                if arr[k] < arr[k+1] {
                    arr[k] += steps
                } else {
                    arr[k] -= steps
                }
            }

            changed = true
            i = j
        }
    }
    return arr
}
```

```kotlin
class Solution {
    fun transformArray(arr: IntArray): List<Int> {
        val n = arr.size
        var changed = true
        while (changed) {
            changed = false
            var i = 1
            while (i < n - 1) {
                if (!isExtremum(arr, i)) {
                    i++
                    continue
                }

                var j = i
                while (j < n - 1 && isExtremum(arr, j)) {
                    j++
                }

                var steps = Int.MAX_VALUE
                for (k in i until j) {
                    var left = Math.abs(arr[k] - arr[k - 1])
                    var right = Math.abs(arr[k] - arr[k + 1])
                    if (k > i) {
                        left = (left + 1) / 2
                    }
                    if (k < j - 1) {
                        right = (right + 1) / 2
                    }
                    steps = minOf(steps, left, right)
                }

                for (k in i until j) {
                    if (arr[k] < arr[k + 1]) {
                        arr[k] += steps
                    } else {
                        arr[k] -= steps
                    }
                }

                changed = true
                i = j
            }
        }
        return arr.toList()
    }

    private fun isExtremum(arr: IntArray, i: Int): Boolean {
        return (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) ||
               (arr[i] < arr[i - 1] && arr[i] < arr[i + 1])
    }
}
```

```swift
class Solution {
    func transformArray(_ arr: [Int]) -> [Int] {
        var arr = arr
        let n = arr.count
        var changed = true
        while changed {
            changed = false
            var i = 1
            while i < n - 1 {
                if !isExtremum(arr, i) {
                    i += 1
                    continue
                }

                var j = i
                while j < n - 1 && isExtremum(arr, j) {
                    j += 1
                }

                var steps = Int.max
                for k in i..<j {
                    var left = abs(arr[k] - arr[k - 1])
                    var right = abs(arr[k] - arr[k + 1])
                    if k > i {
                        left = (left + 1) / 2
                    }
                    if k < j - 1 {
                        right = (right + 1) / 2
                    }
                    steps = min(steps, left, right)
                }

                for k in i..<j {
                    if arr[k] < arr[k + 1] {
                        arr[k] += steps
                    } else {
                        arr[k] -= steps
                    }
                }

                changed = true
                i = j
            }
        }
        return arr
    }

    private func isExtremum(_ arr: [Int], _ i: Int) -> Bool {
        return (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) ||
               (arr[i] < arr[i - 1] && arr[i] < arr[i + 1])
    }
}
```

```rust
impl Solution {
    pub fn transform_array(arr: Vec<i32>) -> Vec<i32> {
        let mut arr = arr;
        let n = arr.len();
        let mut changed = true;
        while changed {
            changed = false;
            let mut i = 1;
            while i < n - 1 {
                if !Self::is_extremum(&arr, i) {
                    i += 1;
                    continue;
                }

                let mut j = i;
                while j < n - 1 && Self::is_extremum(&arr, j) {
                    j += 1;
                }

                let mut steps = i32::MAX;
                for k in i..j {
                    let mut left = (arr[k] - arr[k - 1]).abs();
                    let mut right = (arr[k] - arr[k + 1]).abs();
                    if k > i {
                        left = (left + 1) / 2;
                    }
                    if k < j - 1 {
                        right = (right + 1) / 2;
                    }
                    steps = steps.min(left).min(right);
                }

                for k in i..j {
                    if arr[k] < arr[k + 1] {
                        arr[k] += steps;
                    } else {
                        arr[k] -= steps;
                    }
                }

                changed = true;
                i = j;
            }
        }
        arr
    }

    fn is_extremum(arr: &[i32], i: usize) -> bool {
        (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) ||
        (arr[i] < arr[i - 1] && arr[i] < arr[i + 1])
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number[]}
     */
    transformArray(arr: number[]): number[] {
        const n = arr.length;
        let changed = true;
        while (changed) {
            changed = false;
            let i = 1;
            while (i < n - 1) {
                if (!this.isExtremum(arr, i)) {
                    i++;
                    continue;
                }

                let j = i;
                while (j < n - 1 && this.isExtremum(arr, j)) {
                    j++;
                }

                let steps = Infinity;
                for (let k = i; k < j; k++) {
                    let left = Math.abs(arr[k] - arr[k - 1]);
                    let right = Math.abs(arr[k] - arr[k + 1]);
                    if (k > i) {
                        left = Math.floor((left + 1) / 2);
                    }
                    if (k < j - 1) {
                        right = Math.floor((right + 1) / 2);
                    }
                    steps = Math.min(steps, left, right);
                }

                for (let k = i; k < j; k++) {
                    if (arr[k] < arr[k + 1]) {
                        arr[k] += steps;
                    } else {
                        arr[k] -= steps;
                    }
                }

                changed = true;
                i = j;
            }
        }
        return arr;
    }

    /**
     * @param {number[]} arr
     * @param {number} i
     * @return {boolean}
     */
    isExtremum(arr: number[], i: number): boolean {
        return (
            (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) ||
            (arr[i] < arr[i - 1] && arr[i] < arr[i + 1])
        );
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot (n + m))$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the array $arr$ and $m$ is the maximum value in $arr$.
