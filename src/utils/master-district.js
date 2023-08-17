import { GET } from '../services/api'

export const Master_District = async () => {
    try {
        let res = await GET("/officer/master/district")
        return res.data.result.data
    } catch (error) {
        return error?.response
    }
}