import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { signupUser } from "../api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    dob: "",
    gender: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await signupUser(form);
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-emerald-500 mb-8">
        Create Account
      </h2>

      <InputField
        label="Full Name"
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
      />

      <InputField
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <InputField
        label="Date of Birth"
        type="date"
        name="dob"
        value={form.dob}
        onChange={handleChange}
      />

      <InputField
        label="Gender"
        type="text"
        name="gender"
        value={form.gender}
        onChange={handleChange}
      />

      <Button text="Create Account" onClick={handleSubmit} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg shadow-md transition duration-300" />

      <p className="mt-6 text-sm text-gray-500">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-emerald-500 cursor-pointer"
        >
          Login
        </span>
      </p>
    </AuthLayout>
  );
};

export default Signup;