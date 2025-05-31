// pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  // Auto-subscribe to newsletter when user logs in
  useEffect(() => {
    const autoSubscribeToNewsletter = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const response = await fetch('https://website-cashmere-house-of-nepal-backend.onrender.com/api/newsletter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email
            })
          });

          const data = await response.json();
          
          if (response.ok) {
            if (response.status === 409) {
              // Already subscribed
              setSubscriptionStatus('Already subscribed to newsletter');
            } else {
              // New subscription
              setSubscriptionStatus('Successfully subscribed to newsletter!');
            }
          } else {
            // Handle error but don't show to user unless it's important
            console.log('Newsletter subscription note:', data.message);
            if (data.message === 'Email already subscribed') {
              setSubscriptionStatus('Already subscribed to newsletter');
            }
          }
        } catch (error) {
          console.error('Newsletter subscription error:', error);
          // Don't show error to user for newsletter subscription
        }
      }
    };

    autoSubscribeToNewsletter();
  }, [isAuthenticated, user?.email]);

  if (isLoading) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Please log in to view your profile</h2>
        <button 
          onClick={() => loginWithRedirect()}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '30px' , padding: '100px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Profile</h1>
      
      <div style={{ marginTop: '30px' }}>
        {user?.picture && (
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <img 
              src={user.picture} 
              alt="Profile" 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                border: '2px solid #ddd'
              }} 
            />
          </div>
        )}
        
        <div style={{ marginBottom: '20px' }}>
          <strong>Name:</strong> {user?.name || 'Not provided'}
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <strong>Email:</strong> {user?.email}
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <strong>Email Verified:</strong> {user?.email_verified ? 'Yes' : 'No'}
        </div>

        {/* Newsletter subscription status */}
        {subscriptionStatus && (
          <div style={{ 
            marginBottom: '20px', 
            padding: '10px', 
            backgroundColor: subscriptionStatus.includes('Successfully') ? '#d4edda' : '#f8f9fa',
            border: '1px solid ' + (subscriptionStatus.includes('Successfully') ? '#c3e6cb' : '#dee2e6'),
            borderRadius: '4px',
            color: subscriptionStatus.includes('Successfully') ? '#155724' : '#6c757d',
            fontSize: '14px'
          }}>
            📧 {subscriptionStatus}
          </div>
        )}
        
        <button 
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          style={{
            marginTop: '30px',
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;