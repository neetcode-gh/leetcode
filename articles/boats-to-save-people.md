## 1. Sorting + Two Pointers

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Counting Sort

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

> Where $n$ is the size of the input array and $m$ is the maximum value in the array.
