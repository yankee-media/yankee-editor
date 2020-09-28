import React from 'react';

// UI Components
import Typography from '@material-ui/core/Typography';

// Custom Components
import Section from '../components/Section';
import Paragraph from '../components/elements/Paragraph';
import Image from '../components/elements/Image';
import List from '../components/elements/List';
import Header from '../components/elements/Header';

// Util
import { elementTypes } from 'yankee-blog';

const editableElementMap = new Map([
  [elementTypes.PARAGRAPH_WITH_BOTTOM_SPACE, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Paragraph withSpace key={`${basePath}-${elementIndex}-${elementTypes.PARAGRAPH_WITH_BOTTOM_SPACE}`} totalElements={totalElements} elementIndex={elementIndex} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.PARAGRAPH_WITHOUT_BOTTOM_SPACE, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Paragraph key={`${basePath}-${elementIndex}-${elementTypes.PARAGRAPH_WITHOUT_BOTTOM_SPACE}`} totalElements={totalElements} elementIndex={elementIndex} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.FULL_WIDTH_IMAGE, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Image key={`${basePath}-${elementIndex}-${elementTypes.FULL_WIDTH_IMAGE}`} totalElements={totalElements} elementIndex={elementIndex} type={elementTypes.FULL_WIDTH_IMAGE} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.HALF_WIDTH_IMAGE, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Image key={`${basePath}-${elementIndex}-${elementTypes.HALF_WIDTH_IMAGE}`} totalElements={totalElements} elementIndex={elementIndex} type={elementTypes.HALF_WIDTH_IMAGE} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.TWO_THIRDS_WIDTH_IMAGE, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Image key={`${basePath}-${elementIndex}-${elementTypes.TWO_THIRDS_WIDTH_IMAGE}`} totalElements={totalElements} elementIndex={elementIndex} type={elementTypes.TWO_THIRDS_WIDTH_IMAGE} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.SIMPLE_LIST_OL, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements, addToList) => (
    <List key={`${basePath}-${elementIndex}-${elementTypes.SIMPLE_LIST_OL}`} elementIndex={elementIndex} totalElements={totalElements} basePath={basePath} onEditArticle={onEditArticle} removeFromList={removeFromList} moveElementsInList={moveElementsInList} addToList={addToList} type={elementTypes.SIMPLE_LIST_OL} list={content} />
  )],
  [elementTypes.SIMPLE_LIST_UL, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements, addToList) => (
    <List key={`${basePath}-${elementIndex}-${elementTypes.SIMPLE_LIST_UL}`} elementIndex={elementIndex} totalElements={totalElements} basePath={basePath} onEditArticle={onEditArticle} removeFromList={removeFromList} moveElementsInList={moveElementsInList} addToList={addToList} type={elementTypes.SIMPLE_LIST_UL} list={content} />
  )],
  [elementTypes.H6, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Header variant={elementTypes.H6} key={`${basePath}-${elementIndex}-${elementTypes.H6}`} totalElements={totalElements} elementIndex={elementIndex} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.H5, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Header variant={elementTypes.H5} key={`${basePath}-${elementIndex}-${elementTypes.H5}`} totalElements={totalElements} elementIndex={elementIndex} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.H4, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Header variant={elementTypes.H4} key={`${basePath}-${elementIndex}-${elementTypes.H4}`} totalElements={totalElements} elementIndex={elementIndex} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.H3, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Header variant={elementTypes.H3} key={`${basePath}-${elementIndex}-${elementTypes.H3}`} totalElements={totalElements} elementIndex={elementIndex} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.H2, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Header variant={elementTypes.H2} key={`${basePath}-${elementIndex}-${elementTypes.H2}`} totalElements={totalElements} elementIndex={elementIndex} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.H1, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Header variant={elementTypes.H1} key={`${basePath}-${elementIndex}-${elementTypes.H1}`} totalElements={totalElements} elementIndex={elementIndex} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.QUOTE, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Paragraph variant={elementTypes.QUOTE}  key={`${basePath}-${elementIndex}-${elementTypes.QUOTE}`} totalElements={totalElements} elementIndex={elementIndex} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.CAPTION, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Paragraph variant={elementTypes.CAPTION} key={`${basePath}-${elementIndex}-${elementTypes.CAPTION}`} totalElements={totalElements} elementIndex={elementIndex} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )],
  [elementTypes.SUBTITLE, (basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements) => (
    <Paragraph variant={elementTypes.SUBTITLE} key={`${basePath}-${elementIndex}-${elementTypes.SUBTITLE}`} totalElements={totalElements} elementIndex={elementIndex} removeFromList={removeFromList} onEditArticle={onEditArticle} moveElementsInList={moveElementsInList} basePath={basePath} content={content} />
  )]
]);

const getEditableElementFromType = (type, content, elementIndex, basePath, onEditArticle, removeFromList, moveElementsInList, totalElements, addToList) => {
  return editableElementMap.get(type)(basePath, content, elementIndex, onEditArticle, removeFromList, moveElementsInList, totalElements, addToList);
}

export const getEditableArticleElements = (content, basePath, onEditArticle, removeFromList, moveElementsInList, addToList) => {
  const totalElements = content.length;
  return content.map((element, index) => {
    return getEditableElementFromType(element.type, element.content, index, basePath, onEditArticle, removeFromList, moveElementsInList, totalElements, addToList)
  });
}

export const parseEditableArticleBody = (body, basePath, onChangeArticle, onAddSection, onDeleteSection, onMoveSection, addToList, removeFromList, moveElementsInList) => {
  if (Array.isArray(body)) {
    return body.map((section, index) => {
      return (
        <Section
          key={`${basePath}-${index}-${body.length % 2}`}
          sectionIndex={index}
          basePath={basePath}
          totalSections={body.length - 1}
          columns={Object.values(section)}
          onAddSection={onAddSection}
          onDeleteSection={onDeleteSection}
          onMoveSection={onMoveSection}
          onChangeArticle={onChangeArticle}
          addToList={addToList}
          moveElementsInList={moveElementsInList}
          removeFromList={removeFromList} />
      )
    });
  } else {
    return <Typography>Article Body Array is Malformed</Typography>
  }
}