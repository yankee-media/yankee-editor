import React, { useState } from 'react';

// UI Components
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Icons
import Delete from '@material-ui/icons/Delete';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

// Custom Components
import ColumnContent from './ColumnContent';

// Util
import {
  NEW_SECTION_MAP
} from '../util/constants';

const Section = ({ columns, sectionIndex, totalSections, basePath, onAddSection, onDeleteSection, onMoveSection, onChangeArticle, addToList, removeFromList, moveElementsInList }) => {
  const [newSectionColumnNum, setNewSectionColumnNum] = useState(1);
  const totalColumns = columns.length;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Paper style={{ padding: '5px' }}>
          <div style={{ display: 'flex', marginTop: '8px' }}>
            <Button onClick={() => {
              onAddSection(basePath, sectionIndex, NEW_SECTION_MAP.get(newSectionColumnNum), true);
            }}>Add Section</Button>
            <Button onClick={() => {
              onDeleteSection(`${basePath}.${sectionIndex}`);
            }}><Delete /></Button>
            {(sectionIndex > 0) ? (<Button onClick={() => {
              onMoveSection(sectionIndex, sectionIndex - 1);
            }}><ArrowUpward /></Button>) : null}
            {(sectionIndex === totalSections) ? (null) : (<Button onClick={() => {
              onMoveSection(sectionIndex, sectionIndex + 1);
            }}><ArrowDownward /></Button>)}
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
      </Grid>
      {columns.map((column, index) => {
        return (
          <Grid key={`${sectionIndex}-${index}-${columns.length % 2}`} item xs={Math.floor(1 / totalColumns * 12)} sm={Math.floor(1 / totalColumns * 12)} md={Math.floor(1 / totalColumns * 12)} lg={Math.floor(1 / totalColumns * 12)} xl={Math.floor(1 / totalColumns * 12)}>
            <ColumnContent
              content={column}
              basePath={`${basePath}.${sectionIndex}`}
              columnIndex={index}
              onChangeArticle={onChangeArticle}
              addToList={addToList}
              removeFromList={removeFromList}
              moveElementsInList={moveElementsInList}
              totalColumns={columns.length} />
          </Grid>
        )
      })}
    </Grid>)
}
export default Section;