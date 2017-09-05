const ga = require('./ga');

function GaStorageEngine (opts) {

}

GaStorageEngine.prototype._handleFile = function _handleFile(req, file, cb) {
  const drive = ga.getDrive(req.user);
  console.log(typeof drive !== null);
  if( drive !== null) {
    const fileStream = new Promise(function(resolve) {
      return resolve(file.stream);
    });

    fileStream
    .then(stream => {
      return drive.files.create({
        resource: {
          name: file.originalname,
        },
        media: {
          mimeType: file.mimeType,
          body: stream
        },
        fields: 'id, webContentLink, webViewLink'
      }, (err, res) => {
        if(err) {
          return cb(err, null)
        };

        return cb(null, { google: res });
      });
    })
    .catch(err => console.log(err));
  } else {
    return cb('google auth problem', null);
  }
}

GaStorageEngine.prototype._removeFile = function _removeFile(req, file, cb) {
  drive.files.delete({
    fileId: req.fileId
  }, (err, res) => {
    if(err) return cb(err, null);
    cb(null, {deleted: true});
  });
}

module.exports = function(opts) {
  return new GaStorageEngine(opts)
}
