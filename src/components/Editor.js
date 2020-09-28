import React, { useEffect, useState } from 'react';

// UI Components
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';

// Redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  setWorkingArticleId,
  saveArticle,
  checkImageDims,
  toggleArticleActivation,
  changeEditorTab
} from '../store/actions';

// Router
import { withRouter } from 'react-router-dom';

// Constants
import {
  ARTICLE_CONTENTS,
  ARTICLE_META,
  NEW_SECTION_MAP,
  ARTICLE_COVER_IMAGE_ERROR,
  COVER_IMAGE_ASPECT_RATIO,
  ARTICLE_AUTHOR
} from '../util/constants';

// Util
import dotProp from 'dot-prop-immutable';

// Parsers
import { parseEditableArticleBody } from '../util/body_parser';

// Custom Components
import ListEditor from './ListEditor';
import Preview from './Preview';

const Editor = props => {
  const [hasArticle, setHasArticle] = useState(false);
  const [tabInit, setTabInit] = useState(false);
  const [editableArticle, setEditableArticle] = useState({ article_contents: null, article_meta: null });
  const [newSectionColumnNum, setNewSectionColumnNum] = useState(1);
  const addToList = (basePath, newValue, index) => {
    setEditableArticle(dotProp.set(editableArticle, `${basePath}.${index}`, newValue));
  }
  const removeFromList = (basePath, index) => {
    setEditableArticle(dotProp.delete(editableArticle, `${basePath}.${index}`));
  }
  const moveElementsInList = (basePath, fromIndex, toIndex) => {
    const newColumn = [...dotProp.get(editableArticle, basePath, null)];
    const tempElement = { ...newColumn[toIndex] };
    newColumn[toIndex] = newColumn[fromIndex];
    newColumn[fromIndex] = tempElement;
    setEditableArticle(dotProp.set(editableArticle, basePath, newColumn));
  }
  const onChangeArticle = e => {
    const path = e.target.id;
    setEditableArticle(dotProp.set(editableArticle, path, e.target.value));
  }
  const onAddSection = (basePath, index, newValue, shift) => {
    if (shift) {
      let nextSet = newValue;
      const newBody = [...dotProp.get(editableArticle, basePath)];
      for (let sectionIndex = index; sectionIndex < newBody.length; sectionIndex++) {
        const temp = newBody[sectionIndex];
        newBody[sectionIndex] = nextSet;
        nextSet = temp;
      }
      newBody.push(nextSet);
      setEditableArticle(dotProp.set(editableArticle, basePath, newBody));
    } else {
      setEditableArticle(dotProp.set(editableArticle, `${basePath}.${index}`, newValue));
    }
  }
  const onDeleteSection = path => {
    setEditableArticle(dotProp.delete(editableArticle, path));
  }
  const onMoveSection = (fromIndex, toIndex) => {
    const newBody = [...editableArticle.article_contents.body];
    const tempSection = { ...newBody[toIndex] };
    newBody[toIndex] = newBody[fromIndex];
    newBody[fromIndex] = tempSection;
    setEditableArticle(dotProp.set(editableArticle, 'article_contents.body', newBody));
  }
  useEffect(() => {
    const articleId = props.match.params.articleId;
    if (!tabInit) {
      const params = new URLSearchParams(props.location.search);
      const tab = params.get('tab');
      if (!!tab) {
        props.changeEditorTab(Number(tab));
      }
      setTabInit(true);
    }
    if ((!props.workingArticleId && articleId) || articleId !== props.workingArticleId) {
      props.setWorkingArticleId(articleId);
    }
    if (!hasArticle
      && articleId
      && props.articleContents
      && props.articleMeta
      && props.articleContents[articleId]
      && props.articleMeta[articleId]) {
      setHasArticle(true);
      setEditableArticle({
        article_contents: {
          ...props.articleContents[articleId]
        },
        article_meta: {
          ...props.articleMeta[articleId]
        }
      });
    }
  }, [props, hasArticle, tabInit]);
  if (editableArticle.article_contents
    && editableArticle.article_meta) {
    const { title, article_id, summary, categories, keywords, cover_image } = editableArticle.article_meta;
    const { body, author } = editableArticle.article_contents;
    const { active } = props.articleMeta[article_id];
    if (props.editorTab === 0) {
      return (
        <div style={{ maxWidth: '1200px', margin: '25px auto 0 auto', padding: '8px', position: 'relative', minHeight: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div style={{ textAlign: 'right' }}>
                <Switch
                  size='small'
                  classes={{ switchBase: active ? 'activation-switch' : '' }}
                  checked={active}
                  onChange={() => props.toggleArticleActivation(!active, article_id)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField InputLabelProps={{ shrink: true }} fullWidth variant='outlined' label='Title' id='article_meta.title' value={title} onChange={onChangeArticle} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField InputLabelProps={{ shrink: true }} fullWidth variant='outlined' label='Author' id='article_contents.author' value={author} onChange={onChangeArticle} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField error={!!props.errors[ARTICLE_COVER_IMAGE_ERROR]} InputLabelProps={{ shrink: true }} fullWidth variant='outlined' label='Cover Image' id='article_meta.cover_image' value={cover_image} onChange={e => {
                onChangeArticle(e);
                props.checkImageDims(e.target.value, ARTICLE_COVER_IMAGE_ERROR, COVER_IMAGE_ASPECT_RATIO);
              }} />
              <Typography align='center' color='error'>{props.errors[ARTICLE_COVER_IMAGE_ERROR] || ''}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField multiline InputLabelProps={{ shrink: true }} fullWidth variant='outlined' label='Summary' id='article_meta.summary' value={summary} onChange={onChangeArticle} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ListEditor listName='Categories' addToList={addToList} removeFromList={removeFromList} basePath='article_meta.categories' list={categories} changeList={onChangeArticle} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <ListEditor listName='Keywords' addToList={addToList} removeFromList={removeFromList} basePath='article_meta.keywords' list={keywords} changeList={onChangeArticle} />
            </Grid>
          </Grid>
          <Button onClick={() => {
            props.saveArticle(editableArticle[ARTICLE_META], ARTICLE_META, article_id);
            props.saveArticle({ [ARTICLE_AUTHOR]: editableArticle[ARTICLE_CONTENTS][ARTICLE_AUTHOR] }, ARTICLE_CONTENTS, article_id);
          }} style={{ position: 'fixed', bottom: '85px', right: '20px', width: '100px', color: '#00a800' }} variant='contained'>Save</Button>
        </div>
      )
    } else if (props.editorTab === 1) {
      return (
        <div style={{ maxWidth: '1200px', margin: '25px auto 0 auto', padding: '8px' }}>
          {parseEditableArticleBody(body, 'article_contents.body', onChangeArticle, onAddSection, onDeleteSection, onMoveSection, addToList, removeFromList, moveElementsInList)}
          <Paper style={{ padding: '5px' }}>
            <div style={{ display: 'flex', marginTop: '8px' }}>
              <Button onClick={() => {
                onAddSection('article_contents.body', body.length, NEW_SECTION_MAP.get(newSectionColumnNum), false);
              }}>Add Section</Button>
              <span style={{ flex: 1 }}></span>
              <Typography style={{ position: 'relative', top: '7px', right: '10px' }}>Columns:</Typography>
              <Select
                variant='outlined'
                margin='dense'
                value={newSectionColumnNum}
                onChange={e => setNewSectionColumnNum(e.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </div>
          </Paper>
          <Button onClick={() => props.saveArticle(editableArticle[ARTICLE_CONTENTS], ARTICLE_CONTENTS, article_id)} style={{ position: 'fixed', bottom: '85px', right: '20px', width: '100px', color: '#00a800'  }} variant='contained'>Save</Button>
        </div>
      );
    } else if (props.editorTab === 2) {
      return <Preview content={editableArticle} />
    }
  } else {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <CircularProgress size={100} />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, appReducer }) => {
  return {
    articleMeta: firestore.data.article_meta,
    articleContents: firestore.data.article_contents,
    editorTab: appReducer.editorTab,
    errors: appReducer.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setWorkingArticleId: articleId => dispatch(setWorkingArticleId(articleId)),
    saveArticle: (content, whichCollection, articleId) => dispatch(saveArticle(content, whichCollection, articleId)),
    checkImageDims: (imageUrl, whichImage, widthToHeightRatio) => dispatch(checkImageDims(imageUrl, whichImage, widthToHeightRatio)),
    toggleArticleActivation: (value, articleId) => dispatch(toggleArticleActivation(value, articleId)),
    changeEditorTab: value => dispatch(changeEditorTab(value))
  }
}

export default compose(firestoreConnect(props => {
  if (props.workingArticleId) {
    return [
      { collection: ARTICLE_META, doc: props.workingArticleId },
      { collection: ARTICLE_CONTENTS, doc: props.workingArticleId }
    ]
  }
  return [];
}), connect(mapStateToProps, mapDispatchToProps), withRouter)(Editor);