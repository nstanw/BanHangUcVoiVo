import React, {  useState } from 'react'
import {
    Form,
    Input,
    Button,
    Dialog,
    List,
    Stepper,
    Divider,
    Card,
} from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

type Product = {
    maSanPham: string;
    giaNhap: number;
    soLuongBan: number;
};

const GiaoDich = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState<Product[]>([]);

    const addProduct = () => {
        setProducts([...products, { maSanPham: '', giaNhap: 0, soLuongBan: 1 }])
    }
    const deleteProduct = (index: number) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    };

    const updateProduct = (index: number, product: any) => {
        console.log(index,product);
        
        const newProducts = [...products];
        newProducts.splice(index, 1);
        newProducts[index] = product;
        setProducts(newProducts);
    };

    const onFinish = (values: any) => {
        navigate("/GiaoDich")
        Dialog.alert({
            content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        })

    }

    return (
        <>
            <Form
                layout='horizontal'
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        Thêm giao dịch
                    </Button>
                }
            >
                <Form.Header>Thêm giao dịch</Form.Header>
                <Form.Item name='maKhachHang' label='Khách hàng' rules={[{ required: true, message: 'Phải có nhé!' }]}                >
                    <Input onChange={console.log} />
                </Form.Item>

                <Divider contentPosition="center" >Chi tiết mua</Divider>
                <Form.Item name='thanhTien' label='Thành tiền' >
                    <span>{0}</span>
                </Form.Item>
                <List>
                    {products.map((product, index) => (

                        <div>
                            <List.Item key={index}>
                                <Card>
                                    <Divider contentPosition="left" >Sản phẩm {index + 1}</Divider>
                                    <Form.Item name={`product[${index}].maSanPham`} label="Sản phẩm" rules={[{ required: true, message: 'Please input product name!' }]}>
                                        <Input
                                            value={product.maSanPham}
                                            onChange={(name) => updateProduct(index, { ...product, name })}
                                            placeholder='Tên sản phẩm'
                                        />
                                    </Form.Item>
                                    <Form.Item name={`product[${index}].giaNhap`} label="Giá gốc" rules={[{ required: true, message: 'Please input product price!' }]}>
                                        <Input
                                            type="number"
                                            value={product.giaNhap.toString()}
                                            onChange={(price) => updateProduct(index, { ...product, price: price })}
                                            placeholder='Giá gốc'
                                        />
                                    </Form.Item>
                                    <Form.Item name={`product[${index}].soLuongBan`} label="SL bán" rules={[{ required: true, message: 'Please input product quantity!' }]}>
                                        <Stepper

                                            value={product.soLuongBan}
                                            onChange={(quantity) => updateProduct(index, { ...product, quantity })}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Thành tiền">
                                        <p>{product.giaNhap * product.soLuongBan}</p>
                                    </Form.Item>
                                    <List.Item>
                                        <Button color='danger' onClick={() => deleteProduct(index)}>Xóa sản phẩm</Button>
                                    </List.Item>
                                </Card>
                            </List.Item>
                        </div>

                    ))}
                    <List.Item>
                        <Button onClick={addProduct}>Thêm sản phẩm</Button>
                    </List.Item>
                </List>


                <Form.Item name='soTienDaThanhToan' label='Số tiền đã thanh toán' >
                    <Input type="number" onChange={console.log} />
                </Form.Item>
            </Form >
        </>
    )
}

export default GiaoDich;