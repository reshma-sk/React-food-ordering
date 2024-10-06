import { useRouteError } from "react-router-dom";
const Error = ()=>{
    const err = useRouteError()
    return(
        <div>
            <h1>Oops!</h1>
            <h3>something went wrong</h3>
            <h2>{err.status}:{err.data}</h2>
        </div>
    )
}
export default Error;