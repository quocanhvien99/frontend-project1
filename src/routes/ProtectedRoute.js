import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isLogin } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={({ location }) => 
                isLogin ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
        }
        />
    )
}

export default ProtectedRoute;