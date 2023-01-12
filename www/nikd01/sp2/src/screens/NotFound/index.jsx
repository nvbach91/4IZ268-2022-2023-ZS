import React from 'react';
import notFoundImage from '../../assets/images/404-image.svg';
import { useNavigate } from 'react-router-dom';
import { REACT_URL_HOME } from '../../core/routes/constants';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center">
            <img src={notFoundImage} alt="Not found" className="w-96" />
            <span className="text-2xl">Looks like you ended up in the wrong place...</span>
            <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-6"
                onClick={() => {
                    navigate(REACT_URL_HOME);
                }}
            >
                Go back to homepage
            </button>
        </div>
    );
};

export default NotFound;
