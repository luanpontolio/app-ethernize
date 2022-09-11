import { utils } from 'ethers';

export const ethernize = (
  contract: any,
  account: string,
  name?: string,
  data?: string
) => dispatch => {
  dispatch('info');

  return contract.methods.ethernize(
    utils.formatBytes32String(String(name)),
    utils.hexlify(`0x${data}`)
  )
  .send({ from: account })
  .once('confirmation', (data: any) => {
    dispatch('success');
  })
  .on('error', (error: any) => dispatch('error'));
}

export const filterByEvent = async (
  contract: any,
  eventName: string,
) => {
  return await contract.getPastEvents(eventName, {
    fromBlock: 0,
    toBlock: 'latest',
  });
}
