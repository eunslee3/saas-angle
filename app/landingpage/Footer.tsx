import React from 'react';
export const Footer = () => {
  return <footer className="py-12 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Beachhead
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Beachhead helps you discover your next business idea — fast.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {['Privacy', 'Terms', 'Contact'].map(item => <li key={item}>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Connect
              </h3>
              <ul className="space-y-3">
                {['Twitter', 'GitHub', 'Discord'].map(item => <li key={item}>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Built with love by a solo founder ❤️
          </p>
        </div>
      </div>
    </footer>;
};