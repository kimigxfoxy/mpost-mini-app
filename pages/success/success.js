
let mobileNumber="";

Page({
  data: {
     successImg: "images/success-icon.png"
  },

  onLoad(query){
      console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
      mobileNumber=mobileNumber+query.mobileNumber    
  },

  continueButton(){
    my.navigateTo({ url: '../activate/activate?mobileNumber=254713044953' });
  }
})