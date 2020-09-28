import { elementTypes } from 'yankee-blog';

export const SECONDARY_THEME_COLOR = '#fff';
export const ERROR_COLOR = '#ff0000';
export const BACKGROUND_COLOR = '#1e1e1e';
export const SECONDARY_BACKGROUND_COLOR = '#4f4f4f';
export const SUCCESS_COLOR = '#08aa00';

// Regex
export const VALID_URL_REGEX = RegExp(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i);

// Initialization
export const NEW_SECTION_MAP = new Map([[1, { 0: [] }], [2, { 0: [], 1: [] }], [3, { 0: [], 1: [], 2: [] }]]);

// Article Collection Fields
export const ARTICLE_CONTENTS = 'article_contents';
export const ARTICLE_META = 'article_meta';

// Article Contents Fields
export const ARTICLE_BODY = 'body';
export const ARTICLE_AUTHOR = 'author';

// Errors
export const ARTICLE_COVER_IMAGE_ERROR = 'articleCoverImage';

// Numbers
export const COVER_IMAGE_ASPECT_RATIO = 0.5625;

export const ARTICLE_BODY_TYPES_MAP = new Map([
  [elementTypes.PARAGRAPH_WITH_BOTTOM_SPACE, { value: elementTypes.PARAGRAPH_WITH_BOTTOM_SPACE, label: 'Paragraph w/ space' }],
  [elementTypes.PARAGRAPH_WITHOUT_BOTTOM_SPACE, { value: elementTypes.PARAGRAPH_WITHOUT_BOTTOM_SPACE, label: 'Paragraph' }],
  [elementTypes.FULL_WIDTH_IMAGE, { value: elementTypes.FULL_WIDTH_IMAGE, label: 'Full width image' }],
  [elementTypes.HALF_WIDTH_IMAGE, { value: elementTypes.HALF_WIDTH_IMAGE, label: 'Half width image' }],
  [elementTypes.TWO_THIRDS_WIDTH_IMAGE, { value: elementTypes.TWO_THIRDS_WIDTH_IMAGE, label: '2/3 width image' }],
  [elementTypes.SIMPLE_LIST_UL, { value: elementTypes.SIMPLE_LIST_UL, label: 'Unordered Simple list' }],
  [elementTypes.SIMPLE_LIST_OL, { value: elementTypes.SIMPLE_LIST_OL, label: 'Ordered Simple list' }],
  [elementTypes.H6, { value: elementTypes.H6, label: 'Header (6)' }],
  [elementTypes.H5, { value: elementTypes.H5, label: 'Header (5)' }],
  [elementTypes.H4, { value: elementTypes.H4, label: 'Header (4)' }],
  [elementTypes.H3, { value: elementTypes.H3, label: 'Header (3)' }],
  [elementTypes.H2, { value: elementTypes.H2, label: 'Header (2)' }],
  [elementTypes.H1, { value: elementTypes.H1, label: 'Header (1)' }],
  [elementTypes.CAPTION, { value: elementTypes.CAPTION, label: 'Caption' }],
  [elementTypes.SUBTITLE, { value: elementTypes.SUBTITLE, label: 'Subtitle' }],
  [elementTypes.QUOTE, { value: elementTypes.QUOTE, label: 'Quote' }],
]);

export const NEW_ELEMENT_MAP = new Map([
  [elementTypes.PARAGRAPH_WITH_BOTTOM_SPACE, ''],
  [elementTypes.PARAGRAPH_WITHOUT_BOTTOM_SPACE, ''],
  [elementTypes.FULL_WIDTH_IMAGE, { src: '', alt: '' }],
  [elementTypes.HALF_WIDTH_IMAGE, { src: '', alt: '' }],
  [elementTypes.TWO_THIRDS_WIDTH_IMAGE, { src: '', alt: '' }],
  [elementTypes.SIMPLE_LIST_UL, ['']],
  [elementTypes.SIMPLE_LIST_OL, ['']],
  [elementTypes.H6, { text: '', align: 'left' }],
  [elementTypes.H5, { text: '', align: 'left' }],
  [elementTypes.H4, { text: '', align: 'left' }],
  [elementTypes.H3, { text: '', align: 'left' }],
  [elementTypes.H2, { text: '', align: 'left' }],
  [elementTypes.H1, { text: '', align: 'left' }],
  [elementTypes.CAPTION, { text: '', align: 'left' }],
  [elementTypes.SUBTITLE, { text: '', align: 'left' }],
  [elementTypes.QUOTE, { text: '', align: 'left' }],
]);

export const ALIGNMENT_OPTIONS = [
  ['left', 'Left'],
  ['center', 'Center'],
  ['right', 'Right']
];

let ENV_MAIN_LOGO = '';

switch (process.env.REACT_APP_COMP) {
  case 'finance':
    ENV_MAIN_LOGO = process.env.REACT_APP_FINANCE_LOGO;
    break;
  case 'tech':
    ENV_MAIN_LOGO = process.env.REACT_APP_TECH_LOGO;
    break;
  default:
    throw Error('Invalid REACT_APP_COMP');
}

export const MAIN_LOGO = ENV_MAIN_LOGO;