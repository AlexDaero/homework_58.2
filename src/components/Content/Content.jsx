import React from "react";
import './Content.css'
import { useEffect } from "react";
import { useState } from "react";
import Button from "../UI/Button/Button";

const Content = () => {
    const [jokes, setJokes] = useState([])
    const [arrayPromises, setArrayPromises] = useState([])

    // const fetchData = async () => {
    //     const response = await fetch('https://official-joke-api.appspot.com/jokes/random')
    //     const joke = await response.json()
    //     setJokes(prevState => {
    //         return (
    //             [
    //                 ...prevState,
    //                 { text: joke.setup, punchline: joke.punchline }
    //             ]
    //         )
    //     })
    // }

    const fetchData = async () => {
        const array = []
        for (let i = 0; i < 5; i++) {
            const response = await fetch('https://official-joke-api.appspot.com/jokes/random')
            const joke = response.json()
            array.push(joke)
        }
        setArrayPromises(prevState => {
            return (
                [
                    ...prevState,
                    array
                ]
            )
        })
    }

    useEffect(() => {
        fetchData()
    })

    useEffect(() => {
        Promise.all(arrayPromises)
            .then((e) => {
                e.map((item) => {
                    setJokes(prevState => {
                        return (
                            [
                                ...prevState,
                                { text: item.setup, punchline: item.punchline }
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
                        <p>-{item.punchline}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Content