export default async (content: string, password: string): Promise<null | string> => {
    if (content.indexOf('.') === -1) {
        return null;
    }

    let [ciphertext, iv] = content.split('.'),
        alg = {
            iv: Buffer.from(iv, 'base64'),
            name: 'AES-GCM'
        },
        hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password)),
        key = await crypto.subtle.importKey('raw', hash, alg, false, ['decrypt']);

    try {
        return new TextDecoder().decode(
            await crypto.subtle.decrypt(alg, key, Buffer.from(ciphertext, 'base64'))
        );
    }
    catch {}

    return null;
};