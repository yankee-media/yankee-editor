import React, { useState } from 'react';

// Menu
import ElementMenu from './ElementMenu';

// UI Components
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

// Icons
import MoreVert from '@material-ui/icons/MoreVert';

// Util
import {
  VALID_URL_REGEX,
  ARTICLE_BODY_TYPES_MAP
} from '../../util/constants';
import { elementTypes } from 'yankee-article-parser';

const Image = ({ basePath, removeFromList, content, onEditArticle, type, moveElementsInList, elementIndex, totalElements }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleRemove = () => {
    setAnchorEl(null);
    removeFromList(basePath, elementIndex);
  }
  const handleMoveUp = () => {
    setAnchorEl(null);
    moveElementsInList(basePath, elementIndex, elementIndex-1);

  }
  const handleMoveDown = () => {
    setAnchorEl(null);
    moveElementsInList(basePath, elementIndex, elementIndex+1);
  }
  const menu = <ElementMenu totalElements={totalElements-1} elementIndex={elementIndex} anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleRemove={handleRemove} handleMoveDown={handleMoveDown} handleMoveUp={handleMoveUp} moveElementsInList={moveElementsInList} />;
  switch (type) {
    case elementTypes.FULL_WIDTH_IMAGE:
      return (
        <div>
          <TextField InputProps={{
            endAdornment: <InputAdornment className='hover-cursor' onClick={e => setAnchorEl(e.currentTarget)} position='end'><MoreVert /></InputAdornment>
          }} InputLabelProps={{ shrink: true }} style={{ marginBottom: '4px' }} variant='outlined' label={ARTICLE_BODY_TYPES_MAP.get(elementTypes.FULL_WIDTH_IMAGE).label} fullWidth value={content.src} onChange={onEditArticle} id={`${basePath}.${elementIndex}.content.src`} />
          <TextField InputLabelProps={{ shrink: true }} style={{ margin: '4px 0' }} variant='outlined' label='alt' fullWidth value={content.alt} onChange={onEditArticle} id={`${basePath}.${elementIndex}.content.alt`} />
          {VALID_URL_REGEX.test(content.src) ? <img style={{ width: '100%', marginBottom: '4px' }} src={content.src} alt='article test' /> : <Typography align='center' style={{ margin: '4px 0 8px 0' }}>Enter Image URL Above</Typography>}
          {menu}
        </div>
      )
    case elementTypes.HALF_WIDTH_IMAGE:
      return (
        <div style={{ textAlign: 'center' }}>
          <TextField InputProps={{
            endAdornment: <InputAdornment className='hover-cursor' onClick={e => setAnchorEl(e.currentTarget)} position='end'><MoreVert /></InputAdornment>
          }} InputLabelProps={{ shrink: true }} style={{ marginBottom: '4px' }} variant='outlined' label={ARTICLE_BODY_TYPES_MAP.get(elementTypes.HALF_WIDTH_IMAGE).label} fullWidth value={content.src} onChange={onEditArticle} id={`${basePath}.${elementIndex}.content.src`} />
          <TextField InputLabelProps={{ shrink: true }} style={{ margin: '4px 0' }} variant='outlined' label='alt' fullWidth value={content.alt} onChange={onEditArticle} id={`${basePath}.${elementIndex}.content.alt`} />
          {VALID_URL_REGEX.test(content.src) ? <img style={{ width: '50%', marginBottom: '4px' }} src={content.src} alt='article test' /> : <Typography align='center' style={{ margin: '4px 0 8px 0' }}>Enter Image URL Above</Typography>}
          {menu}
        </div>
      )
    case elementTypes.TWO_THIRDS_WIDTH_IMAGE:
      return (
        <div style={{ textAlign: 'center' }}>
          <TextField InputProps={{
            endAdornment: <InputAdornment className='hover-cursor' onClick={e => setAnchorEl(e.currentTarget)} position='end'><MoreVert /></InputAdornment>
          }} InputLabelProps={{ shrink: true }} style={{ marginBottom: '4px' }} variant='outlined' label={ARTICLE_BODY_TYPES_MAP.get(elementTypes.TWO_THIRDS_WIDTH_IMAGE).label} fullWidth value={content.src} onChange={onEditArticle} id={`${basePath}.${elementIndex}.content.src`} />
          <TextField InputLabelProps={{ shrink: true }} style={{ margin: '4px 0' }} variant='outlined' label='alt' fullWidth value={content.alt} onChange={onEditArticle} id={`${basePath}.${elementIndex}.content.alt`} />
          {VALID_URL_REGEX.test(content.src) ? <img style={{ width: '66.66%', marginBottom: '4px' }} src={content.src} alt='article test' /> : <Typography align='center' style={{ margin: '4px 0 8px 0' }}>Enter Image URL Above</Typography>}
          {menu}
        </div>
      )
    default:
      throw Error('Unexpected Image Type');
  }
}

export default Image;