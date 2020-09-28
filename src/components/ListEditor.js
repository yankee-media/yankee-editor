import React from 'react';

// Icons
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';

// UI Components
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const ListEditor = ({ list, listName, basePath, addToList, removeFromList, changeList }) => {
  if (list && Array.isArray(list)) {
    return (
      <div>
        <Typography variant='subtitle2'>{listName}</Typography>
        {list.map((item, index) => (
          <div key={`${listName}-${index}-${list.length % 2}`}>
            <TextField variant='outlined' margin='dense' style={{ width: '85%' }} id={`${basePath}.${index}`} onChange={changeList} value={item} />
            <div style={{ display: 'inline-block', width: '15%' }}>
              <Button onClick={() => removeFromList(basePath, index)} style={{position: 'relative', top: '10px'}}><Delete /></Button>
            </div>
          </div>
        ))}
        <div>
          <Button onClick={() => addToList(basePath, '', list.length)}><Add /></Button>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default ListEditor;