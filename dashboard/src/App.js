// src/App.js
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, Cell
} from 'recharts';
import { PriceService, EventService, ChangePointService, SummaryService } from './services/api';
import moment from 'moment';
import './App.css';

function App() {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [changePoints, setChangePoints] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    PriceService.getPrices().then(setPrices);
    EventService.getEvents().then(setEvents);
    ChangePointService.getChangePoints().then(setChangePoints);
    SummaryService.getSummary().then(setSummary);
  }, []);

  // Prepare data for chart
  const chartData = prices.map(p => ({
    ...p,
    Date: moment(p.Date).format('YYYY-MM-DD')
  }));

  const eventMarkers = events.map(e => ({
    Date: moment(e.Date).format('YYYY-MM-DD'),
    type: 'event',
    name: e.Event_Description,
    eventType: e.Event_Type
  }));

  const cpMarkers = changePoints.map(cp => ({
    Date: cp.date,
    type: 'change',
    impact: cp.impact
  }));

  const allMarkers = [...eventMarkers, ...cpMarkers];

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛢️ Brent Oil Price Dashboard</h1>
        <p>Bayesian Change Point Analysis | 1987–2022</p>
      </header>

      <div className="summary">
        <h2>📊 Summary</h2>
        <p>Total Days: {summary.total_days} | Min: ${summary.min_price} | Max: ${summary.max_price}</p>
        <p>Events: {summary.num_events} | Change Points: {summary.num_change_points}</p>
      </div>

      <div className="chart-container">
        <h2>Brent Oil Price with Events & Change Points</h2>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <XAxis dataKey="Date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={70} />
            <YAxis label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Price" stroke="#8884d8" name="Brent Price" />

            {/* Overlay Events */}
            <Scatter
              data={eventMarkers}
              fill="red"
              shape="diamond"
              name="Events"
              tooltipType="none"
            >
              {eventMarkers.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={
                  entry.eventType === 'Conflict' ? 'red' :
                  entry.eventType === 'OPEC_Policy' ? 'green' :
                  entry.eventType === 'Sanction' ? 'orange' :
                  entry.eventType === 'Economic_Crisis' ? 'purple' : 'gray'
                } />
              ))}
            </Scatter>

            {/* Overlay Change Points */}
            <Scatter
              data={cpMarkers}
              fill="black"
              shape="triangle"
              name="Change Points"
              tooltipType="none"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="event-list">
        <h2>🔑 Key Events</h2>
        <ul>
          {events.slice(0, 10).map((e, i) => (
            <li key={i}><strong>{e.Date}</strong>: {e.Event_Description} ({e.Event_Type})</li>
          ))}
        </ul>
      </div>

      <div className="insights">
        <h2>💡 Key Insight</h2>
        <p>
          A major structural break was detected around <strong>{changePoints[0]?.date}</strong>, 
          with a <strong>{(changePoints[0]?.pct_change > 0 ? 'increase' : 'decrease')} of {Math.abs(changePoints[0]?.pct_change).toFixed(1)}%</strong> in price.
          This coincides with the <strong>Russia-Saudi price war</strong> and the <strong>Covid-19 pandemic</strong>.
        </p>
      </div>
    </div>
  );
}

export default App;