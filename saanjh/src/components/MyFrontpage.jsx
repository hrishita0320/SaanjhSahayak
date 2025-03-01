import React, { useState, useEffect } from 'react';
import Header from './Header';
function MyFrontpage(){
return(
<div>
<Header/>
    
<main>
                
<div className='childcont' id='h'>
    
        <div className='subchild' > 
            <div className='descriptiom' id='description'>
                <div className='saan'>
                    <div className='saanchild'>
                        <h1>WELCOME TO SAANJH SAHAYAK<span></span></h1>
                        <p className='parag'>
                        our dedication to providing compassionate care stems from a deep-seated belief in the dignity and worth of every individual. We understand the unique challenges and vulnerabilities that come with aging, and we are committed to creating a nurturing environment where our elderly residents feel valued, respected, and supported.
                        </p>
                    </div>
                </div>
                <div className='cimages'>
                    <div><img src='Screenshot 2024-05-13 224056.png'></img></div>
                    <div><img src='Screenshot 2024-05-13 223950.png'></img>  </div>
                    <div><img src='caretakers.avif'></img></div>
                </div>
                
            
            </div>
            <div className='descriptiom'id='imaggg'>
                <img src="imgonline-com-ua-ReplaceColor-tpyFpSyZHqd-removebg-preview.png" alt="" className='ecgimage'/>
                <img src="Screenshot_2024-05-02_110828-removebg-preview (2).png" alt="" style={{ maxWidth: '100%', height: 'auto' }}/>
            </div>
        </div>

    
        
    

</div>
<div className='childcont' id='y'>
    <div className='yfirstchild'>
        <p>SERVICES WE PROVIDE</p>
    </div>
    <div className='ysecondchild'>
        <div className='features'>
            <div className='picture'>
                <img src="Screenshot 2024-05-16 235750.png" alt="" />
            </div>
            <div className='featuredesc'>
                <h4>DOCTORS</h4>
                <p>Doctors can collaborate with caretakers to develop personalized care plans for elderly residents based on the insights provided by the application. This may involve recommending specific treatments, lifestyle modifications, or referrals to specialists as needed.</p>
            </div>
        

        </div>
        <div className='features'> 
            <div className='picture'>
                <img src="Nurse at home in Chennai.jpeg" alt="" />
            </div>
            <div className='featuredesc'>
                <h4>
                    CARE TAKERS
                </h4>
                <p>Helps Care Takers efficient health monitoring, early detection of health risks, personalized care plans, decision support, remote monitoring, and streamlined documentation.</p>
            </div>

        </div>
        <div className='features'>
            <div className='picture'>
                <img src="Médico consultando o paciente e verificando a condição da doença enquanto apresenta os resultados do diagnóstico sintoma examinando sobre o problema da doença e recomendando o método de tratamento _ Fot.jpeg" alt="" />
            </div>
            <div className='featuredesc'>
                <h4>TRACKING HEALTH RECORDS</h4>
                <p> The website can analyze health records using data analytics techniques to identify trends, patterns, and potential health risks. Caretakers and doctors can visualize this information through dashboards, allowing for better-informed decision-making and care planning.</p>
            </div>

        </div>
    </div>

</div>
<div className='childcont1' id='nyj'>
    <div className='choosingsaanjh'>
        <div className='csaanjhimg'>
            <img src='naistam.webp'></img>

        </div>
        <div className='csaanjhdescription'>
            <div className='newww'>
                <h2>WHY CHOOSE SAANJH SAHAYAK?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic placeat enim, officiis, neque dignissimos dolore suscipit tenetur sint quod molestiae, fuga eligendi provident quae ipsa id. Omnis voluptate cumque veniam?</p>
            </div>
            <div className='saanjhdetparent'>
                <div className='saanjhdet'>
                <div className="sandetchild"> 
                    <div className='saandetimg'>
                        <img src='Screenshot 2024-05-16 004938.png'></img>

                    </div>
                    <div className='saandetwish'>
                        <h2>20+</h2>
                        <p>doctors</p>

                    </div>
                </div>
                <div className="sandetchild">
                    <div className='saandetimg'>
                        <img src='Screenshot 2024-05-16 005019.png'></img>

                    </div>
                    <div className='saandetwish'>
                        <h2>100+</h2>
                        <p>Reports</p>

                    </div>
                </div>
                </div>
                <div className='saanjhdet'>
                <div className="sandetchild">
                    <div className='saandetimg'>
                        <img src='Screenshot 2024-05-16 005044.png'></img>

                    </div>
                    <div className='saandetwish'>
                        <h2>30+</h2>
                        <p>caretakers</p>
                    </div>
                </div>
                <div className="sandetchild">
                    <div className='saandetimg'>
                        <img src='Screenshot 2024-05-16 005135.png'></img>

                    </div>
                    <div className='saandetwish'>
                        <h2>60+</h2>
                        <p>Patients helped</p>

                    </div>
                </div>
                </div>

            </div>
           


        </div>
    </div>
    

</div>
<div className='childcont2'>
    <div className='cont2child'>
        <div>
            <h2>FREQUENTLY ASKED QUESTIONS</h2>
        </div>
        <div className="questionscont">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea maxime dolorem, quos ad cupiditate enim.</p> 

        </div>
        <div className="questionscont">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea maxime dolorem, quos ad cupiditate enim.</p>

        </div>
        <div className="questionscont">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea maxime dolorem, quos ad cupiditate enim.</p>

        </div>
        <div className="questionscont">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea maxime dolorem, quos ad cupiditate enim.</p>

        </div>
        <div className="questionscont">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea maxime dolorem, quos ad cupiditate enim.</p>

        </div>
        <div className="questionscont">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea maxime dolorem, quos ad cupiditate enim.</p>

        </div>
    </div>

</div>



</main>

<footer>
<div>
<div>
    <h1>SAANJH SAHAYAK</h1>
    <p>Get information about us</p>

</div>
<div>
    <div>
        <h4>Patient care</h4>
        <ul>
            <li>Report analysis</li>
            <li>Doctor prescription</li>
            <li>Lorem ipsum</li>
            <li>Lorem</li>
        </ul>

    </div>
    <div>
        <h4>Contact Us</h4>
        {/* <FontAwesomeIcon icon={faFacebook} /> */}
        
        <i className="fab fa-twitter">Twitter</i>
        <i className="fab fa-facebook-f">Facebook</i>
        <i className="fab fa-instagram">Instagram</i>
        <i className="fab fa-envelope-f"></i>


    </div>
    <div>

    </div>
</div>
<div>

</div>
</div>

</footer> 
</div>
);

}
export default MyFrontpage;