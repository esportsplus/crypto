let max = Math.pow(2, 32);


export default () => crypto.getRandomValues( new Uint32Array(10) )[0] / max;