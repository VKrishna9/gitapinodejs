export class Login {

    constructor(
        private username: string,
        private password: string,
        private userrole: string
    ) {


    }

    getUsername() {
        return (this.username );
    }
    getPassword() {
        return (this.password);
    }
    getRole(){
        return (this.userrole);
    }
    isValid() {
        if (this.username.length < 0 && this.password.length < 0 ) {
            return false;
        }
        return true;
    }
}

export class LoginErrorMessage {


    constructor(private Status: boolean, private Message: string) {

    }
}

 export class LoginResponse {
    userName: string;
    userId: String;
    token: string;
    date: Date;

    constructor(_userName: string, _userId: String, _token: string, _date: Date) {
       this.userName = _userName;
       this.userId = _userId;
       this.token = _token;
       this.date = _date;
    }
    getUsername() {
        return (this.userName );
    }
    getUserId() {
        return (this.userId);
    }
    getToken() {
        return (this.token);
    }
    getDate() {
        return (this.date);
    }
}

// export interface LoginResponses {
//     UserName: string;
//     UserId: number;
//     token: string;

//     // constructor(_userName: string, _userId: number, _token: string) {
//     //    this.userName = _userName;
//     //    this.userId = _userId;
//     //    this.token = _token;
//     }
