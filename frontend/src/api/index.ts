// api.ts
import axios from 'axios'
import {
  DoctorConfidentInfo,
  DoctorPublicInfo,
  DoctorTechnicalInfo,
  Doctor,
  DoctorPartial,
  Token,
  GetStats,
  GetWorkloadByDoctor,
  Schedule,
} from './types'
import {API_URL} from './API_URL'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
})

// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 307) {
//       const newURL = error.response.headers.location;
//       return axios.get(newURL, { headers: error.config.headers });
//     }
//     return Promise.reject(error);
//   }
// );

// Получить информацию о текущем пользователе
export const getMyself = async (token: string): Promise<DoctorConfidentInfo> => {
  const response = await api.get<DoctorConfidentInfo>('api/v1/doctors/me', {
    headers: {Authorization: `Bearer ${token}`},
  })
  return response.data
}

// Получить список докторов
export const getDoctors = async (token: string): Promise<DoctorPublicInfo[]> => {
  const response = await api.get<DoctorPublicInfo[]>('api/v1/doctors', {
    headers: {Authorization: `Bearer ${token}`},
  })
  return response.data
}

// Создать нового доктора
export const createDoctor = async (doctor: DoctorTechnicalInfo, token: string): Promise<DoctorConfidentInfo> => {
  const response = await api.post<DoctorConfidentInfo>('api/v1/doctors', doctor, {
    headers: {Authorization: `Bearer ${token}`},
  })
  return response.data
}

// Получить информацию о докторе по ID
export const getDoctor = async (doctor_id: number, token: string): Promise<Doctor> => {
  const response = await api.get<Doctor>(`api/v1/doctors/${doctor_id}`, {
    headers: {Authorization: `Bearer ${token}`},
  })
  return response.data
}

// Частично обновить информацию о докторе
export const updateDoctorPartial = async (doctor_id: number, doctor: DoctorPartial, token: string): Promise<void> => {
  await api.patch<void>(`api/v1/doctors/${doctor_id}`, doctor, {
    headers: {Authorization: `Bearer ${token}`},
  })
}

// Удалить доктора по ID
export const deleteDoctor = async (doctor_id: number, token: string): Promise<void> => {
  await api.delete<void>(`api/v1/doctors/${doctor_id}`, {
    headers: {Authorization: `Bearer ${token}`},
  })
}

// Изменить пароль доктора
export const changePassword = async (doctor_id: number, password: string, token: string): Promise<void> => {
  await api.patch<void>(`api/v1/doctors/${doctor_id}/password`, null, {
    headers: {Authorization: `Bearer ${token}`},
    params: {password},
  })
}

// Изменить статус аккаунта доктора
export const changeAccountStatus = async (doctor_id: number, account_status: string, token: string): Promise<void> => {
  await api.patch<void>(`api/v1/doctors/${doctor_id}/account_status`, null, {
    headers: {Authorization: `Bearer ${token}`},
    params: {account_status},
  })
}

// Получение токена доступа
export const loginForAccessToken = async (username: string, password: string): Promise<Token> => {
  const params = new URLSearchParams()
  params.append('grant_type', 'password')
  params.append('username', username)
  params.append('password', password)
  params.append('Content-Type', 'application/x-www-form-urlencoded')
  // 'Content-Type': 'application/x-www-form-urlencoded'
  //'Content-Type': 'application/json',

  const response = await api.post<Token>('/token', params, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  })
  return response.data
}

// Hello Index
export const helloIndex = async (): Promise<void> => {
  await api.get<void>('/')
}

export const getStats = async (token: string): Promise<GetStats> => {
  const response = await api.get<GetStats>('api/v1/stats', {
    headers: {Authorization: `Bearer ${token}`},
  })

  return response.data
}

export const getWorkloadByDoctor = async (
  workload_type: string,
  doctor_id: number,
  token: string
): Promise<GetWorkloadByDoctor> => {
  const response = await api.get<GetWorkloadByDoctor>('api/v1/reports/' + workload_type + '/' + doctor_id, {
    headers: {Authorization: `Bearer ${token}`},
  })

  return response.data
}

export const postWorkloadByDoctor = async (
  workload_type: string,
  doctor_id: number,
  amount: number,
  token: string
): Promise<GetWorkloadByDoctor> => {
  const response = await api.post<GetWorkloadByDoctor>(
    `api/v1/reports/${workload_type}/${doctor_id}`,
    {}, // Пустое тело запроса
    {
      headers: {Authorization: `Bearer ${token}`},
      params: {amount},
    }
  )

  return response.data
}

export const getSchedule = async (
  doctor_id: number,
  date_to: string,
  date_from: string,
  token: string
): Promise<Schedule> => {
  const response = await api.get<Schedule>(`api/v1/doctors/${doctor_id}/schedule`, {
    headers: {Authorization: `Bearer ${token}`},
    params: {date_from, date_to},
  })

  return response.data
}

export const getFile = async (token: string, type: string): Promise<unknown> => {
  const response = await api.get<unknown>(`api/v1/files/` + type, {
    headers: {Authorization: `Bearer ${token}`},
    params: {date: '2024-06-17'},
  })

  return response.data
}
