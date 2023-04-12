import { useCallback, useState } from 'react';
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

  const addParsedUsers = useCallback((newParsedUsers: ParsedUser[]) => {
    setParsedUsers((parsedUsers) => [...parsedUsers, ...newParsedUsers]);
  }, []);

  const clearParsedUsers = useCallback(() => {
    setParsedUsers([]);
  }, []);

  return (
    <>
      <header className="flex flex-row items-center justify-between border-b bg-slate-100 py-2 pl-4 dark:bg-slate-800">
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
      <main className="grow overflow-y-auto pb-16 pt-4">
        <div className="container flex flex-col gap-6">
          <SelectProject
            setSelectedProject={setSelectedProject}
            selectedProject={selectedProject}
          />
          <UserEmailsInput
            enabled={!!selectedProject}
            addParsedUsers={addParsedUsers}
          />
          <DefineUsers
            enabled={!!selectedProject}
            parsedUsers={parsedUsers}
            clearParsedUsers={clearParsedUsers}
          />
          <ExistingTeam project={selectedProject} services={services} />
        </div>
      </main>
    </>
  );
}

export default App;
