import { useEffect } from 'react';
import { usePlaybackStore } from '@/hooks/use-playback-store';
import { supabase } from '@/lib/supabase/client';
import { DateTime } from 'luxon';

export function useGlobalSync() {
  const { updateGlobalTime, setColumnStatus } = usePlaybackStore();
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let syncChannel: any;
    let controlsChannel: any;

    const initializeSync = async () => {
      // SECURITY: Ensure we have a session before starting sync or fetching.
      // This prevents 401 noise and unnecessary background work.
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // 1. Local authoritative clock - DISABLED as it is currently unused in the UI
      // and causes unnecessary global re-renders every second.
      /*
      interval = setInterval(() => {
        updateGlobalTime(DateTime.now());
      }, 1000);
      */

      // 2. Listen for Global Sync Tick (Supabase Realtime)
      syncChannel = supabase
        .channel('global-sync')
        .on('broadcast', { event: 'tick' }, ({ payload }) => {
          // Sync tick received
        })
        .subscribe();

      // 3. Listen for Playback Control Changes
      controlsChannel = supabase
        .channel('playback-controls')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'column_playback_controls' },
          (payload) => {
            const { column_index, state } = payload.new as any;
            if (column_index !== undefined && state) {
              setColumnStatus(column_index, state === 'RUNNING' ? 'RUNNING' : 'PAUSED');
            }
          }
        )
        .subscribe();

      // Initial fetch of controls
      try {
        const { data, error } = await supabase.from('column_playback_controls').select('*');
        if (error) {
          console.error('[Sync] Error fetching controls:', error);
        } else {
          data?.forEach((control) => {
            setColumnStatus(control.column_index, control.state === 'RUNNING' ? 'RUNNING' : 'PAUSED');
          });
        }
      } catch (err) {
        console.error('[Sync] Unexpected error fetching controls:', err);
      }
    };

    initializeSync();

    return () => {
      if (interval) clearInterval(interval);
      if (syncChannel) supabase.removeChannel(syncChannel);
      if (controlsChannel) supabase.removeChannel(controlsChannel);
    };
  }, [updateGlobalTime, setColumnStatus]);
}
