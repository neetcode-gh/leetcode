/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
const asteroidCollision = (asteroids) => {
    let stack = [];

    for (asteroid of asteroids) {
        while (stack.length != 0 && asteroid < 0 && stack.at(-1) > 0) {
            let diff = asteroid + stack.at(-1);

            if (diff < 0) {
                stack.pop();
            } else if (diff > 0) {
                asteroid = 0;
            } else {
                asteroid = 0;
                stack.pop();
            }
        }

        if (asteroid) {
            stack.push(asteroid);
        }
    }

    return stack;
};
