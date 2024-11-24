import React from "react";
import './Content.css'
import { useEffect } from "react";
import { useState } from "react";
import Button from "../UI/Button/Button";
import axios from 'axios'

const Content = () => {
    const [jokes, setJokes] = useState([])
    const [arrayPromises, setArrayPromises] = useState([])

    const fetchData = async () => {
        const array = []
        for (let i = 0; i < 5; i++) {
            const response = await axios('https://api.chucknorris.io/jokes/random')
            array.push(response)
        }
        setArrayPromises(array)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        Promise.all(arrayPromises)
            .then((e) => {
                e.map((item) => {
                    console.log(item)
                    setJokes(prevState => {
                        return (
                            [
                                ...prevState,
                                { text: item.data.value }
                            ]
                        )
                    })
                })
            })
    }, [arrayPromises])

    return (
        <div className="content">
            <h3>Внимание, тяжелый юмор:</h3>
            <Button
                click={fetchData}
                text='Add new joke'
            />
            {jokes.map((item, index) => {
                return (
                    <div className="content_joke" key={index}>
                        <p>{item.text}</p>

                    </div>
                )
            })}
        </div>
    )
}

export default Content