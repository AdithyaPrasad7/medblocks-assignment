let channel: BroadcastChannel | null = null;

const getChannel = (): BroadcastChannel => {
  if (!channel) {
    channel = new BroadcastChannel("patients-sync");
  }
  return channel;
};

export const broadcastChannel = () => {
  const channel = getChannel();
  const listenToBroadcastChannel = (callback: (data: any) => void) => {
    const handler = (event: MessageEvent) => callback(event.data);
    channel.addEventListener("message", handler);
  };

  const postBroadcastMessage = (data: any): void => {
    channel.postMessage(data);
  };

  return {
    listenToBroadcastChannel,
    postBroadcastMessage,
  };
};
