/**
 * Transforms a string from camelCase to snake_case
 */
const toSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};
/**
 *
 * Transforms a string from snake_case to camelCase
 */
export const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * Recursively transforms object keys from camelCase to snake_case
 */
export const transformToSnakeCase = <T extends Record<string, any>>(
  obj: T,
): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformToSnakeCase);
  }

  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
      const snakeKey = toSnakeCase(key);
      acc[snakeKey] = transformToSnakeCase(obj[key]);
      return acc;
    }, {});
  }

  return obj;
};

/**
 * Recursively transforms object keys from snake_case to camelCase
 */
export const transformToCamelCase = <T extends Record<string, any>>(
  obj: T,
): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformToCamelCase);
  }

  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
      const camelKey = toCamelCase(key);
      acc[camelKey] = transformToCamelCase(obj[key]);
      return acc;
    }, {});
  }

  return obj;
};
