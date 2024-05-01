import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';

import styles from './App.module.css';

const App: Component = () => {
    const [name, setName] = createSignal("Hello You");
    const [editing, setEditing] = createSignal(false);
    const [inputValue, setInputValue] = createSignal("You");

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleOkClick = () => {
        setName(`Hello ${inputValue()}`);
        setEditing(false);
    };

    return (
        <div class={styles.mainPageContainer}>
            {editing() ? (
                <div class={styles.inputBox}>
                    <input
                        type="text"
                        value={inputValue()}
                        onInput={(e) => setInputValue(e.currentTarget.value)}
                    />
                    <button onClick={handleOkClick}>OK</button>
                </div>
            ) : (
                <div>
                    {name() === "Hello You" ? (
                        <span>
                            Hello <span class={styles.namePrompt} onClick={handleEditClick}>You</span>
                        </span>
                    ) : (
                        <span>{name()}</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
