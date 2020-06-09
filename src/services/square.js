import axios from '@/libs/_axios.js'
import { activity } from '@/consts/path.js'

export async function getDetail(id) {
  const res = await axios.get(`${activity.getDetail}`)
  return res.response
}
export async function play(data) {
  const res = await axios.post(`${activity.play}`, data)
  return res.response
}
