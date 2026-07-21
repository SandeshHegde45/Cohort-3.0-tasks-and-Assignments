import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Zap, ArrowRight, Mail, Lock, User, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const passwordRules = [
  { key: "length", label: "At least 8 characters", test: (value) => value.length >= 8 },
  { key: "upperLower", label: "Upper & lowercase letters", test: (value) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { key: "number", label: "At least one number", test: (value) => /\d/.test(value) },
  { key: "symbol", label: "At least one symbol", test: (value) => /[^A-Za-z0-9]/.test(value) },
];

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["", "bg-red-500", "bg-amber-400", "bg-volt", "bg-volt"];

function getPasswordScore(password) {
  if (!password) {
    return { score: 0, passedRules: [] };
  }
  const passedRules = passwordRules.filter((rule) => rule.test(password));
  return { score: passedRules.length, passedRules: passedRules.map((rule) => rule.key) };
}

export default function Register() {
  const { register, handleSubmit, watch } = useForm();
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const passwordValue = watch("password", "");
  const { score, passedRules } = getPasswordScore(passwordValue);

  async function onSubmit(formValues) {
    setAuthError("");
    const { name, email, password, confirmPassword } = formValues;
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Fill all fields");
      return;
    }
    if (score < 3) {
      toast.error("Please choose a stronger password");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    try {
      registerUser(name.trim(), email.trim().toLowerCase(), password);
      navigate("/login", { state: { justRegistered: true } });
    } catch (error) {
      setAuthError(error.message);
    }
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-scale-in">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 bg-volt rounded-xl flex items-center justify-center">
            <Zap size={16} className="text-ink fill-ink" />
          </div>
          <span className="font-heading font-bold text-xl">
            Sky<span className="text-volt">Mart</span>
          </span>
        </div>

        <div className="auth-card">
          <h2 className="font-heading font-bold text-2xl mb-1">Create account</h2>
          <p className="text-white/40 text-sm font-body mb-8">Join SkyMart and start shopping</p>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input type="text" placeholder="Full name" className="field pl-10" {...register("name")} />
            </div>

            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input type="email" placeholder="Email address" className="field pl-10" {...register("email")} />
            </div>

            <div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min 8 chars)"
                  className="field pl-10 pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {passwordValue && (
                <div className="mt-2 bg-white/4 border border-white/8 rounded-xl p-3">
                  <div className="flex gap-1.5 items-center">
                    {[1, 2, 3, 4].map((barIndex) => (
                      <div
                        key={barIndex}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          barIndex <= score ? strengthColors[score] : "bg-white/10"
                        }`}
                      />
                    ))}
                    <span
                      className={`text-xs font-body ml-1 ${
                        score >= 3 ? "text-volt" : score === 2 ? "text-amber-400" : "text-red-400"
                      }`}
                    >
                      {strengthLabels[score]}
                    </span>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2">
                    {passwordRules.map((rule) => {
                      const isRulePassed = passedRules.includes(rule.key);
                      return (
                        <li
                          key={rule.key}
                          className={`flex items-center gap-1.5 text-[11px] font-body ${
                            isRulePassed ? "text-volt" : "text-white/25"
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
            </div>

            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="field pl-10"
                {...register("confirmPassword")}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-volt w-full flex items-center justify-center gap-2 py-3.5 mt-2 text-base font-heading font-bold"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-white/30 text-sm font-body mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-volt hover:text-volt-light font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
