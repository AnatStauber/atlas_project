import { showCountryByName } from "./appAtlas.js";

export const autocomplete = (_arr) => {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let inp = document.querySelector("#src_input");
    let auto = document.querySelector(".autocomplete");
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", () => {
        // let a, b, i, val = inp.value;
        let a = inp.value;
        let b = inp.value;
        let val = inp.value;
        console.log(a);
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { 
            console.log("false");
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        // let myDiv = 
        a = document.createElement("div");
        a.setAttribute("id",  "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        document.querySelector(".autocomplete").appendChild(a);
        console.log("div created");
        /*for each item in the array...*/
        // for (i = 0; i < arr.length; i++) {
            _arr.forEach(element => {
            
                let countryName = element.name.common;
            
          /*check if the item starts with the same letters as the text field value:*/
        
          if (countryName.toUpperCase().includes( val.toUpperCase())) {
            /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
            /*make the matching letters bold:*/
                let matchIndex = countryName.toUpperCase().indexOf(val.toUpperCase());
                
                b.innerHTML = countryName.substr(0,matchIndex);
                b.innerHTML += "<strong>" + countryName.substr(matchIndex,val.length) + "</strong>";
                b.innerHTML +=countryName.substr(matchIndex+val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + countryName + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    // inp.value = this.getElementsByTagName("input")[0].value;
                    inp.value =countryName;
                    showCountryByName(inp.value);
                    inp.value="";
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
            a.appendChild(b);
          }
        })
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.querySelector("#autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
        //   console.log(currentFocus);
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }