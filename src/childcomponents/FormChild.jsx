import {Link} from "react-router-dom";
import {useRef} from "react";

export const FormChild = ({parameters, inputs}) => {
    const email = useRef(null);
    const password = useRef(null);

    function execute() {
        const array = formControlValuesToArray();
        parameters.event(...array);
    }

    const formControlValuesToArray = () => {
        const array = [];
        const formControlValues = document.getElementsByClassName("myform");
        for (let i = 0; i < formControlValues.length; i++) {
            console.log(formControlValues[i].value)
            array.push(formControlValues[i].value)
        }
        return array
    }

    return (<div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-6 col-xl-6 px-lg-6 my-5 align-self-center">

            <h1 className="display-4 text-center mb-3">
                {parameters.title}
            </h1>

            <p className="text-muted text-center mb-5">
                {parameters.subtitle}
            </p>

            <form>
                {inputs.map((input, index) => {
                        return (
                            <div key={index} className="form-group">
                                <label>{input.label}</label>
                                <input ref={email} type={input.type} placeholder={input.placeholder} name={input.name}
                                       className={input.className} defaultValue={input.value}/>
                            </div>
                        )
                    }
                )}
                <button type={"button"} onClick={execute} className="btn btn-lg w-100 btn-primary mb-3">
                    {parameters.button.value}
                </button>
                {parameters.bottomLink === true && <div className="text-center">
                    <small className="text-muted text-center">
                        Vous n'avez pas encore de compte ? <Link to={parameters.signupUrl}>S'inscrire</Link>.
                    </small>
                </div>}


            </form>

        </div>
        <div className="col-12 col-md-5 col-lg-6 col-xl-6 d-none d-lg-block">
            <div className="bg-cover h-100 min-vh-100 mt-n1 me-n3"
                 style={{backgroundImage: `url(${parameters.imageUrl})`,backgroundSize:'cover',backgroundPosition:'center'}}></div>
        </div>
    </div>)
}