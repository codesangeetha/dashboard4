import React from "react";
import { useNavigate } from "react-router-dom";
export default function ShoesSite() {

    const [arr, setArr] = React.useState([]);
    let navigate = useNavigate();

    React.useEffect(() => {
        fetchData();
    }, [])
    function fetchData() {
        fetch("http://localhost:8080/api/products/type/shoe")
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                setArr(data);
            });
    }

    function gotoProdPage(id) {
        navigate(`/productpage/${id}`);
    }


    function getResult() {
        const result = arr.map((item) => {

            let letters = "";
            if (item.name.length > 24) {
                letters = "...";
            }

            return (
                <div>
                    <div className="margin-class">
                        <div onClick={() => { gotoProdPage(item.id); }}>
                            <img className="img-class" src={item.imageUrl} />
                        </div>

                        <div className="toleft-class">

                            <div className="name-class">
                                {item.name.substring(0, 24)}{letters}
                            </div>
                            <div className="brand-class">
                                {item.brand}
                            </div>

                            <div className="price-class">
                                ₹ {item.price}
                            </div>
                            <div className="oldprice-class">
                                ₹{item.oldPrice}
                            </div>
                            <div className="rating-class">
                                {item.rating}/5
                            </div>
                            <div className="ratingcount-class">
                                ({item.ratingCount})
                            </div>
                        </div>

                    </div>
                </div>
            )

        });
        return result
    }

    return (
        <div>
            <div>
                {getResult()}
            </div>
            <div >
                Cart
            </div>
            <div >
                Checkout
            </div>
        </div>
    )
}