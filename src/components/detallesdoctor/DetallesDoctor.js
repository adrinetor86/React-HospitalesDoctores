import React, {Component} from 'react';
import axios from 'axios';
import Global from "../Global";
import {NavLink} from "react-router-dom";
class DetallesDoctor extends Component {

    state={
        doctor:null,
    }
    url=Global.apiDoctores
    cargarDatos=()=>{

        let request="/api/Doctores/"+this.props.iddoctor

        axios.get(this.url+request).then((response) => {

            console.log("--LEYENDO DATOS--")

            this.setState(
                {doctor:response.data
                });
        })
    }

    componentDidMount() {
        this.cargarDatos()
    }

    componentDidUpdate(oldProps) {

        if(oldProps.iddoctor !== this.props.iddoctor){
            this.cargarDatos()
        }
    }


    render() {
        return (
            <div className="min-vh-100 bg-light bg-gradient">

                {
                    this.state.doctor &&

                        <div className="table-responsive">
                            <table className="table table-bordered table-hover mt-5 align-middle shadow w-50 mx-auto">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="text-center bg-info" colSpan="2">Datos de {this.state.doctor.apellido} </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-danger bg-gradient text-white">
                                        <td className="text-center fw-bold">ID</td>
                                        <td className="text-center fw-bold">{this.state.doctor.idDoctor}</td>
                                    </tr>
                                    <tr className="bg-danger bg-gradient text-white">
                                        <td className="text-center fw-bold">Doctor</td>
                                        <td className="text-center fw-bold">{this.state.doctor.apellido}</td>
                                    </tr>
                                    <tr className="bg-danger bg-gradient text-white">
                                        <td className="text-center fw-bold">Especialidad</td>
                                        <td className="text-center fw-bold">{this.state.doctor.especialidad}</td>
                                    </tr>
                                    <tr className="bg-danger bg-gradient text-white">
                                        <td className="text-center fw-bold">Salario</td>
                                        <td className="text-center fw-bold">{this.state.doctor.salario}</td>
                                    </tr>
                                </tbody>
                            </table>


                            <button className="btn btn-info shadow rounded px-3 mx-auto py-1 d-flex align-items-center gap-2">
                                <NavLink to={"/doctores/"+this.state.doctor.idHospital} className="text-white text-decoration-none w-100 h-100">
                                    Volver A los medicos
                                </NavLink>
                            </button>

                    </div>
                }
            </div>
        );
    }
}

export default DetallesDoctor;