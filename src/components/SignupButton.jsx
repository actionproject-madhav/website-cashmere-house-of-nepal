import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button 
      className="auth-btn signup-btn"
      onClick={() => loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup'
        }
      })}
      style={{
        padding: '8px 16px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s'
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
    >
      Sign Up
    </button>
  );
};

export default SignupButton;