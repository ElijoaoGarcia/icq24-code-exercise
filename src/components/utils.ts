export const isImgUrl = (url: string) => {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}

export const whiteSpaceValidator = (value: string) => {
  return value.split('').every((element) => element === ' ')
};
  
export const urlValidator = (value: string) => {
  try{ return Boolean(new URL(value)) }
  catch(e) { return false }
}
  