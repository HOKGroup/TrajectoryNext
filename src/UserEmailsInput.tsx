import { FormEvent, useCallback, useRef, useState } from 'react';
import { ParsedUser, parseUserEmails } from './parseUserEmails';

interface Props {
  setParsedUsers: (parsedUsers: Array<ParsedUser>) => void;
}

const UserEmailsInput: React.FC<Props> = ({ setParsedUsers }) => {
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
    <form onSubmit={handleSubmit} onReset={handleReset} className="w-full">
      <label>
        <h2 className="mb-2 text-xl font-semibold">Paste User Emails</h2>
        <textarea
          id="userEmails"
          name="userEmails"
          ref={userEmailsRef}
          rows={5}
          cols={80}
          className="block w-full border-2"
        />
      </label>
      <span className="mt-2 flex justify-end gap-2">
        <button type="submit" className="rounded-md border-2 px-2">
          Add
        </button>
        <button type="reset" className="rounded-md border-2 px-2">
          Clear
        </button>
      </span>
      <output htmlFor="userEmails" className="text-red-700">
        {errors?.map((err, idx) => (
          <div key={idx}>{err}</div>
        ))}
      </output>
    </form>
  );
};

export default UserEmailsInput;
