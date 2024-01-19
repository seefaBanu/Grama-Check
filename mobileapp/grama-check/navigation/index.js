import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserStack from './userStack';
import AuthStack from './authStack';

export default function () {
  const { user } = useContext(AuthContext);
  if (!user) return <AuthStack />;
  return <UserStack user={user} />;
}
