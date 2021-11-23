
let mobileNumber=""
Page({

  data: {
    flagke: "images/ke-flag.png",
    buttonDisable:true,
    errorValidatePhoneNumber:false,
    errorValidatePhoneNumberMessage:""
  },

  onLoad(query) {
    // Page load
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // Page loading is complete
  },
  onShow() {
    // Page display
  },
  onHide() {
    // Page hidden
  },
  onUnload() {
    // Page is closed
  },
  onTitleClick() {
    // Title clicked
  },
  onPullDownRefresh() {
    // Page is pulled down
  },
  onReachBottom() {
    // Page is pulled to the bottom
  },
  onShareAppMessage() {
    // Back to custom sharing information
    // return {
    //   title: 'My App',
    //   desc: 'My App description',
    //   path: 'pages/index/index',
    // };
  },


  onInput(e) {
    // Modify global data
    mobileNumber = e.detail.value;
    let errors=validatePhoneNumber(mobileNumber)
    this.setData({
      errorValidatePhoneNumber: errors[0],
      errorValidatePhoneNumberMessage: errors[1],
      buttonDisable:errors[2]
    });
  },

  sendOTP(){
    my.request({
      url: 'https://apistaging.mpost-app.com/Subscribers/GenerateOtp/254'+mobileNumber.replace(/\s/g, ""),
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res)
        my.navigateTo({ url: '../pin/pin?mobileNumber='+mobileNumber });
      },
      fail: function(res) {
      }
    });
  },


});


 function validatePhoneNumber(mobileNumber){
   let errors=[]
    
   if(mobileNumber.length==0){
       let buttonDisable=true
       let errorValidatePhoneNumber=true
       let errorValidatePhoneNumberMessage="This field is required"
       errors=[
         errorValidatePhoneNumber,
         errorValidatePhoneNumberMessage,
         buttonDisable
        ]
       return errors 
   } else
   if(!isNumeric(mobileNumber)){
       let buttonDisable=true
       let errorValidatePhoneNumber=true
       let errorValidatePhoneNumberMessage="Please input numbers only"
       errors=[
         errorValidatePhoneNumber,
         errorValidatePhoneNumberMessage,
          buttonDisable
        ]
       return errors
    } else if(mobileNumber.length<9 || mobileNumber.length>9 ){
        let buttonDisable=true
       let errorValidatePhoneNumber=true
       let errorValidatePhoneNumberMessage="Please input 9 characters"
       errors=[
         errorValidatePhoneNumber,
         errorValidatePhoneNumberMessage,
          buttonDisable
        ]
       return errors
    }   
    else{
       let buttonDisable=false;
       let errorValidatePhoneNumber=false
       let errorValidatePhoneNumberMessage=""
       errors=[
         errorValidatePhoneNumber,
         errorValidatePhoneNumberMessage,
         buttonDisable
        ]
       return errors
    }
  }


 function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
      return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }