export default async (content: string, password: string) => {
    let alg = {
            iv: crypto.getRandomValues(new Uint8Array(12)),
            name: 'AES-GCM'
        },
        hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password)),
        key = await crypto.subtle.importKey('raw', hash, alg, false, ['encrypt']);

    return [
        Buffer.from(
            await crypto.subtle.encrypt(alg, key, new TextEncoder().encode(content))
        ).toString('base64'),
        Buffer.from(alg.iv).toString('base64')
    ].join('.');
};