import React, {useEffect, useState} from "react";
import API from "../../service/service.jsx";
import {Link} from "react-router-dom";

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await API.get("categories/");
                setCategories(response.data.results);
            } catch (error) {
                console.error("There was an error fetching the categories:", error);
            }
        };

        fetchCategories();
    }, []);


    return (
        <div className="container my-5">
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link className="breadcrumb__item" to="/"><i className="fa fa-home"></i> Home</Link>
                                <span>Category</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-6 g-4 mt-3">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <div className="col text-center" key={index}>
                            <Link to={`/category/${category.id}`}>
                                <img src={category.image} alt={category.name}
                                     className="image_categories"/>
                            </Link>
                            <h5>{category.name}</h5>
                        </div>
                    ))
                ) : (
                    <div id="preloder">
                        <div className="loader"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Categories;
