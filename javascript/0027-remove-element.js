var removeElement = function(nums, val) {
 
    let i = 0;
     
    do {
      if(nums[i] === val)  {
          nums.splice(i,1);
       
      } else {
          i++;
      }
        
    }while(i < nums.length)
        
        return nums.length;
};
