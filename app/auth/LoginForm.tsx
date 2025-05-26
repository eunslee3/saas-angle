'use client'

import React, { useState } from 'react';
import { Input } from './Input';
import { OAuthButtons } from './OAuthButtons';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

interface LoginFormProps {
  onSignUpClick: () => void;
}

export const LoginForm = ({
  onSignUpClick
}: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async ({ email, password, rememberMe }: { email: string; password: string; rememberMe: boolean }) => {
      const res = await axios.post('/api/auth/login', {
        email,
        password,
        rememberMe
      })

      return res.data
    },
    onSuccess: () => {
      router.push('/')
    },
    onError: (err: AxiosError<any>) => {
      console.log(err)
      setError(err.response?.data?.error || "An error occurred")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    mutation.mutate({ email, password, rememberMe })
  }

  return <div className="space-y-8">
      <OAuthButtons />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400 backdrop-blur-sm">
            or continue with email
          </span>
        </div>
      </div>
      <form className="space-y-5">
        <Input onChange={(e) => setEmail(e.target.value)} value={email} label="Email address" type="email" placeholder="you@example.com" required />
        <div className="space-y-5">
          <Input onChange={(e) => setPassword(e.target.value)} value={password} label="Password" type="password" placeholder="Enter your password" required showPasswordToggle />
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input onClick={() => setRememberMe(!rememberMe)} type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500/20 dark:bg-gray-900/50" />
              <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                Remember me
              </span>
            </label>
            <button type="button" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
              Forgot password?
            </button>
          </div>
        </div>
        <button onClick={handleSubmit} type="submit" className="w-full px-4 py-3 mt-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 hover:scale-[1.02] animate-gradient font-medium">
          Start building securely →
        </button>
        {error ? <p className="text-sm text-red-500 mt-2">{error}</p> : null}
      </form>
      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        Don't have an account?{' '}
        <button onClick={onSignUpClick} type="button" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
          Sign up for free →
        </button>
      </p>
    </div>;
};