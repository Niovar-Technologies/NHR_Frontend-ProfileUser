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
let compagnie 	=  cookies.get( "compagnie" );
let appfichierUrl  = "https://fichiers.niovarpaie.ca";

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
		id: 1,
		name: "Dimanche"
	},
	{
		id: 2,
		name: "Lundi"
	},
	{
		id: 3,
		name: "Mardi"
	},
	{
		id: 4,
		name: "Mercredi"
	},
	{
		id: 5,
		name: "Jeudi"
	},
	{
		id: 6,
		name: "Vendredi"
	},
	{
		id: 7,
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
	
// Status
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
if( role == "User" ){
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



// get current url
let code = ( cookies.get( 'code_entreprise' ) ) ? cookies.get( 'code_entreprise' ) : "2020"; //
	

// async function GetStatus(){

		// try {
			// let res = await fetch( lbdomain + "/NiovarRH/DepartementMicroservices/Departement/Entreprise/" + code, {
				// method: "GET",
				// headers: {'Content-Type': 'application/json'},
			// });
			
			// let resJson = await res.json();
			// if( resJson.statusCode === 200 ) {
				// let departements = resJson.departement;
				// setDepartementList( departements );
			// }
			// else {
				// alert( "Un probleme est survenu" );
				// // setErrorColor( "red" );
				// // setErrorMessage( "Erreur de connexion. Reessayer plus tard" );
			// }
		// } 
		// catch (err) {
			// //alert( "Vérifiez votre connexion internet svp" );
			// console.log(err);
		// };
// }
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


	
const UserProfile = () => {
	const history = useHistory();

	const [ password, setPassword ]= useState(''); //	
	const [ repeatPassword, setRepeatPassword ]= useState(''); //
	
	const [ nomEntreprise, setNomEntreprise ]= useState(''); //	
	
	const [ profileId, setProfileId ] =  useState( '' );
	const [ dateEmbauche, setDateEmbauche ] =  useState( '' );
	const [ dateDepart, setDateDepart ]  =  useState( '' );  
	const [ paysId, setPaysId ] =  useState( '' );  
	const [ provinceId, setProvinceId ]	=  useState( '' );											
	const [ villeId, setVilleId ]=  useState( '' );	 			
	const [ statusId, setStatusId ] = useState( '' ); // User status

	const [ telephone01, setTelephone01 ] = useState( '' );
	const [ telephone02, setTelephone02 ] = useState( '' );
	const [ sexeId, setSexeId ] = useState( '' );
	const [ posteId, setPosteId ] =  useState( '' );
	const [ departementId, setDepartementId ] =  useState( '' );
	const [ salaryTypeName, setSalaryTypeName ] =  useState( '' );
	const [ salaire, setSalaire ] = useState( '' );	
											
	const [ PaysList, setPaysList ] 		= useState( [] ); 	// Pays array's values top map
	const [ ProvinceList, setProvinceList ] = useState( [] ); 	// Provinces array's values to map
	const [ VilleList, setVilleList ] 		= useState( [] ); 	// Ville array's values to map


	const [ userWeekDays, setUserWeekDays ] = useState( '' );	// Default users days to checked

	const [ DepartementList, setDepartementList ] = useState( [] );  	// List of all departments to select
	const [ PosteList, setPosteList ] = useState([]); 				// List of all post to select


	const [ showProvince, setShowProvince ] = useState(false); //
	const [ showVille, setShowVille ] = useState(false); //
	
	const [ formType, setFormType ] = useState('');// Edition or new data

	const [ userSexeId, setUserSexeId ] = useState(''); //

	const [ weekDays, setWeekDays ] = useState( days ); //
	
	const [ choisir, setChoisir ] = useState( "Choisir" ); //
	
	const [ matricule, setMatricule ] = useState( '' );
	const [ salaryTypeid, setSalaryTypeid ] = useState( '' );
	const [ fullName, setFullName ] = useState( '' );
	const [ email, setEmail ] = useState( '' );
	
	// Handle password change
	const handleChangePassword = (value) => {
		setPassword( value );
	}
	
	// Handle password repeat change
	const handleChangePasswordRepeat = (value) => {
		setRepeatPassword( value );
	}
	
	// Handle checkbox change
	const handleCheck = (index) => {
		let check = userWeekDays[index];
		let userWeekDayCopy 	= userWeekDays.slice();
		userWeekDayCopy[index]  = !check;
		setUserWeekDays( userWeekDayCopy );
	}
	
	// Handle input change
	const handleChangeSalaire = (value) => {
		
		if( role == "Admin" ){
			setSalaire( value );
		}
	}
	
	// Handle input change
	const handleChangeMatricule = (value) => {
		
		if( role == "Admin" ){
			setMatricule( value );
		}
	}
		
	// Handle input change
	const handleChangeFullName = (value) => {
		setFullName( value );
	}
		
	// Handle input change
	const handleChangeEmail = (value) => {
		setEmail( value );
	}
		
	// Handle input change
	const handleChangeTelephone01 = (value) => {
		setTelephone01( value );
	}
		
	// Handle input change
	const handleChangeTelephone02 = (value) => {
		setTelephone02( value );
	}
	

	const handleClickSave = async (e) => {
		
		e.preventDefault();
		
		// validation
		let validation = validations();
		if ( validation ){
			alert( validation );
			return;
		}
		
		var method = "";
		var path = "";
		if( !formType ){ // Nouveau
			method 	= "POST";
			path 	= "/NiovarRH/UserProfileMicroservices/UserProfile";
		}
		else{	// Edition
			method 	= "PUT";
			path 	= "/NiovarRH/UserProfileMicroservices/UserProfile/modifier/" + profileId;
		}
		var json = {
					"id" : ( profileId ) ? profileId : "undefined",
					"accountId": accountId,
					"telephone01": telephone01,
					"telephone02": telephone02,
					"sexeId": sexeId,
					"departementId": departementId,
					"posteId": posteId,
					"typeSalaireId": salaryTypeid,
					"salaire": salaire,
					"dateEmbauche": "2022-09-24T23:01:27.829Z",
					"dateDepart": "2022-09-24T23:01:27.829Z",
					"dateNaissance": "2022-09-24T23:01:27.829Z",
					"paysId": paysId,
					"provinceId": provinceId,
					"villeId": villeId,
					"statutId": 1,
					"photoUrl": "foo.jpg",
					"userProfileJour": []
				};
		
		if( !formType ) // Nouveau
			delete json.id;

console.log( json );

		// save or modify profile
		try {
			var res = await fetch( lbdomain + path, {
				method: method,
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify( json )
				
			});
			
			let resJson = await res.json();
			if( resJson.statusCode === 200 ) {
				let userProfileId = resJson.userProfileId;
				
				setProfileId( userProfileId ); // Todo: use a useEffect

				saveUserJour( resJson.userProfileId ); //
				
				alert( "Votre profile a bien été enregistré" );
			}
		}
		catch (err) {
			//alert( "Vérifiez votre connexion internet svp" );
			console.log(err);
		}
			
		// update account info
		updateUser();
			
	}
	
	
	// Update a user
	const updateUser = async() => {
		// Update Account
		try {
			var res = await fetch( lbdomain + "/Accounts/" + accountId, {
				method: "PUT",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					'accountId': accountId,
					'fullName': fullName,
					'role': role, // getRoleId( role )
					'email': email,
					'password': password,
					'confirmPassword': repeatPassword
				}),
			});
			
			let resJson = await res.json();
			if( resJson.statusCode === 200 ) {
				console.log('User updated');
			}
		}
		catch (err) {
			//alert( "Vérifiez votre connexion internet svp" );
			console.log(err);
		}
	}
	
	
	// validations
	const validations = () => {
		var validation = "";
		
		// full name
		if( fullName.length < 3 )
			validation = "Nom non valide";
		
		// email
		var validationCourriel = validationEmail( email );
		if( !validationCourriel )
			validation = "Email non valide";
		
		// telephone01
		var validationTelephone01 = validationPhoneNumber( telephone01 );
		if( !validationTelephone01 )
			validation = "Numéro de téléphone non valide";
		
		// telephone02
		var validationTelephone02 = validationPhoneNumber( telephone02 );
		if( telephone02 && !validationTelephone02 ) // not mandatory
			validation = "Numéro de téléphone de domicile non valide";
		
		// salaire
		if( salaire && salaire.isNaN ) // not mandatory
			validation = "Salaire non valide";
		
		// password
		var validationPass = validationPassword( password, repeatPassword );
		if( password && validationPass )
			validation = validationPass;
	
		// sexeId
		if( sexeId === '' ){
			validation = "Homme ou femme?"; 
		}
	
		// departementId // posteId
		if( departementId === '' )
			validation = "Choisissez un Département de travail"; 
		else if( posteId === '' )
			validation = "Choisissez un Poste de travail"; 
		
		// paysId // provinceId // villeId
		if( paysId === '' )
			validation = "Choisissez un Pays"; 
		else if( provinceId === '' )
			validation = "Choisissez une Province";
		else if( villeId === '' )
			validation = "Choisissez une Ville";
		
		return validation;
	}
	
	const validationEmail = (email) => {
		var re 	= /\S+@\S+\.\S+/;
        var rep = re.test(email);
		
		return rep;
	};
	
	const validationPhoneNumber = (number) => {
		var re 	= /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
        var rep = re.test(number);
		
		return rep;
	};
	
	const validationPassword = (password, repeatPassword) => {
		let validation = "";
		if( password.length < 6 )
			validation = "Mot de passe trop court"
		if( password.length > 70 )
			validation = "Mot de passe trop long"
		if( password != repeatPassword)
			validation = "Mots de passe differents"
		
		return validation;
	};
	
	// Roles
	const getRoleId = (role) => {
		var id = "";
	
		if( role == "Admin" )
			id = 0;

		if( role == "User" )
			id = 1;
	
		return id;
	};
	
	// Save user jours. Delete and recreate.
	async function saveUserJour( userProfileId ){	
		// Delete
		if( userWeekDays ){
			try{
				var res = await fetch( lbdomain + "/NiovarRH/UserProfileMicroservices/UserProfileJour/delete/" + profileId, {
					method: "DELETE",
					headers: {'Content-Type': 'application/json'},
				});
				let resJson = await res.json();
				if( resJson.statusCode === 200 ) {
					// console.log( 'saveUserJour: delete' ); 
				}
			}
			catch (err) {
				//alert( "Vérifiez votre connexion internet svp" );
				console.log(err);
			}
		}
		
// console.log( userWeekDays );
// console.log( userWeekDays.length );
		// Create user jours
		for( var i = 1; i < userWeekDays.length + 1; i++ ){  // Todo: ajust i nidx dynamicaly
			
			if( userWeekDays[i] === false )
				continue;

			var dayid 	= i;
			var path 	= "/NiovarRH/UserProfileMicroservices/UserProfileJour/postUserProfileJour/"; 
			
			try{
				var res = await fetch( lbdomain + path + userProfileId + "/" + dayid  , {
					method: "POST",
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						'userProfileId':userProfileId,
						'JourId':dayid
					})
				});
				let resJson = await res.json();
				if( resJson.statusCode === 200 ) {
					//console.log( 'saveUserJour: create' ); //
				}
			}
			catch (err) {
				//alert( "Vérifiez votre connexion internet svp" );
				console.log(err);
			}
		}
	}

	const handleSelectDepartement = (value) => {
		let departementId = value;
		setDepartementId( departementId );
		GetPostes(departementId);	// Load post of this department
		
	}

	const handleSelectPoste = (value) => {
		let posteId = value;
		setPosteId( posteId );
	}

	const handleSelectPays = (value) => {
		let paysId = value;
		setPaysId( paysId );
		GetProvinces(paysId); // load provinces of this pays

	}

	const handleSelectProvince = (value) => {
		let provinceId = value;
		setProvinceId( provinceId );
		GetVilles( provinceId ); // load villes of this province
	}

	const handleSelectSexe = (value) => {
		let sexeId = value;
		setSexeId( sexeId );
	}
	
	const handleSelectSalaireType = (value) => {
		let salaireTypeId = value;
		setSalaryTypeid( salaireTypeId );
	}
	
	const handleSelectStatus= (value) => {
		let statusId = value;
		setStatusId( statusId );
	}
	
	const handleSelectVille= (value) => {
		let villeId = value;
		setVilleId( villeId );
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
	

	
	// get user profile
	// var userProfileData = [];
	async function  getUserProfile(){
	
		try {
			let res = await fetch( lbdomain + "/NiovarRH/UserProfileMicroservices/UserProfile/ProfileFromAccount/" + accountId, {
				method: "GET",
				headers: {'Content-Type': 'application/json'},
			});
			
			let resJson = await res.json();
			if( resJson.statusCode === 200 ) {
			 
				var userProfileData		= resJson.userProfile[0];
				if( userProfileData != null ){
					
					let userProfileId 	= userProfileData.id;
					setProfileId( userProfileId );
					
					let date_embauche = moment( userProfileData.dateEmbauche, 'YYYY-MM-DDTHH:mm:ss' ).format('YYYY-MM-DD');
					let date_depart	  = moment( userProfileData.dateDepart, 'YYYY-MM-DDTHH:mm:ss' ).format('YYYY-MM-DD');
					let dateEmbaucheObj 	=   new Date( date_embauche );
					let dateDepartObj		=   new Date( date_depart ) ;

					userProfileData.dateEmbauche = dateEmbaucheObj;
					userProfileData.dateDepart 	 = dateDepartObj;
				
					// user days to checkbox
					getUserJours( userProfileId );

					setDateEmbauche( userProfileData.dateEmbauche ); //
					setDateDepart( userProfileData.dateDepart );	// 
					
					setPaysId( userProfileData.paysId );	// Pays select's default value
			
						
					if( userProfileData.provinceId ){				// Display user defaut
						setShowProvince( true );
						GetProvinces( userProfileData.paysId );
						setProvinceId( userProfileData.provinceId );	// Provinces select's default value	
					}
					
					if( userProfileData.villeId ){				// Display user defaut
						setShowVille( true );
						GetVilles( userProfileData.provinceId )
						setVilleId( userProfileData.villeId );	// Villes select's default value
					}
					
					setStatusId( userProfileData.statutId );
					setTelephone01( userProfileData.telephone01 );
					setTelephone02( userProfileData.telephone02 );
					setSexeId( userProfileData.sexeId );
					setPosteId( userProfileData.posteId );
					setDepartementId( userProfileData.departementId );
					if( userProfileData.salaryTypeid )
						setSalaryTypeName( SalaireTypeList[ userProfileData.salaryTypeid ] );
					else
						setSalaryTypeName( 'Non defini' );
			
					setSalaire( userProfileData.salaire );
					setStatusId( userProfileData.statutId );
					setFormType( '1' );
				}
				else{
					setUserCheckedDaysArray( [] );
					setSalaryTypeName( 'Non defini' );
				}
				
				// setPassword( userProfileData.password );
				// setRepeatPassword( userProfileData.password );
			
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

	
	// get user profile info
	async function getAccountInfo(){
		try {
			let res = await fetch( lbdomain + "/Accounts/" + accountId, {
				method: "GET",
				headers: {'Content-Type': 'application/json'},
			});
			
			var accountInfo = "";
			let resJson = await res.json();
			if( resJson.accountId ) {
				accountInfo   = resJson;
				// setUserProfile( result );
				setMatricule( accountInfo.matricule );
				setSalaryTypeid( accountInfo.salaryTypeid );
				setFullName( accountInfo.fullName );
				setEmail( accountInfo.email );
			
				getUserProfile();
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
		
				setUserCheckedDaysArray( userProfilJours );
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
	function setUserCheckedDaysArray( userJours ){
		var userWeekDaysArray 	= [];
		for( var i = 0; i < days.length; i++ ){
			let to_check = false;
	
			if( userJours.includes( days[i].id ) )
				to_check = true;
			
			userWeekDaysArray.push( to_check );
		}
		setUserWeekDays( userWeekDaysArray );
		console.log( userWeekDays );
	}
	
	
	// departement List
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
				
				if( !postes.length == 0 )	// Departement Non attribue
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
				setVilleList ( villes );
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
	
	
	// Post photo profile 
	const handleChangeFile = async (event) => {
		const file = event.target.files[0];
		let formData = new FormData();
		formData.append('file', file);
		formData.append('userid', userid);
		try{
			var res = await fetch( appfichierUrl + "/niovarpaie/post/photoprofile'", {
				method: "POST",
				// headers: {'Content-Type': 'application/json'},
				body: formData
			})

			let resJson = await res.json();
			if( resJson.file_url ) {
				// get the uploaded file name
				var name = resJson.file_url;
				alert( name );
			}
			else{
				console.log( "Uploaded File error" );
			}
		}
		catch (err) {
			//alert( "Vérifiez votre connexion internet svp" );
			console.log(err);
		};
	};
	
	GetPhotoProfile
		
	useEffect(() => {
		getAccountInfo();
		getPays();
		getDepartements();
	},[] );
	
			
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
                    
                    <img className="
						img-account-profile rounded-circle mb-2" 
						src="" 
						alt="" />
                    <div className="small font-italic text-muted mb-4">JPG ou PNG de moins de 5 MB</div>
					<label className="btn btn-primary" onChange={e => handleChangeFile(e)} htmlFor="uploadInput">
						<input type="file" id="uploadInput" hidden />
						Changer l'image
					</label>
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
									onChange={e => handleChangeFullName(e.target.value)} 
									className="form-control" 
									type="text" 
									placeholder="Votre nom complet" 
									value= { fullName }
								/>
                            </div>
                           <div className="col-md-6">
                                <Mail /> <label className="small mb-1">Email</label>
                                <input 
									onChange={e => handleChangeEmail(e.target.value)}
									id="email"
									className="form-control" 
									type="email" 
									placeholder="Votre adresse courriel" 
									value = { email } 
								/>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                           
                            <div className="col-md-6">
                                <Smartphone /> <label className="small mb-1" >Téléphone </label>
                                <input 
									onChange={e => handleChangeTelephone01(e.target.value)}
									className="form-control" 
									type="text" 
									placeholder="Numéro de téléphone" 
									value = { telephone01 } 
								/>
                            </div>
                           <div className="col-md-6">
                                <Phone /> <label className="small mb-1" >Téléphone domicile</label>
                                <input 
									onChange={e => handleChangeTelephone02(e.target.value)}
									className="form-control" 
									type="text" 
									placeholder="Téléphone du domicile" 
									value = { telephone02 } 
								/>
                            </div>
                        </div>
						
						<div className="row gx-3 mb-3">
							<div className="col-md-6">
                                <Users /> <label className="small mb-1" >Genre </label>
								<select 
								className="custom-select" 
								value = { sexeId } 
								onChange={e => handleSelectSexe(e.target.value)} >
									{ !sexeId ? 
										<option value="choisir">choisir</option> 
									: 
										"" 
									}
									{ SexeList.map((obj, index) => (
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
									value = { matricule }
									onChange={e => handleChangeMatricule(e.target.value)} 
								/>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
							<div className="col-md-6">
                                <Clipboard /> <label className="small mb-1" >Département</label>
								<select 
								className="custom-select" 
								value = { departementId } 
								onChange={e => handleSelectDepartement(e.target.value)} >
									{ !departementId ? 
										<option value="choisir">choisir</option> 
									: 
										"" 
									}
									{ DepartementList.map((obj, index) => (
										<option 
											key={index} 
											value={obj.id}>{obj.name}
										</option>
									))}
								</select>
                            </div>
							<div className="col-md-6">
                                <Briefcase /> <label className="small mb-1" >Poste</label>
								<select 
								className="custom-select" 
								value = { posteId } 
								onChange={e => handleSelectPoste(e.target.value)} >
									{ !posteId ? 
										<option value="choisir">choisir</option> 
									: 
										"" 
									}
									{ PosteList.map((obj, index) => (
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
							{ role == "User" ? 
								<input
									onChange={e => handleChangeSalaire(e.target.value)}
									className="form-control" 
									type="text" 
									placeholder="Type de salaire" 
									value = { salaryTypeName } />					
							:
								<select 
								className="custom-select" 
								value = { salaryTypeid } 
								onChange={e => handleSelectSalaireType(e.target.value)} >
									{ !salaryTypeid ? 
										<option value="choisir">choisir</option> 
									: 
										"" 
									}
									{ SalaireTypeList.map((obj, index) => (
										<option 
											key={index} 
											value={obj.id}>{obj.name}
										</option>
									))}
								</select>
							}
                            </div>
                           
                            <div className="col-md-6">
                                <DollarSign /> <label className="small mb-1" >Salaire</label>
								<input 
									onChange={e => handleChangeSalaire(e.target.value)} 
									className="form-control" 
									type="text" 
									placeholder="0" 
									value = { salaire ? salaire : "0" }
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
									selected= { dateEmbauche }
									onChange={(date) => setDateEmbauche(date)}
									dateFormat="dd MMMM yyyy"
									placeholderText= { "Choisir" }
								/>
                            </div>
                           
                            <div className="col-md-6">
                                <Calendar /> <label className="small mb-1" >Date de départ</label>
								<DatePicker 
									locale="fr" 
									className="form-control" 
									id="dateDepart" 
									selected= { dateDepart }
									onChange={(date) => setDateDepart(date)}
									dateFormat="dd MMMM yyyy"
									placeholderText= { "Choisir" }
								/>
                            </div>
							
                        </div>
						<div className="mb-3">
                            <Globe /> <label className="small mb-1" >Pays</label>
							<select 
								className="custom-select" 
								value = { paysId } 
								onChange={e => handleSelectPays(e.target.value)} >
									{ !paysId ? 
										<option value="choisir">choisir</option> 
									: 
										"" 
									}
									{ PaysList.map((obj, index) => (
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
								value = { provinceId } 
								onChange={e => handleSelectProvince(e.target.value)} >
									{ !provinceId ? 
										<option value="choisir">choisir</option> 
									: 
										"" 
									}
									{ ProvinceList.map((obj, index) => (
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
								value = { villeId } 
								onChange={e => handleSelectVille(e.target.value)} >
									{ !villeId ? 
										<option value="choisir">choisir</option> 
									: 
										"" 
									}
									{ VilleList.map((obj, index) => (
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
											checked= { userWeekDays[index] }
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
								value = { statutId } 
								onChange={e => handleSelectStatus(e.target.value)} >
									{ !statutId ? 
										<option value="choisir">choisir</option> 
									: 
										"" 
									}
									{ StatusList.map((obj, index) => (
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
									type="password" 
									placeholder="Mot de passe" 
									value = { password }
									onChange={e => handleChangePassword(e.target.value)}
								/>
                            </div>
							
                            <div className="col-md-6">
                                <Lock /> <label className="small mb-1" >Repeter le mot de passe</label>
                                <input 
									className="form-control" 
									id="repeatPassword" 
									type="password" 
									placeholder="Repetition du mot de passe" 
									value = { repeatPassword }
									onChange={e => handleChangePasswordRepeat(e.target.value)} 
								/>
                            </div>
                        </div>
                        <button 
							className="btn btn-primary" 
							type="button"  
							onClick={handleClickSave}
							>
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