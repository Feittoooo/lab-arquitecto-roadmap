import { useState, useEffect } from "react";

const API_URL = 'http://localhost:3000';

function App(){
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarNotas();
  }, []);


async function cargarNotas() {
    try {
      const res = await fetch(`${API_URL}/notas`);
      const data = await res.json();
      setNotas(data);
    } catch (error) {
      console.error('Error al cargar notas:', error);
    } finally {
      setCargando(false);
    }
  }

  async function crearNota(e) {
    e.preventDefault();
    if (!titulo.trim()) return;

    try {
      await fetch(`${API_URL}/notas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, completado: false }),
      });
      setTitulo('');
      cargarNotas();
    } catch (error) {
      console.error('Error al crear nota:', error);
    }
  }

  async function actualizarNota(id, status) {
    console.log('ID recibido:', id, typeof id);
    try {
      const res = await fetch(`${API_URL}/notas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completado: status }),
      });
      const data = await res.json();
      console.log('Respuesta del backend:', data); // <- esto sale en la Console del NAVEGADOR (F12)
      cargarNotas();
    } catch (error) {
      console.error('Error al modificar nota:', error);
    }
  }

  async function borrarNota(id) {
    try {
      await fetch(`${API_URL}/notas/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      setTitulo('');
      cargarNotas();
    } catch (error) {
      console.error('Error al borrar nota:', error);
    }
  }

  if (cargando) return <p>Cargando notas...</p>;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Mis notas</h1>

      <form onSubmit={crearNota} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Nueva nota..."
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Añadir</button>
      </form>
      <ul>
        {notas.map((nota) => (
          <li key={nota._id}>{nota.titulo}
            <form>
              <button onClick={() => actualizarNota(nota._id, !nota.completado)} type="button">Modificar</button>
              <button onClick={() => borrarNota(nota._id)} type="button">Borrar</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;