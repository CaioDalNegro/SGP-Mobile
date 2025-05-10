const API_BASE = "http://10.110.12.69:1880"; // Para Android Emulator; altere para seu IP local se necessário

export async function criarReserva(reserva) {
  try {
    const response = await fetch(`${API_BASE}/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reserva)
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    throw error;
  }
}

export async function buscarReservas() {
  try {
    const response = await fetch(`${API_BASE}/reservas`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    throw error;
  }
}
