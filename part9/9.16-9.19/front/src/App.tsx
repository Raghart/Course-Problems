import Header from "./components/Header";
import { useState } from "react";
import { useEffect } from "react";
import { getAllEntries } from "./components/service/DiaryService";
import { EntryType } from "./types/types";
import Entries from "./components/Entries";
import NewEntry from "./components/NewEntry";

const App = () => {
  const [entries, setEntries] = useState<EntryType[]>([])
  const [notification, setNotification] = useState('')

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  },[])

  return (
    <div>
      <Header title="Flight Diary Entries" />
      <Entries entries={entries} />
      <NewEntry entries={entries} setEntries={setEntries} notification={notification} setNotification={setNotification} />
    </div>
  );
};

export default App;
