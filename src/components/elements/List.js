import React, { useState } from 'react';

// Util
import { elementTypes } from 'yankee-article-parser';

// UI Components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

// Menu
import ElementMenu from './ElementMenu';

// Icons
import Delete from '@material-ui/icons/Delete';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Add from '@material-ui/icons/Add';

const List = ({ type, list, onEditArticle, basePath, totalElements, elementIndex, removeFromList, moveElementsInList, addToList }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  if (Array.isArray(list)) {
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
    switch (type) {
      case elementTypes.SIMPLE_LIST_OL:
        return (
          <div>
            <MoreHoriz style={{ marginLeft: '45px' }} className='hover-cursor' onClick={e => setAnchorEl(e.currentTarget)} />
            <Add className='hover-cursor' style={{ marginLeft: '45px' }} onClick={() => addToList(`${basePath}.${elementIndex}.content`, '', list.length)} />
            <ol>
              {list.map((item, index) => (
                <li key={`${index}-${list.length % 2}`}>
                  <TextField style={{ width: '95%' }} id={`${basePath}.${elementIndex}.content.${index}`} value={item} onChange={onEditArticle} margin='dense' variant='outlined' />
                  <div style={{display: 'inline-block', width: '5%', textAlign: 'center', marginTop: '12px'}}>
                    <Delete className='hover-cursor' onClick={() => removeFromList(`${basePath}.${elementIndex}.content`, index)} />
                  </div>
                </li>
              ))}
            </ol>
            {menu}
          </div>
        )
      case elementTypes.SIMPLE_LIST_UL:
        return (
          <div>
            <MoreHoriz style={{ marginLeft: '45px' }} className='hover-cursor' onClick={e => setAnchorEl(e.currentTarget)} />
            <Add className='hover-cursor' style={{ marginLeft: '45px' }} onClick={() => addToList(`${basePath}.${elementIndex}.content`, '', list.length)} />
            <ul>
              {list.map((item, index) => (
                <li key={`${index}-${list.length % 2}`}>
                  <TextField style={{ width: '95%' }} id={`${basePath}.${elementIndex}.content.${index}`} value={item} onChange={onEditArticle} margin='dense' variant='outlined' />
                  <div style={{display: 'inline-block', width: '5%', textAlign: 'center', marginTop: '12px'}}>
                    <Delete className='hover-cursor' />
                  </div>
                </li>
              ))}
            </ul>
            {menu}
          </div>
        )
      default:
        throw Error('Unexpected List Type');
    }
  } else {
    return (
      <Typography>Not a List</Typography>
    )
  }
}

export default List;