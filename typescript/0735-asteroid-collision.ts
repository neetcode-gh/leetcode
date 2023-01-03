function asteroidCollision(asteroids: number[]): number[] {
    const stack: number[] = [];

    for (let a of asteroids) {
        while (stack && a < 0 && stack[stack.length - 1] > 0) {
            let diff = a + stack[stack.length - 1];
            if (diff < 0) {
                stack.pop();
            } else if (diff > 0) {
                a = 0;
            } else {
                stack.pop();
                a = 0;
            }
        }
        if (a === 0) continue;
        stack.push(a);
    }

    return stack;
}
