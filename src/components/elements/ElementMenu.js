import React from 'react';

// UI Components
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Icons
import Delete from '@material-ui/icons/Delete';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

const ElementMenu = ({ anchorEl, setAnchorEl, handleRemove, handleMoveUp, handleMoveDown, elementIndex, totalElements }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem style={{width: '175px'}} onClick={handleRemove}>Remove<span style={{flex: 1}}></span><Delete /></MenuItem>
      {elementIndex > 0 ? <MenuItem style={{width: '175px'}} onClick={handleMoveUp}>Move Up<span style={{flex: 1}}></span><ArrowUpward /></MenuItem> : null}
      {elementIndex >= totalElements ? null : <MenuItem style={{width: '175px'}} onClick={handleMoveDown}>Move Down<span style={{flex: 1}}></span><ArrowDownward /></MenuItem>}
    </Menu>
  )
}
export default ElementMenu;