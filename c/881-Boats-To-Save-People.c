/*

Space: O(n) (because of quicksort)
Time: O(nlog(n)) (because of quicksort)
*/

int cmp(const void* a, const void* b) { // Function of comparison for quicksort
    return *(int*)a - *(int*)b;
}

int numRescueBoats(int* people, int peopleSize, int limit){
    int cpt=0;
    qsort(people, peopleSize, sizeof(int), cmp);
    int i=0;
    int j=peopleSize-1;
    while (people[i]+people[j] > limit && j>0)
        j--;
    cpt += peopleSize-j-1;
    while (i<j) {
        if (people[i]+people[j]<=limit){ // Boat for 2 people
            i++;
            j--;
            cpt++;
        } else { // Boat for 1 person
            cpt++;
            j--;
        }
    }
    if (i==j) // Boat for 1 person
        cpt++;
    return cpt;
}
