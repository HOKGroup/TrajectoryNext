import { type FC } from 'react';
import DarkModeToggle from './DarkModeToggle';
import hokLogo from './assets/hokLogo.svg';

const AppHeader: FC = () => {
  return (
    <header className="flex flex-row items-center justify-between border-b bg-slate-100 py-2 pl-4 dark:bg-slate-800">
      <span className="flex items-center">
        <img src={hokLogo} className="mr-4 h-8 w-8" alt="HOK logo" />
        <h1 className="whitespace-nowrap text-2xl font-semibold">
          Trajectory Next
        </h1>
      </span>
      <span>
        <DarkModeToggle />
      </span>
    </header>
  );
};

export default AppHeader;
