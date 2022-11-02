import UserMenu from "./account/UserMenu";
import AccountContent from './account/AccountContent'

const Me = () => {
    
    return (
        <main className='main'>
            <div className="user-view">
                <UserMenu />
                <AccountContent />
            </div>
        </main>
    )
};




export default Me;