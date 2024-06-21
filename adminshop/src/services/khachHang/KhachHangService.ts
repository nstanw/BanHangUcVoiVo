import axios from 'axios';
const API_URL = 'http://localhost:5000/api/khachHang'; // Thay đổi URL này thành URL của server của bạn

class KhachHangService {
    // Lấy tất cả khachHangs
    getAllKhachHangs = async () => {
        const khachHangList = await axios.get(`${API_URL}/`);
        return khachHangList.data;
    }

    // Tạo một khachHang mới
    createKhachHang(data: any) {
        return axios.post(`${API_URL}/`, data);
    }

    // Lấy một khachHang theo id
    getKhachHangById = async (id: string) => {
        const khachHangList = await axios.get(`${API_URL}/get`, {params: {id: id}});
        return khachHangList.data;
    }

    // Cập nhật một khachHang theo id
    updateKhachHang(id: any, data: any) {
        return axios.patch(`${API_URL}/${id}`, data);
    }

    // Xóa một khachHang theo id
    deleteKhachHang(id: any) {
        return axios.delete(`${API_URL}/${id}`, {params: {id: id}});
    }
}
const khachHangService = new KhachHangService();

export default khachHangService;