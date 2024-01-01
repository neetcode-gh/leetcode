int* addToArrayForm(int* A, int ASize, int K, int* returnSize) {
    // Calculate the maximum size of the result array
    int maxSize = (ASize > 6) ? ASize + 2 : 8;  // Maximum 6 digits in K, plus 2 for potential carry.

    // Create the result array
    int* result = (int*)malloc(maxSize * sizeof(int));
    
    // Initialize variables
    int carry = 0;
    int i = ASize - 1;
    int j = 0;

    // Perform the addition
    while (i >= 0 || K > 0 || carry > 0) {
        int sum = carry;
        if (i >= 0) {
            sum += A[i];
            i--;
        }
        if (K > 0) {
            sum += K % 10;
            K /= 10;
        }
        
        result[j] = sum % 10;
        carry = sum / 10;
        j++;
    }
    
    // Reverse the result array
    int left = 0;
    int right = j - 1;
    while (left < right) {
        int temp = result[left];
        result[left] = result[right];
        result[right] = temp;
        left++;
        right--;
    }

    *returnSize = j;
    return result;
}
