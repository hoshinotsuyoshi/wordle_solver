import CandidateSources from './CandidateSources'

const matcher = (char:string, position:number, color:number) => {
  if (!char) {
    return((_:any) => { return true })
  }
  switch(color) {
  case 2:
    return((word:string) => {
      return(word[position] === char)
    })
  case 1:
    return((word:string) => {
      return(word[position] !== char && (word.indexOf(char) >= 0))
    })
  default:
    return((word:string) => {
      return(word.indexOf(char) < 0)
    })
  }
}

export default function Recalculate(board:number[][], words:string[]) {
  const matchers = board.flatMap((row, rowIndex) => {
    return row.map((c, position) => {
      return matcher(words[rowIndex][position], position, c)
    })
  })

  const candidates = CandidateSources.filter((candidate) => {
    return matchers.every((m) => {
      return m(candidate)
    })
  })
  return(candidates.join('\n'))
}
