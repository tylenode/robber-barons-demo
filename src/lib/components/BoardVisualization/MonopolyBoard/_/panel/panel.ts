/**
 * Calculates percentage change between two values
 * @param baseline - Original reference value
 * @param newValue - New value to compare against baseline
 * @returns Percentage change as number (positive = increase, negative = decrease)
 * @throws Error when baseline is zero
 */
export function computeChange(baseline: number, newValue: number): number {
    if (baseline === 0) {
      throw new Error("Division by zero: Baseline must be non-zero");
    }
    return ((newValue - baseline) / baseline);
}