import React from 'react';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { changeEditorTab } from '../store/actions';

// UI Components
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

// Custom Components
import Manager from './Manager';
import Editor from './Editor';

// Router
import { Route, Switch, withRouter } from 'react-router-dom';

// Util
import { MAIN_LOGO } from '../util/constants';

const AuthenticatedEditorBody = props => {
  return (
    <React.Fragment>
      <AppBar position='static' style={{ marginBottom: '10px' }}>
        <Toolbar>
          <Button style={{ margin: '0 10px' }} onClick={() => props.history.push('/')}>Manage</Button>
          <Button style={{ margin: '0 10px' }} onClick={() => props.history.push(`/editor/${props.workingArticleId}`)}>Edit</Button>
          {props.location.pathname.startsWith('/editor') ? (
            <div style={{ position: 'absolute', width: '25%', left: '37.5%', textAlign: 'center' }}>
              <Button style={{ width: '120px' }} onClick={() => props.changeEditorTab(0)}>Summary</Button>
              <Button style={{ width: '120px' }} onClick={() => props.changeEditorTab(1)}>Body</Button>
              <Button style={{ width: '120px' }} onClick={() => props.changeEditorTab(2)}>Preview</Button>
            </div>) : (
              <div style={{ position: 'absolute', width: '20%', left: '40%', textAlign: 'center', height: '60px', backgroundColor: '#000', padding: '4px 0' }}>
                <img style={{ maxHeight: '100%', maxWidth: '100%', height: 'auto', position: 'relative', top: 0, left: 0}} src={MAIN_LOGO} alt='logo' />
              </div>)}
          <span style={{ flex: 1 }}></span>
          <Button style={{ margin: '0 10px' }} onClick={() => props.firebase.logout()}>Logout</Button>
        </Toolbar>
      </AppBar>
      <div>
        <Switch>
          <Route exact path='/' component={Manager} />
          <Route exact path='/editor/:articleId' component={() => <Editor workingArticleId={props.workingArticleId} />} />
          <Route exact path='/editor' render={() => {
            return (
              <div style={{ padding: '15px', textAlign: 'center' }}>
                No Article Selected
            </div>
            )
          }} />
        </Switch>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = ({ appReducer }) => {
  return {
    workingArticleId: appReducer.workingArticleId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeEditorTab: value => dispatch(changeEditorTab(value))
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter, withFirebase)(AuthenticatedEditorBody);