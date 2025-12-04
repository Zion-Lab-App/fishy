import React, { useEffect, useState } from "react";
import api from "../api.ts";
import { Link } from "react-router-dom";
import type { Catch } from "../types";

const CatchList: React.FC = () => {
  const [catches, setCatches] = useState<Catch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatches = async () => {
      try {
        const response = await api.get("/list");
        setCatches(response.data);
        setLoading(false);
      } catch (err: any) {
        setError("Nepodařilo se načíst úlovky");
        setLoading(false);
      }
    };

    fetchCatches();
  }, []);

  if (loading) return <div>Načítám úlovky...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Seznam úlovků</h2>
      <div>
        <ul>
          {catches.map((oneCatch: Catch) => {
            const { id, fishName, weight, length, date } = oneCatch;
            return (
              <li key={id}>
                {fishName} {weight} kg, {length} cm - {date}
                <div>
                  <Link to={`/catch/${id}`}>Detail</Link>{" "}
                  <Link to={`/catch/${id}/edit`}>Upravit</Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CatchList;
