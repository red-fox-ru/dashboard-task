import {Container} from "react-bootstrap";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

function App() {
    return (
        <>
            <Header/>
            <main className="py-3">
                <Container>
                    <BrowserRouter>
                            <Routes>
                                <Route path='/' element={<HomeScreen/>} exact/>
                                <Route path='/users' element={<UserListScreen/>}/>
                                <Route path='/users/:id' element={<UserEditScreen />} />
                            </Routes>
                    </BrowserRouter>
                </Container>
            </main>
            <Footer/>
        </>
    );
}

export default App;