import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import DetailNav from '../layout/DetailNav';
import axios from 'axios';
import { API_URL } from '../../api_url';

const SellItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemCost, setItemCost] = useState(0);
    const [itemDetails, setItemDetails] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [posted, setPosted] = useState(false);

    const handleItemName = e => {
        setItemName(e.target.value);
    };

    const handleItemCost = e => {
        setItemCost(e.target.value);
    };

    const handleItemDetails = e => {
        setItemDetails(e.target.value);
    };

    const handleImageUrl = e => {
        setImageUrl(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`${API_URL}/addItem`, {
                SellerID: window.localStorage.getItem('id'),
                ItemName: itemName,
                ItemCost: itemCost,
                ItemDetails: itemDetails,
                ImageURL: imageUrl,
            })
            .then(res => {
                alert('Posted item successfully!');
                setPosted(true);
            })
            .catch(err => console.log('here is the error', err));
    };

    return posted ? (
        <Redirect to='/home' />
    ) : (
        <div className='container mt-4'>
            <DetailNav />
            <form>
                <div className='form-group d-flex flex-column'>
                    <label className='mx-auto h3' htmlFor='itemName'>
                        Item You are Selling:
                    </label>
                    <input
                        onChange={handleItemName}
                        value={itemName}
                        className='form-control w-75 mx-auto text-center'
                        type='text'
                        name='itemName'
                        id='itemName'
                    />
                </div>
                <div className='form-group d-flex flex-column'>
                    <label className='mx-auto h3' htmlFor='itemName'>
                        Item Cost:
                    </label>
                    <input
                        onChange={handleItemCost}
                        className='form-control w-75 mx-auto text-center'
                        type='number'
                        value={itemCost}
                        pattern='(^\d+(\.|\,)\d{2}$)'
                        name='itemCost'
                        id='itemCost'
                    />
                </div>
                <div className='form-group d-flex flex-column'>
                    <textarea
                        onChange={handleItemDetails}
                        value={itemDetails}
                        className='form-control w-75 mx-auto'
                        name='itemDetails'
                        id='itemDetails'
                        rows='4'
                    ></textarea>
                </div>
                <div className='form-group d-flex flex-column'>
                    <label className='mx-auto h3' htmlFor='imageUrl'>
                        Enter image Url
                    </label>
                    <input
                        onChange={handleImageUrl}
                        value={imageUrl}
                        className='mx-auto form-control w-75'
                        type='text'
                        name='imageUrl'
                        id='imageUrl'
                    />
                </div>
                {imageUrl && (
                    <div className='text-center mb-4'>
                        <h4>How Your image will display:</h4>
                        <img
                            width='100px'
                            height='100px'
                            src={`${imageUrl}`}
                            alt='Product Image'
                        />
                    </div>
                )}

                <button
                    className='btn btn-warning btn-block w-50 mx-auto'
                    onClick={handleSubmit}
                    type='submit'
                >
                    Post Item!
                </button>
                {/* <input type='file' name='imageUrl' id='imageUrl' /> */}
            </form>
        </div>
    );
};

export default SellItem;

/*
Integrate image selector perhaps...
app.post('/addItem', (req, res) => {
    connection.query(
        'INSERT INTO Items (SellerID, ItemName, ItemCost, ItemDetails, ImageURL) VALUES (?, ?, ?, ?, ?)',
        [
            req.body.SellerID,
            req.body.ItemName, // user input
            req.body.ItemCost, // user input
            req.body.ItemDetails, // user input
            req.body.ImageURL, // user input
        ],

        lsywh4ql
        https://api.cloudinary.com/v1_1/${cloudName}/upload
        duk1gvgwx

        











const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const files = document.querySelector("[type=file]").files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    formData.append("file", file);
    formData.append("upload_preset", "docs_upload_example_us_preset");

    fetch(url, {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        document.getElementById("data").innerHTML += data;
      });
  }
});


*/
