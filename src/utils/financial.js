export const financial = (x, float = 2) => {
    return Number.parseFloat(x).toFixed(float);
};