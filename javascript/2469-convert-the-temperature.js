/**
 * @param {number} celsius
 * @return {number[]}
 */
var convertTemperature = function(celsius) {
    let kelvin = celsius + 273.15; // initialize kelvin and add 273.15 to celsius
    let fahrenheit = (celsius * 1.80) + 32; // initialize fahrenheit and multiply 1.80 to celsius and add 32
    return [kelvin, fahrenheit]; // return kelvin and fahrenheit as an array
};