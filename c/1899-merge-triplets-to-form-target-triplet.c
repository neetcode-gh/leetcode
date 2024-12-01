bool mergeTriplets(int** triplets, int tripletsSize, int* tripletsColSize, int* target, int targetSize) {
    int x = 0, y = 0, z = 0;

    for (int i = 0; i < tripletsSize; i++) {
        if (triplets[i][0] <= target[0] && triplets[i][1] <= target[1] && triplets[i][2] <= target[2]) {
            x = (x > triplets[i][0]) ? x : triplets[i][0];
            y = (y > triplets[i][1]) ? y : triplets[i][1];
            z = (z > triplets[i][2]) ? z : triplets[i][2];
        }
    }

    return (x == target[0] && y == target[1] && z == target[2]);
}
