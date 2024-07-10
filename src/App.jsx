import React, { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [contactsArr, setContactsArr] = useState(contacts.slice(0, 5));

  const handleAddRandomContact = () => {
    const remainingContacts = contacts.filter(
      (contact) => !contactsArr.includes(contact)
    );

    if (remainingContacts.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const newContact = remainingContacts[randomIndex];

    setContactsArr([...contactsArr, newContact]);
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = contactsArr.filter((contact) => contact.id !== id);
    setContactsArr(updatedContacts);
  };

  const sortByName = () => {
    const sortedContacts = [...contactsArr].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContactsArr(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contactsArr].sort(
      (a, b) => b.popularity - a.popularity
    );
    setContactsArr(sortedContacts);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div className="button-container">
        <button onClick={handleAddRandomContact}>Add Random Contact</button>
        <button onClick={sortByName}>Sort by Name</button>
        <button onClick={sortByPopularity}>Sort by Popularity</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contactsArr.map((eachContact, index) => (
            <tr key={index}>
              <td>
                <img src={eachContact.pictureUrl} alt="Profile" width="100px" />
              </td>
              <td>{eachContact.name}</td>
              <td>{eachContact.popularity.toFixed(2)}</td>
              <td>{eachContact.wonOscar ? "🏆" : ""}</td>
              <td>{eachContact.wonEmmy ? "🌟" : ""}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteContact(eachContact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
