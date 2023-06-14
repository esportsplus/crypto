export default async (value: string) => {
    let hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)),
        items: (number | string)[] = Array.from(new Uint8Array(hash));

    for (let i = 0, n = items.length; i < n; i++) {
        items[i] = items[i].toString(16).padStart(2, '0');
    }

    return items.join('');
};