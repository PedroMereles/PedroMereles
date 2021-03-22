const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.updUser = functions.firestore
.document('user/{userId}')
.onUpdate((chg,ctx)=>{
    const userId = ctx.params.userId;

    const newUserName= chg.after.data().userNAme;
    const newEmail = chg.adter.data().userEmail;

    admin.auth().updateUser(userId, {
        email:newEmail,
        displayNombre : newUserName,

    })
    .then((userRec)=>{
        console.log('Usuario actualizado', userRec);
    })
    .catch(error =>{
        console.log(error.message);
    })
})