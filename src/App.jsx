import { useState } from "react";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";

const STAGES = [
  { n: "01", label: "Screening", detail: "Free, 1 week. We assess seriousness and fit." },
  { n: "02", label: "Training", detail: "Up to 6 months. Priority track available for faster pace." },
  { n: "03", label: "Placement", detail: "Up to 6 months. Full support until an offer lands." },
  { n: "04", label: "Golden Period", detail: "ParallelWorld hiring track opens." },
];

const FIELDS = [
  { id: "name", label: "Full name", type: "text", placeholder: "Your name" },
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { id: "phone", label: "Phone", type: "tel", placeholder: "+91 98765 43210" },
  { id: "education", label: "Education / branch", type: "text", placeholder: "B.E. Computer Science, 2026" },
  { id: "skills", label: "Core skills", type: "text", placeholder: "Java, Spring Boot, AWS" },
];

export default function EngineersFoundryApply() {
  const [form, setForm] = useState({});
  const [why, setWhy] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (id, val) => setForm((f) => ({ ...f, [id]: val }));

  const handleSubmit = () => {
    const nextErrors = {};
    FIELDS.forEach((f) => {
      if (!form[f.id]?.trim()) nextErrors[f.id] = "Required";
    });
    if (!why.trim()) nextErrors.why = "Required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  return (
    <div
      style={{
        background: "#0B1D33",
        color: "#F5F3ED",
        minHeight: "100vh",
        fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
        backgroundImage:
          "linear-gradient(#16304D 1px, transparent 1px), linear-gradient(90deg, #16304D 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .plex-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        input.field-input {
          width: 100%;
          background: #0B1D33;
          border: 1px solid #2C4562;
          color: #F5F3ED;
          padding: 12px 14px;
          border-radius: 4px;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          outline: none;
        }
        input.field-input:focus { border-color: #FF6B35; }
        textarea.field-input:focus { border-color: #FF6B35; }
        input.field-input::placeholder, textarea.field-input::placeholder { color: #5D7A99; }
      `}</style>

      {/* Header */}
      <header
        className="flex items-center justify-between px-6 md:px-12 py-6"
        style={{ borderBottom: "1px solid #16304D" }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 10,
              height: 10,
              background: "#FF6B35",
              transform: "rotate(45deg)",
            }}
          />
          <span className="plex-mono font-semibold tracking-wide text-sm">
            ENGINEERS FACTORY
          </span>
        </div>
        <span className="plex-mono text-xs" style={{ color: "#5D7A99" }}>
          FOUNDRY / APPLICATION
        </span>
      </header>

      {!submitted ? (
        <>
          {/* Hero */}
          <section className="px-6 md:px-12 pt-16 pb-12 max-w-3xl">
            <p
              className="plex-mono text-xs tracking-[0.3em] mb-4"
              style={{ color: "#FF6B35" }}
            >
              WE CHOOSE YOU ⟷ YOU CHOOSE US
            </p>
            <h1
              className="plex-mono font-bold leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              Engineers building
              <br />
              engineers.
            </h1>
            <p className="text-base md:text-lg max-w-xl" style={{ color: "#B7C6D6" }}>
              A free, one-week screening. If selected, training is ₹10,000/month
              for up to 6 months. Not placed within a year? The full amount you
              paid is refunded. Placed? We charge 25% of your package, with
              whatever you've already paid adjusted against that fee.
            </p>
          </section>

          {/* Pipeline */}
          <section className="px-6 md:px-12 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
              {STAGES.map((s, i) => (
                <div
                  key={s.n}
                  className="p-5 rounded"
                  style={{
                    background: "#0F2440",
                    border: "1px solid #1F3A5C",
                    borderLeft: i === 0 ? "3px solid #FF6B35" : "3px solid #2C4562",
                  }}
                >
                  <p className="plex-mono text-xs mb-2" style={{ color: "#5D7A99" }}>
                    {s.n}
                  </p>
                  <p className="plex-mono font-semibold text-sm mb-2">{s.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#8FA6BE" }}>
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Fee structure */}
          <section className="px-6 md:px-12 pb-12 max-w-2xl">
            <div
              className="p-6 rounded"
              style={{ background: "#0F2440", border: "1px solid #1F3A5C" }}
            >
              <p className="plex-mono text-xs mb-4" style={{ color: "#5D7A99" }}>
                FEE STRUCTURE
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="plex-mono text-xs mt-0.5" style={{ color: "#FF6B35" }}>
                    ↳
                  </span>
                  <p className="text-sm" style={{ color: "#B7C6D6" }}>
                    Training: <span className="plex-mono">₹10,000/month</span>, up to
                    6 months (<span className="plex-mono">₹60,000</span> max).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="plex-mono text-xs mt-0.5" style={{ color: "#FF6B35" }}>
                    ↳
                  </span>
                  <p className="text-sm" style={{ color: "#B7C6D6" }}>
                    Not placed within 1 year: the full amount you paid is
                    refunded.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="plex-mono text-xs mt-0.5" style={{ color: "#FF6B35" }}>
                    ↳
                  </span>
                  <p className="text-sm" style={{ color: "#B7C6D6" }}>
                    Placed: we charge 25% of your package. Amount already paid
                    during training is deducted from this fee.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Application form */}
          <section className="px-6 md:px-12 pb-24 max-w-2xl">
            <div
              className="p-6 md:p-8 rounded"
              style={{ background: "#0F2440", border: "1px solid #1F3A5C" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="plex-mono font-bold text-lg">Apply for screening</h2>
                <span className="plex-mono text-xs" style={{ color: "#5D7A99" }}>
                  SPEC / 01
                </span>
              </div>

              <div className="flex flex-col gap-5">
                {FIELDS.map((f) => (
                  <div key={f.id}>
                    <label className="plex-mono text-xs block mb-2" style={{ color: "#8FA6BE" }}>
                      {f.label.toUpperCase()}
                    </label>
                    <input
                      className="field-input"
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.id] || ""}
                      onChange={(e) => update(f.id, e.target.value)}
                    />
                    {errors[f.id] && (
                      <p className="text-xs mt-1" style={{ color: "#FF6B35" }}>
                        {errors[f.id]}
                      </p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="plex-mono text-xs block mb-2" style={{ color: "#8FA6BE" }}>
                    WHY DO YOU WANT TO JOIN
                  </label>
                  <textarea
                    className="field-input"
                    rows={4}
                    placeholder="Tell us what you're aiming for, and why now."
                    value={why}
                    onChange={(e) => setWhy(e.target.value)}
                  />
                  {errors.why && (
                    <p className="text-xs mt-1" style={{ color: "#FF6B35" }}>
                      {errors.why}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="plex-mono flex items-center justify-center gap-2 mt-2 py-3 rounded font-semibold text-sm"
                  style={{ background: "#FF6B35", color: "#0B1D33" }}
                >
                  Submit application <ArrowRight size={15} />
                </button>
                <p className="text-xs text-center" style={{ color: "#5D7A99" }}>
                  Free screening. Training fee applies only if selected — see
                  fee structure above.
                </p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="px-6 md:px-12 py-24 max-w-xl mx-auto text-center flex flex-col items-center">
          <CheckCircle2 size={40} color="#FF6B35" className="mb-6" />
          <h2 className="plex-mono font-bold text-2xl mb-4">Application received</h2>
          <p className="text-sm mb-2" style={{ color: "#B7C6D6" }}>
            Thanks, {form.name?.split(" ")[0] || "engineer"}. Screening takes up to
            one week. We'll reach out at {form.email} if you're a fit.
          </p>
          <p className="text-xs mb-10" style={{ color: "#5D7A99" }}>
            No response after a week means we're still reviewing — we only move
            forward with candidates we're fully committing to.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({});
              setWhy("");
              setErrors({});
            }}
            className="plex-mono flex items-center gap-2 text-xs"
            style={{ color: "#8FA6BE" }}
          >
            <ArrowLeft size={14} /> Back to form
          </button>
        </section>
      )}
    </div>
  );
}
