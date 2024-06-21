import { Form, Input, Button, Dialog, TextArea, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import KhachHangService from "../../../services/khachHang/KhachHangService";

const AddKhachHang = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      Dialog.alert({
        content: <pre>{JSON.stringify(values, null, 2)}</pre>,
      });
      let input = {
        name: values.name,
        diaChi: values.diaChi,
        soDienThoai: values.soDienThoai,
        facebook: values.facebook,
        zalo: values.zalo,
      };
      await KhachHangService.createKhachHang(input);
      Toast.show("Thêm khách hàng thành công");
      navigate("/KhachHang");
    } catch (error) {}
  };

  return (
    <>
      <Form
        layout="horizontal"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            Thêm Khách hàng
          </Button>
        }
      >
        <Form.Header>Thêm khách hàng</Form.Header>
        <Form.Item
          name="name"
          label="name"
          rules={[{ required: true, message: "Phải nhập nhé!" }]}
        >
          <Input placeholder="Nhập tên khách" />
        </Form.Item>
        <Form.Item
          name="diaChi"
          label="diaChi"
          rules={[{ required: true, message: "Phải nhập nhé!" }]}
        >
          <TextArea
            placeholder="Nhập địa chỉ khách hàng"
            maxLength={1000}
            rows={2}
            showCount
          />
        </Form.Item>
        <Form.Item name="soDienThoai" label="phone number">
          <Input placeholder="link facebook" />
        </Form.Item>
        <Form.Item
          name="facebook"
          label="facebook"
          help={
            "Sau này dùng để truy cập nhanh vào fb hoặc messeger của họ, có thể nhập hoặc không"
          }
        >
          <Input placeholder="link facebook" />
        </Form.Item>
        <Form.Item
          name="zalo"
          label="zalo"
          help={
            "Sau này dùng để truy cập nhanh vào zalo của họ, có thể nhập hoặc không"
          }
        >
          <Input placeholder="sdt Zalo" />
        </Form.Item>
        <Form.Item name="note" label="note">
          <TextArea
            placeholder="ghi chú cần nhớ nếu có"
            maxLength={1000}
            rows={2}
            showCount
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default AddKhachHang;
