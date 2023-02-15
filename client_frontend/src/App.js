import './App.css';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams } from 'react-router-dom';
import { Login}  from './pages';
import { Home } from './pages';
import { Header} from './components'
import { ProductDetails } from './pages/ProductDetail';

function App() {
  return <Router>
              <Header/>
              <Switch>
                <Route path="/details/:id">
                  <ProductDetails class="mt-3"/>
                </Route>
                <Route path="/login">
                  <Login class="mt-3"/>
                </Route>
                <Route path="/">
                  <Home class="mt-3"/>
                </Route>
              </Switch>
        </Router>
   
}

export default App;