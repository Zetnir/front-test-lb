import * as React from 'react';

import './PageTitle.css';

export const PageTitle: React.FC = () => (
  <div className='w-max pl-20 pt-16'>
    <h1 className='app-name'>Panacée</h1>
    <p className='app-description'>
      Suivre la progression
      <br />
      du COVID-19 au Canada,
      <br />
      en temps réel.
    </p>
  </div>
);
