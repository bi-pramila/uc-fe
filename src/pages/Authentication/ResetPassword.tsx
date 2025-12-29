import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useResetPassword } from "../../../hooks/useResetPassword";

// Image
import logoLight from "assets/images/logo-light.png"
import logoDark from "assets/images/logo-dark.png"
import AuthIcon from "../AuthIcon";
import { Link } from "react-router-dom";

const BasicCreatePassword = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const { resetPassword, loading, error, message, setMessage } = useResetPassword();

    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);





    document.title = "Create Password | Ucartz";

    React.useEffect(() => {
        const bodyElement = document.body;

        bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zinc-800', 'dark:text-zinc-100', 'font-public');

        return () => {
            bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zinc-800', 'dark:text-zinc-100', 'font-public');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
          setMessage("Passwords do not match");
        return; // prevent submit if mismatch
        }

        try {
            const data = await resetPassword(token ?? "", newPassword);
            setNewPassword("");
            setConfirmPassword("");
            setPasswordMatch(null);
            setTimeout(() => navigate("/login"), 1500); // redirect after success
        } catch {
        // error handled in hook
        }
    };

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
                            <h4 className="mb-2 text-fecustom-500 dark:text-fecustom-500">Set a New Password</h4>
                            <p className="mb-8 text-slate-500 dark:text-zinc-200">Your new password should be distinct from any of your prior passwords</p>
                        </div>

                        <form autoComplete="off" action="/" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="passwordInput" className="inline-block mb-2 text-base font-medium">Password</label>
                                <input type="password" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="Password" id="passwordInput" value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordConfirmInput" className="inline-block mb-2 text-base font-medium">Confirm Password</label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="Confirm password" id="passwordConfirmInput" />
                            </div>
                            <div className="flex items-center gap-2">
                                <input id="checkboxDefault1" className="size-4 border rounded-sm appearance-none bg-slate-100 border-slate-200 dark:bg-zinc-600 dark:border-zinc-500 checked:bg-fecustom-500 checked:border-fecustom-500 dark:checked:bg-fecustom-500 dark:checked:border-fecustom-500 checked:disabled:bg-fecustom-400 checked:disabled:border-fecustom-400" type="checkbox" value="" />
                                <label htmlFor="checkboxDefault1" className="inline-block text-base font-medium align-middle cursor-pointer">Remember me</label>
                            </div>
                            <div className="mt-8">
                                <button type="submit" className="w-full text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20">Reset Password</button>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="mb-0">Hold on, I've got my password... <Link to="/login" className="fw-medium text-fecustom-500"> Click here to login</Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BasicCreatePassword;