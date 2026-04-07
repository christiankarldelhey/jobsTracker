import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3 } from 'lucide-react';

export const AuthScreen = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const { signIn, signUp } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    await signIn({ email, password });
  };

  const handleRegister = async (email: string, password: string) => {
    await signUp({ email, password });
  };

  const handleForgotPassword = () => {
    setMode('forgot');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Job Skills Tracker
            </h1>
          </div>
          <p className="text-gray-600">
            Analiza ofertas, descubre tecnologías y trackea tus aplicaciones
          </p>
        </div>

        {mode === 'login' && (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setMode('register')}
            onForgotPassword={handleForgotPassword}
          />
        )}

        {mode === 'register' && (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setMode('login')}
          />
        )}

        {mode === 'forgot' && (
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Recuperar Contraseña
            </h2>
            <p className="text-gray-600 mb-6">
              Esta funcionalidad estará disponible una vez configuremos AWS Cognito.
            </p>
            <button
              onClick={() => setMode('login')}
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              Volver a Iniciar Sesión
            </button>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>100% gratis • Sin límites • Tus datos seguros en AWS</p>
        </div>
      </div>
    </div>
  );
};
