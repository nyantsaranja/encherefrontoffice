export const Pagination = ({page,event,criteria}) => {
    function exec(index) {
        event(index)
    }
    return (
        <>
            <div className="w-100" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div className="btn-group btn-group-lg me-2 mb-3" role="group" aria-label="First group">
                    {[...Array(page)].map((e, i) =>
                         <button onClick={()=>{exec(i)}} key={i} type="button" className="btn btn-outline-primary" fdprocessedid="8auf2">{i+1}</button>
                    )}
                </div>
            </div>
        </>
    );
}