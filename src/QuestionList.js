import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors'
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import { Button } from '@material-ui/core'

const QuestionList = ({id, privilege, finished, question, handleClick, handleTitleEvent, handleOptionsEvent, addNewAnswer, removeAnswer, removeQuestion}) => ( 
  <div className="kortti">
    <Card>
      <div>
        <div className="sulkuNappi">
          {privilege === "teacher" ? <Button color="secondary" onClick={() => removeQuestion(id)}>×</Button> : "" }
        </div>
        {privilege === "student" ? question.title
                                 : <TextField 
                                   label={`${id+1}. kysymys`} 
                                   value={question.title}
                                   style = {{width: '100%'}}
                                   onChange={(event) => handleTitleEvent(event, id)} /> }
        {finished && privilege === "student" ? (JSON.stringify(question.answer) === JSON.stringify(question.correct) 
                                               ? <Button><CheckIcon style={{ color: green[500] }} /></Button> 
                                               : <Button><BlockIcon color="secondary"/></Button>) 
                                             : "" }
      </div>
      {question.options.map((item, index) => 
        <div>
          {privilege === "student" 
            ? <Checkbox
                disabled={finished}
                id={index}
                name={question.title + id} 
                type={question.type}
                checked={question.answer[index]}
                onClick={() => handleClick(id, index)}
                label="Primary"/> 
            : "" }
          {finished || privilege === "teacher" 
            ? <Checkbox 
                style={{ color: green[500] }}
                id={index}
                name={question.title + id + "correct"} 
                type={question.type}
                checked={question.correct[index]}
                onClick={privilege === "student" ? function() {} 
                                                : () => handleClick(id, index)}
                label="" /> 
            : "" }
          {privilege === "teacher" 
            ? 
              <>
              <TextField onChange={(event) => handleOptionsEvent(event, id, index)} label={item} style = {{width: '50%'}} />
              <Button color="secondary" onClick={() => removeAnswer(id, index)}>×</Button>
              </>
            : 
              <label>{item}</label>}
        </div>
      )}
      {privilege === "teacher" ? <Button color="primary" onClick={() => addNewAnswer(id)}>+</Button> : "" }
    </Card>
  </div>
)

export default QuestionList
