import axios from '@/libs/_axios.js'
import { activity } from '@/consts/path.js'

export async function getDetail(id) {
  const res = await axios.get(`${activity.getDetail}/${id}`)
  return res.response
}
export async function verify(data) {
  const res = await axios.post(`${activity.verify}`, data)
  return res.response
}
export async function play(data) {
  const res = await axios.post(`${activity.play}`, data)
  return res.response
}
export async function getAmount(params) {
  const res = await axios.get(`${activity.getAmount}`, { params })
  return res.response
}
export async function getPrizes(params) {
  const res = await axios.get(`${activity.getPrizes}`, { params })
  return res.response
}
