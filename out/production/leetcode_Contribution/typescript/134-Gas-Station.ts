function canCompleteCircuit(gas: number[], cost: number[]): number {
    let res = 0;
    let netDistance = 0;

    // Checks if there is enough gas to complete a cycle
    if (gas.reduce((a, b) => a + b) - cost.reduce((a, b) => a + b) < 0) {
        return -1;
    }

    // finds positive netDistance to check if cycle can be completed
    for (let i = 0; i < gas.length; i++) {
        netDistance += gas[i] - cost[i];

        // resets net Distance and gets gas starting gas station
        if (netDistance < 0) {
            netDistance = 0;
            res = i + 1;
        }
    }
    return res;
}
