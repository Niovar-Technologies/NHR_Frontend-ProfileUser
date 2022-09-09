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
        <div className="container">
    <div className="main-body">
    
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item"><a href="#">User</a></li>
              <li className="breadcrumb-item active" aria-current="page">User Profile</li>
            </ol>
          </nav>
    
          

        </div>
    </div>    
       </>
    );
}

export default ProfileUser;