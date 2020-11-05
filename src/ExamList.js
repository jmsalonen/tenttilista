import { useEffect, useState } from 'react'
import QuestionList from './QuestionList.js'

const ExamList = ({thisExam, id, updateExam}) => {

  const [exam, setExam] = useState(thisExam)

  const handleQuestionClick = (questionId, answerId) => {
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

  useEffect(() => {
    updateExam(exam, id)
  }, [exam])

  return ( 
    <div>
      {exam.question.map((item, index) => 
        <QuestionList 
         key={item.title + index}
         id={index}  
         question={item} 
         onClick={handleQuestionClick}
         finished={exam.finished}
        />
      )}
    </div>
  )
}

export default ExamList
