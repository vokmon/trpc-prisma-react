import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { useUserStore } from '../../stores/UserStores';

export default function IframeParent() {
  const iframe = useRef<HTMLIFrameElement>(null);

  const tokens = useStore(useUserStore, (state) => state.tokens);

  useEffect(() => {
    const register = (e: MessageEvent) => {
      // Get the sent data
      const data = e.data;
      if (data.event === 'ready') {
        iframe.current?.contentWindow?.postMessage({event: 'init-web', data: tokens}, '*');
      }
    };
    window.addEventListener('message', register);

    return () => {
      window.removeEventListener('message', register);
    };
  }, []);
  return (
    <iframe
      ref={iframe}
      className="w-full h-full border-2"
      src={`${window.location.origin}/iframe-children`}
    />
  );
}
