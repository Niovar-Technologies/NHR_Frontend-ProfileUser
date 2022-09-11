import React, { useContext, createContext, state, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import LoginLayout from "../Containers/LoginLayout";
import logo from '../static/img/logobig.jpeg'
import profile from '../static/css/profile.css'
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
                                    <li id="breadcrumbTitle" className="breadcrumb-item active">Mon profile</li>
                                </ul>
                                <h3>Profile</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-sm-12 col-12">
						
           <div className="container-xl px-4 mt-4">

    <nav className="nav nav-borders">
        <a className="nav-link active ms-0" href="#" target="__blank">Profile</a>
        <a className="nav-link" href="#" target="__blank">Activité récente</a>
        <a className="nav-link" href="#" target="__blank">Performance</a>
        <a className="nav-link" href="#"  target="__blank">Dcuments</a>
    </nav>
    <hr className="mt-0 mb-4" />
    <div className="row">
        <div className="col-xl-4">
         
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">Photo du Profile</div>
                <div className="card-body text-center">
                    
                    <img className="img-account-profile rounded-circle mb-2" src="https://fichiers.niovarpaie.ca/uploads/file-1661999118517.jpg" alt="" />
                    
                    <div className="small font-italic text-muted mb-4">JPG ou PNG de moins de 5 MB</div>
                 
                    <button className="btn btn-primary" type="button">Changer l'image</button>
                </div>
            </div>
        </div>
        <div className="col-xl-8">
           
            <div className="card mb-4">
                <div className="card-header">Détails du profile</div>
                <div className="card-body">
                    <form>
                       <div className="row gx-3 mb-3">
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputOrgName">Nom complet</label>
                                <input className="form-control" id="inputOrgName" type="text" placeholder="Votre nom complet" value="" />
                            </div>
                           <div className="col-md-6">
                                <label className="small mb-1" for="inputLastName">Email</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Votre adresse courriel" value="" />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputOrgName">Téléphone </label>
                                <input className="form-control" id="inputOrgName" type="text" placeholder="Votre Téléphone" value="" />
                            </div>
                           <div className="col-md-6">
                                <label className="small mb-1" for="inputLastName">Téléphone domicile</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Téléphone du domicile" value="" />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
							<div className="col-md-6">
                                <label className="small mb-1" for="inputLocation">Département</label>
								<select className="custom-select" onChange={e => handleSelectAnnee(e.target.value)}>
									<option value={2022}>Santé</option>
									<option value={2021}>Transport</option>
									<option value={2020}>Agent Administratif</option>
								</select>
							</div>
                            </div>
							<div className="col-md-6">
                                <label className="small mb-1" for="inputLocation">Poste</label>
                                <select className="custom-select" onChange={e => handleSelectAnnee(e.target.value)}>
									<option value={2022}>Responsable</option>
									<option value={2021}>Chef de </option>
									<option value={2020}>Agent Administratif</option>
								</select>
                            </div>
						</div>
						<div className="row gx-3 mb-3">
							
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputPhone">Type de salaire</label>
                                <select className="custom-select" onChange={e => handleSelectAnnee(e.target.value)}>
									<option value={2022}>Taux horaire</option>
									<option value={2021}>Salaire annuel</option>
								</select>
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputBirthday">Salaire</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Salaire" value="" />
                            </div>
                        </div>
						<div className="row gx-3 mb-3">
                        
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputPhone">Date d'embauche</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Type de salaire" value="" />
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputBirthday">Date de départ</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Salaire" value="" />
                            </div>
                        </div>
						<div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Numéro d'employé</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Poste" value="" />
                        </div>
						<div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Pays</label>
                            <select className="custom-select" onChange={e => handleSelectAnnee(e.target.value)}>
									<option value={2022}>Canada</option>
									<option value={2021}>Etat unis</option>
									<option value={2021}>Etat unis</option>
							</select>
                        </div>
						<div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Province</label>
                            <select className="custom-select" onChange={e => handleSelectAnnee(e.target.value)}>
									<option value={2022}>Canada</option>
									<option value={2021}>Etat unis</option>
									<option value={2021}>Etat unis</option>
							</select>
                        </div>
						<div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Ville</label>
                            <select className="custom-select" onChange={e => handleSelectAnnee(e.target.value)}>
									<option value={2022}>Canada</option>
									<option value={2021}>Etat unis</option>
									<option value={2021}>Etat unis</option>
							</select>
                        </div>
						<div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Jour de disponibilité</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Poste" value="" />
                        </div>
						<div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Statut</label>
                            <select className="custom-select" onChange={e => handleSelectAnnee(e.target.value)}>
									<option value={2022}>Non activé</option>
									<option value={2021}>Activé</option>
							</select>
                        </div>
						<div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputPhone">Mot de passe</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Type de salaire" value="" />
                            </div>
							
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputBirthday">Repeter le mot de passe</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Salaire" value="" />
                            </div>
                        </div>
						<div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Numéro d'employé</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Poste" value="" />
                        </div>

                        <button className="btn btn-primary" type="button">Enregistrer</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

						</div>
					</div>
				</div>
		  </div>
       </>
    );
}

export default ProfileUser;