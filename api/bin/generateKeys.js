import crypto from "crypto";
import { writeFileSync } from "fs";

function generateKeyPair() {
  // @ts-ignore
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    namedCurve: "secp521r1",
    publicKeyEncoding: {
      format: "pem",
      type: "spki",
    },
    privateKeyEncoding: {
      format: "pem",
      type: "pkcs8",
    },
  });
}

function writeFileSyncRecursive(filename, content, charset) {
  // -- normalize path separator to '/' instead of path.sep, 
  // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
  let filepath = filename.replace(/\\/g,'/');  

  // -- preparation to allow absolute paths as well
  let root = '';
  if (filepath[0] === '/') { 
    root = '/'; 
    filepath = filepath.slice(1);
  } 
  else if (filepath[1] === ':') { 
    root = filepath.slice(0,3);   // c:\
    filepath = filepath.slice(3); 
  }

  // -- create folders all the way down
  const folders = filepath.split('/').slice(0, -1);  // remove last item, file
  folders.reduce(
    (acc, folder) => {
      const folderPath = acc + folder + '/';
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      return folderPath
    },
    root // first 'acc', important
  ); 
  
  // -- write file
  fs.writeFileSync(root + filepath, content, charset);
}

const { publicKey, privateKey } = generateKeyPair();

console.log(publicKey);
console.log(privateKey);

writeFileSyncRecursive("./keys/public.pem", publicKey, { encoding: "utf8" });
writeFileSyncRecursive("./keys/private.pem", privateKey, { encoding: "utf8" });
