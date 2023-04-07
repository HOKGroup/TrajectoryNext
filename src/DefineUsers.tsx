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
      <table className="w-full text-left">
        <thead>
          <tr className="bg-black text-white">
            <th scope="col" className="p-2">
              First
            </th>
            <th scope="col" className="p-2">
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
              className="border-2 odd:bg-white even:bg-slate-100"
              key={user.emailAddress}
            >
              <td className="flex justify-between p-2">
                {user.firstName}
                <button onClick={() => swapFirstAndLastName(idx)}>
                  {'<>'}
                </button>
              </td>
              <td className="p-2">{user.lastName}</td>
              <td className="p-2">{user.emailAddress}</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
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
          buttonType={ButtonType.Secondary}
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
