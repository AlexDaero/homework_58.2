import React from "react";
import './Content.css'
import { useEffect } from "react";
import { useState } from "react";
import Button from "../UI/Button/Button";

const Content = () => {
    const [jokes, setJokes] = useState([])

    const fetchData = async () => {
        const response = await fetch('https://api.chucknorris.io/jokes/random')
        const joke = await response.json()
        setJokes(prevState => {
            return (
                [...prevState,
                { text: joke.value }]
            )
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <h3>Внимание, тяжелый юмор:</h3>
            <Button
                click={fetchData}
                text='Add new joke'
            />
            {jokes.map((item, index) => {
                return (
                    <div key={index}>
                        <p>{item.text}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Content