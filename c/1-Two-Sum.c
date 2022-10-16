/*
    Time: O(n)
    Space: O(n)
*/

typedef struct {
	int key; // key of hash_table
	int val;   
	
	UT_hash_handle hh; // Makes this structure hashable
} hash_table;

hash_table *hash = NULL, *elem, *tmp;

int* twoSum(int* nums, int numsSize, int target, int* returnSize){       
    int* res = calloc((*returnSize = 2), sizeof(int));

	for(int i = 0; i < numsSize; ++i){
		int k = target - nums[i];
        
        HASH_FIND_INT(hash, &k, elem); // Look for the item in hash table

		if (elem) {
			res[0] = elem->val;
			res[1] = i;
			break;
		} 
        else {
			elem = malloc(sizeof(hash_table));
			elem->key = nums[i]; // array element as key of hash table
            elem->val = i;       // index of an element as value of hash table
            
			HASH_ADD_INT(hash, key, elem); // Add item to hash table
		}
	}
    
    // Free up the hash table 
	HASH_ITER(hh, hash, elem, tmp) {
		HASH_DEL(hash, elem); free(elem); 
	}

	return res;
}