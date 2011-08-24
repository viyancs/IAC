/* javascript framework by biyancs
	please use it until all function is  available just wait and if you want to join , i'm very help full for this.thanks
*/

(function(){  

  var IAC = {            
        elems:[],  
//Verify when the DOM is ready.
//Callback is the anonymous function to execute when the dom is ready
domReady:function(callback){
  var done = false; //Create a variable called done with false as value;
  //Checking every 10 milliseconds if the document.body and document.getElementById are ready to work with them
  //If the they are ready to work then we change done to true;
  var checkLoaded = setInterval(function(){ if(document.body && document.getElementById){done = true;}},10);
  //Checking every 10 milliseconds if done == true
  //If it is true then execute the callback
  var checkInter = setInterval(function(){if(done){clearInterval(checkLoaded);clearInterval(checkInter);callback();}},10);
},
                
//Get Elements By Id 
getId:function(){
  var elems = [];
  for(var i = 0;i<arguments.length;i++){
      if(typeof arguments[i] === 'string'){
           elems.push(document.getElementById(arguments[i]));
      }
  }
  this.elems = elems;
  return this;
},

//Get Elements By Name
getName:function(name){
  var elems = [];
  for(var i = 0;i<arguments.length;i++){
      if(typeof arguments[i] === 'string'){
         var e = document.getElementsByName(arguments[i]);
         for(var j=0;j<e.length;j++){
             elems.push(e[j]);
          }
     }
  }
  this.elems = elems;
  return this;
},

//Get Elements By TagName
getTag:function(){
  var elems = [];
  for(var i = 0;i<arguments.length;i++){
      if(typeof arguments[i] === 'string'){
         var e = document.getElementsByTagName(arguments[i]);
         for(var j=0;j<e.length;j++){
             elems.push(e[j]);
         }
      }
  }
  this.elems = elems;
  return this;
},

//Get Elements By ClassName
getClass:function(name,type,parent){
  var elems = [];
  var pattern = new RegExp("(^| )" + name + "( |$)");
  var e = (parent || document).getElementsByTagName(type || '*')
  for(var i=0;i<e.length;i++){
      if(pattern.test(e[i].className)){
         elems.push(e[i]);
      }
  }
  this.elems = elems;
  return this;
},
//Get Elements By Instance
//if you refer to the body of the document, then you should use document.body instead of document
getInstance:function(elem){
	var elems = [];
    elems.push(elem);
    this.elems = elems;
  return this;
},

//Check Or Uncheck the elements
checked:function(bol){
  for(var i=0;i<this.elems.length;i++){
      if(this.elems[i].nodeName.toLowerCase()==='input' && (this.elems[i].getAttribute('type') == 'checkbox' || this.elems[i].getAttribute('type') == 'radio')){
         this.elems[i].checked = bol;
      }
  }
  return this;
},

//Return the value of the elements or an array with all the values found
//This function does not chain
getValue:function(){
  var elemstemp = [];//Create a temporary array to save the elements found
  for(var i=0;i<this.elems.length;i++){//Walk through all the elements cheking for their value
     if(this.elems[i].getAttribute('type') == 'checkbox' || this.elems[i].getAttribute('type') == 'radio'){
            //If the form element is checkbox or an radio we verify if it is checked
           //If it is true then we save the value
            if(this.elems[i].checked === true){
            elemstemp.push(this.elems[i].value);
            }
     } else{
            elemstemp.push(this.elems[i].value);
     }
            
   }
     //elemstemp.push(if(this.elems[i].getAttribute)this.elems[i].value); //Adding the value into the temporary Array
  if(elemstemp.length === 1){ //If the temporary array just have one element then we return like a single value
     return elemstemp[0];
  }
  return elemstemp; //Here we return the temporary array with all the values found
},

//Set value for the elements found
//Val is the value for the elements found
setValue:function(val){
  for(var i=0;i<this.elems.length;i++){ //Walk through all the elements adding a value
      //If the form element is checkbox or an radio we verify if val == elem.value
      //If it is true then checked it
       if(this.elems[i].getAttribute('type') == 'checkbox' || this.elems[i].getAttribute('type') == 'radio'){
            if(this.elems[i].value === val){
              this.elems[i].checked = true;             
            }
  }
  else{
       this.elems[i].value = val; //Set the val to value attribute of the element
  }
  }
  return this;////Return this in order to chain
},

//Add a className to our elements
addClass:function(name){
  for(var i = 0;i<this.elems.length;i++){
      this.elems[i].className += ' ' + name;
  }
  return this;
},

on:function(action, callback){
  if(this.elems[0].addEventListener){
     for(var i = 0;i<this.elems.length;i++){
      this.elems[i].addEventListener(action,callback,false);    
     }
  }
  else if(this.elems[0].attachEvent){
     for(var i = 0;i<this.elems.length;i++){
         this.elems[i].attachEvent('on'+action,callback);
     }
  }
  return this;
},
//Unbind events from the elements
un:function(action,callback){
	//Check if the method removeEventListener is available 	
	//This work for all major browsers except IE
	  if(this.elems[0].removeEventListener){
     	for(var i = 0;i<this.elems.length;i++){
	//Remove the event from the elements
      	this.elems[i].removeEventListener(action,callback,false);    
     }
  }
  //If it is IE :( use detachEvent method
  else 
  {
     for(var i = 0;i<this.elems.length;i++){
	 	//Remove the event from the elements, only IE
         this.elems[i].detachEvent('on'+action,callback);
     }
  }
  return this;
},

appendText:function(text){
  text = document.createTextNode(text);
  for(var i = 0;i<this.elems.length;i++){
      this.elems[i].appendChild(text);
  }
  return this;
},
//Method innerHTML to insert HTML code into an element
//html is the param with the html code to insert in the elements
innerHTML:function(html){
	for(var i = 0;i<this.elems.length;i++){
     this.elems[i].innerHTML= html;
  }
  return this;
},

//Insert text into an element
//Replacing the previous content
text:function(text){
	 text = document.createTextNode(text);
    for(var i = 0;i<this.elems.length;i++){
  	 this.elems[i].innerHTML = '';
     this.elems[i].appendChild(text);
  }
  return this;
},


//Updated Method setStyle
//Now it takes an object as parameter
//e.g. var mystyle ={color:'red',background:'black'};
//     .setStyle(mystyle) OR we can passit directly AS .setStyle({color:'red',background:'black'});
//We should know that the name of the styles are as used in javascript
//e.g. background-color is backgroundColor, margin-left is marginLeft, etc.
setStyle:function(objStyle){
  for(var i = 0;i<this.elems.length;i++){//Going across all the elements and add them all the styles 
      for(var k in objStyle){ //Walk the ObjStyle Object using te property name as style name and the value as the style value
          //E. g. {top:20px} is elem.top = 20px;
          this.elems[i].style[k] = objStyle[k];    
      }    
  }
  return this; //Return this to chaing
},


//SetOpacity
setOpacity: function(level){
  for(var i = 0;i<this.elems.length;i++){
     if(this.elems[0].filters){
        this.elems[i].style.filter='alpha(opacity='+level+')';
     }
     else{
         this.elems[i].style.opacity=level/100;
     }
  }
  return this;//Return this to chaing
},


//Fade Out Method
//Using the Helpers Object
//Time is in milliseconds  e.g. 8 secons = 8000
fadeOut:function(time){
  for(var i=0;i<this.elems.length;i++){//Going across all the elements and execute FadeIn In the Helpers Object
          Helpers.fadeOut(this.elems[i],time)
  }
  return this;//Return this to chaing
},

//Fade In Method
//Using the Helpers Object
//Time is in milliseconds  e.g. 8 secons = 8000
fadeIn:function(time){
  for(var i=0;i<this.elems.length;i++){ 
          Helpers.fadeIn(this.elems[i],time)
  }
  return this;//Return this to chaing
},


//Show/Hide an element
toggleHide:function(){
  this.elem.style['display'] = (this.elem.style['display']==='none' || '') ?'block':'none';
  return this;
},

//Odd the found values based by their index
odd:function(){
  var myodd = [];
  for(var i=1;i<this.elems.length;i+=2){
      myodd.push(this.elems[i]);
  }
  this.elems = myodd;
  return this;
},

//Even the found values based in their index
even:function(){
  var myeven = [];
  for(var i=0;i<this.elems.length;i+=2){
      myeven.push(this.elems[i]);
  }
  this.elems = myeven;
  return this;  
  },
 
 //AJAX Object to deal with both method: get and post
 AJAX:{
 	//This method create an XHR Object
	//If you want to create your own AJAX request just call it
	//E.g. var myXHR = $$.AJAX.getxhr();
 	getxhr:function(){
		var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		return xhr;
	},
	//Main AJAX Method
	//Parameters sendRequest(method, url, ValuesToSend, callbackObject)
	//E.g. $$.AJAX.sendRequest('get','customers.php',{customerId:1234, name:'James', lastname:'Bond'}, {success:function(){alert('yes')}, loading:function(){alert('Waiting')}, error:function(){alert('no')}});
	sendRequest:function(m,url,valObj,callObj){
		//Here we create the xhr Object
		var myxhr = this.getxhr();
		//Because we have to send the values in a query string E.g. myurl.php?param1=value1&param2=value2...
		//We create the var values that is going to save the query string
		//Walking throught the object valObj we take the name and its value
		//Using encodeURLComponent to scape special values
		var values ='?';
		for(var k in valObj){
			values+= encodeURIComponent(k) + '=' + encodeURIComponent(valObj[k]) + '&';
 		}
		//If the method we choose is get we add the values to the url
		//As we don't need to send the values by the xhr.send, we set the variable values to null; 
		if(m === 'get'){
			url+=values;
			values= null;
		}
		//Here opening the AJAX conection
		myxhr.open(m,url,true);
		
		//If the method is post
		//We need to delte the ? at the begining of the string in values;
		//And set the headers requiered for the post method
		if(m=='post'){
			values=values.substring(1,values.length-1);
			myxhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		//Send the request with ajax;
		myxhr.send(values);
		//If it is available execute the loading function from the callObj
		if(callObj.loading){ callObj.loading();}
		//When readyState change to 4
		myxhr.onreadystatechange = function(){
			if(myxhr.readyState==4){
				switch(myxhr.status){
					//If estatus is 200 means it success, the execute success from the callObj.
					case 200: if(callObj.success)callObj.success(myxhr); break;
					//If estatus is 403, 404 or 503 means that there is something wrong, execute error from the callObj.
					case 403, 404, 503 :  if(callObj.error)callObj.error(myxhr); break;
					default:  callObj.error(myxhr);
				}
			}
		}
		
		
		
		
	}
 } 

}

var Helpers={
//Method to set the opacity of the element
 //It is almost the same than setOpacity
//elem is the element affected by the opacity
//level de amount of opacity, the percent: the values are between 0 and 100
setOpa:function(elem,level){
                if(level>=0 && level<=100){//The opacity should be between 0 and 100
                    elem.style.opacity = (level/100); //Set The opacity for Firefox, Safari, Opera, Chrome,etc.
                    elem.style.filter = 'alpha(opacity='+level+')'; //Set opacity for IE :(
                }
            },
//Method to create the Fade Out effect
//Using the method setOpa
//elem is the element affected by the effect
//time is the duration of the effect
fadeOut:function(elem,time){
  var level = 100; //Set the level at 100
  var interval = setInterval(function(){ //Create an interval using the setOpa method
       Helpers.setOpa(elem,--level); //Using seOpa Method decrementing level by one
       if(level==0){ //If level has the value of 0 then stop the interval
          clearInterval(interval);
       }
  },time/100);
},

//Method to create the Fade In effect
//Using the method setOpa
//elem is the element affected by the effect
//time is the duration of the effect
fadeIn:function(elem,time){
  var level = 0;//Set the level at 0
  var interval = setInterval(function(){//Create an interval using the setOpa method
       Helpers.setOpa(elem,++level);  //Using seOpa Method decrementing level by one
       if(level==100){//If level has the value of 100 then stop the interval
          clearInterval(interval);
       }
   },time/100);
}



};

$i = window.$i = IAC;
})();

