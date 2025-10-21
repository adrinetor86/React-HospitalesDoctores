import React, {Component} from 'react';
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import Home from "./home/Home";
import MenuHospitales from "./menuhospitales/MenuHospitales";
import NotFound from "./notfound/NotFound";
import Footer from "./footer/Footer";
import Doctores from "./doctores/Doctores";
import DetallesDoctor from "./detallesdoctor/DetallesDoctor";
import CreateHospital from "./createhospital/CreateHospital";

class Router extends Component {


    render() {

        function DoctoresElement(){
            let{idhospital}=useParams()

            return(<Doctores idhospital={idhospital}/>)
        }
        function DetallesElement(){
            let{iddoctor}=useParams()

            return(<DetallesDoctor iddoctor={iddoctor}/>)
        }

        return (
            <BrowserRouter>
                <MenuHospitales/>

                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/doctores/:idhospital" element={<DoctoresElement/>}/>
                    <Route path="/detalles/:iddoctor" element={<DetallesElement/>}/>
                    <Route path="/create" element={<CreateHospital/>}/>
                    <Route path="*" element={<NotFound/>} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default Router;