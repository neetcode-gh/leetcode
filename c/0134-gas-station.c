int canCompleteCircuit(int* gas, int gasSize, int* cost, int costSize){
    // Find the totalGas and totalCost
    int totalGas = 0;
    int totalCost = 0;
    for (int i = 0; i < gasSize; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
    }
    
    // If totalCost is more than totalGas, it is not possible to complete circuit
    if (totalGas < totalCost) {
        return -1;
    }
    
    int total = 0;
    int result = 0;
    for (int i = 0; i < gasSize; i++) {
        total += gas[i] - cost[i];
        if (total < 0) {
            total = 0;
            result = i + 1;
        }
    }
    return result;
}