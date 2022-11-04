import { FaStripe } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from 'react-redux';
import { getTotalPrice, bookTour } from '../../features/booking/bookSlice';
import { useState } from 'react';
import { controlAlert} from '../../features/alert/alertSlice';
import { useParams } from 'react-router-dom';


const Booking = () => {
    const dispatch = useDispatch();
    dispatch(getTotalPrice());
    
    const {price} = useSelector((store) => store.book);

    const [method, setMethod] = useState('');

    const { tourId } = useParams();


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!method) {
            dispatch(controlAlert({type: 'error', message: 'Please choose one method at least!'}));
            return;
        }
        if(method === 'stripe') {
            console.log('in');
            dispatch(bookTour(tourId));
        }
    };
    
    return (
        <>
            <main className='main'>
                <div className="user-view">
                    <div className="user-view__content">
                        <div className="user-view__form-container">
                            <form onSubmit={handleSubmit}>
                                <h2 className="heading-secondary ma-bt-md">Payment Method</h2>
                                <div className='method-container'>
                                    <input type='radio' id='stripe'name='how' value='stripe' onClick={(e) => setMethod(e.target.value)}/>
                                    <label className='input-radio' htmlFor='stripe'>
                                        <IconContext.Provider value={{ color: "rgb(99, 91, 255)", className: "global-class-name" }}>
                                            <span>
                                                <FaStripe />
                                            </span>
                                        </IconContext.Provider>
                                        Stripe
                                    </label>
                                </div>
                                <button className="btn btn--small btn--green">Complete checkout</button>
                            </form>
                        </div>
                    </div>
                    <nav className="user-view__menu">
                        <div className="book__summary-container">
                            <h2 className='book__heading'>Summary</h2>
                            <div className='book__price'>
                                <span>Original price:</span>
                                <span>${price}</span>
                            </div>
                            <div className="line-price">&nbsp;</div>
                            <div className='book__price'>
                                <span>Total:</span>
                                <span>${price}</span>
                            </div>
                        </div>
                    </nav>
                </div>
            </main>
        </>
    )    
};

export default Booking;