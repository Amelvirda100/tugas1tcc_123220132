import { Routes, Route } from 'react-router-dom';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<NoteList />} />
            <Route path="/add" element={<AddNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
    );
};

export default App;
