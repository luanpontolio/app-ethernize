import { useEffect, useState } from "react";
import { utils } from 'ethers';
import styled from 'styled-components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { hexToBase64 } from 'utils/service';
import { filterByEvent } from "utils/call";

interface ListProps {
  account: string
  contract: any
}

const ListResult = ({ contract }) => {
  const [data, setData] = useState<any>([])
  useEffect(() => {
    if (!contract) return;

    filterByEvent(contract, 'Ethernize').then((result) => {
      const resultFiltered = result.map((value) => ({
        name: utils.parseBytes32String(String(value.returnValues.name)),
        value: hexToBase64(String(value?.returnValues?.data?.replace("0x", "")))
      }));

      setData(resultFiltered);
    });

  }, [contract]);

  if (!data.length) return <></>;

  return (
    <ListContent>
      {data.map(({ name, value }) => (
        <ListItem>
          <ListItemText primary={name || value} />
          <ListItemAvatar>
            {name.match(/image/g) && <img src={`${name},${value}`} height={100} width={100} />}
          </ListItemAvatar>
        </ListItem>
      ))}
    </ListContent>
  );
}

const { ListContent } = {
  ListContent: styled(List)`
    width: '100%';
    background-color: #2C2C2C;
  `
}

export default ListResult;
