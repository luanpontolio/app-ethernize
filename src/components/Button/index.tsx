import { Button } from '@material-ui/core';

interface ButtonProps {
  account: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export default function ConnectWallet({ account, onConnect, onDisconnect }: ButtonProps) {
  const Connect = () => (
    <Button onClick={onConnect} variant="contained">
      {"Connect"}
    </Button>
  )

  const Disconnect = () => (
    <Button onClick={onDisconnect} variant="contained">
      {[account.slice(0, 6), account.slice(-6)].join('...')} {'Disconnect'}
    </Button>
  )
  return account?.length > 0 ? <Disconnect /> : <Connect/>;
}