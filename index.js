const express = require('express')
const admin = require('firebase-admin')

const serviceAccount = require("./firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const tokens = ["ddvoy0IsTQqmLkJZ3RocoD:APA91bFl_4j4SJeILhdJUqUa5Zx103nR_R1PCx5EAEDCd39rzVHTT7-TSZj2uKwTgKQ-j_i6qGpwFVkwFZkqMuxNTwTfIie85vzcHmUBsQem41pWVMH5TsyicMqYoMjaEr9qDtKX_N7G"];

const app = express()


app.get("/notifications", async (req, res) => {
    try {
        await admin.messaging().sendMulticast({
            tokens,
            notification: {
                title: "HEY MAN",
                body: "I AM FROM SERVIMATE"
            },
        });
        res.status(200).json({ message: "Successfully sent notifications!" });
    } catch (err) {
        res
            .status(err.status || 500)
            .json({ message: err.message || "Something went wrong!" });
    }
});


app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});



