function combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort();

    const res: number[][] = [];

    function backtrack(cur: number[], pos: number, target: number) {
        if (target === 0) {
            res.push(cur.slice());
        }
        if (target <= 0) {
            return;
        }
        let prev = -1;

        for (let i = pos; i < candidates.length; i++) {
            if (candidates[i] == prev) {
                continue;
            }

            cur.push(candidates[i]);

            backtrack(cur, i + 1, target - candidates[i]);

            cur.pop();
            prev = candidates[i];
        }
    }

    backtrack([], 0, target);

    return res;
}
