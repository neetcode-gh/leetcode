## 1. Brute Force

::tabs-start

```python
class Solution:
    def badSensor(self, sensor1: List[int], sensor2: List[int]) -> int:
        n = len(sensor1)

        def isFaulty(bad, good):
            for d in range(n):
                ok = True
                for j in range(n - 1):
                    k = j if j < d else j + 1
                    if bad[j] != good[k]:
                        ok = False
                        break
                if ok:
                    return True
            return False

        one = isFaulty(sensor1, sensor2)
        two = isFaulty(sensor2, sensor1)
        if one == two:
            return -1
        return 1 if one else 2
```

```java
public class Solution {
    public int badSensor(int[] sensor1, int[] sensor2) {
        boolean one = isFaulty(sensor1, sensor2);
        boolean two = isFaulty(sensor2, sensor1);
        if (one == two) {
            return -1;
        }
        return one ? 1 : 2;
    }

    private boolean isFaulty(int[] bad, int[] good) {
        int n = bad.length;
        for (int d = 0; d < n; d++) {
            boolean ok = true;
            for (int j = 0; j < n - 1; j++) {
                int k = j < d ? j : j + 1;
                if (bad[j] != good[k]) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
    bool isFaulty(vector<int>& bad, vector<int>& good) {
        int n = bad.size();
        for (int d = 0; d < n; d++) {
            bool ok = true;
            for (int j = 0; j < n - 1; j++) {
                int k = j < d ? j : j + 1;
                if (bad[j] != good[k]) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                return true;
            }
        }
        return false;
    }

public:
    int badSensor(vector<int>& sensor1, vector<int>& sensor2) {
        bool one = isFaulty(sensor1, sensor2);
        bool two = isFaulty(sensor2, sensor1);
        if (one == two) {
            return -1;
        }
        return one ? 1 : 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} sensor1
     * @param {number[]} sensor2
     * @return {number}
     */
    badSensor(sensor1, sensor2) {
        const n = sensor1.length;

        const isFaulty = (bad, good) => {
            for (let d = 0; d < n; d++) {
                let ok = true;
                for (let j = 0; j < n - 1; j++) {
                    const k = j < d ? j : j + 1;
                    if (bad[j] !== good[k]) {
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    return true;
                }
            }
            return false;
        };

        const one = isFaulty(sensor1, sensor2);
        const two = isFaulty(sensor2, sensor1);
        if (one === two) {
            return -1;
        }
        return one ? 1 : 2;
    }
}
```

```csharp
public class Solution {
    public int BadSensor(int[] sensor1, int[] sensor2) {
        bool one = IsFaulty(sensor1, sensor2);
        bool two = IsFaulty(sensor2, sensor1);
        if (one == two) {
            return -1;
        }
        return one ? 1 : 2;
    }

    private bool IsFaulty(int[] bad, int[] good) {
        int n = bad.Length;
        for (int d = 0; d < n; d++) {
            bool ok = true;
            for (int j = 0; j < n - 1; j++) {
                int k = j < d ? j : j + 1;
                if (bad[j] != good[k]) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                return true;
            }
        }
        return false;
    }
}
```

```go
func badSensor(sensor1 []int, sensor2 []int) int {
    n := len(sensor1)

    isFaulty := func(bad, good []int) bool {
        for d := 0; d < n; d++ {
            ok := true
            for j := 0; j < n-1; j++ {
                k := j
                if j >= d {
                    k = j + 1
                }
                if bad[j] != good[k] {
                    ok = false
                    break
                }
            }
            if ok {
                return true
            }
        }
        return false
    }

    one := isFaulty(sensor1, sensor2)
    two := isFaulty(sensor2, sensor1)
    if one == two {
        return -1
    }
    if one {
        return 1
    }
    return 2
}
```

```kotlin
class Solution {
    fun badSensor(sensor1: IntArray, sensor2: IntArray): Int {
        val one = isFaulty(sensor1, sensor2)
        val two = isFaulty(sensor2, sensor1)
        if (one == two) {
            return -1
        }
        return if (one) 1 else 2
    }

    private fun isFaulty(bad: IntArray, good: IntArray): Boolean {
        val n = bad.size
        for (d in 0 until n) {
            var ok = true
            for (j in 0 until n - 1) {
                val k = if (j < d) j else j + 1
                if (bad[j] != good[k]) {
                    ok = false
                    break
                }
            }
            if (ok) {
                return true
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func badSensor(_ sensor1: [Int], _ sensor2: [Int]) -> Int {
        let one = isFaulty(sensor1, sensor2)
        let two = isFaulty(sensor2, sensor1)
        if one == two {
            return -1
        }
        return one ? 1 : 2
    }

    private func isFaulty(_ bad: [Int], _ good: [Int]) -> Bool {
        let n = bad.count
        for d in 0..<n {
            var ok = true
            for j in 0..<(n - 1) {
                let k = j < d ? j : j + 1
                if bad[j] != good[k] {
                    ok = false
                    break
                }
            }
            if ok {
                return true
            }
        }
        return false
    }
}
```

```rust
impl Solution {
    pub fn bad_sensor(sensor1: Vec<i32>, sensor2: Vec<i32>) -> i32 {
        let one = Self::is_faulty(&sensor1, &sensor2);
        let two = Self::is_faulty(&sensor2, &sensor1);
        if one == two {
            return -1;
        }
        if one { 1 } else { 2 }
    }

    fn is_faulty(bad: &[i32], good: &[i32]) -> bool {
        let n = bad.len();
        for d in 0..n {
            let mut ok = true;
            for j in 0..n - 1 {
                let k = if j < d { j } else { j + 1 };
                if bad[j] != good[k] {
                    ok = false;
                    break;
                }
            }
            if ok {
                return true;
            }
        }
        false
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} sensor1
     * @param {number[]} sensor2
     * @return {number}
     */
    badSensor(sensor1: number[], sensor2: number[]): number {
        const n = sensor1.length;

        const isFaulty = (bad: number[], good: number[]): boolean => {
            for (let d = 0; d < n; d++) {
                let ok = true;
                for (let j = 0; j < n - 1; j++) {
                    const k = j < d ? j : j + 1;
                    if (bad[j] !== good[k]) {
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    return true;
                }
            }
            return false;
        };

        const one = isFaulty(sensor1, sensor2);
        const two = isFaulty(sensor2, sensor1);
        if (one === two) {
            return -1;
        }
        return one ? 1 : 2;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

> Where $n$ is the length of the arrays $sensor1$ and $sensor2$.

---

## 2. Two Pointers

::tabs-start

```python
class Solution:
    def badSensor(self, sensor1: List[int], sensor2: List[int]) -> int:
        n = len(sensor1)
        i = 0
        while i < n and sensor1[i] == sensor2[i]:
            i += 1

        one = two = True
        for j in range(i, n - 1):
            if sensor1[j] != sensor2[j + 1]:
                one = False
            if sensor2[j] != sensor1[j + 1]:
                two = False

        if one == two:
            return -1
        return 1 if one else 2
```

```java
public class Solution {
    public int badSensor(int[] sensor1, int[] sensor2) {
        int n = sensor1.length;
        int i = 0;
        while (i < n && sensor1[i] == sensor2[i]) {
            i++;
        }

        boolean one = true, two = true;
        for (int j = i; j < n - 1; j++) {
            if (sensor1[j] != sensor2[j + 1]) {
                one = false;
            }
            if (sensor2[j] != sensor1[j + 1]) {
                two = false;
            }
        }

        if (one == two) {
            return -1;
        }
        return one ? 1 : 2;
    }
}
```

```cpp
class Solution {
public:
    int badSensor(vector<int>& sensor1, vector<int>& sensor2) {
        int n = sensor1.size();
        int i = 0;
        while (i < n && sensor1[i] == sensor2[i]) {
            i++;
        }

        bool one = true, two = true;
        for (int j = i; j < n - 1; j++) {
            if (sensor1[j] != sensor2[j + 1]) {
                one = false;
            }
            if (sensor2[j] != sensor1[j + 1]) {
                two = false;
            }
        }

        if (one == two) {
            return -1;
        }
        return one ? 1 : 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} sensor1
     * @param {number[]} sensor2
     * @return {number}
     */
    badSensor(sensor1, sensor2) {
        const n = sensor1.length;
        let i = 0;
        while (i < n && sensor1[i] === sensor2[i]) {
            i++;
        }

        let one = true;
        let two = true;
        for (let j = i; j < n - 1; j++) {
            if (sensor1[j] !== sensor2[j + 1]) {
                one = false;
            }
            if (sensor2[j] !== sensor1[j + 1]) {
                two = false;
            }
        }

        if (one === two) {
            return -1;
        }
        return one ? 1 : 2;
    }
}
```

```csharp
public class Solution {
    public int BadSensor(int[] sensor1, int[] sensor2) {
        int n = sensor1.Length;
        int i = 0;
        while (i < n && sensor1[i] == sensor2[i]) {
            i++;
        }

        bool one = true, two = true;
        for (int j = i; j < n - 1; j++) {
            if (sensor1[j] != sensor2[j + 1]) {
                one = false;
            }
            if (sensor2[j] != sensor1[j + 1]) {
                two = false;
            }
        }

        if (one == two) {
            return -1;
        }
        return one ? 1 : 2;
    }
}
```

```go
func badSensor(sensor1 []int, sensor2 []int) int {
    n := len(sensor1)
    i := 0
    for i < n && sensor1[i] == sensor2[i] {
        i++
    }

    one, two := true, true
    for j := i; j < n-1; j++ {
        if sensor1[j] != sensor2[j+1] {
            one = false
        }
        if sensor2[j] != sensor1[j+1] {
            two = false
        }
    }

    if one == two {
        return -1
    }
    if one {
        return 1
    }
    return 2
}
```

```kotlin
class Solution {
    fun badSensor(sensor1: IntArray, sensor2: IntArray): Int {
        val n = sensor1.size
        var i = 0
        while (i < n && sensor1[i] == sensor2[i]) {
            i++
        }

        var one = true
        var two = true
        for (j in i until n - 1) {
            if (sensor1[j] != sensor2[j + 1]) {
                one = false
            }
            if (sensor2[j] != sensor1[j + 1]) {
                two = false
            }
        }

        if (one == two) {
            return -1
        }
        return if (one) 1 else 2
    }
}
```

```swift
class Solution {
    func badSensor(_ sensor1: [Int], _ sensor2: [Int]) -> Int {
        let n = sensor1.count
        var i = 0
        while i < n && sensor1[i] == sensor2[i] {
            i += 1
        }

        var one = true
        var two = true
        var j = i
        while j < n - 1 {
            if sensor1[j] != sensor2[j + 1] {
                one = false
            }
            if sensor2[j] != sensor1[j + 1] {
                two = false
            }
            j += 1
        }

        if one == two {
            return -1
        }
        return one ? 1 : 2
    }
}
```

```rust
impl Solution {
    pub fn bad_sensor(sensor1: Vec<i32>, sensor2: Vec<i32>) -> i32 {
        let n = sensor1.len();
        let mut i = 0;
        while i < n && sensor1[i] == sensor2[i] {
            i += 1;
        }

        let mut one = true;
        let mut two = true;
        for j in i..n - 1 {
            if sensor1[j] != sensor2[j + 1] {
                one = false;
            }
            if sensor2[j] != sensor1[j + 1] {
                two = false;
            }
        }

        if one == two {
            return -1;
        }
        if one { 1 } else { 2 }
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} sensor1
     * @param {number[]} sensor2
     * @return {number}
     */
    badSensor(sensor1: number[], sensor2: number[]): number {
        const n = sensor1.length;
        let i = 0;
        while (i < n && sensor1[i] === sensor2[i]) {
            i++;
        }

        let one = true;
        let two = true;
        for (let j = i; j < n - 1; j++) {
            if (sensor1[j] !== sensor2[j + 1]) {
                one = false;
            }
            if (sensor2[j] !== sensor1[j + 1]) {
                two = false;
            }
        }

        if (one === two) {
            return -1;
        }
        return one ? 1 : 2;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

> Where $n$ is the length of the arrays $sensor1$ and $sensor2$.

---

## 3. Two Pointers (One Pass)

::tabs-start

```python
class Solution:
    def badSensor(self, sensor1: List[int], sensor2: List[int]) -> int:
        n = len(sensor1)
        i = 0
        while i < n and sensor1[i] == sensor2[i]:
            i += 1
        while i + 1 < n and sensor1[i] == sensor2[i + 1] and sensor1[i + 1] == sensor2[i]:
            i += 1

        if i >= n - 1:
            return -1
        return 1 if sensor1[i] == sensor2[i + 1] else 2
```

```java
public class Solution {
    public int badSensor(int[] sensor1, int[] sensor2) {
        int n = sensor1.length;
        int i = 0;
        while (i < n && sensor1[i] == sensor2[i]) {
            i++;
        }
        while (i + 1 < n && sensor1[i] == sensor2[i + 1] && sensor1[i + 1] == sensor2[i]) {
            i++;
        }

        if (i >= n - 1) {
            return -1;
        }
        return sensor1[i] == sensor2[i + 1] ? 1 : 2;
    }
}
```

```cpp
class Solution {
public:
    int badSensor(vector<int>& sensor1, vector<int>& sensor2) {
        int n = sensor1.size();
        int i = 0;
        while (i < n && sensor1[i] == sensor2[i]) {
            i++;
        }
        while (i + 1 < n && sensor1[i] == sensor2[i + 1] && sensor1[i + 1] == sensor2[i]) {
            i++;
        }

        if (i >= n - 1) {
            return -1;
        }
        return sensor1[i] == sensor2[i + 1] ? 1 : 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} sensor1
     * @param {number[]} sensor2
     * @return {number}
     */
    badSensor(sensor1, sensor2) {
        const n = sensor1.length;
        let i = 0;
        while (i < n && sensor1[i] === sensor2[i]) {
            i++;
        }
        while (
            i + 1 < n &&
            sensor1[i] === sensor2[i + 1] &&
            sensor1[i + 1] === sensor2[i]
        ) {
            i++;
        }

        if (i >= n - 1) {
            return -1;
        }
        return sensor1[i] === sensor2[i + 1] ? 1 : 2;
    }
}
```

```csharp
public class Solution {
    public int BadSensor(int[] sensor1, int[] sensor2) {
        int n = sensor1.Length;
        int i = 0;
        while (i < n && sensor1[i] == sensor2[i]) {
            i++;
        }
        while (i + 1 < n && sensor1[i] == sensor2[i + 1] && sensor1[i + 1] == sensor2[i]) {
            i++;
        }

        if (i >= n - 1) {
            return -1;
        }
        return sensor1[i] == sensor2[i + 1] ? 1 : 2;
    }
}
```

```go
func badSensor(sensor1 []int, sensor2 []int) int {
    n := len(sensor1)
    i := 0
    for i < n && sensor1[i] == sensor2[i] {
        i++
    }
    for i+1 < n && sensor1[i] == sensor2[i+1] && sensor1[i+1] == sensor2[i] {
        i++
    }

    if i >= n-1 {
        return -1
    }
    if sensor1[i] == sensor2[i+1] {
        return 1
    }
    return 2
}
```

```kotlin
class Solution {
    fun badSensor(sensor1: IntArray, sensor2: IntArray): Int {
        val n = sensor1.size
        var i = 0
        while (i < n && sensor1[i] == sensor2[i]) {
            i++
        }
        while (i + 1 < n && sensor1[i] == sensor2[i + 1] && sensor1[i + 1] == sensor2[i]) {
            i++
        }

        if (i >= n - 1) {
            return -1
        }
        return if (sensor1[i] == sensor2[i + 1]) 1 else 2
    }
}
```

```swift
class Solution {
    func badSensor(_ sensor1: [Int], _ sensor2: [Int]) -> Int {
        let n = sensor1.count
        var i = 0
        while i < n && sensor1[i] == sensor2[i] {
            i += 1
        }
        while i + 1 < n && sensor1[i] == sensor2[i + 1] && sensor1[i + 1] == sensor2[i] {
            i += 1
        }

        if i >= n - 1 {
            return -1
        }
        return sensor1[i] == sensor2[i + 1] ? 1 : 2
    }
}
```

```rust
impl Solution {
    pub fn bad_sensor(sensor1: Vec<i32>, sensor2: Vec<i32>) -> i32 {
        let n = sensor1.len();
        let mut i = 0;
        while i < n && sensor1[i] == sensor2[i] {
            i += 1;
        }
        while i + 1 < n && sensor1[i] == sensor2[i + 1] && sensor1[i + 1] == sensor2[i] {
            i += 1;
        }

        if i + 1 >= n {
            return -1;
        }
        if sensor1[i] == sensor2[i + 1] { 1 } else { 2 }
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} sensor1
     * @param {number[]} sensor2
     * @return {number}
     */
    badSensor(sensor1: number[], sensor2: number[]): number {
        const n = sensor1.length;
        let i = 0;
        while (i < n && sensor1[i] === sensor2[i]) {
            i++;
        }
        while (
            i + 1 < n &&
            sensor1[i] === sensor2[i + 1] &&
            sensor1[i + 1] === sensor2[i]
        ) {
            i++;
        }

        if (i >= n - 1) {
            return -1;
        }
        return sensor1[i] === sensor2[i + 1] ? 1 : 2;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

> Where $n$ is the length of the arrays $sensor1$ and $sensor2$.
