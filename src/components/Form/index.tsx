import { useRef, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ethernize } from 'utils/call';
import { base64ToHex } from 'utils/service';
import { messages } from 'utils/message';
import 'react-toastify/dist/ReactToastify.css';

interface FormProps {
  account: string
  contract: any
}

interface DragDropFileProps {
  setName: any
  setData: any
}

const FormInput = ({ setName }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value.trim());
  }

  return (
    <Textarea multiline maxRows={100} minRows={1} onChange={handleChange} />
  )
}

const DragDropFile = ({ setData, setName }: DragDropFileProps) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef(null)

  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  }

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(!dragActive);
    } else if (e.type === "dragleave") {
      setDragActive(!dragActive);
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = () => {
      const { result } = reader;
      const [name, data] = String(result).split(",");
      setName(name);
      setData(base64ToHex(data));
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <>
      <SectionContent onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <Input ref={inputRef} type="file" onChange={handleChange} />
        <Label htmlFor="input-file-upload" active={dragActive}>
          <div>
            <p>Drag and drop your file here or</p>
            <Button onClick={onButtonClick}>Upload a file</Button>
          </div>
        </Label>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </SectionContent>
    </>
  );
};

const Form = ({ account, contract }: FormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(null);
  const [data, setData] = useState<string>("");
  const [type, setType] = useState<string>("file");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value);
  };

  function dispatchAction(key: string) {
    setLoading(key === 'info');
    toast[key](messages[key], {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  async function onSubmit(name: string, data: string = "0x") {
    if (!account && !contract && !name.length && !data.length) return;

    await ethernize(contract, account, name, data)(dispatchAction);
  }

  return (
    <Container>
      <Content>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={type}
            onChange={handleChange}
          >
            <FormControlLabel value="file" control={<Radio />} label="Drag and Drop File" />
            <FormControlLabel value="text" control={<Radio />} label="Text" />
          </RadioGroup>
        </FormControl>
      </Content>
      <Content>
        <Section>
          { type === 'file' ? <DragDropFile setName={setName} setData={setData} /> : <FormInput setName={setName} /> }
          { loading ?
            <CircularProgress /> :
            <Button
              variant="contained"
              disabled={!name?.length}
              onClick={() => onSubmit(name, data)}
            >
              Send
            </Button>
          }
        </Section>
      </Content>
      <ToastContainer />
    </Container>
  )
}

const { Container, Content, Section, SectionContent, Input, Textarea, Label } = {
  Container: styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 3fr 4fr;
    align-items: start;
  `,
  Content: styled.section`
    display: grid;
    grid-auto-flow: row;
    gap: 1rem;
  `,
  Section: styled.div`
    background: #2C2C2C;
    display: grid;
    padding: 1rem;
    border-radius: 0.5rem;
    gap: 1rem;

    @media (min-width: 960px) {
      padding: 2rem;
    }
  `,
  SectionContent: styled(FormControl)`
    background: #141416;
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: grid;
    grid-auto-flow: row;
    gap: 0.5rem;

    @media (min-width: 960px) {
      padding: 1rem;
      gap: 1rem;
    }
  `,
  Input: styled.input`
    display: none;
  `,
  Label: styled.label<{ active?: boolean }>`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-radius: 0.5rem;
    border-style: dashed;
    border-color: #cbd5e1;
    padding: 1rem;
    ${({ active }) =>
      active &&
      `
        > div {
          background: #fff;
        }
      `}
  `,
  Textarea: styled(TextField)``

}

export default Form;
