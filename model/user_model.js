//репозиторий пришел сюда в модель и взял данные
const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const SALT_FACTOR = 6

const userSchema = new Schema({
    name:{
        type: String,
        default: 'Guest'
    },
    email: {
        type: String,
        required: true,
        message: 'Set email for user',
        unique: true,
    },
    password: {
        type: String,
        required: true,
        message: 'Set password for user',
    },
    token: {
        type: String,
        default: null,
    },
},
{
    versionKey: false, 
    timestamps: true, 
    toJSON: {
        virtuals: true, 
        trasnform: function(doc, ret) {
        delete ret._id
        return ret
    }},
    toObject: {virtuals: true}
    }
)

userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(SALT_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User