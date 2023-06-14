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

module.exports = { createBucket, uploadVideo, hasBucket};