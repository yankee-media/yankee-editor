import React, { useState } from 'react';

// Util
import { getEditableArticleElements } from '../util/body_parser';
import { ARTICLE_BODY_TYPES_MAP, NEW_ELEMENT_MAP } from '../util/constants';
import { elementTypes } from 'yankee-blog';

// Icons
import Add from '@material-ui/icons/Add';

// UI Components
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


const ColumnContent = ({ content, basePath, columnIndex, onChangeArticle, addToList, removeFromList, moveElementsInList }) => {
  const [newContent, setNewContent] = useState(elementTypes.PARAGRAPH_WITH_BOTTOM_SPACE);
  let columnContent = null;
  if (content) {
    columnContent = getEditableArticleElements(content, `${basePath}.${columnIndex}`, onChangeArticle, removeFromList, moveElementsInList, addToList);
  }
  return (
    <div>
      {columnContent}
      <div>
        <Select
          fullWidth
          variant='outlined'
          margin='dense'
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
        >
          {Array.from(ARTICLE_BODY_TYPES_MAP.values()).map((type, index) => <MenuItem key={`${type.value}-${index}-${ARTICLE_BODY_TYPES_MAP.keys().length % 2}`} value={type.value}>{type.label}</MenuItem>)}
        </Select>
        <Button onClick={() => addToList(`${basePath}.${columnIndex}`, { type: newContent, content: NEW_ELEMENT_MAP.get(newContent) }, content.length)}><Add /></Button>
      </div>
    </div>
  )
}

export default ColumnContent;