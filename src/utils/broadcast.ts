const channel: BroadcastChannel = new BroadcastChannel("patients-sync");

export const broadcastChannel = () => {
  const listenToBroadcastChannel = (callback: (data: any) => void) => {
    const handler = (event: MessageEvent) => callback(event.data);
    channel.addEventListener("message", handler);
    channel.removeEventListener("message", handler);
  };

  const postBroadcastMessage = (data: any): void => {
    channel.postMessage(data);
  };

  return {
    listenToBroadcastChannel,
    postBroadcastMessage,
  };
};
