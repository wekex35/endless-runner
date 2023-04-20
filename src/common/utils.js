export const RandomMinMax = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const ZeroPad = (num, places) => String(num).padStart(places, "0");
