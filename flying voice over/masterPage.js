import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

let userEmail;

$w.onReady(function () {
	wixUsers.onLogin((user) => {
        let isLoggedIn = user.loggedIn
        let userID = user.id
        console.log("Master: Logged In");
        console.log(userID);
        checkLogin(isLoggedIn);
    })
});

function checkLogin(isLoggedIn) {
    let user = wixUsers.currentUser
    user.getEmail().then((email) => {
            userEmail = email
            console.log(userEmail)
        }).then(() => {
            console.log(user.loggedIn)
            console.log(userEmail)
            if (isLoggedIn) {
                let emailQuery = wixData.query("VoiceArtists").eq("email", userEmail);
                emailQuery
                    .find()
                    .then((results) => {
                        console.log(results);
                                if (results.length > 0) {
                                    //console.log("User is logged in");
                                    //$w("#message").text = "User Successfully Logged In";
                                    //$w("#message").expand();
                                    let item = results.items
                                    console.log(item);
                                    let redirect = item[0]["link-voiceartists-title"]
                                    console.log(redirect);
                                    wixLocation.to(redirect)
                                } else {
                                    console.log("login unsuccessful")
                                    console.log(results)
                                    console.log(results.length)
                                }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                console.log("Emails's Dont Match!")
                console.log(userEmail)
            }
        })
        .catch((err) => {
            console.log(err)
        })

}