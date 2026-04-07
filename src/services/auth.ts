import { Amplify } from 'aws-amplify';
import { signUp, signIn, signOut, getCurrentUser, fetchAuthSession, confirmSignUp, resendSignUpCode, resetPassword, confirmResetPassword } from 'aws-amplify/auth';

// Esta configuración se llenará cuando configures AWS Amplify
// Por ahora está vacía, la completaremos después
export const configureAuth = (config: any) => {
  Amplify.configure(config);
};

export interface AuthUser {
  userId: string;
  email: string;
  emailVerified: boolean;
}

export interface SignUpParams {
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

// Registrar nuevo usuario
export const authSignUp = async ({ email, password }: SignUpParams) => {
  try {
    const { userId, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });

    return {
      success: true,
      userId,
      nextStep,
    };
  } catch (error: any) {
    console.error('Error signing up:', error);
    throw new Error(error.message || 'Error al registrarse');
  }
};

// Confirmar código de verificación de email
export const authConfirmSignUp = async (email: string, code: string) => {
  try {
    await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error confirming sign up:', error);
    throw new Error(error.message || 'Error al confirmar código');
  }
};

// Reenviar código de verificación
export const authResendCode = async (email: string) => {
  try {
    await resendSignUpCode({ username: email });
    return { success: true };
  } catch (error: any) {
    console.error('Error resending code:', error);
    throw new Error(error.message || 'Error al reenviar código');
  }
};

// Iniciar sesión
export const authSignIn = async ({ email, password }: SignInParams) => {
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    });

    if (!isSignedIn) {
      throw new Error('No se pudo iniciar sesión');
    }

    const user = await getCurrentUser();
    return {
      success: true,
      user,
      nextStep,
    };
  } catch (error: any) {
    console.error('Error signing in:', error);
    throw new Error(error.message || 'Error al iniciar sesión');
  }
};

// Cerrar sesión
export const authSignOut = async () => {
  try {
    await signOut();
    return { success: true };
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw new Error(error.message || 'Error al cerrar sesión');
  }
};

// Obtener usuario actual
export const authGetCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const user = await getCurrentUser();
    const session = await fetchAuthSession();
    
    return {
      userId: user.userId,
      email: user.signInDetails?.loginId || '',
      emailVerified: true,
    };
  } catch (error) {
    return null;
  }
};

// Obtener token de autenticación
export const authGetToken = async (): Promise<string | null> => {
  try {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString() || null;
  } catch (error) {
    return null;
  }
};

// Resetear contraseña (enviar código)
export const authResetPassword = async (email: string) => {
  try {
    const output = await resetPassword({ username: email });
    return {
      success: true,
      nextStep: output.nextStep,
    };
  } catch (error: any) {
    console.error('Error resetting password:', error);
    throw new Error(error.message || 'Error al resetear contraseña');
  }
};

// Confirmar nueva contraseña con código
export const authConfirmResetPassword = async (
  email: string,
  code: string,
  newPassword: string
) => {
  try {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error confirming reset password:', error);
    throw new Error(error.message || 'Error al confirmar nueva contraseña');
  }
};
