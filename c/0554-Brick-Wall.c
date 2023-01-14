#define max(x, y) ((x) > (y) ? (x) : (y))

typedef struct hash_entry {
    int position;            /* we'll use this field as the key */
    int gapCount;
    UT_hash_handle hh;      /* makes this structure hashable */
} hash_entry;

int leastBricks(int** wall, int wallSize, int* wallColSize){
    hash_entry* wallGapCountMap = NULL;
    
    for(int r = 0; r < wallSize; r++)
    {
        int position = 0;
        for(int b = 0; b < *(wallColSize + r) - 1; b++)
        {
            position += wall[r][b];
            
            hash_entry* retrievedMapEntry;
            HASH_FIND_INT(wallGapCountMap, &position, retrievedMapEntry);

            // If the position already exists in the map then increment its gap count
            if(retrievedMapEntry)
            {
                retrievedMapEntry->gapCount += 1;
            }
            else
            {
                // If the position doesn't exist in the map then create a new map entry for it and add it to the map
                hash_entry* mapEntryToAdd = (hash_entry*)malloc(sizeof(hash_entry)); 
                mapEntryToAdd->position = position;
                mapEntryToAdd->gapCount = 1; 
                HASH_ADD_INT(wallGapCountMap, position, mapEntryToAdd);
            }
        }
    }

    int maxGap = 0;
    for (hash_entry* retrievedMapEntry = wallGapCountMap; retrievedMapEntry != NULL; retrievedMapEntry = retrievedMapEntry->hh.next)
    {
        maxGap = max(maxGap, retrievedMapEntry->gapCount);
    }
    
    return wallSize - maxGap;
}
