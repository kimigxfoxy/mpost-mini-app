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

  onRefresh(){
    my.request({
      url: 'https://apistaging.mpost-app.com/Subscribers/GetSubscriberDetails/'+mobileNumberT,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
          if(!res.data.isExpired && res.data.isPaid){
                my.navigateTo({ url: '../personal/personal?mobileNumber='+mobileNumberT})
          }
      },
      fail: function(res) {
          my.alert({
          title: 'Payment pending',
        });
      }
    });
  }

})