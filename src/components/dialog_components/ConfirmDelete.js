import React, { useState, useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { deleteArticle } from '../../store/actions';

// UI Components
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ConfirmDelete = ({ articleTitle, articleId, deleteArticle }) => {
  const [titleInput, setTitleInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (articleTitle === titleInput) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [titleInput, setIsValid, articleTitle]);
  return (
    <>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <span style={{ display: 'block' }}>Type the article title exactly as it appears below:</span>
          <Typography color='primary' component='span' className='no-copy' style={{ margin: '15px 0', display: 'block' }} align='center'>{articleTitle}</Typography>
        </DialogContentText>
        <TextField
          autoFocus
          variant='outlined'
          margin='dense'
          value={titleInput}
          onChange={e => setTitleInput(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' disabled={!isValid} onClick={() => deleteArticle(articleId, isValid)}>Delete</Button>
      </DialogActions>
    </>
  )
}

export default connect(state => ({}), dispatch => ({
  deleteArticle: (articleId, isValid) => dispatch(deleteArticle(articleId, isValid))
}))(ConfirmDelete);