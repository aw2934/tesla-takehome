import React, { useState } from 'react';
import './App.css';
import { formData } from './formData';
import { BatteryForm } from './BatteryForm';
import { RightPane } from './RightPane';

const App: React.FC = () => {
  const [order, setOrder] = useState(formData);

  return (
    <div className="app">
      <div className="form">
        <BatteryForm order={order} setOrder={setOrder} />
      </div>
      <RightPane order={order} />
    </div>
  );
}

export default App;
