import {useRef} from "react";

export const Outbit = ({event}) => {
    const montant = useRef(null);
    const exec = () => {
      event(montant.current.value)
    }
    return (
        <>
            <div className="card">
                <div className="card-body" style={{display: "flex", justifyContent: "center"}}>
                    <div className="form-group"
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <label htmlFor="exampleInputEmail1" className="form-label">Renchérir: </label>
                        <input ref={montant} style={{marginLeft: "10px"}} type="number" min={1} className="form-control"
                               id="exampleInputEmail1"
                               placeholder="Montant" fdprocessedid="lzg8uw"/>
                    </div>
                    <button onClick={exec} style={{marginLeft: "10px"}} type="submit" className="btn btn-primary"
                            fdprocessedid="fm6g8">Valider
                    </button>
                </div>
            </div>
        </>
    );
}