import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LogoFull } from '../components/logo';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  
  const navigate = useNavigate();
  const { login, error: authContextError } = useAuth();

  // Log any authentication errors
  useEffect(() => {
    if (authContextError) {
      console.error('Auth Context Error:', authContextError);
      setLocalError(authContextError);
    }
  }, [authContextError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError('');
    
    try {
      console.log('Attempting login with:', email);
      
      // Use the login method from AuthContext
      const result = await login(email, password);
      
      console.log('Login result:', result);
      
      // Navigate to dashboard on successful login
      navigate('/');
    } catch (loginError) {
      console.error('Login failed:', loginError);
      setLocalError(loginError.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-600 dark:to-primary-800 p-4">
      <div 
        className="w-full max-w-md bg-white dark:bg-primary-700 rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in"
      >
        <div className="text-center">
          <LogoFull className="mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-primary dark:text-white">Admin Login</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
            Sign in to manage your Samridhi Mart system
          </p>
        </div>
        
        {(localError || authContextError) && (
          <div 
            className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-md"
          >
            {localError || authContextError}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-primary-600 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary 
                         dark:bg-primary-800 dark:text-white"
            />
          </div>
          
          <div className="relative">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-primary-600 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary 
                         dark:bg-primary-800 dark:text-white pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 
                       bg-primary text-white rounded-md 
                       hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary 
                       transition-colors duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="animate-spin mr-2">🔄</span>
            ) : (
              <LogIn className="mr-2" size={20} />
            )}
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <a 
            href="#" 
            className="text-sm text-primary hover:underline dark:text-primary-300"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;