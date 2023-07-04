const  fs = require('fs');

const saveFile=(buffer,ext=".jpg",path="static")=>{
    if(!buffer) return null;
    const fileName = `${Date.now()}${ext}`;
    if (!fs.existsSync(`./${path}`)) {
        fs.mkdirSync(`./${path}`,{ recursive: true });
      }
      var filePath = `${path}/${fileName}`;
      fs.writeFile(filePath, buffer, err => {
      if (err) {
        console.error('Error saving file:', err);
        return 'Error saving file'
      } else {
        return 'File saved successfully'
      }
    });
    return filePath;

}

const deleteFile=(path)=>{
  if(!path) return
  fs.unlink(path, (err) => {
    if (err) {
      return "Something went wrong"
    } else {
      return "Deleted"
    }
  });
  return null;
}

module.exports={saveFile,deleteFile}