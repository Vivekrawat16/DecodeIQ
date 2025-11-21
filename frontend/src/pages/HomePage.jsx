import { SignInButton } from "@clerk/clerk-react";
import { Code2, Terminal, Zap, ChevronRight, CheckCircle2, Users, Trophy, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content relative overflow-hidden selection:bg-primary selection:text-white">

      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-base-content/5 bg-base-100/50 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="DecodeIQ" className="size-9 rounded-lg shadow-lg shadow-primary/20" />
            <span className="font-bold text-xl tracking-tight">DecodeIQ</span>
          </div>

          <div className="flex items-center gap-4">
            <SignInButton mode="modal">
              <button className="text-sm font-medium hover:text-primary transition-colors">Sign In</button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                Get Started
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20 animate-fade-in-up">
            <Zap className="size-3" />
            <span>The Ultimate Coding Interview Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 animate-fade-in-up delay-100">
            Prepare The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
              Technical Interview
            </span> <br />
            And Code With Friends
          </h1>

          <p className="text-lg text-base-content/60 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
            Join thousands of developers practicing live coding problems, mock interviews, and system design challenges in a real-time collaborative environment.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 animate-fade-in-up delay-300">
            <SignInButton mode="modal">
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                Start Coding Free
                <ChevronRight className="size-5" />
              </button>
            </SignInButton>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-base-100 border border-base-content/10 font-semibold text-lg hover:bg-base-200 transition-all flex items-center justify-center gap-2">
              <Terminal className="size-5 text-base-content/70" />
              Live Demo
            </button>
          </div>
        </div>

        {/* Code Editor Mockup */}
        <div className="mt-20 relative max-w-5xl mx-auto animate-fade-in-up delay-500">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl blur opacity-20"></div>
          <div className="relative rounded-xl border border-base-content/10 bg-[#09090b] shadow-2xl overflow-hidden ring-1 ring-white/5">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="size-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="size-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <div className="ml-4 px-3 py-1 rounded-md bg-white/5 text-xs font-mono text-base-content/50 border border-white/5 flex items-center gap-2">
                <Code2 className="size-3" />
                two_sum.js
              </div>
            </div>
            <div className="p-6 font-mono text-sm overflow-x-auto custom-scrollbar">
              <div className="text-emerald-400">function <span className="text-yellow-300">twoSum</span>(nums, target) {"{"}</div>
              <div className="pl-4 text-base-content/80">const map = new <span className="text-purple-400">Map</span>();</div>
              <div className="pl-4 text-base-content/80">for (let i = 0; i &lt; nums.length; i++) {"{"}</div>
              <div className="pl-8 text-base-content/80">const complement = target - nums[i];</div>
              <div className="pl-8 text-base-content/80">if (map.<span className="text-blue-400">has</span>(complement)) {"{"}</div>
              <div className="pl-12 text-base-content/80">return [map.<span className="text-blue-400">get</span>(complement), i];</div>
              <div className="pl-8 text-base-content/80">{"}"}</div>
              <div className="pl-8 text-base-content/80">map.<span className="text-blue-400">set</span>(nums[i], i);</div>
              <div className="pl-4 text-base-content/80">{"}"}</div>
              <div className="text-emerald-400">{"}"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 border-y border-base-content/5 bg-base-100/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Developers", value: "10K+", icon: Users },
              { label: "Problems Solved", value: "500K+", icon: CheckCircle2 },
              { label: "Interviews Aced", value: "1K+", icon: Trophy },
              { label: "Uptime", value: "99.9%", icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-2 group-hover:scale-110 transition-transform">
                  <stat.icon className="size-6" />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-base-content/60 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to succeed</h2>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
            Our platform provides a comprehensive suite of tools designed to help you master data structures, algorithms, and system design.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Real-time Collaboration",
              desc: "Code with peers in real-time using our advanced collaborative editor with syntax highlighting and multi-cursor support.",
              icon: Zap,
              color: "text-yellow-400",
              bg: "bg-yellow-400/10"
            },
            {
              title: "Mock Interviews",
              desc: "Simulate real interview environments with integrated video chat, whiteboard, and shared coding spaces.",
              icon: Terminal,
              color: "text-purple-400",
              bg: "bg-purple-400/10"
            },
            {
              title: "Curated Problems",
              desc: "Practice with a curated list of problems from top tech companies, categorized by difficulty and topic.",
              icon: CheckCircle2,
              color: "text-emerald-400",
              bg: "bg-emerald-400/10"
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-base-100 border border-base-content/5 hover:border-primary/20 transition-all hover:shadow-2xl hover:-translate-y-1 group">
              <div className={`size-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`size-7 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-base-content/60 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-base-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-base-content/60">Simple steps to master your interview skills</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-base-content/5 via-primary/20 to-base-content/5 border-t border-dashed border-base-content/20"></div>

            {[
              { step: "01", title: "Choose a Problem", desc: "Select from hundreds of curated coding challenges." },
              { step: "02", title: "Join a Session", desc: "Connect with a peer or invite a friend to practice." },
              { step: "03", title: "Code & Learn", desc: "Solve the problem together and get instant feedback." }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center z-10">
                <div className="size-24 rounded-full bg-base-100 border-4 border-base-200 flex items-center justify-center mb-6 shadow-xl">
                  <span className="text-3xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-base-content/60 max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-primary/20 to-emerald-500/20 p-12 md:p-20 text-center border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to ace your next interview?</h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto mb-10">
            Join the fastest growing community of developers preparing for technical interviews.
          </p>

          <SignInButton mode="modal">
            <button className="px-10 py-5 rounded-2xl bg-primary text-white font-bold text-xl hover:bg-primary/90 transition-all hover:scale-105 shadow-2xl shadow-primary/30 inline-flex items-center gap-3">
              Get Started for Free
              <ArrowRight className="size-6" />
            </button>
          </SignInButton>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-base-content/5 py-12 bg-base-100/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <Code2 className="size-4" />
            </div>
            <span className="font-bold text-lg">DecodeIQ</span>
          </div>
          <div className="text-sm text-base-content/50">
            © {new Date().getFullYear()} DecodeIQ. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-base-content/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default HomePage;
