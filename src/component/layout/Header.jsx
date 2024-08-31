import React from 'react';
import {Link} from "react-router-dom";
import {Image} from 'cloudinary-react';
import {AutoComplete, Flex, Input} from 'antd';
import Popup from "reactjs-popup";
import useShowOffCanvasContext from "../hooks/useShowOffCanvasContext.jsx";
import {Dropdown} from 'antd';

const Title = (props) => (
    <Flex align="center" justify="space-between">
        {props.title}
        <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
            more
        </a>
    </Flex>
);
const renderItem = (title, count) => ({
    value: title,
    label: (
        <Flex align="center" justify="space-between">
            {title}
            <span>
         {count}
      </span>
        </Flex>
    ),
});
const options = [
    {
        label: <Title title="Libraries"/>,
        options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
    {
        label: <Title title="Solutions"/>,
        options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    },
    {
        label: <Title title="Articles"/>,
        options: [renderItem('AntDesign design language', 100000)],
    },
];

function Header() {
    const {showMenu, toggleShowMenu, showCart, toggleShowCart} = useShowOffCanvasContext();

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ];


    return (
        <header className="header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-2 col-lg-2">
                        <div className="header__logo">
                            <Link to="/"><Image cloudName="dhuckb4qt" publicId="My Brand/logo_as6ugx"
                                                crop="scale"/></Link>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-7">
                        <nav className="header__menu">
                            <ul>
                                <li className="active"><Link to="/">Home</Link></li>
                                <li><Link to="/shop">Women’s</Link></li>
                                <li><Link to="/shop">Men’s</Link></li>
                                <li><Link to="shop">Shop</Link></li>
                                <li><Link to="/">Pages</Link>
                                    <ul className="dropdown">
                                        <li><Link to="/product">Product Details</Link></li>
                                        <li><Link to="/cart">Shop Cart</Link></li>
                                        <li><Link to="/check-out">Checkout</Link></li>
                                        <li><Link to="/blog/1">Blog Details</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-2">
                        <div className="header__right">
                            <AutoComplete
                                popupClassName="certain-category-search-dropdown"
                                popupMatchSelectWidth={400}
                                options={options}
                                style={{width: 300}}
                                size="large"
                            >
                                <Input.Search size="middle" placeholder="Search your products in here..."/>
                            </AutoComplete>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__right">
                            <div className="header__right__auth">
                                <a href="#">Login</a>
                                <a href="#">Register</a>
                            </div>
                            <ul className="header__right__widget">
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    placement="bottomRight"
                                    arrow={{
                                        pointAtCenter: true,
                                    }}
                                >
                                    <li><i className="fa-regular fa-user"></i></li>
                                </Dropdown>
                                <li><a href="#"><span className="icon_heart_alt"></span>
                                    <div className="tip">2</div>
                                </a></li>
                                <li><a onClick={() => toggleShowCart(!showCart)}><span className="icon_bag_alt"></span>
                                    <div className="tip">2</div>
                                </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="canvas__open" onClick={() => toggleShowMenu(!showMenu)}>
                    <i className="fa fa-bars"></i>
                </div>
            </div>

        </header>
    )
}

export default Header