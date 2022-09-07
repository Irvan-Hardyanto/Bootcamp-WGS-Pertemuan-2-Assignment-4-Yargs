//import module-module yang dibutuhkan
const validator = require('validator');
const readLine = require('readline');
const fs = require('fs');

//inisialisasi objek readline
// const rl=readLine.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

//direktori dan nama file kontak.
const dirPath='data';//bisa diimprove lebih lanjut
const dataPath='data/contacts.json';//bisa diimprove lebih lanjut

if(!fs.existsSync(dirPath)){//periksa apakah folder 'data' sudah dibuat
    //jika belum, maka buat folder data
    fs.mkdirSync(dirPath);
}

if(!fs.existsSync(dataPath)){//periksa apakah berkas contacts.json sudah dibuat
    //jika belum, maka buat file contacts.json
    fs.writeFileSync(dataPath,'[]');
}

//menyimpan pertanyaan di dalam function untuk menghindari callback hell.
//dan menggunakan promise
// const pertanyaan=(question)=>{
//     //Promise bisa dianalogikan sebagai sebuah "janji".
//     return new Promise((resolve, reject) => {
//         rl.question(question,(answer)=>{
//             resolve(answer);//resolve itu callback (function)
//         })
//     });
// }

//untuk membaca data dari berkas.json
//penting banget! listContact sebaiknya tidak pakai parameter krn dia akan dipanggil dari luar berkas ini!
const loadContact=()=>{
    const file = fs.readFileSync(dataPath,'utf8');//baca isi file contacts
    const contacts = JSON.parse(file);//konversi dari format JSON
    return contacts;
}

//untuk memformat tampilan daftar kontak yang diperoleh dari listContact()
const listContact=()=>{
    const contacts = loadContact();
    console.log('Contact list: ');
    contacts.forEach((contact,i)=>{
        console.log(`${i+1}.${contact.name}-${contact.mobile}`);
    });
}

const detailContact=(name)=>{
    const contacts = loadContact();
    const contact= contacts.find(contact=>{
        if(contact.name ===name){
            return contact;
        }
    })
    if(contact){
        return `${contact.name}\n${contact.email}\n${contact.mobile}`;
    }else{
        return 'Contact not found!';
    }
}

//function untuk save data ke dalam berkas .json
const saveToJSONFile=(name,email,mobile)=>{
    //chalenge: kalo email sama mobile nya salah, tampilkan kedua pesan error nya.
    //Selama ini kan salah satu doang.
    if(!validator.isMobilePhone(mobile,'id-ID')){//validasi nomor telepon
        console.log("wrong phone number format!");
        //rl.close();
        return;// di return supaya ketika nomor telfon nya salah, tidak dimasukkan ke contacts
    }
    if(email){//email tidak wajib diisi, jadi harus diperiksa dulu udah diisi atau belum
        if(!validator.isEmail(email)){//validasi email
            console.log("wrong email format!");
            //rl.close();
            return;// di return supaya ketika email nya salah, tidak dimasukkan ke contacts
        }
    }
    
    const contact={name,mobile,email};//buat sebuah objek yang memiliki atribut name,mobile, dan email.
    const contacts = loadContact(dataPath);

    //cari apakah kontak yang dimasukkan sudah pernah dimasukkan sebelumnya
    let duplicate = contacts.find(contact=>{return contact.name===name});
    if(duplicate){
        console.log('Contact already recorded!');
        return false;
    }
    
    contacts.push(contact);//tambahkan nama,nomor telepon, dan email yang baru saja dibaca dari cmd
    fs.writeFileSync(dataPath,JSON.stringify(contacts));//tulis data yang baru ke dalam berkas .json
    console.log('Terimakasih sudah memasukkan data!');//konfirmasi data sudah berhasil ditulis ke file json
    //rl.close();
}

//exports.pertanyaan=pertanyaan;//harus di export supaya bisa dipanggil dari file lain.
exports.saveToJSONFile=saveToJSONFile;
exports.listContact=listContact;//hati-hati salah export
exports.detailContact=detailContact;