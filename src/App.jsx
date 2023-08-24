import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import CartPage from './pages/CartPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import OrderPage from './pages/OrderPage';
import RegisterPage from './pages/RegisterPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="Login" element={<LoginPage />} />
                    <Route index element={<HomePage />} />
                    <Route path="product/:id" element={<DetailPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="order" element={<OrderPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
