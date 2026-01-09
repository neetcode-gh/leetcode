## 1. Greedy + Sorting

### Intuition

To minimize total movement, pair the closest seats with the closest students. Sorting both arrays puts them in order, allowing us to match the `i`-th smallest student with the `i`-th smallest seat. This greedy pairing ensures we never have crossing assignments, which would increase total distance.

Why does this work? If we had two students at positions `a < b` and two seats at positions `x < y`, pairing `(a, y)` and `(b, x)` would create crossing paths. Simple algebra shows `|a - x| + |b - y|` is always less than or equal to `|a - y| + |b - x|` when `a < b` and `x < y`.

### Algorithm

1. Sort both the seats and students arrays.
2. For each index `i`, add the absolute difference between `seats[i]` and `students[i]` to the result.
3. Return the total.

::tabs-start

```python
class Solution:
    def minMovesToSeat(self, seats: List[int], students: List[int]) -> int:
        seats.sort()
        students.sort()

        res = 0
        for i in range(len(seats)):
            res += abs(seats[i] - students[i])
        return res
```

```java
public class Solution {
    public int minMovesToSeat(int[] seats, int[] students) {
        Arrays.sort(seats);
        Arrays.sort(students);

        int res = 0;
        for (int i = 0; i < seats.length; i++) {
            res += Math.abs(seats[i] - students[i]);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minMovesToSeat(vector<int>& seats, vector<int>& students) {
        sort(seats.begin(), seats.end());
        sort(students.begin(), students.end());

        int res = 0;
        for (int i = 0; i < seats.size(); i++) {
            res += abs(seats[i] - students[i]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} seats
     * @param {number[]} students
     * @return {number}
     */
    minMovesToSeat(seats, students) {
        seats.sort((a, b) => a - b);
        students.sort((a, b) => a - b);

        let res = 0;
        for (let i = 0; i < seats.length; i++) {
            res += Math.abs(seats[i] - students[i]);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinMovesToSeat(int[] seats, int[] students) {
        Array.Sort(seats);
        Array.Sort(students);

        int res = 0;
        for (int i = 0; i < seats.Length; i++) {
            res += Math.Abs(seats[i] - students[i]);
        }
        return res;
    }
}
```

```go
func minMovesToSeat(seats []int, students []int) int {
    sort.Ints(seats)
    sort.Ints(students)

    res := 0
    for i := 0; i < len(seats); i++ {
        if seats[i] > students[i] {
            res += seats[i] - students[i]
        } else {
            res += students[i] - seats[i]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun minMovesToSeat(seats: IntArray, students: IntArray): Int {
        seats.sort()
        students.sort()

        var res = 0
        for (i in seats.indices) {
            res += kotlin.math.abs(seats[i] - students[i])
        }
        return res
    }
}
```

```swift
class Solution {
    func minMovesToSeat(_ seats: [Int], _ students: [Int]) -> Int {
        let sortedSeats = seats.sorted()
        let sortedStudents = students.sorted()

        var res = 0
        for i in 0..<sortedSeats.count {
            res += abs(sortedSeats[i] - sortedStudents[i])
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Counting Sort

### Intuition

When the range of positions is bounded, counting sort can be faster than comparison-based sorting. We create frequency arrays for both seats and students, then simulate the sorted pairing by walking through positions from smallest to largest.

Two pointers traverse the count arrays, finding the next available seat and next waiting student. Each match contributes its distance to the `res`.

### Algorithm

1. Create count arrays for seats and students up to the maximum position.
2. Use two pointers `i` and `j` starting at position 0.
3. While unmatched pairs remain:
   - Advance `i` until `count_seats[i] > 0`.
   - Advance `j` until `count_students[j] > 0`.
   - Add `|i - j|` to `res`, decrement both counts.
4. Return the total.

::tabs-start

```python
class Solution:
    def minMovesToSeat(self, seats: List[int], students: List[int]) -> int:
        max_index = max(max(seats), max(students)) + 1
        count_seats = [0] * max_index
        count_students = [0] * max_index

        for seat in seats:
            count_seats[seat] += 1
        for student in students:
            count_students[student] += 1
        
        i = j = res = 0
        remain = len(seats)
        while remain:
            if count_seats[i] == 0:
                i += 1
            if count_students[j] == 0:
                j += 1
            if count_seats[i] and count_students[j]:
                res += abs(i - j)
                count_seats[i] -= 1
                count_students[j] -= 1
                remain -= 1
        return res
```

```java
public class Solution {
    public int minMovesToSeat(int[] seats, int[] students) {
        int max_index = 0;
        for (int s : seats) max_index = Math.max(max_index, s);
        for (int s : students) max_index = Math.max(max_index, s);
        max_index++;

        int[] count_seats = new int[max_index];
        int[] count_students = new int[max_index];

        for (int seat : seats) count_seats[seat]++;
        for (int student : students) count_students[student]++;

        int i = 0, j = 0, res = 0, remain = seats.length;
        while (remain > 0) {
            if (count_seats[i] == 0) {
                i++;
                continue;
            }
            if (count_students[j] == 0) {
                j++;
                continue;
            }
            res += Math.abs(i - j);
            count_seats[i]--;
            count_students[j]--;
            remain--;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minMovesToSeat(vector<int>& seats, vector<int>& students) {
        int max_index = 0;
        for (int s : seats) max_index = max(max_index, s);
        for (int s : students) max_index = max(max_index, s);
        max_index++;

        vector<int> count_seats(max_index, 0);
        vector<int> count_students(max_index, 0);

        for (int seat : seats) count_seats[seat]++;
        for (int student : students) count_students[student]++;

        int i = 0, j = 0, res = 0, remain = seats.size();
        while (remain > 0) {
            if (count_seats[i] == 0) {
                i++;
                continue;
            }
            if (count_students[j] == 0) {
                j++;
                continue;
            }
            res += abs(i - j);
            count_seats[i]--;
            count_students[j]--;
            remain--;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} seats
     * @param {number[]} students
     * @return {number}
     */
    minMovesToSeat(seats, students) {
        let max_index = Math.max(...seats, ...students) + 1;
        let count_seats = new Array(max_index).fill(0);
        let count_students = new Array(max_index).fill(0);

        for (let seat of seats) count_seats[seat]++;
        for (let student of students) count_students[student]++;

        let i = 0, j = 0, res = 0, remain = seats.length;
        while (remain > 0) {
            if (count_seats[i] === 0) {
                i++;
                continue;
            }
            if (count_students[j] === 0) {
                j++;
                continue;
            }
            res += Math.abs(i - j);
            count_seats[i]--;
            count_students[j]--;
            remain--;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinMovesToSeat(int[] seats, int[] students) {
        int max_index = 0;
        foreach (int s in seats) max_index = Math.Max(max_index, s);
        foreach (int s in students) max_index = Math.Max(max_index, s);
        max_index++;

        int[] count_seats = new int[max_index];
        int[] count_students = new int[max_index];

        foreach (int seat in seats) count_seats[seat]++;
        foreach (int student in students) count_students[student]++;

        int i = 0, j = 0, res = 0, remain = seats.Length;
        while (remain > 0) {
            if (count_seats[i] == 0) {
                i++;
                continue;
            }
            if (count_students[j] == 0) {
                j++;
                continue;
            }
            res += Math.Abs(i - j);
            count_seats[i]--;
            count_students[j]--;
            remain--;
        }
        return res;
    }
}
```

```go
func minMovesToSeat(seats []int, students []int) int {
    maxIndex := 0
    for _, s := range seats {
        if s > maxIndex {
            maxIndex = s
        }
    }
    for _, s := range students {
        if s > maxIndex {
            maxIndex = s
        }
    }
    maxIndex++

    countSeats := make([]int, maxIndex)
    countStudents := make([]int, maxIndex)

    for _, seat := range seats {
        countSeats[seat]++
    }
    for _, student := range students {
        countStudents[student]++
    }

    i, j, res, remain := 0, 0, 0, len(seats)
    for remain > 0 {
        if countSeats[i] == 0 {
            i++
            continue
        }
        if countStudents[j] == 0 {
            j++
            continue
        }
        if i > j {
            res += i - j
        } else {
            res += j - i
        }
        countSeats[i]--
        countStudents[j]--
        remain--
    }
    return res
}
```

```kotlin
class Solution {
    fun minMovesToSeat(seats: IntArray, students: IntArray): Int {
        var maxIndex = 0
        for (s in seats) maxIndex = maxOf(maxIndex, s)
        for (s in students) maxIndex = maxOf(maxIndex, s)
        maxIndex++

        val countSeats = IntArray(maxIndex)
        val countStudents = IntArray(maxIndex)

        for (seat in seats) countSeats[seat]++
        for (student in students) countStudents[student]++

        var i = 0
        var j = 0
        var res = 0
        var remain = seats.size
        while (remain > 0) {
            if (countSeats[i] == 0) {
                i++
                continue
            }
            if (countStudents[j] == 0) {
                j++
                continue
            }
            res += kotlin.math.abs(i - j)
            countSeats[i]--
            countStudents[j]--
            remain--
        }
        return res
    }
}
```

```swift
class Solution {
    func minMovesToSeat(_ seats: [Int], _ students: [Int]) -> Int {
        var maxIndex = max(seats.max()!, students.max()!) + 1

        var countSeats = [Int](repeating: 0, count: maxIndex)
        var countStudents = [Int](repeating: 0, count: maxIndex)

        for seat in seats { countSeats[seat] += 1 }
        for student in students { countStudents[student] += 1 }

        var i = 0, j = 0, res = 0, remain = seats.count
        while remain > 0 {
            if countSeats[i] == 0 {
                i += 1
                continue
            }
            if countStudents[j] == 0 {
                j += 1
                continue
            }
            res += abs(i - j)
            countSeats[i] -= 1
            countStudents[j] -= 1
            remain -= 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n + m1 + m2)$
* Space complexity: $O(m1 + m2)$

> Where $n$ is the size of the input arrays, $m1$ is the maximum value in the array $seats$, and $m2$ is the maximum value in the array $students$.

---

## 3. Counting Sort (Optimal)

### Intuition

When multiple students are at the same position or multiple seats are at the same position, we can batch process them. Instead of matching one pair at a time, we match `min(count_seats[i], count_students[j])` pairs at once, multiplying the distance by the batch `size`.

This optimization reduces iterations when there are many duplicates, though the asymptotic complexity remains the same.

### Algorithm

1. Create count arrays for seats and students.
2. Use two pointers `i` and `j` starting at position 0.
3. While unmatched pairs remain:
   - Advance `i` until `count_seats[i] > 0`.
   - Advance `j` until `count_students[j] > 0`.
   - Compute `tmp = min(count_seats[i], count_students[j])`.
   - Add `|i - j| * tmp` to `res`, decrement counts by `tmp`.
4. Return the total.

::tabs-start

```python
class Solution:
    def minMovesToSeat(self, seats: List[int], students: List[int]) -> int:
        count_seats = [0] * (max(seats) + 1)
        count_students = [0] * (max(students) + 1)

        def count_sort(arr, count):
            for num in arr:
                count[num] += 1

        count_sort(seats, count_seats)
        count_sort(students, count_students)

        remain = len(seats)
        i = j = res = 0
        while remain:
            if count_seats[i] == 0:
                i += 1
            if count_students[j] == 0:
                j += 1
            if count_seats[i] and count_students[j]:
                tmp = min(count_seats[i], count_students[j])
                res += abs(i - j) * tmp
                count_seats[i] -= tmp
                count_students[j] -= tmp
                remain -= tmp
        return res
```

```java
public class Solution {
    public int minMovesToSeat(int[] seats, int[] students) {
        int maxSeat = 0, maxStudent = 0;
        for (int s : seats) maxSeat = Math.max(maxSeat, s);
        for (int s : students) maxStudent = Math.max(maxStudent, s);

        int[] count_seats = new int[maxSeat + 1];
        int[] count_students = new int[maxStudent + 1];

        for (int s : seats) count_seats[s]++;
        for (int s : students) count_students[s]++;

        int remain = seats.length, i = 0, j = 0, res = 0;
        while (remain > 0) {
            if (count_seats[i] == 0) {
                i++;
                continue;
            }
            if (count_students[j] == 0) {
                j++;
                continue;
            }
            int tmp = Math.min(count_seats[i], count_students[j]);
            res += Math.abs(i - j) * tmp;
            count_seats[i] -= tmp;
            count_students[j] -= tmp;
            remain -= tmp;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minMovesToSeat(vector<int>& seats, vector<int>& students) {
        int maxSeat = *max_element(seats.begin(), seats.end());
        int maxStudent = *max_element(students.begin(), students.end());

        vector<int> count_seats(maxSeat + 1, 0);
        vector<int> count_students(maxStudent + 1, 0);

        for (int s : seats) count_seats[s]++;
        for (int s : students) count_students[s]++;

        int remain = seats.size(), i = 0, j = 0, res = 0;
        while (remain > 0) {
            if (count_seats[i] == 0) {
                i++;
                continue;
            }
            if (count_students[j] == 0) {
                j++;
                continue;
            }
            int tmp = min(count_seats[i], count_students[j]);
            res += abs(i - j) * tmp;
            count_seats[i] -= tmp;
            count_students[j] -= tmp;
            remain -= tmp;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} seats
     * @param {number[]} students
     * @return {number}
     */
    minMovesToSeat(seats, students) {
        let maxSeat = Math.max(...seats);
        let maxStudent = Math.max(...students);

        let count_seats = new Array(maxSeat + 1).fill(0);
        let count_students = new Array(maxStudent + 1).fill(0);

        for (let s of seats) count_seats[s]++;
        for (let s of students) count_students[s]++;

        let remain = seats.length, i = 0, j = 0, res = 0;
        while (remain > 0) {
            if (count_seats[i] === 0) {
                i++;
                continue;
            }
            if (count_students[j] === 0) {
                j++;
                continue;
            }
            let tmp = Math.min(count_seats[i], count_students[j]);
            res += Math.abs(i - j) * tmp;
            count_seats[i] -= tmp;
            count_students[j] -= tmp;
            remain -= tmp;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinMovesToSeat(int[] seats, int[] students) {
        int maxSeat = 0, maxStudent = 0;
        foreach (int s in seats) maxSeat = Math.Max(maxSeat, s);
        foreach (int s in students) maxStudent = Math.Max(maxStudent, s);

        int[] count_seats = new int[maxSeat + 1];
        int[] count_students = new int[maxStudent + 1];

        foreach (int s in seats) count_seats[s]++;
        foreach (int s in students) count_students[s]++;

        int remain = seats.Length, i = 0, j = 0, res = 0;
        while (remain > 0) {
            if (count_seats[i] == 0) {
                i++;
                continue;
            }
            if (count_students[j] == 0) {
                j++;
                continue;
            }
            int tmp = Math.Min(count_seats[i], count_students[j]);
            res += Math.Abs(i - j) * tmp;
            count_seats[i] -= tmp;
            count_students[j] -= tmp;
            remain -= tmp;
        }
        return res;
    }
}
```

```go
func minMovesToSeat(seats []int, students []int) int {
    maxSeat, maxStudent := 0, 0
    for _, s := range seats {
        if s > maxSeat {
            maxSeat = s
        }
    }
    for _, s := range students {
        if s > maxStudent {
            maxStudent = s
        }
    }

    countSeats := make([]int, maxSeat+1)
    countStudents := make([]int, maxStudent+1)

    for _, s := range seats {
        countSeats[s]++
    }
    for _, s := range students {
        countStudents[s]++
    }

    remain, i, j, res := len(seats), 0, 0, 0
    for remain > 0 {
        if countSeats[i] == 0 {
            i++
            continue
        }
        if countStudents[j] == 0 {
            j++
            continue
        }
        tmp := countSeats[i]
        if countStudents[j] < tmp {
            tmp = countStudents[j]
        }
        diff := i - j
        if diff < 0 {
            diff = -diff
        }
        res += diff * tmp
        countSeats[i] -= tmp
        countStudents[j] -= tmp
        remain -= tmp
    }
    return res
}
```

```kotlin
class Solution {
    fun minMovesToSeat(seats: IntArray, students: IntArray): Int {
        val maxSeat = seats.maxOrNull()!!
        val maxStudent = students.maxOrNull()!!

        val countSeats = IntArray(maxSeat + 1)
        val countStudents = IntArray(maxStudent + 1)

        for (s in seats) countSeats[s]++
        for (s in students) countStudents[s]++

        var remain = seats.size
        var i = 0
        var j = 0
        var res = 0
        while (remain > 0) {
            if (countSeats[i] == 0) {
                i++
                continue
            }
            if (countStudents[j] == 0) {
                j++
                continue
            }
            val tmp = minOf(countSeats[i], countStudents[j])
            res += kotlin.math.abs(i - j) * tmp
            countSeats[i] -= tmp
            countStudents[j] -= tmp
            remain -= tmp
        }
        return res
    }
}
```

```swift
class Solution {
    func minMovesToSeat(_ seats: [Int], _ students: [Int]) -> Int {
        let maxSeat = seats.max()!
        let maxStudent = students.max()!

        var countSeats = [Int](repeating: 0, count: maxSeat + 1)
        var countStudents = [Int](repeating: 0, count: maxStudent + 1)

        for s in seats { countSeats[s] += 1 }
        for s in students { countStudents[s] += 1 }

        var remain = seats.count, i = 0, j = 0, res = 0
        while remain > 0 {
            if countSeats[i] == 0 {
                i += 1
                continue
            }
            if countStudents[j] == 0 {
                j += 1
                continue
            }
            let tmp = min(countSeats[i], countStudents[j])
            res += abs(i - j) * tmp
            countSeats[i] -= tmp
            countStudents[j] -= tmp
            remain -= tmp
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n + m1 + m2)$
* Space complexity: $O(m1 + m2)$

> Where $n$ is the size of the input arrays, $m1$ is the maximum value in the array $seats$, and $m2$ is the maximum value in the array $students$.