import React from 'react';

const NotificationPopup = ({ isVisible }) => {
    return (
        <>
            {isVisible && (
                <div className="absolute top-14 right-10 bg-white shadow-md rounded-md px-4 py-2 w-48">
                    <p className='text-center text-gray-500'>You don't have any notifications</p>
                </div>
            )}
        </>
    );
};

export default NotificationPopup;
