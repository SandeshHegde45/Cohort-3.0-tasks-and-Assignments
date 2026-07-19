import { Link } from "react-router";
import { Zap, Package, Users, Star, Truck, ShieldCheck, Heart, ArrowRight } from "lucide-react";

const STATS = [
  { icon: Package, value: "20K+", label: "Products" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Star, value: "4.9", label: "Avg. Rating" },
  { icon: Truck, value: "99%", label: "On-time Delivery" },
];

const VALUES = [
  { icon: ShieldCheck, title: "Trust", body: "Every product is verified for quality and authenticity before listing.", tint: true },
  { icon: Truck, title: "Speed", body: "We obsess over delivery times so your orders arrive when promised.", tint: false },
  { icon: Heart, title: "Community", body: "Built around real customer feedback, not just business metrics.", tint: true },
  { icon: Star, title: "Quality", body: "We curate the best — no filler, no junk, just great products.", tint: false, amber: true },
];

const TEAM = [
  { name: "Aryan Shah", role: "Founder & CEO", color: "bg-lime-500 text-ink-950" },
  { name: "Priya Mehta", role: "Head of Product", color: "bg-sky-500 text-white" },
  { name: "Rohan Verma", role: "Lead Engineer", color: "bg-purple-500 text-white" },
  { name: "Sneha Kapoor", role: "Design Director", color: "bg-rose-500 text-white" },
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-500">
        <Zap size={26} className="text-ink-950" fill="currentColor" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-bold md:text-5xl">
        About <span className="text-lime-500">SkyMart</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-gray-400">
        SkyMart is a next-generation e-commerce platform built to make online
        shopping fast, fair, and enjoyable — for everyone.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-ink-900 p-5">
            <Icon size={20} className="mx-auto mb-2 text-gray-500" />
            <p className="text-xl font-bold">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-ink-900 p-8 text-left">
        <h2 className="font-display text-2xl font-bold">Our Story</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-400">
          <p>
            SkyMart started in 2022 as a small side project — two engineers
            tired of bloated, slow e-commerce experiences. We asked ourselves:
            what if shopping online was actually <em>enjoyable</em>?
          </p>
          <p>
            Three years later, SkyMart serves over 50,000 customers across the
            country. We stock electronics, fashion, jewelry, and everyday
            essentials — all at prices that don't require a second mortgage.
          </p>
          <p>
            We're still the same team at heart: obsessed with speed,
            transparency, and making you feel good about every purchase you
            make here.
          </p>
        </div>
      </div>

      <h2 className="mt-14 font-display text-2xl font-bold">What We Stand For</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {VALUES.map(({ icon: Icon, title, body, tint, amber }) => (
          <div key={title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-ink-900 p-5 text-left">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                tint ? "bg-lime-500/10" : "bg-white/5"
              } ${amber ? "text-amber-400" : "text-lime-400"}`}
            >
              <Icon size={18} />
            </span>
            <div>
              <p className="font-semibold">{title}</p>
              <p className="mt-1 text-sm text-gray-500">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-display text-2xl font-bold">Meet the Team</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {TEAM.map((m) => (
          <div key={m.name} className="rounded-2xl border border-white/10 bg-ink-900 p-6">
            <span className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${m.color}`}>
              {m.name.charAt(0)}
            </span>
            <p className="text-sm font-semibold">{m.name}</p>
            <p className="text-xs text-gray-500">{m.role}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-white/10 bg-ink-900 p-10">
        <h2 className="font-display text-2xl font-bold">Ready to shop?</h2>
        <p className="mt-2 text-sm text-gray-400">Explore thousands of products at unbeatable prices.</p>
        <Link
          to="/products"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-lime-500 px-5 py-3 text-sm font-semibold text-ink-950 hover:bg-lime-400"
        >
          Browse Products <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
