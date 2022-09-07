import React, { useContext, createContext, state, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import avatar02 from '../static/img/avatar-02.jpg';
import avatar10 from '../static/img/avatar-10.jpg';
import avatar14 from '../static/img/avatar-14.jpg';
import avatar15 from '../static/img/avatar-15.jpg';
// import nopic from '../static/img/nopic.png';
import {Home, Users, Database, Briefcase, FileText, RefreshCw, Settings, User, Bell, FileMinus, Clipboard, Send} from 'react-feather';
// import saveHistory from './SaveHistory';
	
import {ChevronDown, Edit, Grid, List, Plus} from "react-feather";


import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

let role = cookies.get( "role" );
let appdomain 		= "https://niovarpaie.ca"; // app domainn
let lbdomain 	= "https://loadbalancer.niovarpaie.ca"; // load balancer domain

const Annees = () => {
	const history = useHistory();

	const [nomEntreprise, setNomEntreprise]= useState(''); //	
	

	const [title, setTitle]= useState("Profile");
	const [btnText, setBtnText]= useState('');
	const [paieType, setPaieType] = useState(''); //
	const [totalEnvoye, setTotalEnvoye] = useState(0); //
	const [totalAEnvoyer, setTotalAEnvoyer] = useState(0); //
	const [textBtnEnvoyer, setTextBtnEnvoyer]= useState('');
	const [anneeCours, setAnneeCours] = useState('2022'); // Todo: use an API
	const [textNombreEnvoye, setTextNombreEnvoye] = useState(''); //
	const [texteAnneeEnCours, setTexteAnneeEnCours] = useState(''); //
	const [h3text, setH3text] = useState(''); //
	const [typeDePaie, setTypeDePaie ] = useState(''); //

	useEffect(() => {
		getCurrentUrl();
	}, []);
	

	const handleClick = () => {
		cookies.set( 'anneeChoisie', anneeCours, { path: '/' } );	//  TODO: set expire to 15 min
		var url = "";
		if ( typeDePaie == 'fiches-impot' ) {
			if( role == "User" )
				url = appdomain + "/fiches-impot-employee";
			else
				url = appdomain + "/fiches-impot";
		}
		if ( typeDePaie == 'releves-emploi' ) {
			if( role == "User" )
				url = appdomain + "/releves-emploi-employee";
			else
				url = appdomain + "/releves-emploi";
		}
		window.location.replace( url )
	}

	const handleSelectAnnee = ( value ) => {
		var annee = value;
		setAnneeCours( value );
	}

	// get current url
	const getCurrentUrl = async () => { 
		var currentUrl = window.location.href;
		
		if( currentUrl ){
			let type_de_paie = currentUrl.substring( currentUrl.lastIndexOf('/') + 1 );
			setTypeDePaie( type_de_paie );
			var titleText = ( type_de_paie == "fiches-impot" ) ? "Fiche d'impôt" : "Relevé d'emploi";
			setPaieType( type_de_paie );
			if ( type_de_paie == 'fiches-impot' ) {
				setTitle( "Fiches d'impôt" );
				setBtnText( "Choisir l'année" );
				setH3text( "Choisir une année d'impôt" );
				setTextNombreEnvoye( "Fiches d'împot envoyés" );
				
				if( role == "User" )
					setTextBtnEnvoyer( "Voir mes fiches d'impôt" );
				else
					setTextBtnEnvoyer( "Envoyer les fiches d'impôt" );
				
				
			}
			if ( type_de_paie == 'releves-emploi' ) {
				setTitle( "Relevé d'emploi" );
				setBtnText( "Choisir l'année" );
				setH3text( "Choisir une année d'emploi" );
				setTextNombreEnvoye( "Relevés d'emploi envoyés" );
				
				if( role == "User" )
					setTextBtnEnvoyer( "Voir mes relevés d'emploi" );
				else
					setTextBtnEnvoyer( "Envoyer les relevés d'emploi" );
				
				setTexteAnneeEnCours( "Relevés d'emploi de l'année" );
			}
		}
	}

	
	const [s, setS]= useState('');	// 
	
	
	// Options de la listbox des annees de paie de l annee en cours

	
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