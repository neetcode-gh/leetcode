## 1. Sorting

### Intuition
We need to assign bikes to workers based on priority: smallest Manhattan distance first, then smallest worker index, then smallest bike index. By generating all possible worker-bike pairs with their distances and sorting them by these criteria, we can greedily assign each pair in order, skipping pairs where either the worker or bike is already taken.

### Algorithm
1. Calculate the Manhattan distance between every worker and every bike, creating triplets of (distance, worker index, bike index).
2. Sort all triplets by distance first, then worker index, then bike index.
3. Create arrays to track which bikes are taken and which workers have been assigned bikes.
4. Iterate through the sorted triplets. For each pair where both the worker and bike are available, assign the bike to the worker.
5. Stop once all workers have been assigned bikes. Return the assignment array.

::tabs-start

```python
class Solution:
    def assignBikes(self, workers: List[List[int]], bikes: List[List[int]]) -> List[int]:
        
        def find_distance(worker_loc, bike_loc):
            return abs(worker_loc[0] - bike_loc[0]) + abs(worker_loc[1] - bike_loc[1])
        
        # Calculate the distance between each worker and bike.
        all_triplets = []
        for worker, worker_loc in enumerate(workers):
            for bike, bike_loc in enumerate(bikes):
                distance = find_distance(worker_loc, bike_loc)
                all_triplets.append((distance, worker, bike))
        
        # Sort the triplets. By default, sorting will prioritize the
        # tuple's first value, then second value, and finally the third value
        all_triplets.sort()
        
        # Initialize all values to False, to signify no bikes have been taken
        bike_status = [False] * len(bikes)
        # Initialize all values to -1, to signify no worker has a bike
        worker_status = [-1] * len(workers)
        # Keep track of how many worker-bike pairs have been made
        pair_count = 0
        
        for distance, worker, bike in all_triplets:
            # If both worker and bike are free, assign the bike to
            # the worker and mark the bike as taken
            if worker_status[worker] == -1 and not bike_status[bike]:
                bike_status[bike] = True
                worker_status[worker] = bike
                pair_count += 1
                
                # If all the workers have the bike assigned, we can stop
                if pair_count == len(workers):
                    return worker_status
        
        return worker_status
```

```java
class Solution {
     // Class to store (worker, bike, distance)
    class WorkerBikePair {
        int workerIndex;
        int bikeIndex;
        int distance;   
        
        // Constructor to initialize the member variables
        WorkerBikePair(int workerIndex, int bikeIndex, int distance) {
            this.workerIndex = workerIndex;
            this.bikeIndex = bikeIndex;
            this.distance = distance;
        }
    }
    
    // Custom comparator for sorting
    Comparator<WorkerBikePair> WorkerBikePairComparator
        = new Comparator<WorkerBikePair>() {
        @Override
        public int compare(WorkerBikePair a, WorkerBikePair b) {
            if (a.distance != b.distance) {
                // Prioritize the one having smaller distance
                return a.distance - b.distance;
            } else if (a.workerIndex != b.workerIndex) {
                // Prioritize according to the worker index
                return a.workerIndex - b.workerIndex;
            } else {
                // Prioritize according to the bike index
                return a.bikeIndex - b.bikeIndex;
            }
        }
    };
    
    // Function to return the Manhattan distance
    int findDistance(int[] worker, int[] bike) {
        return Math.abs(worker[0] - bike[0]) + Math.abs(worker[1] - bike[1]);
    }
    
    public int[] assignBikes(int[][] workers, int[][] bikes) {
        // List of WorkerBikePair's to store all the possible pairs
        List<WorkerBikePair> allTriplets = new ArrayList<>();
        
        // Generate all the possible pairs
        for (int worker = 0; worker < workers.length; worker++) {
            for (int bike = 0; bike < bikes.length; bike++) {
                int distance = findDistance(workers[worker], bikes[bike]);        
                WorkerBikePair workerBikePair 
                    = new WorkerBikePair(worker, bike, distance);
                allTriplets.add(workerBikePair);
            }
        }
        
        // Sort the triplets as per the custom comparator 'WorkerBikePairComparator'
        Collections.sort(allTriplets, WorkerBikePairComparator);  
        
        // Initialize all values to false, to signify no bikes have been taken
        boolean bikeStatus[] = new boolean[bikes.length];
        // Initialize all index to -1, to mark all the workers available
        int workerStatus[] = new int[workers.length];
        Arrays.fill(workerStatus, -1);
        // Keep track of how many worker-bike pairs have been made
        int pairCount = 0;
        
        for (WorkerBikePair triplet : allTriplets) {
            int worker = triplet.workerIndex;
            int bike = triplet.bikeIndex;
            
            // If both worker and bike are free, assign them to each other
            if (workerStatus[worker] == -1 && !bikeStatus[bike]) {
                bikeStatus[bike] = true;
                workerStatus[worker] = bike;
                pairCount++;
                
                // If all the workers have the bike assigned, we can stop
                if (pairCount == workers.length) {
                    return workerStatus;
                }
            }
        }
        
        return workerStatus;
    }
}
```

```cpp
class Solution {
public:
    // Function to return the Manhattan distance
    int findDistance(vector<int>& worker, vector<int>& bike) {
        return abs(worker[0] - bike[0]) + abs(worker[1] - bike[1]);
    }
    
    vector<int> assignBikes(vector<vector<int>>& workers, vector<vector<int>>& bikes) {
        // List of WorkerBikeTuples's to store all the possible triplets
        vector<tuple<int, int, int>> allTriplets;
        
        // Generate all the possible pairs
        for (int worker = 0; worker < workers.size(); worker++) {
            for (int bike = 0; bike < bikes.size(); bike++) {
                int distance = findDistance(workers[worker], bikes[bike]);        
                allTriplets.push_back({distance, worker, bike});
            }
        }
        
        // Sort the triplets. By default, each sorting will prioritize the
        // Tuple's first value, then second value, and finally the third value
        sort(allTriplets.begin(), allTriplets.end());  
        
        // Initialize all values to false, to signify no bikes have been taken
        vector<int> bikeStatus(bikes.size(), false);
        // Initialize all index to -1, to signify no worker has a bike
        vector<int> workerStatus(workers.size(), -1);
        // Keep track of how many worker-bike pairs have been made
        int pairCount = 0;
        
        for (auto[dist, worker, bike] : allTriplets) { 
            // If both worker and bike are free, assign them to each other
            if (workerStatus[worker] == -1 && !bikeStatus[bike]) {
                bikeStatus[bike] = true;
                workerStatus[worker] = bike;
                pairCount++;
                
                // If all the workers have the bike assigned, we can stop
                if (pairCount == workers.size()) {
                    return workerStatus;
                }
            }
        }
        
        return workerStatus;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} workers
     * @param {number[][]} bikes
     * @return {number[]}
     */
    assignBikes(workers, bikes) {
        const findDistance = (workerLoc, bikeLoc) => {
            return Math.abs(workerLoc[0] - bikeLoc[0]) + Math.abs(workerLoc[1] - bikeLoc[1]);
        };

        const allTriplets = [];
        for (let worker = 0; worker < workers.length; worker++) {
            for (let bike = 0; bike < bikes.length; bike++) {
                const distance = findDistance(workers[worker], bikes[bike]);
                allTriplets.push([distance, worker, bike]);
            }
        }

        allTriplets.sort((a, b) => {
            if (a[0] !== b[0]) return a[0] - b[0];
            if (a[1] !== b[1]) return a[1] - b[1];
            return a[2] - b[2];
        });

        const bikeStatus = new Array(bikes.length).fill(false);
        const workerStatus = new Array(workers.length).fill(-1);
        let pairCount = 0;

        for (const [distance, worker, bike] of allTriplets) {
            if (workerStatus[worker] === -1 && !bikeStatus[bike]) {
                bikeStatus[bike] = true;
                workerStatus[worker] = bike;
                pairCount++;
                if (pairCount === workers.length) {
                    return workerStatus;
                }
            }
        }

        return workerStatus;
    }
}
```

```csharp
public class Solution {
    public int[] AssignBikes(int[][] workers, int[][] bikes) {
        int FindDistance(int[] worker, int[] bike) {
            return Math.Abs(worker[0] - bike[0]) + Math.Abs(worker[1] - bike[1]);
        }

        var allTriplets = new List<(int dist, int worker, int bike)>();
        for (int worker = 0; worker < workers.Length; worker++) {
            for (int bike = 0; bike < bikes.Length; bike++) {
                int distance = FindDistance(workers[worker], bikes[bike]);
                allTriplets.Add((distance, worker, bike));
            }
        }

        allTriplets.Sort((a, b) => {
            if (a.dist != b.dist) return a.dist.CompareTo(b.dist);
            if (a.worker != b.worker) return a.worker.CompareTo(b.worker);
            return a.bike.CompareTo(b.bike);
        });

        bool[] bikeStatus = new bool[bikes.Length];
        int[] workerStatus = new int[workers.Length];
        Array.Fill(workerStatus, -1);
        int pairCount = 0;

        foreach (var triplet in allTriplets) {
            if (workerStatus[triplet.worker] == -1 && !bikeStatus[triplet.bike]) {
                bikeStatus[triplet.bike] = true;
                workerStatus[triplet.worker] = triplet.bike;
                pairCount++;
                if (pairCount == workers.Length) {
                    return workerStatus;
                }
            }
        }

        return workerStatus;
    }
}
```

```go
func assignBikes(workers [][]int, bikes [][]int) []int {
    findDistance := func(worker, bike []int) int {
        return abs(worker[0]-bike[0]) + abs(worker[1]-bike[1])
    }

    type triplet struct {
        dist, worker, bike int
    }

    allTriplets := []triplet{}
    for worker := 0; worker < len(workers); worker++ {
        for bike := 0; bike < len(bikes); bike++ {
            distance := findDistance(workers[worker], bikes[bike])
            allTriplets = append(allTriplets, triplet{distance, worker, bike})
        }
    }

    sort.Slice(allTriplets, func(i, j int) bool {
        if allTriplets[i].dist != allTriplets[j].dist {
            return allTriplets[i].dist < allTriplets[j].dist
        }
        if allTriplets[i].worker != allTriplets[j].worker {
            return allTriplets[i].worker < allTriplets[j].worker
        }
        return allTriplets[i].bike < allTriplets[j].bike
    })

    bikeStatus := make([]bool, len(bikes))
    workerStatus := make([]int, len(workers))
    for i := range workerStatus {
        workerStatus[i] = -1
    }
    pairCount := 0

    for _, t := range allTriplets {
        if workerStatus[t.worker] == -1 && !bikeStatus[t.bike] {
            bikeStatus[t.bike] = true
            workerStatus[t.worker] = t.bike
            pairCount++
            if pairCount == len(workers) {
                return workerStatus
            }
        }
    }

    return workerStatus
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun assignBikes(workers: Array<IntArray>, bikes: Array<IntArray>): IntArray {
        fun findDistance(worker: IntArray, bike: IntArray): Int {
            return kotlin.math.abs(worker[0] - bike[0]) + kotlin.math.abs(worker[1] - bike[1])
        }

        data class Triplet(val dist: Int, val worker: Int, val bike: Int)

        val allTriplets = mutableListOf<Triplet>()
        for (worker in workers.indices) {
            for (bike in bikes.indices) {
                val distance = findDistance(workers[worker], bikes[bike])
                allTriplets.add(Triplet(distance, worker, bike))
            }
        }

        allTriplets.sortWith(compareBy({ it.dist }, { it.worker }, { it.bike }))

        val bikeStatus = BooleanArray(bikes.size)
        val workerStatus = IntArray(workers.size) { -1 }
        var pairCount = 0

        for (triplet in allTriplets) {
            if (workerStatus[triplet.worker] == -1 && !bikeStatus[triplet.bike]) {
                bikeStatus[triplet.bike] = true
                workerStatus[triplet.worker] = triplet.bike
                pairCount++
                if (pairCount == workers.size) {
                    return workerStatus
                }
            }
        }

        return workerStatus
    }
}
```

```swift
class Solution {
    func assignBikes(_ workers: [[Int]], _ bikes: [[Int]]) -> [Int] {
        func findDistance(_ worker: [Int], _ bike: [Int]) -> Int {
            return abs(worker[0] - bike[0]) + abs(worker[1] - bike[1])
        }

        var allTriplets: [(dist: Int, worker: Int, bike: Int)] = []
        for worker in 0..<workers.count {
            for bike in 0..<bikes.count {
                let distance = findDistance(workers[worker], bikes[bike])
                allTriplets.append((distance, worker, bike))
            }
        }

        allTriplets.sort { a, b in
            if a.dist != b.dist { return a.dist < b.dist }
            if a.worker != b.worker { return a.worker < b.worker }
            return a.bike < b.bike
        }

        var bikeStatus = [Bool](repeating: false, count: bikes.count)
        var workerStatus = [Int](repeating: -1, count: workers.count)
        var pairCount = 0

        for triplet in allTriplets {
            if workerStatus[triplet.worker] == -1 && !bikeStatus[triplet.bike] {
                bikeStatus[triplet.bike] = true
                workerStatus[triplet.worker] = triplet.bike
                pairCount += 1
                if pairCount == workers.count {
                    return workerStatus
                }
            }
        }

        return workerStatus
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N M \log (N M))$
- Space complexity: $O(N M)$

>  Where $N$ is the number of workers, and $M$ is the number of bikes.

---

## 2. Bucket Sort

### Intuition
Since Manhattan distances on a 1000x1000 grid are bounded (maximum `1998`), we can use bucket sort instead of comparison-based sorting. By grouping worker-bike pairs by their distance, we can process pairs in distance order without explicit sorting. Within each distance bucket, pairs are naturally ordered by their insertion order (worker index first, then bike index).

### Algorithm
1. Calculate the Manhattan distance between every worker and every bike, storing pairs in a map keyed by distance.
2. Track the minimum distance encountered.
3. Starting from the minimum distance, iterate through distances in increasing order.
4. For each distance, process all worker-bike pairs. If both the worker and bike are available, assign the bike to the worker.
5. Continue until all workers have been assigned. Return the assignment array.

::tabs-start

```python
class Solution:
    def assignBikes(self, workers: List[List[int]], bikes: List[List[int]]) -> List[int]:
        
        def find_distance(worker_loc, bike_loc):
            return abs(worker_loc[0] - bike_loc[0]) + abs(worker_loc[1] - bike_loc[1])
        
        min_dist = float('inf')
        dist_to_pairs = collections.defaultdict(list)
        
        for worker, worker_loc in enumerate(workers):
            for bike, bike_loc in enumerate(bikes):
                distance = find_distance(worker_loc, bike_loc)
                dist_to_pairs[distance].append((worker, bike))
                min_dist = min(min_dist, distance)
                
        curr_dist = min_dist
        # Initialize all values to false, to signify no bikes have been taken
        bike_status = [False] * len(bikes)
        # Initialize all values to -1, to signify no worker has a bike
        worker_status = [-1] * len(workers)
        # Keep track of how many worker-bike pairs have been made
        pair_count = 0
        
        # While all workers have not been assigned a bike
        while pair_count < len(workers):
            for worker, bike in dist_to_pairs[curr_dist]:
                if worker_status[worker] == -1 and not bike_status[bike]:
                    # If both worker and bike are free, assign them to each other
                    bike_status[bike] = True
                    worker_status[worker] = bike
                    pair_count += 1
            curr_dist += 1
        
        return worker_status
```

```java
class Solution {
    // Function to return the Manhattan distance
    int findDistance(int[] worker, int[] bike) {
        return Math.abs(worker[0] - bike[0]) + Math.abs(worker[1] - bike[1]);
    }

    public int[] assignBikes(int[][] workers, int[][] bikes) {
        int minDis = Integer.MAX_VALUE;
        // Stores the list of (worker, bike) pairs corresponding to its distance
        Map<Integer, List<Pair<Integer, Integer>>> disToPairs = new HashMap();
        
        // Add the (worker, bike) pair corresponding to its distance list
        for (int worker = 0; worker < workers.length; worker++) {
            for (int bike = 0; bike < bikes.length; bike++) {
                int distance = findDistance(workers[worker], bikes[bike]);
                
                disToPairs.putIfAbsent(distance, new ArrayList<>());
                
                disToPairs.get(distance).add(new Pair(worker, bike));
                minDis = Math.min(minDis, distance);
            }
        }
        
        int currDis = minDis;
        // Initialize all values to false, to signify no bikes have been taken
        boolean bikeStatus[] = new boolean[bikes.length];

        int workerStatus[] = new int[workers.length];
        // Initialize all index to -1, to mark all the workers available
        Arrays.fill(workerStatus, -1);
        // Keep track of how many worker-bike pairs have been made
        int pairCount = 0;
        
        // Until all workers have not been assigned a bike
        while (pairCount != workers.length) {
             if (!disToPairs.containsKey(currDis)) {
                 currDis++;
                 continue;
             }
            
            for (Pair<Integer, Integer> pair : disToPairs.get(currDis)) {
                int worker = pair.getKey();
                int bike = pair.getValue();

                if (workerStatus[worker] == -1 && !bikeStatus[bike]) {
                    // If both worker and bike are free, assign them to each other
                    bikeStatus[bike] = true;
                    workerStatus[worker] = bike;
                    pairCount++;
                }
            }
            currDis++;
        }
        
        return workerStatus;
    }
}
```

```cpp
class Solution {
public:
    // Function to return the Manhattan distance
    int findDistance(vector<int>& worker, vector<int>& bike) {
        return abs(worker[0] - bike[0]) + abs(worker[1] - bike[1]);
    }
    
    vector<int> assignBikes(vector<vector<int>>& workers, vector<vector<int>>& bikes) {
        int minDis = INT_MAX;
        // Stores the list of (worker, bike) pairs corresponding to its distance
        vector<pair<int, int>> disToPairs[1999];
        
        // Add the (worker, bike) pairs corresponding to their distance list
        for (int worker = 0; worker < workers.size(); worker++) {
            for (int bike = 0; bike < bikes.size(); bike++) {
                int distance = findDistance(workers[worker], bikes[bike]);
                disToPairs[distance].push_back({worker, bike});
                minDis = min(minDis, distance);
            }
        }
        
        int currDis = minDis;
        // Initialize all values to false, to signify no bikes have been taken
        vector<int> bikeStatus(bikes.size(), false);
        // Initialize all index to -1, to signify no worker has a bike
        vector<int> workerStatus(workers.size(), -1);
        // Keep track of how many worker-bike pairs have been made
        int pairCount = 0;
        
        // Until all workers have not been assigned a bike
        while (pairCount != workers.size()) {
            for (auto[worker, bike] : disToPairs[currDis]) {
                if (workerStatus[worker] == -1 && !bikeStatus[bike]) {
                    // If both worker and bike are free, assign them to each other
                    bikeStatus[bike] = true;
                    workerStatus[worker] = bike;
                    pairCount++;
                }
            }
            currDis++;
        }
        
        return workerStatus;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} workers
     * @param {number[][]} bikes
     * @return {number[]}
     */
    assignBikes(workers, bikes) {
        const findDistance = (workerLoc, bikeLoc) => {
            return Math.abs(workerLoc[0] - bikeLoc[0]) + Math.abs(workerLoc[1] - bikeLoc[1]);
        };
        
        let minDist = Infinity;
        const distToPairs = new Map();
        
        // Generate all worker-bike pairs and group by distance
        for (let worker = 0; worker < workers.length; worker++) {
            const workerLoc = workers[worker];
            for (let bike = 0; bike < bikes.length; bike++) {
                const bikeLoc = bikes[bike];
                const distance = findDistance(workerLoc, bikeLoc);
                
                if (!distToPairs.has(distance)) {
                    distToPairs.set(distance, []);
                }
                distToPairs.get(distance).push([worker, bike]);
                minDist = Math.min(minDist, distance);
            }
        }
        
        let currDist = minDist;
        // Initialize all values to false, to signify no bikes have been taken
        const bikeStatus = new Array(bikes.length).fill(false);
        // Initialize all values to -1, to signify no worker has a bike
        const workerStatus = new Array(workers.length).fill(-1);
        // Keep track of how many worker-bike pairs have been made
        let pairCount = 0;
        
        // While all workers have not been assigned a bike
        while (pairCount < workers.length) {
            // Check if there are pairs at current distance
            if (distToPairs.has(currDist)) {
                for (const [worker, bike] of distToPairs.get(currDist)) {
                    if (workerStatus[worker] === -1 && !bikeStatus[bike]) {
                        // If both worker and bike are free, assign them to each other
                        bikeStatus[bike] = true;
                        workerStatus[worker] = bike;
                        pairCount++;
                    }
                }
            }
            currDist++;
        }
        
        return workerStatus;
    }
}
```

```csharp
public class Solution {
    public int[] AssignBikes(int[][] workers, int[][] bikes) {
        int FindDistance(int[] worker, int[] bike) {
            return Math.Abs(worker[0] - bike[0]) + Math.Abs(worker[1] - bike[1]);
        }

        int minDist = int.MaxValue;
        var distToPairs = new Dictionary<int, List<(int worker, int bike)>>();

        for (int worker = 0; worker < workers.Length; worker++) {
            for (int bike = 0; bike < bikes.Length; bike++) {
                int distance = FindDistance(workers[worker], bikes[bike]);
                if (!distToPairs.ContainsKey(distance)) {
                    distToPairs[distance] = new List<(int, int)>();
                }
                distToPairs[distance].Add((worker, bike));
                minDist = Math.Min(minDist, distance);
            }
        }

        int currDist = minDist;
        bool[] bikeStatus = new bool[bikes.Length];
        int[] workerStatus = new int[workers.Length];
        Array.Fill(workerStatus, -1);
        int pairCount = 0;

        while (pairCount < workers.Length) {
            if (distToPairs.ContainsKey(currDist)) {
                foreach (var pair in distToPairs[currDist]) {
                    if (workerStatus[pair.worker] == -1 && !bikeStatus[pair.bike]) {
                        bikeStatus[pair.bike] = true;
                        workerStatus[pair.worker] = pair.bike;
                        pairCount++;
                    }
                }
            }
            currDist++;
        }

        return workerStatus;
    }
}
```

```go
func assignBikes(workers [][]int, bikes [][]int) []int {
    findDistance := func(worker, bike []int) int {
        return abs(worker[0]-bike[0]) + abs(worker[1]-bike[1])
    }

    minDist := 1 << 30
    distToPairs := make(map[int][][2]int)

    for worker := 0; worker < len(workers); worker++ {
        for bike := 0; bike < len(bikes); bike++ {
            distance := findDistance(workers[worker], bikes[bike])
            distToPairs[distance] = append(distToPairs[distance], [2]int{worker, bike})
            if distance < minDist {
                minDist = distance
            }
        }
    }

    currDist := minDist
    bikeStatus := make([]bool, len(bikes))
    workerStatus := make([]int, len(workers))
    for i := range workerStatus {
        workerStatus[i] = -1
    }
    pairCount := 0

    for pairCount < len(workers) {
        if pairs, exists := distToPairs[currDist]; exists {
            for _, pair := range pairs {
                worker, bike := pair[0], pair[1]
                if workerStatus[worker] == -1 && !bikeStatus[bike] {
                    bikeStatus[bike] = true
                    workerStatus[worker] = bike
                    pairCount++
                }
            }
        }
        currDist++
    }

    return workerStatus
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun assignBikes(workers: Array<IntArray>, bikes: Array<IntArray>): IntArray {
        fun findDistance(worker: IntArray, bike: IntArray): Int {
            return kotlin.math.abs(worker[0] - bike[0]) + kotlin.math.abs(worker[1] - bike[1])
        }

        var minDist = Int.MAX_VALUE
        val distToPairs = mutableMapOf<Int, MutableList<Pair<Int, Int>>>()

        for (worker in workers.indices) {
            for (bike in bikes.indices) {
                val distance = findDistance(workers[worker], bikes[bike])
                distToPairs.getOrPut(distance) { mutableListOf() }.add(worker to bike)
                minDist = minOf(minDist, distance)
            }
        }

        var currDist = minDist
        val bikeStatus = BooleanArray(bikes.size)
        val workerStatus = IntArray(workers.size) { -1 }
        var pairCount = 0

        while (pairCount < workers.size) {
            distToPairs[currDist]?.forEach { (worker, bike) ->
                if (workerStatus[worker] == -1 && !bikeStatus[bike]) {
                    bikeStatus[bike] = true
                    workerStatus[worker] = bike
                    pairCount++
                }
            }
            currDist++
        }

        return workerStatus
    }
}
```

```swift
class Solution {
    func assignBikes(_ workers: [[Int]], _ bikes: [[Int]]) -> [Int] {
        func findDistance(_ worker: [Int], _ bike: [Int]) -> Int {
            return abs(worker[0] - bike[0]) + abs(worker[1] - bike[1])
        }

        var minDist = Int.max
        var distToPairs = [Int: [(worker: Int, bike: Int)]]()

        for worker in 0..<workers.count {
            for bike in 0..<bikes.count {
                let distance = findDistance(workers[worker], bikes[bike])
                distToPairs[distance, default: []].append((worker, bike))
                minDist = min(minDist, distance)
            }
        }

        var currDist = minDist
        var bikeStatus = [Bool](repeating: false, count: bikes.count)
        var workerStatus = [Int](repeating: -1, count: workers.count)
        var pairCount = 0

        while pairCount < workers.count {
            if let pairs = distToPairs[currDist] {
                for pair in pairs {
                    if workerStatus[pair.worker] == -1 && !bikeStatus[pair.bike] {
                        bikeStatus[pair.bike] = true
                        workerStatus[pair.worker] = pair.bike
                        pairCount += 1
                    }
                }
            }
            currDist += 1
        }

        return workerStatus
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N M + K)$
- Space complexity: $O(N M + K)$

>  Where $N$ is the number of workers, $M$ is the number of bikes, and $K$ is the maximum possible Manhattan distance of a worker/bike pair. In this problem, $K$ equals $1998$.

---

## 3. Priority Queue

### Intuition
Instead of storing all worker-bike pairs upfront, we can use a priority queue that only tracks the current best option for each worker. When a bike is taken, we add the next best option for that worker to the queue. This reduces memory usage since we only need the closest available bike for each unassigned worker at any time.

### Algorithm
1. For each worker, sort their bike options by distance (and bike index as tiebreaker) in descending order, so we can pop the closest one efficiently.
2. Add each worker's closest bike to a min-heap sorted by (distance, worker index, bike index).
3. Pop the smallest element from the heap. If the bike is available, assign it to the worker.
4. If the bike was taken, push the worker's next closest bike option onto the heap.
5. Continue until all workers are assigned. Return the assignment array.

::tabs-start

```python
class Solution:
    def assignBikes(self, workers: List[List[int]], bikes: List[List[int]]) -> List[int]:
        
        def find_distance(worker_loc, bike_loc):
            return abs(worker_loc[0] - bike_loc[0]) + abs(worker_loc[1] - bike_loc[1])
        
        # List of triplets (distance, worker index, bike index) for each worker-bike combination
        worker_to_bike_list = []
        pq = []
        
        for worker, worker_loc in enumerate(workers):
            curr_worker_pairs = []
            for bike, bike_loc in enumerate(bikes):
                distance = find_distance(worker_loc, bike_loc)
                curr_worker_pairs.append((distance, worker, bike))
            
            # Sort the worker_to_bike_list for the current worker in reverse order
            curr_worker_pairs.sort(reverse=True)
            # Add the closest bike for this worker to the priority queue
            heapq.heappush(pq, curr_worker_pairs.pop())
            # Store the remaining options for the current worker in worker_to_bike_list
            worker_to_bike_list.append(curr_worker_pairs)
            
        # Initialize all values to false, to signify no bikes have been taken
        bike_status = [False] * len(bikes)
        # Initialize all values to -1, to signify no worker has a bike
        worker_status = [-1] * len(workers)
        
        while pq:
            # Pop the worker-bike pair with smallest distance
            distance, worker, bike = heapq.heappop(pq)
            
            if not bike_status[bike]:
                # If the bike is free, assign the bike to the worker
                bike_status[bike] = True
                worker_status[worker] = bike
            else:
                # Otherwise, add the next closest bike for the current worker to the priority queue
                next_closest_bike = worker_to_bike_list[worker].pop()
                heapq.heappush(pq, next_closest_bike)
        
        return worker_status
```

```java
class Solution {
    // List of pairs (distance, bike index) for each bike corresponding to worker
    List<List<Pair<Integer, Integer>>> workerToBikeList = new ArrayList<>();
    // Stores the closest bike index, corresponding to the worker index
    int closestBikeIndex[] = new int[1001];
    
    // Class to store (worker, bike, distance)
    class WorkerBikePair {
        int workerIndex;
        int bikeIndex;
        int distance;   
        
        // Constructor to initialize the member variables
        WorkerBikePair(int workerIndex, int bikeIndex, int distance) {
            this.workerIndex = workerIndex;
            this.bikeIndex = bikeIndex;
            this.distance = distance;
        }
    }
    
    // Custom comparator for comparing WorkerBikePair in priority queue
    Comparator<WorkerBikePair> WorkerBikePairComparator 
        = new Comparator<WorkerBikePair>() {
        @Override
        public int compare(WorkerBikePair a, WorkerBikePair b) {
            if (a.distance != b.distance) {
                // Prioritize the one having smaller distance
                return a.distance - b.distance;
            } else if (a.workerIndex != b.workerIndex) {
                // Prioritize according to the worker index
                return a.workerIndex - b.workerIndex;
            } else {
                // Prioritize according to the bike index
                return a.bikeIndex - b.bikeIndex;
            }
        }
    };

    // Function to return the Manhattan distance
    int findDistance(int[] worker, int[] bike) {
        return Math.abs(worker[0] - bike[0]) + Math.abs(worker[1] - bike[1]);
    }
    
    // Add the closest bike for the worker to the priority queue, 
    // And update the closest bike index
    void addClosestBikeToPq(PriorityQueue<WorkerBikePair> pq, int worker) {
        Pair<Integer, Integer> closestBike = workerToBikeList.get(worker)
            .get(closestBikeIndex[worker]);
        closestBikeIndex[worker]++;
        
        WorkerBikePair workerBikePair 
            = new WorkerBikePair(worker, closestBike.getValue(), closestBike.getKey());
        pq.add(workerBikePair);
    }
    
    public int[] assignBikes(int[][] workers, int[][] bikes) {
        PriorityQueue<WorkerBikePair> pq = new PriorityQueue<>(WorkerBikePairComparator);
        
        // Add all the bikes along with their distances from the worker
        for (int worker = 0; worker < workers.length; worker++) {
            List<Pair<Integer, Integer>> bikeList = new ArrayList<>();
            for (int bike = 0; bike < bikes.length; bike++) {
                int distance = findDistance(workers[worker], bikes[bike]);
                bikeList.add(new Pair(distance, bike));
            }
            Collections.sort(bikeList, Comparator.comparing(Pair::getKey));
            
            // Store all the bike options for the current worker in workerToBikeList
            workerToBikeList.add(bikeList);
            
             // First bike is the closest bike for each worker
            closestBikeIndex[worker] = 0;
            
            // For each worker, add their closest bike to the priority queue
            addClosestBikeToPq(pq, worker);    
        }
        
        // Initialize all values to false, to signify no bikes have been taken
        boolean bikeStatus[] = new boolean[bikes.length];
        
        // Initialize all index to -1, to mark all the workers available
        int workerStatus[] = new int[workers.length];
        Arrays.fill(workerStatus, -1);
        
        // Until all workers have not been assigned a bike
        while (!pq.isEmpty()) {
            // Pop the pair with smallest distance
            WorkerBikePair workerBikePair = pq.remove();
            
            int worker = workerBikePair.workerIndex;
            int bike = workerBikePair.bikeIndex;
            
            if (workerStatus[worker] == -1 && !bikeStatus[bike]) {
                // If both worker and bike are free, assign them to each other
                bikeStatus[bike] = true;
                workerStatus[worker] = bike;
                
            } else {
                // Add the next closest bike for the current worker
                addClosestBikeToPq(pq, worker);
            }
        }
    
        return workerStatus;
    }
}
```

```cpp
class Solution {
public:
    // Function to return the Manhattan distance
    int distance(vector<int>& worker_loc, vector<int>& bike_loc) {
        return abs(worker_loc[0] - bike_loc[0]) + abs(worker_loc[1] - bike_loc[1]);
    }
    
    vector<int> assignBikes(vector<vector<int>>& workers, vector<vector<int>>& bikes) {
        // List of triplets (distance, worker, bike) for each bike corresponding to worker
        vector<vector<tuple<int, int, int>>> workerToBikeList;
        
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, 
                       greater<tuple<int, int, int>>> pq;
        
        for (int worker = 0; worker < workers.size(); worker++) {
            // Add all the bikes with their distances from the current worker
            vector<tuple<int, int, int>> currWorkerPairs;
            for (int bike = 0; bike < bikes.size(); bike++) {
                int dist = distance(workers[worker], bikes[bike]);
                currWorkerPairs.push_back({dist, worker, bike});
            }
            
            // Sort the workerToBikeList for the current worker in reverse order.
            sort(currWorkerPairs.begin(), currWorkerPairs.end(), greater<tuple<int, int, int>>());

            // For each worker, add their closest bike to the priority queue
            pq.push(currWorkerPairs.back());
            // Second last bike is now the closest bike for this worker
            currWorkerPairs.pop_back();
            
            // Store the remaining options for the current worker in workerToBikeList
            workerToBikeList.push_back(currWorkerPairs);
        }
        
        // Initialize all values to false, to signify no bikes have been taken
        vector<int> bikeStatus(bikes.size(), false);
        // Initialize all index to -1, to signify no worker has a bike
        vector<int> workerStatus(workers.size(), -1);
        
        while (!pq.empty()) {
            // Pop the pair with smallest distance
            auto[dist, worker, bike] = pq.top();
            pq.pop();
            bike = bike;
            worker = worker;
            
            if (!bikeStatus[bike]) {
                // If the bike is free, assign the bike to the worker
                bikeStatus[bike] = true;
                workerStatus[worker] = bike;
            } else {
                // Otherwise, add the next closest bike for the current worker
                pq.push(workerToBikeList[worker].back());
                workerToBikeList[worker].pop_back();
            }
        }
        
        return workerStatus;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} workers
     * @param {number[][]} bikes
     * @return {number[]}
     */
    assignBikes(workers, bikes) {
        const findDistance = (workerLoc, bikeLoc) => {
            return Math.abs(workerLoc[0] - bikeLoc[0]) + Math.abs(workerLoc[1] - bikeLoc[1]);
        };

        const workerToBikeList = [];
        const pq = new MinPriorityQueue({
            compare: (a, b) => {
                if (a[0] !== b[0]) return a[0] - b[0];
                if (a[1] !== b[1]) return a[1] - b[1];
                return a[2] - b[2];
            }
        });

        for (let worker = 0; worker < workers.length; worker++) {
            const currWorkerPairs = [];
            for (let bike = 0; bike < bikes.length; bike++) {
                const distance = findDistance(workers[worker], bikes[bike]);
                currWorkerPairs.push([distance, worker, bike]);
            }
            currWorkerPairs.sort((a, b) => {
                if (a[0] !== b[0]) return b[0] - a[0];
                if (a[1] !== b[1]) return b[1] - a[1];
                return b[2] - a[2];
            });
            pq.enqueue(currWorkerPairs.pop());
            workerToBikeList.push(currWorkerPairs);
        }

        const bikeStatus = new Array(bikes.length).fill(false);
        const workerStatus = new Array(workers.length).fill(-1);

        while (!pq.isEmpty()) {
            const [distance, worker, bike] = pq.dequeue();

            if (!bikeStatus[bike]) {
                bikeStatus[bike] = true;
                workerStatus[worker] = bike;
            } else {
                const nextClosestBike = workerToBikeList[worker].pop();
                pq.enqueue(nextClosestBike);
            }
        }

        return workerStatus;
    }
}
```

```csharp
public class Solution {
    public int[] AssignBikes(int[][] workers, int[][] bikes) {
        int FindDistance(int[] worker, int[] bike) {
            return Math.Abs(worker[0] - bike[0]) + Math.Abs(worker[1] - bike[1]);
        }

        var workerToBikeList = new List<List<(int dist, int worker, int bike)>>();
        var pq = new PriorityQueue<(int dist, int worker, int bike), (int, int, int)>();

        for (int worker = 0; worker < workers.Length; worker++) {
            var currWorkerPairs = new List<(int, int, int)>();
            for (int bike = 0; bike < bikes.Length; bike++) {
                int distance = FindDistance(workers[worker], bikes[bike]);
                currWorkerPairs.Add((distance, worker, bike));
            }
            currWorkerPairs.Sort((a, b) => {
                if (a.Item1 != b.Item1) return b.Item1.CompareTo(a.Item1);
                if (a.Item2 != b.Item2) return b.Item2.CompareTo(a.Item2);
                return b.Item3.CompareTo(a.Item3);
            });
            var closest = currWorkerPairs[currWorkerPairs.Count - 1];
            currWorkerPairs.RemoveAt(currWorkerPairs.Count - 1);
            pq.Enqueue(closest, closest);
            workerToBikeList.Add(currWorkerPairs);
        }

        bool[] bikeStatus = new bool[bikes.Length];
        int[] workerStatus = new int[workers.Length];
        Array.Fill(workerStatus, -1);

        while (pq.Count > 0) {
            var (dist, worker, bike) = pq.Dequeue();

            if (!bikeStatus[bike]) {
                bikeStatus[bike] = true;
                workerStatus[worker] = bike;
            } else {
                var list = workerToBikeList[worker];
                var nextClosest = list[list.Count - 1];
                list.RemoveAt(list.Count - 1);
                pq.Enqueue(nextClosest, nextClosest);
            }
        }

        return workerStatus;
    }
}
```

```go
func assignBikes(workers [][]int, bikes [][]int) []int {
    findDistance := func(worker, bike []int) int {
        return abs(worker[0]-bike[0]) + abs(worker[1]-bike[1])
    }

    type triplet struct {
        dist, worker, bike int
    }

    workerToBikeList := make([][]triplet, len(workers))
    pq := &minHeap{}
    heap.Init(pq)

    for worker := 0; worker < len(workers); worker++ {
        var currWorkerPairs []triplet
        for bike := 0; bike < len(bikes); bike++ {
            distance := findDistance(workers[worker], bikes[bike])
            currWorkerPairs = append(currWorkerPairs, triplet{distance, worker, bike})
        }
        sort.Slice(currWorkerPairs, func(i, j int) bool {
            if currWorkerPairs[i].dist != currWorkerPairs[j].dist {
                return currWorkerPairs[i].dist > currWorkerPairs[j].dist
            }
            if currWorkerPairs[i].worker != currWorkerPairs[j].worker {
                return currWorkerPairs[i].worker > currWorkerPairs[j].worker
            }
            return currWorkerPairs[i].bike > currWorkerPairs[j].bike
        })
        heap.Push(pq, currWorkerPairs[len(currWorkerPairs)-1])
        workerToBikeList[worker] = currWorkerPairs[:len(currWorkerPairs)-1]
    }

    bikeStatus := make([]bool, len(bikes))
    workerStatus := make([]int, len(workers))
    for i := range workerStatus {
        workerStatus[i] = -1
    }

    for pq.Len() > 0 {
        t := heap.Pop(pq).(triplet)

        if !bikeStatus[t.bike] {
            bikeStatus[t.bike] = true
            workerStatus[t.worker] = t.bike
        } else {
            list := workerToBikeList[t.worker]
            nextClosest := list[len(list)-1]
            workerToBikeList[t.worker] = list[:len(list)-1]
            heap.Push(pq, nextClosest)
        }
    }

    return workerStatus
}

type minHeap []struct{ dist, worker, bike int }

func (h minHeap) Len() int { return len(h) }
func (h minHeap) Less(i, j int) bool {
    if h[i].dist != h[j].dist {
        return h[i].dist < h[j].dist
    }
    if h[i].worker != h[j].worker {
        return h[i].worker < h[j].worker
    }
    return h[i].bike < h[j].bike
}
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.(struct{ dist, worker, bike int })) }
func (h *minHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun assignBikes(workers: Array<IntArray>, bikes: Array<IntArray>): IntArray {
        fun findDistance(worker: IntArray, bike: IntArray): Int {
            return kotlin.math.abs(worker[0] - bike[0]) + kotlin.math.abs(worker[1] - bike[1])
        }

        data class Triplet(val dist: Int, val worker: Int, val bike: Int)

        val workerToBikeList = mutableListOf<MutableList<Triplet>>()
        val pq = PriorityQueue<Triplet>(compareBy({ it.dist }, { it.worker }, { it.bike }))

        for (worker in workers.indices) {
            val currWorkerPairs = mutableListOf<Triplet>()
            for (bike in bikes.indices) {
                val distance = findDistance(workers[worker], bikes[bike])
                currWorkerPairs.add(Triplet(distance, worker, bike))
            }
            currWorkerPairs.sortWith(compareByDescending<Triplet> { it.dist }
                .thenByDescending { it.worker }
                .thenByDescending { it.bike })
            pq.add(currWorkerPairs.removeLast())
            workerToBikeList.add(currWorkerPairs)
        }

        val bikeStatus = BooleanArray(bikes.size)
        val workerStatus = IntArray(workers.size) { -1 }

        while (pq.isNotEmpty()) {
            val (dist, worker, bike) = pq.poll()

            if (!bikeStatus[bike]) {
                bikeStatus[bike] = true
                workerStatus[worker] = bike
            } else {
                val nextClosestBike = workerToBikeList[worker].removeLast()
                pq.add(nextClosestBike)
            }
        }

        return workerStatus
    }
}
```

```swift
class Solution {
    func assignBikes(_ workers: [[Int]], _ bikes: [[Int]]) -> [Int] {
        func findDistance(_ worker: [Int], _ bike: [Int]) -> Int {
            return abs(worker[0] - bike[0]) + abs(worker[1] - bike[1])
        }

        var workerToBikeList = [[(dist: Int, worker: Int, bike: Int)]]()
        var pq = [(dist: Int, worker: Int, bike: Int)]()

        for worker in 0..<workers.count {
            var currWorkerPairs = [(dist: Int, worker: Int, bike: Int)]()
            for bike in 0..<bikes.count {
                let distance = findDistance(workers[worker], bikes[bike])
                currWorkerPairs.append((distance, worker, bike))
            }
            currWorkerPairs.sort { a, b in
                if a.dist != b.dist { return a.dist > b.dist }
                if a.worker != b.worker { return a.worker > b.worker }
                return a.bike > b.bike
            }
            pq.append(currWorkerPairs.removeLast())
            workerToBikeList.append(currWorkerPairs)
        }

        var bikeStatus = [Bool](repeating: false, count: bikes.count)
        var workerStatus = [Int](repeating: -1, count: workers.count)

        while !pq.isEmpty {
            pq.sort { a, b in
                if a.dist != b.dist { return a.dist < b.dist }
                if a.worker != b.worker { return a.worker < b.worker }
                return a.bike < b.bike
            }
            let t = pq.removeFirst()

            if !bikeStatus[t.bike] {
                bikeStatus[t.bike] = true
                workerStatus[t.worker] = t.bike
            } else {
                let nextClosestBike = workerToBikeList[t.worker].removeLast()
                pq.append(nextClosestBike)
            }
        }

        return workerStatus
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N M \log M)$
- Space complexity: $O(N M)$

>  Where $N$ is the number of workers, and $M$ is the number of bikes.

---

## Common Pitfalls

### Incorrect Tie-Breaking Order
The problem requires breaking ties by worker index first, then bike index. Sorting by (distance, bike, worker) instead of (distance, worker, bike) produces wrong assignments.

```python
# Wrong: bike index takes priority over worker index
all_triplets.sort(key=lambda x: (x[0], x[2], x[1]))
```

### Using Euclidean Distance Instead of Manhattan Distance
The problem specifically asks for Manhattan distance. Using Euclidean distance will give incorrect results.

```python
# Wrong: Euclidean distance
distance = math.sqrt((w[0] - b[0])**2 + (w[1] - b[1])**2)
```

### Not Tracking Both Worker and Bike Availability
When a worker-bike pair is assigned, both must be marked as taken. Forgetting to check either condition leads to double assignments.
