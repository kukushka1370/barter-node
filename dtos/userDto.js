export default class UserDto {
    id;
    email;
    name;
    surname;
    phoneNumber;
    postcode;
    region;
    rating;
    isActivated;
    role;
    rating;
    isDemo;
    referralLink;
    personalCommission;

    constructor(model) {
        this.id = model._doc._id;
        this.personalCommission = model._doc.personalCommission;
        this.isDemo = model._doc.isDemo;
        this.email = model._doc.email;
        this.name = model._doc.name;
        this.surname = model._doc.surname;
        this.phoneNumber = model._doc.phoneNumber;
        this.postcode = model._doc.postcode;
        this.region = model._doc.region;
        this.rating = model._doc.rating;
        this.isActivated = model._doc.isActivated;
        this.role = model._doc.role;
        this.rating = model._doc.rating;
        this.referralLink = model._doc.referralLink;
    }
}