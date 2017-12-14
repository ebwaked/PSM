var app = angular.module('fileUpload', ['ngFileUpload', 'flow']);

app.controller('MyCtrl', ['$scope', 'Upload', function ($scope, Upload) {
    // upload later on form submit or something similar 
    var vm = this;
    $scope.images = [];
    $scope.imageDetailsArray = [];
    
    $scope.processFiles = function (files) {
        angular.forEach(files, function (flowFile, i) {
            $scope.images[i] = {};
            var fileReader = new FileReader();
            var image = new Image();
            fileReader.onload = function (event) {
                var uri = event.target.result;
                image.src = uri;
                image.onload = function () {
                    $scope.images[i].width = this.width;
                    $scope.images[i].height = this.height;
                    $scope.images[i].path = files[i].relativePath;
                    // update scope to display dimension 
                    $scope.$apply();
                };
                $scope.images[i].uri = uri;
            };
            fileReader.readAsDataURL(flowFile.file);
        });
    };

    $scope.$watch('vm.imageDetails', function (newVal, oldVal, scope) {
        if (newVal != oldVal && newVal.length > 0) {
            parseImageDetails(newVal);
        }
        else {
            
        }
    });

    // for multiple files: 
    $scope.uploadFiles = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                //parseImageDetails(imageDetails);
                vm.imageArray.push({ image: files[i], tags: imageDetails[i]});
                //Upload.upload({..., data: {file: files[i]}, ...})...;
            }
            // or send them all together for HTML5 browsers: 
            //Upload.upload({..., data: {file: files}, ...})...;
        }
    }

    function parseImageDetails(id) {
        $scope.imageDetailsArray = id.split(",");
    }

}]);
