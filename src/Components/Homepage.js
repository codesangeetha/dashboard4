import React from "react";
import { useNavigate } from "react-router-dom";
export default function Site() {

    const [arr, setArr] = React.useState([]);
    let navigate = useNavigate();


    React.useEffect(() => {
        fetchMobileData();
        // const intervalId = setInterval(fetchData, 1000);
    }, [])

    function fetchMobileData() {
        fetch("http://localhost:8080/api/products/type/mobile")
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

            return (

                <div>

                    <div className="margin-class">

                        <div onClick={() => { gotoProdPage(item.id); }}>
                            <img className="img-class" src={item.imageUrl} />
                        </div>
                        <div className="name-class">
                            {item.name.substring(0, 24)}...
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
                        <div>
                            {item.budgetPhone}
                        </div>

                    </div>
                </div>
            )
        });
        return result
    }



    

    function shoeFn() {

        fetch("http://localhost:8080/api/products/type/shoe")
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                setArr(data);
            });


    }
    function dressFn() {
        fetch("http://localhost:8080/api/products/type/dress")
        .then(res => res.json())
        .then(data => {
            console.log('data', data);
            setArr(data);
        });

    }

    return (
        <div>

            <div className="products-class">
                <div className="mobile-class" onClick={fetchMobileData}>
                    Mobile
                </div>
                <div className="shoe-class" onClick={shoeFn}>
                    Shoe
                </div>
                <div className="dress-class" onClick={dressFn}>
                    Dress
                </div>
            </div>

            <div className="display2-class">
                {getResult()}
            </div>

        </div>
    )
}