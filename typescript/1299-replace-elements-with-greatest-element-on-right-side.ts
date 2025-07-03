function replaceElements(arr: number[]): number[] {
    let currMax = -1;
    
    for(let i = arr.length -1 ; i >= 0; i--) {
        let newMax = Math.max(currMax, arr[i]);         
        arr[i] = currMax;
        
        currMax = newMax;
    }
    
    return arr;
};
