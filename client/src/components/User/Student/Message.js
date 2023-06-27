
import { useRef, useState } from "react"
import Card from "../../UI/Card"
import "./Message.css"
import Button from "../../UI/Button"
const Message = props =>{
    const user = JSON.parse(localStorage.getItem("user"))
    const teacherData = JSON.parse(localStorage.getItem("teacherData"))
    teacherData.unshift({code : "Choose Code"})
    const [enteredMessage , setEnteredMessage] = useState("")
    const [enteredTitle , setTitle] = useState("")
    const enteredMessageRef = useRef()
    const titleRef = useRef()
    const messageHandler = e =>{
        setEnteredMessage(enteredMessageRef.current.value)
    }
    const titleHandler = e =>{
        setTitle(titleRef.current.value)
    }
   
    const contactFormSubmit = e =>{
        e.preventDefault()
        const code = JSON.parse(e.target.code.value)
        if(code.code ===  "Choose Code"){
            return
        }
        const fullName =  `${user.firstName} ${user.lastName}`
        const email = user.email

        const body = {
            teacherFullName : code.fullName,
            schoolClass : code.schoolClass,
            school : code.school,
            classCode : code.code,
            studentName : fullName,
            studentEmail : email,
            teacherEmail : code.email,
            message : enteredMessage,
            title : enteredTitle

        }
        console.log(body);


        // fetch("http://localhost:4000/api/user/message",{
                fetch("https://eschool-pw0m.onrender.com/api/user/message", {


            method :"POST",
            mode : "cors",
            body : JSON.stringify(body),
            headers : {"Content-Type" : "application/json"}
        })
        .then(resolve =>resolve.json())
        .then(data => {
            console.log(data);
        })
        setEnteredMessage("")
        setTitle("")

    }
    // console.log(enetredTeacherInfo);
    return(
        <Card className="card">

        <form onSubmit={contactFormSubmit}>      
        <input value={`${user.firstName} ${user.lastName}`} disabled={true} name="name" type="text" class="feedback-input" placeholder="Name" />   
        <input name="email" value={user.email} disabled={true} type="email" class="feedback-input" placeholder="Email" />
       <select name="code"  class="feedback-input" >
        {teacherData ? teacherData.map(options =>{
            return <option value={JSON.stringify(options)}>
                {options.code}
            </option>
        }) : null
    }
       </select>
    <input name="title" value={enteredTitle} type="text" class="feedback-input" placeholder="title" onChange={titleHandler} ref={titleRef} />
        <textarea name="text" value={enteredMessage} maxLength={200} ref={enteredMessageRef} onChange={messageHandler} class="feedback-input" placeholder="Enter message"></textarea>
        <p>{enteredMessage.length} / 200</p>
        <Button>Send Message</Button>
      </form>
        </Card>
    )
}

export default Message