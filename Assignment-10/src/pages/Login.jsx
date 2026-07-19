import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { Mail, Lock, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { register, handleSubmit, formState, setError } = useForm();
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = location.state?.justRegistered;

  function onSubmit(formValues) {
    try {
      loginUser(formValues.email, formValues.password);
      navigate("/", { replace: true });
    } catch (error) {
      setError("root", { message: error.message });
    }
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden flex-col justify-center gap-10 border-r border-white/5 bg-ink-950 px-16 md:flex">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-500 text-ink-950">
            <Zap size={18} fill="currentColor" />
          </span>
          <span className="font-display text-xl font-bold">
            Sky<span className="text-lime-500">Mart</span>
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-lime-400">Welcome back</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight">
            Shop the future.
            <br />
            <span className="text-lime-500">Today.</span>
          </h1>
          <p className="mt-4 max-w-sm text-gray-400">
            Thousands of products, lightning-fast delivery, and prices that
            make your wallet happy.
          </p>
        </div>
        <div className="flex gap-3">
          {[["20K+", "Products"], ["50K+", "Users"], ["4.9★", "Rating"]].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-white/10 px-5 py-4 text-center">
              <p className="font-display text-xl font-bold text-lime-400">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm rounded-3xl border border-white/10 bg-ink-900 p-8"
        >
          <div className="mb-6 flex items-center gap-2 md:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-500 text-ink-950">
              <Zap size={16} fill="currentColor" />
            </span>
            <span className="font-display text-lg font-bold">
              Sky<span className="text-lime-500">Mart</span>
            </span>
          </div>

          <h2 className="font-display text-2xl font-bold">Sign in</h2>
          <p className="mt-1 text-sm text-gray-500">Enter your credentials to continue</p>

          {justRegistered && (
            <p className="mt-4 flex items-center gap-2 rounded-lg border border-lime-500/30 bg-lime-500/10 px-3 py-2 text-sm text-lime-300">
              <CheckCircle2 size={15} /> Account created — sign in to continue.
            </p>
          )}
          {formState.errors.root && (
            <p className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {formState.errors.root.message}
            </p>
          )}

          <label className="mt-6 flex items-center gap-2 rounded-xl bg-[#E8F0FE] px-4 py-3 text-ink-950">
            <Mail size={16} className="text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent text-sm focus:outline-none"
              {...register("email", { required: true })}
            />
          </label>
          {formState.errors.email && (
            <p className="mt-1 text-xs text-rose-400">Email is required.</p>
          )}

          <label className="mt-3 flex items-center gap-2 rounded-xl bg-[#E8F0FE] px-4 py-3 text-ink-950">
            <Lock size={16} className="text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-transparent text-sm focus:outline-none"
              {...register("password", { required: true })}
            />
          </label>
          {formState.errors.password && (
            <p className="mt-1 text-xs text-rose-400">Password is required.</p>
          )}

          <button
            type="submit"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-500 py-3 text-sm font-semibold text-ink-950 hover:bg-lime-400"
          >
            Sign in <ArrowRight size={16} />
          </button>

          <p className="mt-5 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-lime-400 hover:text-lime-300">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
