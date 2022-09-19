import React, { useMemo, useContext, createContext, state, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import LoginLayout from "../Containers/LoginLayout";
import logo from '../static/img/logobig.jpeg'
import profile from '../static/css/profile.css'
import checkboxStyle from '../static/css/checkboxStyle.css'
import { Users, Lock, Hash, DollarSign, ToggleLeft, Sun, Map, MapPin, Globe, Briefcase, Clipboard, Mail, Phone, Smartphone, AlertCircle, Check, User, Calendar, Trello } from 'react-feather';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Cookies from 'universal-cookie';
const cookies = new Cookies(); 


let role = cookies.get( "role" );
let user_id = cookies.get( "userid" );

let appdomain 	= "https://niovarpaie.ca"; // app domainn
let lbdomain 	= "https://loadbalancer.niovarpaie.ca"; // load balancer domain
let compagnie 	= cookies.get( "compagnie" );

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
registerLocale('fr', fr)
	
const Checkbox = ({ obj, onChange }) => {
	return (
		<>
			<input type="checkbox"
				id={`custom-checkbox-${obj.index}`}
				name={obj.name}
				value={obj.checked}
				onChange={() => onChange({ ...obj, checked: !obj.checked })}
			/>
			{obj.name}
		</>
	);
};
	
const UserProfile = () => {
	const history = useHistory();

	const [nomEntreprise, setNomEntreprise]= useState(''); //	
	
	const [btnText, setBtnText]= useState('Btn'); //
	const [btnLink, setBtnLink]= useState(''); //
	const [verified, setVerified]= useState(''); //
	
	const [ startDateEmbauche, setStartDateEmbauche ] = useState(''); //
	const [ startDateDepart, setStartDateDepart ] = useState(''); //
	
	const [ DepartementList, setDepartementList ] = useState([]); //;
	const [ PosteList, setPosteList ] = useState([]); //
	
	const [ PaysList, setPaysList ] = useState([]); //
	const [ ProvinceList, setProvinceList ] = useState([]); //
	const [ VilleList, setVilleList ] = useState([]); //
	const [ showProvince, setShowProvince ] = useState(false); //
	const [ showVille, setShowVille ] = useState(false); //
	
	const [ userSexeId, setUserSexeId ] = useState(''); //
	const [ userDepartementId, setUserDepartementId ] = useState(''); //
	const [ userPosteId, setUserPosteId ] = useState(''); //
	const [ userSalaryType, setUserSalaryType ] = useState(''); //
	
	const [ userPays, setUserPays ] = useState(''); //
	const [ userProvince, setUserProvince ] = useState(''); //
	const [ userVille, setUserVille ] = useState(''); //
	const [ userTelephone01, setUserTelephone01 ] = useState(''); //
	const [ userTelephone02, setUserTelephone02 ] = useState(''); //
	
	const [ userSalaire, setUserSalaire ] = useState(''); //
	const [ userDateEmbauche, setUserDateEmbauche ] = useState(''); //
	const [ userDateDepart, setUserDateDepart ] = useState(''); //
	const [ userDateNaissance, setUserDateNaissance ] = useState(''); //
	const [ userPhotoUrl, setUserPhotoUrl ] = useState(''); //
	const [ userPhotoJours, setUserPhotoJours ] = useState([]); //
	
	const [ weekDays, setWeekDays ] = useState( days ); //
	
	const [ formType, setformType ] = useState( 0 ); // 0 = nouveau profile, 1 = modification de profile

	const days = [
		{
			id: 1,
			name: " Lundi"
		},
		{
			id: 2,
			name: " Mardi"
		},
		{
			id: 3,
			name: " Mercredi"
		},
		{
			id: 4,
			name: " Jeudi"
		},
		{
			id: 5,
			name: " Vendredi"
		},
		{
			id: 6,
			name: " Samedi"
		},
		{
			id: 0,
			name: " Dimanche"
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
		alert( "foo" );
	}

	// get current url
	let code = ( cookies.get( 'code_entreprise' ) ) ? cookies.get( 'code_entreprise' ) : "2020"; //

	// init some var
	
	useEffect(() => {
		getDepartements();
		getPays();
		// Get user profile data if exist and set default values
		let profile = getProfileFromAccount();
		if( profile ){
			setformType( 1 ); // Modificatino de profile
			setUserSexeId( profile.sexeId );
			setUserDepartementId( profile.departementId );
			setUserPosteId( profile.posteId );
			setUserSalaryType( profile.posteId );
			setUserPays( profile.paysId );
			setUserProvince( profile.provinceId );
			setUserVille( profile.villeId );
			setUserTelephone01( telephone01 );
			setUserTelephone02( telephone02 );
			setUserSalaire( salaire );
			setUserDateEmbauche( salaire );
			setUserDateDepart( salaire );
			setUserDateNaissance( salaire );
			setUserPhotoUrl( photoUrl );
			
			let userJoursId = getUserJours();
			// setUserJours( jours );
			// create user weekdays
			let userWeekDays = getUserWeekdays( userJoursId );
			setWeekDays( userWeekDays ); 
		}
	},[] );
	
	// user week days Array
	function getUserWeekdays( userJours ){
		let userWeekDays 	= [];
		let weekDaysId 	 	= [ 0, 1, 2, 3, 4, 5, 6 ];
		let dayObj 			= {};
		let day 	= "";
		
		
		for( i = 0; i < weekDaysId.length; i++ ){
			let checked = false;
			if( i == 0 ){
				day = "Dimanche";
			}
			if( i == 1 ){
				day = "Lundi";
			}
			if( i == 2 ){
				day = "Mardi";
			}
			if( i == 3 ){
				day = "Mercredi";
			}
			if( i == 4 ){
				day = "Jeudi";
			}
			if( i == 5 ){
				day = "Vendredi";
			}
			if( i == 6 ){
				day = "Samedi";
			}
			
			if( userJoursId.includes( i ) ){
				checked = true;
			}
			
			dayObj.id 		= i;
			dayObj.cheched 	= checked;
			dayObj.name 	= day;
			
			userWeekDays.push( dayObj );
		}
		
		return userWeekDays;
	}

	// get user profile
	function getUserProfile(){
		try {
			let res = await fetch( lbdomain + "/NiovarRH/UserProfileMicroservices/UserProfile/ProfileFromAccount/" + user_id, {
				method: "GET",
				headers: {'Content-Type': 'application/json'},
			});
			
			let resJson = await res.json();
			if( resJson.statusCode === 200 ) {
				let userProfile	= resJson.userProfile;
				// setUserProfile( result );
console.log( userProfile );				
				return userProfile;
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
	
	// 
	function getUserJours(){
		try {
			let res = await fetch( lbdomain + "/NiovarRH/UserProfileMicroservices/UserProfileJour/getUserProfileJour/" + UserProfileId , {
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
	async function getPostes( departementId ){

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
	async function GetPays(){

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
                                <User /> <label className="small mb-1" for="inputOrgName">Nom complet</label>
                                <input className="form-control" id="inputOrgName" type="text" placeholder="Votre nom complet" value="" />
                            </div>
                           <div className="col-md-6">
                                <Mail /> <label className="small mb-1" for="inputLastName">Email</label>
                                <input className="form-control" id="inputLastName" type="email" placeholder="Votre adresse courriel" value="" />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                           
                            <div className="col-md-6">
                                <Smartphone /> <label className="small mb-1" for="inputOrgName">Téléphone </label>
                                <input className="form-control" id="inputOrgName" type="text" placeholder="Votre Téléphone" value="" />
                            </div>
                           <div className="col-md-6">
                                <Phone /> <label className="small mb-1" for="inputLastName">Téléphone domicile</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Téléphone du domicile" value="" />
                            </div>
                        </div>
						<div className="row gx-3 mb-3">
							<div className="col-md-6">
                                <Users /> <label className="small mb-1" for="inputOrgName">Genre </label>
								{ setformType ? 
								<select className="custom-select" onChange={e => handleSelect(e.target.value)}>
									{SexeList.map((obj, index) => (
										<option 
											key={index} 
											value={obj.id}>{obj.name}
											defaultValue={{ label: "Choisir" }}
										</option>
									))}
								</select>
								:
								<select className="custom-select" onChange={e => handleSelect(e.target.value)}>
									{SexeList.map((obj, index) => (
										<option 
											key={index} 
											value={obj.id}>{obj.name}
											defaultValue={{ value: userSexeId }}
										</option>
									))}
								</select>
								}
                            </div>
                           <div className="col-md-6">
                                <Hash /> <label className="small mb-1" for="inputLastName">Numéro d'employé</label>
                                <input className="form-control" id="inputEmailAddress" type="text" placeholder="Numéro d'employé" value="" />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
							<div className="col-md-6">
                                <Clipboard /> <label className="small mb-1" for="inputLocation">Département</label>
								<select className="custom-select" onChange={e => handleSelectDepartement(e.target.value)}>
									{DepartementList.map((obj, index) => (
										<option key={index} value={obj.id}>{obj.name}</option>
									))}
								</select>
                            </div>
							<div className="col-md-6">
                                <Briefcase /> <label className="small mb-1" for="inputLocation">Poste</label>
                                <select className="custom-select" onChange={e => handleSelect(e.target.value)}>
									{PosteList.map((obj, index) => (
										<option key={index} value={obj.id}>{obj.name}</option>
									))}
								</select>
                            </div>
						</div>
						<div className="row gx-3 mb-3">
							
                            <div className="col-md-6">
                                <Trello /> <label className="small mb-1" for="inputPhone">Type de salaire</label>
                                <select className="custom-select" onChange={e => handleSelect(e.target.value)}>
									{SalaireTypeList.map((obj, index) => (
										<option key={index} value={obj.id}>{obj.name}</option>
									))}
								</select>
                            </div>
                           
                            <div className="col-md-6">
                                <DollarSign /> <label className="small mb-1" for="inputBirthday">Salaire</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Salaire" value="" />
                            </div>
                        </div>
						<div className="row gx-3 mb-3">
                        
                            <div className="col-md-6">
                                <Calendar /> <label className="small mb-1" for="dateEmbauche">Date d'embauche</label>
                                <DatePicker locale="fr" className="form-control" id="dateEmbauche" selected={startDateEmbauche} onChange={(date) => setStartDateEmbauche(date)} />
                            </div>
                           
                            <div className="col-md-6">
                                 <Calendar /> <label className="small mb-1" for="dateDepart">Date de départ</label>
                                <DatePicker locale="fr" className="form-control" id="dateDepart" selected={startDateDepart} onChange={(date) => setStartDateDepart(date)} />
                            </div>
                        </div>
						<div className="mb-3">
                            <Globe /> <label className="small mb-1" for="inputEmailAddress">Pays</label>
							<select className="custom-select" onChange={e => handleSelectPays(e.target.value)}>
								{PaysList.map((obj, index) => (
									<option key={index} value={obj.id}>{obj.name}</option>
								))}
							</select>
                        </div>
						{ ( !showProvince ) ? 
						<>&nbsp;</> 
						:
						<div className="mb-3">
                            <Map /> <label className="small mb-1" for="inputEmailAddress">Province</label>
                            <select className="custom-select" onChange={e => handleSelectProvince(e.target.value)}>
								{ProvinceList.map((obj, index) => (
									<option key={index} value={obj.id}>{obj.name}</option>
								))}
							</select>
                        </div>
						}
						{ ( !showVille ) ? 
						<>&nbsp;</> 
						:
						<div className="mb-3">
                            <Map /> <label className="small mb-1" for="inputEmailAddress">Ville</label>
                            <select className="custom-select" onChange={e => handleSelect(e.target.value)}>
								{VilleList.map((obj, index) => (
									<option key={index} value={obj.id}>{obj.name}</option>
								))}
							</select>
                        </div>
						}
						<div className="mb-3">
                            <Sun /> <label className="small mb-1" for="inputEmailAddress">Vos jours de disponibilité</label>
							<div className="col-sm-8 checkbox-wrapper list-unstyled">
							{weekDays.map((obj, index) => (
								<li key={index}>
									<div className="checkbox-inline">
										<Checkbox
											obj={obj}
											onChange={(item) => {
												setCheckboxData(checkboxData.map((d) => (d.order === item.order ? item : d)));
											}}
										/>
									</div>
								</li>
							))}
							</div>
                        </div>
						<div className="mb-3">
                            <ToggleLeft /> <label className="small mb-1" for="inputEmailAddress">Statut</label>
                            <select className="custom-select" onChange={e => handleSelect(e.target.value)}>
									{StatusList.map((obj, index) => (
										<option key={index} value={obj.id}>{obj.name}</option>
									))}
							</select>
                        </div>
						<div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <Lock /> <label className="small mb-1" for="inputPhone">Mot de passe</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Mot de passe" value="" />
                            </div>
							
                            <div className="col-md-6">
                                <Lock /> <label className="small mb-1" for="inputBirthday">Repeter le mot de passe</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Repetition du mot de passe" value="" />
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

export default UserProfile;