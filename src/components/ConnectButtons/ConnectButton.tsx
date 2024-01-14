interface ConnectButtonProps {
  // any type here to make this dynamic as possible
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: any;
  isConnected: boolean;
}

const ConnectButton = ({ cb, isConnected }: ConnectButtonProps) => (
  <button disabled={isConnected} onClick={cb}>
    {isConnected ? "Connected" : "Connect Wallet"}
  </button>
);

export default ConnectButton;
