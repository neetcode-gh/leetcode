## 1. Stack

### Intuition

Cars that start closer to the target are processed first.  
For each car, we compute the **time** it will take to reach the target.  
If a car behind reaches the target **no faster** than the car in front, it will eventually catch up and join the same fleet.  
So we only keep the car’s time if it forms a **new** fleet; otherwise, it merges with the previous one.  
Using a stack helps us easily compare each car’s time with the fleet ahead of it.

### Algorithm

1. Pair each car's position with its speed.
2. Sort the cars in descending order of position (closest to target first).
3. For each car:
   - Compute the time it takes to reach the target.
   - Push this time onto a stack.
   - If the new car’s time is **less than or equal** to the time before it,  
     it catches up and merges with that fleet → pop it from the stack.
4. The number of remaining times in the stack equals the number of fleets.
5. Return the stack size.

::tabs-start

```python
class Solution:
    def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
        pair = [(p, s) for p, s in zip(position, speed)]
        pair.sort(reverse=True)
        stack = []
        for p, s in pair:  # Reverse Sorted Order
            stack.append((target - p) / s)
            if len(stack) >= 2 and stack[-1] <= stack[-2]:
                stack.pop()
        return len(stack)
```

```java
public class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int[][] pair = new int[position.length][2];
        for (int i = 0; i < position.length; i++) {
            pair[i][0] = position[i];
            pair[i][1] = speed[i];
        }
        Arrays.sort(pair, (a, b) -> Integer.compare(b[0], a[0]));
        Stack<Double> stack = new Stack<>();
        for (int[] p : pair) {
            stack.push((double) (target - p[0]) / p[1]);
            if (stack.size() >= 2 &&
                stack.peek() <= stack.get(stack.size() - 2))
            {
                stack.pop();
            }
        }
        return stack.size();
    }
}
```

```cpp
class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        vector<pair<int, int>> pair;
        for (int i = 0; i < position.size(); i++) {
            pair.push_back({position[i], speed[i]});
        }
        sort(pair.rbegin(), pair.rend());
        vector<double> stack;
        for (auto& p : pair) {
            stack.push_back((double)(target - p.first) / p.second);
            if (stack.size() >= 2 &&
                stack.back() <= stack[stack.size() - 2])
            {
                stack.pop_back();
            }
        }
        return stack.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    carFleet(target, position, speed) {
        let pair = position.map((p, i) => [p, speed[i]]);
        pair.sort((a, b) => b[0] - a[0]);
        let stack = [];
        for (let [p, s] of pair) {
            stack.push((target - p) / s);
            if (
                stack.length >= 2 &&
                stack[stack.length - 1] <= stack[stack.length - 2]
            ) {
                stack.pop();
            }
        }
        return stack.length;
    }
}
```

```csharp
public class Solution {
    public int CarFleet(int target, int[] position, int[] speed) {
        int[][] pair = new int[position.Length][];
        for (int i = 0; i < position.Length; i++) {
            pair[i] = new int[] { position[i], speed[i] };
        }
        Array.Sort(pair, (a, b) => b[0].CompareTo(a[0]));
        Stack<double> stack = new Stack<double>();
        foreach (var p in pair) {
            stack.Push((double)(target - p[0]) / p[1]);
            if (stack.Count >= 2 && stack.Peek() <= stack.ElementAt(1)) {
                stack.Pop();
            }
        }
        return stack.Count;
    }
}
```

```go
func carFleet(target int, position []int, speed []int) int {
    n := len(position)
    pair := make([][2]int, n)
    for i := 0; i < n; i++ {
        pair[i] = [2]int{position[i], speed[i]}
    }

    sort.Slice(pair, func(i, j int) bool {
        return pair[i][0] > pair[j][0]
    })

    stack := []float64{}
    for _, p := range pair {
        time := float64(target - p[0]) / float64(p[1])
        stack = append(stack, time)
        if len(stack) >= 2 && stack[len(stack)-1] <= stack[len(stack)-2] {
            stack = stack[:len(stack)-1]
        }
    }

    return len(stack)
}
```

```kotlin
class Solution {
    fun carFleet(target: Int, position: IntArray, speed: IntArray): Int {
        val pair = position.zip(speed).sortedByDescending { it.first }
        val stack = mutableListOf<Double>()

        for ((p, s) in pair) {
            val time = (target - p).toDouble() / s
            stack.add(time)
            if (stack.size >= 2 && stack[stack.size - 1] <= stack[stack.size - 2]) {
                stack.removeAt(stack.size - 1)
            }
        }

        return stack.size
    }
}
```

```swift
class Solution {
    func carFleet(_ target: Int, _ position: [Int], _ speed: [Int]) -> Int {
        var pair = zip(position, speed).map { ($0, $1) }
        pair.sort { $0.0 > $1.0 } // Sort in descending order by position

        var stack = [Double]()

        for (p, s) in pair {
            stack.append(Double(target - p) / Double(s))
            if stack.count >= 2 && stack.last! <= stack[stack.count - 2] {
                stack.removeLast()
            }
        }

        return stack.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Iteration

### Intuition

After sorting cars from closest to the target to farthest, we calculate how long each one needs to reach the target.  
A car forms a **new fleet** only if it takes **longer** than the fleet in front of it.  
If it takes the same time or less, it will eventually catch up and merge into that fleet.  
So instead of using a stack, we just keep track of the most recent fleet time.

### Algorithm

1. Pair each car’s position with its speed and sort descending by position.
2. Start with the first car forming the first fleet.
3. Keep track of the fleet’s time (`prevTime`)—the time of the car closest to the target.
4. For each remaining car:
   - Compute its time to reach the target.
   - If this time is **greater** than `prevTime`, it cannot catch up → it forms a new fleet.
     - Increase fleet count.
     - Update `prevTime` to this new time.
   - Otherwise, it merges with the existing fleet → do nothing.
5. Return the number of fleets.

::tabs-start

```python
class Solution:
    def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
        pair = [(p, s) for p, s in zip(position, speed)]
        pair.sort(reverse=True)

        fleets = 1
        prevTime = (target - pair[0][0]) / pair[0][1]
        for i in range(1, len(pair)):
            currCar = pair[i]
            currTime = (target - currCar[0]) / currCar[1]
            if currTime > prevTime:
                fleets += 1
                prevTime = currTime
        return fleets
```

```java
public class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        int[][] pair = new int[n][2];
        for (int i = 0; i < n; i++) {
            pair[i][0] = position[i];
            pair[i][1] = speed[i];
        }
        Arrays.sort(pair, (a, b) -> Integer.compare(b[0], a[0]));

        int fleets = 1;
        double prevTime = (double)(target - pair[0][0]) / pair[0][1];
        for (int i = 1; i < n; i++) {
            double currTime = (double)(target - pair[i][0]) / pair[i][1];
            if (currTime > prevTime) {
                fleets++;
                prevTime = currTime;
            }
        }
        return fleets;
    }
}
```

```cpp
class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int n = position.size();
        vector<pair<int, int>> pair;
        for (int i = 0; i < n; i++) {
            pair.push_back({position[i], speed[i]});
        }
        sort(pair.rbegin(), pair.rend());

        int fleets = 1;
        double prevTime = (double)(target - pair[0].first) / pair[0].second;
        for (int i = 1; i < n; i++) {
            double currTime = (double)(target - pair[i].first) / pair[i].second;
            if (currTime > prevTime) {
                fleets++;
                prevTime = currTime;
            }
        }
        return fleets;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    carFleet(target, position, speed) {
        let pair = position.map((p, i) => [p, speed[i]]);
        pair.sort((a, b) => b[0] - a[0]);

        let fleets = 1;
        let prevTime = (target - pair[0][0]) / pair[0][1];
        for (let i = 1; i < pair.length; i++) {
            let currTime = (target - pair[i][0]) / pair[i][1];
            if (currTime > prevTime) {
                fleets++;
                prevTime = currTime;
            }
        }
        return fleets;
    }
}
```

```csharp
public class Solution {
    public int CarFleet(int target, int[] position, int[] speed) {
        int n = position.Length;
        int[][] pair = new int[n][];
        for (int i = 0; i < n; i++) {
            pair[i] = new int[] { position[i], speed[i] };
        }
        Array.Sort(pair, (a, b) => b[0].CompareTo(a[0]));

        int fleets = 1;
        double prevTime = (double)(target - pair[0][0]) / pair[0][1];
        for (int i = 1; i < n; i++) {
            double currTime = (double)(target - pair[i][0]) / pair[i][1];
            if (currTime > prevTime) {
                fleets++;
                prevTime = currTime;
            }
        }
        return fleets;
    }
}
```

```go
func carFleet(target int, position []int, speed []int) int {
    n := len(position)
    pair := make([][2]int, n)
    for i := 0; i < n; i++ {
        pair[i] = [2]int{position[i], speed[i]}
    }

    sort.Slice(pair, func(i, j int) bool {
        return pair[i][0] > pair[j][0]
    })

    fleets := 1
    prevTime := float64(target - pair[0][0]) / float64(pair[0][1])
    for i := 1; i < n; i++ {
        currTime := float64(target - pair[i][0]) / float64(pair[i][1])
        if currTime > prevTime {
            fleets++
            prevTime = currTime
        }
    }

    return fleets
}
```

```kotlin
class Solution {
    fun carFleet(target: Int, position: IntArray, speed: IntArray): Int {
        val pair = position.zip(speed).sortedByDescending { it.first }

        var fleets = 1
        var prevTime = (target - pair[0].first).toDouble() / pair[0].second
        for (i in 1 until pair.size) {
            val (p, s) = pair[i]
            val currTime = (target - p).toDouble() / s
            if (currTime > prevTime) {
                fleets++
                prevTime = currTime
            }
        }

        return fleets
    }
}
```

```swift
class Solution {
    func carFleet(_ target: Int, _ position: [Int], _ speed: [Int]) -> Int {
        var pair = zip(position, speed).map { ($0, $1) }
        pair.sort { $0.0 > $1.0 } // Sort in descending order by position

        var fleets = 1
        var prevTime = Double(target - pair[0].0) / Double(pair[0].1)

        for i in 1..<pair.count {
            let currCar = pair[i]
            let currTime = Double(target - currCar.0) / Double(currCar.1)

            if currTime > prevTime {
                fleets += 1
                prevTime = currTime
            }
        }

        return fleets
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
