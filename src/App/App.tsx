import React from "react";
import { TaskProvider } from "../contexts/TaskContextApi";
import { UserProvider } from "../contexts/UserContextApi";
import Header from "../components/Header";
import Tasks from "../pages/Task/Tasks";
import "./App.css";

function App() {
  return (
    <div className="">
      <Header />
      <TaskProvider>
        <UserProvider>
          <Tasks />
        </UserProvider>
      </TaskProvider>
    </div>
  );
}

export default App;
