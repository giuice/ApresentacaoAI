import { describe, it, expect } from 'vitest';
import { getSegmentIndex } from '@/components/layout/CyberProgressBar';

describe('getSegmentIndex', () => {
  it('maps topics 1-3 to segment 1 (O Problema)', () => {
    expect(getSegmentIndex(1)).toBe(1);
    expect(getSegmentIndex(2)).toBe(1);
    expect(getSegmentIndex(3)).toBe(1);
  });

  it('maps topics 4-5 to segment 2 (A Evolucao)', () => {
    expect(getSegmentIndex(4)).toBe(2);
    expect(getSegmentIndex(5)).toBe(2);
  });

  it('maps topics 6-10 to segment 3 (As Ferramentas)', () => {
    expect(getSegmentIndex(6)).toBe(3);
    expect(getSegmentIndex(7)).toBe(3);
    expect(getSegmentIndex(8)).toBe(3);
    expect(getSegmentIndex(9)).toBe(3);
    expect(getSegmentIndex(10)).toBe(3);
  });

  it('maps topics 11-13 to segment 4 (O Novo Papel)', () => {
    expect(getSegmentIndex(11)).toBe(4);
    expect(getSegmentIndex(12)).toBe(4);
    expect(getSegmentIndex(13)).toBe(4);
  });

  it('maps topics 14-16 to segment 5 (Impacto)', () => {
    expect(getSegmentIndex(14)).toBe(5);
    expect(getSegmentIndex(15)).toBe(5);
    expect(getSegmentIndex(16)).toBe(5);
  });

  it('AC3: topic 6 maps to segment 3', () => {
    expect(getSegmentIndex(6)).toBe(3);
  });

  it('clamps values below range to segment 1', () => {
    expect(getSegmentIndex(0)).toBe(1);
    expect(getSegmentIndex(-5)).toBe(1);
  });

  it('clamps values above range to segment 5', () => {
    expect(getSegmentIndex(17)).toBe(5);
    expect(getSegmentIndex(999)).toBe(5);
  });

  it('defaults invalid numeric values to segment 1', () => {
    expect(getSegmentIndex(Number.NaN)).toBe(1);
    expect(getSegmentIndex(Number.POSITIVE_INFINITY)).toBe(1);
  });
});
