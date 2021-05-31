import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFZxu0UBBNKPSgxK_nwzEeYwKK3mQgOw8",
  authDomain: "task-fec1b.firebaseapp.com",
  databaseURL: "https://task-fec1b-default-rtdb.firebaseio.com",
  projectId: "task-fec1b",
  storageBucket: "task-fec1b.appspot.com",
  messagingSenderId: "276846266902",
  appId: "1:276846266902:web:a638bec2d4059c1d1b0337",
  measurementId: "G-P48QC7PEJ6",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
  getList(callback) {
    let ref = this.ref.orderBy("name");
    // console.log(this.userId);
    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];
      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
      // console.log(lists);
    });
  }

  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;

    ref.doc(list.id).update(list);
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
      .firestore()
      .collection("user")
      .doc("p1l6oygRNFhoDeNoWOET")
      .collection("lists");
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
