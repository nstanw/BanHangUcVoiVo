import {
    Button,
    Dialog
} from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

const SanPham = () => {
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        Dialog.alert({
            content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        })
    }

    return (
        <Button
            onClick={() => navigate('/SanPham/AddSanPham')}
            block type='submit' color='primary' size='large'>
            Thêm Sản Phẩm
        </Button>
    )
}

export default SanPham;