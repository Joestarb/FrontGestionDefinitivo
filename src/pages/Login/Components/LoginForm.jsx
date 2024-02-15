import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // Variable para rastrear el paso actual
    const navigate = useNavigate();

// ...

const handleLoginStep1 = async (e) => {
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
                sessionStorage.setItem('id', data.userId)
                console.log(data)
                // Si el paso 1 es exitoso, pasa al paso 2
                setStep(2);
            } else {
                console.error('Error de inicio de sesión:', response.status, response.statusText);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al iniciar sesión'
                });
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error.message || 'Error desconocido');
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
};

const handleLoginStep2 = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('https://localhost:8080/verificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: sessionStorage.getItem('id'),
                otp: otp,
            }),
        });
    
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.access_token);
            sessionStorage.setItem('id', data.userId);
            sessionStorage.setItem('correo', data.email);
    
            // Asignar el nombre del rol según el valor recibido
            let roleName;
            switch (data.rol) {
                case 1:
                    roleName = 'Administrador';
                    break;
                case 2:
                    roleName = 'Lider';
                    break;
                case 3:
                    roleName = 'Diseñador';
                    break;
                case 4:
                    roleName = 'Programador';
                    break;
                case 5:
                    roleName = 'Analista';
                    break;
                default:
                    roleName = 'Rol Desconocido';
            }
    
            sessionStorage.setItem('rol', roleName);
    
            // Redirigir según el rol
            switch (roleName) {
                case 'Administrador':
                    navigate('/admin/proyectos');
                    break;
                case 'Lider':
                    navigate('/lider/miembros');
                    
                    break;
                case 'Diseñador':
                    navigate('/miembro/tareas');
                    break;
                case 'Programador':
                    navigate('/miembro/tareas');
                    break;
                case 'Analista':
                    navigate('/miembro/tareas');
                    break;
                default:
                    // Agrega lógica para cualquier otro rol que pueda tener
                    console.log('Rol desconocido:', roleName);
            }
        }
    
    else {
            console.error('Error de inicio de sesión:', response.status, response.statusText);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al iniciar sesión'
            });
        }
    } catch (error) {
        console.error('Error de inicio de sesión:', error.message || 'Error desconocido');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al iniciar sesión'
        });
    }
};

// ...

    

    return (
        <form className='h-screen flex flex-col bg-[#4D09A4] justify-center'>
            <h1 className='text-center text-white text-2xl font-bold'>INICIAR SESION</h1>
            <p className='items-center text-white text-center'>Bienvenidos, Por favor ingrese sus datos</p>
            {step === 1 && (
                <section>
                    <div className='gap-2 mb-2 items-center mt-4'>
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
                    <div className='flex text-lg flex-col justify-center items-center mt-6'>
                        <button className='bg-[#656ED3] rounded-md w-80 p-1 text-white' onClick={handleLoginStep1}>
                            Siguiente
                        </button>
                    </div>
                </section>
            )}
            {step === 2 && (
                <section>
                    <div className='gap-2 mb-2 items-center mt-4'>
                        <label className='text-center text-white ml-36'>Código OTP:</label>
                        <div className='flex items-center justify-center'>
                            <input
                                type='text'
                                className='w-96 bg-[#EBEFFF] border-2 border-[#AFB3FF] rounded-md px-[1%]'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex text-lg flex-col justify-center items-center mt-6'>
                        <button className='bg-[#656ED3] rounded-md w-80 p-1 text-white' onClick={handleLoginStep2}>
                            Iniciar sesión
                        </button>
                    </div>
                </section>
            )}
        </form>
    );
};
