import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import type { SearchType } from "../../types";
import styles from "./Form.module.css"
import Alert from "../Alert/Alert";

export default function Form() {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    //Estado para los alertas
    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()

        if(Object.values(search).includes('')) {
            // console.log('Si hay campos vacios...');
            setAlert('Todos los campos son obligatorios')
            return
        }
    }

    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmit}
        >
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input 
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">Ciudad:</label>
                <select
                    id="country"
                    value={search.country}
                    name="country"
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un País --</option>
                    {countries.map(country => (
                        <option 
                            key={country.code}
                            value={country.code}
                        >{country.name}</option>
                    ))}
                </select>
            </div>

            <input className={styles.submit} type="submit" value='Consultar clima' />
        </form>
    )
}
