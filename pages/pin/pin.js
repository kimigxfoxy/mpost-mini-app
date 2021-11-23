let OTP=""
let mobileNumber="254"

Page({
  data: {
    mgsImg: "images/message-icon.png",
    buttonDisable:true,
    errorValidateOTP:false,
    errorValidateOTPMessage:""
  },

  onReady() {
   
  },

  onLoad(query){
      console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
      mobileNumber=mobileNumber+query.mobileNumber    
  },

  onInput(e) {
    // Modify global data
    OTP = e.detail.value;
   let errors=validateOTP(OTP)
    this.setData({
      errorValidateOTP: errors[0],
      errorValidateOTPMessage: errors[1],
      buttonDisable:errors[2]
    });
  
  },

  editNumber(){
    my.navigateTo({ url: '../otp/otp'})
  },

  verifyOTP(){
    my.request({
      url: 'https://apistaging.mpost-app.com/Subscribers/ValidateOtp',
      method: 'POST',
      data: {
        'mobileNumber': mobileNumber,
        'userOtp': OTP,
      },
      dataType: 'json',
      success: function(res) {
            my.request({
                url: 'https://apistaging.mpost-app.com/Subscribers/GetSubscriberDetails/'+mobileNumber,
                method: 'GET',
                dataType: 'json',
                success: function(res) {
                  if(res.status==200 && res.data.idNumber.length>0){
                     let subscriberDetails=res.data
                     my.navigateTo({ url: '../home/home?mobileNumber='+mobileNumber
                     +'&postalCode='+res.data.postalCode
                     +'&isPaid='+res.data.isPaid
                     +'&isExpired='+res.data.isExpired
                     +'&expiry='+res.data.expiry
                     +'&city='+res.data.city
                     +'&address='+res.data.city
                      +'&names='+res.data.names
                    });
                  }


                },
                fail: function(res) {
                   my.navigateTo({ url: '../personal/personal?mobileNumber='+mobileNumber})
                }
            });
      },
      fail: function(res) {
        my.alert({
          title: 'Invalid OTP please recheck code',
        });
      }
    });
  }
})

 function validateOTP(mobileNumber){
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
    } else if(mobileNumber.length<6 || mobileNumber.length>6 ){
        let buttonDisable=true
       let errorValidatePhoneNumber=true
       let errorValidatePhoneNumberMessage="Please input 6 characters"
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