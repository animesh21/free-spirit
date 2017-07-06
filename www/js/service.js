angular.module('starter.sevices', [])

.service("serverRepo", function( $http,$q) {
    

    var baseUrl = "http://studio-tesseract.co/freesprite/upload.php"



  this.postServices=function(data){
       var deff=$q.defer();
       $http({
          method:"POST",
          url:baseUrl,
           data:data,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
               }
       })
       .then(function(objS){
                deff.resolve(objS);
       },function(objE){
           deff.reject("server Error");
       });
       return deff.promise;
   }
});