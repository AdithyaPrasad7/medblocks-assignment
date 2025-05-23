import { useEffect, useRef } from "react";

export const useBroadcastChannel = (
  channelName: string,
  onMessage: (message: any) => void
): { postMessage: (message: any) => void } => {
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if ("BroadcastChannel" in window) {
      channelRef.current = new BroadcastChannel(channelName);
      channelRef.current.onmessage = (event) => {
        onMessage(event.data);
      };
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.close();
      }
    };
  }, [channelName, onMessage]);

  const postMessage = (message: any) => {
    if (channelRef.current) {
      channelRef.current.postMessage(message);
    }
  };

  return { postMessage };
};
