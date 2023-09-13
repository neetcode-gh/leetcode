/*
  You are given two 0-indexed integer permutations A and B of length n.
  A prefix common array of A and B is an array C such that C[i] is equal to the count of numbers that are present at or before the index i in both A and B.
  Return the prefix common array of A and B.
  A sequence of n integers is called a permutation if it contains all integers from 1 to n exactly once.

  Ex. Input: A = [1,3,2,4], B = [3,1,2,4]
      Output: [0,2,3,4]
      Explanation: At i = 0: no number is common, so C[0] = 0.
      At i = 1: 1 and 3 are common in A and B, so C[1] = 2.
      At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.
      At i = 3: 1, 2, 3, and 4 are common in A and B, so C[3] = 4.

    Time  : O(n)
    Space : O(n)
*/

class Solution {
public:
    vector<int> findThePrefixCommonArray(vector<int>& A, vector<int>& B) {
        vector<int> C;
        vector<int> v(A.size()+1,0);
        int count = 0;

        for(int i = 0; i < A.size(); ++i){
            if(v[A[i]] < 0)
                count++;
            ++v[A[i]];

            if(v[B[i]]>0)
                count++;
            --v[B[i]];
            
            C.push_back(count);
        }
        return C;
    }
};
