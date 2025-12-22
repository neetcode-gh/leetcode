## 1. Sorting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N M \log (N M))$
- Space complexity: $O(N M)$

>  Where $N$ is the number of workers, and $M$ is the number of bikes.

---

## 2. Bucket Sort

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N M + K)$
- Space complexity: $O(N M + K)$

>  Where $N$ is the number of workers, $M$ is the number of bikes, and $K$ is the maximum possible Manhattan distance of a worker/bike pair. In this problem, $K$ equals $1998$.

---

## 3. Priority Queue

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N M \log M)$
- Space complexity: $O(N M)$

>  Where $N$ is the number of workers, and $M$ is the number of bikes.
