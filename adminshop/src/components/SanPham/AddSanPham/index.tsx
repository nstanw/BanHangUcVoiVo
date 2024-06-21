import React, { RefObject } from 'react'
import {
    Form,
    Input,
    Button,
    Dialog,
    TextArea,
} from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

const AddSanPham = () => {
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        Dialog.alert({
            content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        })
        navigate("/KhachHang")

    }

    return (
        <>
            <Form
                layout='horizontal'
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        Thêm sản phẩm
                    </Button>
                }
            >
                <Form.Header>Thêm sản phẩm</Form.Header>
                <Form.Item name='name' label='Tên sản phẩm' rules={[{ required: true, message: 'Phải nhập nhé!' }]}                >
                    <Input onChange={console.log} placeholder='Nhập tên khách' />
                </Form.Item>
                <Form.Item name='giaNhap' label='Giá nhập' rules={[{ required: true, message: 'Phải nhập nhé!' }]}>
                    <Input type='number' onChange={console.log} placeholder='Nhập giá nhập' /> </Form.Item>
                <Form.Item name='path' label='link ảnh'>
                    <Input onChange={console.log} placeholder='link ảnh' />
                </Form.Item>
            </Form>
        </>
    )
}

export default AddSanPham;