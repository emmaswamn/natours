import UpdatePass from "./UpdatePass";
import UpdateSetting from "./UpdateSetting";

const AccountContent = () => {
    return (
        <div className='user-view__content'>
            <div className="user-view__form-container">
                <UpdateSetting />
            </div>
            <div className="line"></div>
            <div className="user-view__form-container">
                <UpdatePass />
            </div>
        </div>
    )
};

export default AccountContent;