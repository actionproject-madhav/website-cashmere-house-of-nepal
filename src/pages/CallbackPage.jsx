import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const CallbackPage = () => {
  const { error } = useAuth0();

  if (error) {
    return (
      <div className="callback-container">
        <h2>Authentication Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="callback-container">
      <div className="spinner"></div>
      <p>Completing login...</p>
    </div>
  );
};

export default CallbackPage;