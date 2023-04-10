import { useState } from 'react';
import UserEmailsInput from './UserEmailsInput';
import { ParsedUser } from './parseUserEmails';
import DefineUsers from './DefineUsers';
import SelectProject from './SelectProject';
import ExistingTeam from './ExistingTeam';
import DarkModeToggle from './DarkModeToggle';
import hokLogo from './assets/hokLogo.svg';

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
    <>
      <div className="sticky top-0 z-10 border-b bg-slate-100 py-1 dark:bg-slate-800">
        {/* <header className="flex flex-col items-start justify-between pl-4 sm:flex-row sm:items-center"> */}
        <header className="flex flex-row items-center justify-between pl-4">
          <span className="flex">
            <img src={hokLogo} className="mr-4 h-8 w-8" alt="HOK logo" />
            <h1 className="mb-2 self-start whitespace-nowrap text-2xl font-semibold">
              Trajectory Next
            </h1>
          </span>
          {/* <span className="mx-2 my-2 sm:mx-0 sm:my-0"> */}
          <span>
            <DarkModeToggle />
          </span>
        </header>
      </div>
      <main className="container flex grow flex-col gap-6 pb-16 pt-4">
        <SelectProject
          setSelectedProject={setSelectedProject}
          selectedProject={selectedProject}
        />
        <UserEmailsInput
          enabled={!!selectedProject}
          setParsedUsers={setParsedUsers}
        />
        <DefineUsers enabled={!!selectedProject} parsedUsers={parsedUsers} />
        <ExistingTeam existingUsers={[]} />
      </main>
    </>
  );
}

export default App;
