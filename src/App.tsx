import { useEffect, useCallback, useState } from 'react';
import UserEmailsInput from './UserEmailsInput';
import { ParsedUser } from './parseUserEmails';
import DefineUsers from './DefineUsers';
import SelectProject from './SelectProject';
import ExistingTeam from './ExistingTeam';
import { ProjectDetailsComponent } from './api/types';
import { getProjectContainer } from './api';
import { type DB, insertAllFromContainer, open } from './db';
import AppHeader from './AppHeader';

function App() {
  const [db, setDb] = useState(undefined as DB | undefined);

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

  const [containerIsAddedToDb, setContainerIsAddedToDb] = useState(false);

  useEffect(() => {
    let ignore = false;

    let closeDb = (): undefined | void => undefined;

    if (selectedProject) {
      const projectEntityId = selectedProject.entityId;

      open(projectEntityId)
        .then((openedDb) => {
          setDb(openedDb);
          closeDb = () => openedDb.close();

          const container = getProjectContainer(projectEntityId);

          return insertAllFromContainer(openedDb, container);
        })
        .then(() => {
          if (!ignore) {
            setContainerIsAddedToDb(true);
          }
        });

      return () => {
        ignore = true;
        closeDb();
      };
    } else {
      setDb((db) => {
        db && db.close;
        return undefined;
      });

      setContainerIsAddedToDb(false);
    }
  }, [selectedProject]);

  return (
    <>
      <AppHeader />
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
          <ExistingTeam
            project={selectedProject}
            containerIsAddedToDb={containerIsAddedToDb}
            db={db}
          />
        </div>
      </main>
    </>
  );
}

export default App;
