import React from 'react';

import ArticleParser from 'yankee-article-parser';

// UI Components
import CircularProgress from '@material-ui/core/CircularProgress';

// Util
import { ARTICLE_CONTENTS, ARTICLE_META } from '../util/constants';

const Preview = ({ content }) => {
  if (!!content) {
    return (
      <div style={{ maxWidth: '1200px', margin: '15px auto 0 auto', padding: '8px' }}>
        <ArticleParser content={content[ARTICLE_CONTENTS]} meta={content[ARTICLE_META]} isPreview />
      </div>
    )
  } else {
    return (
      <div style={{ maxWidth: '1200px', margin: '15px auto 0 auto', padding: '8px', textAlign: 'center' }}>
        <CircularProgress />
      </div>
    )
  }
}

export default Preview;