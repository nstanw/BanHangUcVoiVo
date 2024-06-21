import { Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'



const GiaoDich = () => {
    const navigate = useNavigate()

    return (
        <Button
            onClick={() => navigate("/GiaoDich/AddGiaoDich")}
            block type='submit' color='primary' size='large'>
            Thêm giao dịch
        </Button>
    )
}

export default GiaoDich;