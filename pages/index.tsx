import { useState } from "react";
import { useRouter } from "next/router";
import { firebase } from "src/initFirebase";

const db = firebase.database();

const Home = (): JSX.Element => {
	const [player1, setPlayer1] = useState("Player 1");
	const [player2, setPlayer2] = useState("Player 2");
	const router = useRouter();

	return (
		<main>
			<form
				onSubmit={e => {
					e.preventDefault();
					const gamesRef = db.ref("games");
					const newGamesRef = gamesRef.push();

					// UPDATE DB
					newGamesRef.set({
						player1,
						player2,
						turn: "player1",
						first: "player1",
						board: [
							["", "", ""],
							["", "", ""],
							["", "", ""],
						],
					});

					// REDIRECT TO GAME SCREEN
					router.push(`/games/${newGamesRef.key}`);
				}}
			>
				<h1>X's and O's</h1>

				<input
					name="player1"
					value={player1}
					onChange={e => setPlayer1(e.target.value)}
				/>

				<input
					name="player2"
					value={player2}
					onChange={e => setPlayer2(e.target.value)}
				/>

				<button type="submit">Let's Play!</button>
			</form>
		</main>
	);
};

export default Home;
