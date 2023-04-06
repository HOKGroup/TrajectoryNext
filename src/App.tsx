import { useState } from 'react';
import UserEmailsInput from './UserEmailsInput';
import { ParsedUser } from './parseUserEmails';
import DefineUsers from './DefineUsers';

function App() {
  const [parsedUsers, setParsedUsers] = useState([] as ParsedUser[]);

  return (
    <main className="container mx-auto my-5">
      <h1 className="my-4 text-2xl font-bold">Trajectory Next</h1>
      <UserEmailsInput setParsedUsers={setParsedUsers} />
      <DefineUsers parsedUsers={parsedUsers} />
    </main>
  );
}

export default App;
