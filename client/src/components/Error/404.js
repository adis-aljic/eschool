import Button from "../UI/Button"
import Card from "../UI/Card"
import classes from "./404.module.css"
import { useContext } from "react"
import AuthContex from "../../store/Auth-ctx"


const PageNotFound = props =>{
const ctx = useContext(AuthContex)
return (
<Card className={classes.PageNotFound}>
    <h1>404 Page not found</h1>
    <p>Please click on button to return to home page!!</p>

    <Button onClick={ctx.pageNotFoundHandler}>Return to home page</Button>
</Card>

)
}

export default PageNotFound