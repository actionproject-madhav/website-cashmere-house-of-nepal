import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  
  // Use current origin instead of hardcoded URL
  const redirectUri = window.location.origin;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || '/');
  };

  if (!(domain && clientId)) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Auth0 Configuration Error</h3>
        <p>Please check your environment variables:</p>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>VITE_AUTH0_DOMAIN: {domain ? '✓' : '✗'}</li>
          <li>VITE_AUTH0_CLIENT_ID: {clientId ? '✓' : '✗'}</li>
          <li>REDIRECT_URI: {redirectUri}</li>
        </ul>
      </div>
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;