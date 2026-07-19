import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { User, Mail, Lock, ArrowRight, Zap, Check, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const passwordRules = [
  { key: "length", label: "At least 8 characters", test: (value) => value.length >= 8 },
  { key: "upperLower", label: "Upper & lowercase letters", test: (value) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { key: "number", label: "At least one number", test: (value) => /\d/.test(value) },
  { key: "symbol", label: "At least one symbol", test: (value) => /[^A-Za-z0-9]/.test(value) },
];

const strengthLabels = ["Very weak", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["bg-rose-500", "bg-rose-500", "bg-amber-500", "bg-lime-500", "bg-lime-500"];

function getPasswordScore(password) {
  if (!password) {
    return { score: 0, passedRules: [] };
  }
  const passedRules = passwordRules.filter((rule) => rule.test(password));
  return { score: passedRules.length, passedRules: passedRules.map((rule) => rule.key) };
}

export default function Register() {
  const { register, handleSubmit, watch, formState, setError } = useForm();
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const passwordValue = watch("password", "");
  const { score, passedRules } = getPasswordScore(passwordValue);

  function onSubmit(formValues) {
    if (formValues.password !== formValues.confirmPassword) {
      setError("confirmPassword", { message: "Passwords don't match." });
      return;
    }
    if (score < 3) {
      setError("password", { message: "Please choose a stronger password." });
      return;
    }
    try {
      registerUser(formValues.name, formValues.email, formValues.password);
      navigate("/login", { state: { justRegistered: true } });
    } catch (error) {
      setError("root", { message: error.message });
    }
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden flex-col justify-center gap-10 border-r border-white/5 bg-ink-950 px-16 md:flex">
        <Link to="/login" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-500 text-ink-950">
            <Zap size={18} fill="currentColor" />
          </span>
          <span className="font-display text-xl font-bold">
            Sky<span className="text-lime-500">Mart</span>
          </span>
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-lime-400">
            Join SkyMart
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight">
            Create your
            <br />
            <span className="text-lime-500">free account.</span>
          </h1>
          <p className="mt-4 max-w-sm text-gray-400">
            Save items to your cart, track orders, and get personalized
            picks every time you shop.
          </p>
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

          <h2 className="font-display text-2xl font-bold">Create account</h2>
          <p className="mt-1 text-sm text-gray-500">
            Just a few details to get you shopping
          </p>

          {formState.errors.root && (
            <p className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {formState.errors.root.message}
            </p>
          )}

          <label className="mt-6 flex items-center gap-2 rounded-xl bg-[#E8F0FE] px-4 py-3 text-ink-950">
            <User size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Full name"
              className="w-full bg-transparent text-sm focus:outline-none"
              {...register("name", { required: true })}
            />
          </label>
          {formState.errors.name && (
            <p className="mt-1 text-xs text-rose-400">Name is required.</p>
          )}

          <label className="mt-3 flex items-center gap-2 rounded-xl bg-[#E8F0FE] px-4 py-3 text-ink-950">
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
              placeholder="Create password"
              className="w-full bg-transparent text-sm focus:outline-none"
              {...register("password", { required: true, minLength: 4 })}
            />
          </label>
          {formState.errors.password && (
            <p className="mt-1 text-xs text-rose-400">{formState.errors.password.message || "Password is required."}</p>
          )}

          {passwordValue && (
            <div className="mt-2 space-y-2 rounded-xl border border-white/10 bg-ink-800 p-3">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3].map((barIndex) => (
                  <span
                    key={barIndex}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      barIndex < score ? strengthColors[score] : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <p
                className={`text-xs font-semibold ${
                  score <= 1 ? "text-rose-400" : score === 2 ? "text-amber-400" : "text-lime-400"
                }`}
              >
                {strengthLabels[score]}
              </p>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                {passwordRules.map((rule) => {
                  const isRulePassed = passedRules.includes(rule.key);
                  return (
                    <li
                      key={rule.key}
                      className={`flex items-center gap-1.5 text-[11px] ${
                        isRulePassed ? "text-lime-400" : "text-gray-500"
                      }`}
                    >
                      {isRulePassed ? <Check size={12} /> : <X size={12} />}
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <label className="mt-3 flex items-center gap-2 rounded-xl bg-[#E8F0FE] px-4 py-3 text-ink-950">
            <Lock size={16} className="text-gray-400" />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full bg-transparent text-sm focus:outline-none"
              {...register("confirmPassword", { required: true })}
            />
          </label>
          {formState.errors.confirmPassword && (
            <p className="mt-1 text-xs text-rose-400">{formState.errors.confirmPassword.message || "Please confirm your password."}</p>
          )}

          <button
            type="submit"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-500 py-3 text-sm font-semibold text-ink-950 hover:bg-lime-400"
          >
            Create account <ArrowRight size={16} />
          </button>

          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-lime-400 hover:text-lime-300">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
