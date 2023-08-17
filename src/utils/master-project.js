import { GET } from '../services/api'
import { getDistrictsData } from '../app/redux/reducers/districtsReducer';

export const Master_Project = async (id) => {
    try {
        let res = await GET("/officer/master/block",
            {
                districtId: id
            })
        return res?.data?.result?.data
    } catch (error) {
        return error?.response
    }
}