import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [animalInput, setAnimalInput] = useState("");
  const [nameSuggestions, setNameSuggestions] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (count === 10) {
        return console.log("limit reached");
      }

      const response = await axios.post("http://localhost:5050/api/generate", {
        animal: animalInput,
      });

      console.log(response.data.result.content);
      setNameSuggestions(response.data.result.content);

      if (response.status !== 200) {
        throw (
          response.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      setCount(count + 1);
      setAnimalInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <main>
      <h1>Pet Name Generator 🐱</h1>
      <p>You have used this app {count} times</p>

      <form onSubmit={handleFormSubmit}>
        <div>
          <textarea
            type="text"
            name="animal"
            placeholder="enter animal description"
            value={animalInput}
            onChange={(e) => {
              setAnimalInput(e.target.value);
            }}
          ></textarea>
        </div>
        <button type="submit">Generate Names</button>
      </form>
      {nameSuggestions.length > 0 && <p>{nameSuggestions}</p>}
    </main>
  );
}

export default App;
