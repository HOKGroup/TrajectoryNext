import { FormEvent, useCallback, useRef, useState } from 'react';
import { ParsedUser, parseUserEmails } from './parseUserEmails';

interface Props {
  enabled: boolean;
  setParsedUsers: (parsedUsers: Array<ParsedUser>) => void;
}

const UserEmailsInput: React.FC<Props> = ({ enabled, setParsedUsers }) => {
  const userEmailsRef = useRef<HTMLTextAreaElement>(null);

  const [errors, setErrors] = useState(undefined as string[] | undefined);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userEmailsInput = userEmailsRef.current?.value || '';
    const parsed = parseUserEmails(userEmailsInput);

    if (!parsed.success) {
      setErrors(parsed.errors);
    } else {
      setErrors(undefined);
      setParsedUsers(parsed.values);
    }
  }, []);

  const handleReset = useCallback(() => {
    setErrors(undefined);
  }, []);

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className="mb-5 w-full">
      <label className="block">
        <h2 className="mb-2 text-xl font-semibold">Paste User Emails</h2>
        <textarea
          disabled={!enabled}
          id="userEmails"
          name="userEmails"
          ref={userEmailsRef}
          rows={5}
          cols={80}
          autoCorrect="off"
          spellCheck={false}
          className="block w-full rounded-md border-2 px-2 py-1 outline-none focus:border-transparent focus:ring focus:ring-blue-300 enabled:bg-white disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </label>
      <span className="mt-4 flex justify-end gap-4">
        <button
          type="submit"
          disabled={!enabled}
          className="rounded-md bg-blue-500 px-4 py-1 text-white shadow-sm outline-none enabled:hover:bg-blue-600 enabled:focus:ring enabled:focus:ring-blue-400 disabled:cursor-not-allowed"
        >
          Add
        </button>
        <button
          type="reset"
          disabled={!enabled}
          className="rounded-md bg-yellow-500 px-4 py-1 text-white outline-none enabled:hover:bg-yellow-400 enabled:focus:ring enabled:focus:ring-yellow-400 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </span>
      <output htmlFor="userEmails" className="font-semibold text-red-500">
        {errors?.map((err, idx) => (
          <div key={idx}>{err}</div>
        ))}
      </output>
    </form>
  );
};

export default UserEmailsInput;
