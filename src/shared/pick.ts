// with pick function I use for filtering and searching

const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
) => {
  const finalObj: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  console.log(finalObj);
  return finalObj;
};
export default pick;
