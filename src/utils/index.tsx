// get a string and return a sum of each character into ascii number
export const getAsciiSum = (str: string) => {
  // get last three characters of str: string
  return str.split("").reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 60;
};

export const hslMaker = (input: string) => {
  const h = Math.floor(getAsciiSum(input.slice(-3)) + 175);
  return `hsl(${h}, 65%, 65%)`;
};
