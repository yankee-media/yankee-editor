import React from 'react';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase';
import { toggleSnack, setDialogContent } from './store/actions';

// Custom Components
import AuthenticatedEditorBody from './components/AuthenticatedEditorBody';
import Login from './components/Login';

// UI Components
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Dialog from '@material-ui/core/Dialog';

const App = props => {
  let inner = null;
  if (isLoaded(props.auth) && !isEmpty(props.auth)) {
    if (!!props.isWriterOrAdmin) {
      inner = <AuthenticatedEditorBody />
    } else {
      inner = (
        <div style={{display: 'flex', maxWidth: '500px', margin: 'auto'}}>
          <span>This User is Not Authorized to be here.</span>
          <span style={{flex: 1}}></span>
          <button onClick={() => props.firebase.logout()}>logout</button>
        </div>
      )
    }
  } else {
    inner = <Login />
  }
  return (
    <div>
      {inner}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={props.snackOpen}
        autoHideDuration={6000}
        onClose={props.closeSnack}>
        <SnackbarContent message={props.snackMessage} />
      </Snackbar>
      <Dialog onClose={props.closeDialog} open={props.dialogOpen}>
        <div>
          {props.dialogComponent}
        </div>
      </Dialog>
    </div>
  )
}

const mapStateToProps = ({ appReducer, firebase }) => {
  return {
    auth: firebase.auth,
    isWriterOrAdmin: appReducer.isWriterOrAdmin,
    snackOpen: appReducer.snackOpen,
    snackMessage: appReducer.snackMessage,
    dialogOpen: appReducer.dialogOpen,
    dialogComponent: appReducer.dialogComponent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeSnack: () => dispatch(toggleSnack(false, '')),
    closeDialog: () => dispatch(setDialogContent(false, null))
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withFirebase)(App);
