import GlobalStyles from './GlobalStyles';
import Router from './Router';


//react-query
import {
  QueryClient, QueryClientProvider
} from 'react-query';

function App() {
  const queryClient = new QueryClient();

  return (
   <QueryClientProvider client={queryClient}>
      <Router />
      <GlobalStyles/>
   </QueryClientProvider>
  );
}

export default App;
