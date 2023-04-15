export const roll = (max) => {
    let min = 1;
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

export const rollD20 = () => {
    return roll(20);
};
