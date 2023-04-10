import { useCallback, useState, useEffect, useRef, type FC } from 'react';
import Button, { ButtonType } from './components/Button';
import {
  IconSun,
  IconMoon,
  IconSystem,
  IconChevronDown,
} from './components/Icons';
import classNames from 'classnames';

const getIsDarkMode = () => {
  return (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
};

const updateDocumentDarkModeValue = (isDarkMode: boolean) => {
  if (isDarkMode) {
    setDarkMode();
  } else {
    setLightMode();
  }
};

const setLightMode = () => {
  document.documentElement.classList.remove('dark');
  localStorage.theme = 'light';
};

const setDarkMode = () => {
  document.documentElement.classList.add('dark');
  localStorage.theme = 'dark';
};

const DarkModeToggle: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode);
  const [isSystemTheme, setIsSystemTheme] = useState(!!localStorage.theme);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as HTMLElement) &&
        !buttonRef.current.contains(event.target as HTMLElement)
      ) {
        setDropdownIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    updateDocumentDarkModeValue(isDarkMode);
  }, [isDarkMode]);

  const setDarkMode = useCallback(() => {
    setIsDarkMode(true);
    setIsSystemTheme(false);
    setDropdownIsOpen(false);
  }, []);

  const setLightMode = useCallback(() => {
    setIsDarkMode(false);
    setIsSystemTheme(false);
    setDropdownIsOpen(false);
  }, []);

  const setSystem = useCallback(() => {
    delete localStorage.theme;
    const newIsDarkMode = getIsDarkMode();
    setIsDarkMode(newIsDarkMode);
    setIsSystemTheme(true);
    setDropdownIsOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownIsOpen((isOpen) => !isOpen);
  }, []);

  return (
    <>
      <Button
        ref={buttonRef}
        buttonType={ButtonType.Secondary}
        className="mr-5 inline-flex w-14 items-center justify-around whitespace-nowrap rounded-lg !px-1 py-2 text-center text-sm text-slate-50 sm:mr-10"
        onClick={toggleDropdown}
      >
        {isDarkMode ? (
          <IconMoon
            className={classNames('h-4 w-4', { invert: !isDarkMode })}
          />
        ) : (
          <IconSun className={classNames('h-4 w-4', { invert: !isDarkMode })} />
        )}{' '}
        <IconChevronDown
          className={classNames('h-4 w-4', { invert: !isDarkMode })}
        />
      </Button>
      <div
        id="dropdown"
        ref={dropdownRef}
        className={classNames(
          'absolute right-0 z-10 mr-4 mt-4 w-28 divide-y divide-gray-100 rounded-lg border bg-slate-50 shadow-md dark:bg-slate-700',
          { hidden: !dropdownIsOpen }
        )}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <button
              type="button"
              className={classNames(
                'block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-slate-50',
                { '!bg-blue-500 !text-slate-50': isDarkMode && !isSystemTheme }
              )}
              onClick={setDarkMode}
            >
              <span className="flex">
                <IconMoon
                  className={classNames('mr-4 h-5 w-5', {
                    invert: isDarkMode,
                  })}
                />
                Dark
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={classNames(
                'block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-slate-50',
                { '!bg-blue-500 !text-slate-50': !isDarkMode && !isSystemTheme }
              )}
              onClick={setLightMode}
            >
              <span className="flex">
                <IconSun
                  className={classNames('mr-4 h-5 w-5', {
                    invert: isDarkMode,
                  })}
                />
                Light
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={classNames(
                'block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-slate-50',
                { '!bg-blue-500 !text-slate-50': isSystemTheme }
              )}
              onClick={setSystem}
            >
              <span className="flex">
                <IconSystem
                  className={classNames('mr-4 h-5 w-5', {
                    invert: isDarkMode || isSystemTheme,
                  })}
                />
                System
              </span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DarkModeToggle;
