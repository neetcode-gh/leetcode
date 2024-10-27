typedef struct {
    int x;
    int y;
} Point;

// Function to calculate the Euclidean distance from origin
double distance(Point p) {
    return sqrt(p.x * p.x + p.y * p.y);
}

// Function to compare two points based on distance
int compare(const void* a, const void* b) {
    Point* pointA = (Point*)a;
    Point* pointB = (Point*)b;
    
    double distanceA = distance(*pointA);
    double distanceB = distance(*pointB);
    
    if (distanceA < distanceB) return -1;
    if (distanceA > distanceB) return 1;
    return 0;
}

// Function to find k closest points to origin
int** kClosest(int** points, int pointsSize, int* pointsColSize, int k, int* returnSize, int** returnColumnSizes) {
    Point* pointArr = (Point*)malloc(pointsSize * sizeof(Point));
    for (int i = 0; i < pointsSize; i++) {
        pointArr[i].x = points[i][0];
        pointArr[i].y = points[i][1];
    }
    
    qsort(pointArr, pointsSize, sizeof(Point), compare);
    
    int** result = (int**)malloc(k * sizeof(int*));
    *returnSize = k;
    *returnColumnSizes = (int*)malloc(k * sizeof(int));
    
    for (int i = 0; i < k; i++) {
        result[i] = (int*)malloc(2 * sizeof(int));
        result[i][0] = pointArr[i].x;
        result[i][1] = pointArr[i].y;
        (*returnColumnSizes)[i] = 2;
    }
    
    free(pointArr);
    
    return result;
}
