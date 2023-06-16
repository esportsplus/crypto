function toBuffer(base64: string) {
    return fetch('data:application/octet-binary;base64,' + base64)
        .then(async (response) => {
            return new Uint8Array( await response.arrayBuffer() );
        });
}


export default async (content: string, password: string) => {
    if (content.indexOf('.') === -1) {
        return null;
    }

    try {
        let [ciphertext, iv] = content.split('.'),
            alg = {
                iv: await toBuffer(iv),
                name: 'AES-GCM'
            },
            hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password)),
            key = await crypto.subtle.importKey('raw', hash, alg, false, ['decrypt']);

        return new TextDecoder().decode(
            await crypto.subtle.decrypt(alg, key, await toBuffer(ciphertext))
        );
    }
    catch (e) { }

    return null;
};