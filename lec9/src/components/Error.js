import { useRouteError } from "react-router-dom";

const Error = () =>{
    const err = useRouteError();
    console.log(err);
    return(
        <div>
            <h1>opps??</h1>
            <h2> Something Went Wrong...</h2>
            <h4>{err.status}!!!!!</h4>
        </div>
    )
}

export default Error;