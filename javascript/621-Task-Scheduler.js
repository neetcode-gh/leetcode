/**
 * https://leetcode.com/problems/task-scheduler/
 * Time O(N * log(N)) | Space O(N)
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
  const frequencyMap = getFrequencyMap(tasks)
  const maxHeap = getMaxHeap(frequencyMap)

  return getMinimumCpuIntervals(maxHeap, n)
}

var getFrequencyMap = (tasks, frequencyMap = new Array(26).fill(0)) => {
    for (const task of tasks) {
        const index = task.charCodeAt(0) - 'A'.charCodeAt(0);

        frequencyMap[index]++;
    }

    return frequencyMap;
}

const getMaxHeap = (frequencyMap, maxHeap = new MaxPriorityQueue()) => {
    for (const frequency of frequencyMap) {
        const hasFrequency = 0 < frequency;
        if (hasFrequency) maxHeap.enqueue(frequency)
    }

    return maxHeap
}

const getMinimumCpuIntervals = (maxHeap, n, cpuIntervals = [ 0 ]) => {
    while (!maxHeap.isEmpty()) {
        const { iterations, coolingPeriodQueue } = execute(n, maxHeap, cpuIntervals)

        reQueueCoolingPeriod(coolingPeriodQueue, maxHeap)

        if (!maxHeap.isEmpty()) cpuIntervals[0] += iterations
    }

    return cpuIntervals[0]
}

const execute = (n, maxHeap, cpuIntervals, iterations = (n + 1), coolingPeriodQueue = new Queue()) => {
    while ((0 < iterations) && !maxHeap.isEmpty()) {
        const frequency = maxHeap.dequeue().element;

        const hasFrequency = 0 < (frequency - 1);
        if (hasFrequency) coolingPeriodQueue.enqueue(frequency - 1);

        cpuIntervals[0]++;
        iterations--;
    }

    return { iterations, coolingPeriodQueue };
}

const reQueueCoolingPeriod = (coolingPeriodQueue, maxHeap) => {
    while (!coolingPeriodQueue.isEmpty()) {
        maxHeap.enqueue(coolingPeriodQueue.dequeue())
    }
}

/**
 * https://leetcode.com/problems/task-scheduler/
 * Time O(N) | Space O(1)
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
 var leastInterval = function(tasks, n) {
    const frequencyMap = getFrequencyMap(tasks);
    const maxFrequency = getMaxFrequency(frequencyMap);
    const mostFrequentTask = getMostFrequentTask(frequencyMap, maxFrequency);
    const interval = ((maxFrequency - 1) * (n + 1)) + mostFrequentTask;

    return Math.max(tasks.length, interval);
}

var getFrequencyMap = (tasks, frequencyMap = new Array(26).fill(0)) => {
    for (const task of tasks) {
        const index = task.charCodeAt(0) - 'A'.charCodeAt(0);

        frequencyMap[index]++;
    }

    return frequencyMap;
}

const getMaxFrequency = (frequencyMap, maxFrequency = 0) => {
    for (const frequency of frequencyMap) {
        maxFrequency = Math.max(maxFrequency, frequency);
    }

    return maxFrequency;
}

const getMostFrequentTask = (frequencyMap, maxFrequency, mostFrequentTask = 0) => {
    for (const frequency of frequencyMap) {
        const isSame = frequency === maxFrequency;
        if (isSame) mostFrequentTask++;
    }

    return mostFrequentTask;
}
