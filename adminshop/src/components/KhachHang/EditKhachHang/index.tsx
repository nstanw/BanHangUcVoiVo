import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  Toast,
  Space,
} from "antd-mobile";
import { useNavigate, useParams } from "react-router-dom";
import KhachHangService from "../../../services/khachHang/KhachHangService";
import { useEffect } from "react";
import khachHangService from "../../../services/khachHang/KhachHangService";

const EditKhachHang = () => {
  const navigate = useNavigate();
  const { _id } = useParams<{ _id: string }>();
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch khach hang data from API or database
    // and update the khachHangList state
    const fetchKhachHangList = async (_id: string) => {
      try {
        const response = await khachHangService.getKhachHangById(_id);
        console.log("response", response);

        form.setFieldsValue(response);
      } catch (error) {
        console.error("Error fetching khach hang list:", error);
      }
    };
    if (_id) {
      fetchKhachHangList(_id);
    }
  }, [_id, form]);

  const xoaKhachHang = async () => {
    if (_id) {
      try {
        await khachHangService.deleteKhachHang(_id);
      } catch (error) {
        console.error("Error fetching khach hang list:", error);
      }
    }
  };

  const onFinish = async (values: any) => {
    try {
      Dialog.alert({
        content: <pre>{JSON.stringify(values, null, 2)}</pre>,
      });
      let input = {
        _id: _id,
        name: values.name,
        diaChi: values.diaChi,
        soDienThoai: values.soDienThoai,
        facebook: values.facebook,
        zalo: values.zalo,
        note: values.note,
      };
      await KhachHangService.updateKhachHang(_id, input);
      Toast.show("Thêm khách hàng thành công");
      navigate("/KhachHang");
    } catch (error) {}
  };

  return (
    <>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        footer={[
          <Space>
            <Button block type="submit" color="primary" size="large">
              Sửa Khách hàng
            </Button>

            <Button
              onClick={() =>xoaKhachHang()}
              block
              type="submit"
              color="danger"
              size="large"
            >
              Xóa Khách hàng
            </Button>
          </Space>,
        ]}
      >
        <Form.Header>Sửa khách hàng</Form.Header>
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

export default EditKhachHang;
