/*

Approach:
1. We will initialize i, j, c, res, and sum to 0.
2. We will calculate the sum of the first k elements and check if the average is greater than or equal to the threshold.
3. We will increment the result if the average is greater than or equal to the threshold.
4. We will iterate through the array and calculate the sum of the next k elements.
5. We will check if the average is greater than or equal to the threshold and increment the result accordingly.
6. We will return the result.

Time Complexity: O(n)
Space Complexity: O(1)

*/
public class Solution {
    public int NumOfSubarrays(int[] arr, int k, int threshold) {
        int i, j, c, res, sum;                          // Initialize i, j, c, res, and sum to 0.
        i = c = sum = res = 0;                          // Initialize i, c, sum, and res to 0.
        j = i + k - 1;                                  // Initialize j to i + k - 1.

        while (c <= j) {                                // Calculate the sum of the first k elements.
            sum = sum + arr[c];                         // Add the element at index c to the sum.
            c++;                                        // Increment c.
        }

        res = (sum / k) >= threshold ? 1 : 0;             // Check if the average is greater than or equal to the threshold and increment the result accordingly.

        while (j < arr.Length) {                       // Iterate through the array and calculate the sum of the next k elements.
            sum = sum - arr[i++];                       // Subtract the element at index i from the sum and increment i.
            j++;                                        // Increment j.
            if (j < arr.Length) {                        // Check if j is less than the length of the array.
                sum = sum + arr[j];                     // Add the element at index j to the sum.
            }
            else {
                break;                                  // Break the loop if j is equal to or greater than the length of the array.
            }
            if ((sum / k) >= threshold) {                  // Check if the average is greater than or equal to the threshold.
                res++;                                  // Increment the result.
            }
        }

        return res;                                     // Return the result.
    }
}
