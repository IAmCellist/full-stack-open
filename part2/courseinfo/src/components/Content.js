import Total from "./Total"
import Part from "./Part"

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part}/>)}  
      <Total parts={parts} />
    </>
  )
}

export default Content