## 1. Sorting + Two Pointers

### Intuition
Since each boat can carry at most two people and has a weight limit, we want to pair the heaviest person with the lightest person when possible. By sorting the weights, we can use two pointers: one at the heaviest person and one at the lightest. If they can share a boat, we move both pointers; otherwise, the heaviest person takes a boat alone.

### Algorithm
1. Sort the `people` array in ascending order.
2. Initialize two pointers: `left` at index `0`, `right` at the last index.
3. Initialize a boat counter to `0`.
4. While `left` is less than or equal to `right`:
   - Calculate the remaining capacity after placing the heaviest person (at `right`).
   - Decrement `right` and increment the boat count.
   - If the lightest person (at `left`) fits in the remaining capacity and `left` is still valid, increment `left`.
5. Return the boat count.

::tabs-start

```python
class Solution:
    def numRescueBoats(self, people: List[int], limit: int) -> int:
        people.sort()
        res, l, r = 0, 0, len(people) - 1
        while l <= r:
            remain = limit - people[r]
            r -= 1
            res += 1
            if l <= r and remain >= people[l]:
                l += 1
        return res
```

```java
public class Solution {
    public int numRescueBoats(int[] people, int limit) {
        Arrays.sort(people);
        int res = 0, l = 0, r = people.length - 1;
        while (l <= r) {
            int remain = limit - people[r--];
            res++;
            if (l <= r && remain >= people[l]) {
                l++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numRescueBoats(vector<int>& people, int limit) {
        sort(people.begin(), people.end());
        int res = 0, l = 0, r = people.size() - 1;
        while (l <= r) {
            int remain = limit - people[r--];
            res++;
            if (l <= r && remain >= people[l]) {
                l++;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} people
     * @param {number} limit
     * @return {number}
     */
    numRescueBoats(people, limit) {
        people.sort((a, b) => a - b);
        let res = 0,
            l = 0,
            r = people.length - 1;
        while (l <= r) {
            let remain = limit - people[r--];
            res++;
            if (l <= r && remain >= people[l]) {
                l++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumRescueBoats(int[] people, int limit) {
        Array.Sort(people);
        int res = 0, l = 0, r = people.Length - 1;

        while (l <= r) {
            int remain = limit - people[r];
            r--;
            res++;

            if (l <= r && remain >= people[l]) {
                l++;
            }
        }

        return res;
    }
}
```

```go
func numRescueBoats(people []int, limit int) int {
    sort.Ints(people)
    res, l, r := 0, 0, len(people)-1
    for l <= r {
        remain := limit - people[r]
        r--
        res++
        if l <= r && remain >= people[l] {
            l++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun numRescueBoats(people: IntArray, limit: Int): Int {
        people.sort()
        var res = 0
        var l = 0
        var r = people.size - 1
        while (l <= r) {
            val remain = limit - people[r]
            r--
            res++
            if (l <= r && remain >= people[l]) {
                l++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func numRescueBoats(_ people: [Int], _ limit: Int) -> Int {
        var people = people.sorted()
        var res = 0
        var l = 0
        var r = people.count - 1
        while l <= r {
            let remain = limit - people[r]
            r -= 1
            res += 1
            if l <= r && remain >= people[l] {
                l += 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Counting Sort

### Intuition
When the range of weights is limited, counting sort can be faster than comparison-based sorting. We count the frequency of each weight, then reconstruct the sorted array. After sorting, we apply the same two-pointer greedy strategy as before.

### Algorithm
1. Find the maximum weight in the array.
2. Create a count array of size `(max + 1)` and count the frequency of each weight.
3. Reconstruct the sorted array by iterating through the count array.
4. Apply the two-pointer approach:
   - Initialize `left` at `0` and `right` at the end.
   - While `left` is less than or equal to `right`:
     - The heaviest person takes a boat.
     - If the lightest person fits with them, include them too.
5. Return the boat count.

::tabs-start

```python
class Solution:
    def numRescueBoats(self, people: List[int], limit: int) -> int:
        m = max(people)
        count = [0] * (m + 1)
        for p in people:
            count[p] += 1

        idx, i = 0, 1
        while idx < len(people):
            while count[i] == 0:
                i += 1
            people[idx] = i
            count[i] -= 1
            idx += 1

        res, l, r = 0, 0, len(people) - 1
        while l <= r:
            remain = limit - people[r]
            r -= 1
            res += 1
            if l <= r and remain >= people[l]:
                l += 1
        return res
```

```java
public class Solution {
    public int numRescueBoats(int[] people, int limit) {
        int m = Arrays.stream(people).max().getAsInt();
        int[] count = new int[m + 1];
        for (int p : people) {
            count[p]++;
        }

        int idx = 0, i = 1;
        while (idx < people.length) {
            while (count[i] == 0) {
                i++;
            }
            people[idx++] = i;
            count[i]--;
        }

        int res = 0, l = 0, r = people.length - 1;
        while (l <= r) {
            int remain = limit - people[r--];
            res++;
            if (l <= r && remain >= people[l]) {
                l++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numRescueBoats(vector<int>& people, int limit) {
        int m = *max_element(people.begin(), people.end());
        vector<int> count(m + 1, 0);
        for (int p : people) {
            count[p]++;
        }

        int idx = 0, i = 1;
        while (idx < people.size()) {
            while (count[i] == 0) {
                i++;
            }
            people[idx++] = i;
            count[i]--;
        }

        int res = 0, l = 0, r = people.size() - 1;
        while (l <= r) {
            int remain = limit - people[r--];
            res++;
            if (l <= r && remain >= people[l]) {
                l++;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} people
     * @param {number} limit
     * @return {number}
     */
    numRescueBoats(people, limit) {
        const m = Math.max(...people);
        const count = new Array(m + 1).fill(0);
        for (const p of people) {
            count[p]++;
        }

        let idx = 0,
            i = 1;
        while (idx < people.length) {
            while (count[i] === 0) {
                i++;
            }
            people[idx++] = i;
            count[i]--;
        }

        let res = 0,
            l = 0,
            r = people.length - 1;
        while (l <= r) {
            const remain = limit - people[r--];
            res++;
            if (l <= r && remain >= people[l]) {
                l++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumRescueBoats(int[] people, int limit) {
        int m = 0;
        foreach (int p in people) {
            m = Math.Max(m, p);
        }

        int[] count = new int[m + 1];
        foreach (int p in people) {
            count[p]++;
        }

        int idx = 0, iVal = 1;
        while (idx < people.Length) {
            while (count[iVal] == 0) {
                iVal++;
            }
            people[idx] = iVal;
            count[iVal]--;
            idx++;
        }

        int res = 0, l = 0, r = people.Length - 1;
        while (l <= r) {
            int remain = limit - people[r];
            r--;
            res++;
            if (l <= r && remain >= people[l]) {
                l++;
            }
        }

        return res;
    }
}
```

```go
func numRescueBoats(people []int, limit int) int {
    m := 0
    for _, p := range people {
        if p > m {
            m = p
        }
    }

    count := make([]int, m+1)
    for _, p := range people {
        count[p]++
    }

    idx, i := 0, 1
    for idx < len(people) {
        for count[i] == 0 {
            i++
        }
        people[idx] = i
        count[i]--
        idx++
    }

    res, l, r := 0, 0, len(people)-1
    for l <= r {
        remain := limit - people[r]
        r--
        res++
        if l <= r && remain >= people[l] {
            l++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun numRescueBoats(people: IntArray, limit: Int): Int {
        val m = people.maxOrNull() ?: 0
        val count = IntArray(m + 1)
        for (p in people) {
            count[p]++
        }

        var idx = 0
        var i = 1
        while (idx < people.size) {
            while (count[i] == 0) {
                i++
            }
            people[idx++] = i
            count[i]--
        }

        var res = 0
        var l = 0
        var r = people.size - 1
        while (l <= r) {
            val remain = limit - people[r]
            r--
            res++
            if (l <= r && remain >= people[l]) {
                l++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func numRescueBoats(_ people: [Int], _ limit: Int) -> Int {
        var people = people
        let m = people.max() ?? 0
        var count = [Int](repeating: 0, count: m + 1)
        for p in people {
            count[p] += 1
        }

        var idx = 0
        var i = 1
        while idx < people.count {
            while count[i] == 0 {
                i += 1
            }
            people[idx] = i
            count[i] -= 1
            idx += 1
        }

        var res = 0
        var l = 0
        var r = people.count - 1
        while l <= r {
            let remain = limit - people[r]
            r -= 1
            res += 1
            if l <= r && remain >= people[l] {
                l += 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

> Where $n$ is the size of the input array and $m$ is the maximum value in the array.
