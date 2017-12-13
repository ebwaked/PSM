var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    
    $scope.log = '';
    $scope.imageArray = [];
    
    $scope.$watch('image', function () {
        $scope.upload($scope.image);
    });
    
    $scope.upload = function (image) {
        if (image && image.length) {
            for (var i = 0; i < image.length; i++) {
                //var file = files[i];
                $scope.imageArray.push(angular.copy(image));
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    fields: {
                        'username': $scope.username
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                });
            }
        }
    };
    
    function setAttachments(f, cn) {
            if (f.name !== undefined && f !== undefined) {
                $scope.imageArray.push(f);
                service.newAttachments.push({ 'attachment': f, 'details': { 'customFileName': cn} })
                service.attachmentDetails.push({
                    'id': null, 'documentId': null, 'initiateId': null,
                    'createdDate': todaysDate, 'createdBy': service.owner.id,
                    'customFileName': cn
                });
            }
        }
    
}]);