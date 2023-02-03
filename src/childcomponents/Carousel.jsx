export const Carousel = ({galeries}) => {
    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" style={{maxWidth:"700px",margin:"0 auto"}}>
                    {galeries && galeries.map((galerie, index) =>
                        <div className={index===0 ? "carousel-item active":"carousel-item"} key={index} >
                            <img style={{width:"100%"}} src={"data:image/jpeg;base64,"+galerie.bytes} className="d-block w-100 carouselImage"
                                 alt="..."/>
                        </div>
                    )
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                        data-bs-slide="prev">
                    <span style={{color:"white",backgroundColor:"black"}} className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                        data-bs-slide="next">
                    <span style={{color:"white",backgroundColor:"black"}} className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </>
    );
}