import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { MessagesContainer } from './components/MessagesContainer';
import "./global.css"
import "./theme.css"

function App() {
  return (
    <BrowserRouter>
      <MessagesContainer>
        <AppRoutes />
      </MessagesContainer>
    </BrowserRouter>
  );
}

export default App;
