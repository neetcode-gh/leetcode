// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    let res=[...matrix]
    let temp=[]
    for(i=0; i<res.length; i++){
            let temp=[]
        for(j=res.length-1; j>-1; j--){
            temp.push(res[j][i])            
        }
        matrix.push(temp)
        matrix.shift()
    }
}
