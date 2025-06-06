// src/components/Header.jsx
import {Link} from "react-router-dom";
import {Image} from 'cloudinary-react';
import {AutoComplete, Flex, Input, Dropdown, Menu} from 'antd';
import useShowOffCanvasContext from "../hooks/useShowOffCanvasContext.jsx";
import {useState, useContext} from "react";
import useUserContext from "../hooks/useUserContext.jsx";
import {CartContext} from '../contexts/CartContext.jsx';

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
    const {userData, logout} = useUserContext();
    const {
        showMenu,
        toggleShowMenu,
        showCart,
        toggleShowCart,
        showWishlist,
        toggleShowWishlist
    } = useShowOffCanvasContext();

    const {totalCart} = useContext(CartContext);

    const items = [
        {
            key: '1',
            label: (
                <Link to='/account'>My Account</Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to='/account/orders'>Order History</Link>
            ),
        },
        {
            key: '3',
            label: (
                <a onClick={logout} rel="noopener noreferrer">Logout</a>
            ),
        },
    ];

    const itemsNav = [
        {
            label: <Link to='/'>Home</Link>,
            key: 'home',
        },
        {
            label: <Link to='/category'>Category</Link>,
            key: 'category',
        },
        {
            label: <Link to='/shop'>Women’s</Link>,
            key: 'women',
        },
        {
            label: <Link to='/shop'>Men’s</Link>,
            key: 'men',
        },
        {
            label: <Link to='/shop'>Shop</Link>,
            key: 'shop',
        },
        {
            label: <Link to='/'>Pages</Link>,
            key: 'pages',
            children: [
                {
                    label: <Link to='/product'>Product Details</Link>,
                    key: 'product',
                },
                {
                    label: <Link to='/cart'>Shop Cart</Link>,
                    key: 'cart',
                },
                {
                    label: <Link to='/check-out'>Checkout</Link>,
                    key: 'checkout',
                },
                {
                    label: <Link to='/blog/1'>Blog Details</Link>,
                    key: 'blog',
                },
            ],
        },
        {
            label: <Link to='/contact'>Contact</Link>,
            key: 'contact',
        },
    ];

    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        setCurrent(e.key);
    };

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
                        <Menu className="header__menu" onClick={onClick} selectedKeys={[current]} mode="horizontal"
                              items={itemsNav}/>
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
                            <ul className="header__right__widget">
                                {userData ? (
                                        <Dropdown
                                            menu={{items}}
                                            placement="bottomRight"
                                            arrow={{pointAtCenter: true}}
                                        >
                                            <li><i className="fa-regular fa-user"></i></li>
                                        </Dropdown>) :
                                    <li><Link to='login'><i className="fa-regular fa-user"></i></Link></li>}
                                <li>
                                    <a onClick={() => toggleShowWishlist(!showWishlist)}>
                                        <span className="icon_heart_alt"></span>
                                        <div className="tip">4</div>
                                    </a>
                                </li>
                                <li><a onClick={() => toggleShowCart(!showCart)}><span className="icon_bag_alt"></span>
                                    <div className="tip">{totalCart}</div>
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

export default Header;
