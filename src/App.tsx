import React, { useState } from 'react';
import './App.css';
import { formData } from './formData';
import { BatteryForm } from './BatteryForm';
import { OrderTotals } from './OrderTotals';

const App: React.FC = () => {
  const [order, setOrder] = useState(formData);

  return (
    <div className="app">
      <div className="form">
        <BatteryForm order={order} setOrder={setOrder} />
      </div>
      <div className="preview">
        {/* top: totals */}
        {/* bottom: layout */}
        <OrderTotals order={order} />
      </div>
    </div>
  );
}

export default App;
