/*
    Time: O(n)
    Space: O(1)
*/

typedef struct {
	int key;
	UT_hash_handle hh; // Makes this structure hashable
} hash_table;

hash_table *hash = NULL, *elem, *tmp;

bool containsDuplicate(int* nums, int numsSize){
    if (numsSize == 1) {
      return false;
    }
    
    bool flag = false;
    
    for (int i=0; i<numsSize; i++) {
        HASH_FIND_INT(hash, &nums[i], elem);
        
        if(!elem) {
           elem = malloc(sizeof(hash_table));
           elem->key = nums[i];
           HASH_ADD_INT(hash, key, elem);
            
           flag = false;
       }
       else {
           flag = true;
           break;
       }
    }
                          
    // Free up the hash table 
	HASH_ITER(hh, hash, elem, tmp) {
		HASH_DEL(hash, elem); free(elem);
	}
    
    return flag;
}