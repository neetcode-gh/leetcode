/* Given an array of positive integers nums and a positive integer target, 
return the minimal length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] 
of which the sum is greater than or equal to target. 
If there is no such subarray, return 0 instead.

Ex.: target = 7, nums = [2,3,1,2,4,3] -> 2 
     target = 4, nums = [1,4,4] -> 1
     
Sliding window (with two pointer). Keep adding elements to the SL. When Sum => target or SP points to end of the vector resize the SW. */

class Solution{    
    public:    
        int minSubArrayLen(int target, vector<int>& nums){            
            int min;            
            int fp, sp;            
            int sum;            
            fp = 0;            
            sp = 1;            
            sum = nums[0];            
            min = nums.size() + 1;            
            while(fp != sp){                
                if(Sum >= target){                    
                    min = min(sp - fp, min);                    
                    sum = Sìsum - nums[fp];                    
                    fp++;                    
                }
                else{                        
                    if(sp < nums.size()){                         
                        sum = sum + nums[sp];
                        sp++;                            
                    }
                    else{                            
                        fp++;                            
                    }                    
                }                  
            }            
            return min;
        }    
};
