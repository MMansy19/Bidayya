import { ButtonVariant } from '../types';

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primarySmall:
    'p-2 font-medium text-sm rounded-3xl focus:outline-none focus:shadow-outline text-center text-white bg-regal-blue hover:bg-blue-hover shadow',
  primary:
    'px-4 py-2 font-medium text-xs md:text-base rounded-3xl focus:outline-none focus:shadow-outline text-center text-white bg-regal-blue hover:bg-blue-hover shadow',
  secondary:
    'px-4 py-2 font-medium text-xs md:text-base rounded-3xl focus:outline-none focus:shadow-outline text-center hover:bg-[#003BD2] hover:text-white',
  secondaryOutline:
    'px-4 py-2 font-medium text-sm rounded-3xl focus:outline-none focus:shadow-outline text-center hover:bg-blue-hover shadow text-regal-blue border-2 border-regal-blue hover:bg-regal-blue hover:text-white',
  danger:
    'px-4 py-2 font-medium text-xs md:text-base rounded-3xl focus:outline-none focus:shadow-outline text-center text-red-600  hover:text-white hover:bg-red-600',
  pdf: 'w-full max-w-96 p-2 text-left bg-zinc-100 hover:bg-zinc-200 rounded border border-regal-blue text-black text-xs',
};

export const formVariantStyles = {
  primary:
    'text-sm px-3 py-2 rounded w-1/2 bg-gray-100 placeholder:text-gray-400 w-full',
  auth: 'text-sm px-3 py-2 rounded-lg border border-regal-blue w-full placeholder:text-regal-blue',
};
