import React, { useState, forwardRef } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  className,
  type,
  showPasswordToggle,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  return <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="relative">
          <input ref={ref} type={inputType} className={`
              w-full px-4 py-2.5 rounded-lg border bg-white/50 dark:bg-gray-900/50
              text-gray-900 dark:text-white text-base
              placeholder:text-gray-500 dark:placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
              hover:border-gray-400 dark:hover:border-gray-500
              transition-all duration-200
              backdrop-blur-sm
              ${showPasswordToggle ? 'pr-12' : ''}
              ${error ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}
              ${className}
            `} {...props} />
          {showPasswordToggle && <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
              {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>}
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>;
});
Input.displayName = 'Input';