import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api";
import type { Catch } from "../types";

const CatchEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // state pro položku (může být null dokud se nenahraje)
  const [form, setForm] = useState<Partial<Catch>>({
    fishName: "",
    weight: 0,
    length: 0,
    date: "",
  });
  const [loading, setLoading] = useState<boolean>(true); // načítání dat
  const [saving, setSaving] = useState<boolean>(false); // ukládání (PUT)
  const [error, setError] = useState<string | null>(null);

  // načte detail a naplní formulář
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
        // naplním form hodnotami z API (response.data)
        setForm({
          fishName: response.data.fishName ?? "", //   ?? "" pro vlozeni prazdne hodnoty, kdyby prisla z backendu nejaka picovina.
          weight: response.data.weight ?? 0,
          length: response.data.length ?? 0,
          date: response.data.date ?? "",
          id: response.data.id,
        });
      } catch (err: any) {
        console.error("Chyba při načítání pro edit:", err);
        setError("Nepodařilo se načíst úlovek pro editaci.");
      } finally {
        setLoading(false);
      }
    };

    fetchCatch();
  }, [id]);

  // univerzální handler pro inputy
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    // pokud je number, převeď na číslo; jinak nech string
    const parsedValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;

    setForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  // odeslání formuláře (PUT)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // základní validace
    if (!form.fishName || form.fishName.trim() === "") {
      setError("Druh ryby je povinný.");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/list/${id}`, {
        fishName: form.fishName,
        weight: form.weight,
        length: form.length,
        date: form.date,
      });
      // po úspěsne zmene me  přesměruje zpět na detail nebo seznam (pozdeji rozhodnem)
      navigate(`/catch/${id}`);
    } catch (err: any) {
      console.error("Chyba při ukládání:", err);
      setError("Nepodařilo se uložit změny.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Načítám formulář pro editaci...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Upravit úlovek</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Druh:
            <input
              name="fishName"
              value={form.fishName ?? ""}
              onChange={handleChange}
              type="text"
            />
          </label>
        </div>

        <div>
          <label>
            Váha (kg):
            <input
              name="weight"
              value={form.weight as number | ""}
              onChange={handleChange}
              type="number"
              step="0.1"
              min="0"
            />
          </label>
        </div>

        <div>
          <label>
            Délka (cm):
            <input
              name="length"
              value={form.length as number | ""}
              onChange={handleChange}
              type="number"
              step="1"
              min="0"
            />
          </label>
        </div>

        <div>
          <label>
            Datum:
            <input
              name="date"
              value={form.date ?? ""}
              onChange={handleChange}
              type="text"
              placeholder="DD/MM/YYYY"
            />
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={saving}>
            {saving ? "Ukládám…" : "Uložit"}
          </button>{" "}
          <Link to={`/catch/${id}`} style={{ marginLeft: 8 }}>
            Zpět
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CatchEdit;
