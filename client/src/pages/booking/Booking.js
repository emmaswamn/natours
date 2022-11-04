// 

const Booking = () => {
    return (
        <>
            <main className='main'>
                <div className="user-view">
                    <div className="user-view__content">
                        <div className="user-view__form-container">
                            <h2 className="heading-secondary ma-bt-md">Payment Method</h2>
                        </div>
                    </div>
                    <nav className="user-view__menu">
                        <div className="book__summary-container">
                            <h2 className='book__heading'>Summary</h2>
                            <div className='book__price'>
                                <span>Original price:</span>
                                <span>$19.99</span>
                            </div>
                            <div className="line-price">&nbsp;</div>
                            <div className='book__price'>
                                <span>Total:</span>
                                <span>$19.99</span>
                            </div>
                        </div>
                    </nav>
                </div>
            </main>
        </>
    )    
};

export default Booking;