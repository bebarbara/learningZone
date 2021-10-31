import { useState } from 'react';

export default function useCurrentUser() {
  function getCurrentUser(attribute) {
    const userStored = sessionStorage.getItem('current-user');
    const userParsed = JSON.parse(userStored);
    switch (attribute) {
      case 'id':
        return userParsed?.id;
      case 'token':
        return userParsed?.token;
      case 'type':
        return userParsed?.type;
      default:
        return userParsed || null;
    }
  }

  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  const saveCurrentUser = (currentUser) => {
    sessionStorage.setItem('current-user', JSON.stringify(currentUser));
    setCurrentUser(currentUser);
  };

  return {
    setCurrentUser: saveCurrentUser,
    currentUser
  };
}
