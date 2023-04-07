import {
  type ChangeEvent,
  type MouseEvent,
  useCallback,
  useState,
} from 'react';
import { type ParsedUser, parseUserEmails } from './parseUserEmails';
import Button, { ButtonType } from './components/Button';
import Section from './components/Section';

interface Props {
  enabled: boolean;
  setParsedUsers: (parsedUsers: Array<ParsedUser>) => void;
}

const UserEmailsInput: React.FC<Props> = ({ enabled, setParsedUsers }) => {
  const [userEmails, setUserEmails] = useState('');

  const [errors, setErrors] = useState(undefined as string[] | undefined);

  const handleInput = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    setUserEmails(evt.target.value);
  }, []);

  const handleSubmit = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();

      const parsed = parseUserEmails(userEmails);

      if (!parsed.success) {
        setErrors(parsed.errors);
      } else {
        setErrors(undefined);
        setParsedUsers(parsed.values);
      }
    },
    [userEmails, setParsedUsers]
  );

  const handleReset = useCallback(() => {
    setUserEmails('');
    setErrors(undefined);
  }, []);

  return (
    <Section title="Paste User Emails">
      <form>
        <textarea
          onChange={handleInput}
          value={userEmails}
          disabled={!enabled}
          id="userEmails"
          name="userEmails"
          rows={5}
          cols={80}
          autoCorrect="off"
          spellCheck={false}
          className="block w-full rounded-md border-2 px-2 py-1 outline-none focus:border-transparent focus:ring focus:ring-blue-300 enabled:bg-white disabled:cursor-not-allowed disabled:bg-slate-100 dark:text-slate-950 dark:disabled:bg-slate-200"
        />
        <span className="mt-3 flex justify-between gap-4 md:justify-start">
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
        <output htmlFor="userEmails" className="font-semibold text-red-500">
          {errors?.map((err, idx) => (
            <div key={idx}>{err}</div>
          ))}
        </output>
      </form>
    </Section>
  );
};

export default UserEmailsInput;
