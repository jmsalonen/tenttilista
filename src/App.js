import './App.css'
import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'

import ExamList from './ExamList.js'

const App = ({database}) => {
  
  const notSelected = -1
  const [data, setData] = useState(database)

  const updateSelected = (selected) => {
    let newData = JSON.parse(JSON.stringify(data))
    newData.selected = selected
    setData(newData)
  }
  
  const updateExam = (exam, index) => {
    let newData = JSON.parse(JSON.stringify(data))
    newData.exam[index] = exam
    setData(newData)
  }

  const handleButton = (exam, index) => {
    exam.finished = true
    updateExam(exam, index)
  }

  useEffect(() => {
    window.localStorage.setItem('data', JSON.stringify(data))
  }, [data])

  return (
    <div className="Tenttilista">
      {data.exam.map((item, index) => 
        (
          <Button color="primary" onClick={() => 
            (data.selected === index ? updateSelected(notSelected) : updateSelected(index))}>
            {item.title}
          </Button>
        )
      )}
      {data.exam.map((item, index) => 
        ( index === data.selected ? 
          <>
          <ExamList
            key={item.title + index}
            id={index}
            thisExam={item}
            updateExam={updateExam}
          />
          <Button variant="contained" color="primary" onClick={() => handleButton(item, index)}>{item.finished ? "Finished" : "Finished"}</Button>
          </>
        : "")
      )}
    </div>
  )
}

export default App
