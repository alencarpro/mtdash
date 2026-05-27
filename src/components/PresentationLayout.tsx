import React, { useEffect, useState, useRef } from 'react';
import { usePlaybackStore } from '@/hooks/use-playback-store';
import { useUIStore } from '@/hooks/use-ui-store';

import { Settings, Maximize2 } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';

export function PresentationLayout() {
  const { setAdmin } = useUIStore();
  const { role, signOut } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const canAccessAdmin = role === 'admin' || role === 'super_admin';
  const [controlsVisible, setControlsVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && canAccessAdmin) {
        setAdmin(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [setAdmin, canAccessAdmin]);

  const showControls = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setControlsVisible(true);
  };

  const scheduleHide = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setControlsVisible(false), 5000);
  };

  useEffect(() => () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col md:flex-row h-screen w-full overflow-y-auto md:overflow-hidden bg-background text-foreground select-none"
    >

      {[0, 1, 2, 3].map((colIndex) => (
        <DashboardColumn key={colIndex} index={colIndex} />
      ))}

      {/* Hover hotspot bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-48 h-48 z-40"
        onMouseEnter={showControls}
        onMouseLeave={scheduleHide}
      />

      {/* Floating Controls */}
      <div
        className={`absolute bottom-8 right-8 flex gap-4 transition-opacity duration-300 z-50 ${controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onMouseEnter={showControls}
        onMouseLeave={scheduleHide}
      >
        <button
          onClick={signOut}
          className="p-4 bg-secondary/10 hover:bg-destructive/20 rounded-full border border-border text-foreground/60 hover:text-destructive transition-all"
          title="Sair"
        >
          <LogOut className="w-6 h-6" />
        </button>
        <button
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }}
          className="p-4 bg-secondary/10 hover:bg-secondary/20 rounded-full border border-border"
          title="Tela Cheia"
        >
          <Maximize2 className="w-6 h-6 text-foreground/60" />
        </button>
        {canAccessAdmin && (
          <button
            onClick={() => setAdmin(true)}
            className="p-4 bg-secondary/10 hover:bg-secondary/20 rounded-full border border-border"
            title="Painel Admin"
          >
            <Settings className="w-6 h-6 text-primary" />
          </button>
        )}
      </div>
    </div>
  );
}


function DashboardColumn({ index }: { index: number }) {
  const state = usePlaybackStore((state) => state.columnStates[index]);

  return (
    <div className="relative flex-1 h-full border-r border-border last:border-0 overflow-hidden">
      {/* Responsive Content Container */}
      <div className="h-full w-full flex flex-col">
          {/* Dashboard Header - Responsive scaling */}
          <div className="p-6 md:p-10 border-b border-border bg-secondary/10">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-[0.6rem] md:text-xs font-mono uppercase tracking-[0.3em] text-primary/60 mb-1">
                  System // Monitor // Ch {index + 1}
                </h3>
                <h2 className="text-xl md:text-3xl font-bold tracking-tight opacity-90">
                  Dashboard de Exemplo
                </h2>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-[0.6rem] font-mono opacity-20 uppercase">Status</div>
                <div className="text-xs font-mono text-primary">ACTIVE</div>
              </div>
            </div>
          </div>

          {/* Grid Content - Adapts to height/width */}
          <div className="flex-1 p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-secondary/10 border border-border rounded-xl flex items-center justify-center relative overflow-hidden group/widget">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/widget:opacity-100 transition-opacity" />
                <span className="text-[0.6rem] md:text-xs font-mono opacity-10 uppercase tracking-widest">Widget {i}</span>
              </div>
            ))}
          </div>
        </div>

      {/* Column Status Indicator */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex items-center gap-3">
        <div className={`h-2 w-2 md:h-3 md:w-3 rounded-full ${state.status === 'RUNNING' ? 'bg-primary shadow-[0_0_15px_var(--color-primary)] animate-pulse' : 'bg-warning shadow-[0_0_10px_var(--color-warning)]'}`} />
        <span className="text-[0.6rem] md:text-sm font-mono uppercase tracking-[0.2em] opacity-40">
          {state.status}
        </span>
      </div>
    </div>
  );
}

