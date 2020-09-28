import * as types from './actiontypes';
import { ARTICLE_CONTENTS, VALID_URL_REGEX, ARTICLE_META } from '../util/constants';

export const toggleSnack = (action, message) => {
  return {
    type: types.TOGGLE_SNACK,
    action,
    message
  }
}

export const changeEditorTab = value => {
  return {
    type: types.CHANGE_EDITOR_TAB,
    value
  }
}

const confirmCustomClaims = value => {
  return {
    type: types.CONFIRM_CUSTOM_CLAIMS,
    value
  }
}

const showLoginError = code => {
  const action = { type: types.CHANGE_LOGIN_ERROR };
  if (!code) {
    action.message = null;
    return action;
  }
  switch (code) {
    case 'auth/wrong-password':
      action.message = 'The email and password combination you entered is incorrect.';
      break;
    case 'auth/user-not-found':
      action.message = 'User Not Found';
      break;
    case 'auth/user-disabled':
      action.message = 'User Disabled';
      break;
    case 'auth/account-exists-with-different-credential':
      action.message = 'Account Already Exists';
      break;
    case 'auth/auth-domain-config-required':
      action.message = 'Configure Domain';
      break;
    case 'auth/operation-not-supported-in-this-environment':
      action.message = 'Operation Not Supported';
      break;
    case 'auth/unauthorized-domain':
      action.message = 'Unauthorized Domain';
      break;
    case 'auth/operation-not-allowed':
      action.message = 'Operation Not Allowed';
      break;
    case 'auth/invalid-email':
      action.message = 'Enter a Valid Email';
      break;
    default:
      action.message = 'Login Error';
  }
  return action;
}

const toggleLoggingIn = value => {
  return {
    type: types.TOGGLE_LOGGING_IN,
    value
  }
}

export const login = (email, password) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(toggleLoggingIn(true));
    const firebase = getFirebase();
    firebase.login({ email, password }).then(res => {
      return firebase.auth().currentUser.getIdTokenResult()
    }).then(idTokenResult => {
      if (!!idTokenResult.claims.writer || !!idTokenResult.claims.admin) {
        dispatch(confirmCustomClaims(true));
        dispatch(showLoginError(null));
        dispatch(toggleSnack(true, 'Welcome Back!'));
        dispatch(toggleLoggingIn(false));
      } else {
        dispatch(confirmCustomClaims(false));
        dispatch(showLoginError(null));
        dispatch(toggleSnack(true, 'User Not Authorized'));
        dispatch(toggleLoggingIn(false));
        firebase.logout();
      }
    }).catch(error => {
      dispatch(toggleSnack(true, 'Login Failed'));
      dispatch(showLoginError(error.code));
      dispatch(toggleLoggingIn(false));
    });
  }
}

const newArticleTemplate = {
  author: '',
  body: [],
  categories: [],
  cover_image: '',
  keywords: [],
  summary: '',
  title: ''
}

export const setWorkingArticleId = articleId => {
  return {
    type: types.SET_WORKING_ARTICLE_ID,
    articleId
  }
}

const makingNewArticle = value => {
  return {
    type: types.TOGGLE_MAKING_NEW_ARTICLE,
    value
  }
}

export const makeNewArticle = push => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch(makingNewArticle(true));
    const db = getFirestore();
    db.collection(ARTICLE_CONTENTS).add(newArticleTemplate).then(docRef => {
      dispatch(setWorkingArticleId(docRef.id));
      push(`/editor/${docRef.id}`);
      dispatch(makingNewArticle(false));
    }).catch(error => {
      console.error(error);
      dispatch(makingNewArticle(false));
    });
  }
}

export const saveArticle = (content, whichCollection, articleId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection(whichCollection).doc(articleId).update(content).then(() => {
      dispatch(toggleSnack(true, 'Saved!'));
    }).catch(error => {
      console.error(error);
      dispatch(toggleSnack(true, 'Save Error...'));
    });
  }
}

export const deleteArticle = (articleId, canDelete) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    if (canDelete === true) {
      firestore.collection(ARTICLE_CONTENTS).doc(articleId).delete().then(() => {
        dispatch(toggleSnack(true, 'Article Deleted.'));
        dispatch(setDialogContent(false, null));
        if (getState().appReducer.workingArticleId === articleId) {
          dispatch(setWorkingArticleId(''));
        }
      }).catch(error => {
        console.error(error);
        dispatch(toggleSnack(true, 'Article Delete Failed.'));
        dispatch(setDialogContent(false, null));
      });
    } else {
      dispatch(toggleSnack(true, 'Article Delete Not Authorized.'));
    }
  }
}

export const setDialogContent = (isOpen, component) => {
  return {
    type: types.SET_DIALOG_CONTENT,
    isOpen,
    component
  }
}

export const setError = (whichError, errorMessage) => {
  return {
    type: types.SET_ERROR,
    whichError,
    errorMessage
  }
}

export const checkImageDims = (imageUrl, whichImage, widthToHeightRatio) => {
  return dispatch => {
    if (VALID_URL_REGEX.test(imageUrl)) {
      const img = new Image();
      img.addEventListener('load', () => {
        const imageAspect = Math.floor((img.height/img.width)*100);
        if (imageAspect !== Math.floor(widthToHeightRatio*100)) {
          dispatch(setError(whichImage, 'The dimensions of this image are incorrect'));
        } else {
          dispatch(setError(whichImage, null));
        }
      }, false);
      img.addEventListener('error', () => {
        dispatch(setError(whichImage, 'This image failed to load...'));
      }, false);
      img.src = imageUrl;
    }
  }
}

export const toggleArticleActivation = (value, articleId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection(ARTICLE_META).doc(articleId).update({active: value}).then(res => {
      dispatch(toggleSnack(true, `${value ? 'Activated' : 'Deactivated'} Successfully`));
    }).catch(error => {
      console.error(error);
      dispatch(toggleSnack(true, `Article ${value ? 'activation' : 'deactivation'} failed...`));
    });
  }
}