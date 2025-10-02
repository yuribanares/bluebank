import React from 'react';
import type { Feature } from '../types';

export const FeatureCard: React.FC<Feature> = ({ icon, title, description }) => {
    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-blue-100">{description}</p>
            </div>
        </div>
    );
};
