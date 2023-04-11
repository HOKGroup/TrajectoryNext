import { useState } from 'react';
import UserEmailsInput from './UserEmailsInput';
import { ParsedUser } from './parseUserEmails';
import DefineUsers from './DefineUsers';
import SelectProject from './SelectProject';
import ExistingTeam from './ExistingTeam';
import DarkModeToggle from './DarkModeToggle';
import hokLogo from './assets/hokLogo.svg';
import { ProjectDetailsComponent } from './api/types';
import { services } from './api/mockData';

function App() {
  const [selectedProject, setSelectedProject] = useState(
    null as ProjectDetailsComponent | null
  );

  const [parsedUsers, setParsedUsers] = useState([] as ParsedUser[]);

  return (
    <>
      <div className="sticky top-0 z-10 border-b bg-slate-100 py-1 dark:bg-slate-800">
        <header className="my-1 flex flex-row items-center justify-between pl-4">
          <span className="flex items-center">
            <img src={hokLogo} className="mr-4 h-8 w-8" alt="HOK logo" />
            <h1 className="whitespace-nowrap text-2xl font-semibold">
              Trajectory Next
            </h1>
          </span>
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
        <ExistingTeam project={selectedProject} services={services} />
      </main>
    </>
  );
}

export default App;
