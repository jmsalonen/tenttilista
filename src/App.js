import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'

const QuestionList = ({id, question, onClick, finished}) => ( 
  <div>
    <h3>
      {question.title} 
      {finished ? (JSON.stringify(question.answer) == JSON.stringify(question.correct) ? " - Correct!" : "") 
                : ""}
    </h3>
    {question.options.map((item, index) => 
      <div>
        <input 
          disabled={finished}
          id={index}
          name={question.title + id} 
          type={question.type}
          defaultChecked={question.answer[index]}
          onClick={() => onClick(id, index)}
        /> 
        {finished ? 
          <input 
            disabled={finished}
            id={index}
            name={question.title + id + "correct"} 
            type={question.type}
            defaultChecked={question.correct[index]}
            onClick={() => onClick(id, index)}
          /> : ""
        }
        <label>{item}</label> 
      </div>  
    )}
  </div>
)

const ExamList = ({thisExam, id, updateData}) => {

  const [exam, setExam] = useState(thisExam)

  const handleClick = (questionId, answerId) => {
    console.log('Clicked', questionId, answerId)
    let newData = JSON.parse(JSON.stringify(exam))
    let newQuestion = newData.question[questionId];
    if (newQuestion.type === "radio") 
      newQuestion.answer = newQuestion.answer.map(
        (item, index) => (item = answerId === index ? true : false)
      )
    else
      newQuestion.answer[answerId] = newQuestion.answer[answerId] === false ? true : false
    setExam(newData)
  }

  const handleButton = () => {
    let newData = JSON.parse(JSON.stringify(exam))
    newData.finished = true
    setExam(newData)
  }

  useEffect(() => {
    updateData(exam, id)
  }, [exam])

  return ( 
    <div>
      <h2>{exam.title}</h2>
      {exam.question.map((item, index) => 
        <QuestionList 
          key={item.title + index}
          id={index}  
          question={item} 
          onClick={handleClick}
          finished={thisExam.finished}
        />
      )}
      <button onClick={handleButton}>Finished</button>
    </div>
  )
}

const App = ({database}) => {
  
  const notSelected = -1

  const [data, setData] = useState(database)
  const [selectedExam, setSelectedExam] = useState(notSelected)

  const updateData = (exam, index) => {
    let newData = JSON.parse(JSON.stringify(data))
    newData.exam[index] = exam
    setData(newData)
  }

  useEffect(() => {
    window.localStorage.setItem('data', JSON.stringify(data))
  }, [data])

  return (
    <div>
      {data.exam.map((item, index) => 
        (
          <button onClick={() => 
            (selectedExam === index ? setSelectedExam(notSelected) : setSelectedExam(index))}>
            {item.title}
          </button>
        )
      )}
      {data.exam.map((item, index) => 
        ( index === selectedExam ? 
          <ExamList
            key={item.title + index}
            id={index}
            thisExam={item}
            updateData={updateData}
          />
        : "")
      )}
    </div>
  )
}

export default App
