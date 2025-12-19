import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { setupStore } from './store/index.ts'
import AlertState from './context/AlertContext.tsx'
import ActionModalState from './context/ActionModalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={setupStore}>
        <ActionModalState>
          <AlertState>
            <App />
          </AlertState>
        </ActionModalState>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
