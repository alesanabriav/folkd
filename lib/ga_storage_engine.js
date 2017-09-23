const ga = require('./ga');

function GaStorageEngine (opts) {}

GaStorageEngine.prototype.handleFile = async function handleFile(req, file, next) {
  try {
    const fileStream = new Promise(resolve => resolve(file.stream));

    const drive = await ga.getDrive(req.user);
    const stream = await fileStream;

    return drive.files.create({
      resource: {
        name: file.originalname,
      },
      media: {
        mimeType: file.mimeType,
        body: stream,
      },
      fields: 'id, webContentLink, webViewLink',
    }, (err, res) => {
      if (err) return next(err, null);
      return next(null, { google: res });
    });
  } catch (err) {
    return next('google auth problem', null);
  }
};

GaStorageEngine.prototype.removeFile = async function removeFile(req, file, next) {
  try {
    const drive = await ga.getDrive(req.user);
    return drive.files.delete({
      fileId: req.fileId,
    }, (err) => {
      if (err) return next(err, null);
      return next(null, {deleted: true});
    });
  } catch (err) {
    return next(err, null);
  }

}

module.exports = function(opts) {
  return new GaStorageEngine(opts)
}
