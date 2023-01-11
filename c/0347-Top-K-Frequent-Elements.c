#define ALLOCATION_SIZE 100  // Allocation size of the numsArrLen in frequencyArrItem

typedef struct hash_entry {
    int num;            /* we'll use this field as the key */
    int count;
    UT_hash_handle hh; /* makes this structure hashable */
}hash_entry;

typedef struct frequencyArrItem
{
    int* numsArr;
    int numsArrLen;
    int index;  // Points to the first empty space in numsArr
}frequencyArrItem;

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* topKFrequent(int* nums, int numsSize, int k, int* returnSize){
    int* result = (int*)malloc(k * sizeof(int));
    *returnSize = k;
    int resultIndex = 0; // Points to the first empty space in result
    hash_entry* NumFreqMap = NULL;
    frequencyArrItem frequencyArr[numsSize + 1]; // Index is the count/frequency and the element is an array of numbers with this frequency
    memset(frequencyArr, 0, (numsSize + 1) * sizeof(frequencyArrItem)); // Initialize with NULL and zeros

    for(int i = 0; i < numsSize; i++)
    {
        hash_entry* retrievedMapEntry;
        HASH_FIND_INT(NumFreqMap, &nums[i], retrievedMapEntry);

        // If the number already exists in the map then increment its count
        if(retrievedMapEntry)
        {
            retrievedMapEntry->count += 1;
        }
        else
        {
            // If the number doesn't exist in the map then create a new map entry for it and add it to the map
            hash_entry* mapEntryToAdd = (hash_entry*)malloc(sizeof(hash_entry)); 
            mapEntryToAdd->num = nums[i];
            mapEntryToAdd->count = 1; 
            HASH_ADD_INT(NumFreqMap, num, mapEntryToAdd);
        }
    }
    
    // Loop over all the entries in the hash map
    for (hash_entry* mapEntry = NumFreqMap; mapEntry != NULL; mapEntry = mapEntry->hh.next) {
        frequencyArrItem* freq = frequencyArr + mapEntry->count;

        // If the nums list for this frequency has not been created yet
        if(freq->numsArrLen == 0)
        {
            freq->numsArrLen = ALLOCATION_SIZE;
            freq->numsArr = (int*)malloc(freq->numsArrLen * sizeof(int));
        }
        // If the nums list exceeded the current allocated size, then reallocate
        else if(freq->index == freq->numsArrLen)
        {
            freq->numsArrLen += ALLOCATION_SIZE;
            freq->numsArr = (int*)realloc(freq->numsArr, freq->numsArrLen * sizeof(int));
        }

        freq->numsArr[freq->index++] = mapEntry->num; 
    }

    // Loop over the frequencies starting from the highest frequency
    for(int i = numsSize; i >= 1; i--) // Note that we are looping until i == 1, as at index 0 it is just empty
    {
        frequencyArrItem* freq = frequencyArr + i;
        // If there is nums that exist at this particular frequency
        for(int j = 0; j < freq->index; j++)
        {
            // If we have added all the elements we need to the result
            if(k-- == 0)
            {
                return result;
            }

            // Add the num to the result then increment the index
            result[resultIndex++] = freq->numsArr[j];
        }
    }

    return result;
}
