import React from 'react';

const Navigation = ({onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('sign_out')} className='f3 link dim white underline pa3 underline pointer'>Sign Out</p>
      </nav> 
    );
  } 
  else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('sign_in')} className='f3 link dim white underline pa3 underline pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='f3 link dim white underline pa3 underline pointer'>Register</p>
      </nav>
    )
  } 
};

export default Navigation;