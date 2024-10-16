import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSquareArt = (champion: any) =>
  `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${champion}.png`;