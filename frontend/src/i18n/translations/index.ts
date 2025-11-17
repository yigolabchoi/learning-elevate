/**
 * Translations
 * 
 * 모든 언어 번역 export
 */

import { ko } from './ko';
import { en } from './en';

export type Language = 'ko' | 'en';

export const translations = {
  ko,
  en,
};

// 타입 추출을 위한 헬퍼
type DeepKeyOf<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${DeepKeyOf<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

export type TranslationKeys = DeepKeyOf<typeof ko>;

