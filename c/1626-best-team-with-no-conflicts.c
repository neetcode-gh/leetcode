struct Player {
    int age;
    int score;
};

int comparePlayers(const void *a, const void *b) {
    struct Player *playerA = (struct Player *)a;
    struct Player *playerB = (struct Player *)b;
    if (playerA->age != playerB->age) {
        return playerA->age - playerB->age;
    } else {
        return playerA->score - playerB->score;
    }
}

int bestTeamScore(int* scores, int scoresSize, int* ages, int agesSize) {
    struct Player players[scoresSize];
    for (int i = 0; i < scoresSize; i++) {
        players[i].age = ages[i];
        players[i].score = scores[i];
    }
    
    qsort(players, scoresSize, sizeof(struct Player), comparePlayers);
    
    int dp[scoresSize];
    int ans = 0;
    for (int i = 0; i < scoresSize; i++) {
        dp[i] = players[i].score;
        for (int j = 0; j < i; j++) {
            if (players[j].score <= players[i].score) {
                dp[i] = (dp[i] > dp[j] + players[i].score) ? dp[i] : dp[j] + players[i].score;
            }
        }
        ans = (ans > dp[i]) ? ans : dp[i];
    }
    return ans;
}
