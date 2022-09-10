import { useEffect } from 'react';
import { useStore } from '../store/Store';
import { setContract } from '../reducers/provider'
import ethernizeABI from '../contracts/Ethernize.json';

export const useContract = (abi: any, address: string) => {
  const [state, dispatch] = useStore();
  const { web3Provider: web3 } = state;

  useEffect(() => {
    if (web3) {
      dispatch(setContract(new web3.eth.Contract(abi, address)));
    }
  }, [abi, address, web3]);
};

export const useEthernize = () => {
  return useContract(ethernizeABI, String(process?.env?.MAIN_CONTRACT));
}
