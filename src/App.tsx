import { useState } from "react";
import JSConfetti from "js-confetti";
import "./App.css";

function App() {
	const [secretNum, setSecretNum] = useState<number>(Math.floor(Math.random() * 100) + 1);
	const [inputNum, setInputNum] = useState<number>(1);
	const [count, setCount] = useState<number>(0);
	const [showHint, setShowHint] = useState<JSX.Element>(<p></p>);
	const jsConfetti = new JSConfetti();

	function newGame(): void {
		let num = Math.floor(Math.random() * 100) + 1;
		setSecretNum(num);
		setInputNum(1);
		setShowHint(<p></p>);
		setCount(0);
	}

	function checkGuess() {
		setCount(count + 1);
		if (inputNum < secretNum) {
			setShowHint(<p className="text-7xl font-bold text-red-500 ">Too Low 👇, try again with higher number</p>);
		} else if (inputNum > secretNum) {
			setShowHint(<p className="text-7xl font-bold text-red-500 ">Too High 👆, try again with lower number</p>);
		} else if (inputNum === secretNum) {
			setShowHint(
				<div className="flex flex-col mx-auto gap-20">
					<p className="text-8xl font-bold">🏆🥇</p>
					<p className="text-7xl font-bold text-lime-400">You WIN in only {count} tries , want to play again?</p>
					<button
						onClick={newGame}
						className="px-4 py-4 mx-auto rounded-lg w-56 text-white border-indigo-500 hover:bg-indigo-700 text-3xl text-bold border-4"
					>
						New Game ?
					</button>
				</div>
			);
			jsConfetti.addConfetti();
			setTimeout(() => {
				jsConfetti.addConfetti();
			}, 1500);
			setTimeout(() => {
				jsConfetti.clearCanvas();
			}, 4000);
		} else {
			return <></>;
		}
	}

	return (
		<div className="App mt-48 w-4/6 mx-auto  flex flex-col gap-20">
			<h1 className="text-8xl font-black text-white">Guess The Number</h1>
			<h2 className="text-6xl  text-white ">please enter a number between 1 - 100, 🍀🤞</h2>
			<input
				className="w-[50%] self-center h-16 rounded-2xl text-4xl text-bold pl-6"
				type="number"
				onChange={(evt) => setInputNum(parseInt(evt.target.value))}
				value={inputNum}
			/>

			<div className=" flex flex-row w-[50%] justify-between mx-auto">
				<button
					onClick={checkGuess}
					className="px-4 py-4 mx-auto rounded-lg w-56 text-white text-3xl text-bold bg-indigo-500 hover:bg-indigo-700"
				>
					Check
				</button>
			</div>
			{showHint}
		</div>
	);
}

export default App;
