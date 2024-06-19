import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import authorService from "services/authorService";
import bookService from "services/bookService";

export default function UserForm() {

    const [authors, setAuthors] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [address, setAddress] = useState('')
    const [phone_number, setPhoneNumber] = useState('')

    const { id } = useParams()

    useEffect(() => {
        getAuthors()

        if (id)
            setBook()
    }, []);

    const getAuthors = async _ => {
        try {
            const res = await authorService.get()
            setAuthors(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const setBook = async _ => {
        try {
            const res = await bookService.get(id)
            const book = res.data

            setName(book.name)
            setEmail(book.email)
            setPassword(book.price)
            setBirthdate(book.author_id)
            setAddress(book.address)
            setPhoneNumber(book.phone_number)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if (id) {
                await bookService.put(id, { name, email, password, birthdate, address, phone_number })
            } else {
                await bookService.post({ name, email, password, birthdate, address, phone_number })
            }
            window.location.href = '/books'
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"}>
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <Link
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    to="/books"
                                >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className={"font-semibold text-lg text-blueGray-700"}>
                                        Libros
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <div className="p-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 pt-0">
                                        <label>Nombre</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={name}
                                            onChange={({ target }) => setName(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Correo Electrónico</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={email}
                                            onChange={({ target }) => setEmail(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Contraseña</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={password}
                                            onChange={({ target }) => setPassword(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Fecha de Nacimiento</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={birthdate}
                                            onChange={({ target }) => setBirthdate(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>

                                    <div className="mb-3 pt-0">
                                        <label>Dirección</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={address}
                                            onChange={({ target }) => setAddress(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Teléfono</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={phone_number}
                                            onChange={({ target }) => setPhoneNumber(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>

                                    <hr />

                                    <div className="mt-3 pt-0">
                                        <button
                                            type="submit"
                                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        >Guardar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}