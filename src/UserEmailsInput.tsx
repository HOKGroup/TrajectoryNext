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
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <label>
        Paste User Emails
        <textarea
          id="userEmails"
          name="userEmails"
          ref={userEmailsRef}
          rows={10}
          cols={80}
        />
      </label>
      <button type="submit">Add</button>
      <button type="reset">Clear</button>
      <output htmlFor="userEmails">
        {errors?.map((err) => `Invalid input: ${err}`)}
      </output>
    </form>
  );
};

export default UserEmailsInput;
