import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import classes from "./ListNews.module.css"
const ListNews = props =>{
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(user);
    const [data, setData] = useState([])
    useEffect(()=>{

        fetch("http://localhost:4000/api/news/list",{
          // fetch("https://teacher-aid.onrender.com/api/news/list", {

        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          userId: `${user.id}`,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(resolve => resolve.json())
    .then(data =>
        {

            setData(data)
            // console.log(data)
        } 
            )
            
},[user.id])
return(
  
       
            <ul className={classes.listNewsProfile}>
            {data.length>0
          ? data.map((news) => (
                <li key={news.id} >
                <Card className={classes.listNews}>
      <Card.Body>
        <Card.Title >{news.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
        <div>

<p>Author :{news.user[0].firstName} {news.user[0].lastName}</p>
<p>School : { news.school}</p>
<p>Class : { news.schoolClass} - { news.departmant}</p>
</div>  

        </Card.Subtitle>
        <Card.Text className={classes.text}>
        {news.text}
        <br></br>
        
        </Card.Text>
      {  news.url ? <Card.Link download={true} target="_blank" href={news.url}>Download</Card.Link> : null}
      </Card.Body>
    </Card>
       

                </li>
                  
                
                  ))
                  : <h1>No news ...</h1> }            
                  </ul>

)
}

export default ListNews;