if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      function getUserAgentInPlatformWeb() {
        return typeof navigator !== 'undefined' ? navigator.swuserAgent || navigator.userAgent || '' : '';
      }
      if(getUserAgentInPlatformWeb() && (getUserAgentInPlatformWeb().indexOf('LyraVM') > 0 || getUserAgentInPlatformWeb().indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../pages/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/otp/otp?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/pin/pin?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/personal/personal?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/success/success?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/confirmed/confirmed?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/activate/activate?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/pending/pending?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/home/home?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/payment/payment?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/subscription/subscription?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/order/order?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}