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
import ProjectListScreen from "./screens/ProjectListScreen";
import ProjectScreen from "./screens/ProjectScreen";
import ToDoListScreen from "./screens/ToDoListScreen";
import ToDoScreen from "./screens/ToDoScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

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
                                <Route path='/users/:id' element={<UserEditScreen />}/>
                                <Route path='/projects' element={<ProjectListScreen />}/>
                                <Route path='/projects/:id' element={<ProjectScreen />}/>
                                <Route path='/todo' element={<ToDoListScreen />}/>
                                <Route path='/todo/:id' element={<ToDoScreen />}/>
                                <Route path='/login' element={<LoginScreen />}/>
                                <Route path='/registration' element={<RegisterScreen />}/>

                            </Routes>
                    </BrowserRouter>
                </Container>
            </main>
            <Footer/>
        </>
    );
}

export default App;