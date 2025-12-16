import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        //let req = await fetch("http://localhost:3000/")    for local database
        let req = await fetch("https://passop-backend-mohz.onrender.com/")   //for cloud
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)

    }
    useEffect(() => {
        getPasswords()

    }, [])


    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: "Bounce",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password"
        }

    }
    const savePassword = async () => {

        //if any such id exist in the database, delete it
        await fetch("https://passop-backend-mohz.onrender.com/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))

        await fetch("https://passop-backend-mohz.onrender.com/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

        // console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })

    }
    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))

            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            let res = await fetch("https://passop-backend-mohz.onrender.com/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        }

    }

    const editPassword = (id) => {
        console.log("Editing Password", id)
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="px-2 md:px-2 mycontainer min-h-[90vh]">
                <h1 className='text-4xl text font-bold text-center'><span className='text-green-700'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>



                <div className="text-white flex flex-col items-center gap-5 p-4">
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-400 w-full text-black p-4 py-1' name='site' type="text" placeholder='Enter Website URL' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-400 w-full text-black p-4 py-1' name='username' type="text" placeholder='Enter Username' id='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full border border-green-400 w-full text-black p-4 py-1' name='password' type="password" placeholder='Enter Password' id='password' />
                            <span className='absolute right-1 top-1  text-black cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="icons/eyecross.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center text-black hover:bg-green-400 bg-green-500 rounded-full gap-2 px-8 py-2 w-fit border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/gzqofmcx.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Paswords</h2>
                    {passwordArray.lenght === 0 && <div>No Password to show</div>}
                    {passwordArray.lenght != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white text-center w-32'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordArray.map((item, index) => {

                                    return <tr key={index}>
                                        <td className='text-center border border-white py-2'>
                                            <div className='flex items-center justify-center '>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/tamskqkf.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center border border-white py-2'>
                                            <div className='flex items-center justify-center '>
                                                {item.username}
                                                <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/tamskqkf.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center border border-white py-2'>
                                            <div className='flex items-center justify-center '>
                                                <span> {"*".repeat(item.password.length)}</span>
                                                <div className='size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/tamskqkf.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center border border-white py-2'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/oqeixref.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div >
        </>
    )
}

export default Manager
