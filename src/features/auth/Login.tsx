
import { useLoginMutation } from "@/app/features/auth/authApi";
import { useState } from "react";
import { toast } from 'sonner';

import { setUser } from "@/app/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("ikhtiaj.arif@gmail.com");
  const [password, setPassword] = useState("@arif123");
  const [login] = useLoginMutation()

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    const toastId = toast.loading('Logging in')
    e.preventDefault();
    const userInfo = {
      email: email, password: password
    }
    const res = await login(userInfo).unwrap()
    if (res) {
      const user = verifyToken(res?.data?.token)
      if (user) {
        setUser({ user: user, token: res.data.token })
        localStorage.setItem("accessToken", res?.data?.token)
        navigate('/')
      }

      toast.success('Logged in', { id: toastId })
    }

    // navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <form onSubmit={handleLogin} className="bg-accent p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
