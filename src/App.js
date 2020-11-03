import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'

const QuestionList = ({id, question, onClick}) => {
  
  const checkAnswer = (a, b) => ((a === b && a) ? " - Oikein!" : "")
  
  return ( 
    <div>
      <h3>{question.title}</h3>
      {question.options.map((item, index) => 
        <div>
          <input 
            id={index}
            name={question.title} 
            type={question.type}
            defaultChecked={question.answer[index]}
            onClick={() => onClick(id, index)}
          /> 
          <label>{item + checkAnswer(question.answer[index], question.correct[index])}</label> 
        </div>  
      )}
    </div>
  )
}

const App = ({database}) => {

  const [data, setData] = useState(database)

  const handleClick = (questionId, answerId) => {
    console.log('Clicked', questionId, answerId)
    let newData = JSON.parse(JSON.stringify(data))
    let newQuestion = newData.question[questionId];
    if (newQuestion.type === "radio") 
      newQuestion.answer = newQuestion.answer.map(
        (item, index) => (item = answerId === index ? true : false)
      )
    else
      newQuestion.answer[answerId] = newQuestion.answer[answerId] === false ? true : false
    setData(newData)
  }
  
  useEffect(() => {
    window.localStorage.setItem('data', JSON.stringify(data))
  }, [data])
  
  return (
    <div>
      {data.question.map((item, index) => 
        <QuestionList 
          id={index}  
          question={item} 
          onClick={handleClick}
        />
      )}
    </div>
  )
}

export default App
