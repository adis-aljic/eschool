import Button from "../UI/Button"
import Card from "../UI/Card"
import classes from "./404.module.css"
import { useContext } from "react"
import AuthContex from "../../store/Auth-ctx"


const SomethingWentWrong = props =>{
const ctx = useContext(AuthContex)
return (
<Card className={classes.PageNotFound}>
    <h1>Something went wrong !!! </h1>
    <p>We recieved error log and we will fix it shrotly ...</p>
    <p>Please click on button to return to home page or reload page</p>

    <Button onClick={ctx.PageNotFoundHandler}>Return to home page</Button>
</Card>

)
}

export default SomethingWentWrong