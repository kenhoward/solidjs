import { createSignal, createEffect } from 'solid-js';
import type { Component } from 'solid-js';
import confetti from 'canvas-confetti';

import styles from './App.module.css';

const App: Component = () => {
    const [name, setName] = createSignal("Hello You");
    const [editing, setEditing] = createSignal(false);
    const [inputValue, setInputValue] = createSignal("You");
    const [shouldLaunchConfetti, setShouldLaunchConfetti] = createSignal(false);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleOkClick = () => {
        setName(`Hello ${inputValue()}`);
        setEditing(false);
        setShouldLaunchConfetti(true);
    };

    // Setup the continuous confetti effect
    createEffect(() => {
        if (shouldLaunchConfetti()) {
            const end = Date.now() + (15 * 1000);
            const colors = ['#ffeaa7', '#6c5ce7'];

            const frame = () => {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                } else {
                    setShouldLaunchConfetti(false);
                }
            };

            requestAnimationFrame(frame);
        }
    });

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
                            Hello <span style="text-decoration: underline dotted; cursor: pointer;" onClick={handleEditClick}>You</span>
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
