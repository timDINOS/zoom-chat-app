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
        s3.getSignedUrl({Bucket: username, Key: allRecordings[i], Expires: 864000}, function(err, url) {    
            if (err) {
                return [];
            }
            allUrls = allUrls.concat({key: allRecordings[i], url: url});
        });    
    }

    return allUrls;
}

const deleteObject = function(username, key) {
    var params = {
        Bucket: username,
        Key: key
    };

    s3.deleteObject(params, function(err, data) {
        if (err) {
            return 0;
        }
    });

    return 1;
}

const deleteBucket = function(username) {
    var params = {
        Bucket: username
    };

    var objs = [];

    s3.listObjectsV2(params, function(err, data) {
        if (err) {
            return 0;
        }
        data.Contents.forEach(function(obj) {
            objs.push(obj.Key);
        });
    });

    if (objs.size > 0) {
        for (let i = 0; i < objs.size; ++i) {
            deleteObject(username, objs[i]);
        }
    }

    s3.deleteBucket(params, function(err, data) {
        if (err) {
            return 0;
        }
    });


    return 1;
}

module.exports = { createBucket, uploadVideo, hasBucket, GetAllRecordings, deleteObject, deleteBucket};