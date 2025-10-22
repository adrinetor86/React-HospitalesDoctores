import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import {Navigate} from "react-router-dom";

class CreateHospital extends Component {

    state={
        mensaje:"",
        status:false
    }
    url=Global.apiHospitales;

    cajaId=React.createRef();
    cajaNombre=React.createRef();
    cajaDireccion=React.createRef();
    cajaTelefono=React.createRef();
    cajaCamas=React.createRef();

    insertHospital=(event)=>{
        event.preventDefault();
        let request="webresources/hospitales/post"
        //DEBEMOS RESPETAR LOS TIPOS DE DATO


        //EL OBJETO JSON DE REACT DEBE RESPETAR MAYUSCULAS/MINUSCULAS
        //Y EL NOMBRE DE LAS PROPIEDADES IGUAL QUE EL SERVICIO

        let hospital={
            idhospital:parseInt(this.cajaId.current.value),
            nombre:this.cajaNombre.current.value,
            direccion:this.cajaDireccion.current.value,
            telefono:this.cajaTelefono.current.value,
            camas:parseInt(this.cajaId.current.value)
        }

        axios.post(this.url+request,hospital).then(response => {
            this.setState({
                mensaje:"HOSPITAL insertado"+ hospital.nombre,
                status:true
            });

            console.log("---HOSPITAL CREADO---");
        })
    }
    render() {
        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light bg-gradient">
                {
                    this.state.status === true &&
                    <Navigate to="/hospitales"/>
                }

                <div className="card shadow-lg p-4" style={{maxWidth: '420px', width: '100%'}}>
                    <h1 className="text-center mb-4 text-primary fw-bold">Crear Hospital</h1>
                    <h3 className="text-center" style={{color:"#0d6efd"}}>
                        {this.state.mensaje}
                    </h3>
                    <form onSubmit={this.insertHospital} autoComplete="off">
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control rounded-pill" id="floatingId" required ref={this.cajaId} placeholder="ID"/>
                            <label htmlFor="floatingId">ID</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-pill" id="floatingNombre" required ref={this.cajaNombre} placeholder="Nombre"/>
                            <label htmlFor="floatingNombre">Nombre</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-pill" id="floatingDireccion" required ref={this.cajaDireccion} placeholder="Dirección"/>
                            <label htmlFor="floatingDireccion">Dirección</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-pill" id="floatingTelefono" required ref={this.cajaTelefono} placeholder="Teléfono"/>
                            <label htmlFor="floatingTelefono">Teléfono</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="number" className="form-control rounded-pill" id="floatingCamas" required ref={this.cajaCamas} placeholder="Nº Camas"/>
                            <label htmlFor="floatingCamas">Nº Camas</label>
                        </div>
                        <button className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm" type="submit">
                            Crear Hospital
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateHospital;