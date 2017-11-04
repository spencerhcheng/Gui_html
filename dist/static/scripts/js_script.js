function myFunction() {
    var x = document.getElementById("myForm").elements[0].value;
    console.log("Hi there", x)
    document.getElementById("zip").innerHTML = x;

$.ajax({
	url:'http://0.0.0.0:5000/search/{}'.format(x)
	
}
