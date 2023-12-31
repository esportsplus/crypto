export default async (content: string, password: string) => {
    if (content.indexOf('.') === -1) {
        throw new Error('Crypto: decrypt function received an invalid value');
    }

    let [ciphertext, iv] = content.split('.'),
        alg = {
            iv:  Buffer.from(iv, 'base64'),
            name: 'AES-GCM'
        },
        hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password)),
        key = await crypto.subtle.importKey('raw', hash, alg, false, ['decrypt']);

    return new TextDecoder().decode(
        await crypto.subtle.decrypt(alg, key, Buffer.from(ciphertext, 'base64'))
    );
};