import React, { useState } from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { FeatureCard } from './components/FeatureCard';
import { TransferIcon } from './components/icons/TransferIcon';
import { PaymentIcon } from './components/icons/PaymentIcon';
import { LockIcon } from './components/icons/LockIcon';
import type { Feature } from './types';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userFullName, setUserFullName] = useState('');

  const handleRegistrationSuccess = (fullName: string) => {
    setUserFullName(fullName);
    setIsRegistered(true);
  };

  const handleLogout = () => {
    setIsRegistered(false);
    setUserFullName('');
  };

  const features: Feature[] = [
    {
      icon: <TransferIcon />,
      title: 'Seamless Funds Transfer',
      description: 'Instantly send and receive money with just a few taps. Secure, fast, and reliable transactions at your fingertips.'
    },
    {
      icon: <PaymentIcon />,
      title: 'Effortless Payments',
      description: 'Pay your bills, manage subscriptions, and shop online with our integrated payment system. It\'s convenience redefined.'
    },
    {
      icon: <LockIcon />,
      title: 'Advanced Security',
      description: 'Protect your account with multi-factor authentication and easily manage your password and security settings.'
    }
  ];

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
            
            {/* Left Side: Features */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 bg-blue-600 text-white flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">Join BlueBank Today Pre!</h1>
              <p className="text-lg text-blue-100 mb-8">Experience the future of digital banking. Secure, intuitive, and built for you.</p>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 flex items-center justify-center">
              <div className="w-full max-w-md">
                <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return <Dashboard userFullName={userFullName} onLogout={handleLogout} />;
};

export default App;
