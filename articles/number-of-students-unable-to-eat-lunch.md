## 1. Queue

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Iteration

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 3. Frequency Count

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
