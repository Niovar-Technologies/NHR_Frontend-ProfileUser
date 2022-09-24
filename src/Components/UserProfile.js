import React, { useMemo, useContext, createContext, state, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import LoginLayout from "../Containers/LoginLayout";
import logo from '../static/img/logobig.jpeg'
import profile from '../static/css/profile.css'
import checkboxStyle from '../static/css/checkboxStyle.css'
import { Users, Lock, Hash, DollarSign, ToggleLeft, Sun, Map, MapPin, Globe, Briefcase, Clipboard, Mail, Phone, Smartphone, AlertCircle, Check, User, Calendar, Trello } from 'react-feather';

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { parseISO } from 'date-fns'

import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

import moment from 'moment';

let appdomain 	= "https://niovarpaie.ca"; // app domainn
let lbdomain 	= "https://loadbalancer.niovarpaie.ca"; // load balancer domain
let compagnie 	= cookies.get( "compagnie" );

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
registerLocale('fr', fr)
	


// Helper: get parametter from url
function getUrlParametter( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}
// Example: getUrlParametter('q', 'hxxp://example.com/?q=abc')


const days = [
	{
		id: 0,
		name: "Dimanche"
	},
	{
		id: 1,
		name: "Lundi"
	},
	{
		id: 2,
		name: "Mardi"
	},
	{
		id: 3,
		name: "Mercredi"
	},
	{
		id: 4,
		name: "Jeudi"
	},
	{
		id: 5,
		name: "Vendredi"
	},
	{
		id: 6,
		name: "Samedi"
	}
];

const SexeList= [
	{
		id: 0,
		name: " Homme"
	},
	{
		id: 1,
		name: " Femme"
	},
];
	
// Todo: set a backend
const StatusList= [
	{
		id: 0,
		name: " Employé activé"
	},
	{
		id: 1,
		name: " Employé desactivé"
	},
	{
		id: 2,
		name: " Repartiteur"
	},
	{
		id: 3,
		name: " Gestionnaire"
	},
	{
		id: 4,
		name: " Administrateur"
	},
];
	
// Todo: set a backend
const SalaireTypeList = [
	{
		id: 0,
		name: " Salaire horaire"
	},
	{
		id: 1,
		name: " Salaire annuel"
	},
];

// set account to get the profile from
var accountId = "";
let role	= cookies.get( "role" );
let userid 	= cookies.get( "userid" );
if( role == "user" ){
	// setAccountId( userid );	// Id of connected user from the users cookie session
	accountId = userid;
}
else{
	let url 	= window.location.href;
	let query 	= 'userid'
	let id  	= getUrlParametter( query, url );
	if( id )
		accountId = id;
	else
		// setAccountId( userid );
		accountId = userid;
}



async function getUserJours( userProfileId ){
	try {
		let res = await fetch( lbdomain + "/NiovarRH/UserProfileMicroservices/UserProfileJour/getUserProfileJour/" + userProfileId , {
			method: "GET",
			headers: {'Content-Type': 'application/json'},
		});
			
		let resJson = await res.json();
		if( resJson.statusCode === 200 ) {
			let result 	= resJson.userProfileJours;
			let count 	= result.length;
			let userProfilJours = [];
			for( var i = 0; i < count; i++ ){
				let jourId = result[i].jourId;
				userProfilJours.push( jourId );
			}

			getUserWeekdays( userProfilJours );
			// setWeekDays( userWeekDays ); 
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


// Create initial user checked  array for week days checkboxes 
var userWeekDayArray 	= [];
function getUserWeekdays( userJours ){
		
	for( var i = 0; i < days.length; i++ ){
		let to_check = false;
	
		if( userJours.includes( days[i].id ) )
			to_check = true;
			
		userWeekDayArray.push( to_check );
	}
	console.log( userWeekDayArray );
}

// console.log( accountId );
var userJoursId = [];
var accountInfo = "";

// get user profile info
async function getAccountInfo(){
	try {
		let res = await fetch( lbdomain + "/Accounts/" + accountId, {
			method: "GET",
			headers: {'Content-Type': 'application/json'},
		});
			
		let resJson = await res.json();
		if( resJson.accountId ) {
			accountInfo   = resJson;
			// setUserProfile( result );
		}
		else {
			alert( "Compte non trouvé" );
			// setErrorColor( "red" );
			// setErrorMessage( "Erreur de connexion. Reessayer plus tard" );
		}
	} 
	catch (err) {
		//alert( "Vérifiez votre connexion internet svp" );
		console.log(err);
	};
}
getAccountInfo();

// get user profile
var userProfileData = [];
var userFormType = 0;
async function  getUserProfile(){
	
	try {
		let res = await fetch( lbdomain + "/NiovarRH/UserProfileMicroservices/UserProfile/ProfileFromAccount/" + accountId, {
			method: "GET",
			headers: {'Content-Type': 'application/json'},
		});
			
		let resJson = await res.json();
		if( resJson.statusCode === 200 ) {
			 
			
			if( resJson.userProfile.length == 0 ){ // no profile data found for this user
				userProfileData		= resJson.userProfile[0];
				userFormType = 1; // edit form

				// datepickers dates
				let date_embauche = moment( userProfileData.dateEmbauche, 'YYYY-MM-DDTHH:mm:ss' ).format('YYYY-MM-DD');
				let date_depart	  = moment( userProfileData.dateDepart, 'YYYY-MM-DDTHH:mm:ss' ).format('YYYY-MM-DD');
				let dateEmbaucheObj 	=  new Date( date_embauche );
				let dateDepartObj		=  new Date( date_depart );
			
				userProfileData.dateEmbauche = dateEmbaucheObj;
				userProfileData.dateDepart 	 = dateDepartObj;
				
				// user days to check
				let userProfileId 	= userProfileData.id;
				if( userProfileId )
					getUserJours( userProfileId );
			}	 
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

	
const UserProfile = () => {
	const history = useHistory();

	const [ nomEntreprise, setNomEntreprise ]= useState(''); //	
	const [ btnText, setBtnText ]	= useState('Btn'); //
	
	const [ dateEmbauche, setDateEmbauche ] =  useState( userProfileData.dateEmbauche ); 	// Date d'embauche input default value
	const [ dateDepart, setDateDepart ] 	= useState( userProfileData.dateDepart ); 		// Date de depart input default value
	
	const [ paysId, setPaysId ] 		= useState( userProfileData.paysId ); 		// Pays select's default value
	const [ provinceId, setProvinceId ] = useState( userProfileData.provinceId ); 	// Provinces select's default value
	const [ villeId, setVilleId ] 		= useState( userProfileData.villeId ); 		// Villes select's default value

	const [ PaysList, setPaysList ] 		= useState([]); 	// Pays array's values top map
	const [ ProvinceList, setProvinceList ] = useState([]); 	// Provinces array's values to map
	const [ VilleList, setVilleList ] 		= useState([]); 	// Ville array's values to map

	const [ statusId, setStatusId ] = useState( userProfileData.statutId ); // User status

	const [ userWeekDays, setUserWeekDays ] = useState( userWeekDayArray );	// Default users days to checked

	const [ DepartementList, setDepartementList ] = useState([]); 	// List of all departments to select
	const [ PosteList, setPosteList ] = useState([]); 				// List of all post to select
	
	const [ fullName, setFullName] = useState( accountInfo.fullName );
	const [ email, setEmail] = useState( accountInfo.email );
	const [ telephone01, setTelephone01] = useState( userProfileData.telephone01 );
	const [ telephone02, setTelephone02] = useState( userProfileData.telephone02 );
	const [ matricule, setMatricule] = useState( accountInfo.matricule );
	const [ sexeId, setSexeId] = useState( userProfileData.sexeId );
	const [ posteId, setPosteId] = useState( userProfileData.posteId );
	const [ departementId, setDepartementId ] = useState( userProfileData.departementId );
	const [ salaryTypeid, setSalaryTypeid] = useState( userProfileData.salaryTypeid );
	const [ salaire, setSalare] = useState( userProfileData.salaire );

	const [ showProvince, setShowProvince ] = useState(false); //
	const [ showVille, setShowVille ] = useState(false); //
	
	const [ formType, setFormType ] = useState( userFormType ); // Edition or new data
	
	
	const [ userSexeId, setUserSexeId ] = useState(''); //

	const [ userPosteId, setUserPosteId ] = useState(''); //
	const [ userSalaryType, setUserSalaryType ] = useState(''); //
	
	const [ userPays, setUserPays ] = useState(''); //
	const [ userProvince, setUserProvince ] = useState(''); //
	const [ userVille, setUserVille ] = useState(''); //
	const [ userTelephone01, setUserTelephone01 ] = useState(''); //
	const [ userTelephone02, setUserTelephone02 ] = useState(''); //
	
	const [ userSalaire, setUserSalaire ] = useState(''); //
	const [ userDateNaissance, setUserDateNaissance ] = useState(''); //
	const [ userPhotoUrl, setUserPhotoUrl ] = useState(''); //
	const [ userPhotoJours, setUserPhotoJours ] = useState([]); //

	const [ weekDays, setWeekDays ] = useState( days ); //
	
	
	// Handle checkbox change
	const handleCheck = (index) => {
		let check = userWeekDays[index];
		let userWeekDayCopy 	= userWeekDays.slice();
		userWeekDayCopy[index] = !check;
console.log( userWeekDayCopy );		
		setUserWeekDays( userWeekDayCopy );

	}
  
  

	const handleClick = (e) => {
		e.preventDefault();
		location.replace( btnLink );
	}
	
	const handleSelectDepartement = (value) => {
		let departementId = value;
		GetPostes(departementId);
	}

	const handleSelectPays = (value) => {
		let paysId = value;
		GetProvinces(paysId);
	}

	const handleSelectProvince = (value) => {
		let villeId = value;
		GetVilles(villeId);
	}

	const handleSelect = (e) => {
		e.preventDefault();
	}

	// get current url
	let code = ( cookies.get( 'code_entreprise' ) ) ? cookies.get( 'code_entreprise' ) : "2020"; //


	useEffect(() => {
		getDepartements();
		getPays();

		// setDateEmbauche( userProfileData.dateEmbauche ); //
		// setDateDepart( userProfileData.dateDepart ); //
	},[] );
	
console.log( userProfileData );
console.log( formType );

	// get user 
	// get company name
	async function getDepartements(){

		try {
			let res = await fetch( lbdomain + "/NiovarRH/DepartementMicroservices/Departement/Entreprise/" + code, {
				method: "GET",
				headers: {'Content-Type': 'application/json'},
			});
			
			let resJson = await res.json();
			if( resJson.statusCode === 200 ) {
				let departements = resJson.departement;
				setDepartementList( departements );
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
	
	// get Postes
	async function GetPostes( departementId ){

		try {
			let res = await fetch( lbdomain + "/NiovarRH/DepartementMicroservices/Poste/Departement/" + departementId, {
				method: "GET",
				headers: {'Content-Type': 'application/json'},
			});
			
			let resJson = await res.json();
			if( resJson.statusCode === 200 ) {
				let postes = resJson.poste;
				setPosteList( postes );
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
	
	// Get ville
	async function GetVilles( provinceId ){

		try {
			let res = await fetch( lbdomain + "/NiovarRH/UserAdressMicroservices/Province/VillesProvince/" + provinceId, {
				method: "GET",
				headers: {'Content-Type': 'application/json'},
			});
			
			let resJson = await res.json();
			if( resJson.statusCode === 200 ) {
				let villes = resJson.ville;
				setVilleList( villes );
				setShowVille( true );
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
	
	// Get provinces
	async function GetProvinces( paysId ){

		try {

			let res = await fetch( lbdomain + "/NiovarRH/UserAdressMicroservices/Pays/ProvincesPays/" + paysId, {
				method: "GET",
				headers: {'Content-Type': 'application/json'},
			});
			
			let resJson = await res.json();
			if( resJson.statusCode === 200 ) {
				let province = resJson.province;
				setProvinceList( province );
				setShowProvince( true );
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
	

	// Get pays
	async function getPays(){

		try {
			let res = await fetch( lbdomain + "/NiovarRH/UserAdressMicroservices/Pays", {
				method: "GET",
				headers: {'Content-Type': 'application/json'},
			});
			
			let resJson = await res.json();
			if( resJson.statusCode === 200 ) {
				let pays = resJson.pays;
				setPaysList( pays );
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

	// get company name
	async function GetStatus(){

		try {
			let res = await fetch( lbdomain + "/NiovarRH/DepartementMicroservices/Departement/Entreprise/" + code, {
				method: "GET",
				headers: {'Content-Type': 'application/json'},
			});
			
			let resJson = await res.json();
			if( resJson.statusCode === 200 ) {
				let departements = resJson.departement;
				setDepartementList( departements );
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
	// get company name
	async function GetNomEntreprise(){

		try {
			let res = await fetch( lbdomain + "/NiovarRH/EntrepriseMicroservices/Entreprise/nomEntreprise/" + UserProfileId , {
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
                <div className="card-header">Détails de votre profile</div>
                <div className="card-body">
                    <form>
                       <div className="row gx-3 mb-3">
                           
                            <div className="col-md-6">
                                <User /> <label className="small mb-1">Nom complet</label>
                                <input 
									className="form-control" 
									type="text" 
									placeholder="Votre nom complet" 
									defaultValue= { fullName }
								/>
                            </div>
                           <div className="col-md-6">
                                <Mail /> <label className="small mb-1">Email</label>
                                <input 
									className="form-control" 
									type="email" 
									placeholder="Votre adresse courriel" 
									defaultValue = { email } 
								/>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                           
                            <div className="col-md-6">
                                <Smartphone /> <label className="small mb-1" >Téléphone </label>
                                <input 
									className="form-control" 
									type="text" 
									placeholder="Numéro de téléphone" 
									defaultValue = {formType ? telephone01 : ""} 
								/>
                            </div>
                           <div className="col-md-6">
                                <Phone /> <label className="small mb-1" >Téléphone domicile</label>
                                <input 
									className="form-control" 
									type="text" 
									placeholder="Téléphone du domicile" 
									defaultValue = {formType ? telephone02 : ""} 
								/>
                            </div>
                        </div>
						<div className="row gx-3 mb-3">
							<div className="col-md-6">
                                <Users /> <label className="small mb-1" >Genre </label>
								<select 
								className="custom-select" 
								value = { formType ? sexeId : "choisir" } 
								onChange={e => handleSelect(e.target.value)} >
									{ !formType ? 
										<option value="choisir">Choisir</option> 
									: 
										"" 
									}
									{SexeList.map((obj, index) => (
										<option 
											key={index} 
											value={obj.id}>{obj.name}
										</option>
									))}
								</select>
                            </div>
                           <div className="col-md-6">
                                <Hash /> <label className="small mb-1" >Numéro de matricule</label>
                                <input 
									className="form-control" 
									type="text" 
									placeholder="Numéro d'employé" 
									defaultValue = { formType ? matricule : "" }
								/>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
							<div className="col-md-6">
                                <Clipboard /> <label className="small mb-1" >Département</label>
								<select 
								className="custom-select" 
								value = {formType ? departementId : ""} 
								onChange={e => handleSelectDepartement(e.target.value)} >
									{DepartementList.map((obj, index) => (
										<option key={index} value={obj.id}>{obj.name}</option>
									))}
								</select>
                            </div>
							<div className="col-md-6">
                                <Briefcase /> <label className="small mb-1" >Poste</label>
								<select 
								className="custom-select" 
								value = {formType ? posteId : "choisir"} 
								onChange={e => handleSelect(e.target.value)} >
									{ !formType ? 
										<option value="choisir">Choisir</option> 
									: 
										"" 
									}
									{PosteList.map((obj, index) => (
										<option 
											key={index} 
											value={obj.id}>{obj.name}
										</option>
									))}
								</select>
                            </div>
						</div>
						<div className="row gx-3 mb-3">
							
                            <div className="col-md-6">
                                <Trello /> <label className="small mb-1" >Type de salaire</label>
								<select 
								className="custom-select" 
								value = {formType ? salaryTypeid : "choisir"} 
								onChange={e => handleSelect(e.target.value)} >
									{ !formType ? 
										<option value="choisir">Choisir</option> 
									: 
										"" 
									}
									{SalaireTypeList.map((obj, index) => (
										<option 
											key={index} 
											value={obj.id}>{obj.name}
										</option>
									))}
								</select>
                            </div>
                           
                            <div className="col-md-6">
                                <DollarSign /> <label className="small mb-1" >Salaire</label>
								<input 
									className="form-control" 
									type="text" 
									placeholder="Salaire" 
									defaultValue = {formType ? salaire : ""}
								/>
                            </div>
                        </div>
						<div className="row gx-3 mb-3"> 
                        
                            <div className="col-md-6">
                                <Calendar /> <label className="small mb-1" >Date d'embauche</label>
								<DatePicker 
									locale="fr" 
									className="form-control" 
									id="dateEmbauche" 
									selected= { formType ? dateEmbauche : "" }
									onChange={(date) => setDateEmbauche(date)}
									dateFormat="dd MMMM yyyy"
									placeholderText= { formType ? "Choisir" : "" }
								/>
                            </div>
                           
                            <div className="col-md-6">
                                <Calendar /> <label className="small mb-1" >Date de départ</label>
								<DatePicker 
									locale="fr" 
									className="form-control" 
									id="dateDepart" 
									selected= { formType ? dateDepart : "" }
									onChange={(date) => setDateDepart(date)}
									dateFormat="dd MMMM yyyy"
									placeholderText= { formType ? "Choisir" : "" }
								/>
                            </div>
							
                        </div>
						<div className="mb-3">
                            <Globe /> <label className="small mb-1" >Pays</label>
							<select 
							className="custom-select" 
							value = {formType ? paysId : "choisir"} 
							onChange={e => handleSelectPays(e.target.value)} >
								{ !formType ? 
									<option value="choisir">Choisir</option> 
									: 
										"" 
								}
								{PaysList.map((obj, index) => (
									<option 
										key={index} 
										value={obj.id}>{obj.name}
									</option>
								))}
							</select>
							
                        </div>
						{ ( !showProvince ) ? 
						<>&nbsp;</> 
						:
						<div className="mb-3">
                            <Map /> <label className="small mb-1" >Province</label>
                            <select
							className="custom-select" 
							value = {formType ? provinceId : "choisir"} 
							onChange={e => handleSelectProvince(e.target.value)} >
								{ !formType ? 
									<option value="choisir">Choisir</option> 
								: 
									"" 
								}
								{ProvinceList.map((obj, index) => (
									<option 
										key={index} 
										value={obj.id}>{obj.name}
									</option>
								))}
							</select>
                        </div>
						}
						{ ( !showVille ) ? 
						<>&nbsp;</> 
						:
						<div className="mb-3">
                            <Map /> <label className="small mb-1" >Ville</label>
							<select 
							className="custom-select" 
							value = {formType ? villeId : "choisir"} 
							onChange ={e => handleSelectVille(e.target.value)} >
								{ !formType ? 
									<option value="choisir">Choisir</option> 
								: 
									"" 
								}
								{VilleList.map((obj, index) => (
									<option 
										key={index} 
										value={obj.id}>{obj.name}
									</option>
								))}
							</select>
                        </div>
						}
						<div className="mb-3">
                            <Sun /> <label className="small mb-1" >Vos jours de disponibilité</label>
							<div className="col-sm-8 checkbox-wrapper list-unstyled">
							{weekDays.map((obj, index) => (
								<li key={index}>
									<div className="checkbox-inline">
										<input 
											type="checkbox"
											id={`custom-checkbox-${index}`}
											name={obj.name}
											value={obj.name}
											checked= { formType ? userWeekDays[index] : false }
											onChange={() => handleCheck(index)}
										/>
										&nbsp;<label htmlFor={`custom-checkbox-${index}`}>{obj.name}</label>
									</div>
								</li>
							))}
							</div>
                        </div>
						{ role == 'admin' ?
						<div className="mb-3">
                            <ToggleLeft /> <label className="small mb-1" >Statut</label>
							<select
							className="custom-select" 
							value = {formType ? statusId : "choisir"} 
							onChange ={e => handleSelectStatus(e.target.value)} >
								{ !formType ? 
									<option value="choisir">Choisir</option> 
								: 
									"" 
								}
								{StatusList.map((obj, index) => (
									<option 
										key={index} 
										value={obj.id}>{obj.name}
									</option>
								))}
							</select>
                        </div>
						: 
							"" 
						}
						<div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <Lock /> <label className="small mb-1" >Mot de passe</label>
                                <input 
									className="form-control" 
									id="password" 
									type="text" 
									placeholder="Mot de passe" 
									defaultValue = "" 
								/>
                            </div>
							
                            <div className="col-md-6">
                                <Lock /> <label className="small mb-1" >Repeter le mot de passe</label>
                                <input 
									className="form-control" 
									id="inputBirthday" 
									type="text" 
									placeholder="Repetition du mot de passe" 
									defaultValue = ""
								/>
                            </div>
                        </div>
                        <button className="btn btn-primary" type="button">
							{ !formType ? 
									"Enregistrer" 
								: 
									"Modifier" 
							}
						</button>
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

export default UserProfile;