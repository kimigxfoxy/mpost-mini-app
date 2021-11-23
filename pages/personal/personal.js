let firstName=""
let lastName=""
let id=""
let postalCode=""
let email=""
let dateOfBirth=""
let gender="Male"

let errorValidateFirstNameT=true
let errorValidateLastNameT=true
let errorValidateIdT=true
let errorValidateDateOfBirthT=true
let errorValidatePostalCodeT=true
let errorValidateEmailT=false

let mobileNumber=""

Page({

  data: {

    firstName:"",
    errorValidateFirstName:false,
    errorValidateFirstNameMessage:"",

    lastName:"",
    errorValidateLastName:false,
    errorValidateLastNameMessage:"",

    id:"",
    errorValidateId:false,
    errorValidateIdMessage:"",

    dateOfBirth:"",
    errorValidateDateOfBirth:true,
    errorValidateDateOfBirthMessage:"Please select a date",

    postalCode:"",
    errorValidatePostalCode:false,
    errorValidatePostalCodeMessage:"",

    gender:"",

    email:"",

    items: [
      {name: 'Male', value: 'Male',checked: true},
      {name: 'Female', value: 'Female'},
    ],

    errorValidateEmail: "",
    errorValidateEmailMessage: "",

    isSubmitButtonEnabled:true

  },

  onLoad(query){
      console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
      mobileNumber=mobileNumber+query.mobileNumber    
  },

  radioChange: function(e) {
    gender=e.detail.value
  },

  onReady() {
    my.getSystemInfo({
      success: (res) => {
        this.setData({
          language: 'english'
        })
      }
    })
  },

  datePickerYMDHMS() {
    my.datePicker({
      format: 'yyyy-MM-dd',
      success: (res) => {
        errorValidateDateOfBirthT=false
          dateOfBirth= res.date.toString(),

        this.setData({
          dateOfBirth: res.date.toString(),
          errorValidateDateOfBirth:false,
          errorValidateDateOfBirthMessage:"",
          
          isSubmitButtonEnabled: isSubmitButtonEnabledF(
          errorValidateFirstNameT,
          errorValidateLastNameT,
          errorValidateIdT,
          errorValidateDateOfBirthT,
          errorValidatePostalCodeT,
          errorValidateEmailT)

        });

      },
    });
  },


  onInputFirstName(e) {
    // Modify global data
    firstName = e.detail.value;
    let errors=validateFirstName(firstName)
    errorValidateFirstNameT= errors[0];
    this.setData({
      errorValidateFirstName: errors[0],
      errorValidateFirstNameMessage: errors[1],
      isSubmitButtonEnabled: isSubmitButtonEnabledF(
      errorValidateFirstNameT,
      errorValidateLastNameT,
      errorValidateIdT,
      errorValidateDateOfBirthT,
      errorValidatePostalCodeT,
      errorValidateEmailT
      )    


    });
},

  onInputLastName(e) {
    // Modify global data
    lastName = e.detail.value;
    let errors=validateLastName(lastName)
    errorValidateLastNameT= errors[0]

    this.setData({
      errorValidateLastName: errors[0],
      errorValidateFirstNameMessage: errors[1],
      isSubmitButtonEnabled: isSubmitButtonEnabledF(
      errorValidateFirstNameT,
      errorValidateLastNameT,
      errorValidateIdT,
      errorValidateDateOfBirthT,
      errorValidatePostalCodeT,
      errorValidateEmailT
      )  

    });
  },


  onInputID(e) {
    // Modify global data
    id = e.detail.value;
    let errors=validateID(id)
    errorValidateIdT= errors[0];

    this.setData({
      errorValidateId: errors[0],
      errorValidateIdMessage: errors[1],
      
      isSubmitButtonEnabled: isSubmitButtonEnabledF(
      errorValidateFirstNameT,
      errorValidateLastNameT,
      errorValidateIdT,
      errorValidateDateOfBirthT,
      errorValidatePostalCodeT,
      errorValidateEmailT
      )  

    });

},

  onInputPostalCode(e) {
    // Modify global data
    postalCode = e.detail.value;
    let errors=validatePostalCode(postalCode)
    errorValidatePostalCodeT= errors[0];

    this.setData({
      errorValidatePostalCode: errors[0],
      errorValidatePostalCodeMessage: errors[1],

            isSubmitButtonEnabled: isSubmitButtonEnabledF(
      errorValidateFirstNameT,
      errorValidateLastNameT,
      errorValidateIdT,
      errorValidateDateOfBirthT,
      errorValidatePostalCodeT,
      errorValidateEmailT
      )  

    });

},

  onInputEmail(e) {
    //Modify global data
    email = e.detail.value;
    let errors=validateEmailInput(email)
    errorValidateEmailT=errors[0];
    this.setData({
      errorValidateEmail: errors[0],
      errorValidateEmailMessage: errors[1],

      isSubmitButtonEnabled: isSubmitButtonEnabledF(
      errorValidateFirstNameT,
      errorValidateLastNameT,
      errorValidateIdT,
      errorValidateDateOfBirthT,
      errorValidatePostalCodeT,
      errorValidateEmailT
      )  

    });

  },

  submitRegistration(){
        my.request({
      url: 'https://apistaging.mpost-app.com/Subscribers/CreateSubscribers',
      method: 'POST',
      data: {
          "idNumber": id,
          "names": firstName+' '+lastName,
          "mobileNumber": mobileNumber,
          "postalCode": postalCode,
          "countryCode": "254",
          "emailaddress": email,
          "gender": gender,
          "dob": dateOfBirth+"T00:00:00.000Z",
          "referee": ""
      },
      dataType: 'json',
      success: function(res) {
        my.navigateTo({ url: '../success/success?mobileNumber='+mobileNumber });
      },
      fail: function(res) {
      }
    });
  }

})

function validateFirstName(firstName){

  if(firstName.length<3 ){
       let errorValidateFirstname=true
       let errorValidateFirstnameMessage="Please input at least 3 characters"
       let errors=[
         errorValidateFirstname,
         errorValidateFirstnameMessage,
        ]
       return errors
    }   
    else{
       let errorValidateFirstname=false
       let errorValidateFirstnameMessage=""
       let errors=[
         errorValidateFirstname,
         errorValidateFirstnameMessage,
        ]
       return errors
    }
}

function validateLastName(lastName){
  if(lastName.length<3 ){
       let errorValidateLastName=true
       let errorValidateLastNameMessage="Please input at least 3 characters"
       let errors=[
         errorValidateLastName,
         errorValidateLastNameMessage,
        ]
       return errors
    }   
    else{
       let errorValidateLastName=false
       let errorValidateLastNameMessage=""
       let errors=[
         errorValidateLastName,
         errorValidateLastNameMessage,
        ]
       return errors
    }
}


function validateID(id){
     if(!isNumeric(id)){
       let errorValidateFirstname=true
       let errorValidateFirstnameMessage="Please input at numbers only"
       let errors=[
         errorValidateFirstname,
         errorValidateFirstnameMessage,
        ]
       return errors
    }else
  if(id.length<8 ||id.length>8 ){
       let errorValidateLastName=true
       let errorValidateLastNameMessage="Please input at 8 characters"
       let errors=[
         errorValidateLastName,
         errorValidateLastNameMessage,
        ]
       return errors
    }   
    else{
       let errorValidateLastName=false
       let errorValidateLastNameMessage=""
       let errors=[
         errorValidateLastName,
         errorValidateLastNameMessage,
        ]
       return errors
    }
}

function validatePostalCode(postalCode){
     if(!isNumeric(postalCode)){
       let errorValidateFirstname=true
       let errorValidateFirstnameMessage="Please input at numbers only"
       let errors=[
         errorValidateFirstname,
         errorValidateFirstnameMessage,
        ]
       return errors
    }else
  if(postalCode.length<5 ||postalCode.length>5 ){
       let errorValidateLastName=true
       let errorValidateLastNameMessage="Please input at 5 characters"
       let errors=[
         errorValidateLastName,
         errorValidateLastNameMessage,
        ]
       return errors
    }   
    else{
       let errorValidateLastName=false
       let errorValidateLastNameMessage=""
       let errors=[
         errorValidateLastName,
         errorValidateLastNameMessage,
        ]
       return errors
    }
}

function validateEmailInput(email){
  let errors=[]
  if(email.replace(/\s/g, "").length>0){
    if(!validateEmail(email.replace(/\s/g, ""))){
        let errorValidateLastName=true
        let errorValidateLastNameMessage="Please input a valid email"
         errors=[
          errorValidateLastName,
          errorValidateLastNameMessage,
          ]
        
      }   
      else{
        let errorValidateLastName=false
        let errorValidateLastNameMessage=""
        errors=[
          errorValidateLastName,
          errorValidateLastNameMessage,
          ]
      
      }

        return errors
  }else{
        let errorValidateLastName=false
        let errorValidateLastNameMessage=""
        errors=[
          errorValidateLastName,
          errorValidateLastNameMessage,
          ]
        return errors
  }

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

function isSubmitButtonEnabledF(
          errorValidateFirstName,
          errorValidateLastName,
          errorValidateId,
          errorValidateDateOfBirth,
          errorValidatePostalCode,
          errorValidateEmail
          )
    {
      if(!errorValidateFirstName
        && !errorValidateLastName
        && !errorValidateId
        && !errorValidateDateOfBirth
        && !errorValidatePostalCode
        && !errorValidateEmail
        ){
        console.log('isSubmitButtonEnabledFfalse')
          return false
      }else{
        console.log('isSubmitButtonEnabledFTrue')
          return true
      }
  };

   function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
      return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }