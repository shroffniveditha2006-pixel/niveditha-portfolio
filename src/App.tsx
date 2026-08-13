import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Globe,
  Server,
  Database,
  Wrench,
  Trophy,
  Award,
  Users,
  Briefcase,
  Send,
  FileText,
  Sparkles,
  GraduationCap,
  BookOpen,
  School,
  X,
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useReveal } from "./use-reveal";

const skills = [
  { icon: Code2, title: "Programming Languages", items: ["Java", "Python (Basics)"] },
  { icon: Globe, title: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
  { icon: Server, title: "Backend", items: ["Spring Boot (Basics)", "JDBC", "REST APIs"] },
  { icon: Database, title: "Databases", items: ["SQL", "MySQL", "Firebase"] },
  { icon: Wrench, title: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA"] },
];

const projects = [
  {
    title: "EduPath Navigator",
    subtitle: "AI Career Guidance Platform",
    badge: "SIH 2025 Winner",
    description:
      "A responsive full-stack web application for personalized career guidance and recommendation generation. Integrated Firebase authentication, REST APIs, and scalable frontend architecture for efficient user management and data handling.",
    tech: ["Next.js", "TypeScript", "Firebase", "Google Genkit", "Tailwind CSS"],
    live: "https://sih-final-imps.vercel.app/",
    code: "https://github.com/shroffniveditha2006-pixel/EdupathNavigator",
  },
  {
    title: "Smart Resume Analyzer",
    subtitle: "Full-Stack Resume Analysis Tool",
    description:
      "Developed a full-stack web application to analyze resumes and match candidate skills with job descriptions. Built backend modules using Java, Spring Boot, and MySQL for operations and data management, and designed responsive user interfaces with REST APIs.",
    tech: ["Java", "Spring Boot", "MySQL", "HTML5", "CSS3", "JavaScript"],
    live: null,
    code: "https://github.com/shroffniveditha2006-pixel",
  },
];

const achievements = [
  { icon: Trophy, title: "Winner — Smart India Hackathon 2025", note: "National-Level Competition" },
  { icon: Award, title: "Awarded Gold Medal — Best Performer of the Year 2025", note: "College Level for Overall Contribution" },
  { icon: Award, title: "Awarded Best Idea Presentation", note: "National Level Symposium" },
  { icon: Sparkles, title: "Secured 4th Place", note: "Internal College Hackathon 2025" },
];

const education = [
  { icon: School, school: "AP Model High School, Rayadurgam", degree: "Secondary Education (10th Grade)", score: "98%", period: "2020 – 2021", current: false },
  { icon: BookOpen, school: "SR Educational Academy, Anantapur", degree: "Intermediate (12th Grade)", score: "98.6%", period: "2021 – 2023", current: false },
  { icon: GraduationCap, school: "Kalasalingam Academy of Research and Education, Madurai", degree: "B.Tech in Computer Science and Engineering (AI & ML)", score: "CGPA: 8.98", period: "2023 – Expected 2027", current: true },
];

export default function App() {
  const rootRef = useReveal();
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground">
      <Nav onOpenResume={() => setResumeModalOpen(true)} />
      <Hero onOpenResume={() => setResumeModalOpen(true)} />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
      {resumeModalOpen && <ResumeModal onClose={() => setResumeModalOpen(false)} />}
    </div>
  );
}

function Nav({ onOpenResume }: { onOpenResume: () => void }) {
  const links: [string, string][] = [
    ["About", "#about"], ["Skills", "#skills"], ["Projects", "#projects"],
    ["Education", "#education"], ["Experience", "#experience"], ["Contact", "#contact"],
  ];
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-all duration-300 ${scrolled ? "bg-background/80 border-b border-border/60 shadow-soft" : "bg-background/40 border-b border-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-bold tracking-tight text-lg">niveditha<span className="text-primary">.</span></a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="hover:text-foreground transition-colors">{l}</a>
          ))}
        </nav>
        <button onClick={onOpenResume} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium rounded-full border border-border bg-card/60 px-4 py-1.5 hover:bg-secondary hover:border-primary/40 transition-colors">
          Resume <FileText className="h-3.5 w-3.5 text-primary" />
        </button>
      </div>
    </header>
  );
}

function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY, 400));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" style={{ transform: `translate3d(0, ${offset * 0.15}px, 0)` }} />
      <div className="absolute inset-0 ring-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] pointer-events-none" style={{ transform: `translate3d(0, ${offset * 0.08}px, 0)` }} />
      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Available for software opportunities
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">Hello, I'm</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold leading-[1.0] tracking-tight">
            <span className="block text-foreground">S Niveditha</span>
            <span className="block name-gradient">Krishna</span>
          </h1>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="tagline-line inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm sm:text-base font-semibold text-primary shadow-glow" style={{ animationDelay: "0.15s" }}>
              <Sparkles className="h-4 w-4" /> Java & Software Developer
            </span>
            <span className="tagline-line inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm sm:text-base font-semibold text-accent" style={{ animationDelay: "0.35s" }}>
              <Trophy className="h-4 w-4" /> Smart India Hackathon 2025 Winner
            </span>
          </div>
          <div className="tagline-line mt-8 flex flex-wrap gap-3" style={{ animationDelay: "1.1s" }}>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-glow">
              View Projects <ArrowUpRight className="h-4 w-4" />
            </a>
            <button onClick={onOpenResume} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-semibold hover:bg-secondary hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
              <FileText className="h-4 w-4 text-primary" /> View Resume
            </button>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300">
              Contact Me
            </a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative" style={{ transform: `translate3d(0, ${offset * -0.05}px, 0)` }}>
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/30 via-accent/20 to-transparent blur-2xl" />
            <div className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full p-[2px] bg-gradient-to-tr from-primary via-accent to-primary/40">
              <img src="/profile.jpg" alt="S Niveditha Krishna" width={288} height={288} className="h-full w-full rounded-full object-cover bg-card" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl h-[85vh] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/90">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">S Niveditha Krishna — Resume</h3>
              <p className="text-xs text-muted-foreground">Updated Resume PDF</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="S_Niveditha_Krishna_Resume.pdf"
              className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground px-3 py-1.5 hover:opacity-90 transition"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg border border-border px-3 py-1.5 hover:bg-secondary transition"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Open Tab
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 bg-secondary/30 relative">
          <iframe
            src="/resume.pdf"
            title="S Niveditha Krishna Resume PDF"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">{eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient" aria-label={title}>
              {title.split("").map((ch, i) => (
                <span key={i} aria-hidden className="jump-letter" style={{ animationDelay: `${i * 35}ms` }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="A developer driven by curiosity and impact.">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="reveal relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card/80 to-secondary/40 p-7 md:p-9 shadow-soft">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <div className="relative space-y-5 text-muted-foreground leading-relaxed">
            <p className="text-lg md:text-xl text-foreground/95 font-medium">
              Hi, I'm <span className="text-gradient font-semibold">S Niveditha Krishna</span> — a Computer Science and Engineering undergraduate with a strong interest in <span className="text-primary font-semibold">Software Development</span> and <span className="text-accent font-semibold">Java Application Development</span>.
            </p>
            <p>
              I have hands-on experience gained through academic and personal projects involving full-stack web applications, databases, and modern web technologies. I bring a strong foundation in programming, problem-solving, and a continuous drive to learn and adapt to new technologies.
            </p>
            <p>
              Our team won the national-level <span className="text-primary font-semibold">Smart India Hackathon 2025</span> for developing an AI-powered career guidance platform. I am actively seeking opportunities to contribute to a collaborative technology environment and grow as a software professional.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {[
            { icon: Sparkles, label: "Focus", value: "Software Dev & Java Applications" },
            { icon: Trophy, label: "Highlight", value: "SIH 2025 National Winner" },
            { icon: GraduationCap, label: "Currently", value: "B.Tech CSE (AI & ML) · CGPA 8.98" },
          ].map(({ icon: Icon, label, value }, idx) => (
            <div key={label} className="reveal flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 shadow-soft" style={{ transitionDelay: `${idx * 80}ms` }}>
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/25 to-accent/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">{label}</p>
                <p className="font-semibold text-foreground/95">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I build with.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map(({ icon: Icon, title, items }, idx) => (
          <div key={title} className="reveal group rounded-2xl border border-border bg-card/50 p-6 hover:border-primary/40 hover:bg-card hover:-translate-y-1 hover:shadow-glow transition-all duration-300 shadow-soft" style={{ transitionDelay: `${idx * 60}ms` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-primary group-hover:scale-105 transition">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="font-semibold">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((it) => (
                <span key={it} className="text-xs rounded-md bg-secondary/70 text-secondary-foreground px-2.5 py-1 border border-border/60">{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work.">
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, idx) => (
          <article key={p.title} className="reveal group relative flex flex-col rounded-2xl border border-border bg-card/60 p-6 hover:border-primary/40 hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-glow transition-all duration-300 shadow-soft" style={{ transitionDelay: `${idx * 90}ms` }}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.subtitle}</p>
              </div>
              {p.badge && (
                <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-primary/15 text-primary text-[11px] font-semibold px-2.5 py-1 border border-primary/30">
                  <Trophy className="h-3 w-3" /> {p.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span key={t} className="text-[11px] rounded bg-secondary/60 text-secondary-foreground px-2 py-0.5 border border-border/60">{t}</span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.live ? (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground px-3.5 py-2 hover:opacity-90 transition">
                  <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                </a>
              ) : null}
              {p.code ? (
                <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium rounded-lg border border-border px-3.5 py-2 hover:bg-secondary transition">
                  <Github className="h-3.5 w-3.5" /> View Code
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm rounded-lg border border-border bg-secondary/40 text-muted-foreground px-3.5 py-2">
                  Code coming soon
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic journey.">
      <div className="relative">
        <div aria-hidden className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-accent/0" />
        <ol className="space-y-10">
          {education.map((e, idx) => {
            const Icon = e.icon;
            const isRight = idx % 2 === 1;
            return (
              <li key={e.school} className="reveal relative md:grid md:grid-cols-2 md:gap-10" style={{ transitionDelay: `${idx * 120}ms` }}>
                <div className={`absolute left-5 md:left-1/2 -translate-x-1/2 top-6 h-3.5 w-3.5 rounded-full border-2 ${e.current ? "bg-primary border-primary shadow-glow animate-pulse" : "bg-card border-border"}`} />
                <div className={`pl-14 md:pl-0 ${isRight ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}>
                  <div className={`inline-block w-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${e.current ? "border-primary/40 bg-gradient-to-br from-primary/10 via-card/80 to-accent/10 shadow-glow" : "border-border bg-card/60 hover:border-primary/30 hover:shadow-soft"}`}>
                    <div className={`flex items-center gap-3 mb-3 ${!isRight ? "md:flex-row-reverse" : ""}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${e.current ? "bg-primary/20 text-primary border border-primary/40" : "bg-secondary text-accent"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`text-[11px] uppercase tracking-[0.18em] font-semibold ${e.current ? "text-primary" : "text-muted-foreground"}`}>{e.period}</span>
                    </div>
                    <h3 className={`font-semibold leading-snug ${e.current ? "text-lg md:text-xl" : "text-base md:text-lg"}`}>{e.school}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{e.degree}</p>
                    <p className={`mt-3 text-sm font-semibold ${e.current ? "text-primary" : "text-foreground/90"}`}>{e.score}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked & contributed.">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="reveal rounded-2xl border border-border bg-card/60 p-6 md:p-7 shadow-soft hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0"><Briefcase className="h-5 w-5" /></div>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-lg font-semibold">Infosys Springboard</h3>
                <span className="text-muted-foreground">·</span>
                <p className="text-muted-foreground">Pragati Cohort 9 (2026)</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />Participated in a structured industry-oriented learning program focused on developing technical and professional skills</li>
                <li className="flex gap-3"><span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />Gained practical exposure through hands-on learning activities and technology-focused coursework</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="reveal rounded-2xl border border-border bg-card/60 p-6 md:p-7 shadow-soft hover:border-accent/40 hover:-translate-y-1 transition-all duration-300" style={{ transitionDelay: "90ms" }}>
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center text-accent shrink-0"><Users className="h-5 w-5" /></div>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-lg font-semibold">Core Member</h3>
                <span className="text-muted-foreground">·</span>
                <p className="text-muted-foreground">IEEE SMC Club (Jan 2026 – Present)</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0" />Organized technical workshops and student events</li>
                <li className="flex gap-3"><span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0" />Assisted in planning and coordination of club activities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Achievements() {
  return (
    <Section id="achievements" eyebrow="Achievements" title="Recognition & wins.">
      <div className="grid sm:grid-cols-2 gap-4">
        {achievements.map(({ icon: Icon, title, note }, idx) => (
          <div key={title} className="reveal flex items-start gap-4 rounded-2xl border border-border bg-card/60 p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 shadow-soft" style={{ transitionDelay: `${idx * 80}ms` }}>
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/25 to-accent/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-muted-foreground">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something together.">
      <div className="rounded-2xl border border-border bg-card/60 p-6 md:p-10 shadow-soft space-y-8">
        <p className="text-muted-foreground max-w-2xl">
          Open to internships, software development roles, and interesting technology problems. Reach out through any of these — I usually reply within a day.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Mail, label: "Email", href: "mailto:shroffniveditha2006@gmail.com" },
            { icon: Github, label: "GitHub", href: "https://github.com/shroffniveditha2006-pixel" },
            { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/s-niveditha-krishna-29b1ab383" },
          ].map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-secondary/30 p-6 hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/15 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Icon className="h-7 w-7" />
              </div>
              <span className="text-base font-semibold">{label}</span>
            </a>
          ))}
        </div>
        <div className="h-px bg-border/60" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const subject = encodeURIComponent(`Portfolio contact from ${data.get("name")}`);
            const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
            window.location.href = `mailto:shroffniveditha2006@gmail.com?subject=${subject}&body=${body}`;
            setSent(true);
            form.reset();
          }}
          className="space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
              <input name="name" required className="w-full rounded-lg bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition" placeholder="Your name" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
              <input name="email" type="email" required className="w-full rounded-lg bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Message</label>
            <textarea name="message" required rows={5} className="w-full rounded-lg bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition resize-none" placeholder="Tell me about your project or opportunity…" />
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition shadow-glow">
            <Send className="h-4 w-4" /> Send Message
          </button>
          {sent && <p className="text-xs text-accent">Opening your email client…</p>}
        </form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} S Niveditha Krishna. Crafted with care.</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/shroffniveditha2006-pixel" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition"><Github className="h-4 w-4" /></a>
          <a href="https://www.linkedin.com/in/s-niveditha-krishna-29b1ab383" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition"><Linkedin className="h-4 w-4" /></a>
          <a href="mailto:shroffniveditha2006@gmail.com" className="hover:text-foreground transition"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}
