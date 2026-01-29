import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Code2, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Github, 
  BotMessageSquare,
  Menu, 
  X,
  Layers,
  FileSearchCorner
} from 'lucide-react';

const Welcome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50c text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <BotMessageSquare className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                DocuMind AI
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">How it works</a>
              <button onClick={()=>navigate("/auth")} className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 hover:cursor-pointer">
                Try It Out
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4">
            <a href="#features" className="block text-base font-medium text-slate-600">Features</a>
            <a href="#about" className="block text-base font-medium text-slate-600">How it works</a>
            <button className="w-full bg-indigo-600 text-white px-5 py-3 rounded-xl text-base font-semibold ">
              Try It Out
            </button>
          </div>
        )}
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-300 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-300 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-5xl mx-auto text-center">
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              The smartest way to <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600">
                make your document talk.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              DocuMind AI combines lightning-fast document retrieval with enterprise-grade JWT security. Manage your entire RAG-powered knowledge base from a single, high-performance React dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={()=>navigate("/auth")}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all hover:-translate-y-1 hover:cursor-pointer"
              >
                Try It Out Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href='https://github.com/Navneetsinghnegi/DocumindAI' className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm">
                <Github className="w-5 h-5" />
                View Source
              </a>
            </div>

            
            
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to know</h2>
              <p className="text-slate-600">Features of Documind AI</p>
            </div>

            <div className="grid md:grid-grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Zap className="text-amber-500" />}
                title="Sub-100ms Retrieval"
                description="Powered by a cutting-edge FAISS vector engine that ensures lightning-fast semantic search and real-time document querying for large-scale PDF datasets.."
              />
              <FeatureCard 
                icon={<ShieldCheck className="text-emerald-500" />}
                title="Security First"
                description="Robust JWT-based authentication and end-to-end encryption protocols keep your proprietary data safe and restricted to authorized users 24/7."
              />
              <FeatureCard 
                icon={<Code2 className="text-indigo-500" />}
                title="Clean FastAPI Architecture"
                description="Highly documented RESTful APIs and a modular microservices stack containerized with Docker for seamless integration into any development workflow."
              />
              <FeatureCard 
                icon={<FileSearchCorner className="text-blue-500" />}
                title="Native LLM Inference"
                description="Built with Zephyr-7b-beta for high-fidelity local reasoning. By bypassing heavy frameworks, DocuMind AI achieves lower latency and more precise control over the model's generation capabilities."
              />
              <FeatureCard 
                icon={<Globe className="text-blue-500" />}
                title="Scalable Deployment"
                description="Architected for the cloud using Dockerized microservices, allowing for instant scaling and deployment across global regions with consistent cross-environment performance."
              />
              <FeatureCard 
                icon={<Layers className="text-violet-500" />}
                title="Modular Design"
                description="A decoupled architecture featuring a reactive TypeScript/React frontend and a high-performance Python backend, allowing you to pick and choose components for your specific AI needs."
              />
              
            </div>
          </div>
        </section>

        {/* What Is It / About Section */}
        <section id="about" className="py-24 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">What exactly is NovaStack?</h2>
                <div className="space-y-6 text-lg text-slate-600">
                  <p>
                    <strong>Documind AI</strong> is an end-to-end, <strong>full-stack RAG (Retrieval-Augmented Generation)</strong> ecosystem designed to transform static document repositories into intelligent, interactive knowledge bases. Built to solve the complexity of large-scale document analysis, it provides a centralized dashboard for querying complex PDF datasets with high-fidelity, citation-backed responses.
                  </p>
                  <p>
                    Whether you are managing technical documentation or vast research libraries, Documind AI delivers the authentication, semantic search infrastructure, and local LLM reasoning required to gain insights without compromising data privacy.
                  </p>
                  <ul className="space-y-3">
                    {['Sub-second Semantic Retrieval: Powered by an optimized FAISS vector engine.', 'Enterprise-Grade Security: Full JWT-based authentication and role-based access.', 'Native LLM Inference: High-accuracy reasoning via a local Zephyr-7b-beta integration.'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-900 font-medium">
                        <div className="h-2 w-2 rounded-full bg-indigo-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <div className="flex justify-center items-center gap-2 mb-6">
                
                
             </div>
             
          </div>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-50 transition-all group">
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

export default Welcome;