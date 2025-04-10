import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { emailValidator, passwordValidator } from "./commonValidators";
import PasswordField from "./component/general/password_field";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    name?: string;
    password?: string;
  }>({});
  const [globalError, setGlobalError] = useState("");

  const signUpSchema = yup.object().shape({
    email: emailValidator,
    name: yup
      .string()
      .required("Name is required.")
      .min(3, "Name must be at least 3 characters."),
    password: passwordValidator,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError("");

    try {
      await signUpSchema.validate(
        { email, name, password },
        { abortEarly: false },
      );

      setFieldErrors({});
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/signup`,
        JSON.stringify({ email, name, password }),
        { headers: { "Content-Type": "application/json" } },
      );

      console.log("Signup successful:", data);
      window.location.href = "/signin";
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const errors: Record<string, string> = {};
        err.inner.forEach((error: yup.ValidationError) => {
          if (error.path && !errors[error.path]) {
            errors[error.path] = error.message;
          }
        });
        setFieldErrors(errors);
      } else {
        setGlobalError("Error signing up. Please try again.");
        console.error("Error signing up:", err);
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email && (
            <>
              <br /> <span style={{ color: "red" }}>{fieldErrors.email}</span>
            </>
          )}
        </div>

        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {fieldErrors.name && (
            <>
              <br /> <span style={{ color: "red" }}>{fieldErrors.name}</span>
            </>
          )}
        </div>

        <PasswordField
          password={password}
          setPassword={setPassword}
          fieldErrors={fieldErrors}
        />
        {globalError && (
          <>
            <br /> <span style={{ color: "red" }}>{globalError}</span>
          </>
        )}
        <button type="submit">Sign Up</button>
        <p style={{ marginTop: "10px" }}>
          Already have an account? <Link to="/signin">Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
