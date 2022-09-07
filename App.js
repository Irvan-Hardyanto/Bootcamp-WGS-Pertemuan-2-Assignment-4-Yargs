const yargs=require('yargs');
const {saveToJSONFile,listContact,detailContact}= require('./function.js');

yargs.command({//buat command baru bernama add
    command:'add',
    describe: 'add new contact',
    builder:{//parameter dari command yang dibuat
        name:{
            describe: 'Contact Name',
            demandOption: true,//kalau true wajib diisi
            type: 'string',
        },
        email: {
            describe: 'Contact email',
            demandOption: false,//kalau false tidak wajib diisi
            type: 'string',
        },
        mobile: {
            describe: 'contact mobile phone number',
            demandOption: true,
            type:'string',
        },
    },
    handler(argv){
        const contact={
            name: argv.name,
            email: argv.email,
            mobile: argv.mobile,
        };
        //console.log(contact);
        saveToJSONFile(argv.name,argv.email,argv.mobile);
        
    },
})
yargs.command({
    command:'list',
    describe: 'see contact list',
    handler(){
        listContact();
    }
})

yargs.command({
    command:'detail',
    describe: 'see details for a name',
    builder:{
        name:{
            describe: 'Contact Name',
            demandOption: true,//kalau true wajib diisi
            type: 'string',
        },
    },
    handler(argv){
        console.log(detailContact(argv.name));
    },
})

yargs.parse();//Parse cukup sekali di paling akhir.