Page({

  data: {
     postalCode: "",
     expiry:"",
     city:"",
     active:"In Active",
     names:"",
     todayDate:"",
  
  },

  onLoad(query){
      console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
      let activeAux="In Active";
      if(!query.isExpired && query.isPaid){
         activeAux="Active"
      }
      this.setData({
        postalCode:query.postalCode,
        expiry:"Your virtual box is active until \n"+new Date(query.expiry).toISOString().split('T')[0],
        city:query.city,
        active:activeAux,
        names:query.names,
        todayDate: new Date().toISOString().split('T')[0]
      })
  },

  payPackageDeliveries10(){
    my.navigateTo({ url: '../payment/payment?mobileNumber=254713044953&package=10' });
  },

  payPackageDeliveries25(){
    my.navigateTo({ url: '../payment/payment?mobileNumber=254713044953&package=25' });
  },

  payPackageDeliveries40(){
    my.navigateTo({ url: '../payment/payment?mobileNumber=254713044953&package=40' });
  }
  
})