import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "slices/thunk";
import { Navigate } from "react-router-dom";
import { RootState } from "slices";
import { createSelector } from 'reselect';
import { useUserSession } from "hooks/useUserSession";

interface selectLogoutState {
    isUserLogout: boolean;
}

const Logout: React.FC = () => {

    const dispatch = useDispatch<any>();
    const { endSession } = useUserSession();
    const hasLoggedOut = useRef(false);

    const selectLogout = createSelector(
        (state: RootState) => state.Login as selectLogoutState,
        (login) => ({
            isUserLogout: login.isUserLogout
        })
    );

    const { isUserLogout } = useSelector(selectLogout);

    React.useEffect(() => {
        const handleLogout = async () => {
            if (hasLoggedOut.current) return;
            hasLoggedOut.current = true;

            try {
                // End the user session first
                await endSession();
                // Then call logout API
                dispatch(logoutUser());
            } catch (error) {
                console.error("Error during logout:", error);
                // Continue with logout even if session end fails
                dispatch(logoutUser());
            }
        };

        handleLogout();
    }, [dispatch]);

    return isUserLogout ? <Navigate to="/login" /> : null;
}

export default Logout;
