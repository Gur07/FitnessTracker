import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { loginUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await loginUser(form);
      console.log("Login successful:", data);
      // localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
      console.log("Login error:", err);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-emerald-500 mb-8">
        Login
      </h2>

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

      <Button text="Login" onClick={handleSubmit} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg shadow-md transition duration-300" />

      <p className="mt-6 text-sm text-gray-500">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-emerald-500 cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </AuthLayout>
  );
};

export default Login;