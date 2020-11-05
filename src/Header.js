import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core'


const Header = (handleClick) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button style={{ color: "white" }}>Tenttilista</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
