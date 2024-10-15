import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [fast, setfast] = useState([]);
  const [fasts, setCardfasts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fastsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/fast")
      .then((response) => {
        setfast(response.data);
        setCardfasts(response.data.slice(0, fastsPerPage));
      })
      .catch((err) => {
        setError("An error occurred while loading data.");
      });
  }, []);

  const Cardfasts = fasts.filter((db) =>
    db.mealName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const changePage = (newPage) => {
    const start = (newPage - 1) * fastsPerPage;
    setCardfasts(fast.slice(start, start + fastsPerPage));
    setCurrentPage(newPage);
  };

  const nextPage = () => changePage(currentPage + 1);
  const prevPage = () => changePage(currentPage - 1);

  return (
    <>
      <TextField
        id="outlined-multiline-flexible"
        label="Card Name..."
        multiline
        maxRows={4}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginTop: "50px",
          width: "800px",
          marginLeft: "400px",
        }}
      />
      <div className="fast">
        {Cardfasts.map((db) => (
          <div className="fast__card" key={db.id}>
            <h4>{db.mealName}</h4>
            <h6>Kcal: {db.kcal}</h6>
            <h5>Cuisine: {db.cuisine}</h5>
          </div>
        ))}
      </div>
      <div className="btn">
        <button
          className="prev__btn"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="next__btn"
          onClick={nextPage}
          disabled={currentPage * fastsPerPage >= fast.length}
        >
          Next
        </button>
      </div>
    </>
  );
}
