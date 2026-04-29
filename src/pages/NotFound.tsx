import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a111e] p-4 text-white">
      <div className="flex flex-col items-center max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <img 
          src="/titulo.png" 
          alt="Logo" 
          className="h-20 sm:h-24 object-contain mb-4"
        />
        
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-7xl font-extrabold text-[#8df3db] tracking-tighter">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold uppercase tracking-widest text-slate-400">
            Página não encontrada
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            O endereço que você tentou acessar não existe ou foi movido. 
            Verifique a URL ou retorne ao painel principal.
          </p>
        </div>

        <Link 
          to="/a01" 
          className="px-8 py-3 bg-[#8df3db]/10 border border-[#8df3db]/30 text-[#8df3db] rounded-full font-bold uppercase tracking-widest hover:bg-[#8df3db]/20 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(141,243,219,0.1)]"
        >
          Voltar ao Painel
        </Link>
      </div>
      
      <div className="fixed bottom-8 text-[10px] uppercase tracking-[0.2em] text-slate-700 font-mono">
        Governo do Estado de Mato Grosso
      </div>
    </div>
  );
};

export default NotFound;
