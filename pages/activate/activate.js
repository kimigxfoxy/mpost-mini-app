
let mobileNumberT="";

Page({

  data: {
     mobileNumber: ""
  },

  onLoad(query){
      console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
      mobileNumberT=mobileNumberT+query.mobileNumber    
      this.setData({
        mobileNumber:mobileNumberT
      })
  },

  onInitiatePayment(){
      my.request({
      url: 'https://apistaging.mpost-app.com/Subscribers/ActivateAccount/'+mobileNumberT,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
      },
      fail: function(res) {
      }, 
      complete: function(res){
        my.navigateTo({ url: '../pending/pending?mobileNumber='+mobileNumberT });
      }
    });
  }

})