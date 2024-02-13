import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';

export default function GraficasRecursos() {
  const [recursos, setRecursos] = useState([]);
  const [recursosDisponibles, setRecursosDisponibles] = useState([]);
  const [recursosUsados, setRecursosUsados] = useState([]);
  const [recursosPendientes, setRecursosPendientes] = useState([]);
  const [contadorRecursos, setContadorRecursos] = useState(0);

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
    const fetchContadorRecursos = async () => {
      try {
        const response = await axios.get('https://localhost:8080/proyecto/1/contadorRecursos'); 
        setContadorRecursos(response.data.contadorRecursos);
      } catch (error) {
        console.error('Error fetching contador de recursos:', error);
      }
    };

    fetchContadorRecursos();
  }, []);

  useEffect(() => {
   
    const disponibles = recursos.map(recurso => recurso.disponibilidad);
    const usados = recursos.map(recurso => recurso.usados);
    const pendientes = recursos.map(recurso => recurso.pendientes);
    
    setRecursosDisponibles(disponibles);
    setRecursosUsados(usados);
    setRecursosPendientes(pendientes);
  }, [recursos]);

  // Asignar un valor a cada recurso
  useEffect(() => {
    if (contadorRecursos > 0) {
      const valorPorRecurso = 100 / contadorRecursos;

      const nuevosRecursosDisponibles = new Array(contadorRecursos).fill(valorPorRecurso);
      const nuevosRecursosUsados = new Array(contadorRecursos).fill(valorPorRecurso / 2); // Valores de ejemplo
      const nuevosRecursosPendientes = new Array(contadorRecursos).fill(valorPorRecurso / 2); // Valores de ejemplo

      setRecursosDisponibles(nuevosRecursosDisponibles);
      setRecursosUsados(nuevosRecursosUsados);
      setRecursosPendientes(nuevosRecursosPendientes);
    }
  }, [contadorRecursos]);


  const dataPastel = {
    labels: recursos.map(recurso => recurso.nombre),
    datasets: [
      {
        data: recursosDisponibles,
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0', '#9966FF', '#FF9F40'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0', '#9966FF', '#FF9F40']
      }
    ]
  };


  const dataBarrasUsados = {
    labels: recursos.map(recurso => recurso.nombre),
    datasets: [
      {
        label: 'Recursos Usados',
        backgroundColor: '#36A2EB',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: recursosUsados
      }
    ]
  };

 
  const dataBarrasPendientes = {
    labels: recursos.map(recurso => recurso.nombre),
    datasets: [
      {
        label: 'Recursos Pendientes',
        backgroundColor: '#FF6384',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: recursosPendientes
      }
    ]
  };

  return (
    <div>
      <div>
        <h2>Recursos Disponibles</h2>
        <Pie data={dataPastel} />
      </div>
      <div>
        <h2>Recursos Usados</h2>
        <Bar data={dataBarrasUsados} />
      </div>
      <div>
        <h2>Recursos Pendientes</h2>
        <Bar data={dataBarrasPendientes} />
      </div>
    </div>
  );
}
