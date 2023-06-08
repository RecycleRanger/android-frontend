import { createContext, ReactNode, useReducer } from 'react';

import { CurrentUsrType } from "./custom-types/UserTypes"


export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

interface Props {
  children?: ReactNode;
}

export function UserProvider({ children }: Props) {
  const [user, dispatch] = useReducer(
    userReducer,
    initialUser,
  );

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

function userReducer(user: CurrentUsrType, action) {
  switch (action.type) {
    case 'added': {
      return [...user, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return user.map(t => {
        if (t.id === action.user.id) {
          return action.user;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return user.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialUser: CurrentUsrType = {
  user: {
    id: 
    },
  type: 1
}
