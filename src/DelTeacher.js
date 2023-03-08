import { useEffect, useState } from "react";

let DelTeacher=()=>{
    //1. Hooks area
    const[delTeacher,setDelTeacher]=useState([])
    useEffect(()=>{
        fetch(`http://localhost:1337/api/teachers`)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data.data)
            let newData=data.data.map((cv)=>{
                return{
                    id:cv.id,
                    name:cv.attributes.name,
                }
            })
            setDelTeacher(newData)
        })
        .catch()
    },[])
    //2. Definition area
    let DelRow=(element)=>{
        //1. Hooks area
        let x=element.target.closest('tr')
        let delId=x.querySelector('td:first-child').innerHTML;
        console.log(delId)
        fetch(`http://localhost:1337/api/teachers/${delId}`,{
            method:'DELETE',
        })
        .then(()=>{})
        x.remove()
        //2. Definition area
        //3. Return Statement
        //window.confirm('Do you really want to delete the Row')
        
    }
    
    //3. Return statement
    return(
        <>
            <div className="container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">Surname</label>
                        <input type="text" className="form-control" id="surname" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <br />
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            delTeacher.map((cv,idx)=>{
                                return <tr key={idx}>
                                            <td>{cv.id}</td>
                                            <td>{cv.name}</td>
                                            <td>
                                                <button className="btn btn-primary btn-sm">View</button>
                                                <button className="btn btn-warning btn-sm">Edit</button>
                                                <button className="btn btn-danger btn-sm" onClick={(e)=>{DelRow(e)}}>Delete</button>
                                            </td>
                                        </tr>
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
            


        </>
    )
}
export default DelTeacher;