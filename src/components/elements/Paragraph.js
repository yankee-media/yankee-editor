import React, { useState } from 'react';

// Menu
import ElementMenu from './ElementMenu';

// UI Components
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// Icons
import MoreVert from '@material-ui/icons/MoreVert';

// Util
import {
  ARTICLE_BODY_TYPES_MAP,
  ALIGNMENT_OPTIONS
} from '../../util/constants';
import { elementTypes } from 'yankee-blog';

const Paragraph = ({ basePath, removeFromList, withSpace, content, onEditArticle, moveElementsInList, elementIndex, totalElements, variant }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleRemove = () => {
    setAnchorEl(null);
    removeFromList(basePath, elementIndex);
  }
  const handleMoveUp = () => {
    setAnchorEl(null);
    moveElementsInList(basePath, elementIndex, elementIndex - 1);

  }
  const handleMoveDown = () => {
    setAnchorEl(null);
    moveElementsInList(basePath, elementIndex, elementIndex + 1);
  }
  const menu = <ElementMenu totalElements={totalElements - 1} elementIndex={elementIndex} anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleRemove={handleRemove} handleMoveDown={handleMoveDown} handleMoveUp={handleMoveUp} moveElementsInList={moveElementsInList} />;
  if (withSpace) {
    return (
      <div>
        <TextField InputProps={{
          endAdornment: <InputAdornment className='hover-cursor' onClick={e => setAnchorEl(e.currentTarget)} position='end'><MoreVert /></InputAdornment>
        }} InputLabelProps={{ shrink: true }} style={{ marginBottom: '16px' }} variant='outlined' label={ARTICLE_BODY_TYPES_MAP.get(elementTypes.PARAGRAPH_WITH_BOTTOM_SPACE).label} fullWidth multiline value={content} onChange={onEditArticle} id={`${basePath}.${elementIndex}.content`} />
        {menu}
      </div>
    )
  } else {
    if (variant) {
      return (
        <div>
          <TextField InputProps={{
            endAdornment: <InputAdornment className='hover-cursor' onClick={e => setAnchorEl(e.currentTarget)} position='end'><MoreVert /></InputAdornment>
          }} InputLabelProps={{ shrink: true }} style={{ marginBottom: '4px' }} variant='outlined' label={ARTICLE_BODY_TYPES_MAP.get(variant).label} fullWidth multiline value={content.text} onChange={onEditArticle} id={`${basePath}.${elementIndex}.content.text`} />
          <Select
            style={{ marginBottom: '4px', width: '120px', textAlign: 'center' }}
            variant='outlined'
            margin='dense'
            value={content.align}
            onChange={e => {
              e.target.id = `${basePath}.${elementIndex}.content.align`;
              onEditArticle(e)
            }}
          >
            {ALIGNMENT_OPTIONS.map(option => <MenuItem key={option[0]} value={option[0]}>{option[1]}</MenuItem>)}
          </Select>
          {menu}
        </div>
      )
    } else {
      return (
        <div>
          <TextField InputProps={{
            endAdornment: <InputAdornment className='hover-cursor' onClick={e => setAnchorEl(e.currentTarget)} position='end'><MoreVert /></InputAdornment>
          }} InputLabelProps={{ shrink: true }} style={{ marginBottom: '4px' }} variant='outlined' label={ARTICLE_BODY_TYPES_MAP.get(elementTypes.PARAGRAPH_WITHOUT_BOTTOM_SPACE).label} fullWidth multiline value={content} onChange={onEditArticle} id={`${basePath}.${elementIndex}.content`} />
          {menu}
        </div>
      )
    }
  }
}

export default Paragraph;