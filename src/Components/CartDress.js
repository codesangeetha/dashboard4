

import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../services/fetchfns";
export default function CartDress() {

    const [arr, setArr] = React.useState([]);

    let navigate = useNavigate();

    function checkoutFn() {
        navigate(`/checkoutdress`)

    }


    React.useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        const basketId = localStorage.getItem('basketid-dress');
        fetch(`http://localhost:8080/api/cart/get-cart-items?basketId=${basketId}`)
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                setArr(data);

            });
    };


    function crossFn(id) {
        const basketId = localStorage.getItem('basketid-dress');
        const url = `http://localhost:8080/api/cart/remove-from-cart/${id}/${basketId}`;

        deleteData(url)
            .then(async data => {
                console.log(data);
                fetchData();

            });
    }

    function getResult() {
        const result = arr.map((item) => {
            let sum = item.product.price * item.quantity;

            let letters = "";
            if (item.product.name.length > 24) {
                letters = "...";
            }

            return (
                <div className="display-class">
                    <div>
                        <img className="cartimg2-class" src={item.product.imageUrl} />
                    </div>
                    <div className="name2-class" >
                        {item.product.name.substring(0, 20)}{letters}
                    </div>
                    <div className="amount2-class">
                        ₹ {item.product.price}
                    </div>
                    <div className="qty-class">
                        {item.quantity}
                    </div>
                    <div className="amount2-class">

                        ₹{sum}
                    </div>
                    <div>
                        <img className="cross2-class" onClick={() => { crossFn(item.product.id) }} src="https://cdn-icons-png.flaticon.com/512/9312/9312232.png" />
                    </div>
                </div>
            )
        });
        return result
    }

    function total() {
        let grandTotal = 0;

        for (let i = 0; i < arr.length; i++) {
            let sum = arr[i].quantity * arr[i].product.price;
            grandTotal = grandTotal + sum;
        }
        return grandTotal;
    }

    return (
        <div>
            <div className="display-class">
                <div className="headname-class" >
                    Name
                </div>
                <div className="headPrice-class">
                    Price
                </div>
                <div >
                    Qty
                </div>
                <div className="headTotal-class">
                    Total
                </div>
            </div>
            <hr></hr>
            <div >
                {getResult()}
            </div>
            <hr></hr>
            <div className="grand-class">
                Grand Total :₹ {total()}
            </div>

            <div className="checkout-class">
                <button onClick={checkoutFn} >Checkout</button>
            </div>
        </div>
    )
}