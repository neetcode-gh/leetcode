## 1. Brute Force

::tabs-start

```python
class Solution:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        res = []

        for time in people:
            cnt = 0
            for start, end in flowers:
                if start <= time <= end:
                    cnt += 1
            res.append(cnt)

        return res
```

```java
public class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.length;
        int[] res = new int[m];

        for (int i = 0; i < m; i++) {
            int count = 0;
            for (int[] flower : flowers) {
                if (flower[0] <= people[i] && people[i] <= flower[1]) {
                    count++;
                }
            }
            res[i] = count;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        int m = people.size();
        vector<int> res(m);

        for (int i = 0; i < m; i++) {
            int count = 0;
            for (auto& flower : flowers) {
                if (flower[0] <= people[i] && people[i] <= flower[1]) {
                    count++;
                }
            }
            res[i] = count;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} flowers
     * @param {number[]} people
     * @return {number[]}
     */
    fullBloomFlowers(flowers, people) {
        let res = new Array(people.length).fill(0);

        for (let i = 0; i < people.length; i++) {
            let count = 0;
            for (let [start, end] of flowers) {
                if (start <= people[i] && people[i] <= end) {
                    count++;
                }
            }
            res[i] = count;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m)$ for the output array.

> Where $n$ is the size of the array $flowers$, and $m$ is the size of the array $people$.

---

## 2. Two Min-Heaps

::tabs-start

```python
class Solution:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        people = sorted((p, i) for i, p in enumerate(people))
        res = [0] * len(people)
        count = 0

        start = [f[0] for f in flowers]
        end = [f[1] for f in flowers]

        heapq.heapify(start)
        heapq.heapify(end)

        for p, i in people:
            while start and start[0] <= p:
                heapq.heappop(start)
                count += 1
            while end and end[0] < p:
                heapq.heappop(end)
                count -= 1
            res[i] = count

        return res
```

```java
public class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.length;
        int[] res = new int[m];

        List<int[]> sortedPeople = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            sortedPeople.add(new int[]{people[i], i});
        }
        sortedPeople.sort(Comparator.comparingInt(a -> a[0]));

        PriorityQueue<Integer> startHeap = new PriorityQueue<>();
        PriorityQueue<Integer> endHeap = new PriorityQueue<>();
        for (int[] f : flowers) {
            startHeap.offer(f[0]);
            endHeap.offer(f[1]);
        }

        int count = 0;
        for (int[] person : sortedPeople) {
            int p = person[0], index = person[1];

            while (!startHeap.isEmpty() && startHeap.peek() <= p) {
                startHeap.poll();
                count++;
            }
            while (!endHeap.isEmpty() && endHeap.peek() < p) {
                endHeap.poll();
                count--;
            }

            res[index] = count;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        int m = people.size();
        vector<int> res(m);

        vector<pair<int, int>> sortedPeople;
        for (int i = 0; i < m; i++) {
            sortedPeople.push_back({people[i], i});
        }
        sort(sortedPeople.begin(), sortedPeople.end());

        priority_queue<int, vector<int>, greater<int>> startHeap, endHeap;
        for (const auto& f : flowers) {
            startHeap.push(f[0]);
            endHeap.push(f[1]);
        }

        int count = 0;
        for (const auto& person : sortedPeople) {
            int p = person.first, index = person.second;

            while (!startHeap.empty() && startHeap.top() <= p) {
                startHeap.pop();
                count++;
            }
            while (!endHeap.empty() && endHeap.top() < p) {
                endHeap.pop();
                count--;
            }

            res[index] = count;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} flowers
     * @param {number[]} people
     * @return {number[]}
     */
    fullBloomFlowers(flowers, people) {
        const m = people.length;
        const res = new Array(m).fill(0);

        const sortedPeople = people.map((p, i) => [p, i]);
        sortedPeople.sort((a, b) => a[0] - b[0]);

        const startHeap = new MinPriorityQueue();
        const endHeap = new MinPriorityQueue();
        for (const [s, e] of flowers) {
            startHeap.enqueue(s);
            endHeap.enqueue(e);
        }

        let count = 0;
        for (const [p, index] of sortedPeople) {
            while (!startHeap.isEmpty() && startHeap.front() <= p) {
                startHeap.dequeue();
                count++;
            }
            while (!endHeap.isEmpty() && endHeap.front() < p) {
                endHeap.dequeue();
                count--;
            }
            res[index] = count;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n \log n)$
- Space complexity: $O(m + n)$

> Where $n$ is the size of the array $flowers$, and $m$ is the size of the array $people$.

---

## 3. Min-Heap

::tabs-start

```python
class Solution:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        people = sorted((p, i) for i, p in enumerate(people))
        res = [0] * len(people)
        flowers.sort()
        end = []

        j = 0
        for p, i in people:
            while j < len(flowers) and flowers[j][0] <= p:
                heapq.heappush(end, flowers[j][1])
                j += 1
            while end and end[0] < p:
                heapq.heappop(end)
            res[i] = len(end)

        return res
```

```java
public class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.length;
        int[] res = new int[m];
        int[][] indexedPeople = new int[m][2];

        for (int i = 0; i < m; i++) {
            indexedPeople[i] = new int[]{people[i], i};
        }
        Arrays.sort(indexedPeople, Comparator.comparingInt(a -> a[0]));
        Arrays.sort(flowers, Comparator.comparingInt(a -> a[0]));

        PriorityQueue<Integer> endHeap = new PriorityQueue<>();
        int j = 0, n = flowers.length;

        for (int[] person : indexedPeople) {
            int p = person[0], index = person[1];

            while (j < n && flowers[j][0] <= p) {
                endHeap.offer(flowers[j][1]);
                j++;
            }
            while (!endHeap.isEmpty() && endHeap.peek() < p) {
                endHeap.poll();
            }
            res[index] = endHeap.size();
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        int m = people.size();
        vector<int> res(m);
        vector<pair<int, int>> indexedPeople;

        for (int i = 0; i < m; i++) {
            indexedPeople.emplace_back(people[i], i);
        }
        sort(indexedPeople.begin(), indexedPeople.end());
        sort(flowers.begin(), flowers.end());

        priority_queue<int, vector<int>, greater<int>> endHeap;
        int j = 0, n = flowers.size();

        for (auto [p, index] : indexedPeople) {
            while (j < n && flowers[j][0] <= p) {
                endHeap.push(flowers[j][1]);
                j++;
            }
            while (!endHeap.empty() && endHeap.top() < p) {
                endHeap.pop();
            }
            res[index] = endHeap.size();
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} flowers
     * @param {number[]} people
     * @return {number[]}
     */
    fullBloomFlowers(flowers, people) {
        const m = people.length;
        const res = new Array(m).fill(0);
        const indexedPeople = people.map((p, i) => [p, i]);

        indexedPeople.sort((a, b) => a[0] - b[0]);
        flowers.sort((a, b) => a[0] - b[0]);

        const endHeap = new MinPriorityQueue();
        let j = 0,
            n = flowers.length;

        for (const [p, index] of indexedPeople) {
            while (j < n && flowers[j][0] <= p) {
                endHeap.enqueue(flowers[j][1]);
                j++;
            }
            while (!endHeap.isEmpty() && endHeap.front() < p) {
                endHeap.dequeue();
            }
            res[index] = endHeap.size();
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n \log n)$
- Space complexity: $O(m + n)$

> Where $n$ is the size of the array $flowers$, and $m$ is the size of the array $people$.

---

## 4. Sorting + Two Pointers

::tabs-start

```python
class Solution:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        start = sorted(f[0] for f in flowers)
        end = sorted(f[1] for f in flowers)

        res = [0] * len(people)
        peopleIndex = sorted((p, i) for i, p in enumerate(people))

        i = j = count = 0
        for p, index in peopleIndex:
            while i < len(start) and start[i] <= p:
                count += 1
                i += 1
            while j < len(end) and end[j] < p:
                count -= 1
                j += 1
            res[index] = count

        return res
```

```java
public class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.length;
        int[] res = new int[m];
        List<Integer> start = new ArrayList<>(), end = new ArrayList<>();
        for (int[] f : flowers) {
            start.add(f[0]);
            end.add(f[1]);
        }

        Collections.sort(start);
        Collections.sort(end);

        int count = 0, i = 0, j = 0;
        List<int[]> peopleIndex = new ArrayList<>();
        for (int k = 0; k < m; k++) {
            peopleIndex.add(new int[]{people[k], k});
        }
        peopleIndex.sort(Comparator.comparingInt(a -> a[0]));

        for (int[] p : peopleIndex) {
            int time = p[0], index = p[1];

            while (i < start.size() && start.get(i) <= time) {
                count++;
                i++;
            }
            while (j < end.size() && end.get(j) < time) {
                count--;
                j++;
            }
            res[index] = count;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        int m = people.size();
        vector<int> res(m), start, end;
        for (auto& f : flowers) {
            start.push_back(f[0]);
            end.push_back(f[1]);
        }

        sort(start.begin(), start.end());
        sort(end.begin(), end.end());

        int count = 0, i = 0, j = 0;
        vector<pair<int, int>> peopleIndex;
        for (int k = 0; k < m; k++) {
            peopleIndex.emplace_back(people[k], k);
        }
        sort(peopleIndex.begin(), peopleIndex.end());

        for (auto& [p, index] : peopleIndex) {
            while (i < start.size() && start[i] <= p) {
                count++;
                i++;
            }
            while (j < end.size() && end[j] < p) {
                count--;
                j++;
            }
            res[index] = count;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} flowers
     * @param {number[]} people
     * @return {number[]}
     */
    fullBloomFlowers(flowers, people) {
        const start = [],
            end = [];
        for (let f of flowers) {
            start.push(f[0]);
            end.push(f[1]);
        }

        start.sort((a, b) => a - b);
        end.sort((a, b) => a - b);

        let count = 0,
            i = 0,
            j = 0;
        const peopleIndex = people.map((p, idx) => [p, idx]);
        peopleIndex.sort((a, b) => a[0] - b[0]);

        const res = new Array(people.length);

        for (let [p, index] of peopleIndex) {
            while (i < start.length && start[i] <= p) {
                count++;
                i++;
            }
            while (j < end.length && end[j] < p) {
                count--;
                j++;
            }
            res[index] = count;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n \log n)$
- Space complexity: $O(m + n)$

> Where $n$ is the size of the array $flowers$, and $m$ is the size of the array $people$.

---

## 5. Line Sweep

::tabs-start

```python
class Solution:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        events = []
        for start, end in flowers:
            events.append((start, 1))
            events.append((end + 1, -1))

        events.sort()
        queries = sorted((p, i) for i, p in enumerate(people))
        res = [0] * len(people)

        count = j = 0
        for time, index in queries:
            while j < len(events) and events[j][0] <= time:
                count += events[j][1]
                j += 1
            res[index] = count

        return res
```

```java
public class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        List<int[]> events = new ArrayList<>();
        for (int[] f : flowers) {
            events.add(new int[]{f[0], 1});
            events.add(new int[]{f[1] + 1, -1});
        }

        Collections.sort(events, (a, b) -> a[0] - b[0]);
        int[][] queries = new int[people.length][2];
        for (int i = 0; i < people.length; i++) {
            queries[i] = new int[]{people[i], i};
        }
        Arrays.sort(queries, (a, b) -> Integer.compare(a[0], b[0]));

        int[] res = new int[people.length];
        int count = 0, j = 0;
        for (int[] query : queries) {
            int time = query[0], index = query[1];
            while (j < events.size() && events.get(j)[0] <= time) {
                count += events.get(j)[1];
                j++;
            }
            res[index] = count;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        vector<pair<int, int>> events;
        for (auto& f : flowers) {
            events.emplace_back(f[0], 1);
            events.emplace_back(f[1] + 1, -1);
        }

        sort(events.begin(), events.end());
        vector<pair<int, int>> queries;
        for (int i = 0; i < people.size(); i++) {
            queries.emplace_back(people[i], i);
        }

        sort(queries.begin(), queries.end());
        vector<int> res(people.size());
        int count = 0, j = 0;

        for (auto& [time, index] : queries) {
            while (j < events.size() && events[j].first <= time) {
                count += events[j++].second;
            }
            res[index] = count;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} flowers
     * @param {number[]} people
     * @return {number[]}
     */
    fullBloomFlowers(flowers, people) {
        let events = [];
        for (let [start, end] of flowers) {
            events.push([start, 1]);
            events.push([end + 1, -1]);
        }

        events.sort((a, b) => a[0] - b[0]);
        let queries = people.map((p, i) => [p, i]).sort((a, b) => a[0] - b[0]);
        let res = new Array(people.length).fill(0);

        let count = 0,
            j = 0;
        for (let [time, index] of queries) {
            while (j < events.length && events[j][0] <= time) {
                count += events[j][1];
                j++;
            }
            res[index] = count;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n \log n)$
- Space complexity: $O(m + n)$

> Where $n$ is the size of the array $flowers$, and $m$ is the size of the array $people$.
