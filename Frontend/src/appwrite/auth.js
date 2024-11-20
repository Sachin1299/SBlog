import { Account, Client} from 'appwrite'
import conf from '../conf/conf';
import axios from 'axios'



//const [currentuser, setCurrentuser] = useState(null);
export class AuthService {
    account;
    client = new Client();
    user = null;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            //const oldnewUser = await this.account.create(ID.unique(), email, password, name);
            const newUser = await axios.post('http://localhost:4000/signup', {
                "email": email,
                "password": password,
                "name": name
            });
            if (newUser) {
                //console.log(newUser);
                return this.login({ email, password });
            }

        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {

            const userlogin = await axios.post("http://localhost:4000/login", {
                "password": password,
                "email": email
            })
            if (userlogin.data !== '' && userlogin.data !== null) {
                console.log(userlogin.data);
                this.user = userlogin.data;
                // const olduserlogin = await this.account.createEmailPasswordSession(email, password);
                // console.log('Olduserlogin : ', olduserlogin);
                // console.log('backenduser : ', userlogin.data)
                // return userlogin.data;
                return this.user;
            } else {
                return null;
            }
        } catch (error) {
            throw error
        }
    }

    async logout() {
        try {
           // await this.account.deleteSessions();
            this.user = null
        } catch (error) {
            console.log("User having problem in logout error:", error);
        }

    }

    async getCurrentUser() {
        try {
            return this.user;
        } catch (error) {
            console.log("having problem in fetching current user error:", error);
        }
    }


}

const authService = new AuthService();

export default authService;