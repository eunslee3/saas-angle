import React from 'react';
import { Input } from './Input';
import { OAuthButtons } from './OAuthButtons';
interface SignupFormProps {
  onSignInClick: () => void;
}
export const SignupForm = ({
  onSignInClick
}: SignupFormProps) => {
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
        <div className="grid grid-cols-2 gap-4">
          <Input label="First name" type="text" placeholder="John" required />
          <Input label="Last name" type="text" placeholder="Doe" required />
        </div>
        <Input label="Email address" type="email" placeholder="you@example.com" required />
        <div className="space-y-5">
          <Input label="Password" type="password" placeholder="Create a password" required showPasswordToggle />
          <Input label="Confirm password" type="password" placeholder="Confirm your password" required showPasswordToggle />
        </div>
        <div className="space-y-4">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input type="checkbox" required className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500/20 dark:bg-gray-900/50" />
            <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              I agree to the{' '}
              <button type="button" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                Privacy Policy
              </button>
            </span>
          </label>
        </div>
        <button type="submit" className="w-full px-4 py-3 mt-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 hover:scale-[1.02] animate-gradient font-medium">
          Create your account →
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{' '}
        <button onClick={onSignInClick} type="button" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
          Sign in →
        </button>
      </p>
    </div>;
};