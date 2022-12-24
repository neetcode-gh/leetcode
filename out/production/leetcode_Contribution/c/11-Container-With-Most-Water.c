int maxArea(int* height, int heightSize){
    int left = 0;
    int right = heightSize - 1;
    int res = 0;
    
    while (left < right) {
        res = max(res, min(height[left], height[right]) * (right - left));
        if (height[left] < height[right]) {
            left += 1;
        }
        else if (height[right] <= height[left]) {
            right -= 1;
        }
    }
    return res;
}

// C does not have a predefined min and max function
int max(int a, int b) {
    return (a > b) ? a : b;
}

int min(int a, int b) {
    return (a < b) ? a : b;
}