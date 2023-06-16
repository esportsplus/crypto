function toBase64(buffer: BlobPart) {
    return new Promise((resolve, reject) => {
        var blob = new Blob([buffer], { type: 'application/octet-binary' }),
            reader = new FileReader();

        reader.onload = function () {
            let result = reader.result;

            if (typeof result !== 'string') {
                return reject();
            }

            return resolve( result.slice( result.indexOf(',') + 1 ) );
        };
        reader.readAsDataURL(blob);
    });
}


export default async (content: string, password: string) => {
    try {
        let alg = {
            iv: crypto.getRandomValues(new Uint8Array(12)),
            name: 'AES-GCM'
        },
        hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password)),
        key = await crypto.subtle.importKey('raw', hash, alg, false, ['encrypt']),
        ciphertext = await crypto.subtle.encrypt(alg, key, new TextEncoder().encode(content));

        return toBase64(ciphertext) + '.' + toBase64(alg.iv);
    }
    catch (e) { }

    return null;
};