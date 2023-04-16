export const roll = (max) => {
    var randomBytes = new Uint8Array(4);
    crypto.getRandomValues(randomBytes);
    var randomInt = (randomBytes[0] << 24) | (randomBytes[1] << 16) | (randomBytes[2] << 8) | randomBytes[3];
    return Math.floor(Math.abs(randomInt) / 0x7fffffff * max) + 1;
}

export const rollD20 = () => {
    return roll(20);
};
