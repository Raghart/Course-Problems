import { useSelector } from "react-redux";

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const style ={
        fontFamily: "Arial",
        color: "#4CAF50",
        padding: "10px",
        border: "1px solid #4CAF50",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }
      return (
        notification && (
            <div style={style}>
                {notification}
            </div>
        )
      )
}

export default Notification