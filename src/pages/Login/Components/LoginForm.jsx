import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginAdmin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://127.0.0.1:8000/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    correo_electronico: email,
                    contrasena: password,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Token:', data.access_token);
    
                // Guardar el token en localStorage
                localStorage.setItem('accessToken', data.access_token);
    
                // Redirigir al usuario a /administrador/miembros
                navigate('/administrador/miembros');
            } else {
                console.error('Error al iniciar sesión');
                // Manejar el error de inicio de sesión, mostrar un mensaje al usuario, etc.
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error.response?.data?.detail || 'Error desconocido');
        }
    };
    


    return (
        <form className='h-screen flex flex-col justify-center'>
            <h1 className='text-center text-2xl font-bold'>Bienvenido! Administrador</h1>
            <section>
                <div className='gap-2 mb-2 items-center mt-4'>
                    <label className='text-center ml-36'>Nombre:</label>
                    <div className='flex items-center justify-center'>
                        <input
                            type='text'
                            className='w-96 bg-[#EBEFFF] border-2 border-[#AFB3FF] rounded-3xl'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                </div>
                <div className='gap-2 mb-2 items-center mt-4'>
                    <label className='text-center ml-36'>Correo:</label>
                    <div className='flex items-center justify-center'>
                        <input
                            type='email'
                            className='w-96 bg-[#EBEFFF] border-2 border-[#AFB3FF] rounded-3xl'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='gap-2 mb-2 items-center mt-4'>
                    <label className='text-center ml-36'>Contraseña:</label>
                    <div className='flex items-center justify-center'>
                        <input
                            type='password'
                            className='w-96 bg-[#EBEFFF] border-2 border-[#AFB3FF] rounded-3xl'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
            </section>
            <div className='flex text-lg flex-col justify-center items-center mt-6'>
                <button className='bg-[#656ED3] rounded-3xl w-80 p-1 text-white' onClick={handleLoginAdmin}>
                    Iniciar sesión
                </button>
            </div>
        </form>
    );
};
