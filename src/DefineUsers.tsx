import { useCallback, useEffect, useState } from 'react';
import { ParsedUser } from './parseUserEmails';
import Button, { ButtonType } from './components/Button';

interface Props {
  enabled: boolean;
  parsedUsers: Array<ParsedUser>;
}

const DefineUsers: React.FC<Props> = ({ enabled, parsedUsers }) => {
  const [users, setUsers] = useState(parsedUsers);

  useEffect(() => {
    setUsers(parsedUsers);
  }, [parsedUsers]);

  const swapFirstAndLastName = useCallback((idx: number) => {
    setUsers((users) => {
      const newUsers = [...users];

      newUsers[idx] = {
        ...newUsers[idx],
        firstName: newUsers[idx].lastName,
        lastName: newUsers[idx].firstName,
      };

      return newUsers;
    });
  }, []);

  const handleCancel = useCallback(() => {
    setUsers([]);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-xl font-semibold">Define Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-2 border-slate-950 bg-slate-950 text-slate-50 dark:border-slate-50 dark:bg-slate-50 dark:text-slate-950">
              <th scope="col" className="p-2">
                First
              </th>
              <th scope="col"></th>
              <th scope="col" className="border-r-2 p-2">
                Last
              </th>
              <th scope="col" className="p-2">
                Email
              </th>
              <th scope="col" className="p-2">
                Discipline
              </th>
              <th scope="col" className="p-2">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                className="border-2 odd:bg-white even:bg-slate-100 dark:odd:bg-slate-800 dark:even:bg-slate-900"
                key={user.emailAddress}
              >
                <td className="p-2">{user.firstName}</td>
                <td className="p-2">
                  <Button
                    buttonType={ButtonType.Secondary}
                    className="!p-1 text-sm font-extrabold"
                    onClick={() => swapFirstAndLastName(idx)}
                  >
                    {'<>'}
                  </Button>
                </td>
                <td className="border-r-2 p-2">{user.lastName}</td>
                <td className="p-2">{user.emailAddress}</td>
                <td className="p-2"></td>
                <td className="p-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className="mt-4 flex justify-between gap-4 md:justify-start">
        <Button
          buttonType={ButtonType.Primary}
          type="submit"
          disabled={!enabled || !users.length} // TODO: check whether all fields are complete for each user
          className="order-last grow md:order-1 md:grow-0"
        >
          Submit
        </Button>
        <Button
          buttonType={ButtonType.Warning}
          type="reset"
          disabled={!enabled || !users.length}
          onClick={handleCancel}
          className="order-first grow md:order-2 md:grow-0"
        >
          Cancel
        </Button>
      </span>
    </div>
  );
};

export default DefineUsers;
