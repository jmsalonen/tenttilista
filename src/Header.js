import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core'


const Header = ({updatePrivilege, userPrivilege}) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button 
            style={{ color: "white" }}
            onClick={updatePrivilege}
          >
            Vaihda Käyttöoikeutta: {userPrivilege}
          </Button> 
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
