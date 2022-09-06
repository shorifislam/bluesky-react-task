import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContextApi = React.createContext([]);

export function useUsers() {
  return useContext(UserContextApi);
}

export function UserProvider({ children }: any) {
  const [users, setUsers] = useState([]);

  //  Retrieve users from the server.ts 
  const retrieveUsers = async () => {
    //  GET REQUEST api/users
    const response = await axios.get('api/users');
    return response.data.users;
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setUsers(allUsers);
    };

    getAllUsers();
  }, []);

  return <UserContextApi.Provider value={users}>{children}</UserContextApi.Provider>;
}
