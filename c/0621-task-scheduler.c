int leastInterval(char *tasks, int tasksSize, int n) {
    int taskCount[26] = {0};

    for (int i = 0; i < tasksSize; i++) {
        taskCount[tasks[i] - 'A']++;
    }

    int maxTaskFreq = 0;
    int numMaxTasks = 0;

    for (int i = 0; i < 26; i++) {
        if (taskCount[i] > maxTaskFreq) {
            maxTaskFreq = taskCount[i];
            numMaxTasks = 1;
        } else if (taskCount[i] == maxTaskFreq) {
            numMaxTasks++;
        }
    }

    int intervals = (maxTaskFreq - 1) * (n + 1) + numMaxTasks;

    return (intervals > tasksSize) ? intervals : tasksSize;
}
