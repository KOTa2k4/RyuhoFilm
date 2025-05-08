import { useContext, useState } from "react";
import "./newUser.css";
import { UserContext } from "../../context/userContext/UserContext"
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUser } from "../../context/userContext/apiCalls";


export default function NewUser() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(UserContext)

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value })
  }

  const upload = (items) => {
    items.forEach(item => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/users/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "%done.")
        },
        (err) => {
          console.log(err)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUser(prev => ({ ...prev, [item.label]: url }));
            setUploaded(prev => prev + 1);
          });
        }
      )
    })
  }
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: profilePic, label: "profilePic" },
    ])
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user, dispatch)
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>ProfilePic</label>
          <input type="file"
            id="profilePic"
            name="profilePic"
            onChange={e => setProfilePic(e.target.files[0])
            } />
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="text" placeholder="John Smith" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" onChange={handleChange} />
        </div>

        {/*<div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>*/}
        {/*}
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>*/}
        {/*<div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>*/}
        {/*<div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>*/}
        {uploaded === 1 ? (
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        )}
      </form>
    </div>
  );
}
