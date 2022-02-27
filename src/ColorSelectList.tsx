import React from 'react';
import { FormControl } from '@mui/material';
import { Select, MenuItem } from '@mui/material';

export default function ColorSelectList(props: any) {
  const deepCopy = (array: any) => JSON.parse(JSON.stringify(array))
  const handleChange1 = (event: any) => {
    const index = event.target.name
    const a = index.split(',').map((s: any) => { return parseInt(s, 10)})
    const b = deepCopy(props.board)
    b[a[0]][a[1]] = event.target.value
    props.setBoard(b)
  }
  const list = [0,1,2,3,4]

  return (
    <>
      <div>
        {list.map((i)=>{
          return <FormControl
                   sx={{ m: 0.2, minWidth: 3 }}
                   key={`FormControl-${i}`}
                 >
            <Select
              value={props.board[props.rowIndex][i]}
              name={`${props.rowIndex},${i}`}
              onChange={handleChange1}
            >
              <MenuItem value={0}>⬜</MenuItem>
              <MenuItem value={1}>🟨</MenuItem>
              <MenuItem value={2}>🟩</MenuItem>
            </Select>
          </FormControl>
        })}
      </div>
    </>
  );
}
