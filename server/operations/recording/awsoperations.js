const aws = require('aws-sdk');

const s3 = new aws.S3({});

const createBucket = function(bucket) {
    var params = {
        Bucket: bucket
    };

    s3.createBucket(params, function(err, data) {
        if (err) {
            return 0;
        }
    });

    return 1;
}

const uploadVideo = function(videoname, stream, bucket) {
    var params = {
        Bucket: bucket,
        Key: videoname,
        Body: stream
    };

    s3.upload(params, function(err, data) {
        if (err) {
            return 0;
        }
    });
    return 1;
};

const hasBucket = function (username) {
    return s3.doesBucketExist(username);
}

const GetAllRecordings = function(username) {
    var params = {
        Bucket: username
    };

    var allRecordings = [];

    s3.listObjectsV2(params, function(err, data) {
        if (err) {
            return [];
        }
        data.Contents.forEach(function(obj) {
            allRecordings.push(obj.Key);
        });
    });

    var allUrls = [];

    for (let i = 0; i < allRecordings.length; ++i) {
        var VideoUrl = "https://" + username + "s3.amazonaws.com/" + allRecordings[i];
        allUrls = allUrls.concat(VideoUrl);
    }

    return allUrls;
}

module.exports = { createBucket, uploadVideo, hasBucket, GetAllRecordings};