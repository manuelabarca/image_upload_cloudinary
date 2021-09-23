import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [file, setFile] = useState();

	const uploadImage = evt => {
		evt.preventDefault();
		console.log(file);

		const formData = new FormData();
		formData.append("File", file);

		fetch("https://3001-coffee-pike-lv22s8vq.ws-us18.gitpod.io/api/profile/image", {
			method: "POST",
			body: formData
		})
			.then(resp => {
				if (resp.ok) {
					return resp.json();
				}
			})
			.then(data => console.log("dataa", data))
			.catch(error => console.error("[ERROR TO UPLOAD FILE]", error));
	};

	return (
		<div className="text-center mt-5">
			<form onSubmit={uploadImage}>
				<input type="file" name="file" onChange={e => setFile(e.target.files[0])} />
				<button>Subir imagen.</button>
			</form>
		</div>
	);
};
