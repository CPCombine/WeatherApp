const weatherForm = document.querySelector('form')  //the whole form page
const searchTerm = document.querySelector('input')  //the input box data
const msgOne = document.querySelector('#msg1')      //# denotes id from the indexhbs file or a . denote class time
const msgTwo = document.querySelector('#msg2')       
msgOne.textContent = 'Please provide City or Zipcode.'

weatherForm.addEventListener('submit',(eventObject) =>{
    eventObject.preventDefault()  //stops page from refreshing and losing user input in inp[ut field

    const location = searchTerm.value

//set main page paragraph text
msgOne.textContent = 'loading...'
msgTwo.textContent = ''

    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            msgOne.textContent = data.error
        }else{
            msgOne.textContent = location
            msgTwo.textContent = data.forecast
        }
       
        
    })
})

})