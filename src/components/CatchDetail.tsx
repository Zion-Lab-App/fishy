import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Catch } from "../types.ts";
import api from "../api.ts";

const CatchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [catchItem, setCatchItem] = useState<Catch | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatch = async () => {
      if (!id) {
        setError("Chybí ID v URL");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/list/${id}`);
        setCatchItem(response.data);
      } catch (err: any) {
        console.error("Chyba při načítání detailu:", err);
        setError("Nepodařilo se načíst detail úlovku");
      } finally {
        setLoading(false);
      }
    };

    fetchCatch();
  }, [id]);

  if (loading) return <div>Načítám detail...</div>;
  if (error) return <div>{error}</div>;
  if (!catchItem) return <div>Úlovek nebyl nalezen.</div>;

  const { id: catchId, fishName, weight, length, date } = catchItem;
  return (
    <div>
      <h2>Detail úlovku</h2>
      <p>
        <strong>Druh:</strong> {fishName}
      </p>
      <p>
        <strong>Váha:</strong> {weight} kg
      </p>
      <p>
        <strong>Délka:</strong> {length} cm
      </p>
      <p>
        <strong>Datum:</strong> {date}
      </p>

      <div style={{ marginTop: 12 }}>
        <Link to="/">← Zpět na seznam</Link>{" "}
        <Link to={`/catch/${catchId}/edit`} style={{ marginLeft: 8 }}>
          Upravit
        </Link>
      </div>
    </div>
  );
};

export default CatchDetail;
