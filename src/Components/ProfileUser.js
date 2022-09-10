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
<div className="col-md-12">  
    <div className="col-md-4">      
        <div className="portlet light profile-sidebar-portlet bordered">
            <div className="profile-userpic">
                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="img-responsive" alt=""/> </div>
            <div className="profile-usertitle">
                <div className="profile-usertitle-name"> Marcus Doe </div>
                <div className="profile-usertitle-job"> Developer </div>
            </div>
            <div className="profile-userbuttons">
                <button type="button" className="btn btn-info  btn-sm">Follow</button>
                <button type="button" className="btn btn-info  btn-sm">Message</button>
            </div>
            <div className="profile-usermenu">
                <ul className="nav">
                    <li className="active">
                        <a href="#">
                            <i className="icon-home"></i> Ticket List </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="icon-settings"></i> Support Staff </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="icon-info"></i> Configurations </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div className="col-md-8"> 
        <div className="portlet light bordered">
            <div className="portlet-title tabbable-line">
                <div className="caption caption-md">
                    <i className="icon-globe theme-font hide"></i>
                    <span className="caption-subject font-blue-madison bold uppercase">Your info</span>
                </div>
            </div>
            <div className="portlet-body">
                <div>
                
                    <!-- Nav tabs -->
                    <ul className="nav nav-tabs" role="tablist">
                        <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Update</a></li>
                        <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
                        <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
                        <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
                    </ul>
                
                    <!-- Tab panes -->
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id="home">
                            <form>
                              <div className="form-group">
                                <label for="inputName">Name</label>
                                <input type="text" className="form-control" id="inputName" placeholder="Name">
                              </div>
                                <div className="form-group">
                                <label for="inputLastName">Last Name</label>
                                <input type="text" className="form-control" id="inputLastName" placeholder="Last Name">
                              </div>
                              <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email">
                              </div>
                              <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password">
                              </div>
                              <div className="form-group">
                                <label for="exampleInputFile">File input</label>
                                <input type="file" id="exampleInputFile">
                                <p className="help-block">Example block-level help text here.</p>
                              </div>
                              <div className="checkbox">
                                <label>
                                  <input type="checkbox"> Check me out
                                </label>
                              </div>
                              <button type="submit" className="btn btn-default">Submit</button>
                            </form>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="profile">Profile</div>
                        <div role="tabpanel" className="tab-pane" id="messages">Messages</div>
                        <div role="tabpanel" className="tab-pane" id="settings">Settings</div>
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