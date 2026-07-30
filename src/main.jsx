import React from 'react'
import ReactDOM from 'react-dom/client'
import { FeatureFlags } from '@carbon/react'
import App from './App.jsx'
// Order matters: Tailwind's reset, then the Carbon framework, then our
// overrides on top of both.
import './index.css'
import './styles/carbon.scss'
import './styles/app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FeatureFlags flags={{ 'enable-css-grid': true }}>
      <App />
    </FeatureFlags>
  </React.StrictMode>,
)
