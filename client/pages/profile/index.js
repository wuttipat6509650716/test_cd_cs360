import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getStrapiURL } from '../../utils';


const Profile = ({ profile }) => {
  const [profildId, setprofildId] = useState(null)
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [nickname, setnickname] = useState("")
  const [gender, setgender] = useState("")
  const [birthday, setbirthday] = useState("")
  const [age, setage] = useState("")
  const [address, setaddress] = useState("")
  const [phone, setphone] = useState("")

  const [editState, seteditState] = useState(false);

  const updateProfile = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);

    const data = {
      data: {
        firstname: firstname,
        lastname: lastname,
        nickname: nickname,
        gender: gender,
        birthday: birthday,
        age: age,
        address: address,
        phone: phone
      }
    }

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch(getStrapiURL(`/profiles/${profildId}`), requestOptions);
      const resualt = await response.json()
      if (response.status == 200) {
        console.log(resualt.data);
        alert("Profile Update Success")
      } else if (response.status == 400) {
        const err = await resualt.error.details.errors
        for (let index = 0; index < err.length; index++) {
          alert(err[index].message)
          
        }
      }
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {

    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      try {
        const response = await fetch(getStrapiURL('/users/me') + '?populate=*', requestOptions);
        if (response.status == 200) {
          const result = await response.json();
          const profile = result.profile
          setprofildId(profile.id)
          setfirstname(profile.firstname)
          setlastname(profile.lastname)
          setnickname(profile.nickname)
          setgender(profile.gender)
          setbirthday(profile.birthday)
          setaddress(profile.address)
          setage(profile.age)
          setphone(profile.phone)

          console.log(result);
        } else if (response.status == 401) {
          const result = await response.json();
          alert(result.error.message)
          console.log(result);

        }


      } catch (error) {
        alert("Fail View Profile")
        console.log(error.message);
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-900 p-16 flex justify-center items-center">
      <div className="bg-white w-full max-w-6xl p-10 rounded-lg shadow-lg relative">
        <Link href="/">
          <a className="absolute inline-flex items-center top-4 left-4 focus:outline-none">
            <img
              src="/arrow_back.png"
              alt="Back"
              className="w-6 h-6 mr-2 hover:opacity-80 transition duration-150 ease-in-out"
            />
            Back
          </a>
        </Link>
        <div className="flex items-center mb-8 mt-3">
          <img
            src="/account_circleBigest.png"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-3xl font-bold">{`${firstname} ${lastname}`}</h2>
            <p className="text-gray-600">{phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Firstname</label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-lg transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Your First Name"
              value={firstname}
              disabled={!editState}
              onChange={(event) => {
                setfirstname(event.target.value)
              }}
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Lastname</label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-lg transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Your Last Name"
              value={lastname}
              disabled={!editState}
              onChange={(event) => {
                setlastname(event.target.value)
              }}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Nickname</label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-lg transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Your Nick Name"
              value={nickname}
              disabled={!editState}
              onChange={(event) => {
                setnickname(event.target.value)
              }}
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Gender</label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-lg transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Gender"
              value={gender}
              disabled={!editState}
              onChange={(event) => {
                setgender(event.target.value)
              }}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Birthday</label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-lg transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Birthday"
              value={birthday}
              disabled={!editState}
              onChange={(event) => {
                setbirthday(event.target.value)
              }}
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Age</label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-lg transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Age"
              value={age}
              disabled={!editState}
              onChange={(event) => {
                setage(event.target.value)
              }}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-lg transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Address"
              value={address}
              disabled={!editState}
              onChange={(event) => {
                setaddress(event.target.value)
              }}
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Phone number</label>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-lg transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Phone number"
              value={phone}
              disabled={!editState}
              onChange={(event) => {
                setphone(event.target.value)
              }}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <p
            className="py-3"
            hidden={!editState}
          >✎</p>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg"
            hidden={!editState}
            onClick={(event) => {
              seteditState(false)
              updateProfile()
            }}
          >
            Submit
          </button>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg"
            hidden={editState}
            onClick={(event) => {
              seteditState(true)
            }}
          >
            Edit
          </button>
          <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-lg" hidden='true'>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
