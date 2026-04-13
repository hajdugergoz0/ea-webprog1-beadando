import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "/php/api_mertek.php";

function App() {
  const [adatok, setAdatok] = useState([]);
  const [ujNev, setUjNev] = useState("");
  const [szerkesztettId, setSzerkesztettId] = useState(null);

  const loadData = async () => {
    try {
      const res = await axios.get(API_URL);
      setAdatok(res.data);
    } catch (error) {
      console.error("Hiba az adatok betöltésekor:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addOrUpdateItem = async () => {
    if (!ujNev.trim()) return;

    try {
      if (szerkesztettId === null) {
        await axios.post(API_URL, { nev: ujNev });
      } else {
        await axios.put(API_URL, {
          id: szerkesztettId,
          nev: ujNev,
        });
        setSzerkesztettId(null);
      }

      setUjNev("");
      loadData();
    } catch (error) {
      console.error("Hiba mentés közben:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}?id=${id}`);
      if (szerkesztettId === id) {
        setSzerkesztettId(null);
        setUjNev("");
      }
      loadData();
    } catch (error) {
      console.error("Hiba törlés közben:", error);
    }
  };

  const editItem = (item) => {
    setSzerkesztettId(item.id);
    setUjNev(item.nev);
  };

  const cancelEdit = () => {
    setSzerkesztettId(null);
    setUjNev("");
  };

  return (
    <div className="container">
      <h1>Axios CRUD alkalmazás</h1>

      <div className="form-row">
        <input
          type="text"
          value={ujNev}
          onChange={(e) => setUjNev(e.target.value)}
          placeholder="Írj be egy mértékegységet"
        />

        <button onClick={addOrUpdateItem}>
          {szerkesztettId === null ? "Hozzáadás" : "Módosítás mentése"}
        </button>

        {szerkesztettId !== null && (
          <button onClick={cancelEdit} className="secondary-btn">
            Mégse
          </button>
        )}
      </div>

      <ul>
        {adatok.map((item) => (
          <li key={item.id}>
            <span>{item.nev}</span>
            <div className="btn-group">
              <button onClick={() => editItem(item)}>Szerkesztés</button>
              <button onClick={() => deleteItem(item.id)} className="delete-btn">
                Törlés
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;