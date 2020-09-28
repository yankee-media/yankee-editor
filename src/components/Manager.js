import React from 'react';

// Redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  makeNewArticle,
  setWorkingArticleId,
  setDialogContent,
  toggleArticleActivation
} from '../store/actions';

// UI Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';

// Custom Components
import ConfirmDelete from './dialog_components/ConfirmDelete';

// Icons
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Pageview from '@material-ui/icons/Pageview';

// Router
import { withRouter } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';

// Util
import { ARTICLE_META } from '../util/constants';

const Manager = props => {
  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid style={{ height: '300px' }} item xs={4} sm={3} md={2} lg={2} xl={2}>
          {props.makingNewArticle ? (
            <Paper className='article-manager-tile' style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', top: 'calc(50% - 25px)' }}>
                <CircularProgress size={50} />
              </div>
            </Paper>
          ) : (
              <Paper onClick={() => {
                props.makeNewArticle(props.history.push);
              }} className='hover-dim article-manager-tile'>
                <div style={{ position: 'relative', top: 'calc(50% - 30px)' }}>
                  <Typography align='center' color='primary' variant='h6'>Add New Article</Typography>
                  <div style={{ textAlign: 'center' }}>
                    <Add />
                  </div>
                </div>
              </Paper>
            )}
        </Grid>
        {props.recentArticles ? props.recentArticles.map(article => (
          <Grid key={article.article_id} style={{ height: '300px' }} item xs={4} sm={3} md={2} lg={2} xl={2}>
            <Paper style={{ padding: '8px' }} onClick={() => {
              props.setWorkingArticleId(article.article_id);
              props.history.push(`/editor/${article.article_id}`);
            }} className='hover-dim article-manager-tile'>
              <div >
                <Typography style={{ marginBottom: '8px' }}>{article.title}</Typography>
                <img src={article.cover_image} alt='title' style={{ width: '100%' }} />
              </div>
            </Paper>
            <div style={{ marginTop: '5px', display: 'flex' }}>
              <Switch
                classes={{ switchBase: article.active ? 'activation-switch' : '' }}
                checked={article.active}
                onChange={() => props.toggleArticleActivation(!article.active, article.article_id)}
              />
              <span style={{ flex: 1 }}></span>
              <IconButton color='primary' onClick={() => {
                props.history.push(`/editor/${article.article_id}?tab=2`);
              }}>
                <Pageview />
              </IconButton>
              <span style={{ flex: 1 }}></span>
              <IconButton color='primary' onClick={() => props.openDialog(true, <ConfirmDelete articleTitle={article.title} articleId={article.article_id} />)}>
                <Delete />
              </IconButton>
            </div>
          </Grid>
        )) : null}
      </Grid>
    </div>
  )
}

const mapStateToProps = ({ appReducer, firestore }) => {
  return {
    makingNewArticle: appReducer.makingNewArticle,
    recentArticles: firestore.ordered.recentArticles
  }
};

const mapDispatchToProps = dispatch => {
  return {
    makeNewArticle: push => dispatch(makeNewArticle(push)),
    setWorkingArticleId: articleId => dispatch(setWorkingArticleId(articleId)),
    openDialog: (isOpen, component) => dispatch(setDialogContent(isOpen, component)),
    toggleArticleActivation: (value, articleId) => dispatch(toggleArticleActivation(value, articleId))
  }
}

export default compose(firestoreConnect([{ collection: ARTICLE_META, orderBy: ['unix_created_at', 'desc'], limit: 10, storeAs: 'recentArticles' }]), connect(mapStateToProps, mapDispatchToProps), withRouter)(Manager);