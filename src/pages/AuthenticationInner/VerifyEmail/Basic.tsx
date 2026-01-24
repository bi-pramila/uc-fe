import React, { useEffect, useState } from "react";
import AuthIcon from "../AuthIcon";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "slices/thunk";
import { createSelector } from "reselect";

// Image
import logoLight from "assets/images/logo-light.png";
import logoDark from "assets/images/logo-dark.png";
import authEmail from 'assets/images/auth-email.png';
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const BasicEmailVerify = () => {

    document.title = "Verify Email | Tailwick - React Admin & Dashboard Template";

    const dispatch = useDispatch<any>();
    const navigation = useNavigate();
    const [searchParams] = useSearchParams();
    const [verificationAttempted, setVerificationAttempted] = useState(false);

    const selectRegisterData = createSelector(
        (state: any) => state.Register,
        (register) => ({
            verifying: register.verifying,
            verificationSuccess: register.verificationSuccess,
            verificationError: register.verificationError,
            message: register.message,
        })
    );

    const { verifying, verificationSuccess, verificationError, message } = useSelector(selectRegisterData);

    useEffect(() => {
        const bodyElement = document.body;
        bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zinc-800', 'dark:text-zinc-100', 'font-public');

        return () => {
            bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zinc-800', 'dark:text-zinc-100', 'font-public');
        }
    }, []);

    // Auto-verify on mount if token exists
    useEffect(() => {
        const token = searchParams.get('token');
        if (token && !verificationAttempted) {
            setVerificationAttempted(true);
            dispatch(verifyEmail(token));
        }
    }, [searchParams, dispatch, verificationAttempted]);

    return (
        <React.Fragment>
            <div className="relative">
                <AuthIcon />
                <div className="mb-0 w-screen lg:w-[500px] card shadow-lg border-none shadow-slate-100 dark:shadow-zinc-500/20 relative">
                    <div className="!px-10 !py-12 card-body">
                        <Link to="/">
                            <img src={logoLight} alt="" className="hidden h-6 mx-auto dark:block" />
                            <img src={logoDark} alt="" className="block h-18 mx-auto dark:hidden" />
                        </Link>

                        <div className="mt-8 text-center">
                            <h4 className="mb-1 text-fecustom-500 dark:text-fecustom-500">
                                {verifying ? "Verifying Email..." : verificationSuccess ? "Email Verified!" : "Verify Email"}
                            </h4>
                            
                            {verifying && (
                                <p className="mb-4 text-slate-500 dark:text-zinc-200">
                                    Please wait while we verify your email...
                                </p>
                            )}

                            {verificationSuccess && (
                                <div className="mb-4">
                                    <p className="text-green-600 dark:text-green-400">{message}</p>
                                    <p className="mt-2 text-slate-500 dark:text-zinc-200">
                                        Your email has been successfully verified. You can now login.
                                    </p>
                                </div>
                            )}

                            {verificationError && (
                                <div className="mb-4">
                                    <p className="text-red-600 dark:text-red-400">{verificationError}</p>
                                    <p className="mt-2 text-slate-500 dark:text-zinc-200">
                                        Please contact support for assistance.
                                    </p>
                                </div>
                            )}

                            {!verifying && !verificationSuccess && !verificationError && (
                                <p className="mb-4 text-slate-500 dark:text-zinc-200">
                                    Did you not receive an email? Please contact support.
                                </p>
                            )}

                            <button 
                                type="button" 
                                onClick={() => navigation("/login")} 
                                className="px-2 py-1.5 text-xs text-white transition-all duration-200 ease-linear btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20"
                                disabled={verifying}
                            >
                                {verificationSuccess ? "Login Now" : "Back to Login"}
                            </button>
                        </div>

                        <div className="pt-10 text-center">
                            <img src={authEmail} alt="" className="block w-2/3 mx-auto" />
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BasicEmailVerify;