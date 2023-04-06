import { useState } from 'react';
import UserEmailsInput from './UserEmailsInput';
import { ParsedUser } from './parseUserEmails';
import DefineUsers from './DefineUsers';
import SelectProject from './SelectProject';

interface Project {
  id: string;
  name: string;
}

function App() {
  const [selectedProject, setSelectedProject] = useState(
    null as Project | null
  );

  const [parsedUsers, setParsedUsers] = useState([] as ParsedUser[]);

  return (
    <main className="container mx-auto my-5">
      <h1 className="my-4 text-2xl font-bold">Trajectory Next</h1>
      <SelectProject
        setSelectedProject={setSelectedProject}
        selectedProject={selectedProject}
      />
      <UserEmailsInput
        enabled={!!selectedProject}
        setParsedUsers={setParsedUsers}
      />
      <DefineUsers enabled={!!selectedProject} parsedUsers={parsedUsers} />
    </main>
  );
}

export default App;
