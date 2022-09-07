import React from 'react'
const LoginLayout = ({children}) => {
    return (
        <div className="main-wrapper login-body">
            <div className="login-wrapper">
                <div className="container">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LoginLayout;