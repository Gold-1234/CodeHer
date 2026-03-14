import axios from "axios";

export const getJudge0languageId = ( Language ) => {
	const languageMap = {
		"PYTHON": 71,
		"JAVA": 62,
		"JAVASCRIPT": 63,
		// "C++": 52,
	}

	return languageMap[Language.toUpperCase()]
}

export const getLanguageName = ( languageId ) => {
	const languageMap = {
		71: "PYTHON",
		62: "JAVA",
		63: "JAVASCRIPT",
		// 52: "C++",
	}

	return languageMap[languageId] || "Unknown"
}

export const submitBatch = async ( submissions ) => {		
	try {
		const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch`, 
			{submissions},
			{ 
				params: { 
					base64_encoded: true
					}
			}
		);
		return data;
	} catch (error) {
		console.log("error in submitting to judge0", error)
	}
	

	
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const decodeBase64 = (str) => {
	if (!str) return null;
	return Buffer.from(str, 'base64').toString('utf8');
}

export const pollBatchResults = async ( tokens ) => {	
	while(true){
		const data = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
			params: {
				tokens : tokens.join(","),
				base64_encoded: true,
			}
		})	
		const results = data.data.submissions;
		
		const isAllDone = results.every((r) => r.status.id !== 1 && r.status.id !== 2);

		if(isAllDone) {
			// Decode the results
			console.log("all done")
			return results.map(result => ({
				...result,
				stdout: decodeBase64(result.stdout),
				stderr: decodeBase64(result.stderr),
				compile_output: decodeBase64(result.compile_output),
				message: decodeBase64(result.message)
			}));
		}
		
		await sleep(1000);
	}
}
