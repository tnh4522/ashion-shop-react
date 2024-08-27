import Categories from "./components/Categories.jsx";
import ProductSpad from "./components/ProductSpad.jsx";
import Banner from "./components/Banner.jsx";
import TrendSpad from "./components/TrendSpad.jsx";
import Services from "./components/Services.jsx";

function HomePage() {
    return (
        <>
            <Categories/>
            <ProductSpad/>
            <Banner/>
            <TrendSpad/>
            <Services/>
        </>
    )
}

export default HomePage