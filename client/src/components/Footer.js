// yo vaneko footer page ho. bottom ma dekhne kura haru xan yesma
// yesma imger.xyz lai lane link x aru copuright lekheko r current year dekhax teti ho
// color halka #d1c4e9 x yo chai class name footer r compo.css vitra x
import React from "react";

function Footer() {
  return (
    <div className="footer">

      <div className="container" 
            style={{display: 'flex', justifyContent:'space-between'}}>
           <p></p>
          <p>Copyright &copy; {new Date().getFullYear()} 
          <a href="https://imger.xyz" target="_blank" rel="noopener noreferrer"> -- IMGER.XYZ --</a>
          </p>

           <p>
            <a href="https://imger.xyz" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-star" aria-hidden="true">

           </i> VISIT ME</a>
           </p>


      </div>
    </div>
  );
}

export default Footer;
