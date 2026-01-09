## 1. Brute Force

### Intuition
We process children left to right, adjusting candies to satisfy the constraint that higher-rated children get more candy than their neighbors. When we increase a child's candy count, we may violate the constraint with a previous child, so we propagate updates backward as needed. This approach ensures correctness but may revisit the same positions multiple times.

### Algorithm
1. Initialize an array where each child starts with 1 candy.
2. Iterate through adjacent pairs from left to right.
3. If the current child has a higher rating than the previous one, give them one more candy than the previous child.
4. If the current child has a lower rating and they have the same number of candies, increment the previous child's candy count and propagate backward: for each earlier child with a higher rating than their right neighbor, increase their candy if needed.
5. Return the sum of all candies.

::tabs-start

```python
class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        arr = [1] * n

        for i in range(n - 1):
            if ratings[i] == ratings[i + 1]:
                continue
            if ratings[i + 1] > ratings[i]:
                arr[i + 1] = arr[i] + 1
            elif arr[i] == arr[i + 1]:
                arr[i + 1] = arr[i]
                arr[i] += 1
                for j in range(i - 1, -1, -1):
                    if ratings[j] > ratings[j + 1]:
                        if arr[j + 1] < arr[j]:
                            break
                        arr[j] += 1

        return sum(arr)
```

```java
public class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = 1;
        }

        for (int i = 0; i < n - 1; i++) {
            if (ratings[i] == ratings[i + 1]) {
                continue;
            }
            if (ratings[i + 1] > ratings[i]) {
                arr[i + 1] = arr[i] + 1;
            } else if (arr[i] == arr[i + 1]) {
                arr[i + 1] = arr[i];
                arr[i]++;
                for (int j = i - 1; j >= 0; j--) {
                    if (ratings[j] > ratings[j + 1]) {
                        if (arr[j + 1] < arr[j]) {
                            break;
                        }
                        arr[j]++;
                    }
                }
            }
        }

        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        return sum;
    }
}
```

```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> arr(n, 1);

        for (int i = 0; i < n - 1; i++) {
            if (ratings[i] == ratings[i + 1]) {
                continue;
            }
            if (ratings[i + 1] > ratings[i]) {
                arr[i + 1] = arr[i] + 1;
            } else if (arr[i] == arr[i + 1]) {
                arr[i + 1] = arr[i];
                arr[i]++;
                for (int j = i - 1; j >= 0; j--) {
                    if (ratings[j] > ratings[j + 1]) {
                        if (arr[j + 1] < arr[j]) {
                            break;
                        }
                        arr[j]++;
                    }
                }
            }
        }

        return accumulate(arr.begin(), arr.end(), 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} ratings
     * @return {number}
     */
    candy(ratings) {
        const n = ratings.length;
        const arr = new Array(n).fill(1);

        for (let i = 0; i < n - 1; i++) {
            if (ratings[i] === ratings[i + 1]) {
                continue;
            }
            if (ratings[i + 1] > ratings[i]) {
                arr[i + 1] = arr[i] + 1;
            } else if (arr[i] === arr[i + 1]) {
                arr[i + 1] = arr[i];
                arr[i]++;
                for (let j = i - 1; j >= 0; j--) {
                    if (ratings[j] > ratings[j + 1]) {
                        if (arr[j + 1] < arr[j]) {
                            break;
                        }
                        arr[j]++;
                    }
                }
            }
        }

        return arr.reduce((sum, num) => sum + num, 0);
    }
}
```

```csharp
public class Solution {
    public int Candy(int[] ratings) {
        int n = ratings.Length;
        int[] arr = new int[n];
        Array.Fill(arr, 1);

        for (int i = 0; i < n - 1; i++) {
            if (ratings[i] == ratings[i + 1]) {
                continue;
            }
            if (ratings[i + 1] > ratings[i]) {
                arr[i + 1] = arr[i] + 1;
            } else if (arr[i] == arr[i + 1]) {
                arr[i + 1] = arr[i];
                arr[i]++;
                for (int j = i - 1; j >= 0; j--) {
                    if (ratings[j] > ratings[j + 1]) {
                        if (arr[j + 1] < arr[j]) break;
                        arr[j]++;
                    } else {
                        break;
                    }
                }
            }
        }

        int total = 0;
        foreach (int a in arr) {
            total += a;
        }
        return total;
    }
}
```

```go
func candy(ratings []int) int {
    n := len(ratings)
    arr := make([]int, n)
    for i := range arr {
        arr[i] = 1
    }

    for i := 0; i < n-1; i++ {
        if ratings[i] == ratings[i+1] {
            continue
        }
        if ratings[i+1] > ratings[i] {
            arr[i+1] = arr[i] + 1
        } else if arr[i] == arr[i+1] {
            arr[i+1] = arr[i]
            arr[i]++
            for j := i - 1; j >= 0; j-- {
                if ratings[j] > ratings[j+1] {
                    if arr[j+1] < arr[j] {
                        break
                    }
                    arr[j]++
                } else {
                    break
                }
            }
        }
    }

    total := 0
    for _, a := range arr {
        total += a
    }
    return total
}
```

```kotlin
class Solution {
    fun candy(ratings: IntArray): Int {
        val n = ratings.size
        val arr = IntArray(n) { 1 }

        for (i in 0 until n - 1) {
            if (ratings[i] == ratings[i + 1]) {
                continue
            }
            if (ratings[i + 1] > ratings[i]) {
                arr[i + 1] = arr[i] + 1
            } else if (arr[i] == arr[i + 1]) {
                arr[i + 1] = arr[i]
                arr[i]++
                for (j in i - 1 downTo 0) {
                    if (ratings[j] > ratings[j + 1]) {
                        if (arr[j + 1] < arr[j]) break
                        arr[j]++
                    } else {
                        break
                    }
                }
            }
        }

        return arr.sum()
    }
}
```

```swift
class Solution {
    func candy(_ ratings: [Int]) -> Int {
        let n = ratings.count
        var arr = [Int](repeating: 1, count: n)

        for i in 0..<(n - 1) {
            if ratings[i] == ratings[i + 1] {
                continue
            }
            if ratings[i + 1] > ratings[i] {
                arr[i + 1] = arr[i] + 1
            } else if arr[i] == arr[i + 1] {
                arr[i + 1] = arr[i]
                arr[i] += 1
                for j in stride(from: i - 1, through: 0, by: -1) {
                    if ratings[j] > ratings[j + 1] {
                        if arr[j + 1] < arr[j] { break }
                        arr[j] += 1
                    } else {
                        break
                    }
                }
            }
        }

        return arr.reduce(0, +)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Greedy (Two Pass)

### Intuition
We can handle left and right neighbors separately. First, scan left to right to ensure each child with a higher rating than their left neighbor gets more candy. Then, scan right to left to handle the right neighbor constraint. When adjusting for right neighbors, we take the maximum of the current value and what the right constraint requires, preserving the left constraint satisfaction.

### Algorithm
1. Initialize an array where each child starts with 1 candy.
2. First pass (left to right): if a child's rating is higher than their left neighbor's, set their candy count to one more than the left neighbor.
3. Second pass (right to left): if a child's rating is higher than their right neighbor's, set their candy count to the maximum of its current value and one more than the right neighbor.
4. Return the sum of all candies.

::tabs-start

```python
class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        arr = [1] * n

        for i in range(1, n):
            if ratings[i - 1] < ratings[i]:
                arr[i] = arr[i - 1] + 1

        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                arr[i] = max(arr[i], arr[i + 1] + 1)

        return sum(arr)
```

```java
public class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] arr = new int[n];
        Arrays.fill(arr, 1);

        for (int i = 1; i < n; i++) {
            if (ratings[i - 1] < ratings[i]) {
                arr[i] = arr[i - 1] + 1;
            }
        }

        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                arr[i] = Math.max(arr[i], arr[i + 1] + 1);
            }
        }

        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        return sum;
    }
}
```

```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> arr(n, 1);

        for (int i = 1; i < n; i++) {
            if (ratings[i - 1] < ratings[i]) {
                arr[i] = arr[i - 1] + 1;
            }
        }

        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                arr[i] = max(arr[i], arr[i + 1] + 1);
            }
        }

        return accumulate(arr.begin(), arr.end(), 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} ratings
     * @return {number}
     */
    candy(ratings) {
        const n = ratings.length;
        const arr = new Array(n).fill(1);

        for (let i = 1; i < n; i++) {
            if (ratings[i - 1] < ratings[i]) {
                arr[i] = arr[i - 1] + 1;
            }
        }

        for (let i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                arr[i] = Math.max(arr[i], arr[i + 1] + 1);
            }
        }

        return arr.reduce((sum, num) => sum + num, 0);
    }
}
```

```csharp
public class Solution {
    public int Candy(int[] ratings) {
        int n = ratings.Length;
        int[] arr = new int[n];
        Array.Fill(arr, 1);

        for (int i = 1; i < n; i++) {
            if (ratings[i - 1] < ratings[i]) {
                arr[i] = arr[i - 1] + 1;
            }
        }

        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                arr[i] = Math.Max(arr[i], arr[i + 1] + 1);
            }
        }

        int total = 0;
        foreach (int a in arr) {
            total += a;
        }
        return total;
    }
}
```

```go
func candy(ratings []int) int {
    n := len(ratings)
    arr := make([]int, n)
    for i := range arr {
        arr[i] = 1
    }

    for i := 1; i < n; i++ {
        if ratings[i-1] < ratings[i] {
            arr[i] = arr[i-1] + 1
        }
    }

    for i := n - 2; i >= 0; i-- {
        if ratings[i] > ratings[i+1] {
            if arr[i+1]+1 > arr[i] {
                arr[i] = arr[i+1] + 1
            }
        }
    }

    total := 0
    for _, a := range arr {
        total += a
    }
    return total
}
```

```kotlin
class Solution {
    fun candy(ratings: IntArray): Int {
        val n = ratings.size
        val arr = IntArray(n) { 1 }

        for (i in 1 until n) {
            if (ratings[i - 1] < ratings[i]) {
                arr[i] = arr[i - 1] + 1
            }
        }

        for (i in n - 2 downTo 0) {
            if (ratings[i] > ratings[i + 1]) {
                arr[i] = maxOf(arr[i], arr[i + 1] + 1)
            }
        }

        return arr.sum()
    }
}
```

```swift
class Solution {
    func candy(_ ratings: [Int]) -> Int {
        let n = ratings.count
        var arr = [Int](repeating: 1, count: n)

        for i in 1..<n {
            if ratings[i - 1] < ratings[i] {
                arr[i] = arr[i - 1] + 1
            }
        }

        for i in stride(from: n - 2, through: 0, by: -1) {
            if ratings[i] > ratings[i + 1] {
                arr[i] = max(arr[i], arr[i + 1] + 1)
            }
        }

        return arr.reduce(0, +)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Greedy (One Pass)

### Intuition
We can compute the result without storing candy counts for each child. The key insight is that ratings form a sequence of increasing and decreasing runs. For an increasing run of length k, we need 1+2+...+k extra candies above the base. For a decreasing run of length k, we also need 1+2+...+k extra candies. The peak between an increasing and decreasing run should belong to whichever run is longer.

### Algorithm
1. Start with n candies (one per child as the base).
2. Iterate through the ratings, skipping equal adjacent ratings.
3. Count the length of each increasing run (consecutive ratings going up) and add the triangular number sum (1+2+...+inc) to the result.
4. Count the length of each decreasing run (consecutive ratings going down) and add its triangular sum to the result.
5. Subtract the minimum of the two run lengths since the peak was counted in both runs but should only be counted once (in the longer run).
6. Return the total.

::tabs-start

```python
class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        res = n

        i = 1
        while i < n:
            if ratings[i] == ratings[i - 1]:
                i += 1
                continue

            inc = 0
            while i < n and ratings[i] > ratings[i - 1]:
                inc += 1
                res += inc
                i += 1

            dec = 0
            while i < n and ratings[i] < ratings[i - 1]:
                dec += 1
                res += dec
                i += 1

            res -= min(inc, dec)

        return res
```

```java
public class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int res = n;

        int i = 1;
        while (i < n) {
            if (ratings[i] == ratings[i - 1]) {
                i++;
                continue;
            }

            int inc = 0;
            while (i < n && ratings[i] > ratings[i - 1]) {
                inc++;
                res += inc;
                i++;
            }

            int dec = 0;
            while (i < n && ratings[i] < ratings[i - 1]) {
                dec++;
                res += dec;
                i++;
            }

            res -= Math.min(inc, dec);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        int res = n;

        int i = 1;
        while (i < n) {
            if (ratings[i] == ratings[i - 1]) {
                i++;
                continue;
            }

            int inc = 0;
            while (i < n && ratings[i] > ratings[i - 1]) {
                inc++;
                res += inc;
                i++;
            }

            int dec = 0;
            while (i < n && ratings[i] < ratings[i - 1]) {
                dec++;
                res += dec;
                i++;
            }

            res -= min(inc, dec);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} ratings
     * @return {number}
     */
    candy(ratings) {
        const n = ratings.length;
        let res = n;

        let i = 1;
        while (i < n) {
            if (ratings[i] === ratings[i - 1]) {
                i++;
                continue;
            }

            let inc = 0;
            while (i < n && ratings[i] > ratings[i - 1]) {
                inc++;
                res += inc;
                i++;
            }

            let dec = 0;
            while (i < n && ratings[i] < ratings[i - 1]) {
                dec++;
                res += dec;
                i++;
            }

            res -= Math.min(inc, dec);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int Candy(int[] ratings) {
        int n = ratings.Length;
        int res = n;
        int i = 1;

        while (i < n) {
            if (ratings[i] == ratings[i - 1]) {
                i++;
                continue;
            }

            int inc = 0;
            while (i < n && ratings[i] > ratings[i - 1]) {
                inc++;
                res += inc;
                i++;
            }

            int dec = 0;
            while (i < n && ratings[i] < ratings[i - 1]) {
                dec++;
                res += dec;
                i++;
            }

            res -= Math.Min(inc, dec);
        }

        return res;
    }
}
```

```go
func candy(ratings []int) int {
    n := len(ratings)
    res := n

    i := 1
    for i < n {
        if ratings[i] == ratings[i-1] {
            i++
            continue
        }

        inc := 0
        for i < n && ratings[i] > ratings[i-1] {
            inc++
            res += inc
            i++
        }

        dec := 0
        for i < n && ratings[i] < ratings[i-1] {
            dec++
            res += dec
            i++
        }

        if inc < dec {
            res -= inc
        } else {
            res -= dec
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun candy(ratings: IntArray): Int {
        val n = ratings.size
        var res = n

        var i = 1
        while (i < n) {
            if (ratings[i] == ratings[i - 1]) {
                i++
                continue
            }

            var inc = 0
            while (i < n && ratings[i] > ratings[i - 1]) {
                inc++
                res += inc
                i++
            }

            var dec = 0
            while (i < n && ratings[i] < ratings[i - 1]) {
                dec++
                res += dec
                i++
            }

            res -= minOf(inc, dec)
        }

        return res
    }
}
```

```swift
class Solution {
    func candy(_ ratings: [Int]) -> Int {
        let n = ratings.count
        var res = n

        var i = 1
        while i < n {
            if ratings[i] == ratings[i - 1] {
                i += 1
                continue
            }

            var inc = 0
            while i < n && ratings[i] > ratings[i - 1] {
                inc += 1
                res += inc
                i += 1
            }

            var dec = 0
            while i < n && ratings[i] < ratings[i - 1] {
                dec += 1
                res += dec
                i += 1
            }

            res -= min(inc, dec)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
