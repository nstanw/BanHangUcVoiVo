import { useState } from "react";
import {
  Form,
  DatePicker,
  Input,
  InputNumber,
  Switch,
  Select,
  Card,
  Button,
} from "antd";
import AccSelect from "../selector/AccSelect";
import moment from "moment";
import KhachHangSelect from "../selector/KhachHangSelect";

const { Option } = Select;

function GiaoDichs() {
  const [userSelect, setUserSelect] = useState<any>();
  const [accSelect, setAccSelect] = useState();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    console.log("userSelect", userSelect);
    console.log("accSelect", accSelect);
                            
    let input = {
      user: values.user.value,
      addGoogleAccount: values.addGoogleAccount,
      ...values,

      
    };

    console.log("input", input); 
    console.log("input", values.user.value); 
    // Thêm code để xử lý dữ liệu form tại đây
  };

  const initvalue = {
    ngayGiaoDich: moment(),
    soTienNo: 0,
    loaiChuyenKhoan: "Ngân Hàng",
  };
  return (
    <Card>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initvalue}
      >
        <Form.Item label="Chọn khách hàng" name="user">
          <KhachHangSelect
            onChange={(value) => setUserSelect(value)}
            macv={""}
          />
        </Form.Item>
        {userSelect && userSelect.value && (
          <Form.Item label="Chọn tài khoản" name="addGoogleAccount">
            <AccSelect
              onChange={(value) => setAccSelect(value)}
              user={userSelect.value}
            />
          </Form.Item>
        )}
        <Form.Item label="Ngày giao dịch" name="ngayGiaoDich">
          <DatePicker format={"DD-MM-YYYY"} />
        </Form.Item>
        <Form.Item label="Nợ" name="isNo" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Số Gold" name="soGold">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Số tiền chuyển khoản" name="soTien">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Số tiền nợ" name="soTienNo">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Loại chuyển khoản" name="loaiChuyenKhoan">
          <Select>
            <Option value="No">Chưa thanh toán</Option>
            <Option value="Ngân Hàng">Ngân Hàng</Option>
            <Option value="Momo">Momo</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Note" name="note">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default GiaoDichs;
