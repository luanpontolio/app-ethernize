import { useEthernize } from 'hook/useContract';
import { useState } from 'react';
import styled from 'styled-components';
import { ethernize } from 'utils/call';

interface FormProps {
  account: string
}

const Form = ({ account }: FormProps) => {
  const contract = useEthernize();
  const [type, setType] = useState<boolean>(false);

  async function onSubmit() {
    if (!account) return;

    // await ethernize(contract, )
  }

  return (
    <Container>
      <Content>

      </Content>
      <Content></Content>
    </Container>
  )
}

const { Container, Content } = {
  Container: styled.div`
    display: grid;
    gap: 1rem;
  `,
  Content: styled.section`
    display: grid;
    grid-auto-flow: row;
    gap: 1rem;
  `
}

export default Form;
