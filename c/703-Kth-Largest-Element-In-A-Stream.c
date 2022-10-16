
struct heap {
    int* array;
    int len;
    int max_len;    
    bool (*append)(struct heap* self, int val);
    int (*pop)(struct heap* self);
};

bool heap_insert(struct heap*, int);
int heap_pop(struct heap*);

struct heap* Heap(int max_len) {
    int* array = (int *)malloc(max_len * sizeof(int));
    struct heap* heap = (struct heap*)malloc(sizeof(struct heap));
    heap -> array = array;
    heap -> max_len = max_len;
    heap -> len = 0;
    heap -> append = heap_insert;
    heap -> pop = heap_pop;
    return heap;
}

int heap_parent(int index) {
    return (index - 1) / 2;
}

int heap_left(int index) {
    return 2 * index + 1;
}

int heap_right(int index) {
    return 2 * index + 2;
}

void heap_swap(struct heap* heap, int parent, int index) {
    int temp = heap -> array[index];
    heap -> array[index] = heap -> array[parent];
    heap -> array[parent] = temp;
}

void heap_heapify(struct heap* heap, int index) {
    if (index != 0) {
        int parent = heap_parent(index);
        if (heap -> array[parent] > heap -> array[index]) {
            heap_swap(heap, parent, index);
            heap_heapify(heap, parent);            
        }
    }
}

bool heap_insert(struct heap* heap, int val) {

    if (heap -> len == heap -> max_len) {
        return false;
    }
    heap -> array[heap -> len] = val;
    heap_heapify(heap, heap -> len);
    heap -> len += 1;
    return true;
}

bool heap_has_left(struct heap* heap,int index) {
    return heap_left(index) < heap -> len;
}

bool heap_has_right(struct heap* heap, int index) {
    return heap_right(index) < heap -> len;
}

void heap_heapify_reverse(struct heap* heap, int index) {
    
    int left = heap_left(index);
    int right = heap_right(index);
    int minimum = index;
    if (heap_has_left(heap, index) && (heap -> array[left] < heap -> array[minimum])) {
        minimum = left;
    }
    if (heap_has_right(heap, index) && (heap -> array[right] < heap -> array[minimum])) {
        minimum = right;
    }
    if (minimum != index) {
        heap_swap(heap, index, minimum);
        heap_heapify_reverse(heap, minimum);
    }
}

int heap_pop(struct heap* heap) {
    if (heap -> len == 0) {
        return NULL;
    }   
    int val = heap -> array[0];
    heap -> len -= 1;
    heap -> array[0] = heap -> array[heap -> len];
    if (heap -> len > 1) {
        heap_heapify_reverse(heap, 0);
    }
    return val;
}

void heap_free(struct heap* heap) {
    free(heap -> array);
    free(heap);
}

typedef struct {
    struct heap* heap;
    int k;
} KthLargest;


KthLargest* kthLargestCreate(int k, int* nums, int numsSize) {
    
    KthLargest* self = malloc(sizeof(KthLargest));
    self -> heap = Heap(numsSize + 2);
    self -> k = k;
    for (int i = 0; i < numsSize; i++) {
        self -> heap -> append(self -> heap, nums[i]);
    }
    while (self -> heap -> len > k) {
        self -> heap -> pop(self -> heap);
    }
    return self;
}

int kthLargestAdd(KthLargest* obj, int val) {
    obj -> heap -> append(obj -> heap, val);
    if (obj -> heap -> len > obj -> k) {
        obj -> heap -> pop(obj -> heap);   
    }
    return obj -> heap -> array[0];
}

void kthLargestFree(KthLargest* obj) {
    heap_free(obj -> heap);
    free(obj);
}

/**
 * Your KthLargest struct will be instantiated and called as such:
 * KthLargest* obj = kthLargestCreate(k, nums, numsSize);
 * int param_1 = kthLargestAdd(obj, val);
 
 * kthLargestFree(obj);
*/