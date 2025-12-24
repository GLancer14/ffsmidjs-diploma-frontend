import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { setupStore } from './store/index.ts'
import AlertState from './context/AlertContext.tsx'
import ActionModalState from './context/ActionModalContext.tsx'
import { SocketState } from './context/SocketContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={setupStore}>
        <SocketState>
          <AlertState>
            <ActionModalState>
              <App />
            </ActionModalState>
          </AlertState>
        </SocketState>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
