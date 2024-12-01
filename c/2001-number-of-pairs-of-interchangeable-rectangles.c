typedef struct hash_entry {
    double* ratio;            /* we'll use this field as the key */
    long long count;
    UT_hash_handle hh;      /* makes this structure hashable */
} hash_entry;

long long interchangeableRectangles(int** rectangles, int rectanglesSize, int* rectanglesColSize){
    hash_entry* ratioCountMap = NULL;
    long long res = 0;

    for(size_t i = 0; i < rectanglesSize; i++)
    {
        // Calculate the ratio (W / H)
        double* ratio = (double*)malloc(sizeof(double));
        *ratio = (double)rectangles[i][0] / rectangles[i][1];

        hash_entry* retrievedMapEntry;
        HASH_FIND_PTR(ratioCountMap, ratio, retrievedMapEntry);

        // If the ratio already exists in the map then increment its count
        if(retrievedMapEntry)
        {
            // Free the allocated memory for the ratio
            free(ratio);
            retrievedMapEntry->count += 1;
        }
        else
        {
            // If the ratio doesn't exist in the map then create a new map entry for it and add it to the map
            hash_entry* mapEntryToAdd = (hash_entry*)malloc(sizeof(hash_entry)); 
            mapEntryToAdd->ratio = ratio;
            mapEntryToAdd->count = 1; 
            HASH_ADD_KEYPTR(hh, ratioCountMap, mapEntryToAdd->ratio, sizeof(double), mapEntryToAdd);
        }
    }

    for (hash_entry* retrievedMapEntry = ratioCountMap; retrievedMapEntry != NULL; retrievedMapEntry = retrievedMapEntry->hh.next)
    {
        res += (retrievedMapEntry->count * (retrievedMapEntry->count - 1)) / 2;
    }

    return res;
}
