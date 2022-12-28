function leastInterval(tasks: string[], n: number): number {
    const charMap = new Map();
    let maxCharCount = 0;
    let maxChar = tasks[0];

    for (let char of tasks) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
        if (charMap.get(char) > maxCharCount) {
            maxCharCount = charMap.get(char);
            maxChar = char;
        }
    }

    let idleCount = (maxCharCount - 1) * n;

    charMap.forEach((count, char) => {
        // 'return' inside forEach() serve as 'continue'
        if (char === maxChar) {
            return;
        }
        if (count === maxCharCount) {
            idleCount -= count - 1;
        } else {
            idleCount -= count;
        }
    });

    if (idleCount <= 0) {
        return tasks.length;
    }
    return tasks.length + idleCount;
}
