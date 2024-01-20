import axios from 'axios';

const Api ='http://localhost:4000/api'

export const registerRequest= user => axios.post(`${Api}/auth/register`, user, {
    withCredentials: true, // Habilitar envío de credenciales
  })