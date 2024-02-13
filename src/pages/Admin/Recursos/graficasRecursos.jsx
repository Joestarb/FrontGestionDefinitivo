import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function GraficasRecursos() {
  const [recursos, setRecursos] = useState([]);
  const [recursosDisponibles, setRecursosDisponibles] = useState([]);
  const [recursosUsados, setRecursosUsados] = useState([]);
  const [recursosPendientes, setRecursosPendientes] = useState([]);

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const response = await axios.get('https://localhost:8080/recurso');
        setRecursos(response.data);
      } catch (error) {
        console.error('Error fetching recursos:', error);
      }
    };

    fetchRecursos();
  }, []);

  useEffect(() => {
  
    const disponibles = recursos.filter(recurso => recurso.estado === 'Disponible');
    const usados = recursos.filter(recurso => recurso.estado === 'En uso');
    const pendientes = recursos.filter(recurso => recurso.estado === 'Pendiente');
    
    setRecursosDisponibles(disponibles);
    setRecursosUsados(usados);
    setRecursosPendientes(pendientes);
  }, [recursos]);

  const generarDatosGrafica = (recursos) => {
    return {
      labels: recursos.map(recurso => recurso.nombre),
      datasets: [
        {
          data: recursos.map(recurso => recurso.cantidad),
          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0', '#9966FF', '#FF9F40'],
          hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0', '#9966FF', '#FF9F40']
        }
      ]
    };
  };

  return (
    <div>
      <div>
        <h2>Recursos Disponibles</h2>
        {recursosDisponibles.length > 0 && <Pie data={generarDatosGrafica(recursosDisponibles)} />}
      </div>
      <div>
        <h2>Recursos Usados</h2>
        {recursosUsados.length > 0 && <Bar data={generarDatosGrafica(recursosUsados)} />}
      </div>
      <div>
        <h2>Recursos Pendientes</h2>
        {recursosPendientes.length > 0 && <Bar data={generarDatosGrafica(recursosPendientes)} />}
      </div>
    </div>
  );
}
