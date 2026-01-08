/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

function App() {
  const [screen, setScreen] = useState<'Login' | 'Register' | 'Dashboard'>(
    'Login',
  );

  const handleNavigate = (to: 'Login' | 'Register' | 'Dashboard') =>
    setScreen(to);

  if (screen === 'Dashboard') {
    return <Dashboard onNavigate={handleNavigate} />;
  }

  return screen === 'Login' ? (
    <Login onNavigate={handleNavigate} />
  ) : (
    <Register onNavigate={handleNavigate} />
  );
}

export default App;
