
import React from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { putData } from "../services/fetchfns";
export default function PutPage() {

    const { id } = useParams();
    let navigate = useNavigate();
    const [obj, setObj] = React.useState(
        {
            name: "",
            brand: "",
            rating: "",
            ratingCount: "",
            price: "",
            oldPrice: "",
            productType: "",
            imageUrl: ""
        }
    );


    React.useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then(res => res.json())
            .then(data => {

                delete (data.updatedAt);
                delete (data.createdAt);
                console.log('data', data)
                setObj(data);
            });
    }


    function handleChange(event) {
        setObj(preVal => {
            return {
                ...preVal,
                [event.target.name]: event.target.value
            }
        });
    };

    function updateFn() {
        const url = `http://localhost:8080/api/products/${id}`;
        const putObj = {
            "name": obj.name,
            "brand": obj.brand,
            "rating": obj.rating,
            "ratingCount": obj.ratingCount,
            "price": obj.price,
            "oldPrice": obj.oldPrice,
            "productType": obj.productType,
            "imageUrl": obj.imageUrl
        };
        putData(url, putObj)
            .then(async data => {
                navigate(`/getpage`);
            });
    }

    return (
        <div>
            <div>
                <div className="Product-class">
                    Edit Data
                </div>

                <div>
                    <div className="label-class">
                        Name :
                    </div>
                    <textarea className="text1-class" onChange={handleChange} value={obj.name} name="name" />
                </div>

                <div>
                    <div className="label-class">
                        Brand :
                    </div>
                    <input type="text" className="text2-class" onChange={handleChange} value={obj.brand} name="brand" />
                </div>

                <div>
                    <div className="label-class">
                        Rating :
                    </div>
                    <input type="text" className="text3-class" onChange={handleChange} value={obj.rating} name="rating" />
                </div>

                <div>
                    <div className="label-class">
                        RatingCount :
                    </div>
                    <input type="text" className="text4-class" onChange={handleChange} value={obj.ratingCount} name="ratingCount" />
                </div>

                <div>
                    <div className="label-class">
                        Price :
                    </div>
                    <input type="text"
                        className="text5-class" onChange={handleChange} value={obj.price} name="price" />
                </div>

                <div>
                    <div className="label-class">
                        OldPrice :
                    </div>
                    <input type="text" className="text6-class" onChange={handleChange} value={obj.oldPrice} name="oldPrice" />
                </div>

                <div>
                    <div className="label-class">
                        ProductType :
                    </div>

                    <select id="type" className="text7-class" onChange={handleChange} value={obj.productType} name="productType">
                        <option value="type">Type</option>
                        <option value="mobile">Mobile</option>
                        <option value="shoe">Shoe</option>
                        <option value="dress">Dress</option>
                    </select>
                </div>

                <div>
                    <div className="label-class">
                        ImgUrl :
                    </div>
                    <textarea className="text8-class" onChange={handleChange} value={obj.imageUrl} name="imageUrl" />
                </div>
            </div>
            <div >
                <button className="create-class" onClick={updateFn}>Update</button>
            </div>
        </div>
    )
}