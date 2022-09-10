import { useState } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core';
import useWallet from 'hook/useWallet';
import { useStore } from 'store/Store';
import Button from '../Button'
import Form from '../Form'
import { useEthernize } from 'hook/useContract';

const Main = () => {
  const [state, dispatch] = useStore();
  const { account, contract } = state;
  const { connect, disconnect } = useWallet(state, dispatch);
  useEthernize();

  return (
    <Container>
      <Typography>Ethernizer</Typography>
      <Button account={account} onConnect={connect} onDisconnect={disconnect} />
      {account?.length > 0 && <Form account={account} contract={contract} />}
    </Container>
  )
}

const { Container } = {
  Container: styled.section`
    display: grid;
    grid-auto-flow: columns;
    gap: 1rem;
    margin-bottom: 1rem;
  `
}

export default Main;
