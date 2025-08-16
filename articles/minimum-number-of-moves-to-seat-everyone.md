## 1. Greedy + Sorting

::tabs-start

```python

```

```java

```

```cpp

```

```javascript
class Solution {
    /**
     * @param {number[]} seats
     * @param {number[]} students
     * @return {number}
     */
    minMovesToSeat(seats, students) {

    }
}
```

```csharp

```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Counting Sort

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n + m1 + m2)$
* Space complexity: $O(m1 + m2)$

> Where $n$ is the size of the input arrays, $m1$ is the maximum value in the array $seats$, and $m2$ is the maximum value in the array $students$.

---

## 3. Counting Sort (Optimal)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n + m1 + m2)$
* Space complexity: $O(m1 + m2)$

> Where $n$ is the size of the input arrays, $m1$ is the maximum value in the array $seats$, and $m2$ is the maximum value in the array $students$.