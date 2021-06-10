import { useState } from "react";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

const Pinpad = () => {


    const [input, setInput] = useState("");
    const [attempts, setAttempts] = useState(3);
    const [changer, setChanger] = useState("password");
    const [locked, setLocked] = useState(0);

    const code = "1234";

    function inputHandler(e) {
        setInput(e.target.value);
    }


    function clearHandler(e) {
        e.preventDefault();
        setInput("");
    }

    function enterHandler(e) {
        e.preventDefault();
        if (attempts === 1) {
            setChanger("text");
            setInput("LOCKED");
            setLocked(1);
            setAttempts((prevAttempts) => prevAttempts - 1);
            const timer = setTimeout(() => {
                setLocked(0);
                setAttempts(3);
                setInput("");
                setChanger("password");
            }, 30000)

            return () => clearTimeout(timer);
        }
        if (input === "") {
            setLocked(1);
            setChanger("text");
            setInput("ERROR");
            setAttempts((prevAttempts) => prevAttempts - 1);
            const timer = setTimeout(() => {
                setLocked(0);
                setInput("");
                setChanger("password");

            }, 2000)

            return () => clearTimeout(timer);
        }
        if (input.length > 4) {
            setLocked(1);
            setChanger("text");
            setInput("ERROR");
            setAttempts((prevAttempts) => prevAttempts - 1);
            const timer = setTimeout(() => {
                setLocked(0);
                setInput("");
                setChanger("password");
            }, 2000)

            return () => clearTimeout(timer);
        }
        if (input === code) {
            setLocked(1);
            setChanger("text");
            setInput("OK");
            setAttempts((prevAttempts) => prevAttempts - 1);
            const timer = setTimeout(() => {
                setAttempts(3);
                setLocked(0);
                setInput("");
                setChanger("password");
            }, 2000)

            return () => clearTimeout(timer);
        }
        else if (input !== code) {
            setLocked(1);
            setChanger("text");
            setInput("ERROR");
            setAttempts((prevAttempts) => prevAttempts - 1);
            const timer = setTimeout(() => {
                setLocked(0);
                setInput("");
                setChanger("password");

            }, 2000)

            return () => clearTimeout(timer);
        }

    }



    return (

        <div>
            <AppHeader />
            <div className="form">
                <h1>Enter your PIN</h1>
                <input placeholder="Enter your PIN" type={changer} value={input} onChange={inputHandler} disabled></input>
                <p className="attempts">Remaining attempts: {attempts}</p>

                <br />
                <button disabled={locked} onClick={() => setInput((input) => `${input}1`)}>1</button>
                <button disabled={locked} onClick={() => setInput((input) => `${input}2`)}>2</button>
                <button disabled={locked} onClick={() => setInput((input) => `${input}3`)}>3</button>
                <br />
                <button disabled={locked} onClick={() => setInput((input) => `${input}4`)}>4</button>
                <button disabled={locked} onClick={() => setInput((input) => `${input}5`)}>5</button>
                <button disabled={locked} onClick={() => setInput((input) => `${input}6`)}>6</button>
                <br />
                <button disabled={locked} onClick={() => setInput((input) => `${input}7`)}>7</button>
                <button disabled={locked} onClick={() => setInput((input) => `${input}8`)}>8</button>
                <button disabled={locked} onClick={() => setInput((input) => `${input}9`)}>9</button>
                <br />
                <button disabled={locked} className="enter" onClick={enterHandler}>Enter</button>
                <button disabled={locked} onClick={() => setInput((input) => `${input}0`)}>0</button>
                <button disabled={locked} className="clear" onClick={clearHandler}>Clear</button>
            </div>
            <AppFooter />
        </div >
    )
}

export default Pinpad;