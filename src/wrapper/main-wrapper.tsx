import React from 'react';

const MainWrapper = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <div>
                <p>Hello</p>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default MainWrapper;
