import React from 'react';
import Converter from '../../components/Converter';
import CountYourBudget from '../../components/CountYourBudget';

const Homepage = () => {
    return (
        <div>
            <h1 className="text-center mb-6">Try out our currency converter!</h1>
            <Converter />
            <CountYourBudget />
        </div>
    );
};

export default Homepage;
