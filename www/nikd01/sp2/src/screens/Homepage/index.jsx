import React from 'react';
import Converter from '../../components/Converter';

const Homepage = () => {
    return (
        <div>
            <h1 className="text-center mb-6">Try out our currency converter!</h1>
            <Converter />
        </div>
    );
};

export default Homepage;
