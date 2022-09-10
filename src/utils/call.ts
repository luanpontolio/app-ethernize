export const ethernize = async (
  contract: any,
  account: string,
  name: string,
  data: string
) => {
  return contract.methods.ethernize(name, data).send({ from: { account }});
}