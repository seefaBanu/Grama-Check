import React from 'react';
// import UserStack from './userStack';
import AuthStack from './authStack';

export default function () {
  const user = null;
  if (!user) return <AuthStack />;
  // return <UserStack user={user} />;
}
