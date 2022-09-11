import { useEffect, useState } from "react";
import { utils } from 'ethers';
import styled from 'styled-components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { hexToBase64, hexToString } from 'utils/service';
import { filterByEvent } from "utils/call";
import { Divider } from "@material-ui/core";

interface ListProps {
  account: string
  contract: any
}

const ListResult = ({ contract }) => {
  const [data, setData] = useState<any>([])
  useEffect(() => {
    if (!contract) return;

    filterByEvent(contract, 'Ethernize').then((result) => {
      const resultFiltered = result.map((value) => {
        const name = utils.parseBytes32String(String(value.returnValues.name));
        let data = String(value?.returnValues?.data?.replace("0x", ""))
        if (name === 'null') {
          data = hexToString(data)
        } else {
          data = hexToBase64(data)
        }

        return ({
        name: utils.parseBytes32String(String(value.returnValues.name)),
        value: data
      })});

      setData(resultFiltered);
    });

  }, [contract]);

  if (!data.length) return <></>;

  return (
    <ListContent>
      {data.map(({ name, value }) => (
        <>
          <ListItem>
            <ListItemText primary={name === 'null' ? value : name} />
            <ListItemAvatar>
              {name.match(/image/g) && <img src={`${name},${value}`} height={100} width={100} />}
            </ListItemAvatar>
          </ListItem>
          <Divider />
        </>
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
