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
