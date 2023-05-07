import axios from 'axios';
import { Patient } from '../Types';

const host = process.env.REACT_APP_API_URL;
export const deletePatientRequest = async (id: string) => {
  const response = await axios.delete(`${host}/patient/${id}`);
  return response;
}

export const getPatient = async (id: string) => {
  return await axios.get(`${host}/patient/${id}`);
}

export const LoginRequest = async (username: string, password: string) => {
  const response = await axios.post(
    `${host}/auth/login`, { username, password }
  )

  return response

}

export const SavePatientRequest = async (data: Patient) => {
  const response = await axios.post(
    `${host}/patient`, data
  )

  return response

}
export const getPatientDetail = async (patientId: string, formdata: FormData) => {
  return await axios.put(`${host}/patient/${patientId}/detail`, formdata, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
}
export const getAllPatientRequest = async () => {
  const response = await axios.get(
    `${host}/patient`
  )

  return response

}