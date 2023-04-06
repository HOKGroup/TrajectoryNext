import { useCallback, useEffect, useState } from 'react';
import { ParsedUser } from './parseUserEmails';

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
    <div className="mb-6">
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
            <tr
              className="border-2 odd:bg-white even:bg-slate-100"
              key={user.emailAddress}
            >
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
      <span className="mt-4 flex justify-end gap-4">
        <button
          type="submit"
          disabled={!enabled}
          className="rounded-md bg-blue-500 px-4 py-1 text-white outline-none enabled:hover:bg-blue-600 enabled:focus:ring enabled:focus:ring-blue-400 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          Submit
        </button>
        <button
          type="reset"
          disabled={!enabled || !users.length} // TODO: check whether all fields are complete for each user
          onClick={handleCancel}
          className="rounded-md bg-yellow-500 px-4 py-1 text-white outline-none enabled:hover:bg-yellow-400 enabled:focus:ring enabled:focus:ring-yellow-400 disabled:cursor-not-allowed disabled:bg-yellow-400"
        >
          Cancel
        </button>
      </span>
    </div>
  );
};

export default DefineUsers;
