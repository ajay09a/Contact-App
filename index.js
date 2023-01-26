const exp = require('constants');
const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const port = 8000;

// require connection to database file
const db = require('./config/mongoose');

const app = express();

// static page
app.use(express.static('./assets'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// layout
// by this we don't need to create layout for every page,
// just create one layout page and use it everywhere
app.use(expressLayout);

//connect view directory to this page
// so that we can access to every page from here
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(express.urlencoded());


const Contact = require('./models/contact');
const FavContact = require('./models/favContact');
const TrashContact = require('./models/trashContact');

// home page
app.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("getting error on displaying contact on screen");
            return;
        }
        return res.render('index', {
            title: "Contact List",
            contact_list: contacts,
        });
    })
    
})

// fav page
app.get('/fav', function(req, res){
    FavContact.find({}, function(err, fav){
        if(err){
            console.log("getting error on displaying fav contact on screen");
            return;
        }
        return res.render('fav', {
            title: "Fav Contact",
            fav_contact_list: fav
        });
    })
})

// trash page
app.get('/trash', function(req, res){
    TrashContact.find({}, function(err, trash){
        if(err){
            console.log("getting error on displaying trash contact on screen");
            return;
        }
        return res.render('trash', {
            title: "Bin",
            trash_contact_list: trash
        });
    })
})

// new contact creating page
app.get('/practice', function(req, res){
    return res.render('practice', {title: "Create New Contact"});
})

// new contact will be push in contact list by post method
app.post('/create-contact', function(req, res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }, function(err, newContact){
        if(err){
            console.log("error in creating a contact", err);
            return;
        }
    })
    
    return res.redirect('/');
})

// Delete contact from contact array
app.get('/delete-contact', function(req, res){
    // add contact to trash array first then remove it from contact list
    TrashContact.create({
        name: req.query.name,
        phone: req.query.phone,
        email: req.query.email
    }, function(err, newContact){
        if(err){
            console.log("error in creating a contact", err);
            return;
        }
    })
    // get the id from query in the url
    let id = req.query.id;

    //find the contact using id in database and delete it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("getting error on deleting a contact from database");
            return;
        }
    })
    //find the contact using id in database and delete it
    FavContact.find({name: req.query.name}, function(err, contactdb){
        if(err){
            console.log("getting error on deleting a contact from database");
            return;
        }
        console.log(contactdb);

    })
    return res.redirect('/');
})

// restore contact from trash and removing from trash
app.get('/restore-contact', function(req, res){
    //adding to main contact list
    Contact.create({
        name: req.query.name,
        phone: req.query.phone,
        email: req.query.email
    }, function(err, newContact){
        if(err){
            console.log("error in creating a contact", err);
            return;
        }
    })
    // getting index number of contact by findIndex method and later remove the index by slice method
    let id = req.query.id;
    TrashContact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("getting error on deleting a contact from database");
            return;
        }
    })
    return res.redirect('back');
})

// Delete contact permanently (in trash section)
app.get('/delete-contact-permanent', function(req, res){
    let id = req.query.id;
    TrashContact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("getting error on deleting a contact from database");
            return;
        }
    })
    return res.redirect('back');
})

// Removing contact from fav array
app.get('/remove-contact-from-fav', function(req, res){
    let id = req.query.id;
    FavContact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("getting error on deleting a contact from database");
            return;
        }
    })
    return res.redirect('back');
})

// Add contact to fav array
app.get('/add-contact', function(req, res){

    FavContact.create({
        name: req.query.name,
        phone: req.query.phone,
        email: req.query.email
    }, function(err, newContact){
        if(err){
            console.log("error in creating a contact", err);
            return;
        }
    })
    return res.redirect('back');
});

// check if the server run successfully or not
app.listen(port, function(err){
    if(err){
        console.log("getting error on the server", err);
    }
    console.log("my server is running on the port", port);
})