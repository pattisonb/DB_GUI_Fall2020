import React, { useEffect, useState } from 'react';
import DetailNav from '../layout/DetailNav';
import axios from 'axios';
import { API_URL } from '../../api_url';
import { AreYouSure } from '../layout/AreYouSure';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layout/Loader';
import './CurrentItems.css';
import OkayAlert from '../layout/OkayAlert';

export const CurrentItems = () => {
    const { userId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingItemId, setDeletingItemId] = useState(null);
    const [updateItemId, setUpdateItemId] = useState(null);
    const [okayPopup, setOkayPopup] = useState(false);
    const [okayMessage, setOkayMessage] = useState('');
    const [updateItemImage, setUpdateItemImage] = useState('');
    const [updateItemName, setUpdateItemName] = useState('');
    const [updateItemDetails, setUpdateItemDetails] = useState('');
    const [updateItemPrice, setUpdateItemPrice] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/userItems/${userId}`).then(res => {
            setItems(res.data);
            setLoading(false);
        });
    }, []);

    const handleCancelEdit = e => {
        setUpdateItemId(null);
    };

    const handleOkayClicked = () => {
        setOkayPopup(false);
        setOkayMessage('');
    };

    const handleConfirmEdit = e => {
        //axios call.
        setUpdateItemId(null);
        setUpdateItemImage('');
        setUpdateItemName('');
        setUpdateItemPrice(null);
        setUpdateItemDetails('');
        setOkayPopup(true);
        setOkayMessage('Item Updated!');
    };

    const handleEdit = async itemId => {
        setUpdateItemId(itemId);
        await axios.get(`${API_URL}/item/${itemId}`).then(res => {
            const item = res.data[0];
            setUpdateItemImage(item.ImageURL);
            setUpdateItemName(item.ItemName);
            setUpdateItemPrice(item.ItemCost);
            setUpdateItemDetails(item.ItemDetails);
            setOkayPopup(true);
            setOkayMessage(`Editing item: ${item.ItemName}`);
        });
    };

    const searchResults = () => {
        if (searchQuery) {
            let filtered_products = items.filter(item =>
                item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return filtered_products;
        } else {
            return items;
        }
    };

    const handleDelete = itemId => {
        /*
        /item/:ItemID'
        */
        setDeletingItemId(itemId);
    };

    const deleteItem = confirmed => {
        if (confirmed && deletingItemId) {
            setDeletingItemId(null);
            setOkayPopup(true);
            setOkayMessage('Item deleted!');
        } else {
            setDeletingItemId(null);
        }
    };

    return (
        <>
            {okayPopup && (
                <OkayAlert
                    clicked={click => handleOkayClicked()}
                    message={okayMessage}
                />
            )}
            <div className='container mt-4'>
                {deletingItemId && (
                    <AreYouSure
                        message='Are you sure you want to delete this item?'
                        theyAreSure={response => deleteItem(response)}
                    />
                )}
                <DetailNav />
                <div className='row'>
                    <Link
                        to={`/manageItems/${window.localStorage.getItem('id')}`}
                        style={{ color: 'var(--smu-blue)' }}
                    >
                        <i className={`fas fa-arrow-left fa-2x mr-2`}></i>
                    </Link>
                    <small className='ml-0 p-0'>Back to Manage Items</small>
                    <h2 className='text-center display-4 mb-5 col-11'>
                        Current Items For Sale
                    </h2>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className='d-flex my-5'>
                            <input
                                placeholder='Find An Item by Name...'
                                className='form-control'
                                type='text'
                            />
                            <button
                                onClick={e => {
                                    e.target.previousSibling
                                        ? setSearchQuery(
                                              e.target.previousSibling.value
                                          )
                                        : setSearchQuery('');
                                }}
                                className='mx-4 px-4 btn btn-warning'
                            >
                                <i className='fas fa-search'></i>
                            </button>
                        </div>

                        <ul className='list-group'>
                            {updateItemId
                                ? items
                                      .filter(
                                          item => item.ItemID === updateItemId
                                      )
                                      .map(item => (
                                          <form
                                              className='list-group-item d-flex row'
                                              key={item.itemID}
                                          >
                                              <div className='d-flex flex-column col-5 p-0'>
                                                  <input
                                                      className='h5 p-0 w-100'
                                                      type='text'
                                                      onChange={e =>
                                                          setUpdateItemName(
                                                              e.target.value
                                                          )
                                                      }
                                                      value={updateItemName}
                                                  />
                                                  <img
                                                      style={{
                                                          width: '100px',
                                                          height: '100px',
                                                      }}
                                                      src={updateItemImage}
                                                      alt={updateItemName}
                                                  />
                                                  <h6 className='mt-4'>
                                                      New Image Url:
                                                  </h6>
                                                  <input
                                                      onChange={e =>
                                                          setUpdateItemImage(
                                                              e.target.value
                                                          )
                                                      }
                                                      type='text'
                                                      value={updateItemImage}
                                                  />
                                              </div>
                                              <div className='col-7'>
                                                  $
                                                  <input
                                                      type='number'
                                                      pattern='(^\d+(\.|\,)\d{2}$)'
                                                      value={`${updateItemPrice}`}
                                                      onChange={e =>
                                                          setUpdateItemPrice(
                                                              e.target.value
                                                          )
                                                      }
                                                      className='Edit-Price bg-primary rounded text-center'
                                                  />
                                                  <textarea
                                                      value={updateItemDetails}
                                                      onChange={e =>
                                                          setUpdateItemDetails(
                                                              e.target.value
                                                          )
                                                      }
                                                      className='CurrentItems-Description mt-4 h-75 w-100'
                                                  >
                                                      {item.ItemDetails}
                                                  </textarea>
                                              </div>
                                          </form>
                                      ))
                                : searchResults().map(item => {
                                      // filter?
                                      return (
                                          <li
                                              className='list-group-item d-flex row'
                                              key={item.itemID}
                                          >
                                              <div className='d-flex flex-column col-5'>
                                                  <h4>{item.ItemName}</h4>
                                                  <img
                                                      style={{
                                                          width: '100px',
                                                          height: '100px',
                                                      }}
                                                      src={item.ImageURL}
                                                      alt={item.ItemName}
                                                  />
                                              </div>
                                              <div className='col-5'>
                                                  <span className='CurrentItems-Price badge badge-primary p-2'>
                                                      ${item.ItemCost}
                                                  </span>
                                                  <p className='CurrentItems-Description mt-4'>
                                                      {item.ItemDetails}
                                                  </p>
                                              </div>
                                              <div className='col-2 d-flex justify-content-center align-items-center'>
                                                  <button
                                                      onClick={e => {
                                                          handleEdit(
                                                              item.ItemID
                                                          );
                                                      }}
                                                      className='mx-1'
                                                  >
                                                      <i className='mx-2 fas fa-pencil-alt'></i>
                                                  </button>
                                                  <button
                                                      onClick={e => {
                                                          handleDelete(
                                                              item.ItemID
                                                          );
                                                      }}
                                                      className='mx-1'
                                                  >
                                                      <i className='mx-2 fas fa-trash-alt'></i>
                                                  </button>
                                              </div>
                                          </li>
                                      );
                                  })}
                        </ul>
                        {updateItemId && (
                            <div className='mt-3 d-flex justify-content-center align-items-center'>
                                <button
                                    onClick={handleConfirmEdit}
                                    className='mx-2 Confirm-Edit btn'
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className='mx-2 Cancel-Edit btn'
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};
/*
/userItems/:ID
ItemID, ItemName, ItemCost, ItemDetails, ImageURL
*/
