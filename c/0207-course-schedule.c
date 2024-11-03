#include <stdbool.h>
#include <stdlib.h>

// The most prerequisites a course has in the test data.
#define PREREQ_MAX (13)

bool hasLoops(int idx, int cmap[][PREREQ_MAX], int cpr[], int* visited) {
    // The current course requires a course that requires the current course (looped requirements).
    if (visited[idx] > 0)
        return true;

    // Check the current course's prerequisites for loops.
    if (visited[idx] == 0) {
        visited[idx] = 1;
        for (int i = 0; i < cpr[idx]; i++) {
            if (hasLoops(cmap[idx][i], cmap, cpr, visited)) {
                return true;
            }
        }
        // Mark course as processed in a previous loop. Alternatively, we can also just clear the visited[] array.
        visited[idx] = -1;
    }

    return false;
}

bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {
    int cmap[2001][PREREQ_MAX]; // Holds the prerequisites of each course.
    int cpr[2001] = {0};        // Number of course prerequisites.
    int visited[2001] = {0};

    // Map out all prerequisites of all courses.
    for (int i = 0; i < prerequisitesSize; i++) {
        int course = prerequisites[i][0];
        int prereq = prerequisites[i][1];

        cmap[course][cpr[course]++] = prereq;
    }

    // Check for loops.
    for (int i = 0; i < numCourses; i++) {
        // If the courses loop, then we can't finish the courses.
        if (hasLoops(i, cmap, cpr, visited)) {
            return false;
        }
    }

    return true;
}
