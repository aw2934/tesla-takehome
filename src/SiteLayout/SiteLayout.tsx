import React from 'react';
import { FormData } from '../types';
import './SiteLayout.css';

interface Props {
  order: FormData;
}

const SiteLayout: React.FC<Props> = ({ order }) => {
  return (
    <div className="site-layout-container">
      <p>Hello</p>
    </div>
  );
};

export default SiteLayout;
