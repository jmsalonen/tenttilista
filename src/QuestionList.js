import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import { green } from '@material-ui/core/colors'
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';

const QuestionList = ({id, question, onClick, finished}) => ( 
  <Card>
    <div>
      {question.title} 
      {finished ? (JSON.stringify(question.answer) == JSON.stringify(question.correct) ? <CheckIcon /> : <BlockIcon />) 
                : ""}
    </div>
    {question.options.map((item, index) => 
      <div>
        <Checkbox
          disabled={finished}
          id={index}
          name={question.title + id} 
          type={question.type}
          checked={question.answer[index]}
          onClick={() => onClick(id, index)}
          label="Primary"
        /> 
        {finished ? 
          <Checkbox 
            style={{ color: green[500] }}
            id={index}
            name={question.title + id + "correct"} 
            type={question.type}
            checked={question.correct[index]}
            onClick={finished ? "" : () => onClick(id, index)}
            label=""
          /> : ""
        }
        <label>{item}</label> 
      </div>  
    )}
  </Card>
)

export default QuestionList
