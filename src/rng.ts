let max = Math.pow(2, 32);


export default () => crypto.getRandomValues(new Uint32Array(1))[0] / max;