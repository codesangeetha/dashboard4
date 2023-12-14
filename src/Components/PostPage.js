import React from "react";
import { postData } from "../services/fetchfns";
import { useNavigate } from "react-router-dom";
export default function PostPage() {

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


    function handleChange(event) {
        setObj(preVal => {
            return {
                ...preVal,
                [event.target.name]: event.target.value
            }
        });
    }

    function createFn() {
        const url = "http://localhost:8080/api/products";

        const postObj = {
            "name": obj.name,
            "brand": obj.brand,
            "rating": obj.rating,
            "ratingCount": obj.ratingCount,
            "price": obj.price,
            "oldPrice": obj.oldPrice,
            "productType": obj.productType,
            "imageUrl": obj.imageUrl
        };

        postData(url, postObj)
            .then(async data => {
                navigate(`/getpage`);
            });
    }

    React.useEffect(() => {
        console.log(obj);
    }, [])

    return (
        <div>
            <div className="Product-class">
                Product Details
            </div>

            <div>
                <div className="label-class">
                    Name :
                </div>
                <textarea onChange={handleChange} value={obj.name} name="name" className="text1-class" />
            </div>

            <div>
                <div className="label-class">
                    Brand :
                </div>
                <input type="text" onChange={handleChange} value={obj.brand} name="brand" className="text2-class" />
            </div>

            <div>
                <div className="label-class">
                    Rating :
                </div>
                <input type="text" onChange={handleChange} value={obj.rating} name="rating" className="text3-class" />
            </div>

            <div>
                <div className="label-class">
                    RatingCount :
                </div>
                <input type="text" onChange={handleChange} value={obj.ratingCount} name="ratingCount" className="text4-class" />
            </div>

            <div>
                <div className="label-class">
                    Price :
                </div>
                <input type="text" onChange={handleChange} value={obj.price} name="price"
                    className="text5-class" />
            </div>

            <div>
                <div className="label-class">
                    OldPrice :
                </div>
                <input type="text" onChange={handleChange} value={obj.oldPrice} name="oldPrice" className="text6-class" />
            </div>

            <div>
                <div className="label-class">
                    ProductType :
                </div>

                <select id="type" onChange={handleChange} value={obj.productType} name="productType" className="text7-class">
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
                <textarea onChange={handleChange} value={obj.imageUrl} name="imageUrl" className="text8-class" />
            </div>

            <div>
                <button className="create-class" onClick={createFn}>Create</button>
            </div>
        </div>
    )
}