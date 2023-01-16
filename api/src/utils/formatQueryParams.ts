const convertToRealType = (val: string) => {
  if (!isNaN(Number(val))) {
    return Number(val);
  } else if (val === "true" || val === "false") {
    return val === "true" ? true : false;
  }
  return val;
};

const formatQueryParams = (params: URLSearchParams) =>
  [...params.entries()].reduce(
    (acc: Record<string, any>, tuple: [string, string]) => {
      const [key, val] = tuple;

      if (acc.hasOwnProperty(key)) {
        if (Array.isArray(acc[key])) {
          acc[key] = [...acc[key], convertToRealType(val)];
        } else {
          acc[key] = [acc[key], convertToRealType(val)];
        }
      } else {
        acc[key] = convertToRealType(val);
      }

      return acc;
    },
    {}
  );

export default formatQueryParams;
