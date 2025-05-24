import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { MessagesContainer } from './components/MessagesContainer';

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
