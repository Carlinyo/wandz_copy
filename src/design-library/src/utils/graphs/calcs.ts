export const fractionCalc = (per: number) => {
  const fractionDigits = per < 1 ? 1 : 0;
  return `${per.toFixed(fractionDigits)}%`;
};

export const percentageCalc = (part: number, total: number) => {
  let num = part;
  if (!part) num = 0;
  if (total === 0) return '0%';
  const per = (num / total) * 100;
  return fractionCalc(per);
};
