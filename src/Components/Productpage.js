import React from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { postData } from "../services/fetchfns";

export default function Productpage() {

    const { id } = useParams();

    let navigate = useNavigate();

    const [obj, setObj] = React.useState({});

    const [qtydata, setQty] = React.useState("1");

    React.useEffect(() => {
        fetchData();

    }, [])

    function fetchData() {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                setObj(data);
            });
    }


    function cartFn() {
        const url = "http://localhost:8080/api/cart/add-to-cart";
        let basketId = localStorage.getItem('basketid-shoe');
        if (basketId === null) {
            basketId = Math.floor(Math.random() * 999) + 101;
            localStorage.setItem("basketid-shoe", basketId);
        }

        console.log('basketId', basketId);
        const postObj = {
            "productId": id,
            "quantity": Number(qtydata),
            "basketId": basketId
        };

        postData(url, postObj)
            .then(async data => {
                navigate(`/cart`);
            });

    }

    function handleChange(event) {
        setQty(event.target.value);

    }

    return (
        <div>
            <div className="display-class">
                <div>
                    <img className="img2-class" src={obj.imageUrl} />
                </div>
                <div className="margin2-class">

                    <div className="prodName-class">
                        {obj.name}
                    </div>
                    <div className="blueFont-class ">
                        {obj.brand}
                    </div>
                    <div className="blueFont-class ">
                        ₹{obj.price}
                    </div>
                    <div className="oldprice-class">
                        ₹{obj.oldPrice}
                    </div>
                    <div className="rating-class">
                        {obj.rating}/5
                    </div>
                    <div className="ratingcount-class">
                        ({obj.ratingCount})
                    </div>
                    <div className="button-class">
                        <button className="buy-class">Buy</button>
                        <button onClick={cartFn} className="cart-class">Add to cart</button>

                        <select id="qty" className="cart-class" onChange={handleChange} value={qtydata.qty} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>

                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}