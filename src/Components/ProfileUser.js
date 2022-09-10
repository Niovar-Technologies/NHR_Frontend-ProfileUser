import React, { useContext, createContext, state, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import LoginLayout from "../Containers/LoginLayout";
import logo from '../static/img/logobig.jpeg'
import profile from '../static/img/profile.css'
// import nopic from '../static/img/nopic.png';
import {AlertCircle, Check} from 'react-feather';
// import saveHistory from './SaveHistory';
	
import {ChevronDown, Edit, Grid, List, Plus} from "react-feather";


import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

let role = cookies.get( "role" );
let emailToken  = cookies.get( "emailToken" );
let appdomain 	= "https://niovarpaie.ca"; // app domainn
let lbdomain 	= "https://loadbalancer.niovarpaie.ca"; // load balancer domain
let compagnie 	= cookies.get( "compagnie" );


const ProfileUser = () => {
const history = useHistory();

	const [nomEntreprise, setNomEntreprise]= useState(''); //	
	const [texte, setTexte]= useState('Un instant ...'); //	
	const [title, setTitle]= useState('...'); //	
	const [btnText, setBtnText]= useState('Btn'); //
	const [btnLink, setBtnLink]= useState(''); //
	const [verified, setVerified]= useState(''); //
	
	
	const handleClick = (e) => {
		e.preventDefault();
		location.replace( btnLink );
	}

	// get current url
	let code = ( cookies.get( 'code_entreprise' ) ) ? cookies.get( 'code_entreprise' ) : "2020"; //

	// init some var
	
	useEffect(() => {
	 	GetNomEntreprise();
	},[] );
	
	useEffect(() => {
		mailVerification();
	
	}, []);
	
	// get company name
	async function GetNomEntreprise(){

		try {
			let res = await fetch( lbdomain + "/NiovarRH/EntrepriseMicroservices/Entreprise/nomEntreprise/" + code, {
				method: "GET",
				headers: {'Content-Type': 'application/json'},
			});
			
			let resJson = await res.json();
			if( res.status === 200 ) {
				setNomEntreprise(resJson.entreprise_nom);
			}
			else {
				alert( "Un probleme est survenu" );
				// setErrorColor( "red" );
				// setErrorMessage( "Erreur de connexion. Reessayer plus tard" );
			}
		} 
		catch (err) {
			//alert( "Vérifiez votre connexion internet svp" );
			console.log(err);
		};
	}
	
	// Mail token vérification
	async function mailVerification(){
		let title = "Vérification d'email";
		let texte = "La vérification a échouée.";
		let btnText = "Créer un compte";
		let btnLink = appdomain + "/creation_de_compte-code_entreprise";
		let verified = false;
		if(	emailToken ){

			try {
				let res = await fetch( lbdomain + "/Accounts/verify-email", {
					method: "POST",
					body: JSON.stringify({
						token: emailToken,
					}),
					headers: {'Content-Type': 'application/json'},
				});
			
				let resJson = await res.json();
			
				if( resJson.message === true ){
					title 	= "Bienvenue sur Niovar Paie";
					texte 	= "Votre adresse email a bien été vérifiée. Si vous n'êtes pas un employé de la compagnie " + compagnie + ", veuillez nous contacter.";
					btnText = "Visiter votre profile";
					btnLink = appdomain + "/connexion";
					verified = true;
				}
			} 
			catch (err) {
				alert( "Vérifiez votre connexion internet svp" );
				console.log(err);
			};
		}
		setTexte( texte );
		setTitle( title );
		setBtnText( btnText );
		setBtnLink( btnLink );
		setVerified( verified );
	}

	
			
    return (
       <>

            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="row">
                        <div className="col-xl-12 col-sm-12 col-12">
                            <div className="breadcrumb-path">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a onClick={() => {
                                        window.location.href = "/"
                                    }}>Accueil</a>
                                    </li>
                                    <li id="breadcrumbTitle" className="breadcrumb-item active">{ title }</li>
                                </ul>
                                <h3>{h3text}</h3>
                            </div>
                        </div>
                    </div>
					<div className="row">
                        <div className="col-xl-12 col-sm-12 col-12 mb-4">
                            <div className="row">
                                <div className="col-sm-12 col-12 d-flex">
                                    <div className="card flex-fill">
										
										
										<div>
				<div>
					<div className="card-header" data-toggle="dropdown" style={{"height": "65px", "width": "100%", "backgroundColor": "#000032",}}>
						<div className="employee-head" style={{"color": "#fff",}}><FileText/>Entreprise { nomEntreprise } -  { texteAnneeEnCours } {anneeCours}<a className="dropdown-toggle nav-link" ></a>
						</div>
					</div> 
					<div className="card-body dropdown-menu" style={{"width" : "100%"}}>
						<div className="employee-contents" ><div className="donut-chart-list charts3"><h5 style={{"width" : "50%"}}>{textNombreEnvoye}: {totalEnvoye}</h5></div><div className="donut-chart-list charts4"><h5>Total à envoyer: {totalAEnvoyer}</h5></div><div className="donut-chart-list charts2"></div> <div className="employee-sets"><a data-debut = "foo" onClick={handleClick} className="btn-addmembers"><Send/> {textBtnEnvoyer}</a></div></div>
					</div>
				</div>
			</div>
										
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
					<div className="row">
						<div className="col-xl-6 col-sm-12 col-12 d-flex">
							<div className="card flex-fill">
								<select className="custom-select" onChange={e => handleSelectAnnee(e.target.value)}>
									<option value={2022}>2022</option>
									<option value={2021}>2021</option>
									<option value={2020}>2020</option>
								</select>
							</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="customize_popup">
                <div className="modal fade" id="edit" data-backdrop="static" data-keyboard="false" tabIndex="-1"
                     aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content ">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Edit Office</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className=" col-md-12 p-0">
                                    <div className=" form-popup">
                                        <label>Office Nom</label>
                                        <input type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-apply">Apply</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </>
    );
}

export default ProfileUser;