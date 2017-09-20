const ga = require('./ga');

function GaStorageEngine (opts) {}

GaStorageEngine.prototype._handleFile = async function handleFile(req, file, cb) {
  try {
    const fileStream = new Promise(function(resolve) {
      return resolve(file.stream);
    });

    const drive = await ga.getDrive(req.user);
    const stream = await fileStream;

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

  } catch(err) {
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
