// one-level shallow comparison between two objects
export const shallowEqual = (a, b) => Object.entries(a).every(([key, valueA]) => valueA === b[key]);
