import { GET } from '../services/api'
import { getDistrictsData } from '../app/redux/reducers/districtsReducer';

export const Master_District = async () => {
    try {
        let res = await GET("/officer/master/district")
        return res.data.result.data
    } catch (error) {
        return error?.response
    }
}