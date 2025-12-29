import React from "react";
import AuthIcon from "pages/AuthenticationInner/AuthIcon";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetRegisterFlag } from "slices/thunk";
import { createSelector } from "reselect";
import { Facebook, Github, Mail, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useFormik as useFormic } from "formik";

import logoLight from "assets/images/logo-light.png";
import logoDark from "assets/images/logo-dark.png";
import { RootState } from "slices";

const Register = () => {
  document.title = "Register | Tailwick - React Admin & Dashboard Template";

  const dispatch = useDispatch<any>();
  const navigation = useNavigate();

  const selectRegister = createSelector(
    (state: RootState) => state.Register,
    (register) => ({
      success: register.success,
    })
  );

  const { success } = useSelector(selectRegister);

  const validation: any = useFormic({
    enableReinitialize: true,
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please Enter Your Email"),
      name: Yup.string().required("Please Enter Your Name"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values: any) => {
      dispatch(
        registerUser({
          ...values,
          role_id: "1", // 👈 hardcoded, not from UI
        })
      );
    },
  });

  React.useEffect(() => {
    if (success) {
      navigation("/login");
    }

    setTimeout(() => {
      dispatch(resetRegisterFlag());
    }, 3000);
  }, [dispatch, success, navigation]);

  React.useEffect(() => {
    const bodyElement = document.body;

    bodyElement.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "min-h-screen",
      "py-16",
      "lg:py-10",
      "bg-slate-50",
      "dark:bg-zinc-800",
      "dark:text-zinc-100",
      "font-public"
    );

    return () => {
      bodyElement.classList.remove(
        "flex",
        "items-center",
        "justify-center",
        "min-h-screen",
        "py-16",
        "lg:py-10",
        "bg-slate-50",
        "dark:bg-zinc-800",
        "dark:text-zinc-100",
        "font-public"
      );
    };
  }, []);

  return (
    <React.Fragment>
      <div className="relative">
        <AuthIcon />

        <div className="mb-0 w-screen lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
          <div className="!px-10 !py-12 card-body">
            <Link to="/">
              <img src={logoLight} alt="" className="hidden h-6 mx-auto dark:block" />
              <img src={logoDark} alt="" className="block h-18 mx-auto dark:hidden" />
            </Link>

            <div className="mt-8 text-center">
              <h4 className="mb-1 text-fecustom-500">Create your account</h4>
              <p className="text-slate-500">
                Register to create your new account now
              </p>
            </div>

            <form
              className="mt-10"
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
              }}
            >
              <div className="mb-3">
                <label className="inline-block mb-2 text-base font-medium">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  className="form-input"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email}
                />
                {validation.touched.email && validation.errors.email && (
                  <div className="mt-1 text-sm text-red-500">
                    {validation.errors.email}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="inline-block mb-2 text-base font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name}
                />
                {validation.touched.name && validation.errors.name && (
                  <div className="mt-1 text-sm text-red-500">
                    {validation.errors.name}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="inline-block mb-2 text-base font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.password}
                />
                {validation.touched.password &&
                  validation.errors.password && (
                    <div className="mt-1 text-sm text-red-500">
                      {validation.errors.password}
                    </div>
                  )}
              </div>

              <button type="submit" className="w-full btn bg-fecustom-500 text-white">
                Register
              </button>

              <div className="mt-6 text-center">
                <p className="text-slate-500">
                  Already have an account?{" "}
                  <Link to="/login" className="underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
