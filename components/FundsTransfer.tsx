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

export const FundsTransfer: React.FC = () => {
    const [formData, setFormData] = useState({ recipient: '', amount: '', reference: '' });
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

        if (parseFloat(formData.amount) <= 0 || !formData.recipient) {
            setError('Please enter a valid recipient and an amount greater than zero.');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setSuccess(`Successfully transferred $${formData.amount} to ${formData.recipient}.`);
            setFormData({ recipient: '', amount: '', reference: '' });
        }, 1500);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Funds Transfer</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Send money to anyone, instantly and securely.</p>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <InputField id="recipient" label="Recipient's Name or Account Number" type="text" value={formData.recipient} onChange={handleChange} />
                    <InputField id="amount" label="Amount ($)" type="number" value={formData.amount} onChange={handleChange} />
                    <InputField id="reference" label="Reference (Optional)" type="text" value={formData.reference} onChange={handleChange} />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:bg-blue-400"
                    >
                        {isLoading ? 'Sending...' : 'Send Money'}
                    </button>
                </form>
            </div>
        </div>
    );
};
