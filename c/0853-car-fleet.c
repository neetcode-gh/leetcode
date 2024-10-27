typedef struct {
    int position;
    int speed;
} Car;

// Function to compare cars for sorting based on their positions
int compareCars(const void* a, const void* b) {
    return ((Car*)a)->position - ((Car*)b)->position;
}

int carFleet(int target, int* position, int positionSize, int* speed, int speedSize) {
    if (positionSize == 0) return 0;

    Car cars[positionSize];
    for (int i = 0; i < positionSize; i++) {
        cars[i].position = position[i];
        cars[i].speed = speed[i];
    }

    // Sort cars based on their positions in descending order
    qsort(cars, positionSize, sizeof(Car), compareCars);

    int fleets = 0;
    double prevTime = -1.0;

    for (int i = positionSize - 1; i >= 0; i--) {
        double time = (double)(target - cars[i].position) / cars[i].speed;

        if (time > prevTime) {
            fleets++;
            prevTime = time;
        }
    }

    return fleets;
}
