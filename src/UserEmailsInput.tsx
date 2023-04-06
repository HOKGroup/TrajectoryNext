import { FormEvent, useCallback, useRef, useState } from 'react';
import { parseUserEmails } from './parseUserEmails';

const UserEmailsInput: React.FC = () => {
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
    }
  }, []);

  const handleReset = useCallback(() => {
    setErrors(undefined);
  }, []);

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className="w-full">
      <label className="block">
        <h2 className="mb-2 text-lg font-semibold">Paste User Emails</h2>
        <textarea
          id="userEmails"
          name="userEmails"
          ref={userEmailsRef}
          rows={5}
          cols={80}
          className="mb-2 w-full border-2"
        />
      </label>
      <span className="flex select-none justify-end gap-2">
        <button type="submit" className="rounded-md border-2 px-2">
          Add
        </button>
        <button type="reset" className="rounded-md border-2 px-2">
          Clear
        </button>
      </span>
      <output htmlFor="userEmails">
        {errors?.map((err) => `Invalid input: ${err}`)}
      </output>
    </form>
  );
};

export default UserEmailsInput;
