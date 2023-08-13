int cmpfunc(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

bool isNStraightHand(int* hand, int handSize, int groupSize) {
    if (handSize % groupSize != 0) return false;

    qsort(hand, handSize, sizeof(int), cmpfunc);

    for (int i = 0; i < handSize; i++) {
        if (hand[i] == -1) continue;
        int k = i;
        for (int j = 1; j < groupSize; j++) {
            while (k < handSize && hand[i] + j != hand[k]) k++;
            if (k == handSize) return false;
            hand[k] = -1;
        }
    }

    return true;
}
