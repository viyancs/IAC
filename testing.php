
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <title>IAC</title>
        <style type="text/css">
            
            body {
                font-family: Arial, Helvetica, sans-serif;
            }
            
            form {
                background: #fbfadd;
                width: 200px;
                border: 1px solid gray;
                padding: 30px;
                border-bottom-width: 3px;
                border-right-width: 3px;
            }
			pre{ color:white; background:black;padding:40px;}
        </style>
        <script type="text/javascript" src="IAC.js">
        </script>
        <script type="text/javascript">
            $i.domReady(function(){
				
				//AJAX FORM EXAMPLE
				//Onclick in the button process
                $i.getId('process').on('click', function(){
    
                    //Take the values of the two textbox
                    var txtname = $i.getId('txtname').getValue();
                    var txtemail = $i.getId('txtemail').getValue();
                    var txtmsg = $i.getId('txtmsg').getValue();
                    
                    
                    //Send the request by AJAX
					//processform.php contains an sleep of 3 seconds in order to let loading method work.
					/*You can create your own php file with this code <?php
					 sleep(3); 
                     echo 'Name: ' . $_POST['name'] . '<br />' . ' Email: ' . $_POST['email'] . '<br />' . 'Message: ' . $_POST['message'];?> */
                    $i.AJAX.sendRequest('post', 'processform.php', {
                        name: txtname,
                        email: txtemail,
                        message: txtmsg
                    }, {
                        success: function(myxhr){
                            $i.getId('answer').innerHTML(myxhr.responseText).setStyle({
                                color: 'green'
                            });
                        },
                        error: function(myxhr){
                            $i.getId('answer').innerHTML(myxhr.statusText).setStyle({
                                color: 'red'
                            });
                        },
                        loading: function(){
                            $i.getId('answer').innerHTML('Loading...').setStyle({
                                color: 'blue'
                            });
                        }
                        
                    });
                    
                });
				
				
				//SECOND EXAMPLE:
				//The use of the "UN" method
				//The button should work once because inside the function to run we delete it from the element
				
				//Function to be executed
				function hello(){
					alert('Hellow World');
					$i.getId('secondexample').un('click',hello)
				}
				$i.getId('secondexample').on('click',hello);
            });
        </script>

    </head>
    <body>
        <h2>How to Easily Create a Javascript Framework part 4</h2>
        <form action="processform.php">
        	<strong>AJAX FORM</strong>
            <p>
                Name: <input type="text" id="txtname" name="txtname"/>

            </p>
            <p>
                Email: <input type="text" id="txtemail" name="txtemail"/>
            </p>
            <p>
                Message: 
                <textarea name="txtmsg" id="txtmsg"></textarea>
            </p>

            <p>
                <input type="button" value="Send" id="process" />
            </p>
            <div id="answer">
            </div>
        </form>
		<strong>AJAX FORM CODE</strong>
		<pre>

//AJAX FORM EXAMPLE
//Onclick in the button process
$i.getId('process').on('click', function(){
    
  //Take the values of the two textbox
  var txtname = $i.getId('txtname').getValue();
  var txtemail = $i.getId('txtemail').getValue();
  var txtmsg = $i.getId('txtmsg').getValue();
                    
                    
  //Send the request by AJAX
  //processform.php contains an sleep of 3 seconds in order to let loading method work.
  /*You can create your own php file with this code <?php
    sleep(3); 
    echo 'Name: ' . $_POST['name'] . '<br />' . ' Email: ' . $_POST['email'] . '<br />' . 'Message: ' . $_POST['message'];?> */
   $i.AJAX.sendRequest('post', 'processform.php', {
                        name: txtname,
                        email: txtemail,
                        message: txtmsg
                    }, {
                        success: function(myxhr){
                            $i.getId('answer').innerHTML(myxhr.responseText).setStyle({
                                color: 'green'
                            });
                        },
                        error: function(myxhr){
                            $i.getId('answer').innerHTML(myxhr.statusText).setStyle({
                                color: 'red'
                            });
                        },
                        loading: function(){
                            $i.getId('answer').innerHTML('Loading...').setStyle({
                                color: 'blue'
                            });
                        }
                        
                    });
                    
                });
		</pre>
		<br/>
		<strong>Use of UN to delete events</strong><br />
		<input type="button" id="secondexample" value="Run Once" /><br/>
		<strong>UN METHOD CODE:</strong>
		<pre>
			//SECOND EXAMPLE:
				//The use of the "UN" method
				//The button should work once because inside the function 
				//to run we delete it from the element
				
				//Function to be executed
				function hello(){
					alert('Hellow World');
					$i.getId('secondexample').un('click',hello)
				}
				$i.getId('secondexample').on('click',hello);
		</pre>

    </body>
</html>
