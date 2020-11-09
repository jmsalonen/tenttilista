import './App.css'
import { useEffect, useState } from 'react'
import { Button, Tab, TextField } from '@material-ui/core'

import ExamList from './ExamList.js'
import Header from './Header.js'

const App = ({database, updateDatabase}) => {
  
  const notSelected = -1
  const [data, setData] = useState(database)
  const [examName, setExamName] = useState("")

  const updateSelected = (selected) => {
    let newData = JSON.parse(JSON.stringify(data))
    newData.selected = selected
    setData(newData)
  }

  const updatePrivilege = (privilege) => {
    let newData = JSON.parse(JSON.stringify(data)); 
    newData.privilege = privilege === "student" ? "teacher" : "student"
    console.log(newData.privilege)
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

  const addNewExam = () => {
    let newData = JSON.parse(JSON.stringify(data))
    newData.exam.push({title: "", finished: false, question: []})
    newData.selected = newData.exam.length - 1
    setData(newData)
  }

  const removeExam = (examId) => {
    let newData = JSON.parse(JSON.stringify(data))
    newData.exam = newData.exam.filter((item, index) => index !== examId)
    if (newData.exam.length < 1)
      newData.exam.push({title: "", finished: false, question: []})
    setData(newData)
  }

  const updateExamName = () => {
    let newData = JSON.parse(JSON.stringify(data))
    let lastItem = newData.exam.length - 1;
    newData.exam[lastItem].title = examName
    setData(newData)
    setExamName("")
  }

  useEffect(() => {
    updateDatabase(data)
  }, [data])

  return (
    <div>
    <Header userPrivilege={data.privilege} updatePrivilege={() => updatePrivilege(data.privilege)} />
      {data.privilege === "student" && 
       data.exam.length === 1 &&
       data.exam[0].title.length < 1
      ? <div>no exam</div> 
      :
      <div className="Tenttilista">
        {data.exam.map((item, index) => data.exam[data.exam.length-1].title.length > 0 ?
          (<Button color="primary" onClick={() => (updateSelected(index))}>
              {item.title}
          </Button>):"")}
        {data.privilege === "teacher" && data.exam[data.exam.length-1].title.length > 1 ? <Button color="primary" onClick={addNewExam}>+</Button> : "" }
        {data.exam.map((item, index) => item.title.length < 1 
          ? <div>
              <br />
              <Tab /><TextField label={"Anna Tentille Nimi"} onChange={(e) => setExamName(e.target.value)}/>
              <br /><br />
              <Tab /><Button variant="contained" color="primary" onClick={updateExamName}>OK</Button>
            </div>
          : (index === data.selected 
              ? <div>
                  <ExamList
                    id={index}
                    privilege={data.privilege}
                    thisExam={item}
                    updateExam={updateExam}
                    removeExam={removeExam}
                  />
                  {data.privilege === "student" 
                    ? <Button variant="contained" color="primary" onClick={() => handleButton(item, index)}>Valmis</Button>
                    : ""}
                </div>
              : "")
        )}
      </div>
      }
    </div>
  )
}

export default App
