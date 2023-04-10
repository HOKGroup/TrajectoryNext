import { type HTMLProps } from 'react';
import iconSun from '../assets/icons/sun-regular.svg';
import iconMoon from '../assets/icons/moon-regular.svg';
import iconSystem from '../assets/icons/display-solid.svg';
import iconChevronDown from '../assets/icons/chevron-down-solid.svg';

export const IconSun = (props: HTMLProps<HTMLImageElement>) => (
  <img src={iconSun} alt="Light Mode" {...props} />
);

export const IconMoon = (props: HTMLProps<HTMLImageElement>) => (
  <img src={iconMoon} alt="Dark Mode" {...props} />
);

export const IconSystem = (props: HTMLProps<HTMLImageElement>) => (
  <img src={iconSystem} alt="System" {...props} />
);

export const IconChevronDown = (props: HTMLProps<HTMLImageElement>) => (
  <img src={iconChevronDown} {...props} />
);
