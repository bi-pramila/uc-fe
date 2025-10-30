import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { loginUser } from "slices/auth/login/thunk";
import { clearAuthState } from "slices/auth/login/reducer"; 
import type { AppDispatch, RootState } from "app/store";

// Image
import AuthIcon from "pages/AuthenticationInner/AuthIcon";
import logoLight from "assets/images/logo-light.png";
import logoDark from "assets/images/logo-dark.png"; 

import withRouter from "Common/withRouter";
import { createSelector } from 'reselect';



const Login = (props: any) => {

    document.title = "Login | Ucartz";

    // const dispatch = useDispatch();
   
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    // Select login state from Redux store
    const { user, success, error, loading } = useSelector(
        (state: RootState) => state.Login 
    );

    // Navigate on successful login
    useEffect(() => {
        if (success && user) {
        navigate("/dashboard");
        dispatch(clearAuthState());
        }
    }, [success, user, navigate, dispatch]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { email: "", password: "",},
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Please Enter Your email"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            dispatch(loginUser({ email: values.email, password: values.password }))
        },
    });
    

    React.useEffect(() => {
        const bodyElement = document.body;

        bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zinc-800', 'dark:text-zinc-100', 'font-public');

        return () => {
            bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zinc-800', 'dark:text-zinc-100', 'font-public');
        }
    }, []);

    return (
        <React.Fragment>
            <div className="relative">
                <AuthIcon />

                <div className="mb-0 w-screen lg:mx-auto lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
                    <div className="!px-10 !py-12 card-body">
                        <Link to="/">
                            <img src={logoLight} alt="" className="hidden h-6 mx-auto dark:block" />
                            <img src={logoDark} alt="" className="block h-6 mx-auto dark:hidden" />
                        </Link>

                        <div className="mt-8 text-center">
                            <h4 className="mb-1 text-fecustom-500 dark:text-fecustom-500">Welcome Back !</h4>
                            <p className="text-slate-500 dark:text-zinc-200">Sign in to continue to Ucartz</p>
                        </div>

                        {success && (
                            <div className="px-4 py-3 mb-3 text-sm text-green-500 border border-green-200 rounded-md bg-green-50 dark:bg-green-400/20 dark:border-green-500/50">
                            You have <b>successfully</b> signed in.
                            </div>
                        )}

                        {error && (
                            <div className="px-4 py-3 mb-3 text-sm text-red-500 border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50">
                            You have <b>failed</b> to sign in: {error}
                            </div>
                        )}

                        <form className="mt-10" id="signInForm"
                            onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="inline-block mb-2 text-base font-medium">UserName/ Email ID</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                    placeholder="Enter username or email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div id="email-error" className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
                                ) : null}

                            </div>
                            <div className="mb-3">
                                <Link className="text-primary font-medium text-sm mb-2 float-end fw-medium text-fecustom-500" to="/auth-reset-password-basic" data-discover="true">Forgot Password ?</Link>
                                   
                                <label htmlFor="password" className="inline-block mb-2 text-base font-medium">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                    placeholder="Enter password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div id="password-error" className="mt-1 text-sm text-red-500">{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <input id="checkboxDefault1" className="size-4 border rounded-sm appearance-none bg-slate-100 border-slate-200 dark:bg-zinc-600 dark:border-zinc-500 checked:bg-fecustom-500 checked:border-fecustom-500 dark:checked:bg-fecustom-500 dark:checked:border-fecustom-500 checked:disabled:bg-fecustom-400 checked:disabled:border-fecustom-400" type="checkbox" value="" />
                                    <label htmlFor="checkboxDefault1" className="inline-block text-base font-medium align-middle cursor-pointer">Remember me</label>
                                </div>
                                {/* <div id="remember-error" className="hidden mt-1 text-sm text-red-500">Please check the "Remember me" before submitting the form.</div> */}
                            </div>
                            <div className="mt-10">
                                <button type="submit" disabled={loading} className="w-full text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">{loading ? "Signing in..." : "Sign In"}</button>
                            </div>

                            <div className="relative text-center my-9 before:absolute before:top-3 before:left-0 before:right-0 before:border-t before:border-t-slate-200 dark:before:border-t-zinc-500">
                                <h5 className="inline-block px-2 py-0.5 text-sm bg-white text-slate-500 dark:bg-zinc-600 dark:text-zinc-200 rounded relative">Sign In with</h5>
                            </div> 
                            <div className="mt-10 text-center">
                                <p className="mb-0 text-slate-500 dark:text-zinc-200">Don't have an account ? <Link to="/register" className="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zinc-200 hover:text-fecustom-500 dark:hover:text-fecustom-500"> SignUp</Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default withRouter(Login);