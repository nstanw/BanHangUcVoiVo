import { Button, List } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { GetAllKhachHang } from "../../services/khachHang/khachHangDto";
import khachHangService from "../../services/khachHang/KhachHangService";


const KhachHang = () => {
  const navigate = useNavigate();
  const [khachHangList, setKhachHangList] = useState<GetAllKhachHang[]>([]);

  useEffect(() => {
    // Fetch khach hang data from API or database
    // and update the khachHangList state
    const fetchKhachHangList = async () => {
      try {
        const response = await khachHangService.getAllKhachHangs();
        setKhachHangList(response);
      } catch (error) {
        console.error("Error fetching khach hang list:", error);
      }
    };
    fetchKhachHangList();
  }, []);

  return (
    <>
      <List>
        {khachHangList.map((khachHang, index) => (
          <List.Item
           key={khachHang.name}
           onClick={() => {
                navigate(`/KhachHang/${khachHang._id}`);
           }}
           >{index + 1}:{khachHang.name} - {khachHang.diaChi}</List.Item>
        ))}
      </List>

      <Button
        onClick={() => navigate("/KhachHang/AddKhachHang")}
        block
        type="submit"
        color="primary"
        size="large"
      >
        Thêm Khách hàng
      </Button>
    </>
  );
};
export default KhachHang;
