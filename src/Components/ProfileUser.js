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
	
const ProfileUser = () => {
	const history = useHistory();

	const [nomEntreprise, setNomEntreprise]= useState(''); //	
	const [texte, setTexte]= useState('Un instant ...'); //	
	const [title, setTitle]= useState('...'); //	
	const [btnText, setBtnText]= useState('Btn'); //
	const [btnLink, setBtnLink]= useState(''); //
	const [verified, setVerified]= useState(''); //
	
	const [startDateEmbauche, setStartDateEmbauche] = useState(''); //
	const [startDateDepart, setStartDateDepart] = useState(''); //
	
	const [ DepartementList, setDepartementList ] = useState([]); //;
	const [ PosteList, setPosteList ] = useState([]); //
	
	const [ PaysList, setPaysList ] = useState([]); //
	const [ ProvinceList, setProvinceList ] = useState([]); //
	const [ VilleList, setVilleList ] = useState([]); //

	// const DepartementList = [
		// {
			// id: 0,
			// name: " Non attribué"
		// },
		// {
			// id: 1,
			// name: " Santé"
		// },
	// ];
	
	const WeekList = [
		{
			id: 0,
			name: " Lundi"
		},
		{
			id: 1,
			name: " Mardi"
		},
		{
			id: 2,
			name: " Mercredi"
		},
		{
			id: 3,
			name: " Jeudi"
		},
		{
			id: 4,
			name: " Vendredi"
		},
		{
			id: 5,
			name: " Samedi"
		},
		{
			id: 6,
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
	]
	
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
	 	// GetNomEntreprise();
		GetDepartements();
		GetPays();
	},[] );
	
	// get company name
	async function GetDepartements(){

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

			let res = await fetch( lbdomain + "/NiovarRH/UserAdressMicroservices/Pays/VillesProvince/" + provinceId, {
				method: "GET",
				headers: {'Content-Type': 'application/json'},
			});
			
			let resJson = await res.json();
			if( resJson.statusCode === 200 ) {
				let villes = resJson.ville;
				setVilleList( villes );
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
				setProvinceList( pays );
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
								<select className="custom-select" onChange={e => handleSelect(e.target.value)}>
									{SexeList.map((obj, index) => (
										<option key={index} value={obj.id}>{obj.name}</option>
									))}
								</select>
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
                                <select className="custom-select" onChange={e => handleSelectAnnee(e.target.value)}>
									<option value={2022}>Taux horaire</option>
									<option value={2021}>Salaire annuel</option>
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
                        </div>PaysList
						<div className="mb-3">
                            <Map /> <label className="small mb-1" for="inputEmailAddress">Province</label>
                            <select className="custom-select" onChange={e => handleSelectProvince(e.target.value)}>
								{ProvinceList.map((obj, index) => (
									<option key={index} value={obj.id}>{obj.name}</option>
								))}
							</select>
                        </div>
						<div className="mb-3">
                            <MapPin /> <label className="small mb-1" for="inputEmailAddress">Ville</label>
                            <select className="custom-select" onChange={e => handleSelect(e.target.value)}>
								{VilleList.map((obj, index) => (
									<option key={index} value={obj.id}>{obj.name}</option>
								))}
							</select>
                        </div>
						<div className="mb-3">
                            <Sun /> <label className="small mb-1" for="inputEmailAddress">Vos jours de disponibilité</label>
							<div className="col-sm-8 checkbox-wrapper list-unstyled">
							{WeekList.map((obj, index) => (
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
                            <select className="custom-select" onChange={e => handleSelectAnnee(e.target.value)}>
									<option value={2022}>Non activé</option>
									<option value={2021}>Activé</option>
							</select>
                        </div>
						<div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <Lock /> <label className="small mb-1" for="inputPhone">Mot de passe</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Type de salaire" value="" />
                            </div>
							
                            <div className="col-md-6">
                                <Lock /> <label className="small mb-1" for="inputBirthday">Repeter le mot de passe</label>
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