import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import loanService from "services/loanService";

export default function LoanForm() {

    const [user, setUser] = useState('')
    const [book, setBook] = useState('')
    const [loan_date, setLoanDate] = useState('')
    const [return_date, setReturnDate] = useState('')
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')

    const { id } = useParams()

    useEffect(() => {
        if (id)
            setLoan()
    }, []);

    const setLoan = async _ => {
        try {
            const res = await loanService.get(id)
            const loan = res.data

            setBook(loan.book)
            setUser(loan.user)
            setLoanDate(loan.loan_date)
            setReturnDate(loan.return_date)
            setStatus(loan.status)
            setNotes(loan.notes)

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if (id) {
                await loanService.put(id, { user, book, loan_date, return_date, status, notes })
            } else {
                await loanService.post({ user, book, loan_date, return_date, status, notes })
            }
            window.location.href = '/loans'
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
                                    to="/loans"
                                >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className={"font-semibold text-lg text-blueGray-700"}>
                                        Préstamo
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <div className="p-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 pt-0">
                                        <label>Usuario</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <select
                                            value={user}
                                            onChange={({ target }) => setUser(target.value)}
                                            defaultValue={''}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        >
                                            <option value={''}>Seleccione...</option>
                                            {user.map((element, index) => (
                                                <option key={index} value={element.id}>{element.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3 pt-0">
                                        <label>Libro</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <select
                                            value={book}
                                            onChange={({ target }) => setBook(target.value)}
                                            defaultValue={''}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        >
                                            <option value={''}>Seleccione...</option>
                                            {book.map((element, index) => (
                                                <option key={index} value={element.id}>{element.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3 pt-0">
                                        <label>Fecha de Préstamo</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={loan_date}
                                            onChange={({ target }) => setLoanDate(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>

                                    <div className="mb-3 pt-0">
                                        <label>Fecha de Devolución</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={return_date}
                                            onChange={({ target }) => setReturnDate(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>

                                    <div className="mb-3 pt-0">
                                        <label>Estado</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <select
                                            value={status}
                                            onChange={({ target }) => setStatus(target.value)}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="disponible">Disponible</option>
                                            <option value="prestado">Prestado</option>
                                            <option value="reservado">Reservado</option>
                                            <option value="No disponible">No disponible</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Notas</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={notes}
                                            onChange={({ target }) => setNotes(target.value)}
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