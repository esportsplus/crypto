const MAX = Math.pow(2, 32);


export default () => {
    return crypto.getRandomValues( new Uint32Array(10) )[0] / MAX;
};