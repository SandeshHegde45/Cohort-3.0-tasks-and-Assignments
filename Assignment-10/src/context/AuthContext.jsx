import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const USERS_STORAGE_KEY = "sm_users";
const SESSION_STORAGE_KEY = "sm_session";

function getStoredUsers() {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  return [];
}

function getStoredSession() {
  const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
  if (storedSession) {
    return JSON.parse(storedSession);
  }
  return null;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getStoredSession);

  function registerUser(name, email, password) {
    const existingUsers = getStoredUsers();
    const emailAlreadyUsed = existingUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
    if (emailAlreadyUsed) {
      throw new Error("An account with that email already exists.");
    }
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
      avatar: name.charAt(0).toUpperCase(),
      joinedAt: new Date().toISOString(),
    };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    return newUser;
  }

  function loginUser(email, password) {
    const existingUsers = getStoredUsers();
    const matchedUser = existingUsers.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );
    if (!matchedUser) {
      throw new Error("That email and password don't match any account.");
    }
    const session = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      avatar: matchedUser.avatar,
      joinedAt: matchedUser.joinedAt,
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    setCurrentUser(session);
    return session;
  }

  function logoutUser() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    registerUser,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
