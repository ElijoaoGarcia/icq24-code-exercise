import axios from "axios";
import { IAgent, INewReview } from "../types/Agent";

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

export async function fetchAgents (): Promise<IAgent[]> {
  const response = await axios.get('/agents')
  return response.data as IAgent[]
}

export const replaceSpecialChars = (text = ''): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

export const sendReview = async (review: INewReview) => {
  await axios.post('/reviews', { review })
}
