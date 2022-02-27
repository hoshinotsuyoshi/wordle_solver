import React from 'react';
import './App.css';

import { FormControl, InputLabel, Input, Box } from '@mui/material';
import { TextField } from '@mui/material';
import ColorSelectList from './ColorSelectList'
import Recalculate from './Recalculate'

function App() {
  const deepCopy = (array: any) => JSON.parse(JSON.stringify(array))
  const [board, setBoard] = React.useState([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]])
  const [words, setWords] = React.useState(['', '', ''])
  const [candidates, setCandidates] = React.useState('')

  React.useEffect(() => {
    const candidates = Recalculate(board, words)
    setCandidates(candidates)
  }, [board, words]);

  const handleWordChange = (event: any) => {
    const index = event.target.name
    const i = parseInt(index, 10)
    const ws = deepCopy(words)
    ws[i] = event.target.value
    setWords(ws)
  }

  const wordLength = 5
  const list = [0,1,2]

  return (
    <div className="App">
      <header className="App-header">
        {list.map((rowIndex)=>{
          return <Box
                   sx={{ m: 2 }}
                   key={`Box-${rowIndex}`}
                 >
            <FormControl>
              <InputLabel>word {`${rowIndex}`}</InputLabel>
              <Input
                inputProps={{ maxLength: wordLength }}
                value={words[rowIndex]}
                name={`${rowIndex}`}
                onChange={handleWordChange}
              />
            </FormControl>

            <ColorSelectList
              board={board}
              setBoard={setBoard}
              rowIndex={rowIndex}
            />
          </Box>
        })}
        <TextField
          label="Candidates"
          multiline
          maxRows={10}
          minRows={10}
          value={candidates}
          variant="filled"
        />
      </header>
    </div>
  );
}

export default App;
