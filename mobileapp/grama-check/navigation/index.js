import React from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import { useAuth } from '../auth';
export default function () {
  const { user } = useAuth();
  console.log('user', user);
  if (!user) return <AuthStack />;
  return <UserStack user={user} />;
}
