## 1. Sorting + Brute Force

::tabs-start

```python
class Solution:
    def mostBooked(self, n: int, meetings: List[List[int]]) -> int:
        meetings.sort()
        rooms = [0] * n # end time of meetings in rooms
        meeting_count = [0] * n

        for s, e in meetings:
            min_room = 0
            found = False
            for i in range(n):
                if rooms[i] <= s:
                    found = True
                    meeting_count[i] += 1
                    rooms[i] = e
                    break

                if rooms[min_room] > rooms[i]:
                    min_room = i
            if found:
                continue
            meeting_count[min_room] += 1
            rooms[min_room] += e - s

        return meeting_count.index(max(meeting_count))
```

```java
public class Solution {
    public int mostBooked(int n, int[][] meetings) {
        Arrays.sort(meetings, (a, b) -> Integer.compare(a[0], b[0]));
        long[] rooms = new long[n]; // end times of meetings in rooms
        int[] meetingCount = new int[n];

        for (int[] meeting : meetings) {
            int start = meeting[0], end = meeting[1];
            int minRoom = 0;
            boolean found = false;

            for (int i = 0; i < n; i++) {
                if (rooms[i] <= start) {
                    meetingCount[i]++;
                    rooms[i] = end;
                    found = true;
                    break;
                }
                if (rooms[minRoom] > rooms[i]) {
                    minRoom = i;
                }
            }
            if (found) continue;

            meetingCount[minRoom]++;
            rooms[minRoom] += end - start;
        }

        int maxIndex = 0;
        for (int i = 1; i < n; i++) {
            if (meetingCount[i] > meetingCount[maxIndex]) {
                maxIndex = i;
            }
        }
        return maxIndex;
    }
}
```

```cpp
class Solution {
public:
    int mostBooked(int n, vector<vector<int>>& meetings) {
        sort(meetings.begin(), meetings.end());
        vector<long> rooms(n, 0); // end times of meetings in rooms
        vector<int> meetingCount(n, 0);

        for (const auto& meeting : meetings) {
            int start = meeting[0], end = meeting[1];
            int minRoom = 0;
            bool found = false;

            for (int i = 0; i < n; i++) {
                if (rooms[i] <= start) {
                    meetingCount[i]++;
                    rooms[i] = end;
                    found = true;
                    break;
                }
                if (rooms[minRoom] > rooms[i]) {
                    minRoom = i;
                }
            }

            if (found) continue;
            meetingCount[minRoom]++;
            rooms[minRoom] += end - start;
        }

        int maxIndex = 0;
        for (int i = 1; i < n; i++) {
            if (meetingCount[i] > meetingCount[maxIndex]) {
                maxIndex = i;
            }
        }
        return maxIndex;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} meetings
     * @return {number}
     */
    mostBooked(n, meetings) {
        meetings.sort((a, b) => a[0] - b[0]);
        const rooms = new Array(n).fill(0); // end times of meetings in rooms
        const meetingCount = new Array(n).fill(0);

        for (const [start, end] of meetings) {
            let minRoom = 0;
            let found = false;

            for (let i = 0; i < n; i++) {
                if (rooms[i] <= start) {
                    meetingCount[i]++;
                    rooms[i] = end;
                    found = true;
                    break;
                }
                if (rooms[minRoom] > rooms[i]) {
                    minRoom = i;
                }
            }

            if (found) continue;
            meetingCount[minRoom]++;
            rooms[minRoom] += end - start;
        }

        return meetingCount.indexOf(Math.max(...meetingCount));
    }
}
```

```csharp
public class Solution {
    public int MostBooked(int n, int[][] meetings) {
        Array.Sort(meetings, (a, b) => a[0].CompareTo(b[0]));
        long[] rooms = new long[n]; // end times of meetings in rooms
        int[] meetingCount = new int[n];

        foreach (var meeting in meetings) {
            int start = meeting[0], end = meeting[1];
            int minRoom = 0;
            bool found = false;

            for (int i = 0; i < n; i++) {
                if (rooms[i] <= start) {
                    meetingCount[i]++;
                    rooms[i] = end;
                    found = true;
                    break;
                }
                if (rooms[minRoom] > rooms[i]) {
                    minRoom = i;
                }
            }

            if (!found) {
                meetingCount[minRoom]++;
                rooms[minRoom] += end - start;
            }
        }

        int maxIndex = 0;
        for (int i = 1; i < n; i++) {
            if (meetingCount[i] > meetingCount[maxIndex]) {
                maxIndex = i;
            }
        }

        return maxIndex;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m\log m + n * m)$
- Space complexity: $O(n)$

> Where $n$ is the number of rooms and $m$ is the number of meetings.

---

## 2. Two Min-Heaps

::tabs-start

```python
class Solution:
    def mostBooked(self, n: int, meetings: List[List[int]]) -> int:
        meetings.sort()
        available = [i for i in range(n)]  # Min heap for available rooms
        used = []  # Min heap for used rooms [(end_time, room_number)]
        count = [0] * n  # Count of meetings for each room

        for start, end in meetings:
            while used and used[0][0] <= start:
                _, room = heapq.heappop(used)
                heapq.heappush(available, room)

            if not available:
                end_time, room = heapq.heappop(used)
                end = end_time + (end - start)
                heapq.heappush(available, room)

            room = heapq.heappop(available)
            heapq.heappush(used, (end, room))
            count[room] += 1

        return count.index(max(count))
```

```java
public class Solution {
    public int mostBooked(int n, int[][] meetings) {
        Arrays.sort(meetings, (a, b) -> Long.compare(a[0], b[0]));
        PriorityQueue<Integer> available = new PriorityQueue<>();
        PriorityQueue<long[]> used = new PriorityQueue<>((a, b) ->
            a[0] == b[0] ? Long.compare(a[1], b[1]) : Long.compare(a[0], b[0])
        );
        for (int i = 0; i < n; i++) {
            available.offer(i);
        }
        int[] count = new int[n];

        for (int[] meeting : meetings) {
            long start = meeting[0];
            long end = meeting[1];
            while (!used.isEmpty() && used.peek()[0] <= start) {
                int room = (int) used.poll()[1];
                available.offer(room);
            }
            if (available.isEmpty()) {
                long[] current = used.poll();
                int room = (int) current[1];
                end = current[0] + (end - start);
                available.offer(room);
            }

            int room = available.poll();
            used.offer(new long[]{end, room});
            count[room]++;
        }

        int maxRoom = 0;
        for (int i = 1; i < n; i++) {
            if (count[i] > count[maxRoom]) {
                maxRoom = i;
            }
        }
        return maxRoom;
    }
}
```

```cpp
class Solution {
public:
    int mostBooked(int n, vector<vector<int>>& meetings) {
        sort(meetings.begin(), meetings.end(), [](const vector<int>& a, const vector<int>& b) {
            return (long long)a[0] < (long long)b[0];
        });
        priority_queue<int, vector<int>, greater<int>> available;
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> used;
        for (int i = 0; i < n; i++) {
            available.push(i);
        }
        vector<int> count(n);

        for (const auto& meeting : meetings) {
            long long start = meeting[0];
            long long end = meeting[1];
            while (!used.empty() && used.top().first <= start) {
                int room = used.top().second;
                used.pop();
                available.push(room);
            }
            if (available.empty()) {
                auto current = used.top();
                used.pop();
                end = current.first + (end - start);
                available.push(current.second);
            }

            int room = available.top();
            available.pop();
            used.push({end, room});
            count[room]++;
        }

        int maxRoom = 0;
        for (int i = 1; i < n; i++) {
            if (count[i] > count[maxRoom]) {
                maxRoom = i;
            }
        }
        return maxRoom;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} meetings
     * @return {number}
     */
    mostBooked(n, meetings) {
        meetings.sort((a, b) => a[0] - b[0]);
        const available = new PriorityQueue((a, b) => a - b);
        const used = new PriorityQueue((a, b) =>
            a[0] === b[0] ? a[1] - b[1] : a[0] - b[0],
        );
        for (let i = 0; i < n; i++) {
            available.enqueue(i);
        }
        const count = new Array(n).fill(0);

        for (const [start, end] of meetings) {
            while (!used.isEmpty() && used.front()[0] <= start) {
                const room = used.dequeue()[1];
                available.enqueue(room);
            }

            let room;
            let newEnd = end;
            if (available.isEmpty()) {
                const [endTime, usedRoom] = used.dequeue();
                newEnd = endTime + (end - start);
                available.enqueue(usedRoom);
            }
            room = available.dequeue();
            used.enqueue([newEnd, room]);
            count[room]++;
        }

        return count.indexOf(Math.max(...count));
    }
}
```

```csharp
public class Solution {
    public int MostBooked(int n, int[][] meetings) {
        Array.Sort(meetings, (a, b) => a[0].CompareTo(b[0]));

        var available = new SortedSet<int>();
        for (int i = 0; i < n; i++) {
            available.Add(i);
        }

        var used = new PriorityQueue<(long end, int room), (long end, int room)>(
            Comparer<(long end, int room)>.Create((a, b) =>
                a.end != b.end ? a.end.CompareTo(b.end) : a.room.CompareTo(b.room))
        );

        int[] count = new int[n];

        foreach (var meeting in meetings) {
            long start = meeting[0], end = meeting[1];

            while (used.Count > 0 && used.Peek().end <= start) {
                var (_, room) = used.Dequeue();
                available.Add(room);
            }

            if (available.Count == 0) {
                var (prevEnd, room) = used.Dequeue();
                end = prevEnd + (end - start);
                available.Add(room);
            }

            int assignedRoom = available.Min;
            available.Remove(assignedRoom);
            used.Enqueue((end, assignedRoom), (end, assignedRoom));
            count[assignedRoom]++;
        }

        int maxRoom = 0;
        for (int i = 1; i < n; i++) {
            if (count[i] > count[maxRoom]) {
                maxRoom = i;
            }
        }

        return maxRoom;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m\log m + m \log n)$
- Space complexity: $O(n)$

> Where $n$ is the number of rooms and $m$ is the number of meetings.

---

## 3. One Min-Heap

::tabs-start

```python
class Solution:
    def mostBooked(self, n: int, meetings: List[List[int]]) -> int:
        meetings.sort()
        available = []
        count = [0] * n

        for i in range(n):
            heapq.heappush(available, (0, i))

        for start, end in meetings:
            while available and available[0][0] < start:
                end_time, room = heapq.heappop(available)
                heapq.heappush(available, (start, room))

            end_time, room = heapq.heappop(available)
            heapq.heappush(available, (end_time + (end - start), room))
            count[room] += 1

        return count.index(max(count))
```

```java
public class Solution {
    public int mostBooked(int n, int[][] meetings) {
        Arrays.sort(meetings, (a, b) -> Integer.compare(a[0], b[0]));
        PriorityQueue<long[]> available = new PriorityQueue<>((a, b) ->
            a[0] == b[0] ? Long.compare(a[1], b[1]) : Long.compare(a[0], b[0])
        );
        for (int i = 0; i < n; i++) {
            available.offer(new long[]{0, i});
        }
        int[] count = new int[n];

        for (int[] meeting : meetings) {
            int start = meeting[0], end = meeting[1];
            while (!available.isEmpty() && available.peek()[0] < start) {
                long[] earliest = available.poll();
                available.offer(new long[]{start, earliest[1]});
            }

            long[] room = available.poll();
            long endTime = room[0] + (end - start);
            available.offer(new long[]{endTime, room[1]});
            count[(int) room[1]]++;
        }

        int maxRoom = 0;
        for (int i = 1; i < n; i++) {
            if (count[i] > count[maxRoom]) {
                maxRoom = i;
            }
        }
        return maxRoom;
    }
}
```

```cpp
class Solution {
public:
    int mostBooked(int n, vector<vector<int>>& meetings) {
        sort(meetings.begin(), meetings.end());
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> available;
        for (int i = 0; i < n; i++) {
            available.push({0, i});
        }
        vector<int> count(n);

        for (const auto& meeting : meetings) {
            int start = meeting[0], end = meeting[1];
            while (!available.empty() && available.top().first < start) {
                auto [end_time, room] = available.top();
                available.pop();
                available.push({start, room});
            }

            auto [end_time, room] = available.top();
            available.pop();
            available.push({end_time + (end - start), room});
            count[room]++;
        }

        return max_element(count.begin(), count.end()) - count.begin();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} meetings
     * @return {number}
     */
    mostBooked(n, meetings) {
        meetings.sort((a, b) => a[0] - b[0]);
        const available = new PriorityQueue((a, b) =>
            a[0] === b[0] ? a[1] - b[1] : a[0] - b[0],
        );
        for (let i = 0; i < n; i++) {
            available.enqueue([0, i]);
        }
        const count = new Array(n).fill(0);

        for (const [start, end] of meetings) {
            while (!available.isEmpty() && available.front()[0] < start) {
                const [endTime, room] = available.dequeue();
                available.enqueue([start, room]);
            }

            const [endTime, room] = available.dequeue();
            available.enqueue([endTime + (end - start), room]);
            count[room]++;
        }

        return count.indexOf(Math.max(...count));
    }
}
```

```csharp
public class Solution {
    public int MostBooked(int n, int[][] meetings) {
        Array.Sort(meetings, (a, b) => a[0].CompareTo(b[0]));

        var pq = new PriorityQueue<(long end, int room), (long end, int room)>(
            Comparer<(long end, int room)>.Create((a, b) =>
                a.end != b.end ? a.end.CompareTo(b.end) : a.room.CompareTo(b.room))
        );

        for (int i = 0; i < n; i++) {
            pq.Enqueue((0, i), (0, i));
        }

        int[] count = new int[n];

        foreach (var meeting in meetings) {
            int start = meeting[0], end = meeting[1];

            List<(long end, int room)> temp = new List<(long end, int room)>();

            // Make sure rooms are not idle before meeting start
            while (pq.Count > 0 && pq.Peek().end < start) {
                var room = pq.Dequeue();
                temp.Add((start, room.room));
            }

            foreach (var item in temp) {
                pq.Enqueue(item, item);
            }

            var current = pq.Dequeue();
            long newEnd = current.end + (end - start);
            pq.Enqueue((newEnd, current.room), (newEnd, current.room));
            count[current.room]++;
        }

        int maxRoom = 0;
        for (int i = 1; i < n; i++) {
            if (count[i] > count[maxRoom]) {
                maxRoom = i;
            }
        }

        return maxRoom;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(m \log m + m \log n)$ time in average case.
    - $O(m \log m + m * n)$ time in worst case.
- Space complexity: $O(n)$

> Where $n$ is the number of rooms and $m$ is the number of meetings.
