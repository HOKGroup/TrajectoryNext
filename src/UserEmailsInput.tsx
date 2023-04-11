import {
  type ChangeEvent,
  type MouseEvent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { type ParsedUser, parseUserEmails } from './parseUserEmails';
import Button, { ButtonType } from './components/Button';
import Section from './components/Section';
import SectionHeading from './components/SectionHeading';

interface Props {
  enabled: boolean;
  setParsedUsers: (parsedUsers: Array<ParsedUser>) => void;
}

const minTextAreaSize = 2;
const maxTextAreaSize = 10;
const numCols = 80;

const calculateTextAreaSize = (inputStr: string) => {
  const numLines = inputStr.split('\n').length + 1;
  return Math.min(maxTextAreaSize, Math.max(minTextAreaSize, numLines + 1));
};

const UserEmailsInput: React.FC<Props> = ({ enabled, setParsedUsers }) => {
  const [userEmails, setUserEmails] = useState('');

  const [numRows, setNumRows] = useState(minTextAreaSize);

  const [errors, setErrors] = useState(undefined as string[] | undefined);

  const handleInput = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    setUserEmails(evt.target.value);
  }, []);

  useEffect(() => {
    const newNumRows = calculateTextAreaSize(userEmails);

    setNumRows(newNumRows);
  }, [userEmails]);

  const handleSubmit = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();

      const parsed = parseUserEmails(userEmails);

      if (!parsed.success) {
        setErrors(parsed.errors);
      } else {
        setErrors(undefined);
        setParsedUsers(parsed.values);
        setUserEmails('');
      }
    },
    [userEmails, setParsedUsers]
  );

  const handleReset = useCallback(() => {
    setUserEmails('');
    setErrors(undefined);
  }, []);

  return (
    <Section>
      <form className="flex flex-col gap-2">
        <label className="flex flex-col gap-4">
          <SectionHeading>Paste User Emails</SectionHeading>
          <div className="-mt-2 text-sm lg:hidden">
            Paste from Outlook. Example:
            <br />
            {
              'John Doe <jdoe@example.com>; Alice Jones <ajones@example.com>; Charlie Brown <cbrown@example.com>'
            }
          </div>
          <div className="group relative">
            <textarea
              onChange={handleInput}
              value={userEmails}
              disabled={!enabled}
              id="userEmails"
              name="userEmails"
              rows={numRows}
              cols={numCols}
              autoCorrect="off"
              wrap="off"
              spellCheck={false}
              className="peer block w-full rounded-md border-2 px-2 py-1 outline-none focus:border-transparent focus:ring focus:ring-blue-300 enabled:bg-white disabled:cursor-not-allowed disabled:bg-slate-100 dark:text-slate-950 dark:disabled:bg-slate-200"
            />
            <div className="absolute left-1/4 top-full z-10 mt-2 hidden w-3/4 rounded-md bg-gray-700 p-4 text-slate-50 before:absolute before:bottom-full before:left-1/2 before:ml-[-8px] before:border-[8px] before:border-gray-700 before:border-x-transparent before:border-t-transparent before:content-['_'] after:absolute after:z-10 lg:group-hover:peer-enabled:block">
              Paste from Outlook.
              <br />
              Example:
              <br />
              {
                'John Doe <jdoe@example.com>; Alice Jones <ajones@example.com>; Charlie Brown <cbrown@example.com>'
              }
            </div>
          </div>
        </label>
        <output
          htmlFor="userEmails"
          className="block font-semibold text-red-500"
        >
          {errors?.map((err, idx) => (
            <div key={idx}>{err}</div>
          ))}
        </output>
      </form>
      <span className="flex justify-between gap-4 md:justify-start">
        <Button
          buttonType={ButtonType.Primary}
          type="submit"
          disabled={!enabled || !userEmails.length}
          onClick={handleSubmit}
          className="order-last grow md:order-1 md:grow-0"
        >
          Add
        </Button>
        <Button
          buttonType={ButtonType.Warning}
          type="reset"
          disabled={!enabled || !userEmails.length}
          onClick={handleReset}
          className="order-first grow md:order-2 md:grow-0"
        >
          Clear
        </Button>
      </span>
    </Section>
  );
};

export default UserEmailsInput;
