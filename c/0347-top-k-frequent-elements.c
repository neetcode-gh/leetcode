// A structure to represent an element of the heap.
typedef struct {
    int num;
    int count;
} Heap;

static int compareHeap(const void* x, const void* y) {
  return ((Heap*)y)->count - ((Heap*)x)->count;
}

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* topKFrequent(int* nums, int numsSize, int k, int* returnSize){
    int hash[20001] = {0};
    Heap* heap;
    int *res;
    int i, j;
    int c = 0;

    for (i = 0; i < numsSize; i++) {
        hash[nums[i]+10000]++;
        if (hash[nums[i]+10000]) {
            c++;
        }
    }

    heap = (Heap*)malloc(sizeof(Heap) * c);
    memset(heap, 0, sizeof(Heap) * c);

    c = 0;
    for (i = 0; i < 20001; i++) {
        if(hash[i] > 0) {
            heap[c].num = i - 10000;
            heap[c].count = hash[i];
            c++;
        }
    }
    qsort(heap, c, sizeof(Heap), compareHeap);

    c = 0;
    res = (int*)malloc(sizeof(int) * k);
    for (i = 0; i < k; i++) {
        res[c++] = heap[i].num;
    }

    *returnSize = c; 
    return res;
}
