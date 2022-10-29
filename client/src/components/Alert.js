import { useSelector } from "react-redux";

const Alert = () => {
    const { type, message } = useSelector((store) => store.alert);

    return (
        <div className={`alert alert--${type}`}>{message}</div>
    )
};

export default Alert;


