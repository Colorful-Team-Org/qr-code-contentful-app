import { atom } from 'jotai';
import { MappingConfig } from './types';

// export const mappingConfigRefsContext = createContext([] as MappingConfig[]);

export const mappingConfigsAtom = atom<MappingConfig[]>([]);
