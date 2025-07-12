import { Brand } from '@esportsplus/utilities';


type UUID = Brand<string, 'UUID'>;


export default crypto.randomUUID.bind(crypto) as () => UUID;
export type { UUID };