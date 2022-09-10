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

           <div className="container-xl px-4 mt-4">

    <nav className="nav nav-borders">
        <a className="nav-link active ms-0" href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details" target="__blank">Profile</a>
        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-billing-page" target="__blank">Billing</a>
        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-security-page" target="__blank">Security</a>
        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-edit-notifications-page"  target="__blank">Notifications</a>
    </nav>
    <hr className="mt-0 mb-4">
    <div className="row">
        <div className="col-xl-4">
         
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                    
                    <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                    
                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                 
                    <button className="btn btn-primary" type="button">Upload new image</button>
                </div>
            </div>
        </div>
        <div className="col-xl-8">
           
            <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                    <form>
                        
                        <div className="mb-3">
                            <label className="small mb-1" for="inputUsername">Username (how your name will appear to other users on the site)</label>
                            <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="username">
                        </div>
                        
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputFirstName">First name</label>
                                <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Valerie">
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputLastName">Last name</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna">
                            </div>
                        </div>
                       
                        <div className="row gx-3 mb-3">
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputOrgName">Organization name</label>
                                <input className="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value="Start Bootstrap">
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputLocation">Location</label>
                                <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="San Francisco, CA">
                            </div>
                        </div>
                      
                        <div className="mb-3">
                            <label className="small mb-1" for="inputEmailAddress">Email address</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="name@example.com">
                        </div>
                        
                        <div className="row gx-3 mb-3">
                        
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputPhone">Phone number</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567">
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputBirthday">Birthday</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="06/10/1988">
                            </div>
                        </div>
                      
                        <button className="btn btn-primary" type="button">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
       </>
    );
}

export default ProfileUser;