import React, { useState } from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface RegistrationFormProps {
    onRegistrationSuccess: (fullName: string) => void;
}

const InputField: React.FC<{ id: string; label: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ id, label, type, value, onChange }) => {
    return (
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
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegistrationSuccess }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onRegistrationSuccess(formData.fullName);
        }, 2000);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Let's get you started with your new account.</p>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-8">
                <InputField id="fullName" label="Full Name" type="text" value={formData.fullName} onChange={handleChange} />
                <InputField id="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} />
                <InputField id="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
                <InputField id="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} />

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>
                                <span>Create Account</span>
                                <ArrowRightIcon />
                            </>
                        )}
                    </button>
                </div>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account? <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Sign in</a>
            </p>
        </div>
    );
};
