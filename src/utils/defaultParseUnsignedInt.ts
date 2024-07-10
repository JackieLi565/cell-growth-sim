/**
 *
 * @param {string | null} value - A value to convert from a string to a number
 * @param {number} [fallback=0] - A fallback value if the target value is unsuccessful
 * @returns {number} - The number value of the original string
 */
export const defaultParseUnsignedInt = (
  value: string | null,
  fallback: number = 0
): number => {
  if (fallback < 0) {
    throw new Error("fallback argument cannot be less than zero");
  }

  if (!value) {
    return fallback;
  }

  const num = parseInt(value, 10);
  if (isNaN(num) || num < 0) {
    return fallback;
  }

  return num;
};
