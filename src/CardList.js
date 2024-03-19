import React, { useState } from 'react';

function CardList() {
  const [cards, setCards] = useState([]);

  const handleAddCard = () => {
    setCards((prevCards) => [...prevCards, { id: Date.now(), value: 0 }]);
  };

  const handleDeleteCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  const handleChange = (event, card) => { // Pass the entire card object
    const newValue = parseInt(event.target.value, 10) || 0; // Parse to integer, default to 0
    setCards((prevCards) =>
      prevCards.map((c) => (c.id === card.id ? { ...c, value: newValue } : c))
    );
  };

  const sum = cards.reduce((acc, card) => acc + card.value, 0); // Calculate sum

  return (
    <div className="card-list-container">
      <button onClick={handleAddCard}>Add Card</button>
      <ul className="card-list">
        {cards.map((card) => (
          <li key={card.id} className="card">
            <input
              type="number"
              value={card.value}
              onChange={(event) => handleChange(event, card)} // Pass the card object
              placeholder="Enter a number..."
            />
            <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p className="card-count">Total: {sum}</p>
    </div>
  );
}

export default CardList;
