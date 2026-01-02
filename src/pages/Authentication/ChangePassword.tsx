import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../../hooks/useForgotPassword";

// Image
import logoLight from "assets/images/logo-light.png"
import logoDark from "assets/images/logo-dark.png"
import { Link } from "react-router-dom";

const ChangePassword = () => {

    const navigate = useNavigate();

    const { changePassword, loading, error, message, setMessage } = useForgotPassword();

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match");
            return;
        }

        if (newPassword === oldPassword) {
            setMessage("New password must be different from old password");
            return;
        }

        try {
            await changePassword(oldPassword, newPassword);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch {
            // error handled in hook
        }
    };

    return (
        <React.Fragment>
            <div className="relative">
                {/* <AuthIcon /> */}

                <div className="mb-0 w-screen lg:w-[500px] card shadow-lg border-none shadow-slate-100 dark:shadow-zinc-500/20 relative">
                    <div className="!px-10 !py-12 card-body">
                        <Link to="/">
                            <img src={logoLight} alt="" className="hidden h-6 mx-auto dark:block" />
                            <img src={logoDark} alt="" className="block h-18 mx-auto dark:hidden" />
                        </Link>

                        <div className="mt-8 text-center">
                            <h4 className="mb-2 text-fecustom-500 dark:text-fecustom-500">Change Password</h4>
                            <p className="mb-8 text-slate-500 dark:text-zinc-200">Update your password to keep your account secure</p>
                        </div>

                        {message && (
                            <div className={`mb-4 p-3 rounded text-sm ${error ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'}`}>
                                {message}
                            </div>
                        )}

                        <form autoComplete="off" action="/" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="oldPasswordInput" className="inline-block mb-2 text-base font-medium">Current Password</label>
                                <input type="password" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="Current Password" id="oldPasswordInput" value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)} disabled={loading} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordInput" className="inline-block mb-2 text-base font-medium">New Password</label>
                                <input type="password" className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="New Password" id="passwordInput" value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} disabled={loading} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordConfirmInput" className="inline-block mb-2 text-base font-medium">Confirm New Password</label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-fecustom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-fecustom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" required placeholder="Confirm New Password" id="passwordConfirmInput" disabled={loading} />
                            </div>
                            <div className="mt-8">
                                <button type="submit" disabled={loading} className="w-full text-white btn bg-fecustom-500 border-fecustom-500 hover:text-white hover:bg-fecustom-600 hover:border-fecustom-600 focus:text-white focus:bg-fecustom-600 focus:border-fecustom-600 focus:ring focus:ring-fecustom-100 active:text-white active:bg-fecustom-600 active:border-fecustom-600 active:ring active:ring-fecustom-100 dark:ring-fecustom-400/20 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? "Changing..." : "Change Password"}</button>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="mb-0">Back to <Link to="/dashboard" className="fw-medium text-fecustom-500">Dashboard</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ChangePassword;
