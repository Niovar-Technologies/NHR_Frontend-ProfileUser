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
        <a className="nav-link" href="#"  target="__blank">Fichier</a>
    </nav>
    <hr className="mt-0 mb-4" />
    <div className="row">
        <div className="col-xl-4">
         
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">Photo du Profile</div>
                <div className="card-body text-center">
                    
                    <img className="img-account-profile rounded-circle mb-2" src="https://fichiers.niovarpaie.ca/uploads/file-1661999118517.jpg" alt="" />
                    
                    <div className="small font-italic text-muted mb-4">JPG ou PNG de moins de 5 MB</div>
                 
                    <button className="btn btn-primary" type="button">Upload new image</button>
                </div>
            </div>
        </div>
        <div className="col-xl-8">
           
            <div className="card mb-4">
                <div className="card-header">Détails du profile</div>
                <div className="card-body">
                    <form>
                        
                        <div className="mb-3">
                            <label className="small mb-1" for="inputUsername">Nom complet</label>
                            <input className="form-control" id="inputUsername" type="text" placeholder="Votre nom complet" value="" />
                        </div>
                        
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputFirstName">Email</label>
                                <input className="form-control" id="inputFirstName" type="text" placeholder="Votre adresse email" value="" />
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputLastName">Téléphone</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Votre Téléphone" value="" />
                            </div>
                        </div>
                       
                        <div className="row gx-3 mb-3">
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputOrgName">Téléphone domicile</label>
                                <input className="form-control" id="inputOrgName" type="text" placeholder="Téléphone de votre domicile" value="" />
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputLocation">Location</label>
                                <input className="form-control" id="inputLocation" type="text" placeholder="Département" value="" />
                            </div>
                        </div>
                      
                        <div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Poste</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Poste" value="" />
                        </div>
                        
                        <div className="row gx-3 mb-3">
                        
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputPhone">Type de salaire</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Type de salaire" value="" />
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
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Poste" value="" />
                        </div>
						<div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Province</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Poste" value="" />
                        </div>
						<div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Ville</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Poste" value="" />
                        </div>
						<div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputPhone">Mot de passe</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Type de salaire" value="" />
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputBirthday">Mot de passe oublié</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Salaire" value="" />
                            </div>
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