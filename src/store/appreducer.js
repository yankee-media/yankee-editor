import * as types from './actiontypes';

export const appReducerInit = {
  workingArticleId: '',
  makingNewArticle: false,
  loggingIn: false,
  isWriterOrAdmin: process.env.NODE_ENV === 'development',
  loginError: null,
  snackOpen: false,
  snackMessage: '',
  dialogOpen: false,
  dialogComponent: null,
  editorTab: 0,
  errors: {},
  previewContent: null
}

const appReducer = (state = appReducerInit, action) => {
  switch (action.type) {
    case types.SET_WORKING_ARTICLE_ID:
      return {
        ...state,
        workingArticleId: action.articleId
      }
    case types.CHANGE_EDITOR_TAB:
      return {
        ...state,
        editorTab: action.value
      }
    case types.TOGGLE_MAKING_NEW_ARTICLE:
      return {
        ...state,
        makingNewArticle: action.value
      }
    case types.CONFIRM_CUSTOM_CLAIMS:
      return {
        ...state,
        isWriterOrAdmin: action.value
      }
    case types.CHANGE_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.message
      }
    case types.TOGGLE_SNACK:
      return {
        ...state,
        snackOpen: action.action,
        snackMessage: action.message
      }
    case types.TOGGLE_LOGGING_IN:
      return {
        ...state,
        loggingIn: action.value
      }
    case types.SET_DIALOG_CONTENT:
      return {
        ...state,
        dialogOpen: action.isOpen,
        dialogComponent: action.component
      }
    case types.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.whichError]: action.errorMessage
        }
      }
    case types.SET_PREVIEW_CONTENT:
      return {
        ...state,
        previewContent: action.content
      }
    default:
      return state
  }
}

export default appReducer;