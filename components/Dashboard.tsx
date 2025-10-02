import React, { useState } from 'react';
import { DashboardIcon } from './icons/DashboardIcon';
import { TransferIcon } from './icons/TransferIcon';
import { PaymentIcon } from './icons/PaymentIcon';
import { LockIcon } from './icons/LockIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { FundsTransfer } from './FundsTransfer';
import { Payments } from './Payments';
import { ChangePassword } from './ChangePassword';

interface DashboardProps {
    userFullName: string;
    onLogout: () => void;
}

type ActiveView = 'dashboard' | 'transfer' | 'payments' | 'password';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700/50 hover:text-white'}`}>
        {icon}
        <span className="font-medium">{label}</span>
    </button>
);

const DashboardHome: React.FC<{ userName: string }> = ({ userName }) => (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Welcome back, {userName}!</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
            This is your personal dashboard. You can manage your account, transfer funds, pay bills, and enhance your security settings from the navigation on the left.
        </p>
        <div className="mt-8 p-6 bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Getting Started</h3>
            <p className="text-blue-700 dark:text-blue-300">
                Select an option from the sidebar to begin. All your banking needs are just a click away.
            </p>
        </div>
    </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ userFullName, onLogout }) => {
    const [activeView, setActiveView] = useState<ActiveView>('dashboard');
    
    const renderContent = () => {
        switch (activeView) {
            case 'transfer':
                return <FundsTransfer />;
            case 'payments':
                return <Payments />;
            case 'password':
                return <ChangePassword />;
            case 'dashboard':
            default:
                return <DashboardHome userName={userFullName.split(' ')[0]} />;
        }
    }

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-800 text-white flex flex-col p-4">
                <div className="text-2xl font-bold mb-10 px-2">BlueBank</div>
                <nav className="flex-grow space-y-2">
                    <NavItem icon={<DashboardIcon />} label="Dashboard" isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
                    <NavItem icon={<TransferIcon />} label="Funds Transfer" isActive={activeView === 'transfer'} onClick={() => setActiveView('transfer')} />
                    <NavItem icon={<PaymentIcon />} label="Payments" isActive={activeView === 'payments'} onClick={() => setActiveView('payments')} />
                    <NavItem icon={<LockIcon />} label="Change Password" isActive={activeView === 'password'} onClick={() => setActiveView('password')} />
                </nav>
                <div>
                     <NavItem icon={<LogoutIcon />} label="Logout" isActive={false} onClick={onLogout} />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};
