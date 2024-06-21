import React from 'react'
import type { FC } from 'react'
import { TabBar } from 'antd-mobile'
import {
    Route, useNavigate,
    useLocation,
    Routes,
} from 'react-router-dom'
import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'

import GiaoDich from '../GiaoDich'
import KhachHang from '../KhachHang'
import AddKhachHang from '../KhachHang/AddKhachHang'
import SanPham from '../SanPham'
import AddSanPham from '../SanPham/AddSanPham'
import AddGiaoDich from '../GiaoDich/AddGiaoDich'
import EditKhachHang from '../KhachHang/EditKhachHang'

const Bottom: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { pathname } = location

    const setRouteActive = (value: string) => {
        navigate(value)
    }

    const tabs = [
        {
            key: '/GiaoDich',
            title: 'Giao dịch',
            icon: <AppOutline />,
        },
        {
            key: '/KhachHang',
            title: 'Khách Hàng',
            icon: <UnorderedListOutline />,
        },
        {
            key: '/SanPham',
            title: 'Sản phẩm',
            icon: <MessageOutline />,
        },
        {
            key: '/BaoCao',
            title: 'Báo cáo',
            icon: <UserOutline />,
        },
    ]

    return (
        <div className='butomTabBar' style={{ marginTop: 20 }}>
            <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    )
}

const Main = () => {
    return (

        <div >
            <div >
                {/* <NavBar>Quản lý bán hàng</NavBar> */}
            </div>

            <Routes>
                <Route path='/' element={<GiaoDich />} />
                <Route path='/KhachHang/:_id' element={<EditKhachHang />} />
                <Route path='/KhachHang/AddKhachHang' element={<AddKhachHang />} />
                <Route path='/GiaoDich/AddGiaoDich' element={<AddGiaoDich />} />
                <Route path='/GiaoDich' element={<GiaoDich />} />
                <Route path='/KhachHang' element={<KhachHang />} />
                <Route path='/SanPham/AddSanPham' element={<AddSanPham />} />
                <Route path='/SanPham' element={<SanPham />} />
                <Route path='/BaoCao' element={<PersonalCenter />} />
            </Routes>
            <Bottom />

        </div >
    )
}

function PersonalCenter() {
    return <div>BaoCaoa</div>
}

export default Main;