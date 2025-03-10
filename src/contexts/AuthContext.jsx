// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing auth state on initial load
  useEffect(() => {
    const checkAuth = () => {
      console.log('Checking initial authentication state');
      const savedAuth = localStorage.getItem('isAuthenticated');
      const savedUser = localStorage.getItem('user');
      
      console.log('Saved Auth:', savedAuth);
      console.log('Saved User:', savedUser);
      
      if (savedAuth === 'true' && savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setCurrentUser(user);
          setIsAuthenticated(true);
          console.log('Restored user from storage:', user);
        } catch (err) {
          console.error('Error parsing saved user:', err);
          // Clear invalid stored data
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    console.log('Login attempt:', { email, password });
    
    // Reset previous errors
    setError(null);

    // Validate input
    if (!email || !password) {
      const errorMsg = 'Email and password are required';
      console.error(errorMsg);
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      // Simulate API call with Promise
      const user = await new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('Checking credentials');
          if (email === 'admin@samridhimart.com' && password === 'admin123') {
            const userData = {
              name: 'Admin User',
              email: email,
              role: 'admin'
            };
            console.log('Login successful');
            resolve(userData);
          } else {
            console.log('Login failed');
            reject(new Error('Invalid email or password'));
          }
        }, 1000);
      });

      // Set authentication state
      setCurrentUser(user);
      setIsAuthenticated(true);
      setError(null);

      // Persist authentication
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(user));

      console.log('User authenticated:', user);
      return user;
    } catch (err) {
      // Handle login error
      console.error('Login error:', err.message);
      setError(err.message);
      setIsAuthenticated(false);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    console.log('Logging out');
    // Clear user data
    setCurrentUser(null);
    setIsAuthenticated(false);
    setError(null);

    // Remove stored authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;