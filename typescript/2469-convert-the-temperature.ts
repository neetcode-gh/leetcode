function convertTemperature(celsius: number): number[] {
    const kelvin = celsius + 273.15;
    const fahrenheit = celsius * 1.80 + 32.00;
    return [kelvin, fahrenheit];
};
