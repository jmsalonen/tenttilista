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

export default QuestionList
