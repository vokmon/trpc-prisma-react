import { useEffect, useRef } from 'react';

export default function IframeChid() {
  const isSent = useRef(false);
  useEffect(() => {
    if (!isSent.current) {
      isSent.current = true;
      window.parent.postMessage({ event: 'ready' }, '*');
      console.log('send message');
    }

    const register = (e: MessageEvent) => {
      // Get the sent data
      const data = e.data;
      if (data.event === 'init-web') {
        console.log('init-web', data);
      }
    };

    window.addEventListener('message', register);

    return () => {
      window.removeEventListener('message', register);
    };
  }, []);
  return <div>IframeChid</div>;
}
