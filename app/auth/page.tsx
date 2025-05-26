'use client'

import React, { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { Navbar } from '@/components/no-auth-navbar';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => setIsLogin(!isLogin);
  
  return (
    <>
    <Navbar />
    <AuthLayout title={isLogin ? 'Welcome back' : 'Create an account'} subtitle={isLogin ? 'Continue building your next successful product' : 'Start building your next successful product'}>
      {isLogin ? <LoginForm onSignUpClick={toggleForm} /> : <SignupForm onSignInClick={toggleForm} />}
    </AuthLayout>
    </>
  );
}