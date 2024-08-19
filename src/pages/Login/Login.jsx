import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../../components/Toast";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../redux/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../components/OAuth";
import { baseURL } from "../../components/hooks/hook";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const initialvalue = { Role: "Employer", Email: "", Password: "" };
  const [formValues, setFormValues] = useState(initialvalue);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [passwordType, setPasswordType] = useState("password");

  let navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.Password) {
      errors.Password = "Required";
    }

    if (!regex.test(values.Email)) {
      errors.Email = "This is not a valid email format";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setformErrors(validate(formValues));
    // setIsSubmit(true);
    try {
      dispatch(signInStart());
      const res = await fetch(`${baseURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();

      if (data.StatusCode !== 200) {
        dispatch(signInFailure(data));

        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
      toast.success("Login sucessful", {
        theme: "light",
      });
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  useEffect(() => {
    dispatch(signInFailure());
  }, []);
  let location = useLocation();
  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     // const dataForm = {
  //     //   ...formValues,
  //     //   FetchURL: `${baseURL}/api/admin/login`,
  //     //   Type: "POST",
  //     // };

  //     // Fetchdata(dataForm)
  //     //   .then(function (result) {
  //     //     if (result.StatusCode === 200) {
  //     //       const postResult = result.Login[0];
  //     //       toast.success("Login sucessful", {
  //     //         theme: "light",
  //     //       });

  //     //       setTimeout(() => {
  //     //         localStorage.setItem(
  //     //           "talent-hospitality-token ",
  //     //           JSON.stringify(postResult)
  //     //         );
  //     //         sessionStorage.setItem(
  //     //           "talent-hospitality-token ",
  //     //           JSON.stringify(postResult)
  //     //         );
  //     //         authCtx.login(JSON.stringify(postResult));
  //     //         navigate("/");
  //     //         setIsSubmit(false);
  //     //       }, 3000);
  //     //     } else {
  //     //       setIsSubmit(false);
  //     //       setformErrors({
  //     //         ...formErrors,
  //     //         errorv: result.Message,
  //     //       });
  //     //     }
  //     //   })
  //     //   .catch((result) => {
  //     //     setIsSubmit(false);
  //     //   });
  //     const fetchData = async () => {
  //       try {
  //         dispatch(signInStart());
  //         const res = await fetch(`${baseURL}/api/admin/login`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(formValues),
  //         });

  //         const data = await res.json();

  //         if (data.StatusCode !== 200) {
  //           dispatch(signInFailure(data));

  //           return;
  //         }
  //         dispatch(signInSuccess(data));
  //         navigate("/");
  //       } catch (error) {
  //         dispatch(signInFailure(error));
  //       }
  //     };
  //     fetchData();
  //   } else {
  //     dispatch(signInFailure());
  //   }
  // }, [formErrors]);

  const showPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <>
      <div className="th-container">
        <div className="th-login">
          <div>
            <div className="th-login-form">
              <div className="th-card py-8 px-11 min-w-[500px]">
                <h1 className="th-heading text-center">
                  <span className="uppercase block mb-2">
                    Talent hospitality
                  </span>
                  Login as Employer
                </h1>

                <LoginForm
                  formValues={formValues}
                  handleChange={handleChange}
                  passwordType={passwordType}
                  showPassword={showPassword}
                  error={error}
                  handleSubmit={handleSubmit}
                  loading={loading}
                />

                {/* <OAuth /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
