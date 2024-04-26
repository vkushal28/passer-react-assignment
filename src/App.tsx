import './App.css'
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from './route';
import { Store } from './redux/store';
import Layout from './components/Layout';

function App() {
  return (
    <div className='h-[100vh]'>
      <Provider store={Store}>
        <BrowserRouter>
          <Layout>
            <Routes>
              {ROUTES.map((val) => (
                <Route key={val.path} path={val.path} element={<val.component />} />
              ))}
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
