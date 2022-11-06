import {getMyBookings } from '../../features/booking/bookSlice'
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const MyBook = () => {
    const {userId} = useSelector((store) => store.user);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyBookings(userId));
 
    },[])


    const {mybookings} = useSelector((store) => store.book);
    // console.log(mybookings);

    if(mybookings) {
        return (
            <>
                <main className="main">
                    <div className='content'>
                        <h5>tour name</h5>
                        <h5>price</h5>
                        <h5>created date</h5>
                        <span></span>
                    </div>
                    <hr />
                    {mybookings.map((booking) => {
                        return <BookItem booking={booking} key={booking._id}/>
                    })}
                </main>
            </>
        )
    }

};

const BookItem = ({booking}) => {
    const options = {month: 'short', year: 'numeric', day:'numeric'};
    const date = new Date(booking.createdAt)
    const formDate = Intl.DateTimeFormat('en-us',options).format(date);

    return (
        <div className='wrapper'>
            <h5 className='name'>{booking.tour.name}</h5>
            <h5 className='price'>${booking.price}</h5>
            <h5 className='time'>{formDate}</h5>
            <Link to={`/tour/${booking.tour._id}`}>Details</Link>
        </div>
    )
}

export default MyBook;