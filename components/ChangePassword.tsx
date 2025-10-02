import React, { useState } from 'react';

const InputField: React.FC<{ id: string; label: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ id, label, type, value, onChange }) => (
    <div className="relative">
        <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            className="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-transparent placeholder-transparent focus:outline-none focus:border-blue-500"
            placeholder={label}
            required
        />
        <label
            htmlFor={id}
            className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm"
        >
            {label}
        </label>
    </div>
);

export const ChangePassword: React.FC = () => {
    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        if (formData.newPassword !== formData.confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }

        if (formData.newPassword.length < 8) {
            setError('New password must be at least 8 characters long.');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setSuccess('Your password has been updated successfully.');
            setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        }, 1500);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Change Password</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">For your security, we recommend choosing a strong, unique password.</p>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <InputField id="currentPassword" label="Current Password" type="password" value={formData.currentPassword} onChange={handleChange} />
                    <InputField id="newPassword" label="New Password" type="password" value={formData.newPassword} onChange={handleChange} />
                    <InputField id="confirmNewPassword" label="Confirm New Password" type="password" value={formData.confirmNewPassword} onChange={handleChange} />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:bg-blue-400"
                    >
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};
