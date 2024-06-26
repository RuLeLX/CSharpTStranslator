import { useEffect,useState } from "react";
import axios from "axios";
import iconfile from '../images/file.png';

export default function WindowFiles({parentGetData, setStateWork, children}: any) {
    
    //Send program text and code leksems to App
    const sendProgra_leksems = (data: any)=>{
        console.log(data)
        parentGetData(data)
    }

    const [list_program, setListProgram]:[string[], any] =  useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5153/Translator/ListFiles")
            .then(res=>setListProgram(res.data))
            .catch(err=>setListProgram(["Server not found"]))

    },[])

    const getTextProgram = (filename: string)=>
        axios.get('http://localhost:5153/Translator/LexAnalys', {
            params: {
                filename: filename
            }
        })
            .then(res=>sendProgra_leksems(res.data))
            .catch(err=>console.log("File not found!"));


    return <div id={"background"} className={"bg-black flex w-full h-3"} style={{}}>
        <div id={"Choice"} className={"bg-white rounded"}>
            {children}
            {list_program.map((filename)=>{
                
                if (filename == "Server not found") 
                    return (
                        <h1>{filename}</h1>
                
                    )
                
                return <div className="flex gap-2 pl-3 hover:bg-gray-200" onClick={()=>{getTextProgram(filename); setStateWork(false)}}>
                    <img src={iconfile} className={'w-5 h-5'}></img>
                    <p className={'h-10 filename'}>{filename}</p>
                </div>})
            }
        </div>
    </div>
    
}