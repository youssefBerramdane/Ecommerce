const Categorie =(props)=>{
    return <div className="col-lg-4 col-md-6 pb-1">
    <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
        
        <a href="" className="cat-img position-relative overflow-hidden mb-3">
            <img className="img-fluid" src={`data:image/jpeg;base64,${props.Categorie.image}`} alt="" style={{height:"216px"}}/>
        </a>
        <h5 className="font-weight-semi-bold m-0">{props.Categorie.name}</h5>
    </div>
</div>
}
export default Categorie