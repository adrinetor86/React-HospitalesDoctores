import React, {Component} from 'react';
import Global from "../Global";
import axios from "axios";
import {NavLink} from "react-router-dom";
import DetallesDoctor from "../detallesdoctor/DetallesDoctor";

class Doctores extends Component {

    state={
        doctores:null,
        hospital:"",
        medico:-1
    }
    url= Global.apiDoctores
    urlHosp=Global.apiHospitales
    cargarDoctores=()=>{
        let request="api/Doctores/DoctoresHospital/"+this.props.idhospital

        let requestHops="webresources/hospitales/"+this.props.idhospital

        axios.get(this.url+request).then((response)=>{
            console.log("---LEYENDO DOCTORES---")

            this.setState({
                doctores:response.data
            })

        })
        axios.get(this.urlHosp+requestHops).then((response)=>{
            console.log("---LEYENDO Hospital---")

            this.setState({
                hospital:response.data.nombre
            })
        })

    }

    componentDidMount(){
        this.cargarDoctores()
    }

    componentDidUpdate(oldProps) {

        if(oldProps.idhospital !== this.props.idhospital){
            console.log("CAMBIA HOSPITAL")
            this.cargarDoctores()
        }
    }
    cargarMedico=(id)=>{


        this.setState({medico:id})

    }

    render() {
        return (
            <div className="h-auto bg-secondary min-vh-100">


                {
                    this.state.medico !== -1 ?
                        <DetallesDoctor iddoctor={this.state.medico}/>:
                        ""
                }
                <h2 className="align-content-center" style={{color:"lightgreen"}}>
                    Doctores del
                    <i> {this.state.hospital} </i>
                </h2>

                {
                    this.state.doctores &&
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered align-middle">
                            <thead className="table-primary">
                                <tr>
                                    <th className="text-center">Doctor</th>
                                    <th className="text-center">Especialidad</th>
                                    <th className="text-center">Salario</th>
                                    <th className="text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.doctores.map((doctor,index)=>{
                                    return(
                                        <tr key={index} className={index % 2 === 0 ? "bg-success text-white" : "bg-info text-dark"}>
                                            <td className="text-center">{doctor.apellido}</td>
                                            <td className="text-center">{doctor.especialidad}</td>
                                            <td className="text-center">{doctor.salario}</td>
                                            <td className="text-center">
                                                {/*EL PRIMER BOTON CARGA LOS DATOS EN LA MISMA PAGINA*/}
                                                <button onClick={ ()=>{this.cargarMedico(doctor.idDoctor)}}>Ver detalles aqui</button>
                                                <button className="btn btn-info shadow rounded px-3 mx-auto py-1 d-flex align-items-center gap-2">
                                                    <NavLink to={"/detalles/"+doctor.idDoctor} className="text-white text-decoration-none w-100 h-100">
                                                        Ver Detalles
                                                    </NavLink>

                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
}

export default Doctores;