const db = require('../config/db')
const app = require('../app')

const PORT = process.env.PORT || 3000

db.then(() => {
    app.listen(PORT, () => {
        console.log(`APP listening on port ${PORT}`)
    })
}).catch(err => {
    console.log(`Server is not run. Error: ${err.message}`)
})
