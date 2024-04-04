import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactList from './Components/Contacts/ContactList/ContactList';
import AddContact from './Components/Contacts/AddContact/AddContact';
import EditContact from './Components/Contacts/EditContact/EditContact';
import ViewContact from './Components/Contacts/ViewContact/ViewContact';
import NavBar from './Components/NavCompo/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Navigate to={'Contact/List'}/>} />
          <Route path='/Contact/List' element={<ContactList/>} />
          <Route path='/Contact/Add' element={<AddContact/>} />
          <Route path='/Contact/Edit/:contactID' element={<EditContact/>} />
          <Route path='/Contact/View/:contactID' element={<ViewContact/>} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;