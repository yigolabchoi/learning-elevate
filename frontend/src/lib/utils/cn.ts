import { clsx, type ClassValue } from 'clsx';

/**
 * 클래스명을 병합하는 유틸리티 함수
 * Tailwind CSS의 조건부 클래스 적용에 유용
 * 
 * @example
 * cn('base-class', condition && 'conditional-class', 'another-class')
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

