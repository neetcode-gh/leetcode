## 1. Queue

### Intuition

We simulate the lunch process exactly as described. Students form a queue and take the top sandwich only if it matches their preference; otherwise, they go to the back of the queue. The process stops when the top sandwich cannot be taken by anyone remaining in the queue. A queue data structure naturally models students rotating until a match is found.

### Algorithm

1. Initialize a queue with all student preferences.
2. For each sandwich from top to bottom:
   - Rotate students in the queue until we find one who wants this sandwich, or until we've rotated through all remaining students.
   - If a matching student is found, remove them and decrement the count of students unable to eat.
   - If no one wants the current sandwich after a full rotation, stop the process.
3. Return the number of students still in the queue.

::tabs-start

```python
class Solution:
    def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        n = len(students)
        q = deque(students)

        res = n
        for sandwich in sandwiches:
            cnt = 0
            while cnt < n and q[0] != sandwich:
                cur = q.popleft()
                q.append(cur)
                cnt += 1

            if q[0] == sandwich:
                q.popleft()
                res -= 1
            else:
                break
        return res
```

```java
public class Solution {
    public int countStudents(int[] students, int[] sandwiches) {
        int n = students.length;
        Queue<Integer> q = new LinkedList<>();
        for (int student : students) {
            q.offer(student);
        }

        int res = n;
        for (int sandwich : sandwiches) {
            int cnt = 0;
            while (cnt < n && q.peek() != sandwich) {
                q.offer(q.poll());
                cnt++;
            }
            if (q.peek() == sandwich) {
                q.poll();
                res--;
            } else {
                break;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countStudents(vector<int>& students, vector<int>& sandwiches) {
        int n = students.size();
        queue<int> q;

        for (int student : students) {
            q.push(student);
        }

        int res = n;
        for (int sandwich : sandwiches) {
            int cnt = 0;
            while (cnt < n && q.front() != sandwich) {
                q.push(q.front());
                q.pop();
                cnt++;
            }
            if (q.front() == sandwich) {
                q.pop();
                res--;
            } else {
                break;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} students
     * @param {number[]} sandwiches
     * @return {number}
     */
    countStudents(students, sandwiches) {
        let n = students.length;
        let q = new Queue();
        for (let student of students) {
            q.push(student);
        }

        let res = n;
        for (let sandwich of sandwiches) {
            let cnt = 0;
            while (cnt < n && q.front() !== sandwich) {
                q.push(q.pop());
                cnt++;
            }

            if (q.front() === sandwich) {
                q.pop();
                res--;
            } else {
                break;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountStudents(int[] students, int[] sandwiches) {
        int n = students.Length;
        Queue<int> q = new Queue<int>();
        foreach (int student in students) {
            q.Enqueue(student);
        }

        int res = n;
        foreach (int sandwich in sandwiches) {
            int cnt = 0;
            while (cnt < n && q.Peek() != sandwich) {
                q.Enqueue(q.Dequeue());
                cnt++;
            }
            if (q.Peek() == sandwich) {
                q.Dequeue();
                res--;
            } else {
                break;
            }
        }
        return res;
    }
}
```

```go
func countStudents(students []int, sandwiches []int) int {
    n := len(students)
    q := make([]int, n)
    copy(q, students)

    res := n
    for _, sandwich := range sandwiches {
        cnt := 0
        for cnt < n && q[0] != sandwich {
            q = append(q[1:], q[0])
            cnt++
        }
        if q[0] == sandwich {
            q = q[1:]
            res--
        } else {
            break
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countStudents(students: IntArray, sandwiches: IntArray): Int {
        val n = students.size
        val q = ArrayDeque<Int>()
        for (student in students) {
            q.add(student)
        }

        var res = n
        for (sandwich in sandwiches) {
            var cnt = 0
            while (cnt < n && q.first() != sandwich) {
                q.add(q.removeFirst())
                cnt++
            }
            if (q.first() == sandwich) {
                q.removeFirst()
                res--
            } else {
                break
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countStudents(_ students: [Int], _ sandwiches: [Int]) -> Int {
        let n = students.count
        var q = students

        var res = n
        for sandwich in sandwiches {
            var cnt = 0
            while cnt < n && q[0] != sandwich {
                q.append(q.removeFirst())
                cnt += 1
            }
            if q[0] == sandwich {
                q.removeFirst()
                res -= 1
            } else {
                break
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Iteration

### Intuition

Instead of using a separate queue, we can simulate the rotation using a circular index on the original students array. When a student takes a sandwich, we mark their position as served (using `-1`). This avoids the overhead of queue operations while achieving the same behavior.

### Algorithm

1. Use an index pointer that wraps around the students array.
2. For each sandwich:
   - Search for a student (not yet served) who wants this sandwich, allowing at most `n` checks.
   - Mark matched students as served with `-1` and decrement the remaining count.
   - If no match is found after checking all remaining students, stop.
3. Return the count of students who could not eat.

::tabs-start

```python
class Solution:
    def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        n = len(students)
        idx = 0

        res = n
        for sandwich in sandwiches:
            cnt = 0
            while cnt < n and students[idx] != sandwich:
                idx += 1
                idx %= n
                cnt += 1

            if students[idx] == sandwich:
                students[idx] = -1
                res -= 1
            else:
                break
        return res
```

```java
public class Solution {
    public int countStudents(int[] students, int[] sandwiches) {
        int n = students.length;
        int idx = 0;

        int res = n;
        for (int sandwich : sandwiches) {
            int cnt = 0;
            while (cnt < n && students[idx] != sandwich) {
                idx++;
                idx %= n;
                cnt++;
            }
            if (students[idx] == sandwich) {
                students[idx] = -1;
                res--;
            } else {
                break;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countStudents(vector<int>& students, vector<int>& sandwiches) {
        int n = students.size();
        int idx = 0;

        int res = n;
        for (int sandwich : sandwiches) {
            int cnt = 0;
            while (cnt < n && students[idx] != sandwich) {
                idx++;
                idx %= n;
                cnt++;
            }
            if (students[idx] == sandwich) {
                students[idx] = -1;
                res--;
            } else {
                break;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} students
     * @param {number[]} sandwiches
     * @return {number}
     */
    countStudents(students, sandwiches) {
        let n = students.length;
        let idx = 0;

        let res = n;
        for (let sandwich of sandwiches) {
            let cnt = 0;
            while (cnt < n && students[idx] !== sandwich) {
                idx++;
                idx %= n;
                cnt++;
            }

            if (students[idx] === sandwich) {
                students[idx] = -1;
                res--;
            } else {
                break;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountStudents(int[] students, int[] sandwiches) {
        int n = students.Length;
        int idx = 0;

        int res = n;
        foreach (int sandwich in sandwiches) {
            int cnt = 0;
            while (cnt < n && students[idx] != sandwich) {
                idx++;
                idx %= n;
                cnt++;
            }
            if (students[idx] == sandwich) {
                students[idx] = -1;
                res--;
            } else {
                break;
            }
        }
        return res;
    }
}
```

```go
func countStudents(students []int, sandwiches []int) int {
    n := len(students)
    idx := 0

    res := n
    for _, sandwich := range sandwiches {
        cnt := 0
        for cnt < n && students[idx] != sandwich {
            idx++
            idx %= n
            cnt++
        }
        if students[idx] == sandwich {
            students[idx] = -1
            res--
        } else {
            break
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countStudents(students: IntArray, sandwiches: IntArray): Int {
        val n = students.size
        var idx = 0

        var res = n
        for (sandwich in sandwiches) {
            var cnt = 0
            while (cnt < n && students[idx] != sandwich) {
                idx++
                idx %= n
                cnt++
            }
            if (students[idx] == sandwich) {
                students[idx] = -1
                res--
            } else {
                break
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countStudents(_ students: [Int], _ sandwiches: [Int]) -> Int {
        var students = students
        let n = students.count
        var idx = 0

        var res = n
        for sandwich in sandwiches {
            var cnt = 0
            while cnt < n && students[idx] != sandwich {
                idx += 1
                idx %= n
                cnt += 1
            }
            if students[idx] == sandwich {
                students[idx] = -1
                res -= 1
            } else {
                break
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 3. Frequency Count

### Intuition

The key insight is that student order does not matter. Since students can rotate indefinitely, what matters is whether there exists any student who wants the current top sandwich. If we track how many students want each type (`0` or `1`), we can quickly check availability without simulating the queue.

### Algorithm

1. Count the number of students preferring each sandwich type.
2. Process sandwiches in order:
   - If at least one student wants the current sandwich, decrement that count and the total remaining.
   - If no student wants it, stop immediately since those behind cannot be served either.
3. Return the remaining count.

::tabs-start

```python
class Solution:
    def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        res = len(students)
        cnt = Counter(students)

        for s in sandwiches:
            if cnt[s] > 0:
                res -= 1
                cnt[s] -= 1
            else:
                break

        return res
```

```java
public class Solution {
    public int countStudents(int[] students, int[] sandwiches) {
        int n = students.length;
        int res = n;
        int[] cnt = new int[2];
        for (int i = 0; i < n; i++) {
            cnt[students[i]]++;
        }

        for (int i = 0; i < n; i++) {
            if (cnt[sandwiches[i]] > 0) {
                res--;
                cnt[sandwiches[i]]--;
            } else {
                break;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countStudents(vector<int>& students, vector<int>& sandwiches) {
        int res = students.size();
        vector<int> cnt(2);
        for (int& student : students) {
            cnt[student]++;
        }

        for (int& s : sandwiches) {
            if (cnt[s] > 0) {
                cnt[s]--;
                res--;
            } else {
                break;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} students
     * @param {number[]} sandwiches
     * @return {number}
     */
    countStudents(students, sandwiches) {
        let res = students.length;
        const cnt = new Int32Array(2);
        for (let student of students) {
            cnt[student]++;
        }

        for (let s of sandwiches) {
            if (cnt[s] > 0) {
                cnt[s]--;
                res--;
            } else {
                break;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountStudents(int[] students, int[] sandwiches) {
        int res = students.Length;
        int[] cnt = new int[2];
        foreach (int student in students) {
            cnt[student]++;
        }

        foreach (int s in sandwiches) {
            if (cnt[s] > 0) {
                cnt[s]--;
                res--;
            } else {
                break;
            }
        }
        return res;
    }
}
```

```go
func countStudents(students []int, sandwiches []int) int {
    res := len(students)
    cnt := make([]int, 2)
    for _, student := range students {
        cnt[student]++
    }

    for _, s := range sandwiches {
        if cnt[s] > 0 {
            cnt[s]--
            res--
        } else {
            break
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countStudents(students: IntArray, sandwiches: IntArray): Int {
        var res = students.size
        val cnt = IntArray(2)
        for (student in students) {
            cnt[student]++
        }

        for (s in sandwiches) {
            if (cnt[s] > 0) {
                cnt[s]--
                res--
            } else {
                break
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countStudents(_ students: [Int], _ sandwiches: [Int]) -> Int {
        var res = students.count
        var cnt = [0, 0]
        for student in students {
            cnt[student] += 1
        }

        for s in sandwiches {
            if cnt[s] > 0 {
                cnt[s] -= 1
                res -= 1
            } else {
                break
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
