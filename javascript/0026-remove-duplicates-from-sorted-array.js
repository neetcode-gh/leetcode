var removeDuplicates = function(nums) {
    
  let i = 0;
  let j = 1;
      
      do{
          if(nums[i] === nums[i+j]) {
              j++;
          } else {
              nums.splice(i + 1, j - 1);
              j = 1;
              i++;
          }
      }while(i < nums.length - 1);
      
      return nums.length;
  };
