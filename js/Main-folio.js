const folios = {
      "PPM-01": {
                 noagrego: "Folio no agregado en el delivery",

                }

};

function busquedaFolio(){
       const folio = document.getElementById("codigo").value;

       if(folios[folio]){

                  document.getElementById("titulo").value =
                  folios[folio].noagrego;

                 } else {
                         document.getElementById("titulo").value = "";
                        }
}
