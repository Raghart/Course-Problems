import { Card } from 'react-bootstrap'

const Home = () => {
    return(
        <div>
            <h2 style={{ textAlign: "center", color: "green" }}>Welcome to my first Blog's Page!</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card.Img src="https://icon-library.com/images/blogging-icon/blogging-icon-27.jpg" 
                style={{ width: "400px", height: "400px" }} />
            </div>
            
        </div>
    )
}

export default Home