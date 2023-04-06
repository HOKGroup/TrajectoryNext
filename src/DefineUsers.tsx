import { useCallback, useEffect, useState } from 'react';
import { ParsedUser } from './parseUserEmails';

interface Props {
  parsedUsers: Array<ParsedUser>;
}

const DefineUsers: React.FC<Props> = ({ parsedUsers }) => {
  const [users, setUsers] = useState(parsedUsers);

  useEffect(() => {
    setUsers(parsedUsers);
  }, [parsedUsers]);

  const swapFirstAndLastName = useCallback((idx: number) => {
    console.log('IDX: ', idx);
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

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Define Users</h2>
      <table className="text-md w-full text-left">
        <thead>
          <tr className="bg-black text-white">
            <th scope="col" className="px-2 py-2">
              First
            </th>
            <th scope="col" className="px-2 py-2">
              Last
            </th>
            <th scope="col" className="px-2 py-2">
              Email
            </th>
            <th scope="col" className="px-2 py-2">
              Discipline
            </th>
            <th scope="col" className="px-2 py-2">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr className="border-2 odd:bg-slate-50" key={user.emailAddress}>
              <td className="flex justify-between px-2 py-2">
                {user.firstName}
                <button onClick={() => swapFirstAndLastName(idx)}>
                  {'<>'}
                </button>
              </td>
              <td className="px-2 py-2">{user.lastName}</td>
              <td className="px-2 py-2">{user.emailAddress}</td>
              <td className="px-2 py-2"></td>
              <td className="px-2 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="mt-2 flex justify-end gap-2">
        <button type="submit" className="rounded-md border-2 px-2">
          Submit
        </button>
        <button type="reset" className="rounded-md border-2 px-2">
          Cancel
        </button>
      </span>
    </div>
  );
};

export default DefineUsers;
