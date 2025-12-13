import React from 'react'
import { useRef, useState, useEffect } from 'react';

const Manager = () => {
    const ref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")

        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        alert("Show the Password");

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
        } else {
            ref.current.src = "icons/eyecross.png"
        }

    }
    const savePassword = () => {
        setpasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="mycontainer">
                <h1 className='text-4xl text font-bold text-center'><span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>

                <div className="text-white flex flex-col items-center gap-5 p-4">
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-400 w-full text-black p-4 py-1' name='site' type="text" placeholder='Enter Website URL' />
                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-400 w-full text-black p-4 py-1' name='username' type="text" placeholder='Enter Username' />
                        <div className="relative">
                            <input value={form.password} onChange={handleChange} className='rounded-full border border-green-400 w-full text-black p-4 py-1' name='password' type="text" placeholder='Enter Password' />
                            <span className='absolute right-1 top-1  text-black cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center text-black hover:bg-green-400 bg-green-500 rounded-full gap-2 px-8 py-2 w-fit border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/gzqofmcx.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password</button>
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
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordArray.map((item, index) =>{

                               return <tr key={index}>
                                <td className='text-center border border-white w-32 py-2'><a href={item.site} target='_blank'>{item.site}</a></td>
                                <td className='text-center border border-white w-32 py-2'>{item.username}</td>
                                <td className='text-center border border-white w-32 py-2'>{item.password}</td>
                            </tr>
                            })}
                          
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
