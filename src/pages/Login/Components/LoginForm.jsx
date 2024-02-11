import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginAdmin = async (e) => {
        e.preventDefault();

if (email.trim() !== '' && email.trim() === email.trimStart() && password.trim() !== '') {
    try {
        const response = await fetch('https://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                correo_electronico: email.trim(),
                contrasena: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Muy bien',
                text: '¡Bienvenida!'
            });
            localStorage.setItem('accessToken', data.access_token);
            sessionStorage.setItem('id', data.id_usuario)
            sessionStorage.setItem('correo', data.correo_electronico);
            sessionStorage.setItem('rol', data.nombre_rol);

            if(data.nombre_rol === 'Administrador'){
                navigate('/administrador/proyectos');
            } else if(data.nombre_rol === 'Lider'){
                navigate('/Lider/proyectos');
                navigate('/Lider/equipos');
                navigate('/Lider/recursos');
            } else {
                navigate('/miembro/tareas');

            }
            
        } else {
            console.error('Error de inicio de sesión:', error.response?.data?.detail || 'Error desconocido');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al iniciar sesión'
            });
        }
    } catch (error) {
        console.error('Error de inicio de sesión:', error.response?.data?.detail || 'Error desconocido');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al iniciar sesión'
        });
    }
} else {
    return Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Ingrese un correo electrónico y contraseña válidos'
    });
}


    }


    


    return (
        <form className='h-screen flex flex-col bg-[#4D09A4] justify-center'>
            <h1 className='text-center text-white text-2xl font-bold'>INICIAR SESION</h1>
            <p className='items-center text-white text-center'>Bienvenidos, Por favor ingrese sus datos</p>
            <section>
                <div className='gap-2 mb-2  items-center mt-4'>
                    <label className='text-center text-white ml-36'>Correo:</label>
                    <div className='flex items-center justify-center'>
                        <input
                            type='email'
                            className='w-96 bg-[#EBEFFF] border-2 border-[#AFB3FF] rounded-md px-[1%]'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='gap-2 mb-2 items-center mt-4'>
                    <label className='text-center text-white ml-36'>Contraseña:</label>
                    <div className='flex items-center justify-center'>
                        <input
                            type='password'
                            className='w-96 bg-[#EBEFFF] border-2 border-[#AFB3FF] rounded-md px-[1%]'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
            </section>
            <div className='flex text-lg flex-col justify-center items-center mt-6'>
                <button className='bg-[#656ED3] rounded-md w-80 p-1 text-white' onClick={handleLoginAdmin}>
                    Iniciar sesión
                </button>
            </div>
        </form>
    );
};
